import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import connectDb from "./db/connectDb.js";

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use("/api/auth", authRoutes);
connectDb();

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
