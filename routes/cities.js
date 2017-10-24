var express = require('express');
var router = express.Router();

// For parsing url encoded data
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});
// End url encode

// Redis connection
var redis = require('redis');
var redisClient = redis.createClient();
redisClient.select((process.env.NODE_ENV || 'development').length);
// End Redis connection

router.route('/')
    .get( function(request, response) {
        redisClient.hkeys('cities', function(error, names) {
            response.json(names); 
        });
    })

    .post( urlencode, function(request, response) {
        var newCity = request.body;
        if(!newCity.name || !newCity.description) {
            response.sendStatus(400);
        }
        redisClient.hset('cities', newCity.name, newCity.description, function(error) {
            if(error) throw error;
            response.status(201).json(newCity.name);
        });
    });

router.route('/:name')    
    .delete(function(request, response) {
        redisClient.hdel('cities', request.param.name, function(error) {
            if(error) throw error;

            response.sendStatus(204);
        });
    })
    
    .get(function(request, response) {    
        redisClient.hget('cities', request.params.name, function(error, description) {
            if(error) throw error;

            response.render('show.ejs', {city: {name: request.params.name, description: description}});
        });    
    });


module.exports = router;