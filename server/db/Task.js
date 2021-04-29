const Sequelize = require("sequelize");
const db = require("./database");
const List = require("./List");

const Task = db.define("task", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  listId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const updateList = async (task) => {
  try {
    const list = await List.findByPk(task.listId);
    await list.update({ lastUpdate: Date.now() });
  } catch (err) {
    console.log(err);
  }
};

Task.beforeSave(updateList);

Task.beforeDestroy(updateList);

module.exports = Task;
