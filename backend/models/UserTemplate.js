const mongoose = require("mongoose");

const userTemplateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  templateId: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model("UserTemplate", userTemplateSchema);
