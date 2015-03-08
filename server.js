//require the necessary modules and basic app configuration
var express = require('express');
var morgan  = require('morgan');
var favicon = require('serve-favicon');
var app     = express();

//===============================================
//configure middleware(s)
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/build'));
app.use(favicon('./public/favicon.ico'));

//===============================================
//define routes
app.get('/', function(request, response){
    response.sendFile('/public/build/views/index.html', { root: '.' });
});

//===============================================
//set port and start server
var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('Good things happening on port ' + port + '...');
});