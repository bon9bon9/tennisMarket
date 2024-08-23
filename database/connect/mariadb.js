const mariadb = require('mysql');

const conn = mariadb.createConnection(
    {
        host : 'localHost',
        port : 3306,
        user : "root",
        password : "root",
        database : 'Tennis'
    }
);

module.exports = conn;