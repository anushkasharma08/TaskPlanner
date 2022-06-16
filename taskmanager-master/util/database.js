const Sequelize = require("sequelize");

const sequelize = new Sequelize("taskmanager", "root", "", {
  dialect: "mysql",
});

module.exports = sequelize;
