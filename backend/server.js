import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectDb from "./db/connectDb.js";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  connectDb();
  console.log(`server is running on http://localhost:${port}`);
});
