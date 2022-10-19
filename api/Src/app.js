const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const index = require("./routes/index");
const session = require("express-session");
const passportLocal = require("passport-local").Strategy;
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { URI, USER, PASSWORD } = process.env;

const app = express();
require("./routes/login/passportConfig");

// console.log(process.env.VERCEL_URL);

// app.use(
//     cors({
//         origin: "*", // <-- location of the react app were connecting to
//         methods: "GET,POST,PUT,DELETE",
//         allowedHeaders: "Content-Type, Authorization"
//     })
// );

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://despegue.vercel.app'); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
//   });

app.use(
    cors({
        origin: "*", // <-- location of the react app were connecting to
        methods: "GET,POST,PUT,DELETE",
    })
);

app.use(
    cookieSession({
        maxAge: 23 * 60 * 60 * 1000,
        keys: ["despegue"],
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: "50mb" }));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// app.use(session({
//     secret: 'despegue',
//     resave: false,
//     saveUninitialized: true,
// }));

// app.use(morgan("dev"));

passport.use(
    new GoogleStrategy({
        clientID: "830751722617-598cdi3hqopnfv2jr0ro0k2umf3u02ie.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/redirect",
    },
    function(accessToken, refreshToken, profile, cb){
        return cb(null , profile)
    })
);

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/auth/google', passport.authenticate('google',{
    scope:['email', 'profile'],
    prompt: 'select_account'
}))

app.get('/auth/google/redirect', passport.authenticate('google'), function(req,res){
    res.send(req.user)
})
 

app.get('/auth/logout', (req, res) => {
    req.logout()
    req.session = null
    res.send(req.user)
})

// app.use(express.static(__dirname + '/../dist'))

// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["secretcode"],
//         maxAge: 24 * 60 * 60 * 100,
//     })
// );

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: false,
//   })
// );

// const whitelist = [
//     "http://localhost:3000",
//     "https://despegue.vercel.app/",
//     "https://despegue.vercel.app",
//     "https://despegue.vercel.app/login",
//     "https://despegue.vercel.app/register",
//     "https://despegue.herokuapp.com/",
//     "https://despegue.herokuapp.com"
// ];

// const corsOptions = {
//     credentials: true,
//     origin: function(origin, callback) {
//         if(whitelist.indexOf(origin) !== -1) callback(null, true)
//         else callback(new Error('Not allowed by CORS'))
//     }
// }

// app.use(cors(corsOptions))

// app.use(
//   cors({
//     origin: ['https://despegue.vercel.app','https://despegue.vercel.app/','http://localhost:3000'], // <-- location of the react app were connecting to
//     methods: "GET,POST,PUT,DELETE,UPDATE,PATCH",
//   })
// );
// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());
app.use("/", index);

app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = app;
