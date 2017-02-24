var User = require('../models/users');
var Posts = require('../models/posts');
var bcrypt = require('bcrypt');
var user = new User();
var post = new Posts();

exports.addUser = function(userData, next){
 
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(userData.password, salt, function(err, hash) {
        // Store hash in your password DB. 
      user.password = hash;
    });
  });
      user.email = userData.email;
	 user.username = userData.username;
	
      user.save(function(err){
     	if (err) 
     		return next(err);
     	else
     		return next(null);
     })
}

exports.checkEmail = function(email, done){
     User.findOne({email: email}, function(err, data){
          if (err) {
               done(err, null);
          }else
               done(null, data);
     })
}


exports.addPost = function(addPost, next){
     post.postTitle = addPost.postTitle;   
     post.postMeta = addPost.postMeta;
     post.postData = addPost.postData;

     post.save(function(err){
          if (err) 
               return next(err);
          else
               return next(null);
     })
}    


