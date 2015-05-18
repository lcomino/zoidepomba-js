"use strict";

var mongoose = require('mongoose'),
    Schema    = mongoose.Schema,
    ObjectId  = Schema.ObjectId;

var fields = {
  title : {type : String},
  excerpt : {type : String},
  image : {type : String},
  content : {type : String},
  tags : {type : []},
  categories : {type : []},
  permalink : {type: String},
  comments : [{
    user : {type : String},
    body : {type: String}
  }],
  active : {type: Boolean},
  created : {type : Date, default: Date.now}
};

var postSchema = new Schema(fields);

postSchema.path('title').required('The title cannot be blank');
postSchema.path('excerpt').required('The excerpt cannot be blank');
postSchema.path('content').required('The content cannot be blank');
postSchema.path('tags').required('The tag cannot be blank');
postSchema.path('categories').required('The categorie cannot be blank');

/**
* Methods from Post Model
*/
postSchema.methods = {
  addComment: function(user, comment){
    this.comments.push({
      user : user,
      body: comment
    });
  },
  random : function(cb) {
    this.count(function(err, count) {
      if (err) return cb(err);
      var rand = Math.floor(Math.random() * count);
      this.findOne().skip(rand).exec(cb);
    }.bind(this));
  }
};

module.exports = mongoose.model('Post', postSchema);
