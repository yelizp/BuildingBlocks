var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});
var redis = require('redis');
var redisClient = redis.createClient();

redisClient.select((process.env.NODE_ENV || 'development').length);

//Static HTML files
app.use(express.static(__dirname + '/public'));

//Scripts
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist'));

//Styles
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Fonts
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));

app.get('/cities', function(request, response) {
    redisClient.hkeys('cities', function(error, names) {
        response.json(names); 
    });
});

app.post('/cities', urlencode, function(request, response){
    var newCity = request.body;
    //cities[newCity.name] = newCity.description;
    redisClient.hset('cities', newCity.name, newCity.description, function(error) {
        if(error) throw error;
        response.status(201).json(newCity.name);
    });
});

app.delete('/cities/:name', function(request, response) {
    redisClient.hdel('cities', request.param.name, function(error) {
        if(error) throw error;

        response.sendStatus(204);
    });

});

module.exports = app;

