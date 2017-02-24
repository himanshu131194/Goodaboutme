var clientCredentilas = {
	access_token: '1371094058.90052b7.9efb2bbd2d6b4dc999c0245b68198adf',
	user_id: '1371094058',
	client_id: '90052b7d0d0b47b2a2734d6fd8bfa1ac',
	client_secret:'20e4ffba321a433abd27a6f59f18d458'
}

// EAACEdEose0cBABshviZBKJxenXZAPza4L6bUSlL3sFLGfwV65wxaS4R79IQAV4AL6CmlS5F4n3Ip59o2Bq74wUaKwZAPnuZC8QhGxZCuNzqBpOZA7t3Mr09ZAG76Gp4QShrZCCToKraUAI0yQZB93hM89NtIy4yqQubQxK6ckQs720rm3mTEyJdlpqVsuZBq6pWDcZD
// {
//   "id": "783889251724331",
//   "name": "Himanshu Savita"
// }

var instagramApis = {
	init : function(keys, resultObject){
		// Ajax request to get all media
		$.ajax({
			method:'GET',
			dataType: 'jsonp',
			url:'https://api.instagram.com/v1/users/self/media/recent/?access_token=1371094058.90052b7.9efb2bbd2d6b4dc999c0245b68198adf',
			//url:'https://api.instagram.com/v1/users/1371094058/media/recent/?access_token=1371094058.90052b7.9efb2bbd2d6b4dc999c0245b68198adf',
			success: function(responce){
				resultObject(responce);
			}
		})
	}
}


instagramApis.init(clientCredentilas, function(resultObject){
	console.log(resultObject);

	for (var i = 0; i < 4; i++) {
	  console.log(resultObject.data.images);
	    $('#instagram_photos').append("<a href='"+resultObject.data[i].link+"'><img src='"+resultObject.data[i].images.low_resolution.url+"' alt=''></a>");
	  //$('#footer-instagram').append("<div class='item'><a href='blog.html'><img src='"+resultObject[i].images.thumbnail.url+"' alt=''></a></div>");
	}
	
});


// Testin Ajax 
$('#download_resume').on('click', function(e){
    e.preventDefault();
    $.ajax({
    	type:'GET',
    	//dataType: 'json',
    	url:'/download',	
    	success: function(responce){
           console.log(responce);
    	}
    })
})




function addWaitngIcon(){
	$('#form_subscribe_email').html('<img src="/images/wating.gif" alt="">');
}

function removeWatingIcon(message){
	$('#form_subscribe_email').html('<p>'+message+'</p>');
}

$('#subscribe_email').on('click', function(e){
    e.preventDefault();
    $.ajax({
    	type:'post',
    	data : {email : $('#emailSubVal').val()},
    	beforeSend: function(){
    	   addWaitngIcon();
    	},
    	complete: function(response){
    	   removeWatingIcon(response.responseText);
    	},
    	dataType: 'text',
    	url:'/about',	
    	success: function(responce){
           console.log(responce.msg);
    	}
    })
})



//---------------------------GET DATE FORMAT
var getDateFormat = function(ele){
    for(var i=0; i<ele.length; i++){
        var d = new Date(ele[i].innerHTML);
        ele[i].innerHTML = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    }
}
getDateFormat($('.p-date'));

































