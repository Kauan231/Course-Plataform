require('dotenv').config();

module.exports =
{
  "development": {
    "username": process.env.BD_USER,
    "password": process.env.DB_PASS || null,
    "database": process.env.DATABASE,
    "host": process.env.DB_ADDRESS,
    "dialect": process.env.DIALECT
  },
  "test": {
    "username": process.env.BD_USER,
    "password": process.env.DB_PASS || null,
    "database": process.env.DATABASE,
    "host": process.env.DB_ADDRESS,
    "dialect": process.env.DIALECT
  },
  "production": {
    "username": process.env.BD_USER,
    "password": process.env.DB_PASS || null,
    "database": process.env.DATABASE,
    "host": process.env.DB_ADDRESS,
    "dialect": process.env.DIALECT
  }
}
