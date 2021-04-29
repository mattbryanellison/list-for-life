const db = require("./database");
const Task = require("./Task");
const User = require("./User");
const List = require("./List");
const Collaborator = require("./Collaborator");

User.hasMany(List, { foreignKey: "creatorId" });
// super many to many
User.belongsToMany(List, { through: Collaborator });
List.belongsToMany(User, { through: Collaborator });
User.hasMany(Collaborator);
Collaborator.belongsTo(User);
List.hasMany(Collaborator);
Collaborator.belongsTo(List);

List.belongsTo(User, { foreignKey: "creatorId" });
List.hasMany(Task);
Task.belongsTo(List);

module.exports = {
  // Include your models in this exports object as well!
  db,
  Task,
  User,
  List,
  Collaborator,
};
