var express = require('express');
var app = express();
var defaultPort = 3000;

app.get('/', function(req, res) {
    res.send(200);
});

app.listen(defaultPort, 
    () => process.stdout.write(`Listening on port ${defaultPort}`));