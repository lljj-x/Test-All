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
						<div class="orderno">\
							订单编号：<%=orderid%>\
						</div>\
						<dl>\
							<dt<%=grouponClass%>>\
								<a href="orderdetail.html?orderid=<%=orderid%>"><img src="<%=logourl%>"></a>\
								<img src="img/groupon/icon-groupTag@2x.png" class="icon-groupon" />\
							</dt>\
							<dd>\
								<a href="orderdetail.html?orderid=<%=orderid%>"><%=pname%></a>\
								<div class="num">数量: <%=itemnum%></div>\
								<div class="price">￥<%=itemprice%></div>\
							</dd>\
						</dl>\
						<div class="total">\
							<span class="num">共<strong><%=realnum%></strong>件商品</span>\
							<span class="price">合计: <strong>￥<%=realvalue%></strong></span>\
						</div>\
						<div class="oper">\
							<%=remainStr%>\
							<%=operStr%>\
						</div>\
					</div>'
		},
		cgi: {
			data: '/api/order/queryWaitHandler.jsp'
				// data: 'json/order.json'
		},
		events: {
			'click .j-act-received': 'clickReceived'
		},
		init: function() {
			this.isTotal = false;

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

			$.get(this.cgi.data, params, this.proxy(this.getDataBack));

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
						grouponClass: n.gbid ? ' class="groupon"' : '',
						itemprice: coverPrice(n.itemprice),
						realvalue: coverPrice(n.realvalue),
						remainStr: n.statusid === 100 ? '<div class="remain">交易关闭：<b class="j-remaintime">--</b></div>' : '',
						operStr: function(status) {
							switch (+status) {
								case 100:
									return '<a href="checkout/pay.html?orderid=' + n.orderid + '" class="btn btn-pay">去支付</a>';
								case 200:
									if (/(IDCARD_ERROR|IDCARD_NULL)/.test(n.waithandling)) {
										return '<a href="paysuccess.html?orderid=' + n.orderid + '" class="btn btn-confirm">确认身份信息</a>';
									} else {
										return '<a href="orderdetail.html?orderid=' + n.orderid + '" class="btn btn-postflow">查看详情</a>';
									}
									break;

								case 700:
									return '<a href="postflow.html?orderid=' + n.orderid + '" class="btn btn-postflow">查看物流</a><button class="btn btn-received j-act-received" data-orderid="' + n.orderid + '">确认收货</button>';
								default:
									return '<a href="orderdetail.html?orderid=' + n.orderid + '" class="btn btn-postflow">查看详情</a>'
							}
						}(n.statusid)
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
		},
		clickReceived: function(e) {
			var $e = $(e.currentTarget),
				orderid = $e.attr('data-orderid');

			if (confirm('确认已经收到货了吗？')) {
				$.post('/api/order/closeOrder.jsp', {
					orderid: orderid
				}, function(result) {
					if (result && result.errCode === 0) {
						window.location.reload();
					} else {
						tip.show(result.errMsg);
					}
				});
			}
		}
	});

	tip = new Base.Widget.Tip();

	new Order({
		el: '.j-order-list'
	});

})(window.Zepto);