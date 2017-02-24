var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = new mongoose.Schema({
	username: {
		type: String, required: [true, "username cant be empty"], unique: true
	},
    email: {
    	type: String, required: [true, "email cant be empty"], unique: true
    },
    password: {
    	type: String, required: [true, "passsword cant be empty"]
    }
});

User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);