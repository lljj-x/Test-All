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
		var warpH = clientHeight;

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

	//登录成功回调
	function signSuccessFun(){
		var $email = $('#email'),
			$password = $('#passwordsign'),
			$btn = $("#js_signInBtn"),
			$msgBox = $(".msg_error"),
			$atuologin = $("#js_autologin"),
			autoval = $atuologin.prop("checked") ? $atuologin.val() : 0,
			flow = $('#flow').val(),
			ref = $('#ref').val();

		//按钮不可点击
		$btn.attr("disabled","disabled").addClass('dataUp');
		setTimeout(function(){
    		if($btn.prop("disabled")){
    			$btn.removeAttr("disabled").removeClass('dataUp');
    		}
		}, 3000);
		$.ajax({
			type: "POST",
			url: HTTPS_LOGIN_DOMAIN+'/'+JS_LANG+'m-users-a-act_sign.htm',
			data: "email="+encodeURIComponent($email.val())+"&password="+encodeURIComponent($password.val())+"&autologin="+autoval,
			dataType:"text",
			success: function(msg){

				if (msg.indexOf('Success')>-1){

					if(ref != ''){
						window.location.href=ref; //返回
					}else{
						if (flow == 'checkout'){
							window.location.href = HTTPS_ORDER_DOMAIN +'/'+JS_LANG+'m-flow-a-checkout.htm'; //返回购物车
						}else{
							window.location.href='/'+JS_LANG+"m-users.htm";
						}
					}
				}else{
					$msgBox.show().html(msg);

					//释放按钮，允许可点击
					$btn.removeAttr("disabled").removeClass('dataUp');
				}
			}
		});
	};

	//注册验证成功回调
	function regSuccessFun(){
		var $email = $('#reg_email'),
			$password = $('#password'),
			$pwd_confirm = $('#password_confirm'),
			$btn = $("#js_registBtn"),
			$msgBox = $(".msg_error"),
			flow = $('#flow').val(),
			ref = $('#ref').val();

		//按钮不可点击
		$btn.attr("disabled","disabled").addClass('dataUp');
		setTimeout(function(){
    		if($btn.prop("disabled")){
    			$btn.removeAttr("disabled").removeClass('dataUp');
    		}
		}, 3000);
		$.ajax({
			type: "POST",
			url: HTTPS_LOGIN_DOMAIN+'/'+JS_LANG+'m-users-a-a_join.htm?jsoncallback=?',
			data: "email="+encodeURIComponent($email.val())+"&password="+encodeURIComponent($password.val()),
			dataType:"text",

			success: function(msg){
				$password.val('');
				$pwd_confirm.val('');

				if (msg.indexOf('ok')>-1){

					if(ref != ''){
						window.location.href = ref; //返回

					}else{

	                    if (flow == 'checkout'){
	                        window.location.href = HTTPS_ORDER_DOMAIN+'/'+JS_LANG+'m-flow-a-checkout.htm'; //返回购物车
	                    }else{
							window.location.href ='/'+JS_LANG+ "m-users.htm?type=2"
						}
	                }
				}else{
					$msgBox.show().html(msg);

					//释放按钮，允许可点击
					$btn.removeAttr("disabled").removeClass('dataUp');
				}

			}
		});
	};
	//Facebook 电话号码用户登陆验证回调
	function faceBookSuccessFun(){
		var $email = $('#fb_email'),
			$btn = $("#js_fb_signInBtn"),
			$msgBox = $(".fbmsg_error"),
			flow = $('#flow').val(),
			ref = $('#ref').val();

		var fbuid = $('#js_fbEMail').data("fbuid"),
		    fname = $('#js_fbEMail').data("fname"),
		    lname = $('#js_fbEMail').data("lname");
		//按钮不可点击
		$btn.attr("disabled","disabled").addClass('disabledBtn');

		$.ajax({
			type: "GET",
			url: '/fun/?act=fb_save_email',
			data: "email="+encodeURIComponent($email.val())+"&fbuid="+fbuid+"&firstname="+fname+"&lastname="+lname,
			dataType:"text",

			success: function(msg){
				

				if (msg==1){

					if(ref != ''){
						window.location.href = ref; //返回

					}else{

	                    if (flow == 'checkout'){
	                        window.location.href = HTTPS_ORDER_DOMAIN+'/'+JS_LANG+'m-flow-a-checkout.htm'; //返回购物车
	                    }else{
							window.location.href ='/'+JS_LANG+ "m-users.htm"
						}
	                }
				}else{
					//$msgBox.show().html(msg);

					//释放按钮，允许可点击
					$btn.removeAttr("disabled").removeClass('grayBtn');
				}

			}
		});
	}

	GLOBAL.login.sign($("#signinform"),signSuccessFun);
	//提交登录
	$("#js_signInBtn").click(function(e){
		if(!hasPlaceholderSupport()){
			cheackPlacehold($("#signinform"));
		}
		//GLOBAL.login.sign($("#signinform"),signSuccessFun);
	});
	// 7天自动登录
	$("#js_autologin").click(function(event) {
		/* Act on the event */
		var $this = $(this),
			selcet = $this.prop("checked");
		var $autoLoginTips = $("#js_autologin_msg"),
			tips = $autoLoginTips.attr("data-tips");

		$autoLoginTips.attr("data-tips",$autoLoginTips.text());
		$autoLoginTips.text(tips);

	});
	GLOBAL.login.register($("#signupform"),regSuccessFun);
	//提交注册
	$("#js_registBtn").click(function(e){
		if(!hasPlaceholderSupport()){
			cheackPlacehold($("#signupform"));
		}
		//GLOBAL.login.register($("#signupform"),regSuccessFun);
	});

	//弹出Facebook 邮箱提交
	$("#js_fb_signInBtn").click(function(e){
		if(!hasPlaceholderSupport()){
			cheackPlacehold($("#fb_EMailForm"));
		}
		//GLOBAL.login.register($("#signupform"),regSuccessFun);
	});
	$("#fb_EMailForm").validate({
            rules: {
                email: {
                    required: true,
                    maxlength: 60,
                    email: true,
					remote: '/'+JS_LANG+"index.php?m=users&a=check_email"
                }
            },
            messages: {
                email: {
                    required: jsLg.formMsg.email_require_msg,
                    email: jsLg.formMsg.email_require_msg,
                    maxlength: jsLg.formMsg.email_maxlength,
					remote: jQuery.format(jsLg.formMsg.email_in_user)
                }
            },
            submitHandler: function() {
                faceBookSuccessFun();
            },
            errorPlacement:function(error,element){
                element.parent().find("label.checked").remove();
                error.appendTo(element.parent());

            },
            success: function(label) {
                label.remove();
            }
        })
})();
