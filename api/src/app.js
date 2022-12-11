const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const index = require("./routes/index");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { URI, USER, PASSWORD, CLIENT_URL } = process.env;

const app = express();
require("./routes/login/passportConfig");

app.use(
  cookieSession({
    name: "session",
    keys: ["secretcode"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

const allowedDomains = ['http://127.0.0.1', 'http://localhost:3000']

app.use((req, res, next) => {
    const origin = req.header('origin')
    if(allowedDomains.indexOf(origin) > -1) res.header('Access-Control-Allow-Origin', origin); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
  });

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

//check health
app.get('/',(req,res) => {
    res.status(200).send('live')
})

app.use("/api", index);

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = app;