const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql', // Replace with your dialect (mysql, postgres, etc.)
  host: process.env.MYSQL_HOST || 'localhost', // Database host
  username: process.env.MYSQL_USER || 'root', // Database username
  password: process.env.MYSQL_PASSWORD || 'root', // Database password
  database: process.env.MYSQL_DATABASE || 'node_db', // Database name
});

module.exports = sequelize;
