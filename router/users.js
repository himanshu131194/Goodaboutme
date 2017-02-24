var router = require('express').Router();
var userServices = require('../services/user-services');
var passportAuth = require('../services/passport_auth');

// -----------------------------INDEX---------------------------------------

router.get('/', function(req, res){
    if (req.user)
	 res.render('index', {user:req.user.username});
    else
     res.render('login');    
})

router.post('/', function(req ,res){
    userServices.addPost(req.body, function(err){
        if (err) {
            res.render('index', {message : err});
        }else
            res.render('index', {message : 'Yep! added successfully'})
    })
})

// ----------------------------LOGIN--------------------------------------

router.get('/login', function(req, res){
    if (req.user) {
        res.redirect('/users');
    }else
        res.render('login', {err: req.flash('loginMessage')});
})

router.post('/login', passportAuth.isAuthenticated, function(req ,res){
    if (req.body.email=='') {
        req.flash('loginMessage', 'empty fields');
        res.render('login', {err: req.flash('loginMessage')});
    }
});


// -----------------------------SIGNUP--------------------------------------

router.get('/signup', function(req, res){
    if (req.user) {
        res.render('signup' , {err: null, user:req.user.username });
    }else
        res.render('signup' , {err: null});
});

router.post('/signup', function(req, res, next){
    // get email
    userServices.checkEmail(req.body.email, function(err, data){
        if (data) {
            req.flash('emailError', 'email already exists');
            return res.render('signup', {emailError: req.flash('emailError')});
        }
       userServices.addUser(req.body, function(err){
           if (err) {
                return res.render('signup' ,{err: err});
           }else{
                return res.render('login');
           }
         });
       });      
    });



// ------------------------------LOGOUT----------------------------------------
router.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/users/login');
})


module.exports = router;	