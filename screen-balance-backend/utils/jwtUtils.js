// /utils/jwtUtils.js
import jwt from "jsonwebtoken";

// Secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate JWT Token
export const generateToken = (user) => {
  return jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "30d" });
};
