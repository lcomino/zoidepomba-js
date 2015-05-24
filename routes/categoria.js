module.exports = function(app) {
  var mongoose = require('mongoose'),
  Post = mongoose.models.Post,
  api = {};

  api.posts = "";

  app.get('/categoria/:categoria', function(req, res){
    "use strict";
    var categoria = req.params.categoria;
    var reg = new RegExp(categoria);
    console.log(reg);
    var query = Post.find({});
    query.where('categories').in([reg]);
    query.sort({'_id': -1});
    query.exec(function(err, posts){
      var ultimopost = [],
          ultimosposts = [],
          outrosposts = [],
          numeroPosts = 0,
          url = "";

      url = req.protocol + '://' + req.get('host') + req.originalUrl;

      if(posts.length === 0){
        posts = [Post];
        res.render('404');
      }

      ultimosposts = posts.slice(0,2);
      outrosposts = posts.slice(2);

      res.render('home', {ultimopost : ultimopost[0], ultimosposts : ultimosposts, outrosposts : outrosposts, url : url});
    });
  });
};
