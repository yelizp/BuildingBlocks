var express = require('express');
var app = express();

var cities = require('./routes/cities');
app.use('/cities', cities);

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

module.exports = app;

