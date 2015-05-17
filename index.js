"use strict";

var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var http = require('http');
var fs = require('fs');
var marked = require('marked');
var app = express();

mongoose.connect('mongodb://localhost/zoidepomb_db');

var db = mongoose.connection;

db.on('error', function(err){
  console.log('Db Error ', err);
});

db.on('open', function(){
  console.log('Connected!');
});

var Post = require('./models/posts');

app.use(express.static('assets'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.set('view options', {
    layout: false
});

app.get('/', function(req, res){
  Posts(res, 9, 0);
});

function Posts(res, limit, skip){
  Post.find({}, function(err, posts){

    var ultimopost = posts.slice(0,1);
    var ultimosposts = posts.slice(1,3);
    var outrosposts = posts.slice(3);
    Post.count().exec(function(err, count){
      res.render('home', {ultimopost : ultimopost[0], ultimosposts : ultimosposts, outrosposts : outrosposts, totalPages : count/limit, paginaAtual : skip+1 });
    });
  }).sort({'_id': -1}).limit(limit).skip(skip);
}

app.get('/page/:pagenumber', function(req, res){
  var page = req.params.pagenumber;
  page--;
  Posts(res, 9, page * 9);
});

app.get('/post-edit', function(req, res){

  var postData = {
      title : '',
      permalink : '',
      content: '',
      excerpt : '',
      tags : '',
      categories : '',
      image : ''
  }
  res.render('post-edit', postData);
});

app.get('/post-edit/:permalink', function(req, res){
  var id = req.params.permalink;

  var postData = {
      title : '',
      permalink : '',
      content: '',
      excerpt : '',
      tags : '',
      categories : '',
      image : ''
  }

  if(id != ""){
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
            res.render('post-edit', postData);
          }else{
            res.render('404');
          }
      });
  }

});

app.get('/post/:permalink', function(req, res){

  var id = req.params.permalink;

  var postData = {
      title : '',
      permalink : '',
      content: '',
      excerpt : '',
      tags : '',
      categories : '',
      image : ''
  }

  if(id != ""){
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

          res.render('post', postData);
        }else{
          res.render('404');
        }
      });
  }else{
    res.render('404');
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

  if(postData.permalink == ''){
     postData.errorPermalink = 'Preencha o permalink...';
  }

  if(postData.permalink != ''){

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
            console.log('Post atualizado com sucesso');
          });

        }else{

          var post = new Post ({
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

  res.redirect('/post-edit/'+postData.permalink);

});

app.get('/contact', function(req, res){
  res.render('contact', {
      title: 'Hey Contact',
      content: 'Hello there, layout Contact!! Pages!!!!'
    });
});

http.createServer(app).listen(3000);

/*var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Running on  port http://%s:%s",host, port);
});*/
