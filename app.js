var express = require('express');
var app = express();

//Static HTML files
app.use(express.static(__dirname + '/public'));

//Scripts
app.use('/scripts', express.static(__dirname + '/node_modules/scripts'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist'));

//Styles
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Fonts
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));

app.get('/cities', function(request, response) {
    var cities = ['Lotopia', 'Caspina', 'Indigo'];
    response.json(cities);
});

module.exports = app;

