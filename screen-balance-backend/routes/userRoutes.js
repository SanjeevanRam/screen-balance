import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateUser, validateLogin } from "../middlewares/validationMiddleware.js"; // Import both validation middlewares
import { protect,authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register route (uses validateUser)
router.post("/register", validateUser,(req,res,next) =>{
  console.log("Register route hit");
    next();
},registerUser);

// Login route (uses validateLogin)
router.post("/login", validateLogin, loginUser);

// Other routes
router.get("/", getAllUsers);

// Route to get the user profile
router.get("/profile", authenticateUser, (req, res) => {
  console.log("Authenticated User:", req.user); // Debug log
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  res.json({ name: req.user.name, email: req.user.email });
});


router.get("/stats", authenticateUser, (req, res) => {
  res.json({ screenTime: 5 }); // Example response
});

router.put("/stats", authenticateUser, (req, res) => {
  console.log("Stats route accessed");
  const { screenTime } = req.body;
  console.log("Updating screen time:", screenTime); // Debug log
  res.json({ updatedScreenTime: screenTime });
});

router.get("/:id", getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);



export default router;
