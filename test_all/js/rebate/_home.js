/**
 * rebate/income.js
 */
(function($) {

	var action, hashManager, sliderAction, commission;

	var Action = Base.klass.create({
		tpl: {
			pdt:'<li><div class="item-wrap"><a href="/item<%=pid%>.html"><div class="thumbnail"><img src="<%=logourl%>"><%=tag%></div><div class="details"><p class="title"><%=name%></p><p class="income"><i>单笔收入</i>&nbsp;&nbsp;<span>￥<%=unit_commission_fm%></span></p><p class="txt-group"><span class="price">价格：￥<%=price_fm%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="share">分享次数：<%=quote_count%></span></p></div></a><a data-img="<%=logourl%>" data-title="<%=name%>" data-pid="<%=pid%>" class="share-btn j-share-btn" href="javascript:void(0);">分享</a></div></li>'
		},
		elements: {
			'.j-sort-tab': 'elSortTab',
			'.j-sort-tabbar': 'elSortTabber',
			'.j-action-list': 'elActionList'
		},
		events: {
			'click .j-sort-tab': 'switchTab',
		},
		cgi: {
			action:'/api/product/queryProductList.jsp'
		},
		pageParams:{
			op:5,
			pageSize:10
		},
		init: function() {
			this.isTotal = false;

			this.pageParams.sortType = this.getSortID();
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

				if(o.g_chan) $('.-mob-share-ui').attr('data-gchan', o.g_chan);

				if(o.list.length > 0){
					this.renderList(o.list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				}else{
					this.loading.html('暂时没有数据');
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			var item = '', rsl_dom = '', itemVals;
			var self = this;
			var stab = this.pageParams.sortType;

			if (list && list.length > 0) {
				this.elActionList.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					itemVals = list[i];
					itemVals.tag = itemVals.tags && itemVals.tags.length > 0 && itemVals.tags[0].pictureUrl ? '<img class="tag" src="'+itemVals.tags[0].pictureUrl+'" alt="'+itemVals.tags[0].name+'">' : '';
					itemVals.price_fm = this.coverPrice(itemVals.price);
					itemVals.unit_commission_fm = this.coverPrice(itemVals.unit_commission);
					item = this.tmpl(this.tpl.pdt, itemVals);
					rsl_dom += item;
				}
				this.elActionList.html('<ul>'+rsl_dom+'</ul>');
				this.loading.hide();
			} else {
				this.loading.html();
			}
		},
		switchTab:function(e){
			var curTab = $(e.currentTarget);
			var tabGroup = this.elSortTabber.find('li');
			var tabSortid = '';
			
			if(!curTab.hasClass('active')){
				tabGroup.removeClass('active');
				this.pageParams.sortType = curTab.attr('data-sort');
				curTab.addClass('active');
				if(window.location.hash === '#pg-1'){
					hashManager.setHash('');
				}else{
					this.pagerGo(1);
				}
			}
		},
		getSortID:function(){
			var act = this.elSortTabber.find('li.active');
			if(act.length > 0){
				act = this.elSortTabber.find('li').eq(0);
			}else{
				act = this.elSortTabber.find('li').eq(0).addClass('active');
			}
			var sortid = act.attr('data-sort');
			return sortid;
		}
	});

	var SliderAction = Base.klass.create({
		elements: {
			'.j-list': 'elList'
		},
		tpl: {
			item: '<div class="swiper-slide"><div class="item j-item"><a href="<%=actlink%>"><img src="<%=acturl3%>"></a></div></div>'
		},
		cgi: {
			action: '/api/product/getActList.jsp'
		},
		pageParams:{
			chanid: 101,
			pageNo: 1,
			pageSize: 5
		},
		doScrollTop: false,
		init: function() {
			var self = this;

			var scroll = Base.url.param('scroll') || '';

			this.doScrollTop = (scroll && scroll == 1);
			
			this.swiper = null;

			this.getData();

			$(window).bind('resize', function(){
				if(self.swiper) self.swiper.reInit();
			});
		},
		getData: function() {
			
			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;

				if ((list = o.activityList)) {
					this.renderList(list);
				} else {
					this.renderList([]);
				}
			} else {
				// 获取数据失败！
			}
		},
		renderList: function(list) {
			var tmpl = this.tmpl,
				tpl = this.tpl,
				$list = this.elList,
				item;

			$list.html('');

			if (list.length) {
				this.show();

				$(list).each(function(m, n) {
					item = n;

					$list.append(tmpl(tpl.item, $.extend(item, {
						actlink: function(t) {
							if (t === 0) {
								return 'list.html?chan=' + item.actid;
							} else if (t === 1) {
								return item.actlink;
							}
						}(item.acttype)
					})));

				});

				if (this.swiper) {
					this.swiper.destory(true);
				}

				this.swiper = new Swiper('.j-slider-container', {
					autoplay: 2000,
					autoplayDisableOnInteraction: false,
					loop: true,
					calculateHeight: true,
					pagination: '.dotted'
				});

				if(this.doScrollTop) setTimeout(this.rebateListScrollTop, 500);
				
			} else {
				this.hide();
			}
		},
		show: function() {
			this.el.show();
			if(this.swiper) this.swiper.startAutoplay();
		},
		hide: function() {
			this.el.hide();
			if(this.swiper) this.swiper.stopAutoplay();
		},
		rebateListScrollTop: function(){
			var top = $('.j-rebate-group').offset().top;
			$(window).scrollTop(top);
		}
	});


	var Commission = Base.klass.create({
		elements: {
			'.j-share': 'elShare',
			'.j-complete': 'elComplete',
			'.j-icome': 'elIcome'
		},
		cgi: {
			action: '/api/commission/HomeCommission.jsp'
		},
		pageParams:{},
		init: function() {

			this.getData();

		},
		getData: function() {
			
			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var o;

			if (result && result.errCode === 0) {
				o = result.obj;
				this.renderList(o);
			} else {
				// 获取数据失败！
			}
		},
		renderList: function(o) {
			// shareCount":3,"tradeCount":0,"commission":0
			var shareCount = o.shareCount || 0;
			var tradeCount = o.tradeCount || 0;
			var commission = o.commission || 0;
			commission = this.coverPrice(commission);
			this.elShare.text(shareCount+' 次');
			this.elComplete.text(tradeCount+' 单');
			this.elIcome.text("￥"+commission);
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

	sliderAction = new SliderAction({
		el: '.j-slider-container'
	});

	action = new Action({
		el: '.j-rebate-group'
	});

	commission = new Commission({
		el: '.j-stat-group'
	});


})(window.Zepto);