import express from "express";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Sign Up");
});

router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/logout", (req, res) => {
  res.send("Log Out");
});

export default router;
