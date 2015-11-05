(function(){
	$(function(){

		//随机娶一张图片作为背景
		getBgImg();

		setBgFall();

		$(window).resize(function() {
			setBgFall();
	       
	    })
	});
	function setBgFall(){
		var clientHeight = $(window).height();
		var clientWidth = $(window).width();
		var warpH = clientHeight-$("#header").outerHeight(true);
		
		cutBgImg(clientWidth,warpH);
		
	}

	//随机娶一张图片作为背景
	function getBgImg(wWd,wHt){
		var $imgbg = $("#imgbg"),
			imgArr = $imgbg.data("imgsrc").split("|");

		//随机取出来一张图片
		$img = $('<img src="'+imgArr[parseInt(Math.random()*imgArr.length,10)]+'" width="100%" height="100%"/>');
		$imgbg.html($img);
	}

	function cutBgImg(wWd,wHt){
		var $img = $("#imgbg").find('img');

		var imgWd = 1920,
			imgHt = 1000,
			newImgWd,
			NewImgHt,
			top=0,
			left=0;
		
		if(wWd>wHt){//判断电脑是横幅
		   newImgWd=wWd;
		   NewImgHt	= wWd*imgHt/imgWd;

		  if(NewImgHt<wHt){//如果新算出来的图片高度还是小于窗口的高度就以窗口的高度为基准
			    NewImgHt=wHt;
		   		newImgWd=imgWd*wHt/imgHt;
				left = (0-(newImgWd-wWd))/2;

		   }else{
			   top = (0-(NewImgHt-wHt))/2;
		   }

		}else{//判断电脑是竖立
		   NewImgHt=wHt;
		   newImgWd=imgWd*wHt/imgHt;

		   if(newImgWd<wWd){//如果新算出来的图片宽度还是小于窗口的宽度就以窗口的宽度为基准
		   		newImgWd = wWd;
				NewImgHt = wWd*imgHt/imgWd;
				top = (0-(NewImgHt-wHt))/2;

		   }else{
				left = (0-(newImgWd-wWd))/2;   
		   }
		}
		$img.css({"height":NewImgHt,"width":newImgWd,"top":top,"left":left});
	}
})();

(function(){
	$('#refresh-verifycode').click(function() {
        var $element = $('#img-verifycode');

        $element.attr('src', $element.attr('data-src') + '&' + Math.random());
    });

    //检测是否支持placeholder属性
	function hasPlaceholderSupport(){
		var  i = document.createElement("input");
		return 'placeholder' in i ;
	}
	function cheackPlacehold($wrapBox){
		$wrapBox.find('input').each(function(index, el) {

			if($(this).val() == $(this).attr("placeholder")){
				$(this).val("");

			}
		});
	}


	function resetPas(){ 
		if($("#rest_findpw_form").length>0){
			$("#rest_findpw_form").validate({ 
				rules: {
					email: {
			            required: true,
			            maxlength: 60,
			            email: true
			        },
			        password: {
						required: true,
						maxlength: 60,
						minlength: 6
					},
					password_confirm: {
						required: true,
						minlength: 6,
						maxlength: 60,
						equalTo: "#password"
					}

				},
				messages: {
					reg_email: {
	                    required:  jsLg.formMsg.email_require_msg,
	                    email: jsLg.formMsg.email_require_msg,
	                    minlength:   jsLg.formMsg.email_require_length,
	                    maxlength: jsLg.formMsg.email_maxlength,

	                },
	                password: {
	                    required:  jsLg.formMsg.password,
	                    minlength: jsLg.formMsg.password_minlength,
	                    maxlength: jsLg.formMsg.passwor_maxlength,
	                    rangelength: jQuery.format( jsLg.formMsg.password_minlength)
	                },
	                password_confirm: {
	                    required:  jsLg.formMsg.password_repeat,
	                    minlength: jQuery.format(  jsLg.formMsg.password_minlength),
	                    maxlength: jsLg.formMsg.passwor_maxlength,
	                    equalTo:   jsLg.formMsg.password_equalTo
	                }
				},
				errorPlacement:function(error,element){
			        element.parent().find("label.checked").remove();
			        error.appendTo(element.parent());

			    },
			    success: function(label) {
			         label.remove();
			    }
			});

		};
	}

	function sendEmail(){
		if($("#findpw_form").length>0){
			$("#findpw_form").validate({
				rules: {
					email: {
			            required: true,
			            maxlength: 60,
			            email: true
			        },
			        verifycode:{
						required: true,
						minlength:4
						//remote: "/fun/?act=chk_ver"
					}

				},
				messages: {
					email: {
			            required:jsLg.formMsg.email_require_msg,
			            email: jsLg.formMsg.email_require_msg,
			            maxlength: jsLg.formMsg.email_maxlength
			        },
			        verifycode:{
						required: jsLg.formMsg.please_enter_verification_code,
						minlength: jsLg.formMsg.verification_code_minlength
						//remote: jQuery.format(jsLg.formMsg.verification_code_you_entered_is_incorrect)
					}
				},
				errorPlacement:function(error,element){
			        element.parent().find("label.checked").remove();
			        error.appendTo(element.parent());

			    },
			    success: function(label) {
			         label.remove();
			    }
			});
		}
	}
	//发送邮件
	$("#js_sendEmial").click(function(e){
		if(!hasPlaceholderSupport()){
			cheackPlacehold($("#findpw_form"));
		}
		sendEmail();
	});
	//重置密码
	$("#js_changePaw").click(function(e){ 
		if(!hasPlaceholderSupport()){
			cheackPlacehold($("#rest_findpw_form"));
		}
		resetPas();
	});
})()