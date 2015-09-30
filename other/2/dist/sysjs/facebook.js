//277682888966553
(function () {
    $('#img-loginFacebook').click(facebook_signup);
}());

window.fbAsyncInit = function() {
    FB.init({ appId: '407411789363512', status: true, cookie: true, oauth: true, xfbml: true });
};
(function() {
    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.src = 'http://connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementsByTagName('head')[0].appendChild(e);
} ());

function facebook_signup() {

       FB.login(function(response) {
        if (response.authResponse) {
            var fbuid = response.authResponse.userID;
            var fbtoken = response.authResponse.accessToken;
                FB.api({
                    method: 'fql.query',
                    query: 'select first_name,last_name,email from user where uid=' + fbuid
                },
                    function(rep){
                        var fname = rep[0].first_name;
                        var lname = rep[0].last_name;
                        var fbEmail = rep[0].email;
                        dinoLoginForFB(fbuid,fbtoken,fname,lname,fbEmail,0,1);
                    }
                );
            } else {
                return;
            }
        }, {scope:'email'});

}


function dinoLoginForFB(fbuid,fbtoken,fname,lname,fbEmail,fstats,status){
    if(status==1)
    {
        //ÅÐ¶Ïemail
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(reg.test(fbEmail))
        {
			var postData = "FTextUserEmail="+fbEmail+"&ebID="+fbuid+"&firstname="+fname+"&lastname="+lname+"&FTextUserPwd2="+parseInt(Math.random()*1000000);
			postData = postData + "&ebToken=" + fbtoken + "&ebStats=" + fstats + "&ebUid=" + fbuid + "&actions=facebookLogin";
			$.ajax({
				type:'post',
				url: 'http://' + location.hostname + '/fb_eb_login.php',
				data:postData,
				error:function(XMLHttpRequest, textStatus, errorThrown){
							//alert("AJAX Login Error."+textStatus+"-"+errorThrown,26,0,fbEmail);
						},
				success:function(result){
					window.location.href =  '/m-users-a-profile.htm';
				}
			});
		}
        else
        {
            alert('Our system does not support Facebook accounts registered using mobile numbers. Please re-register with an email address.');
            window.location.href =  '/m-users-a-sign.htm';
		}
    }
}