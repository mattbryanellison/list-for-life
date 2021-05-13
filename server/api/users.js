const router = require("express").Router();
const User = require("../db/user");
const asyncHandler = require("express-async-handler");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log(`${req.body.email} not found!`);
      res.status(401).send(`'Wrong username and/or password'`);
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Incorrect password!");
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === `SequelizeUniqueConstraintError`) {
      res.status(401).send(`User already exists!`);
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Successfully logged out");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.put("/:id", async (req, res, next) => {
  //TODO: add authorization
  //check if req.user.id === req.params.id
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
