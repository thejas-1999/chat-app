import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/protectMiddleware.js";
const router = express.Router();
router.post("/send/:id", protect, sendMessage);
export default router;
