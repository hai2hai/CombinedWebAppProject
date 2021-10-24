const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'webapp-project',
  'root',
  '12345',
  {
    host: "webapp-project-db",
    dialect: 'mysql',
    port: 3306
  }
)

module.exports = sequelize;