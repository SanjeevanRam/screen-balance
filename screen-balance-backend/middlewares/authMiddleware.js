
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET_KEY = process.env.JWT_SECRET || "123screenbalance321";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  console.log("Token received:", token); 
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); 
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; 
    console.log("Authenticated user:", user); 
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};


