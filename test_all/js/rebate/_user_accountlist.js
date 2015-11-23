/**
 * user accountlist
 */
(function($) {

	var AccountList = Base.klass.create({
		elements: {
			'.j-list': 'elList'
		},
		tpl: {
			item: '<li>\
					<a href="<%=editlink%>">\
						<div class="account-info">\
							<span class="icon">\
								<img src="<%=cardTypeImg%>">\
							</span>\
							<span class="info">\
								<strong><%=trueName%></strong>\
								<p><%=bankName%></p>\
							</span>\
						</div>\
						<div class="account-num"><%=card%></div>\
					</a>\
				</li>'
		},
		cgi: {
			data: '/api/user/queryBindCard.jsp'
		},
		init: function() {
			this.cardType = null;

			this.getData();
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

				$list = this.elList;

				$list.append(this.tmpl(this.tpl.item, $.extend(o, {
					editlink: function(cardType) {
						switch (+cardType) {
							case 1:
								return 'user_bindbank.html?act=edit';
							case 2:
								return 'user_bindzfb.html?act=edit';
							case 3:
								return 'user_bindwx.html?act=edit';
							default:
								return 'user_bindaccount.html';
						}
					}(o.cardType),
					cardTypeImg: function(cardType) {
						switch (+cardType) {
							case 1:
								return '../img/app2/ic_bank_yl.png';
							case 2:
								return '../img/app2/ic_bank_zfb.png';
							case 3:
								return '../img/app2/ic_bank_wx.png';
						}
					}(o.cardType),
					trueName: function(trueName) {
						return trueName.replace(/\w/g, function(j, k, x) {
							return k > 0 ? '*' : j;
						});
					}(o.trueName),
					card: function(card){
						return card.replace(/\w/g, function(j, k, x) {
							return k > 3 && k < x.length - 3 ? '*' : j;
						});
					}(o.card)
				})));
			}
		}
	});

	new AccountList();

})(window.Zepto);