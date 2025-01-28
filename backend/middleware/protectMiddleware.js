import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object, excluding the password
      req.user = await User.findById(decoded.userId).select("-password");

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    // If no token is found, send an unauthorized response
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
