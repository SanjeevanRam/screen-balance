import express from "express";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { updateStats } from "../controllers/statsController.js";

const router = express.Router();

router.put("/", authenticateUser,updateStats, (req, res) => {
  const { screenTime } = req.body;

  if (typeof screenTime !== "number") {
    return res.status(400).json({ message: "Invalid screen time value" });
  }

  // Example: Update screen time in database
  res.json({ updatedScreenTime: screenTime });
});

export default router;
