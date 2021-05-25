const { createPool } = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.DATABASE_URL;

module.exports = new createPool({
    host: 'localhost',
    user: 'arthurgmr',
    password: '123456',
});



