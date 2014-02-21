var express = require('express'),
    routes = require('./routes'),
    util = require('util'),
    path = require('path'),
    fs = require('fs');

var app = module.exports = express();

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: true });
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('view options', { pretty: true });
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/upload', routes.upload_get);
app.post('/upload', routes.upload_post);

app.listen(3000);
