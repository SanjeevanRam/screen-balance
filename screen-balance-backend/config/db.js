import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    await mongoose.connect(dbURI);
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    process.exit(1); // Exit process if unable to connect
  }
};

export default connectDB;
