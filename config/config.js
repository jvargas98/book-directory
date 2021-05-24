require('dotenv').config();

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'book_directory_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432',
  },
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'book_directory_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432',
  },
  production: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'book_directory_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: '5432',
  },
};
