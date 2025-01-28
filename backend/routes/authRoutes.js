import express from "express";
import { login, logOut, signUp } from "../controllers/authController.js";
import { protect } from "../middleware/protectMiddleware.js";
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", protect, logOut);

export default router;
