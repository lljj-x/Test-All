/**
 * rebate/myrebate.js
 */
(function($) {

	var action, hashManager;

	var Action = Base.klass.create({
		tpl: {
			pdt:'<li><div class="item-wrap"><a href="/item<%=pid%>.html"><div class="thumbnail"><img src="<%=logourl%>"></div><div class="details"><p class="title"><%=name%></p><p class="income"><i>单笔收入</i>&nbsp;&nbsp;<span>￥<%=unit_commission_fm%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="price">商品价格：￥<%=price_fm%></span></p><p class="txt-group"><span class="share">分享次数：<%=quote_count%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sharetime"><%=sharetime_fm%></span></p></div></a></div><div class="btn-wrap"><ul><li class="btn-bom"><a href="income.html?lt=pdt&content=<%=pid%>" class="check-income j-check-income">查看收入</a></li><li class="btn-bom"><a href="javascript:void(0);" class="share-link j-share-btn" data-img="<%=logourl%>" data-title="<%=name%>" data-pid="<%=pid%>">立即分享</a></li></ul></div></li>',
			atc:'<li><div class="item-wrap"><a href="/sharepage.html?t_id=E_<%=eid%>&head=no&com=yes"><div class="thumbnail"><img src="<%=title_img%>"></div><div class="details"><p class="title"><%=title%></p><p class="income"><i>预估佣金</i>&nbsp;&nbsp;<span>￥<%=sumCommission_fm%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="read">阅读量：<%=read_count%></span></p><p class="txt-group"><span class="share">分享次数：<%=quote_count%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sharetime"><%=sharetime_fm%></span></p></div></a></div><div class="btn-wrap"><ul><li class="btn-bom"><a href="income.html?lt=atc&content=<%=eid%>" class="check-income j-check-income">查看收入</a></li><li class="btn-bom"><a href="javascript:void(0);" class="share-link j-share-btn" data-img="<%=title_img%>" data-title="<%=title%>" data-eid="<%=eid%>">立即分享</a></li></ul></div></li>'
		},
		elements: {
			'.j-case-product': 'elCaseProduct',
			'.j-case-artcle': 'elCaseArtcle',
			'.j-sort-tabbar': 'elSortTabbar',
			'.j-sort-tab': 'elSortTab',
			'.j-case': 'elCase'
		},
		events: {
			'click .j-share-btn': 'openShareBar'
		},
		cgi: {
			queryProductList:'/api/product/queryProductList.jsp',
			queryEssayList:'/api/essay/queryEssayList.jsp'
		},
		pageParams:{
			pageSize:10
		},
		spParams:{},
		listType: '',
		init: function() {
			this.isTotal = false;
			
			this.listType = Base.url.param('lt') || 'pdt';
			this.pageParams.sortType = Base.url.param('st') || 1;

			if(Base.url.param('qt')){
				this.spParams.qryText = Base.url.param('qt');
			}
			if(Base.url.param('cid')){
				this.spParams.categoryId = Base.url.param('cid');
			}
			if(Base.url.param('fid')){
				this.spParams.funcId = Base.url.param('fid');
			}

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

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
			var cgi = '', params = {};

			if(this.listType === 'pdt'){
				params.op = 6;
				cgi = this.cgi.queryProductList;
			}else if(this.listType === 'atc'){
				params.op = 6;
				params.status = 2;
				cgi = this.cgi.queryEssayList;
			}

			$.extend(params, this.pageParams, this.spParams);

			if(!cgi) return;
			
			this.pageParams._ = new Date() - 0;

			$.get(cgi, params, this.proxy(this.getDataBack));

			this.loading.show();
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;

				if(o.g_chan) $('.-mob-share-ui').attr('data-gchan', o.g_chan);

				if(o.list.length > 0){
					this.renderList(o.list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				}else{
					this.loading.html('<p style="padding:120px;text-align:center;">暂时没有数据</p>');
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			var item = '',rsl_dom = '';
			var curCase, curTpl, curValGroup;
			var self = this;
			var stab = this.pageParams.sortType;

			if(this.listType === 'pdt'){
				curCase = this.elCaseProduct;
				curTpl = this.tpl.pdt;
				curValGroup = function(item){
					return self.pdtValGroup.call(self, item);
				};
			}else if(this.listType === 'atc'){
				curCase = this.elCaseArtcle;
				curTpl = this.tpl.atc;
				curValGroup = function(item){
					return self.atcValGroup.call(self, item);
				};
			}

			if (list && list.length > 0) {
				this.resetStatus();
				this.elCase.find('.j-action-list').html('');
				for (var i = 0, len = list.length; i < len; i++) {
					item = this.tmpl(curTpl, curValGroup(list[i]));
					rsl_dom += item;
				}
				curCase.find('.j-action-list').html('<ul>'+rsl_dom+'</ul>');
				curCase.find('.j-sort-tabbar').addClass('j-active').find('.j-sort-tab[data-stab="'+stab+'"]').addClass('active');
				curCase.addClass('j-active');

				this.loading.hide();
			} else {
				this.loading.html();
			}
		},
		pdtValGroup:function(item){
			var fm = item;
			fm.price_fm = this.coverPrice(fm.price);
			fm.sharetime_fm =  this.formatTime(fm.sharetime);
			fm.unit_commission_fm = this.coverPrice(fm.unit_commission);
			return fm;
		},
		atcValGroup:function(item){
			var fm = item;
			fm.sumCommission_fm = this.coverPrice(fm.sumCommission);
			fm.sharetime_fm =  this.formatTime(fm.sharetime);
			return fm;
		},
		resetStatus:function(){
			this.elCase.removeClass('j-active');
			this.elSortTabbar.removeClass('j-active');
			this.elSortTab.removeClass('active');
		}
	});

	var Header = Base.klass.create({
		init: function() {
			var lt = Base.url.param('lt');
			lt = lt !== 'atc' ? 'pdt' : 'atc';
			this.el.find('li[data-lt="'+lt+'"]').addClass('active');
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

	new Header({
		el: '.j-share-tabber'
	});

	// Base.url.coverFrom();

})(window.Zepto);