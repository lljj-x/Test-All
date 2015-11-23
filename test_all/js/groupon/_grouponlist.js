/**
 * 未支付订单
 */
(function($) {

	var tip;

	var Groupon = Base.klass.create({
		elements: {
			'.j-tab': 'elTab',
			'.j-list': 'elList',
			'.j-empty': 'elEmpty'
		},
		tpl: {
			item: '<div class="item" data-id="<%=gbid%>">\
					<dl>\
						<dt>\
							<a href="grouponitem.html?gbid=<%=gbid%>"><img src="<%=logourl%>"></a>\
						</dt>\
						<dd>\
							<a href="grouponitem.html?gbid=<%=gbid%>"><%=title%></a>\
							<div class="status"><%=status%></div>\
						</dd>\
					</dl>\
					<div class="oper">\
						<a href="grouponitem.html?gbid=<%=gbid%>">查看团购详情 >></a>\
						<a href="../orderdetail.html?orderid=<%=orderid%>">查看订单详情 >></a>\
					</div>\
				</div>'
		},
		cgi: {
			data: '/api/groupbuy/groupbuy.jsp'
		},
		events: {
			'click .j-act-received': 'clickReceived'
		},
		init: function() {
			this.lt = Base.url.param('lt');

			this.isTotal = false;

			this.currentPage = 1;
			this.pageSize = 10;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elList
			});

			this.initTab();

			this.getData();
		},
		initTab: function() {
			var $tabs = this.elTab;

			if (this.lt) {
				$tabs.find('.active').removeClass('active');
				this.elTab.find('li').eq(+this.lt).addClass('active');
			}
		},
		pagerGo: function(page) {
			this.currentPage = page;
			this.getData();
		},
		getData: function() {
			var params;

			params = {
				op: 3,
				pageNo: this.currentPage,
				pageSize: this.pageSize
			};


			// 状态
			if (this.lt) {
				$.extend(params, {
					status: this.lt
				});
			}

			$.get(this.cgi.data, params, this.proxy(this.getDataBack));

			this.loading.show();

			window.scrollTo(0, 0);
		},
		getDataBack: function(result) {
			var list;

			if (result) {
				if (result.obj && (list = result.obj.list).length) {

					this.render(list);

					if (!this.isTotal) {
						this.pager.total(result.obj.totalNum, this.pageSize);
						this.isTotal = true;
					}
				} else {
					this.elEmpty.removeClass('hide');
				}

				this.loading.hide();
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
						title: n.groupProduct.title,
						logourl: n.groupProduct.logourl,
						orderid: n.orderId,
						status: n.statusname
					})));
				});
			}
		}
	});

	tip = new Base.Widget.Tip();

	new Groupon();

})(window.Zepto);