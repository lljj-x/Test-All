/**
 * user withdrawals
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
		isAmount: function(str) {
			return /^[0-9]*(\.[0-9]{1,2})?$/.test(str);
		}
	};

	var WithDrawals = Base.klass.create({
		elements: {
			'.j-text-balance': 'elBalance',
			'.j-input-amount': 'elAmount',
			'.j-text-card': 'elCard',
			'.j-text-trueName': 'elTruename',
			'.j-img-cardType': 'elCardtype',
			'.j-text-phone': 'elPhone',
			'.j-input-code': 'elCode',

			'.j-act-getcode': 'elGetcode'
		},
		events: {
			'click .j-act-getcode': 'clickGetcode',
			'click .j-act-submit': 'clickSubmit'
		},
		cgi: {
			data: '/api/user/queryBindCard.jsp',
			code: '/api/commission/applyCash.jsp',
			submit: '/api/commission/applyCash.jsp'
		},
		init: function() {
			this.isSubmit = false;

			this.phone = null;

			this.mincash = null;

			this.initBalance();

			this.getData();
		},
		initBalance: function() {
			var balance = Base.url.param('balance');

			if (balance) {
				this.elBalance.text('￥' + this.coverPrice(balance));
			} else {
				tip.show('缺少余额参数');
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

				this.elAmount.attr('placeholder', '不得低于' + this.coverPrice(o.mincash) + '元');

				this.elCard.text(function(card) {
					return card.replace(/\w/g, function(j, k, x) {
						return k > 3 && k < x.length - 3 ? '*' : j;
					});
				}(o.card));

				this.elTruename.text(function(trueName) {
					return trueName.replace(/\w/g, function(j, k, x) {
						return k > 0 ? '*' : j;
					});
				}(o.trueName));

				this.elPhone.text(function(phone) {
					return phone.replace(/\w/g, function(j, k, x) {
						return k > 2 && k < x.length - 4 ? '*' : j;
					});
				}(this.phone = o.phone));

				this.mincash = o.mincash;

				this.elCardtype.attr('src', function(cardType) {
					switch (+cardType) {
						case 1:
							return '../img/app2/ic_bank_yl.png';
						case 2:
							return '../img/app2/ic_bank_zfb.png';
						case 3:
							return '../img/app2/ic_bank_wx.png';
					}
				}(o.cardType));
			}
		},
		getCode: function() {
			var can = true,
				$item = this.elGetcode,
				params;

			if ($item.hasClass('disabled')) return;

			if (can) {
				params = {
					op: 2,
					phone: this.phone,
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

			can = can && this.chkAmount();

			can = can && this.chkCode();

			if (can) {

				params = {
					op: 1,
					cash: this.decoverPrice(this.elAmount.val()),
					phone: this.phone,
					code: this.elCode.val()
				}

				$.post(this.cgi.submit, params, this.proxy(this.submitBack));

				this.isSubmit = true;
			}
		},
		submitBack: function(result) {
			if (result && +result.errCode === 0) {
				tip.show('提交申请成功，请耐心等待');
				setTimeout(function() {
					window.location.href = 'user_income.html';
				}, 3000);
			} else {
				tip.show(result.errMsg);
			}

			this.isSubmit = false;
		},
		chkAmount: function() {
			var $e = this.elAmount,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入提现金额');
				return false;
			} else if (!Tools.isAmount(val)) {
				this.showErr('提现金额格式错误');
				return false;
			} else if (+val * 100 < this.mincash) {
				this.showErr('提现金额不得低于' + this.coverPrice(this.mincash) + '元');
				return false;
			}

			return true;
		},
		chkCode: function() {
			var $e = this.elCode,
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

	new WithDrawals();

})(window.Zepto);