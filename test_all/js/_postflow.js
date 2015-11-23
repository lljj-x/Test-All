/**
 * postflow.js
 */
(function($) {

	var Postflow = Base.klass.create({
		elements: {
			'.j-text-rname': 'elRName',
			'.j-text-rphone': 'elRPhone',
			'.j-text-idcard': 'elIdcard',
			'.j-text-address': 'elAddress',

			'.j-text-realnum': 'elRealNum',
			'.j-text-realvalue': 'elRealValue',
			'.j-product-list': 'elProductList',

			'.j-text-orderid': 'elOrderid',
			'.j-text-posttype': 'elPostType',
			'.j-text-postflowno': 'elPostFlowno',
			'.j-postflow-list': 'elPostflowList'
		},
		events: {
			'click .j-act-del': 'clickDel'
		},
		tpl: {
			product: '<dl>\
							<dt>\
								<a href="<%=url%>"><img src="<%=logourl%>"></a>\
							</dt>\
							<dd>\
								<a href="<%=url%>"><%=name%></a>\
								<div class="num">数量: <%=num%></div>\
								<div class="price">￥<%=price%></div>\
							</dd>\
						</dl>',

			item: '<li<%=current%>>\
						<i class="icon"></i>\
						<div class="message">\
							<p><%=memo%></p>\
							<p><%=time%></p>\
						</div>\
					</li>'
		},
		cgi: {
			order: '/api/order/getOrderByIdItem.jsp',
			// order: 'json/orderdetail.json',
			main: '/api/order/getLogistics.jsp'
				// main: 'json/postflow.json'
		},
		init: function() {
			this.orderid = Base.url.param('orderid');

			if (this.orderid) {
				this.getOrderInfo();

				this.loading = new Base.Widget.Loading({
					owner: this.elPostflowList
				});

				this.getData();
			}
		},
		getOrderInfo: function() {
			var params;

			params = {
				orderid: this.orderid,
				_: new Date - 0
			};

			$.get(this.cgi.order, params, this.proxy(this.getOrderInfoBack));
		},
		getOrderInfoBack: function(result) {
			var o;

			if (result && result.errCode === 0) {
				o = result.obj;

				this.elOrderid.text(o.orderid);
				this.elRName.text(o.rname);
				this.elRPhone.text(o.rphone);
				this.elIdcard.text(function(idcard) {
					return idcard.replace(/\d/g, function(j, k, x) {
						return k > 3 && k < x.length - 4 ? '*' : j;
					});
				}(o.idcard));
				this.elAddress.text(o.province + ', ' + o.city + ', ' + o.district + ' ' + o.address);

				this.elRealValue.text('￥' + this.coverPrice(o.realvalue));

				this.renderProducts(o.items);

			} else {
				tip.show(result.errMsg);
			}
		},
		/**
		 * 渲染订单产品
		 */
		renderProducts: function(list) {
			var tmpl,
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
						url: Base.url.getItemUrl(n.pid),
						price: coverPrice(n.price)
					})));
				});

				this.elRealNum.text(realnum);
			}
		},
		getData: function() {
			var params;

			if (this.orderid) {
				params = {
					orderid: this.orderid,
					_: new Date - 0
				};

				$.get(this.cgi.main, params, this.proxy(this.getDataBack));

				this.loading.show();
			} else {
				this.loading.html('物流信息参数错误。');
			}
		},
		getDataBack: function(result) {
			var tmpl = this.tmpl,
				tpl = this.tpl,
				$list = this.elPostflowList,
				o,
				list,
				item;

			if (result) {

				o = result.obj;

				this.elPostType.text(o.type);
				this.elPostFlowno.text(o.num);

				if (+result.errCode === 0) {

					$list.html('');

					if ((list = o.info).length) {

						list = list.reverse();

						$(list).each(function(m, n) {
							item = n.split('###');

							$list.append(tmpl(tpl.item, {
								time: item[0],
								memo: item[1],
								current: m === 0 ? ' class="current"' : ''
							}));
						});

					} else {
						this.loading.html('暂无物流信息。');
					}
				} else {
					this.loading.html('获取物流信息失败【' + result.errMsg + '】');
				}

			}
		}
	});

	new Postflow();

	Base.url.coverFrom();

})(window.Zepto);