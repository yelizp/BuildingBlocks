var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use('/styles', express.static(__dirname + '/styles'));
app.use('/styles', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts'));

app.get('/cities', function(request, response) {
    var cities = ['Lotopia', 'Caspina', 'Indigo'];
    response.json(cities);
});

module.exports = app;

