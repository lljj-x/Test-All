<!DOCTYPE html>
<html lang="en">
<head>
	<? include 'top.htm'; ?>

	<link rel="stylesheet" href="http://www.wzhouhui.egocdn.com/temp/skin1/dist/mincss/login_min.css">
</head>
<body>
	<header id="header">
		<? include 'public_sign_top.htm'; ?>
	</header>
	
	<!-- 注册主体start -->
	<div class="login-main-wrap">
		<div class="public-login-page register-page w1200">
			<div class="left-pic"><img src="../dist/images/domeimg/lazyload1.gif" width="535" height="436" data-original="../dist/images/domeimg/login/login_left_2.png" alt=""></div>

			<div class="public-login-bord register-bord" id="js_loginBord">
				<form id="js_registerForm" action="" method="post" autofocus autocomplete="off">
					<div class="public-tit mb20 clearfix">
						<span class="fl tit">注册帐号</span>
						<span class="fr is-have">已有五洲会帐号， <a href="#">登录</a></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_name position-left"></i>
						<div class="input-wrap">
							<input type="text" name="phone" id="js_regPhone" data-type="1" class="phone" placeholder="请输入手机号">
						</div>
						<span class="position-right"><strong class="color_main f14">*</strong></span>
					</div>

					<div class="input-group message-group mb20">
						<div class="message-wrap clearfix">
							<div class="message fl">
								<input type="text" name="phoneCode" id="js_regPhoneCode" class="phoneCode" placeholder="短信验证码">
							</div>
							<button id="js_smsCode" type="button" class="smscode no-click fr" disabled="disabled">获取短信验证码</button>
						</div>
						<span class="position-right"><strong class="color_main f14">*</strong></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_password position-left"></i>
						<div class="input-wrap">
							<input type="password" name="password" id="js_regPassword" class="password" placeholder="请输入密码">
						</div>
						<span class="position-right"><strong class="color_main f14">*</strong></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_password position-left"></i>
						<div class="input-wrap">
							<input type="password" name="password_confirm" id="js_regPasswordConfirm" class="password_confirm" placeholder="确认登录密码">
						</div>
						<span class="position-right"><strong class="color_main f14">*</strong></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_email position-left"></i>
						<div class="input-wrap">
							<input type="text" name="email" id="js_regEmail" class="email" placeholder="E-mail地址">
						</div>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_birthday position-left"></i>
						<div class="input-wrap">
							<input type="text" name="birthday" id="js_regBirthday" class="birthday" placeholder="填写生日有惊喜哦~">
						</div>
					</div>
					
					<p class="btn-wrapper mb20"><label for="js_isagree"><input type="checkbox" name="isagree" checked="checked" class="isagree" id="js_isagree">&nbsp;&nbsp;我已阅读并同意<a href="#">五洲会海购服务条款</a></label></p>

					<p class="submit"><input type="submit" value="快速注册" id="js_submitRegisterForm"/></p>
				</form>
			</div><!-- .register-bord -->

		</div><!-- .register-page -->
		
	</div><!-- .login-main-wrap -->

	<footer id="footer">
		<? include 'foot_c_js.htm'; ?>
		<? include 'public_sign_foot.htm'; ?>
	</footer><!--end #footer -->

	<script>
		$LAB.script("jquery.validate.min.js")
			.wait()
			.script("laydate/laydate.dev.js")
			.wait(function(){
				(function(){
					var  ArrayInput = $("#js_loginBord").find(".input-group").find("input");

					$.each(ArrayInput, function(index, val) {
						/* iterate through array or object */
						var $this = $(val),
						 	thisPlaceholder = $this.attr("placeholder");

						$this.val(thisPlaceholder);

						$this.focusin(function() {
							if($this.val() === thisPlaceholder){
								$this.val("");
							}

							//如果是点击选择生日
							if($this.hasClass('birthday')){
								laydate({
								    elem: '#js_regBirthday'
								});
							}
						});
						$this.focusout(function() {
							if(!$this.val()){
								$this.val(thisPlaceholder);
							}
						});
					});
				})();
			})
			.script("login.min.js")
			.wait(function(){
				//填写注册信息
				(function(){
					var $js_registerForm = $("#js_registerForm");
					if($js_registerForm.length > 0){
						$js_registerForm.validate({
							rules: {
								phone: {
									required: true
								},
								phoneCode: {
									required: true
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
							        equalTo: $("#js_regPassword")
							    },
							    email:{
							    	email:true
							    },
							    isagree: {
							    	required: true
							    }
							},
							messages: {
								phone: {
									required: '请输入大陆地区手机号码'
								},
								phoneCode: {
									required: '请输入正确的手机验证码'
								},
							    password: {
							        required:  '请设置密码',
							        minlength: '密码长度必须大于6个字符'
							    },
							    password_confirm: {
							        required:  '请再次确认密码',
							        minlength: '密码长度必须大于6个字符',
							        equalTo:   '两次密码输入不一致'
							    },
							    email:{
							    	email:'请输入正确格式的电子邮件'
							    },
							    isagree: {
							    	required: '您未阅读并接受五洲会海购服务条款'
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
				})();

				
			})	
	</script>

</body>
</html>