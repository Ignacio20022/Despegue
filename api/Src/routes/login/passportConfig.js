const User = require("../../../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const { token } = require("morgan");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const GOOGLE_CLIENT_ID =
  "909365047101-qs6n7ap7lfqce2golts6kh46amfndqe5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "825716382185580";
const FACEBOOK_APP_SECRET = "c4e1da180a4451a1f3c8fc05fee5ad18";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://despegue.onrender.com/auth/google/callback",
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true
    },
    (token, tokenSecret, profile, done) => {
        console.log(token, tokenSecret, profile, done);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Not User found." });
      }

      // Match Password's User
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Incorrect Password." });

      return done(null, user);
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
