var mongoose = require('mongoose');

var Visitors = new mongoose.Schema({
    email:{
    	type: String, unique: true, required: [true, 'email address cant be blank']
    }
})

module.exports = mongoose.model('Visitors', Visitors);