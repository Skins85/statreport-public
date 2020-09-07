const DbLocal = require('./db-local');
var mysql = require('mysql');

// Create connection
var db = mysql.createConnection({
    host: DbLocal.host,
    user: DbLocal.user,
    password: DbLocal.password,
    database: DbLocal.database
})

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log('MySQL connected')
    }
})

module.exports = db;