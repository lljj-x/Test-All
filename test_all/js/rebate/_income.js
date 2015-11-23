/**
 * rebate/income.js
 */
(function($) {

	var action, hashManager;

	var Action = Base.klass.create({
		tpl: {
			order:'<li><h3 class="order">订单编号：<span><%=orderId%></span></h3><p class="income">赚取收入：<span>￥<%=commission_f%></span></p><p class="time"><%=commissionTime_f%></p></li>',
		},
		elements: {
			'.j-product-info':'elProductInfo',
			'.j-stat-info':'elStatInfo',
			'.j-action-list':'elActionList',
			'.j-no-data':'elNoData',
			'.j-nolist':'elNoList'
		},
		events: {
			
		},
		cgi: {
			action:'/api/commission/queryCommissionList.jsp',
		},
		pageParams:{
			op:3,
			pageSize:10
		},
		listType: '',
		init: function() {
			this.isTotal = false;

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.pageParams.contentId = Base.url.param('content');
			this.listType  = Base.url.param('lt') || 'pdt';

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});

			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';

			this.flush();

		},
		flush: function() {
			this.pageParams.listType = this.listType === 'atc' ? 2 : 1;
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
			var o;

			if (result && result.errCode === 0) {

				o = result.obj;
				this.renderList(o);

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(obj) {
			var coverPrice = this.coverPrice;
			var formatTime = this.formatTime;
			var item = '', rsl_dom = '', list;

			this.loading.hide();

			if(!obj.titleInfo.logoUrl && !obj.titleInfo.title && !obj.titleInfo.price){
				this.elNoData.removeClass('hide');
				return false;
			}

			if(obj.titleInfo){
				this.elProductInfo.find('img').attr('src', obj.titleInfo.logoUrl || '');
				this.elProductInfo.find('.title').text(obj.titleInfo.title || '');
				
				if(this.listType === 'atc'){
					this.elProductInfo.find('.income').addClass('hide');
				}else{
					this.elProductInfo.find('.price').text('￥' + coverPrice(obj.titleInfo.price));
				}
				this.elProductInfo.removeClass('hide');
			}
			if(obj.effect){
				this.elStatInfo.find('.j-share').text(obj.effect.shareNum || 0);
				this.elStatInfo.find('.j-order').text(obj.effect.orderNum || 0);
				this.elStatInfo.find('.j-icome').text('￥' + coverPrice(obj.effect.commission));
				this.elStatInfo.removeClass('hide');
			}
			if(obj.commmissionList && obj.commmissionList.length > 0){
				list = obj.commmissionList;
				for (var i = 0, len = list.length; i < len; i++) {
					itemVals = list[i];
					itemVals.commission_f = coverPrice(itemVals.commission);
					itemVals.commissionTime_f = formatTime(itemVals.commissionTime);
					item = this.tmpl(curTpl, itemVals);
					rsl_dom += item;
				}
				this.elActionList.html(rsl_dom).removeClass('hide');
			}else{
				this.elNoList.removeClass('hide');
			}
			
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
		el: '.j-action-case'
	});


	// Base.url.coverFrom();

})(window.Zepto);