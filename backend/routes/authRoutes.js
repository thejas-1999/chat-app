import express from "express";
import { Login, logOut, signUp } from "../controllers/authController.js";
const router = express.Router();

router.get("/signup", signUp);

router.get("/login", Login);

router.get("/logout", logOut);

export default router;
