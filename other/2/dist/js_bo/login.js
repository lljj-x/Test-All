(function(){
	//ie兼容placeholder 属性
	// $('input, textarea').placeholder();

	var  ArrayInput = $("#js_loginBord").find(".input-group").find("input");

	$.each(ArrayInput, function(index, val) {
		/* iterate through array or object */
		var $this = $(val),
		 	thisPlaceholder = $this.attr("placeholder");
		 	
		$this.focusin(function() {
			//如果是点击选择生日
			if($this.hasClass('birthday')){
				laydate({
				    elem: '#js_regBirthday',
				    start: '1990-1-1 00:00:00', 
				    max: laydate.now(), //最大日期
				    choose: function(datas){
				    	//$this.parent().find(".placeholderText").hide();
				    }
				});
			}
		});
	});
})();

//验证手机，发送验证码 （注册，手机动态登录共用）
(function(){
	var $js_smsCode = $("#js_smsCode");

	if($js_smsCode.length > 0){
		//验证手机号码
		$("#js_regPhone").on('keyup', function() {
		    var val = this.value,
		        thisType = this.getAttribute("data-type"),
		    reg = /^1[3|4|5|7|8][0-9]\d{8}$/;

		    if (reg.test(val) && !$js_smsCode.hasClass('send-msg-now')) {
		        $js_smsCode.removeClass('no-click').removeAttr("disabled"); 
		    } else {
		        $js_smsCode.addClass('no-click').prop("disabled", "disabled");
		    }
		});

		//点击发送验证码
		$js_smsCode.on("click",function(){
			var J_btn = $(this),
				J_input = $("#js_regPhone"),
				J_enterVerifycode = $("#js_enterVerifycode"),
				J_codeInput = $("#js_regPhoneCode"),
				J_accessCode = $("#js_accessCode"),
				J_accessCodeVal = J_accessCode.val(),
				phone = J_input.val();

			var thisType = J_input.attr("data-type");

			//如果验证码为空，或者验证码长度不为4，则直接返回，不执行倒计时和发送Ajax等代码
			if(J_accessCodeVal === "输入验证码" || J_accessCodeVal.length != 4){
				J_accessCode.blur();
				return false;
			}

			J_btn.addClass('no-click').prop("disabled", "disabled");

			$.ajax({
				url: '/m-users-a-send_message.htm',
				type: 'POST',
				dataType: 'json',
				data: {phone: phone, type: thisType,code:J_accessCodeVal}
			})
			.done(function(data) {
				var status = data.status;

				if(status === 0){//验证码发送成功
					J_btn.addClass('send-msg-now');
					J_enterVerifycode.hide("slow");

					J_btn[0].innerHTML = 60;

					function time(){
						var send_time = J_btn[0];
						send_time.innerHTML = parseInt(send_time.innerHTML)-1;
						//当数字跑到0的时候，一切恢复原状
						if(send_time.innerHTML == 0){
							J_btn[0].innerHTML = "获取短信验证码";
							clearInterval(t); 
							J_btn.removeClass('no-click').removeAttr("disabled").removeClass('send-msg-now');  
						}
					}
					var t = setInterval(time,1000);
					// J_codeInput.focus();
				}else{
					layer.open({
						btn: ['ok'],
						content: data.msg,
						end: function(){
							J_input.focus();
						}
					});
					J_btn.removeClass('no-click').removeAttr("disabled");
				}
			});
		});
	}
})();

$(function(){

	$("#js_loginBord").find(".input-group").find("input").on("focus",function(){
		var $this = $(this),
			$thisParent = $this.parents(".input-group");
		$thisParent.addClass('active').siblings('.input-group').removeClass('active');
	});

	$("#js_refreshVerifycode,.js_refreshVerifycode").click(function(){
		this.src= this.getAttribute('data-src') + "&" + (new Date()).getTime() ;
	})

});
