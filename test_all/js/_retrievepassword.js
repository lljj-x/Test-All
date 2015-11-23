/**
 * retrievepassword.js
 */
(function($) {

	var tip;

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
		isCode: function(str) {
			return /^[0-9]{6}$/.test(str);
		}
	};

	var Retrievepassword = Base.klass.create({
		elements: {
			'.j-username': 'elUsername',
			'.j-password': 'elPassword',
			'.j-act-getcode': 'elGetCode',
			'.j-code': 'elCode'
		},
		events: {
			'change .j-username': 'chkUsername',
			'change .j-password': 'chkPassword',
			'change .j-code': 'chkCode',

			'click .j-act-getcode': 'getCode',

			'click .j-confirm': 'confirm'
		},
		confirm: function() {
			var self = this,
				can = true,
				$form;

			if (this.isSubmit) return;

			can = can && this.chkUsername();

			can = can && this.chkPassword();

			can = can && this.chkCode();

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

					// 重置密码成功
					case 0:
						tip.show('重置密码成功！请牢记您新的登录密码。');
						setTimeout(function() {
							window.location.href = 'login.html';
						}, 3000);
						break;

					default:
						tip.show(result.errMsg);
						break;
				}
			}

			this.isSubmit = false;
		},
		chkUsername: function() {
			var $e = this.elUsername,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入账号';
			} else if (!Tools.isEmail(val) && !Tools.isMobile(val)) {
				err = '请输入正确的账号格式，邮箱或手机号码';
			}

			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
		},
		chkPassword: function() {
			var $e = this.elPassword,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入密码';
			} else if (!Tools.isPassword(val)) {
				err = '密码只能包含英文、数字，长度为6-16位';
			}

			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
		},
		chkCode: function() {
			var $e = this.elCode,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入验证码';
			} else if (!Tools.isCode(val)) {
				err = '请输入正确的验证码';
			}

			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
		},
		getCode: function() {
			var params,
				can;

			if (this.elGetCode.hasClass('disabled')) return;

			can = true;

			can = this.chkUsername() && can;

			if (can) {
				params = {
					account: this.elUsername.val(),
					_: new Date - 0
				};

				$.get('/api/user/getFindPwdCode.jsp', params, this.proxy(this.getCodeBack));

				this.elGetCode.addClass('disabled').text('正在获取验证码...');
			}
		},
		getCodeBack: function(result) {
			var $getCode,
				sec,
				timer;

			$getCode = this.elGetCode;

			if (result && result.errCode === 0) {
				this.elCode.focus();

				sec = 60;

				$getCode.addClass('disabled').text(sec + '秒后重新获取');

				timer = setInterval(function() {
					if (sec === 1) {
						$getCode.removeClass('disabled').text('获取验证码');
						clearInterval(timer);
					} else {
						$getCode.text(--sec + '秒后重新获取');
					}
				}, 1000);
			} else {
				tip.show(result.errMsg);

				$getCode.removeClass('disabled').text('获取验证码');
			}
		},
		showErr: function(s) {
			tip.show(s);
		}
	});

	tip = new Base.Widget.Tip();

	new Retrievepassword({
		el: '.j-retrievepassword-container'
	});

	Base.url.coverFrom();

})(window.Zepto);