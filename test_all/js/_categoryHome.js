/**
 * index.js
 */
(function($) {

	var categoryHomeAction, hashManager;

	var CategoryHomeAction = Base.klass.create({
		elements: {
			'.j-slider-show':'sliderShow',
			'.j-slider-menu': 'sliderMenu',
			'.j-product-list': 'productList',
			'.j-bestchoice' : 'bestChoice'
		},
		tpl: {
			ss_item:'<div class="swiper-slide">\
						<div class="item j-item">\
							<a href="<%=actlink%>">\
								<img src="<%=acturl3%>">\
							</a>\
						</div>\
					</div>',
			sm_item:'<div class="swiper-slide">\
						<div class="item j-item">\
						    <a href="<%=catlink%>">\
						    <div class="img-wrap">\
						    	<img src="<%=logourl%>">\
						    </div>\
						    <p class="func-title"><%=funname%></p>\
						    </a>\
						</div>\
					</div>',
			pl_item:'<li>\
						<div class="item-wrap">\
							<a href="<%=pdtlink%>">\
					            <div class="thumbnail">\
					            	<img src="<%=logourl%>" onerror="this.onerror=null;this.src=&quot;img/app2/pic_nor.png&quot;;">\
					            </div>\
					            <dl class="details">\
					            	<dt class="title"><%=name%></dt>\
					                <dd class="price"><label>￥ <strong><%=price%></strong></label></dd>\
					                <dd class="source"><span><%=depotName%></span></dd>\
					            </dl>\
					        </a>\
					        <div class="discount <%=discount_hide%>"><%=discount%>折</div>\
						</div>\
					</li>'
		},
		cgi: {
			action: '/api/main/queryChannelHome.jsp'
		},
		pageParams:{
			pageSize:10,
			pageNo:1
		},
		init: function() {
			var self = this;
			this.firstLoad = true;
			this.swiper = null;

			this.isTotal = false;

			var catid = Base.url.param('catid') || '';
			var cattitle = Base.url.param('cattitle') || '';
			if(catid) this.pageParams.categoryId = catid;
			

			this.pageParams.pageNo = Base.url.getPageHash() || 1;
			
			// this.pager = new Base.Widget.Pager({
			// 	el: '.j-pager'
			// });
			// this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getCategoryHead(cattitle);
			this.flush();

			$(window).bind('resize', function(){
				for(var i=0; i<self.swiper.length; i++){
					self.swiper[i].reInit();
				}
			});
		},
		flush:function(){

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.getData();

			// this.pager.setCurrent(this.pageParams.pageNo);

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
				if (o) {
					this.renderView(o);
					this.loading.hide();
					if (!this.isTotal) {
						// this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				} else {
					this.renderView({});
					this.loading.html('服务器异常');
				}
			} else {
				this.loading.html('获取数据失败');
				// 获取数据失败！
			}
		},
		renderView: function(obj) {

			$sliderShow = this.sliderShow;
			$sliderMenu = this.sliderMenu;
			$productList = this.productList;
			$bestChoice = this.bestChoice;

			var sliderShowData = obj.activityList,
				sliderMenuData = obj.funcList,
				productListData = obj.productList;

			this.swiper = [];

			if(this.firstLoad){
				var sliderShowDom = this.sliderShowCreat(sliderShowData);
				var sliderMenuDom = this.sliderMenuCreat(sliderMenuData);
				if(sliderShowDom !== ''){
					$sliderShow.find('.j-list').html(sliderShowDom);
					this.swiper.push(new Swiper('.j-slider-show', {
						autoplay: 2000,
						autoplayDisableOnInteraction: false,
						loop: true,
						calculateHeight: true,
						pagination: '.dotted',
					}));
				}
				if(sliderMenuDom !== ''){
					$sliderMenu.find('.j-list').html(sliderMenuDom);
					this.swiper.push(new Swiper('.j-slider-menu', {
						scrollbarHide: true,
						slidesPerView: 'auto',
						centeredSlides: false,
						spaceBetween: 0,
						grabCursor: true,
					}));
				}
			}
			var productListDom = this.productListCreat(productListData);
			if(productListDom){
				$bestChoice.show();
				$productList.html(productListDom);
			}
			this.firstLoad = false;
		},
		show: function() {
			this.el.show();
			for(var i=0; i<this.swiper.length; i++){
				self.swiper[i].startAutoplay();
			}
		},
		hide: function() {
			this.el.hide();
			for(var i=0; i<this.swiper.length; i++){
				self.swiper[i].stopAutoplay();
			}
		},
		sliderShowCreat:function(data){
			var result = '';
			if(data && data.length > 0){
				var tempItem, ext = {actlink:''};
				for(var i=0, len = data.length; i<len; i++){
					tempItem = data[i];
					if(tempItem.acttype ===0){
						ext.actlink = 'list.html?chan=' + tempItem.actid;
					}else if(tempItem.acttype ===1){
						ext.actlink = tempItem.actlink;
					}else{
						ext.actlink = '#';
					}
					result += this.tmpl(this.tpl.ss_item, $.extend(tempItem, ext));
				}
			}
			return result;
		},
		sliderMenuCreat:function(data){
			var result = '';
			if(data && data.length > 0){
				var tempItem, ext = {catlink:''};
				for(var i=0, len = data.length; i<len; i++){
					tempItem = data[i];
					ext.catlink = 'list.html?func='+tempItem.funid;
					result += this.tmpl(this.tpl.sm_item, $.extend(tempItem, ext));
				}
			}
			return result;
		},
		productListCreat:function(data){
			var result = '', discount;
			if(data && data.length > 0){
				var tempItem, ext = {pdtlink:'',price:''};
				for(var i=0, len = data.length; i<len; i++){
					tempItem = data[i];
					discount = Math.round((tempItem.price / tempItem.referance_price)*100)/10;
					ext.pdtlink = Base.url.getItemUrl(tempItem.pid);
					ext.price = this.coverPrice(tempItem.price);
					ext.discount = discount;
					ext.discount_hide = discount > 9.9 ? 'hide' : '';
					result += this.tmpl(this.tpl.pl_item, $.extend(tempItem, ext));
				}
			}
			if(result) result ='<ul>'+result+'</ul>';
			return result;
		},
		getCategoryHead:function(cattitle){
			if(!cattitle) return;
			var title = cattitle;
			try{
				title = decodeURI(title);
			}catch(e){
			}
			var headDom = '<header><a href="javascript:window.history.go(-1);" class="goback"></a><h1><div id="j-act-title" class="title">'+title+'</div></h1></header>';
			this.el.before(headDom);
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
			categoryHomeAction.flush();
		}
	});

	hashManager = new HashManager();

	categoryHomeAction = new CategoryHomeAction({
		el: '.j-category-home'
	});

	bottomBar = new Base.Widget.BottomBar();
	bottomBar.setCurrentTap('dutyFree');
	bottomBar.getUserInfo();

})(window.Zepto);