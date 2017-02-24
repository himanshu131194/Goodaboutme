var router = require('express').Router();
var postServices = require('../services/post-services');

router.get('/post/:id', function(req ,res){
	
    postServices.getPost(req.params.id, function(err , data){
    	if (err) {
    		return res.render('post',{layout: false, singlePost: 'Not found'});
    	}
    	    return res.render('post',{layout: false, singlePost: data});
    })
})


router.get('/', function(req ,res){

	recentPosts = {};
	postServices.getRecentPosts(2, function(err, data){
		if (err) {
			recentPosts.data = null;
		}
		    recentPosts.data = data;
	})
    postServices.getPost(null, function(err , data){
    	if (err) {
    		return res.render('home',{layout: false, allPosts: 'Not found'});
    	}
    	    return res.render('home',{layout: false, allPosts: data , recentPosts : recentPosts.data});
    })
})


router.get('/', function(req ,res){

    postServices.getPost(null, function(err , data){
    	console.log(data);
    	if (err) {
    		return res.render('home',{layout: false, allPosts: 'Not found'});
    	}
    	    return res.render('home',{layout: false, allPosts: data});
    })
})






router.get('/about', function(req, res){
	res.render('about', {layout: false});
})

router.post('/about', function(req, res) {
       if (req.xhr) {
       	 var emailVisitor = req.body.email.trim();
       	 postServices.addVisitorsEmail(emailVisitor, function(err){
       	 	 if (err) {
       	 	 	 return res.send('Email already exits');
       	 	 }
       	 	     return res.send('Thanks for subscription');
       	 })
       }   
 });


router.get('/download', function(req, res) {
  var isAjaxRequest = req.xhr;
       if (isAjaxRequest) {
       	  console.log('this');

       }    
 });

// -----------------------------------CONTACT-------------------------------------------
router.get('/contact', function(req, res){
	postServices.getRecentPosts(2, function(err, data){
         if (err) {
         	return res.render('contact', {layout: false, recentPosts: null});
         } 
            return res.render('contact', {layout: false, recentPosts: data})
	})      
})


module.exports = router;