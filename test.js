var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var redisClient = redis.createClient();
redisClient.select('test'.length);
redisClient.flushdb();

describe('Requests to the root path', function() {
    it('Returns a 200 status code', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .end(function(error) {
                if(error) throw error;
                done();
        });
    });

    it('Returns a HTML format', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

    it('Returns an index file with cities', function(done) {
        request(app)
            .get('/')
            .expect(/cities/i, done);
    });
});

describe('Listing cities on /cities', function() {

    it('Returns 200 status code', function(done) {
        request(app)
            .get("/cities")
            .expect(200,done);
    });

    it('Returns JSON format', function(done) {
        request(app)
            .get('/cities')
            .expect('Content-Type', /json/, done);
    });

    it('Returns initial cities', function(done) {
        request(app)
            .get('/cities')
            .expect(JSON.stringify([]), done);
    });
});

describe('Creating new cities', function() {

    it('Returns a 201 status code', function(done) {
        request(app)
            .post('/cities')
            .send('name=SpringField&description=where+the+simpsons+live')
            .expect(201, done);
    });

    it('Return the city name', function(done) {
        request(app)
            .post('/cities')
            .send('name=SpringField&description=where+the+simpsons+live')
            .expect(/springfield/i, done);
    });

    it('Validates city name and description', function(done) {
        request(app)
            .post('/cities')
            .send('name=&description=')
            .expect(400, done);
    });
});

describe('Deleting cities', function() {

    before(function() {
        redisClient.hset('cities', 'Banana', 'A tasty fruit');
    });

    after(function() {
        redisClient.flushdb();
    });

    it('Returns a 204 status code', function(done) {
        request(app)
            .delete('/cities/Banana')
            .expect(204, done);
    });
});

describe('Shows city info', function() {

    before(function() {
        redisClient.hset('cities', 'Banana', 'A tasty city');
    });

    after(function() {
        redisClient.flushdb();
    });

    it('Returns 200 status code', function(done) {
        request(app)
            .get('/cities/Banana')
            .expect(200, done);
    });

    it('Returns HTML format', function(done) {
        request(app)
            .get('/cities/Banana')
            .expect('Content-Type', /html/i, done);
    });

    it('Returns information for given city', function(done) {
        request(app)
            .get('/cities/Banana')
            .expect(/A tasty city/, done);
    });
});