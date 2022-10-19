const router = require("express").Router();
const passport = require("passport");
require("dotenv").config()

const CLIENT_URL = "https://despegue.vercel.app/"

router.get("/login/success", (req, res) => {
    console.log(res.user);
  if (req.user) {
    res.status(200).send({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  // req.session = null;
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google",),(req, res) => {
    console.log(err, 'not called');
})

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login/failed" }), 
  (req, res) => {
    console.log('red');
    }
)

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
