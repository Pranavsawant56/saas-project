const express = require("express");
const router = express.Router();
const {
  saveUserTemplate,
  getUserTemplates,
  getTemplateById,
  deleteUserTemplate
} = require("../controllers/templateController");
const { protect } = require("../middleware/authMiddleware");

// all routes are protected
router.use(protect);

router.post("/save", saveUserTemplate);
router.get("/my-templates", getUserTemplates);
router.get("/:id", getTemplateById);
router.delete("/:id", deleteUserTemplate);

module.exports = router;
