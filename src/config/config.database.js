require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    migrationStorageTableName: 'migrations', // Use a different table name. Default: SequelizeMeta
    // migrationStorageTableSchema: 'custom_schema', // Use a different schema for the SequelizeMeta table
    host: process.env.MYSQL_HOST,
    dialect: 'mysql', // Replace with your dialect (mysql, postgres, etc.)
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql', // Replace with your dialect (mysql, postgres, etc.)
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: 'mysql', // Replace with your dialect (mysql, postgres, etc.)
  },
};
