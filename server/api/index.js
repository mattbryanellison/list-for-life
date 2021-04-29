const router = require("express").Router();

router.use("/lists", require("./lists"));

router.use("/users", require("./users"));

router.use("/home", require("./homePage"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;

  // error handler in index.js means you can throw
  // suggestion add a message and status code to the err
  // e.g. err.apiMessage = "That endpoint does not exist"
  // err.statusCode = 404
  next(err);
});

module.exports = router;
