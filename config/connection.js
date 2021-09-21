require("dotenv").config();
const knex = require("knex");

const options = process.env.NODE_ENV === 'production' ? {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['public'],
    ssl: {
        require: true,
        rejectUnauthorized: false
      }
} : {
    client: 'pg',
    connection: {
        host: `${process.env.DB_HOST}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        port: `${process.env.DB_PORT}`,
        database: `${process.env.DB_DATABASE}`
    }
};

const db = knex(options);

module.exports = db;
