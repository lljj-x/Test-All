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
	
	<!-- 绑定微信账号主体start -->
	<div class="login-main-wrap">
		<div class="public-login-page Wechat-bound-page w1200">

			<div class="public-login-bord Wechat-bound-bord" id="js_loginBord">
				<h1 class="Wechat-title mb20">绑定微信帐号</h1>

				<div class="Wechat-bound-tips">
					<p class="name">亲爱的<span>张先生</span>,</p>
					<p class="tips">你好！ 为了给您更好的服务，请补充下面信息，加入五洲会海购平台吧~</p>
				</div>

				<ul class="tab-Wechat-bound mb30" id="js_tabChangeWechatBound">
					<li class="active"><a href="javascript:void(0);"><span>绑定已有账号</span></a></li>
					<li><a href="javascript:void(0);">快速开通新账号</a></li>
				</ul>
				
				<div class="Wechat-bound-method" id="js_WechatBoundMethod">
					<!-- 绑定已有账号 -->
					<div class="Wechat-bound-method-item Wechat-bound-haved">
						<form id="js_WechatBoundHavedForm" action="" method="post" autofocus autocomplete="off">
							<div class="input-group mb20">
								<i class="login_icon icon_name position-left"></i>
								<div class="input-wrap">
									<input type="text" name="phone" class="phone" placeholder="手机号码">
								</div>
							</div>

							<div class="input-group mb20">
								<i class="login_icon icon_password position-left"></i>
								<div class="input-wrap">
									<input type="password" name="password" class="password" placeholder="密码">
								</div>
							</div>

							<p class="btn-wrapper mb20 clearfix">
								<a href="#" class="forget-password fr">忘记密码？</a>
							</p>

							<p class="submit"><input type="submit" value="立即绑定"/></p>
						</form>
					</div>
					
					<!-- 快速开通新账号 -->
					<div class="Wechat-bound-method-item Wechat-bound-new none">
						<form id="js_WechatBoundNewForm" action="" method="post" autofocus autocomplete="off">
							<div class="input-group mb20">
								<i class="login_icon icon_name position-left"></i>
								<div class="input-wrap">
									<input type="text" name="phone" id="js_regPhone" data-type="1" class="phone" placeholder="手机号码">
								</div>
							</div>

							<div class="input-group message-group mb20">
								<div class="message-wrap clearfix">
									<div class="message fl">
										<input type="text" name="phoneCode" id="js_regPhoneCode" class="phoneCode" placeholder="短信验证码">
									</div>
									<button id="js_smsCode" type="button" class="smscode no-click fr" disabled="disabled">获取短信验证码</button>
								</div>
							</div>

							<div class="input-group mb20">
								<i class="login_icon icon_password position-left"></i>
								<div class="input-wrap">
									<input type="password" name="password" id="js_regPassword" class="password" placeholder="密码">
								</div>
							</div>

							<div class="input-group mb20">
								<i class="login_icon icon_password position-left"></i>
								<div class="input-wrap">
									<input type="password" name="password_confirm" id="js_regPasswordConfirm" class="password_confirm" placeholder="确认登录密码">
								</div>
							</div>

							<p class="submit"><input type="submit" value="快速注册"/></p>
						</form>
					</div>
				</div>
				
			</div><!-- .Wechat-bound-bord -->

		</div><!-- .Wechat-bound-page -->
		
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

				$(function(){
					$("#js_tabChangeWechatBound").on("click","li",function(){
						var $this = $(this),
							index = $("#js_tabChangeWechatBound").find("li").index($this),
							targetItem = $("#js_WechatBoundMethod").find(".Wechat-bound-method-item").eq(index);

						$this.addClass('active').siblings('li').removeClass('active');
						targetItem.show().siblings('.Wechat-bound-method-item').hide();
					});
				});
			})
			.script("login.min.js")
			.wait(function(){

				//微信--绑定已有账号
				(function(){
					var $js_WechatBoundHavedForm = $("#js_WechatBoundHavedForm");
					if($js_WechatBoundHavedForm.length > 0){
						// 电话
						$.validator.addMethod("mobile", function(value, element) {
				                var length = value.length;
				                var mobile =  /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
				                return this.optional(element) || (length == 11 && mobile.test(value));
				        }, "手机号码格式错误");


						$js_WechatBoundHavedForm.validate({
							rules: {
								phone: {
									required: true,
									mobile:true 
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
				
				//快速开通新账号
				(function(){
					var $js_forgetPasswordForm = $("#js_WechatBoundNewForm");
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