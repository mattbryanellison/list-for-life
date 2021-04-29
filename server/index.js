// initialize express app
const express = require("express");
const path = require("path");
const morgan = require("morgan");

/*
const compression = require('compression')
*/
const app = express();
const passport = require("passport");
const session = require("express-session");
const { db, User } = require("./db");

const sequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new sequelizeStore({ db });
sessionStore.sync();

const errorHandler = require("./api/errorHandler");
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
