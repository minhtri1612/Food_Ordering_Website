const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',          // Replace with your MySQL username
    password: 'Minhchau3112...', // Replace with your MySQL password
    database: 'foodapp'
};

async function getConnection() {
    return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };