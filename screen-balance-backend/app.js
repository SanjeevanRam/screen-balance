import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorHandler from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import User from "./models/User.js"; 

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/users", userRoutes); 
app.get('/api/users/profile', authenticateUser, async (req, res) => {
  try {
      const user = await User.findById(req.user.id); 
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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.all('*', (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
