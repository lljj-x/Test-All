/**
 * orderdetail
 */
(function($) {

	var tip;

	var OrderDetail = Base.klass.create({
		elements: {
			'.j-text-id': 'elID',
			'.j-text-status': 'elStatus',
			'.j-text-paytype': 'elPayType',
			'.j-text-createtime': 'elCreateTime',
			'.j-text-rname': 'elRName',
			'.j-text-rphone': 'elRPhone',
			'.j-text-idcard': 'elIdcard',
			'.j-text-address': 'elAddress',
			'.j-text-zip': 'elZip',
			'.j-text-totalfee': 'elTotalFee',
			'.j-text-postfee': 'elPostFee',
			'.j-text-ppatfee': 'elPpatFee',
			'.j-text-realnum': 'elRealNum',
			'.j-text-realvalue': 'elRealValue',
			'.j-text-couponTotalFee': 'elCouponTotalFee',
			'.j-product-list': 'elProductList',

			'.j-act-do': 'elActDo',

			'.j-act-payment': 'elActPayment',
			'.j-act-cancel': 'elActCancel',
			'.j-act-received': 'elActReceived',
			'.j-act-postflow': 'elActPostFlow'
		},
		events: {
			'click .j-act-payment': 'payment',
			'click .j-act-cancel': 'cancel',
			'click .j-act-received': 'received',
			'click .j-act-postflow': 'postflow'
		},
		tpl: {
			product: '<dl>\
							<dt<%=grouponClass%>>\
								<a href="<%=url%>"><img src="<%=logourl%>"></a>\
								<img src="img/groupon/icon-groupTag@2x.png" class="icon-groupon" />\
							</dt>\
							<dd>\
								<a class="title" href="<%=url%>"><%=name%></a>\
								<div class="num">数量: <%=num%></div>\
								<div class="price">单价：￥<%=price%></div>\
							</dd>\
						</dl>'
		},
		cgi: {
			order: '/api/order/getOrderByIdItem.jsp'
				// order: 'json/orderdetail.json'
		},
		init: function() {
			this.orderid = Base.url.param('orderid');

			if (this.orderid) {
				this.getData();
			}
		},
		getData: function() {
			var params;

			params = {
				orderid: this.orderid,
				_: new Date - 0
			};

			$.get(this.cgi.order, params, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var o;

			if (result && result.errCode === 0) {
				o = result.obj;

				this.elID.text(o.orderid);
				this.elStatus.text(Base.Order.getStatus(o.status));
				this.elPayType.text(Base.Order.getPayType(o.paytype));
				this.elCreateTime.text(this.formatTime(o.createtime));
				this.elRName.text(o.rname);
				this.elRPhone.text(o.rphone);
				this.elIdcard.text(function(idcard) {
					return idcard.replace(/\d/g, function(j, k, x) {
						return k > 3 && k < x.length - 4 ? '*' : j;
					});
				}(o.idcard));
				this.elAddress.text(o.province + ', ' + o.city + ', ' + o.district + ' ' + o.address);
				this.elZip.text(o.zip);

				this.elTotalFee.text('￥' + this.coverPrice(o.ftotalfee));
				this.elPostFee.text(o.postfee === 0 ? '已缴' : '￥' + this.coverPrice(o.postfee));
				this.elPpatFee.text(o.ppatfee === 0 ? '已缴' : '￥' + this.coverPrice(o.ppatfee));
				this.elRealValue.text('￥' + this.coverPrice(o.realvalue));

				if (o.couponTotalFee && +o.couponTotalFee) {
					this.elCouponTotalFee.text('￥' + this.coverPrice(o.couponTotalFee)).closest('div').removeClass('hide');
				}

				this.renderProducts(o);

				this.renderButton(o);

			} else {
				tip.show(result.errMsg);
			}
		},
		/**
		 * 渲染订单产品
		 */
		renderProducts: function(o) {
			var list = o.items,
				tmpl,
				tpl,
				realnum,
				coverPrice,
				$list;

			if (list && list.length) {
				tmpl = this.tmpl;
				tpl = this.tpl;
				realnum = 0;
				coverPrice = this.coverPrice;
				$list = this.elProductList;

				$list.html('');

				$(list).each(function(m, n) {
					realnum += n.num;
					$list.append(tmpl(tpl.product, $.extend(n, {
						grouponClass: o.gbid ? ' class="groupon"' : '',

						// 团购商品跳转到团购商品详情
						url: (o.gbpid && +o.gbpid > 0) ? '/groupon/item.html?gbpid=' + o.gbpid + '' : Base.url.getItemUrl(n.pid),
						price: coverPrice(n.price)
					})));
				});

				this.elRealNum.text(realnum);
			}
		},
		/**
		 * 渲染按钮及事件
		 */
		renderButton: function(o) {
			var status,
				text,
				fn;

			if (!o || (status = o.status) === void 0) return;

			switch (+status) {
				case 100:
					this.showPayment();
					this.showCancel();
					break;
				case 700:
					this.showReceived();
					this.showPostFlow();
					break;
			}
		},
		/**
		 * 立即支付
		 */
		showPayment: function() {
			this.elActPayment.removeClass('hide');
		},
		payment: function(orderid) {
			window.location.href = 'checkout/pay.html?orderid=' + this.orderid;
		},
		/**
		 * 确认收货
		 */
		showReceived: function() {
			this.elActReceived.removeClass('hide');
		},
		received: function(orderid) {
			if (confirm('确认已经收到货了吗？')) {
				$.post('/api/order/closeOrder.jsp', {
					orderid: this.orderid
				}, function(result) {
					if (result && result.errCode === 0) {
						window.history.go(-1);
					} else {
						tip.show(result.errMsg);
					}
				});
			}
		},
		/**
		 * 取消订单
		 */
		showCancel: function() {
			this.elActCancel.removeClass('hide');
		},
		cancel: function() {
			if (confirm('确认要取消订单吗？')) {
				$.post('/api/order/userCancelOrder.jsp', {
					orderid: this.orderid
				}, function(result) {
					if (result && result.errCode === 0) {
						// window.history.go(-1);
						window.location.href = 'allorder.html';
					} else {
						tip.show(result.errMsg);
					}
				});
			}
		},
		/**
		 * 物流跟踪
		 */
		showPostFlow: function() {
			this.elActPostFlow.removeClass('hide');
		},
		postflow: function() {
			window.location.href = 'postflow.html?orderid=' + this.orderid;
		}
	});

	new OrderDetail();

	tip = new Base.Widget.Tip();

	Base.url.coverFrom();

})(window.Zepto);