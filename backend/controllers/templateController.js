const UserTemplate = require("../models/UserTemplate");

// @desc    Save or update user template
// @route   POST /api/user-templates/save
// @access  Private
exports.saveUserTemplate = async (req, res) => {
  try {
    const { templateId, data } = req.body;
    const userId = req.user.id;

    if (!templateId) {
      return res.status(400).json({ message: "templateId is required" });
    }

    // Check if user already has this template saved
    let userTemplate = await UserTemplate.findOne({ userId, templateId });

    if (userTemplate) {
      // Update
      userTemplate.data = data;
      await userTemplate.save();
      return res.status(200).json({ message: "Template updated successfully", userTemplate });
    } else {
      // Create
      userTemplate = await UserTemplate.create({
        userId,
        templateId,
        data,
      });
      return res.status(201).json({ message: "Template saved successfully", userTemplate });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all user templates
// @route   GET /api/user-templates/my-templates
// @access  Private
exports.getUserTemplates = async (req, res) => {
  try {
    const userId = req.user.id;
    const templates = await UserTemplate.find({ userId });
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get specific user template by ID (using MongoDB _id)
// @route   GET /api/user-templates/:id
// @access  Private
exports.getTemplateById = async (req, res) => {
  try {
    const template = await UserTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Check ownership
    if (template.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// @desc    Delete user template
// @route   DELETE /api/user-templates/:id
// @access  Private
exports.deleteUserTemplate = async (req, res) => {
  try {
    const template = await UserTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Check ownership
    if (template.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await template.deleteOne();
    res.status(200).json({ message: "Template removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
