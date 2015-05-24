var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app = express();

mongoose.connect('mongodb://127.0.0.1/zoidepomb_db');

var db = mongoose.connection;

db.on('error', function(err){
  console.log('Db Error ', err);
});

db.on('open', function(){
  console.log('Connected!');
});

var Post = require('./models/posts');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.set('view options', {
    layout: false
});

// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});

http.createServer(app).listen(3000);
