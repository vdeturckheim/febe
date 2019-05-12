'use strict';
const sqlite3 = require('sqlite3').verbose(true);
const db = new sqlite3.Database(':memory:');

let init = false;
module.exports.getDb = function (callback) {
    if (init) {
        return callback(null, db)
    }
    db.run("CREATE TABLE posts (author TEXT, content TEST, timestamp DATETIME)", (error) => {
        if (!error) {
            init = true;
        }
        return callback(error, db)
    });
};

