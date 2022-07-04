const {createPool} = require("mysql2/promise");

const pool = createPool({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'rejestracja_zaliczenie',
    namedPlaceholders: true,
    decimalNumbers: true,
});

module.exports = {
    pool,
};