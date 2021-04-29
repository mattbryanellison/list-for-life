require("pg").defaults.parseInt8 = true;
const Sequelize = require("sequelize");

// create .env file and put this value there
const dbName = `crud-task-app`;

// use process.env.DB_NAME
const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

module.exports = db;
