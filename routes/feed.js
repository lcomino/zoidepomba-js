module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),      
      Post = mongoose.models.Post,
      api = {};



      api.posts = function (res, req){
        "use strict";

        var query = Post.find({});
        query.sort({'_id': -1});
        query.exec(function(err, posts){

          var ultimopost = [],
              ultimosposts = [],
              outrosposts = [],
              numeroPosts = 0,
              url = "";

          url = req.protocol + '://' + req.get('host') + req.originalUrl;

          if(posts.length === 0)
            posts = [Post];

          res.render('feed', {posts : posts});

        });
      };

      app.get('/feed', function(req, res){
          api.posts(res,req);
      });

};
