// step 1 connect to database.
const mysql = require('mysql2/promise'); // Import the mysql2 module

// Create a connection pool
const dbConfig = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "reviewjs",
    "port": "3306"
};

const database = mysql.createPool(dbConfig);

// Export the database module
module.exports = database;