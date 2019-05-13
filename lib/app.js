'use strict';
const express = require('express');
const app = express();
const database = require('./db');

const ITEMS_PER_PAGE = 10;

app.use(require('cors')());

app.use((request, result, next) => {
    console.log(new Date(), `${request.method} ${request.url}`);
    next();
});

app.get('/messages', (request, response, next) => {
    // we need to know which page we want to read
    const page = request.query.page || 0;
    database.getDb((err, db) => {
        if (err) {
            return next(err);
        }
        db.all('SELECT * FROM posts ORDER BY timestamp ASC LIMIT ? OFFSET ?', [ITEMS_PER_PAGE, page * ITEMS_PER_PAGE], (err, result) => {
            if (err) {
                return next(err);
            }
            return response.json(result);
        });
    });
});

app.post('/messages',
    express.json(),
    (request, response, next) => {
        if (typeof request.body.username !== 'string' || typeof request.body.message !== 'string') {
            response.status(400);
            return response.json({});
        }
        return next();
    },
    (request, response, next) => {
        database.getDb((err, db) => {
            if (err) {
                return next(err);
            }
            db.run('INSERT INTO posts VALUES (?, ?, ?)', [request.body.username, request.body.message, new Date()], (err, result) => {
                if (err) {
                    return next(err);
                }
                response.status(201);
                return response.json({});
            });
        });
    });

module.exports.app = app;
