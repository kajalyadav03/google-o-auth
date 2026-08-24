const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://google-o-auth-moel.onrender.com/api/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        if (!email) {
          return done(new Error("Google account email not available"));
        }

        // Check if Google account already exists
        let user = await User.findOne({ googleId });

        if (user) {
          return done(null, user);
        }

        // Check if same email already exists
        user = await User.findOne({ email });

        if (user) {
          user.googleId = googleId;
          user.isVerified = true;
          user.authProvider = "google";

          await user.save();

          return done(null, user);
        }

        // Create new Google user
        user = await User.create({
          name,
          email,
          googleId,
          isVerified: true,
          authProvider: "google",
        });

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;