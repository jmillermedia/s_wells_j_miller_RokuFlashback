const creds = require('./userConfig');
const mysql = require('mysql');

// these are the same connect data that you would use in a PHP script
// we want to obscure them a bit for security (normally these would be saved to a .env file)
// and then read in at runtime / create time
const connection = mysql.createPool({
    connectionLimit : 10,
    host            : creds.host,
    user            : creds.user,
    password        : creds.password,
    port            : creds.port,
    database        : creds.database
    });

    module.exports = connection;