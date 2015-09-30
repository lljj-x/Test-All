	$(function(){
	//弹出弹出层
	$(".popShare").click(function(){
		var that =  $(this);
		var goodsId = 'popBox'+that.attr('data-goodsId');
	    var Id = that.attr('data-goodsId');
		fb_signup(goodsId,Id);
	});
	$(".freeTrialBox_infoBtn,.freeTrialBox_details").mouseover(function(){
		$(".freeTrialBox_details").show();

	});
	$(".freeTrialBox_infoBtn,.freeTrialBox_details").mouseout(function(){
			$(".freeTrialBox_details").hide();
	
		
	})
	//关闭弹出层
	$(".popBox_close_btn").click(function(){
			easyDialog.close();	
	});

	$(".popbox_step2_faceBtn").hover(function(){
		var that = $(this);
		that.find(".fb_CommentWart").show();
		//var fbuid = $.cookie('fbuid');
		//var page_id = 128779990540366;
		//var fql_query = "select uid,email,name from user where uid in (SELECT uid FROM page_fan WHERE page_id = " + page_id + " and uid=" + fbuid + ")";
		//var the_query = FB.Data.query(fql_query);

		//the_query.wait(function (rows) {
			
			//if (rows.length == 1 && rows[0].uid == fbuid) {
			//   that.find(".fb_Comment").hide();
			var goodsId = $("#hidden-goodsId").val();
			if (goodsId) {
				$.getJSON('/m-share-a-add_link_auto-pid-'+goodsId+'.htm?jsoncallback=?', function(data){
					
					data = data && data.data ? data.data : data;
					var url= "http://www.dresslily.com"+data;
					$('#goods_fbComment').attr({'fblink':url,'fblink2':url});
					that.find(".fb_CommentWart").hide();

				});
			}
			/*   
			}else{
				that.find(".fb_Comment").show(); 
			}
			
			
		});*/
		},function(){
		
		});
	/*
	$(".fb_Comment").live('click',function(){
		alert("Please Like us on Facebook");
	});
	*/
	window.fbAsyncInit = function() {
		FB.init({ appId: '407411789363512', status: true, cookie: true, oauth: true, xfbml: true });
	};
$('a.fbComment').click(function(){
	easyDialog.close();

})
function dinoLoginForFB(fbuid,fbtoken,fname,lname,fbEmail,fstats,status){
    if(status==1)
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
               $.cookie('fb_email', fbEmail, {expires: 365, path: '/'});
			   $(".fbComment").attr('fbuser',fname);
            }
        });
    }
}

	function fb_signup(goodsId,Id) {
		   FB.init({ appId: '407411789363512', status: true, cookie: true, oauth: true, xfbml: true });
		   FB.login(function(response) {
			if (response.authResponse) {
				var fbuid = response.authResponse.userID;
				var fbtoken = response.authResponse.accessToken;
				var page_id = 189166971214680;
				var fql_query = "select uid,email,name from user where uid in (SELECT uid FROM page_fan WHERE page_id = " + page_id + " and uid=" + fbuid + ")";
				var the_query = FB.Data.query(fql_query);
				the_query.wait(function (rows) {
					if (rows.length == 1 && rows[0].uid == fbuid) {
					   $('#fbComment'+Id).hide(); 
					}

				});
				if($.cookie('fbuid')==null){
					$.cookie('fbuid', fbuid, {expires: 365, path: '/'});
				}
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
					if(goodsId){
						easyDialog.open({
						  container : goodsId
						});   
					}
				} else {
					return;
				}
        }, {scope:'email'});
		
	}

})