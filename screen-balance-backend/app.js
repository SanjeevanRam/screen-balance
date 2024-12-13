import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import ScreenTime from "./models/ScreenTime.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoutes); // Adjusted to match frontend
// Example route for user profile
app.get('/api/users/profile', authenticateUser, async (req, res) => {
  try {
      // Assuming you're fetching user data from the database
      const user = await User.findById(req.user.id); // Make sure `req.user.id` is set correctly after authentication
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get("/api/stats", authenticateUser, (req, res) => {
  const userId = req.user.id;
  ScreenTime.find({ userId })
    .then((stats) => {
      res.json({ screenTime: stats });
    })
    .catch((err) => {
      console.error("Error fetching screen time:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});


// Catch 404 Errors (must come before errorHandler)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware (must come last)
app.use(errorHandler);

export default app;
