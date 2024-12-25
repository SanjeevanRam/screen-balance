import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { validateUser, validateLogin } from "../middlewares/validationMiddleware.js"; 
import { protect,authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validateUser,(req,res,next) =>{
    next();
},registerUser);

router.post("/login", validateLogin, loginUser);

router.get("/", getAllUsers);

router.get("/profile", authenticateUser, (req, res) => {
  console.log("Authenticated User:", req.user); 
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  res.json({ name: req.user.name, email: req.user.email });
});


router.get("/stats", authenticateUser, (req, res) => {
  res.json({ screenTime: 5 }); 
});

router.put("/stats", authenticateUser, (req, res) => {
  console.log("Stats route accessed");
  const { screenTime } = req.body;
  console.log("Updating screen time:", screenTime); 
  res.json({ updatedScreenTime: screenTime });
});

router.get("/:id", getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);



export default router;
