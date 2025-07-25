import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./SRC/config/db.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
