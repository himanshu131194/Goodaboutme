var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose'); 
var MongoStore = require('connect-mongo')(session);
var app = express();

mongoose.connect('mongodb://portfolio:12345@ds017246.mlab.com:17246/portfolio', function(err){
	if (err) {
		throw err;
	}
	console.log('connect to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());
app.use(session({
	secret: 'himanshu123@',
	resave: true,
	saveUninitialized: true,
	store : new MongoStore({
	  url: 'mongodb://portfolio:12345@ds017246.mlab.com:17246/portfolio'	
	})
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.err = req.user;
	next();
});

var index = require('./router/index');
var users = require('./router/users');
app.use(index);
app.use('/users', users);




var port = (process.env.PORT || 3000);
app.listen(port);