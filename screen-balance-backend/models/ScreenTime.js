import mongoose from "mongoose";

const screenTimeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  totalScreenTime: { type: Number, default: 0 }, // in minutes
  breakTime: { type: Number, default: 0 }, // in minutes
  activities: [{ type: String }],
});

const ScreenTime = mongoose.model("ScreenTime", screenTimeSchema);

export default ScreenTime;
