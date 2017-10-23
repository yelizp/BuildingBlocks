var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({extended: false});

var cities = {
    'Lotopia' : 'Lotopia is where ...', 
    'Caspina' : 'Caspina is where ...',
    'Indigo' : 'Indigo is where ...'
};

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
    response.json(Object.keys(cities)); 
});

app.post('/cities', urlencode, function(request, response){
    var newCity = request.body;
    cities[newCity.name] = newCity.description;
    response.status(201).json(newCity.name);
});

module.exports = app;

