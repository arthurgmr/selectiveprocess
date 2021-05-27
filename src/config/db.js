const mariadb = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

const db = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 5
})

//conect and check for errors
db.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection lost');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connection');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if(connection) connection.release();

    return;
});

module.exports = db;



