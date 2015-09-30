$(document).ready(function(){
   
    $("#detailstopsalefudong").jCarouselLite({
		btnNext: "#detailsrightbar",
		btnPrev: "#detailsleftbar",
		vertical: false,
		play:false,
		auto: 3000,
		visible: 6,
        scroll: 2,
		//mouseWheel: true,
		speed: 800
    });
	   
    if ($(".jqzoom img").attr('jqimg'))
    {
        $(".jqzoom").jqueryzoom({ xzoom: 400, yzoom: 270 });
    }  
	
	
	
		var validator = $(".theAddressForm").validate({
			rules: {
				email: {required: true,maxlength: 60,email: true},
				content: {required: true,maxlength: 300},
				rating: {required: true},
				nickname: {required: true,maxlength: 30}
			},
			messages: {
				email: {required: email_msg,maxlength: email_maxlength_msg},
				content: {required:content_msg,maxlength: content_maxlength_msg},
				rating: {required:rating_msg},
				nickname: {required:nickname_msg,maxlength: nickname_maxlength_msg}
			},
			submitHandler: function() {
				var content = $("#msg_content").val();
				var gid     = $("#gid").val();
				var nickname = $("#nickname").val();
				var email = $("#email").val();
				var rating = $("input[name='rating']:checked").val();
				if (nickname == undefined) return false;
				if (email == undefined) return false;
				if (rating == undefined) return false;
				if (content == undefined) return false;
				$.ajax({
					type: "POST",
					data:{'rank':rating,'email':email,'content':content,'nickname':nickname,'id':gid},
					url: '/m-comment.htm',
					beforeSend:function(){$("#ajaxmsg").html(" <img src='/temp/skin1/images/990000_bai.gif' id='verify' style='vertical-align: middle' > Processing ...");	}, 
					success: function(msg){
						$("#msg_content").val('');
					//	ymPrompt.succeedInfo({message:msg,width:300,height:160,title:'System Message',handler:null});
						$("#ajaxmsgre").html(msg);						
					} 
				});
				},
			success: function(label) {
				// set &nbsp; as text for IE
				label.html("&nbsp;").addClass("checked");
			}
		});
	
		$('#content').inputlimitor({
			limit: 300,
			boxId: 'limitingtext',
			boxAttach: false
		});
	
	
/*   if ($.cookie('WEBF-email') != null && $.cookie('WEBF-firstname')!= null){
	   var zifu = $.cookie('WEBF-email');
	   var niname = $.cookie('WEBF-firstname');
	   $("#review_w #email").val(zifu);
	   $("#review_w #nickname").val(niname);
	}
*/	
	
	
	
	
	
	
	
	//var comm_url = document.location.href;
	//comm_load(comm_url);
	
	$("#review a").livequery("click",function(){
		page_url = $(this).attr("atr");
		if (page_url!=undefined)
		comm_load(page_url);
	});
	
	
	$("#PB_Page_Select").livequery("change",function(){
		page_url  = $("#PB_Page_Select").attr("atr");
		pageno    = $("#PB_Page_Select").val();
		comm_load(page_url+pageno);
	});
	
	
	function comm_load(page_url){
		$.ajax({
			type: "GET",
			url: page_url,
			success: function(msg){
				var stext = $(msg).find('#review').html();
				if (stext.indexOf('review_title')>=0){
					$('#review').html(stext);
				}else{
					$('#review').remove('');
				}
			}
		});
	}
});

