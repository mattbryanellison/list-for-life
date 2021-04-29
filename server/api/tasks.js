const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const Task = require("../db/task");
const User = require("../db/user");
const ApiError = require("./ApiError");
const { validateTaskBody } = require("./validator");

module.exports = router;

// OPTIONAL QUERY PARAMS: rangeStart, rangeEnd, completed
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    if (!req.user) throw new ApiError("Please login!", 404);
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
          // completed,
        },
      });
    }

    res.json(tasks);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) throw new ApiError("No task found", 404);
    else if (req.user.id !== task.userId)
      throw new ApiError("Not authorized!", 409);
    else res.json(task);
  })
);

// TODO: ADD AUTHORIZATION
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    let task = await Task.findByPk(req.params.id);
    if (!task) {
      throw new ApiError("Task not found!", 404);
    } else {
      await task.destroy();
      res.status(204).send();
    }
  })
);

// TODO: ADD AUTHORIZATION FOR THIS
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { title, completed, description } = req.body;
    //validate?
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      throw new ApiError("Task not found!", 404);
    } else {
      await task.update({
        title,
        completed,
        description,
        // userId,
      });
      res.json(task);
    }
  })
);
