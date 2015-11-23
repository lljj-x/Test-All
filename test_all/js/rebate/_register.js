/**
 * rebate/register.js
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

	var Register = Base.klass.create({
		elements: {
			'.j-username': 'elUsername',
			'.j-password': 'elPassword',
			'.j-act-getcode': 'elGetCode',
			'.j-code': 'elCode',
			'.j-service': 'elService'
		},
		events: {
			'change .j-username': 'chkUsername',
			'change .j-password': 'chkPassword',
			'change .j-code': 'chkCode',
			'click .j-act-getcode': 'getCode',
			'click .j-confirm': 'confirm',
			'blur .j-username': 'chkUsername'
		},
		init: function() {
			this.asyncData = {};
		},
		confirm: function() {
			var self = this,
				can = true,
				params;

			if (this.isSubmit) return;

			if (!this.chkService()) return;

			can = this.chkUsername() && can;

			can = this.chkPassword() && can;

			can = this.chkCode() && can;

			if (can) {
				params = {
					type: 2, // 新用户注册
					account: this.elUsername.val(),
					pwd: this.elPassword.val(),
					vcode: this.elCode.val()
				};

				var gc = Base.url.param('g_chan');
				if(gc) params.g_chan = gc;

				$.ajax({
					type: 'POST',
					url: '/api/user/registerRebate.jsp',
					dataType: "json",
					data: params,
					success: this.proxy(this.confirmBack),
					error: function() {
						self.isSubmit = false;
						tip.show('网络连接异常');
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
						// window.location.href = Base.url.param('sourceurl') ? decodeURIComponent(Base.url.param('sourceurl')) : 'regsuc3.html';
						window.location.href = 'regsuc3.html';
						break;

						// 账户已经存在
					case 2:
						break;

						// 格式错误
					case 4:
						break;

					default:
						tip.show(result.errMsg);
						break;
				}
			}

			this.isSubmit = false;
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
				$item = $e.closest('li'),
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入手机号';
			} else if (!Tools.isMobile(val)) {
				err = '请输入正确的手机号码';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				this.hideErr($item);
				this.getVerifyUser();
				return true;
			}
		},
		chkPassword: function() {
			var $e = this.elPassword,
				$item = $e.closest('li'),
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入密码';
			} else if (!Tools.isPassword(val)) {
				err = '密码只能包含英文、数字，长度为6-16位';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				this.hideErr($item);
				return true;
			}
		},
		chkCode: function() {
			var $e = this.elCode,
				$item = $e.closest('li'),
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入验证码';
			} else if (!Tools.isCode(val)) {
				err = '请输入正确的验证码';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				this.hideErr($item);
				return true;
			}
		},
		getCode: function() {
			var $getCode,
				params,
				can;

			if (this.elGetCode.hasClass('disabled')) return;

			if (!this.chkService()) return;

			can = true;

			can = this.chkUsername() && can;

			if (can) {

				$getCode = this.elGetCode;

				params = {
					account: this.elUsername.val(),
					_: new Date - 0
				};

				$.ajax({
					type: 'GET',
					url: '/api/user/getVCode.jsp',
					dataType: "json",
					data: params,
					success: this.proxy(this.getCodeBack),
					error: function() {
						$getCode.removeClass('disabled').text('获取验证码');
						tip.show('网络连接异常');
					}
				});

				this.elGetCode.addClass('disabled').text('获取中...');
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

				$getCode.addClass('disabled').text(sec + 's');

				timer = setInterval(function() {
					if (sec === 1) {
						$getCode.removeClass('disabled').text('获取验证码');
						clearInterval(timer);
					} else {
						$getCode.text(--sec + 's');
					}
				}, 1000);
			} else {
				tip.show(result.errMsg);

				$getCode.removeClass('disabled').text('获取验证码');
			}
		},
		getVerifyUser:function(){
			params = {
				account: this.elUsername.val(),
				_: new Date - 0
			};

			$.ajax({
				type: 'GET',
				url: '/api/user/verifyUser.jsp',
				dataType: "json",
				data: params,
				success: this.proxy(this.getVerifyUserBack),
				error: function() {
					// nothing
				}
			});
		},
		getVerifyUserBack: function(result){
			var username = this.elUsername.val();
			if(result && result.obj && result.obj.isExist){
				if(!result.obj.isRebate){
					$('.j-register-container').addClass('hide');
					$('.j-upgrade-container').removeClass('hide').find('.j-username').val(username);
					$('.j-tips-txt').text('升级成为塔客，赚钱、购物两不误！');
				}else{
					var dom = '该账号已是塔客，登录<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.allpyra.android&g_f=991653" target="_blank">金字塔APP</a>开启佣金模式！';
					$('.j-tips-txt').html(dom);
				}
			}else{
				$('.j-tips-txt').text('5秒快速注册，领取15元现金红包！');
			}
		},
		showErr: function($item, err) {
			var $tip = $item.find('.j-tip');
			$item.addClass('err-bor');
			$tip.addClass('err-txt').html(err);
		},
		hideErr: function($item) {
			var $tip = $item.find('.j-tip');
			$item.removeClass('err-bor');
			$tip.removeClass('err-txt').html($tip.attr('data-tip') || '');
		}
	});

	var Upgrade = Base.klass.create({
		elements: {
			'.j-username': 'elUsername',
			'.j-password': 'elPassword',
			'.j-service': 'elService'
		},
		events: {
			'change .j-username': 'chkUsername',
			'change .j-password': 'chkPassword',
			'click .j-confirm': 'confirm'
		},
		confirm: function() {
			var self = this,
				can = true,
				params;

			if (this.isSubmit) return;

			if (!this.chkService()) return;

			can = this.chkUsername() && can;

			can = this.chkPassword() && can;

			if (can) {

				params = {
					type: 1, // 老用户升级
					account: this.elUsername.val(),
					pwd: this.elPassword.val()
				}

				var gc = Base.url.param('g_chan');
				if(gc) params.g_chan = gc;

				$.ajax({
					type: 'POST',
					url: '/api/user/registerRebate.jsp',
					dataType: "json",
					data: params,
					success: this.proxy(this.confirmBack),
					error: function() {
						self.isSubmit = false;
						tip.show('网络连接异常');
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
						window.location.href = 'regsuc3.html';
						// window.location.href = Base.url.param('sourceurl') ? decodeURIComponent(Base.url.param('sourceurl')) : 'regsuc3.html';
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
				$item = $e.closest('li'),
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入手机号';
			} else if (!Tools.isMobile(val) && !Tools.isEmail(val)) {
				err = '请输入正确的手机号码或邮箱';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				this.hideErr($item);
				this.getVerifyUser();
				return true;
			}
		},
		chkPassword: function() {
			var $e = this.elPassword,
				$item = $e.closest('li'),
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				err = '请输入密码';
			} else if (!Tools.isPassword(val)) {
				err = '密码只能包含英文、数字，长度为6-16位';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				this.hideErr($item);
				return true;
			}
		},
		getVerifyUser:function(){
			params = {
				account: this.elUsername.val(),
				_: new Date - 0
			};

			$.ajax({
				type: 'GET',
				url: '/api/user/verifyUser.jsp',
				dataType: "json",
				data: params,
				success: this.proxy(this.getVerifyUserBack),
				error: function() {
					// nothing
				}
			});
		},
		getVerifyUserBack: function(result){
			var username = this.elUsername.val();
			if(result && result.obj && result.obj.isExist){
				if(result.obj.isRebate){
					var dom = '该账号已是塔客，登录<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.allpyra.android&g_f=991653" target="_blank">金字塔APP</a>开启佣金模式！';
					$('.j-tips-txt').html(dom);
				}else{
					$('.j-tips-txt').text('升级成为塔客，赚钱、购物两不误！');
				}
			}else{
				$('.j-register-container').removeClass('hide').find('.j-username').val(username);
				$('.j-upgrade-container').addClass('hide');
				$('.j-tips-txt').text('5秒快速注册，领取15元现金红包！');
			}
		},
		showErr: function($item, err) {
			var $tip = $item.find('.j-tip');
			$item.addClass('err-bor');
			$tip.addClass('err-txt').html(err);
		},
		hideErr: function($item) {
			var $tip = $item.find('.j-tip');
			$item.removeClass('err-bor');
			$tip.removeClass('err-txt').html($tip.attr('data-tip') || '');
		}
	});

	tip = new Base.Widget.Tip();

	new Register({
		el: '.j-register-container'
	});

	new Upgrade({
		el: '.j-upgrade-container'
	});

	Base.klass.single({
		elements: {
			'.j-register-container': 'elRegisterContainer',
			'.j-upgrade-container': 'elUpgradeContainer',
			'.j-reg-icon':'elRegIcon',
			'.j-upg-icon':'elUpgIcon'
		},
		events: {
			'click .j-radio-type': 'clickType',
			'click .check-icon': 'clickSerlab'
		},
		clickType: function(e) {
			var $e = $(e.currentTarget),
				val = +$e.val();

			if (val === 1) {
				this.elRegisterContainer.removeClass('hide');
				this.elUpgradeContainer.addClass('hide');
				this.elRegIcon.addClass('radio-icon-chk');
				this.elUpgIcon.removeClass('radio-icon-chk');
			} else if (val === 2) {
				this.elRegisterContainer.addClass('hide');
				this.elUpgradeContainer.removeClass('hide');
				this.elRegIcon.removeClass('radio-icon-chk');
				this.elUpgIcon.addClass('radio-icon-chk');
			}
		},
		clickSerlab: function(e){
			var $e = $(e.currentTarget);
			var chkbox = $e.next('input.j-service');
			var val = chkbox.attr('checked');
			chkbox.attr('checked', val?'':'checked');
			if(val){
				$e.removeClass('check-icon-chk');
			}else{
				$e.addClass('check-icon-chk');
			}
		}
	});

	Base.url.coverFrom();

})(window.Zepto);