const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const ApiError = require("./ApiError");

module.exports = router;

// OPTIONAL QUERY PARAMS: rangeStart, rangeEnd, completed
router.get(
  "/home",
  asyncHandler(async (req, res, next) => {
    if (!req.user) throw new ApiError("Please login!", 404);
    // check for query params
    let completed =
      req.query.completed === undefined ? false : req.query.completed;
    let tasks;
    if (req.query.rangeStart) {
      // TODO: helper method write this on Tasks model
      tasks = Tasks.findTasksByUserIdAndRange(
        req.user.id,
        req.query.rangeStart,
        req.query.rangeEnd
      );
    } else {
      tasks = await Task.findAll({
        where: {
          userId: req.user.id,
          completed,
        },
      });
    }

    res.json(tasks);
  })
);
