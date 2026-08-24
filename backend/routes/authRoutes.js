const express = require("express");
const passport = require("../config/passport");
const generateToken = require("../utils/generateToken");

const {
  loginUser,
  getMe,
  logoutUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// Normal Authentication
// ===============================

router.post("/login", loginUser);

router.post("/logout", logoutUser);


// ===============================
// Get Logged-in User
// ===============================

router.get("/me", protect, getMe);


// ===============================
// Google OAuth
// ===============================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


// ===============================
// Google OAuth Callback
// ===============================

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,

    // If Google authentication fails
    failureRedirect:
      "https://google-o-auth-1.onrender.com/#/login",
  }),

  (req, res) => {
    try {
      // Generate JWT
      const token = generateToken(req.user._id);

      // Store JWT in secure cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Successful Google login
      res.redirect(
        "https://google-o-auth-1.onrender.com/#/dashboard"
      );

    } catch (error) {

      console.error("Google callback error:", error);

      // If something goes wrong
      res.redirect(
        "https://google-o-auth-1.onrender.com/#/login"
      );
    }
  }
);


module.exports = router;