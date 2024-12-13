import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import statsRoutes from "./routes/statsRoutes.js";


dotenv.config();
// app.use("/api/stats", statsRoutes);

// Connect to database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
