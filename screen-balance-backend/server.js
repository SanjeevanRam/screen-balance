import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import express from "express";
import path from "path";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
  console.log("Serving static files from: ", path.join(__dirname, "../screen-balance-frontend/dist"));
  app.use(express.static(path.join(__dirname, "../screen-balance-frontend/dist")));

  app.get("*", (req,res) =>{
    console.log("Handling request for:", req.url);
    res.sendFile(path.join(__dirname, "../screen-balance-frontend","dist","index.html"));
  })
}
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
