/**
 * list.js
 */
(function($) {

	var action, searchAction, hashManager;

	var Action = Base.klass.create({
		tpl: {
			item:'<li>\
						<div class="item-wrap">\
							<a href="<%=url%>">\
					            <div class="thumbnail">\
					            	<img src="<%=pic%>">\
					            </div>\
					            <dl class="details">\
					            	<dt class="title"><%=title%></dt>\
					                <dd class="price"><label>￥ <strong><%=price%></strong></label></dd>\
					                <dd class="source"><%=depotstr%></dd>\
					            </dl>\
					        </a>\
						</div>\
					</li>'
			
		},
		cgi: {
			action:'/api/product/queryProductList.jsp'
				// action: 'json/activity.json'
		},
		pageParams:{
			op:20,
			pageSize:10
		},
		init: function() {
			this.isTotal = false;

			var sword = Base.url.param('sword') || '';
			if(sword) this.pageParams.qryText = sword;
			var catid = Base.url.param('catid') || '';
			if(catid) this.pageParams.categoryId = catid;
			var func = Base.url.param('func') || '';
			if(func) this.pageParams.funcId = func;

			this.pageParams.pageNo = Base.url.getPageHash() || 1;


			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.flush();

		},
		flush: function() {
			this.pageParams.pageNo = Base.url.getPageHash() || 1;
			this.pager.setCurrent(this.pageParams.pageNo);
			this.isTotal = false;
			window.scrollTo(0, 0);
			if(searchAction){
				searchAction.resetDetailList();
			}
			this.getData();
		},
		pagerGo: function(pageNo) {
			// this.pageParams.pageNo = pageNo;
			// this.flush();
			hashManager.setHash('pg-' + pageNo);
		},
		getData: function() {
			
			this.pageParams._ = new Date() - 0;
			this.pageParams.scope = this.pageParams.scope || 1;

			if(this.pageParams.qryText){
				try{
					this.pageParams.qryText = decodeURI(this.pageParams.qryText);
				}catch(e){
				}
			}

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();

		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;

				if ((list = o.list)) {
					this.renderList(list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				} else {
					this.renderList([]);
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			var item,
				spliter,
				slist,
				listI,
				rsl_dom;

			this.el.html('');

			if (list && list.length) {
				rsl_dom = '';
				this.el.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					listI = list[i];

					item = this.tmpl(this.tpl.item, {
						url:Base.url.getItemUrl(listI.pid),
						id: listI.pid,
						title: listI.name,
						pic: listI.logourl,
						price: this.coverPrice(listI.price),
						depotstr: listI.depotName,
						// discount: Math.round((listI.price / listI.referance_price)*100)/10,
						// seldout: (listI.maxbuy < 1 || listI.status === 0) ? '' : 'hide'
					});
					rsl_dom += item;
				}
				this.el.html('<ul>'+rsl_dom+'</ul>');
				$('.j-pager').removeClass('hide');
				this.loading.hide();
			} else {
				this.el.html('<div class="noproducts"><p>没有找到匹配的商品</p></div>');
				$('.j-pager').addClass('hide');
				this.loading.hide();
			}
		}
	});


	var SearchAction = Base.klass.create({
		elements: {
			'.j-details-list':'elDetailsList',
			'.j-search-input':'elSearchInput',
			'.j-search-case':'elSearchCase'
		},
		events: {
			'focus .j-si-txt' : 'jsiOnFocus',
			'blur .j-si-txt' : 'jsiOnBlur',
			'click .j-si-clear' : 'jsiClear',
			'click .j-sh-item' : 'selectHistory',
			'click .j-sh-clear' : 'clearHistory',
			'submit .j-search-form' : 'doSearch',
			'click .j-flt-option':'changeScope'

		},
		tpl: {
			shItem:'<li><a class="sh-item j-sh-item" href="javascript:void(0);"><%=shWord%></a></li>'
			},
		init: function() {

			this.hsKey = 'searchHis';

			var sword = Base.url.param('sword');
			if(sword){
			try{
				sword = decodeURI(sword);
			}catch(e){
			}
			this.elSearchInput.find('.j-si-txt').val(sword);
			}
			
			this.renderHistoryList();
		},
		changeSearchWord:function(sword){
			if(action){
				this.elSearchInput.find('.j-si-txt').val(sword);
				this.insertHistoryCookie(sword);
				action.pageParams.qryText = sword;
				delete action.pageParams.categoryId;
				delete action.pageParams.funcId;
				action.flush();
			}
		},
		changeScope:function(e){
			if(action){
				this.elDetailsList.find('.j-flt-option').removeClass('active');
				action.pageParams.scope = $(e.currentTarget).addClass('active').attr('data-scopeid');
				action.flush();
			}
		},
		renderHistoryList:function(){
			var shList = this.getHistoryList();
			shList = shList ? shList : '<p class="no-history">暂无搜索历史</p>';
			this.elSearchCase.find('.sh-list').html(shList);
		},
		getHistoryList:function(){
			var hisArr = this.getHistoryCookie();
			var itemGroup = '';
			for(var i=0; i<hisArr.length; i++){
				if(hisArr[i] !== ''){
					itemGroup += this.tmpl(this.tpl.shItem, {
						shWord:hisArr[i],
					});
				}
			}
			if(itemGroup !== '')  itemGroup = '<ul>'+itemGroup+'</ul>';
			return itemGroup;
		},
		jsiOnFocus:function(){
			this.elDetailsList.addClass('hide');
			this.elSearchCase.removeClass('hide');
			this.renderHistoryList();
		},
		jsiOnBlur:function(){
			var self = this;
			setTimeout(self.resetDetailList, 500);
		},
		jsiClear:function(){
			this.elSearchInput.find('.j-si-txt').val('');
		},
		selectHistory:function(e){
			var self = $(e.currentTarget);
			var sword = self.text();
			this.changeSearchWord(sword);
			// this.elSearchInput.find('.j-si-txt').val(word);
		},
		clearHistory:function(){
			$.fn.cookie(this.hsKey,'');
			this.renderHistoryList();
		},
		doSearch:function(e){
			e.preventDefault();
			var sword = this.elSearchInput.find('.j-si-txt').val();
			this.changeSearchWord(sword);
		},
		resetDetailList:function(){
			$('.j-details-list').removeClass('hide');
			$('.j-search-case').addClass('hide');
		},
		getHistoryCookie:function(){
			var hisStr = $.fn.cookie(this.hsKey) || '';
			var hisArr = hisStr.split('#');
			return hisArr;
		},
		insertHistoryCookie:function(sword){
			var rslStr = '';
			var hisStr = $.fn.cookie(this.hsKey) || '';
			var hisArr = hisStr.split('#');
			var idx = $.inArray(sword, hisArr);
			if(idx >= 0){
				hisArr.splice(idx,1);
			}
			hisArr.unshift(sword);
			rslStr = hisArr.join('#');
			$.fn.cookie(this.hsKey, rslStr);
			return 1;
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
		el: '.j-action-list'
	});

	searchAction = new SearchAction({
		el: '.j-search-single'
	});

})(window.Zepto);