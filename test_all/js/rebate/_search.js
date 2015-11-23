/**
 * rebate/search.js
 */
(function($) {

	var action, searchAction, hashManager;

	var Action = Base.klass.create({
		elements: {
			'.j-loading-wrap': 'elLoadingWrap',
			'.j-no-data': 'elNoData',
			'.j-search-case':'elSearchCase',
			'.j-sort-tab':'elSortTab',
			'.j-details-list': 'elDetailsList',
			'.j-action-list':'elActionList'
		},
		tpl: {
			item:'<li><div class="item-wrap"><a href="/item<%=pid%>.html"><div class="thumbnail"><img src="<%=logourl%>"><%=tag%></div><div class="details"><p class="title"><%=name%></p><p class="income"><i>单笔收入</i>&nbsp;&nbsp;<span>￥<%=unit_commission_fm%></span></p><p class="txt-group"><span class="price">价格：￥<%=price_fm%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="share">分享次数：<%=quote_count%></span></p></div></a><a data-img="<%=logourl%>" data-title="<%=name%>" data-pid="<%=pid%>" class="share-btn j-share-btn" href="javascript:void(0);">分享</a></div></li>'
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

			var sword = Base.url.param('sword') || '';
			if(sword) this.pageParams.qryText = sword;
			var catid = Base.url.param('catid') || '';
			if(catid) this.pageParams.categoryId = catid;
			var func = Base.url.param('func') || '';
			if(func) this.pageParams.funcId = func;

			this.pageParams.sortType = Base.url.param('st') || 2;

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elLoadingWrap
			});

			this.flush();

		},
		flush: function() {
			this.pageParams.pageNo = Base.url.getPageHash() || 1;
			this.pager.setCurrent(this.pageParams.pageNo);
			this.isTotal = false;
			window.scrollTo(0, 0);
			this.getData();
		},
		pagerGo: function(pageNo) {
			hashManager.setHash('pg-' + pageNo);
		},
		getData: function() {

			this.elHide(['j-no-data', 'j-search-case', 'j-details-list']);
			
			if(this.pageParams.qryText){
				try{
					this.pageParams.qryText = decodeURI(this.pageParams.qryText);
				}catch(e){
				}
			}else{
				this.elSearchCase.removeClass('hide');
				return false;
			}

			this.pageParams._ = new Date() - 0;
			this.pageParams.scope = this.pageParams.scope || 1;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
			this.loading.show();

		},
		getDataBack: function(result) {
			var list,
				o;
			if (result && result.errCode === 0) {
				o = result.obj;
				if (o.g_chan) $('.-mob-share-ui').attr('data-gchan', o.g_chan);
				if (o.list.length > 0) {
					this.renderList(o.list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				} else {
					this.elNoData.html('<p>没有找到匹配的商品</p>');
					this.elHide(['j-details-list', 'j-search-case']);
					this.elShow(['j-no-data']);
				}
			} else {
				this.elNoData.html('<p>获取数据失败。【' + result.errMsg + '】</p>');
				this.elHide(['j-details-list', 'j-search-case']);
				this.elShow(['j-no-data']);
			}
			this.loading.hide();
		},
		renderList: function(list) {
			var  item = '', result_dom = '', item_vals;

			this.elActionList.html('');

			for (var i = 0, len = list.length; i < len; i++) {
				item = list[i];
				item.tag = item.tags && item.tags.length > 0 && item.tags[0].pictureUrl ? '<img class="tag" src="'+item.tags[0].pictureUrl+'" alt="'+item.tags[0].name+'">' : '';
				item.price_fm = this.coverPrice(item.price);
				item.unit_commission_fm = this.coverPrice(item.unit_commission);
				item_vals = this.tmpl(this.tpl.item, item);
				result_dom += item_vals;
			}
			this.elActionList.html('<ul>'+result_dom+'</ul>');
			this.renderSortTab();
			this.elHide(['j-no-data', 'j-search-case']);
			this.elShow(['j-details-list']);
		},
		renderSortTab:function(){
			var st = this.pageParams.sortType;
			this.elSortTab.removeClass('active').each(function(){
				var tab = $(this);
				if(tab.attr('data-stab') == st){
					tab.addClass('active');
					return false;
				}
			});
		},
		elShow:function(elArr){
			if(!elArr.length) return false;
			for(var i = 0, len = elArr.length; i<len; i++){
				this.el.find('.'+elArr[i]).removeClass('hide');
			}
		},
		elHide:function(elArr){
			if(!elArr.length) return false;
			for(var i = 0, len = elArr.length; i<len; i++){
				this.el.find('.'+elArr[i]).addClass('hide');
			}
		}
	});


	var SearchAction = Base.klass.create({
		elements: {
			'.j-search-input':'elSearchInput',
			'.j-search-case':'elSearchCase',
			'.j-details-list': 'elDetailsList',
			'.j-action-list':'elActionList',
			'.j-sh-clear': 'elShClear',
			'.j-no-data':'elNoData'
		},
		events: {
			'focus .j-si-txt' : 'jsiOnFocus',
			'click .j-si-clear' : 'jsiClear',
			'click .j-sh-item' : 'selectHistory',
			'click .j-sh-clear' : 'clearHistory',
			'submit .j-search-form' : 'doSearch',
			'click .j-sort-tab': 'changeSortTab'
		},
		tpl: {
			sh_item:'<li><a class="sh-item j-sh-item" href="javascript:void(0);"><%=sh_word%></a></li>'
			},
		hs_key: 'searchHis',
		init: function() {

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
				if(window.location.hash === '#pg-1'){
					hashManager.setHash('');
				}else{
					action.pagerGo(1);
				}
			}
		},
		renderHistoryList:function(){
			var sh_lists = this.getHistoryList();
			if(sh_lists){
				this.elSearchCase.find('.sh-list').html(sh_lists);
				this.elShow(['j-sh-clear', 'j-search-case']);
				this.elHide(['j-no-data', 'j-details-list']);
			}else{
				this.elSearchCase.find('.sh-list').html('<p class="no-history">暂无搜索历史</p>');
				this.elShow(['j-search-case']);
				this.elHide(['j-no-data', 'j-details-list','j-sh-clear']);
			}
			
		},
		getHistoryList:function(){
			var his_arr = this.getHistoryCookie();
			var item_group = '';
			for(var i=0; i<his_arr.length; i++){
				if(his_arr[i] !== ''){
					item_group += this.tmpl(this.tpl.sh_item, {
						sh_word:his_arr[i],
					});
				}
			}
			if(item_group !== '')  item_group = '<ul>'+item_group+'</ul>';
			return item_group;
		},
		jsiOnFocus:function(){
			this.renderHistoryList();
		},
		jsiClear:function(){
			this.elSearchInput.find('.j-si-txt').val('');
		},
		selectHistory:function(e){
			var self = $(e.currentTarget);
			var sword = self.text();
			this.elSearchInput.find('.j-si-txt').val(sword);
			this.changeSearchWord(sword);
		},
		clearHistory:function(){
			$.fn.cookie(this.hs_key,'');
			this.renderHistoryList();
		},
		doSearch:function(e){
			e.preventDefault();
			this.elSearchCase.addClass('hide');
			var sword = this.elSearchInput.find('.j-si-txt').val();
			this.changeSearchWord(sword);
		},
		getHistoryCookie:function(){
			var hisStr = $.fn.cookie(this.hs_key) || '';
			var hisArr = hisStr.split('#');
			return hisArr;
		},
		insertHistoryCookie:function(sword){
			var rslStr = '';
			var hisStr = $.fn.cookie(this.hs_key) || '';
			var hisArr = hisStr.split('#');
			var idx = $.inArray(sword, hisArr);
			if(idx >= 0){
				hisArr.splice(idx,1);
			}
			hisArr.unshift(sword);
			rslStr = hisArr.join('#');
			$.fn.cookie(this.hs_key, rslStr);
			return 1;
		},
		changeSortTab:function(e){
			var tab = $(e.currentTarget);
			var sortId = tab.attr('data-stab');
			if(action){
				action.pageParams.sortType = sortId;
				delete action.pageParams.categoryId;
				delete action.pageParams.funcId;
				if(window.location.hash === '#pg-1'){
					hashManager.setHash('');
				}else{
					action.pagerGo(1);
				}
			}
		},
		elShow:function(elArr){
			if(!elArr.length) return false;
			for(var i = 0, len = elArr.length; i<len; i++){
				this.el.find('.'+elArr[i]).removeClass('hide');
			}
		},
		elHide:function(elArr){
			if(!elArr.length) return false;
			for(var i = 0, len = elArr.length; i<len; i++){
				this.el.find('.'+elArr[i]).addClass('hide');
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
		el: '.j-search-group'
	});

	searchAction = new SearchAction({
		el: '.j-search-group'
	});

	// Base.url.coverFrom();

})(window.Zepto);