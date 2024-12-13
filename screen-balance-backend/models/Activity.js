const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
}, { timestamps: true });

module.exports = mongoose.model("Activity", ActivitySchema);
