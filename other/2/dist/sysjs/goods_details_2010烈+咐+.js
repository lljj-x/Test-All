$(document).ready(function(){
   
   if(typeof(hs) != 'undefined'){
		hs.graphicsDir = '/sysjs/hs/graphics/';
		hs.align = 'center';
		hs.transitions = ['expand', 'crossfade'];
		hs.outlineType = 'rounded-white';
		hs.wrapperClassName = 'draggable-header';
		hs.headingEval = 'this.a.title';
		hs.creditsText = '';
		hs.fadeInOut = true;
		hs.dimmingOpacity = 0.75;
		hs.useBox = true;
		hs.width = 580;
		hs.height = 480;
		//Add the controlbar
		if (hs.addSlideshow) hs.addSlideshow({
			//slideshowGroup: 'group1',
			interval: 5000,
			repeat: false,
			useControls: true,
			fixedControls:  'fit',
			overlayOptions: {
				opacity: .75,
				position: 'bottom center',
				hideOnMouseOut: true
			}
		});	
   }
    
   
   $('#goods_desc A').each(function(){
	  var hreftext =  $(this).attr('href') == undefined ?'':$(this).attr('href');
		  //alert(hreftext);
	  if(hreftext.indexOf('uploads/g-desc/')>=0){
		  //$(this).attr('onclick','return hs.expand(this)');
	   $(this).bind('click',function(){
			return hs.expand(this);		 
	  });
	  }
   });
   
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
	
	
	$(".xxmenu").mouseover(function(){
		$('#hhh_menu').show();
	});
	
	$(".xxmenu").mouseout(function(){
		$('#hhh_menu').hide();
	});
	
	
    $(".rollc").jCarouselLite({
		btnNext: ".next",
		btnPrev: ".prev",
		mouseWheel: true,
		auto: 4000,
		visible: 8,
        scroll: 4,
		speed: 800
    });
	
   
});

function showzhong(){
	$("#showflash").show();
}
function showsn(){
	$("#showsn").show();
}

