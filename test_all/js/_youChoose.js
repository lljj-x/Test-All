/**
 * list.js
 */
(function($) {

	var tip, action;

	tip = new Base.Widget.Tip();

	var Action = Base.klass.create({
		elements: {
			'.j-action-centent': 'elActionCentent',
			'.j-product-list':'elProductList',
			'.j-btn-like':'elBtnLike'
		},
		events: {
			'click .j-btn-change': 'changeProduct',
			'click .j-btn-like': 'addFavor',
			'click .j-btn-addtocart': 'addCart'
		},
		tpl: {
			item:'<li><a href="<%=plink%>" target="_blank"><div class="pdt-wrap"><img src="<%=logourl%>" alt="<%=name%>"><p class="title"><%=name%></p><p class="source"><%=depotName%></p><p class="price">￥<%=fprice%></p></div></a></li>'
		},
		cgi: {
			producList:'/api/product/queryChannelProductList.jsp',
			addFavorAction:'/api/user/favorite.jsp',
			addCartAction: '/api/cart/add.jsp'
		},
		pageParams:{
			pageSize:100,
			chanid:90,
			pageNo:1
		},
		dataCache:[],
		dataCacheLen:0,
		dataCachePoint:0,
		ajaxLock:false,
		animateLock:false,
		init: function() {

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getData();

		},
		getData: function() {

			this.pageParams._ = new Date - 0;
			$.get(this.cgi.producList, this.pageParams, this.proxy(this.getDataBack));
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;			
				if (o.list.length > 0) {
					this.renderList(o.list);
				}
			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			this.dataCache = this.randomList(list);
			this.dataCacheLen = this.dataCache.length;

			var rsl_dom = '', item = {};
			var len = this.dataCacheLen > 2 ? 2 : this.dataCacheLen;
			
			for (var i = 0; i < len; i++) {
				item = this.dataCache[i];
				item.fprice = this.coverPrice(item.price);
				item.plink = Base.url.getItemUrl(item.pid);
				rsl_dom = this.tmpl(this.tpl.item, item) + rsl_dom;
			}

			this.elProductList.html(rsl_dom);
			this.loading.hide();
		},
		doFavor:function(pid){
			var params = {
				op:1,
				pid:pid,
				_ : new Date - 0
			};
			this.ajaxLock =  true;
			$.get(this.cgi.addFavorAction, params, this.proxy(this.doFavorBack));
		},
		doFavorBack:function(result){
			if(result.obj){
				if(result.obj.favorite){
					tip.show('收藏成功', {'timeout': 1000});
					this.renderTurnPage('500');
				}else{
					tip.show(result.errMsg, {'timeout': 1000});
					this.renderTurnPage('500');
				}
			}else{
				tip.show(result.errMsg, {'timeout': 1000});
			}
			this.ajaxLock =  false;
		},
		doCart:function(pid){
			var params = {
				num:1,
				pid:pid,
				_ : new Date - 0
			};
			this.ajaxLock =  true;
			$.get(this.cgi.addCartAction, params, this.proxy(this.doCartBack));
		},
		doCartBack:function(result){
			if(!isNaN(result.obj) && result.obj > 0){
				tip.show('已添加到购物车', {'timeout': 1000});
				this.renderTurnPage('500');
			}else{
				tip.show(result.errMsg, {'timeout': 1000});
			}
			this.ajaxLock =  false;
		},
		randomSort:function(a, b){
			return Math.random() >0.5 ? -1 : 1;
		},
		randomList:function(arr){
			return arr.sort(this.randomSort);
		},
		changeProduct:function(){
			if(!this.animateLock){
				if(this.dataCachePoint < this.dataCacheLen){
					this.renderTurnPage('-300');
				}else{
					this.renderNoPage();
				}
			}
		},
		addCart:function(){
			if(!this.animateLock && !this.ajaxLock){
				if(this.dataCachePoint < this.dataCacheLen){
					this.doCart(this.dataCache[this.dataCachePoint].pid);
				}else{
					this.renderNoPage();
				}
			}
		},
		addFavor:function(){
			if(!this.animateLock && !this.ajaxLock){
				if(this.dataCachePoint < this.dataCacheLen){
					this.doFavor(this.dataCache[this.dataCachePoint].pid);
				}else{
					this.renderNoPage();
				}
			}
		},
		renderTurnPage:function(dir){
			var rsl_dom = '', item;
			var self = this;
			
			self.dataCachePoint += 1;
			if(self.dataCachePoint < self.dataCacheLen+1){
				self.animateLock = true;
				self.elProductList.find('li').last().animate({'left':dir+'px','opacity':0},'ease-in',function(){
					var nextIdx = self.dataCachePoint + 1;
					if(nextIdx < self.dataCacheLen){
						item = self.dataCache[nextIdx];
						item.fprice = self.coverPrice(item.price);
						item.plink = Base.url.getItemUrl(item.pid);
						rsl_dom = self.tmpl(self.tpl.item, self.dataCache[nextIdx]);
					}else{
						rsl_dom = '<li class="page-end"><div class="pe-wrap"><p>亲，已挑选完了<br>请休息一下再来</p></div></li>';
					}
					self.elProductList.prepend(rsl_dom);
					self.animateLock = false;
					this.remove();
				});
			}
		},
		renderNoPage:function(){
			tip.show('已挑选完了');
		}
	});

	action = new Action({
		el: '.j-action-centent'
	});


})(window.Zepto);