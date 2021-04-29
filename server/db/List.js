const Sequelize = require("sequelize");
const db = require("./database");

const List = db.define("list", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  creatorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lastUpdate: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
});

List.beforeValidate((list) => {
  list.lastUpdate = Date.now();
});

List.beforeUpdate((list, options) => {
  list.lastUpdate = Date.now();
  options.fields = ["lastUpdate"];
});

module.exports = List;
