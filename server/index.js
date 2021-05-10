require("dotenv").config();
// initialize express app
const express = require("express");
const path = require("path");
const morgan = require("morgan");

/*
const compression = require('compression')
*/
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const { db, User } = require("./db");

const sequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new sequelizeStore({ db });
sessionStore.sync();

const errorHandler = require("./api/errorHandler");
const ApiError = require("./api/ApiError");
module.exports = app;
//passport registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      //check if user exists
      const user = await User.findOne({
        where: {
          googleId: profile.id,
        },
      });
      if (user) {
        done(null, user);
      } else {
        //create new user
        console.log("create new user here: ", profile);
        const user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        return done(null, user);
      }
    }
  )
);

// logging middleware
app.use(morgan("combined"));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
//compression middleware
app.use(compression())
*/
// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my best friend is Cody",
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("Session ID:", req.session.id);
  if (req.session.passport) {
    console.log("user ID:", req.session.passport.user);
  } else {
    console.log("user ID: undefined");
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/home");
  }
);

app.get("/auth/me", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    throw new ApiError("Please login!", 404);
  }
});

// static middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api")); // include our routes!

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  errorHandler(err, req, res);
});

// add port to .env
app.listen(8080, () =>
  console.log(`studiously serving silly sounds on port 8080`)
);
