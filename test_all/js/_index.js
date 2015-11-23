/**
 * index.js
 */
(function($) {



	var action, hashManager, sliderAction, actAction;

	var Action = Base.klass.create({
		tpl: '<div class="item j-action-item" data-id="<%=id%>">\
				<dl>\
					<dt><a href="<%=url%>"><img src="<%=pic%>"></a></dt>\
					<dd>\
						<p class="title"><%=title%></p>\
						<p class="source"><span class="origin"><%=origin%></span><span class="depotName"><%=depotName%></span></p>\
					</dd>\
				</dl>\
			</div>',
		cgi: {
			action: '/api/product/queryChannelProductList.jsp'
		},
		pageParams:{
			pageSize:10,
			chanid:25
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

			this.flush();
		},
		flush: function() {
			// this.pageParams.pageNo = pageNo || 1;

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.getData();

			this.pager.setCurrent(this.pageParams.pageNo);

			this.isTotal = false;

			var top = this.el.offset().top;

			window.scrollTo(0, top);

			// 清空倒计时
			Base.Widget.Countdown.clear();
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
				// 获取数据失败！
			}
		},
		renderList: function(list) {
			var item,
				remaintime;

			if (list && list.length) {
				this.el.html('');
				for (var i = 0, len = list.length; i < len; i++) {

					item = list[i];

					this.el.append(this.tmpl(this.tpl, {
						url:Base.url.getItemUrl(item.pid),
						id: item.pid,
						title: item.name,
						pic: item.blogourl,
						origin:item.origin,
						depotName:item.depotName
					}));

				}

				this.loading.hide();
			} else {
				this.loading.html();
			}
		}
	});


	var ActAction = Base.klass.create({
		tpl: '<a href="<%=actlink%>"><img src="<%=actImgUrl%>" alt="<%=title2%>"></a>',
		cgi: {
			action: '/api/product/getActList.jsp'
				// action: 'action.json'
		},
		pageParams:{
			pageSize:10,
			pageNo:1
		},
		init: function() {

			this.chanList = [21,22,23,24];

			// this.loading = new Base.Widget.Loading({
			// 	owner: this.el
			// });

			this.flush();
		},
		flush: function() {

			var chanList = this.chanList;
			for(var i = 0; i < chanList.length; i++){
				this.getData(chanList[i]);
			}
			
		},
		getData: function(chanid) {

			this.pageParams.chanid = chanid;
			this.pageParams._ = new Date - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack, this, chanid));

			// this.find('.act'+chanid).loading.show();
		},
		getDataBack: function(chanid, result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;

				if ((list = o.activityList)) {
					this.renderList(list,chanid);
				} else {
					this.renderList([],chanid);
				}
			} else {
				// 获取数据失败！
			}
		},
		renderList: function(list,chanid) {
			var actDom = '',
				resultDom = '',
				item;

			if (list && list.length) {

				var len = list.length > 2 ? 2 : list.length;
				var aw = len === 2 ? 1 : 2;
				
				for (var i = 0; i < len; i++) {
					item = list[i];
					item.actImgUrl = '';
					if(len === 1 && item.acturl){
						item.actImgUrl = item.acturl;
					}else if(len === 2 && item.acturl2){
						item.actImgUrl = item.acturl2;
					}
					
					actDom += '<div class="actimg-wrap aw2-'+aw+'">'+this.tmpl(this.tpl, item)+'</div>';
				}

				resultDom = actDom;

				this.el.find('.act'+chanid).html(resultDom);

				// this.find('.act'+chanid).loading.hide();
			} else {
				// this.find('.act'+chanid).loading.html();
			}
		}
	});



	var SliderAction = Base.klass.create({
		elements: {
			'.j-list': 'elList'
		},
		tpl: {
			item: '<div class="swiper-slide">\
						<div class="item j-item">\
							<a href="<%=actlink%>">\
								<img src="<%=acturl3%>">\
							</a>\
						</div>\
					</div>'
		},
		cgi: {
			action: '/api/product/getActList.jsp'
		},
		pageParams:{
			chanid:20,
			pageSize:5,
			pageNo:1
		},
		init: function() {
			var self = this;
			
			this.swiper = null;

			this.getData();

			$(window).bind('resize', function(){
				self.swiper.reInit();
			});
		},
		getData: function() {

			this.pageParams._ = new Date - 0;

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
			} else {
				this.hide();
			}
		},
		show: function() {
			this.el.show();
			this.swiper && this.swiper.startAutoplay();
		},
		hide: function() {
			this.el.hide();
			this.swiper && this.swiper.stopAutoplay();
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
		el: '.j-action-list'
	});

	actAction= new ActAction({
		el: '.j-act-case-group'
	});


	bottomBar = new Base.Widget.BottomBar();
	bottomBar.setCurrentTap('home');
	bottomBar.getUserInfo();

	//test
	// wx.ready(function() {
	// 	$('.j-test').click(function() {
	// 		wx.scanQRCode({
	// 			needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	// 			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	// 			success: function(res) {
	// 				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	// 			}
	// 		});
	// 	});
	// });


})(window.Zepto);