var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zoidepomba');

var db = mongoose.connection;

db.on('error', function(err){
  console.log('Db Error ', err);
});

db.on('open', function(){
  console.log('Connected!');
});
