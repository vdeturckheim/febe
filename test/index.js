const request = require('supertest');
const assert = require('assert');

const app = require('../lib/app').app;

describe('Application', () => {
    describe('GET /messages', () => {
        it('should return an empty array', (done) => {
            request(app)
                .get('/messages')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert(Array.isArray(res.body));
                    assert.equal(res.body.length, 0);
                    done();
                });
        });
    });
});








