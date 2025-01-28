import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import { protect } from "../middleware/protectMiddleware.js";
const router = express.Router();
router.post("/send/:id", protect, sendMessage);
router.get("/:id", protect, getMessage);
export default router;
