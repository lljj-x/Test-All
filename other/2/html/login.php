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
	
	<!-- 登录主体start -->
	<div class="login-main-wrap">
		<div class="public-login-page login-page w1200">
			<div class="left-pic"><img src="../dist/images/domeimg/lazyload1.gif" width="535" height="436" data-original="../dist/images/domeimg/login/login_left_2.png" alt=""></div>

			<div class="public-login-bord login-bord" id="js_loginBord">
				<form id="js_loginForm" action="#" method="post" autofocus autocomplete="off" >
					<div class="public-tit mb20 clearfix">
						<span class="fl tit">账号登录</span>
						<span class="fr is-not-have">还没有账号？<a href="#">30秒注册</a></span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_name position-left"></i>
						<div class="input-wrap">
							<input type="text" name="phone" id="js_loginPhone" class="phone" placeholder="请输入手机号"  autocomplete="off">
						</div>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_password position-left"></i>
						<div class="input-wrap">
							<input type="password" name="password" id="js_loginPassword" class="password" placeholder="请输入密码">
						</div>
					</div>

					<div class="input-group message-group mb20">
						<div class="message-wrap clearfix">
							<div class="message fl">
								<input type="text" name="verifycode" id="js_accessCode" class="verifycode" placeholder="输入验证码">
							</div>
							<div class="img-wrap fl"><img id="img-verifycode" data-src="/fun/?act=verify" src="/fun/?act=verify"></div>
							<div class="ml5 fl"><a href="javascript:void(0);" id="js_refreshVerifycode" class="word_fresh">看不清</a></div>
						</div>
					</div>

					<p class="btn-wrapper mb20 clearfix">
						<span class="fl"><label for="js_agreeUserterm"><input type="checkbox" name="agree-userterm" checked="checked" class="agree-userterm" id="js_agreeUserterm">&nbsp;&nbsp;两周内自动登录</label></span>
						<a href="#" class="forget-password fr">忘记密码？</a>
					</p>

					<p class="submit mb30"><input type="submit" value="登录" id="js_submitLoginForm"/></p>

					<p class="other-sign-method"><a href="#"><i class="login_icon icon_weixin"></i>&nbsp;&nbsp;微信登录</a></p>
				</form>
			</div><!-- .login-bord -->

		</div><!-- .login-page -->
		
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
				//填写登录信息
				(function(){
					var $js_loginForm = $("#js_loginForm");
					if($js_loginForm.length > 0){
						// 电话
						$.validator.addMethod("mobile", function(value, element) {
				                var length = value.length;
				                var mobile =  /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
				                return this.optional(element) || (length == 11 && mobile.test(value));
				        }, "手机号码格式错误");


						$js_loginForm.validate({
							rules: {
								phone: {
									required: true,
									mobile:true 
								},
								verifycode: {
									required: true,
									minlength: 4,
									maxlength: 4
								},
							    password: {
							        required: true,
							        maxlength: 60,
							        minlength: 6
							    }
							},
							messages: {
								phone: {
									required: '请输入大陆地区手机号码',
									mobile:'请输入正确的手机格式'
								},
								verifycode: {
									required: '请输入验证码',
									minlength: '验证码长度不对',
									maxlength: '验证码长度不对'
								},
							    password: {
							        required:  '请设置密码',
							        minlength: '密码长度必须大于6个字符'
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