module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      marked = require('marked'),
      Post = mongoose.models.Post,
      api = {};

      api.posts = function (res, req, limit, skip){
        "use strict";
        Post.find({}, function(err, posts){

          var ultimopost = [],
              ultimosposts = [],
              outrosposts = [],
              numeroPosts = 0,
              url = "";

          url = req.protocol + '://' + req.get('host') + req.originalUrl;

          if(posts.length === 0)
            posts = [Post];

          //ultimopost = posts.slice(0,1);
          ultimosposts = posts.slice(0,2);
          outrosposts = posts.slice(2);

          Post.count().exec(function(err, count){
              numeroPosts = count;
              res.render('home', {ultimopost : ultimopost[0], ultimosposts : ultimosposts, outrosposts : outrosposts, totalPages : numeroPosts/limit, paginaAtual : (skip/8)+1, url : url, post : Post});
          });

        }).sort({'_id': -1}).limit(limit).skip(skip);

      };



      app.get('/', function(req, res){
        api.posts(res, req, 8, 0);
      });

      app.get('/page/:pagenumber', function(req, res){
        var page = req.params.pagenumber;
        page--;
        api.posts(res, req, 8, page * 8);
      });

      app.get('/new-post', function(req, res){
        var postData = {
            title : '',
            permalink : '',
            content: '',
            excerpt : '',
            tags : '',
            categories : '',
            image : ''
        };
        res.render('post-edit', {post : postData});
      });

      app.get('/:permalink/edit', function(req, res){
        var id = req.params.permalink;

        var postData = {
            title : '',
            permalink : '',
            content: '',
            excerpt : '',
            tags : '',
            categories : '',
            image : ''
        };

        if(id !== ""){
            Post.find({permalink : id}, function(err, post){
                if(err)throw err;
                if(post.length > 0){
                  var p = post[0];

                  postData.title = p.title;
                  postData.permalink = p.permalink;
                  postData.content = p.content;
                  postData.excerpt = p.excerpt;
                  postData.tags = p.tags.join(',');
                  postData.categories = p.categories.join(',');
                  postData.image = p.image;
                  res.render('post-edit', {post : postData});
                }else{
                  res.render('404');
                }
            });
        }

      });

      app.post('/post', function(req, res){

        var postData = {
                title : '',
                permalink : '',
                content: '',
                excerpt : '',
                tags : '',
                categories : '',
                image : ''
            };

        postData.title = req.body.title;
        postData.permalink = req.body.permalink;
        postData.content= req.body.content;
        postData.excerpt = req.body.excerpt;
        postData.tags = req.body.tags.split(',');
        postData.categories = req.body.categories.split(',');
        postData.image = req.body.image;

        if(postData.permalink === ''){
           postData.errorPermalink = 'Preencha o permalink...';
        }

        if(postData.permalink !== ''){

          Post.find({permalink : postData.permalink}, function(err, post){

              if(err)throw err;

              if(post.length > 0){

                var p = post[0];

                p.title = postData.title;
                p.permalink = postData.permalink;
                p.content = postData.content;
                p.excerpt = postData.excerpt;
                p.tags = postData.tags.join(',');
                p.categories = postData.categories.join(',');
                p.image = postData.image;

                p.save(function(err){
                  if(err)throw err;
                });

              }else{

                post = new Post ({
                  title : req.body.title,
                  permalink : req.body.permalink,
                  content: req.body.content,
                  excerpt : req.body.excerpt,
                  tags : req.body.tags.split(','),
                  categories : req.body.categories.split(','),
                  image : req.body.image
                });

                post.save(function(err){
                  if(err)throw err;
                  console.log('Post salvo com sucesso');
                });
              }
          });
        }

        res.redirect('/'+postData.permalink+'/edit');

      });

      app.delete('/post/:permalink', function(req, res){
        var id = req.params.permalink;
        Post.find({permalink : id}).remove().exec();
      });

      app.get('/buscar/:words', function(req, res){
          var words = req.params.words.split('+'),
              regex = [];

          words.forEach(function(word){
            regex.push(new RegExp(word));
          });
          
          var query = Post.find({});
          query.or({'permalink' : { $in : regex}});
          query.or({'tags' : { $in : regex}});
          query.or({'categories' : { $in : regex}});
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
              res.render('404', {post : Post});
            }


            //ultimopost = posts.slice(0,1);
            ultimosposts = posts.slice(0,2);
            outrosposts = posts.slice(2);

            res.render('home', {ultimopost : ultimopost[0], ultimosposts : ultimosposts, outrosposts : outrosposts, url : url, post : Post});
          });

      });


      app.get('/:permalink', function(req, res){
        var id = req.params.permalink;

        var postData = {
            title : '',
            permalink : '',
            content: '',
            excerpt : '',
            tags : '',
            categories : '',
            image : '',
            url : ''
        };

        if(id !== ""){
            Post.find({permalink : id}, function(err, post){
                if(err)throw err;

                if(post.length > 0){

                var p = post[0];

                postData.title = p.title;
                postData.permalink = p.permalink;
                postData.content = marked(p.content);
                postData.excerpt = p.excerpt;
                postData.tags = p.tags.join(',');
                postData.categories = p.categories.join(',');
                postData.image = p.image;
                postData.url = req.protocol + '://' + req.get('host') + req.originalUrl;

                Post.count().exec(function(err, count){
                    numeroPosts = count;
                  Post.find({permalink : {"$ne": id}}, function(err, posts){
                    if(err) throw err;

                    res.render('post', {post : postData, outrosPosts : posts});
                  }).sort({'_id': -1}).limit(4).skip(Math.floor(Math.random() * numeroPosts - 1));
                });


              }else{
                res.render('404');
              }
            });
        }else{
          res.render('404');
        }
      });

};
