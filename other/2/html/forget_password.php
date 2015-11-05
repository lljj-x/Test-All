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
	
	<!-- 忘记密码主体start -->
	<div class="login-main-wrap">
		<div class="public-login-page forget-password-page w1200">
			<div class="left-pic"><img src="../dist/images/domeimg/lazyload1.gif" width="529" height="328" data-original="../dist/images/domeimg/login/login_left.png" alt=""></div>

			<div class="public-login-bord forget-password-bord" id="js_loginBord">
				<form id="js_forgetPasswordForm" action="" method="post" autofocus autocomplete="off">
					<div class="public-tit mb20 clearfix">
						<span class="fl tit">找回密码</span>
						<span class="fr is-have">已有五洲会帐号， <a href="#">登录</a></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_name position-left"></i>
						<div class="input-wrap">
							<input type="text" name="phone" id="js_regPhone" data-type="2" class="phone" placeholder="请输入手机号">
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
							<input type="password" name="password" id="js_regPassword" class="password" placeholder="请输入新密码">
						</div>
						<span class="position-right"><strong class="color_main f14">*</strong></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_password position-left"></i>
						<div class="input-wrap">
							<input type="password" name="password_confirm" id="js_regPasswordConfirm" class="password_confirm" placeholder="确认新密码">
						</div>
						<span class="position-right"><strong class="color_main f14">*</strong></span>
					</div>

					<p class="submit"><input type="submit" value="确认" id="js_submitforgetPasswordForm"/></p>
				</form>
			</div><!-- .forget-password-bord -->

		</div><!-- .forget-password-page -->
		
	</div><!-- .login-main-wrap -->

	<footer id="footer">
		<? include 'foot_c_js.htm'; ?>
		<? include 'public_sign_foot.htm'; ?>
	</footer><!--end #footer -->

	<script>
		$LAB.script("jquery.validate.min.js")
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

				//忘记密码
				(function(){
					var $js_forgetPasswordForm = $("#js_forgetPasswordForm");
					if($js_forgetPasswordForm.length > 0){
						$js_forgetPasswordForm.validate({
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