import mongoose from "mongoose";

const statsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    screenTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
