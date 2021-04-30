const validateTaskBody = (task) => {
  return task.completed != undefined && task.title != undefined;
};

const validateListBody = (list) => {
  return list.title != undefined;
};

module.exports = {
  validateTaskBody,
  validateListBody,
};
