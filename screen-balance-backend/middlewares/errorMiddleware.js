const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    res.json(user);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export default (errorHandler,getUserProfile);
