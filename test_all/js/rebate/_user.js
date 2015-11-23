/**
 * user
 */
(function($){

	var User = Base.klass.create({
		elements: {
			'.j-img-face': 'elFace',
			'.j-text-account': 'elAccount',
			'.j-text-amount': 'elAmount',
			'.j-text-bank': 'elBank',
			'.j-text-coin': 'elCoin'
		},
		events: {
			'click .j-act-withdrawals': 'clickWithdrawals',
			'click .j-act-logout': 'logOut'
		},
		cgi: {
			userInfo: '/api/user/userCenter.jsp',
		},
		init: function(){
			this.isBindCard = false; // 默认未绑定银行

			this.getUserInfo();
		},
		clickWithdrawals: function() {
			window.location.href = this.isBindCard ? 'user_accountlist.html' : 'user_bindaccount.html';
		},
		getUserInfo: function(){
			var params;

			params = {
				_: new Date - 0
			}

			$.get(this.cgi.userInfo, params, this.proxy(this.getUserInfoBack));
		},
		getUserInfoBack: function(result){
			var o;

			if(result && result.errCode === 0){
				o = result.obj;

				this.elFace.attr('src', o.headImg);
				this.elAccount.text(o.nickname);

				this.elAmount.text('￥' + this.coverPrice(o.income));
				this.elBank.text(o.cashType ? o.cashType : '未绑定');
				this.elCoin.text(o.coin);

				this.isBindCard = !!o.cashType;
			}else{
				alert(result.errMsg);
			}
		},
		logOut: function() {
			Base.cookie('sid', null);
			window.location.href = '/';
		}
	});

	new User();

})(window.Zepto);