import User from "../models/User.js";
import { generateToken } from "../utils/jwtUtils.js";

// Create a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Respond with success
    res.status(201).json({ message: "User created successfully", user: { name, email, id: user._id } });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, please try again.", details: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the plain password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user); // Generate JWT token
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong, please try again.", details: error.message });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users.map(user => ({ id: user._id, name: user.name, email: user.email })));
  } catch (error) {
    res.status(500).json({ error: "Error retrieving users", details: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user", details: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user: { name: user.name, email: user.email, id: user._id } });
  } catch (error) {
    res.status(500).json({ error: "Error updating user", details: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user", details: error.message });
  }
};
