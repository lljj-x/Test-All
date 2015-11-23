/**
 * rebate Login.js
 */
(function($) {

	var tip;

	$('.j-rule-mark').on('click', function(){
		$(this).hide();
	});

	var Tools = {
		trim: function(str) {
			return String(str).replace(/^\s*|\s*$/g, '');
		},
		isEmpty: function(str) {
			return this.trim(str) === '';
		},
		isPassword: function(str) {
			return /^[a-zA-Z0-9]{6,16}$/.test(str);
		},
		isEmail: function(str) {
			return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
		},
		isMobile: function(str) {
			return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
		},
		isHKMobile: function(str) {
			return /^[0-9]{8}$/.test(str);
		},
		isPasswordLite: function(str) {
			return /^\S{6,16}$/.test(str);
		}
	};

	var isWeixin = Base.Browser.type === 'weixin';

	var Login = Base.klass.create({
		elements: {
			'.j-username': 'elUsername',
			'.j-password': 'elPassword',
			'.j-wx': 'elWx'
		},
		events: {
			'change .j-username': 'chkUsername',
			'change .j-password': 'chkPassword',

			'click .j-confirm': 'confirm',

			'click .j-login-wx': 'loginWx'
		},
		init: function() {
			if (isWeixin) {
				this.elWx.show();
			}
		},
		confirm: function() {
			var self = this,
				can = true,
				$form;

			if (this.isSubmit) return;

			can = can && this.chkUsername();

			can = can && this.chkPassword();

			if (can) {
				$form = this.el.find('form');

				$.ajax({
					type: 'POST',
					url: $form.attr('action'),
					dataType: "json",
					data: $form.serialize(),
					success: this.proxy(this.confirmBack),
					error: function() {
						self.isSubmit = false;
					}
				});

				this.isSubmit = true;
			}
		},
		confirmBack: function(result) {
			if (result) {
				switch (+result.errCode) {

					// 注册成功
					case 0:
						Base.cookie('sid', result.obj.sid);
						if(result.obj.isRebate){
							window.location.href = '/rebate/home.html';
							// window.location.href = Base.url.param('sourceurl') ? decodeURIComponent(Base.url.param('sourceurl')) : 'user.html'; 
						}else{
							$('.j-rule-mark').show();
						}
						break;

						// 用户名或密码错误
					case 3:

						// 密码错误
					case 5:
						tip.show(result.errMsg);
						break;

					default:
						tip.show(result.errMsg);
						break;
				}
			}

			this.isSubmit = false;
		},
		loginWx: function() {
			window.location.href = '/api/weixin/login.jsp?sourceurl=' + (Base.url.param('sourceurl') || encodeURIComponent(window.location.origin + '/user.html'));
		},
		chkExists: function() {
			var account = this.elUsername.val(),
				params = {
					_: new Date - 0
				};

			$.get('/api/user/isExist.jsp?account=' + account, params, this.proxy(this.chkExistsBack));
			// $.get('json/register.json', params, this.proxy(this.chkExistsBack));
		},
		chkExistsBack: function(result) {
			if (result) {
				if (+result.errCode === 0) {

					// 帐号不存在
					if (result.obj === false) {
						this.showErr('帐号不存在');

					}
				} else {
					this.showErr(result.errMsg);
				}
			} else {
				// alert('判断用户名是否存在接口错误。')
			}
		},
		chkUsername: function() {
			var $e = this.elUsername,
				val = $e.val(),
				err;

			if (Tools.isEmpty(val)) {
				err = '请输入账号';
			} else if (!Tools.isEmail(val) && !Tools.isMobile(val)) {
				err = '请输入正确的账号格式，邮箱或手机号码';
			}

			if (err) {
				this.showErr(err);
				return false;
			}else{
				return true;
			}
		},
		chkPassword: function() {
			var $e = this.elPassword,
				val = $e.val(),
				err;

			if (Tools.isEmpty(val)) {
				err = '请输入密码';
			} else if (!Tools.isPasswordLite(val)) {
				err = '密码长度为6-16位';
			}

			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
		},
		showErr: function(err) {
			tip.show(err);
		}
	});

	tip = new Base.Widget.Tip();

	new Login({
		el: '.j-login-container'
	});

	Base.url.coverFrom();

})(window.Zepto);