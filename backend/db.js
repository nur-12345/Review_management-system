const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',         // Hostname
    user: 'root',              // MySQL root user
    password: 'my-secret-pw',  // Your root password (set during container creation)
    port: 3307,                // Host port mapped to container's 3306
    database: 'reviews_db',    // Name of the database (create it if not exists)
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the MySQL database!');
    }
});

// Export the connection (optional, for modular use)
module.exports = db;
