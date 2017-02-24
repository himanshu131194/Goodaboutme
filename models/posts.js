var mongoose = require('mongoose');

var Posts = new mongoose.Schema({
	postTitle: {type: String, required: [true, 'post title is important']},
	postMeta : {type: String, required: [true, 'write a brief description about post']},
	postData : {type: String, required: [true, 'write a brief description about post']},
	date : {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Posts', Posts);