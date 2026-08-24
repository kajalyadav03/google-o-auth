const express = require("express");
const passport = require("../config/passport");

const {
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

// Normal Login
router.post("/login", loginUser);

// Logout
router.post("/logout", logoutUser);

// Current logged-in user
router.get("/me", protect, getMe);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect("http://localhost:5173/dashboard");
    } catch (error) {
      console.error("Google callback error:", error);

      res.redirect("http://localhost:5173/login");
    }
  }
);

module.exports = router;