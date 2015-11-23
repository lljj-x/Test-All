/**
 * bindzfb
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
		isMobile: function(str) {
			return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
		}
	};

	var Bindzfb = Base.klass.create({

		elements: {
			'.j-input-card': 'elCard',
			'.j-input-trueName': 'elTruename',
			'.j-input-phone': 'elPhone',
			'.j-input-code': 'elCode',

			'.j-act-getcode': 'elGetcode'
		},
		events: {
			'click .j-act-getcode': 'clickGetcode',
			'click .j-act-submit': 'clickSubmit'
		},
		cgi: {
			data: '/api/user/queryBindCard.jsp',
			code: '/api/user/bindCard.jsp',
			bankList: '/api/user/queryBankList.jsp',
			submit: '/api/user/bindCard.jsp'
		},
		init: function() {
			this.isSubmit = false;

			this.initEdit();
		},
		initEdit: function() {
			var isedit = Base.url.param('act');

			if (isedit === 'edit') {
				this.getData();
			}
		},
		clickSubmit: function(e) {
			this.submit();
			e.preventDefault();
		},
		clickGetcode: function() {
			this.getCode();
		},
		getData: function() {
			var params;

			params = {
				op: 3,
				_: new Date - 0
			}

			$.get(this.cgi.data, params, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var o,
				$list;

			if (result && +result.errCode === 0) {
				o = result.obj;

				this.elCard.val(o.card);
				this.elTruename.val(o.trueName);
				this.elPhone.val(o.phone);
			}
		},
		getCode: function() {
			var can = true,
				$item = this.elGetcode,
				params;

			if ($item.hasClass('disabled')) return;

			can = can && this.chkPhone();

			if (can) {
				params = {
					op: 4,
					phone: this.elPhone.val(),
					_: new Date - 0
				}

				$.get(this.cgi.code, params, this.proxy(this.getCodeBack));

				$item.addClass('disabled');
			}
		},
		getCodeBack: function(result) {
			var $item = this.elGetcode,
				sec,
				timer;

			if (result && +result.errCode === 0) {
				this.elCode.focus();

				sec = 60;

				$item.addClass('disabled').text(sec + '秒');

				timer = setInterval(function() {
					if (sec === 1) {
						$item.removeClass('disabled').text('获取');
						clearInterval(timer);
					} else {
						$item.text(--sec + '秒');
					}
				}, 1000);
			} else {
				tip.show(result.errMsg);
				$item.removeClass('disabled');
			}
		},
		submit: function() {
			var can = true,
				params;

			if (this.isSubmit) return;

			can = can && this.chkCard();

			can = can && this.chkTruename();

			can = can && this.chkPhone();

			can = can && this.chkCode();

			if (can) {

				params = {
					op: 1,
					card: this.elCard.val(),
					cardType: 2,
					bankName: '支付宝',
					trueName: this.elTruename.val(),
					phone: this.elPhone.val(),
					code: this.elCode.val()
				}

				$.post(this.cgi.submit, params, this.proxy(this.submitBack));

				this.isSubmit = true;
			}
		},
		submitBack: function(result) {
			if (result && +result.errCode === 0) {
				window.location.href = 'user.html';
			} else {
				tip.show(result.errMsg);
			}

			this.isSubmit = false;
		},
		chkCard: function() {
			var $e = this.elCard,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入支付宝号');
				return false;
			}

			return true;
		},
		chkTruename: function() {
			var $e = this.elTruename,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入账户名');
				return false;
			}

			return true;
		},
		chkPhone: function() {
			var $e = this.elPhone,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入手机号');
				return false;
			} else if (!Tools.isMobile(val)) {
				this.showErr('手机号码格式错误');
				return false;
			}

			return true;
		},
		chkCode: function() {
			var $e = this.elCard,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入验证码');
				return false;
			}

			return true;
		},
		showErr: function(s) {
			tip.show(s);
		}
	});

	tip = new Base.Widget.Tip();

	new Bindzfb();

})(window.Zepto);