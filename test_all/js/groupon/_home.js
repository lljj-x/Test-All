/**
 * groupon/home.js
 */
(function($) {

	var action, notice, hashManager;

	// 海拼团团购商品列表获取
	var Action = Base.klass.create({
		tpl: {
			item:'<li><a href="/groupon/item.html?gbpid=<%=gbpid%>"><div class="item-wrap"><div class="pdt-wrap"><div class="pdt-imgage"><img src="<%=picture%>" alt=""><div class="discount <%=discount_hide%>"><%=discount%>折</div></div><div class="pdt-detail"><h3 class="title"><%=title%></h3><p class="subtitle"><%=subTitle%></p><p class="des"><%=groupBuyDesc%></p><p class="price-group"><span class="price">￥<i><%=groupBuyPrice_f%></i></span>&nbsp;&nbsp;&nbsp;<span class="market-price">市场价:￥<i><%=referance_price_f%></i></span></p></div></div><div class="groupon-btn j-go-groupon"><p><%=joinLimitNum%>人团&nbsp;&nbsp;去团购</p></div></div></a></li>'
		},
		elements: {
			'.j-action-list': 'elActionList'
		},
		events: {
			'click .j-goto-groupon': 'gotoGroupon'
		},
		cgi: {
			action:'/api/groupbuy/groupbuy.jsp'
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

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;

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

			var item='' , rsl_dom = '', itemVals;
			this.elActionList.html('');
			for (var i = 0, len = list.length; i < len; i++) {
				itemVals = list[i];
				itemVals.discount = Math.round((itemVals.groupBuyPrice / itemVals.referance_price)*100)/10;
				itemVals.discount_hide = itemVals.discount > 9.9 ? 'hide' : '';
				itemVals.groupBuyPrice_f = this.coverPrice(itemVals.groupBuyPrice);
				itemVals.referance_price_f = this.coverPrice(itemVals.referance_price);
				item = this.tmpl(this.tpl.item, itemVals);
				rsl_dom += item;
			}
			this.elActionList.html('<ul>'+rsl_dom+'</ul>');

			this.loading.hide();

		},
	});

	// 海拼团公告获取
	var Notice = Base.klass.create({
		elements: {
			'.j-gn-title': 'elGnTitle',
			'.j-gn-content': 'elGnContent'
		},
		events: {
			'click .j-notice-close': 'closeNotice'
		},
		cgi: {
			getNotice:'/api/notice/queryNotice.jsp',
			closeNotice:''
		},
		init: function() {
			this.getData();
		},
		getData: function() {
			var parmas = {
				op:3,
				noticetype:2,
				notifytype:4
			};
			parmas._ = new Date() - 0;
			$.get(this.cgi.getNotice, parmas, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var o;
			if (result && result.errCode === 0) {
				o = result.obj;
				this.renderNotice(o);
			} 
		},
		renderNotice: function(o) {
			if(!o.isRead && o.title && o.content){
				this.elGnTitle.find('h2').text(o.title);
				this.elGnContent.find('p').text(o.content);
				this.el.show();
			}
		},
		closeNotice: function(){
			$.ajax({
                type: 'GET',
                url: '/api/notice/closeNotice.jsp',
                data: {
                	op:4,
                	notifytype:4
                },
                dataType: 'json',
                timeout: 5000,
                success: function(data) {
                    return false;
                },
                error: function(xhr, type) {
                    return false;
                }
            });
			this.el.hide();
		}
	});

	// hash翻页
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
		el: '.j-groupon-group'
	});

	notice = new Notice({
		el: '.j-groupon-notice'
	});



})(window.Zepto);