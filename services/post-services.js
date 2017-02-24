var Posts = require('../models/posts');
var Visitors = require('../models/visitors');

exports.getPost = function(post_id, done){
	var query = (post_id)? {_id: post_id} : {};

    Posts.find(query, function(err, data){
    	if (err) 
    		return done(err, null);
    	else
    		return done(null, data);
    })
}


exports.getRecentPosts = function(limit ,done){
	Posts.find({}, function(err, data){
    	if (err) 
    		return done(err, null);
    	else
    		return done(null, data);
    }).sort({date : -1}).limit(limit);
}



exports.addVisitorsEmail = function(email, done){
     visitor = new Visitors();

     visitor.email = email;
     visitor.save(function(err){
     	if (err) {
     		return done(err);
     	}
     	    return done(null)
     })
}