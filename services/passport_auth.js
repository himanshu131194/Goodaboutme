var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/users');


passport.use('local-login', new localStrategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback : true
} ,function(req, email, password, done){
	 User.findOne({email: email}, function(err , user){
      if (err) { return done(err); }
	    if (!user) {
	      return done(null, false, req.flash('loginMessage', 'No user has been found'));
	    }

	    if (!user.comparePassword(password)) {
	      return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password pal'));
	    }
	    return done(null, user); 
  })

}))


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.isAuthenticated = passport.authenticate('local-login', {
	successRedirect : '/users',
	failureRedirect: '/users/login',
	failureFlash: true 
})




