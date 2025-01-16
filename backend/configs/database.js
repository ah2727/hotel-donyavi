const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize('hotel', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: "mysql"
});



module.exports = sequelize;
