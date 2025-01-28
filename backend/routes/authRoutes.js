import express from "express";
import { login, logOut, signUp } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logOut);

export default router;
