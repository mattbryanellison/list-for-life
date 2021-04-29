const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const Task = require("../db/task");
const List = require("../db/List");
const User = require("../db/user");
const ApiError = require("./ApiError");
const { validateListBody, validateTaskBody } = require("./validator");

module.exports = router;

// GET ALL LISTS PER USER
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError("Please login!", 404);
    } else {
      let lists = await List.findAll({
        where: {
          creatorId: req.user.id,
        },
      });
      res.json(lists);
    }
  })
);

// GET LIST INCLUDING TASKS
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const list = await List.findByPk(req.params.id, { include: Task });
    if (!list) throw new ApiError("List not found!", 404);
    else if (req.user.id !== list.creatorId)
      throw new ApiError("Not authorized!", 409);
    else res.json(list);
  })
);

// POST NEW LIST
router.post(
  "/",
  asyncHandler(async (req, res, next) => {
    if (!validateListBody(req.body))
      throw new ApiError("Malformed request", 409);

    req.body.creatorId = req.user ? req.user.id : null;

    const newList = await List.create(req.body);
    if (!newList) {
      throw new ApiError("Failed to save to DB", 500);
    } else {
      res.status(201).json(newList);
    }
  })
);

// DELETE LIST BY ID
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    let list = await List.findByPk(req.params.id);
    if (!list) {
      throw new ApiError("List not found!", 404);
    } else if (req.user.id !== list.creatorId) {
      throw new ApiError("Not authorized!", 409);
    } else {
      await list.destroy();
      res.status(204).send();
    }
  })
);

// UPDATE/EDIT LIST BY ID
router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { title } = req.body;
    const list = await List.findByPk(req.params.id);
    if (!list) {
      throw new ApiError("List not found!", 404);
    } else if (req.user.id !== list.creatorId) {
      throw new ApiError("Not authorized!", 409);
    } else if (!validateListBody(req.body)) {
      throw new ApiError("Malformed request", 409);
    } else {
      await list.update({
        title,
      });
      res.json(list);
    }
  })
);

// POST NEW TASK TO LIST /api/lists/:id/tasks
router.post(
  `/:id/tasks`,
  asyncHandler(async (req, res, next) => {
    if (!validateTaskBody(req.body))
      throw new ApiError("Malformed request", 409);

    req.body.listId = +req.params.id;
    console.log(req.body);

    const newTask = await Task.create(req.body);
    if (!newTask) {
      throw new ApiError("Failed to save to DB", 500);
    } else {
      res.status(201).json(newTask);
    }
  })
);

// UPDATE TASK /api/lists/:listId/tasks/:taskId
router.put(
  "/:listId/tasks/:taskId",
  asyncHandler(async (req, res, next) => {
    const { title, completed, description } = req.body;
    const task = await Task.findByPk(req.params.taskId);
    if (!task) {
      throw new ApiError("Task not found!", 404);
    } else {
      await task.update({
        title,
        completed,
        description,
      });
      res.json(task);
    }
  })
);

// DELETE TASK /api/lists/:listId/tasks/:taskId
router.delete(
  "/:listId/tasks/:taskId",
  asyncHandler(async (req, res, next) => {
    let task = await Task.findByPk(req.params.taskId);
    if (!task) {
      throw new ApiError("Task not found!", 404);
    } else {
      await task.destroy();
      res.status(204).send();
    }
  })
);
