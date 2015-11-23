/**
 * discovery.js
 */
(function($) {

	var g_def_cid = 1;
	var g_def_fid = 2147483647;

	var action, category, hashManager;

	var Action = Base.klass.create({
		elements: {
			'.j-loading-wrap': 'elLoadingWrap',
			'.j-details-list': 'elDetailsList',
			'.j-action-list':'elActionList',
			'.j-no-data': 'elNoData'
		},
		tpl: {
			pdt:'<li><div class="item-wrap"><a href="/item<%=pid%>.html"><div class="thumbnail"><img src="<%=logourl%>"></div><div class="details"><p class="title"><%=name%></p><p class="income"><i>单笔收入</i>&nbsp;&nbsp;<span>￥<%=unit_commission_fm%></span></p><p class="txt-group"><span class="price">价格：￥<%=price_fm%></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="share">分享次数：<%=quote_count%></span></p></div></a><a data-img="<%=logourl%>" data-title="<%=name%>" data-pid="<%=pid%>" class="share-btn j-share-btn" href="javascript:void(0);">分享</a></div></li>'
		},
		events: {
			'click .j-sort-tab': 'switchTab',
			'click .j-share-btn': 'openShareBar'
		},
		cgi: {
			action:'/api/product/queryProductList.jsp'
		},
		pageParams:{
			op:5,
			pageSize:10,
			categoryId:g_def_cid,
			funcId:g_def_fid
		},
		init: function() {
			this.isTotal = false;

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

			this.elNoData.hide();
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
					this.elDetailsList.hide();
					this.elNoData.html('<p>没有找到匹配的商品</p>').show();
				}

			} else {
				this.elDetailsList.hide();
				this.elNoData.html('<p>获取数据失败。【' + result.errMsg + '】</p>').show();
			}
			this.loading.hide();
		},
		renderList: function(list) {
			var item = '', result_dom = '', item_vals;
			this.elActionList.html('');
			for (var i = 0, len = list.length; i < len; i++) {
				item_vals = list[i];
				item_vals.price_fm = this.coverPrice(item_vals.price);
				item_vals.unit_commission_fm = this.coverPrice(item_vals.unit_commission);
				item = this.tmpl(this.tpl.pdt, item_vals);
				result_dom += item;
			}
			this.elActionList.html('<ul>'+result_dom+'</ul>');
			this.elDetailsList.show();
		}
	});


	var Category = Base.klass.create({
		elements: {
			'j-select-bar': 'elSelectBar',
			'.j-category': 'elCategory',
			'.j-func': 'elFunc',
			'.j-category-mark': 'elCategoryMark'
		},
		events: {
			'click .j-sel-category': 'selCategory',
			'click .j-sel-func': 'selFunc',
			'click .j-sort-tab': 'switchTab',
			'click .j-share-btn': 'openShareBar',
			'click .j-show-plane': 'showPlane'
		},
		cgi: {
			action:'/api/main/queryCategory.jsp'
		},
		pageParams:{},
		curCategory:{cid:g_def_cid, fid:g_def_fid},
		dataCache:{},
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

				if(o.length > 0){
					this.dataCache = o;
					this.renderCategory();
				}else{
					this.elSelectBar.hide();
				}

			} else {
				this.elSelectBar.hide();
			}
		},
		renderCategory:function(){
			var categoryGrp = this.dataCache;
			var funcGrp = [];
			var categoryD = '', funcD = '';
			var c_cid = this.curCategory.cid;
			var c_fid = this.curCategory.fid;

			if(categoryGrp.length > 0){
				var clen = categoryGrp.length;
				clen = clen + ( 4- (clen-1) % 4);
				for(var i=0; i<clen; i++){
					if(categoryGrp[i]){
						if(categoryGrp[i].cid == c_cid){
							this.elCategory.find('h1').text(categoryGrp[i].cname);
							funcGrp = categoryGrp[i].flist;
						}else{
							categoryD += ('<li><a href="javascript:void(0);" class="j-sel-category" data-categoryid="'+categoryGrp[i].cid+'">'+categoryGrp[i].cname+'</a></li>');
						}
					}else{
						categoryD += ('<li>&nbsp;</li>');
					}
					this.elCategoryMark.html('<ul>'+categoryD+'</ul>');
				}
			}
			if(funcGrp.length > 0){
				for(var j=0, flen=funcGrp.length; j<flen; j++){
					if(funcGrp[j].funid == c_fid){
						funcD += ('<td class="active">'+funcGrp[j].funname+'</td>');
					}else{
						funcD += ('<td><a href="javascript:void(0);" class="j-sel-func" data-funcid="'+funcGrp[j].funid+'">'+funcGrp[j].funname+'</a></td>');
					}
					
				}
				this.elFunc.html('<table><tbody><tr>'+funcD+'</tr></tbody></table>');
			}
		},
		selCategory:function(e){
			var cid = $(e.currentTarget).attr('data-categoryid');
			this.curCategory.cid = cid;
			this.curCategory.fid = g_def_fid;
			this.renderAction({cid:cid});
			this.renderCategory();
			this.elCategoryMark.addClass('hide');
		},
		selFunc:function(e){
			var fid = $(e.currentTarget).attr('data-funcid');
			this.curCategory.fid = fid;
			this.renderAction({fid:fid});
			this.renderCategory();
		},
		renderAction:function(option){
			if(option && action){
				if(option.cid){
					action.pageParams.categoryId = option.cid;
				}
				if(option.fid){
					action.pageParams.funcId = option.fid;
				}else{
					action.pageParams.funcId = g_def_fid;
				}
				if(window.location.hash === '#pg-1'){
					hashManager.setHash('');
				}else{
					action.pagerGo(1);
				}
			}
		},
		showPlane:function(){
			this.elCategoryMark.toggleClass('hide');
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
		el: '.j-action-group'
	});
	
	category = new Category({
		el: '.j-action-group'
	});


})(window.Zepto);