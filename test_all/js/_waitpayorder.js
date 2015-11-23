/**
 * 未支付订单
 */
(function($) {

	var tip;

	var Order = Base.klass.create({
		elements: {
			'.j-list': 'elList'
		},
		tpl: {
			item: '<div class="item" data-id="<%=orderid%>">\
					<h3>\
						金额：<strong>￥<%=realvalue%></strong>\
						<code>交易将在 <b class="j-remaintime">--</b> 后关闭, 请及时付款</code>\
					</h3>\
					<a href="orderdetail.html#id-<%=orderid%>">\
						<dl>\
							<dt><img src="<%=logourl%>"></dt>\
							<dd>\
								<p>订单编号：<%=orderid%></p>\
								<p>订单状态：<strong><%=status%></strong></p>\
							</dd>\
							<dd class="arr"></dd>\
						</dl>\
					</a>\
					<a href="checkout/?orderid=<%=orderid%>" class="btn btn-white">立即支付</a>\
				</div>'
		},
		cgi: {
			data: '/api/order/queryByWaitPay.jsp'
				// data: 'json/order.json'
		},
		init: function() {
			this.isTotal = false;

			this.cacheList = null;

			this.currentPage = 1;
			this.pageSize = 10;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getData();
		},
		pagerGo: function(page) {
			this.currentPage = page;
			this.getData();
		},
		getData: function() {
			var params;

			params = {
				pageNo: this.currentPage,
				pageSize: this.pageSize
			};

			$.post(this.cgi.data, params, this.proxy(this.getDataBack));

			this.loading.show();

			window.scrollTo(0, 0);
		},
		getDataBack: function(result) {
			var list;

			if (result && result.obj) {
				if ((list = result.obj.orderInfoList).length) {
					this.render(list);
					this.getSystemTime();
					if (!this.isTotal) {
						this.pager.total(result.obj.totalNum, this.pageSize);
						this.isTotal = true;
					}
					this.loading.hide();
				} else {
					this.loading.html();
				}
			} else {
				tip.show('获取订单列表失败：【' + result.errMsg + '】');
				this.loading.hide();
			}
		},
		render: function(list) {
			var $list,
				tmpl,
				tpl,
				coverPrice;

			if (list && list.length) {
				$list = this.elList;
				tmpl = this.tmpl;
				tpl = this.tpl;
				coverPrice = this.coverPrice;

				$list.html('');

				this.cacheList = list;

				$(list).each(function(m, n) {
					$list.append(tmpl(tpl.item, $.extend(n, {
						realvalue: coverPrice(n.realvalue)
					})));
				});
			}
		},
		getSystemTime: function() {
			var params;

			params = {
				_: new Date - 0
			}

			$.get('/api/common/getSystemTime.jsp', params, this.proxy(this.getSystemTimeBack));
		},
		getSystemTimeBack: function(result) {
			var now,
				$list;

			if (result && +result.errCode === 0) {
				now = result.obj;
			} else {
				now = new Date - 0;
			}

			$list = this.elList;

			$(this.cacheList).each(function(m, n) {
				Base.Widget.Countdown.push({
					time: n.invalidtime - now,
					$item: $list.find('.item[data-id="' + n.orderid + '"]').find('.j-remaintime')
				});
			});
		}
	});

	tip = new Base.Widget.Tip();

	new Order({
		el: '.j-order-list'
	});

})(window.Zepto);