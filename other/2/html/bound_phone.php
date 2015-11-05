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
	
	<!-- 绑定手机号 主体start -->
	<div class="login-main-wrap">
		<div class="public-login-page bound-phone-page w1200">
			<div class="left-pic"><img src="../dist/images/domeimg/lazyload1.gif" width="529" height="328" data-original="../dist/images/domeimg/login/login_left.png" alt=""></div>

			<div class="public-login-bord bound-phone-bord" id="js_loginBord">
				<form id="js_boundPhoneForm" action="" method="post" autofocus autocomplete="off">
					<div class="public-tit mb20 clearfix">
						<span class="fl tit">绑定手机号</span>
						<span class="fr is-have">给你提供更多便捷服务</span>
					</div>

					<div class="input-group mb20">
						<i class="login_icon icon_name position-left"></i>
						<div class="input-wrap">
							<input type="text" name="phone" id="js_regPhone" data-type="3" class="phone" placeholder="请输入手机号">
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

					<p class="submit"><input type="submit" value="绑定手机" id="js_submitBoundPhoneForm"/></p>
				</form>
			</div><!-- .bound-phone-bord -->

		</div><!-- .bound-phone-page -->
		
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

				
			})	
	</script>

</body>
</html>