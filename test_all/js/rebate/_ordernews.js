/**
 * rebate/ordernews.js
 */
(function($) {

	var action, hashManager, sliderAction, commission;

	var Action = Base.klass.create({
		tpl: {
			item:'<li><div class="item-wrap"><div class="details"><p class="order">订单编号：<span><%=orderId%></span></p><p class="income">收入：<span>￥<%=commission_f%></span></p><p class="source">推广来源：<span><%=orderSource_f%></span></p></div></div></li>'
		},
		elements: {
			'.j-action-list': 'elActionList',
		},
		cgi: {
			action:'/api/notice/orderNotifyList.jsp'
		},
		pageParams:{
			op:1,
			pageSize:10
		},
		init: function() {
			this.isTotal = false;

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});

			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elActionList
			});

			this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';

			this.flush();

		},
		flush: function() {

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.getData();

			this.pager.setCurrent(this.pageParams.pageNo);

			this.isTotal = false;

			window.scrollTo(0, 0);
		},
		pagerGo: function(pageNo) {
			hashManager.setHash('pg-' + pageNo);
		},
		getData: function() {

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;

				if(o.orderNotifyList && o.orderNotifyList.length > 0){
					this.renderList(o.orderNotifyList);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				}else{
					this.loading.html('暂无数据。');
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			var item = '', rsl_dom = '', itemVals;
			var self = this;
			var coverOrderSourceName = this.this.coverOrderSourceName;
			var coverPrice = this.coverPrice;

			if (list && list.length > 0) {
				this.elActionList.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					itemVals = list[i];
					itemVals.orderSource_f = coverOrderSourceName(itemVals.orderSource);
					itemVals.commission_f = coverPrice(itemVals.commission);
					rsl_dom += item;
				}
				this.elActionList.html('<ul>'+rsl_dom+'</ul>');
				this.loading.hide();
			} else {
				this.loading.html();
			}
		},
		coverOrderSourceName: function(orderSource){
			var osn = '';
			if(orderSource == 1){
				osn = "分享商品";
			}else if(orderSource == 2){
				osn = "分享文案";
			}
			return osn;
		}
	});


	var HashManager = Base.klass.create({
		init: function() {
			$(window).on('hashchange', this.proxy(this.hashChange));
		},
		setHash: function(hash) {
			window.location.hash = hash;
		},
		hashChange: function() {
			var pageNo = Base.url.getPageHash();
			action.flush();
		}
	});


	hashManager = new HashManager();



	action = new Action({
		el: '.j-rebate-group'
	});




})(window.Zepto);