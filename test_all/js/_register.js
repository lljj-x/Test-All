/**
 * register.js
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

	var isWeixin = Base.Browser.type === 'weixin';

	var Register = Base.klass.create({
		elements: {
			'.j-username': 'elUsername',
			'.j-password': 'elPassword',
			'.j-act-getcode': 'elGetCode',
			'.j-code': 'elCode',
			'.j-wx': 'elWx',
			'.j-service': 'elService'
		},
		events: {
			'change .j-username': 'chkUsername',
			'change .j-password': 'chkPassword',
			'change .j-code': 'chkCode',

			'click .j-act-getcode': 'getCode',

			'click .j-confirm': 'confirm',

			'click .j-login-wx': 'loginWx'
		},
		init: function() {
			this.asyncData = {};

			if (isWeixin) {
				this.elWx.show();
			}
		},
		confirm: function() {
			var self = this,
				can = true,
				$form;

			if (this.isSubmit) return;

			if (!this.chkService()) return;

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

					// 注册成功
					case 0:
						Base.cookie('sid', result.obj);
						window.location.href = Base.url.param('sourceurl') ? decodeURIComponent(Base.url.param('sourceurl')) : 'user.html';
						break;

						// 账户已经存在
					case 2:

						// 格式错误
					case 4:

					default:
						tip.show(result.errMsg);
						break;
				}
			}

			this.isSubmit = false;
		},
		loginWx: function() {
			window.location.href = '/api/weixin/login.jsp?sourceurl=' + (Base.url.param('sourceurl') || encodeURIComponent(window.location.origin + '/user.html')); // 默认跳个人中心
		},
		chkService: function() {
			var $e = this.elService,
				is = $e.attr('checked');

			if (!is) {
				tip.show('请同意金字塔服务条款');
				return false;
			}

			return true;
		},
		chkUsername: function() {
			var $e = this.elUsername,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入手机号码';
			} else if (!Tools.isMobile(val)) {
				err = '请输入正确的手机号码';
			}

			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
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
			var $item,
				async;

			if (result) {

				$item = this.elUsername.closest('li');

				async = this.asyncData['username'];

				delete async.load;

				if (+result.errCode === 0) {
					if (result.obj === true) {
						this.showErr((async.err = result.errMsg));

					} else {
						delete async.err;
					}
				} else {
					this.showErr((async.err = result.errMsg));
				}
			} else {
				// alert('判断用户名是否存在接口错误。')
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

			if (!this.chkService()) return;

			can = true;

			can = can && this.chkUsername();

			if (can) {
				params = {
					account: this.elUsername.val(),
					_: new Date - 0
				};

				$.get('/api/user/getVCode.jsp', params, this.proxy(this.getCodeBack));
				// $.get('json/code.json', params, this.proxy(this.getCodeBack));

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
		showErr: function(err) {
			tip.show(err);
		}
	});

	tip = new Base.Widget.Tip();

	new Register({
		el: '.j-register-container'
	});

	Base.url.coverFrom();

})(window.Zepto);