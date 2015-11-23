/**
 * user income
 */
(function($) {

	var tip;

	var Userincome = Base.klass.create({

		elements: {
			'.j-act-scope': 'elScope',

			'.j-text-clickCount': 'elClickCount',
			'.j-text-tradeCount': 'elTradeCount',
			'.j-text-commission': 'elCommission',
			'.j-text-balance': 'elBalance',
			'.j-text-totalCommission': 'elTotalCommission',
			'.j-text-precommission': 'elPrecommission',
			'.j-text-waitConfirm': 'elWaitConfirm',
			'.j-text-cash': 'elCash',
			'.j-text-income': 'elIncome',

			'.j-act-withdrawals': 'elWithdrawals'
		},
		events: {
			'click .j-act-scope': 'clickScope',
			'click .j-act-withdrawals': 'clickWithdrawals'
		},
		cgi: {
			income: '/api/commission/commissionCenter.jsp',
		},
		init: function() {
			this.timeScope = 1; // 1 昨天 2 7天 3 30天

			this.isBindCard = false; // 默认未绑定银行

			this.getIncome();
		},
		clickScope: function(e) {
			var $e = $(e.currentTarget),
				scope = $e.attr('data-scope');

			this.elScope.filter('.active').removeClass('active');

			$e.addClass('active');

			this.timeScope = +scope;

			this.getIncome();
		},
		clickWithdrawals: function(e) {
			var balance;

			if (this.isBindCard) {

				balance = +$(e.currentTarget).attr('data-balance');

				if (balance > 0) {
					window.location.href = 'user_withdrawals.html?balance=' + balance;
				} else {
					tip.show('账户余额不足');
				}

			} else {
				window.location.href = 'user_bindaccount.html';
			}
		},
		getIncome: function() {
			var params;

			params = {
				op: 1,
				timeScope: this.timeScope,
				_: new Date - 0
			}

			$.get(this.cgi.income, params, this.proxy(this.getIncomeBack));
		},
		getIncomeBack: function(result) {
			var o,
				coverPrice;

			if (result && result.errCode === 0) {
				o = result.obj;

				coverPrice = this.coverPrice;

				this.elClickCount.text(o.clickCount);
				this.elTradeCount.text(o.tradeCount);
				this.elCommission.text('￥' + coverPrice(o.commission));
				this.elBalance.text('￥' + coverPrice(o.balance));
				this.elWithdrawals.attr('data-balance', o.balance);
				this.elTotalCommission.text('￥' + coverPrice(o.totalCommission));
				this.elPrecommission.text('￥' + coverPrice(o.precommission));
				this.elWaitConfirm.text('￥' + coverPrice(o.waitConfirm));
				this.elCash.text('￥' + coverPrice(o.cash));
				this.elIncome.text('￥' + coverPrice(o.income));

				this.isBindCard = !!o.isBindCard;

			} else {
				alert(result.errMsg);
			}
		}

	});

	tip = new Base.Widget.Tip();

	new Userincome();

})(window.Zepto);