/**
 * index.js
 */
(function($) {

	var action, hashManager, sliderAction, queryMain;

	var QueryMain = Base.klass.create({
		tpl: {
			categoryListItem:'<li class="cat-item" style="<%=widthStyle%>">\
							    <a href="categoryHome.html?pageSize=10&catid=<%=categoryId%>&cattitle=<%=title%>" data-catId="<%=categoryId%>">\
							        <dl>\
							            <dd class="cat-icon">\
							            	<img src="<%=logo%>" alt="<%=title%>">\
							            </dd>\
							            <dt class="cat-title">\
							                <%=title%>\
							            </dt>\
							        </dl>\
							    </a>\
							</li>',
			activeGroup:'<div class="activeGroup clearfix">\
						    <div class="limitProduct">\
						    	<a href="<%=lp_link%>">\
						        <div class="detail">\
						            <h3>海拼团</h3>\
						            <p class="limitTime"></p>\
						            <p class="description">\
						                <%=lp_title%>\
						            </p>\
						        </div>\
						        <div class="price">\
						            <p>￥<em><%=lp_actPrice%></em></p>\
						        </div>\
						        <img src="<%=lp_plogo%>" alt="<%=lp_title%>">\
						        </a>\
						    </div>\
						    <div class="subActiveGroup">\
						        <div class="hotActivity"><a href="<%=ha_link%>"><img src="<%=ha_actUrl%>" alt="<%=ha_title%>"></a></div>\
						        <div class="starProductList clearfix">\
						            <ul>\
						                <li class="first"><a href="<%=spl_link%>"><img src="<%=spl_plogo%>" alt="<%=spl_title%>"></a></li>\
						                <li class="last"><a href="<%=spr_link%>"><img src="<%=spr_plogo%>" alt="<%=spr_title%>"></a></li>\
						            </ul>\
						        </div>\
						    </div>\
						</div>'
		},
		cgi: {
			action: '/api/main/queryMain.jsp'
		},
		pageParams:{
		},
		init:function(){

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});
			this.getData();
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
				o = result.obj || {};
				if(o.categoryList || (o.limitProduct && o.hotActivity && o.starProductList)){
					this.renderView(o);
				}
			} else {
				// 获取数据失败！
			}
		},
		renderView: function(obj) {
			this.el.html('');
			var categoryList = obj.categoryList;
			var limitProduct = obj.limitProduct;
			var hotActivity = obj.hotActivity;
			var starProductList = obj.starProductList;
			var fullDom = '', lpEndTime = 0;
			var widthStyle = 'width:' + (100/categoryList.length) + '%';
			var listI;
			if(categoryList.length > 0){
				var clGroup = '', categoryListDom = '';
				for (var i = 0, len = categoryList.length; i < len; i++) {
					listI = $.extend({widthStyle:widthStyle}, categoryList[i]);
					clGroup += this.tmpl(this.tpl.categoryListItem, listI);
				}
				fullDom += '<div class="categoryList clearfix"><ul>'+clGroup+'</ul></div>';
				
			}
			if(starProductList.length>1){
				var ag = {};
				var actlink = '';

				if(hotActivity.actType ===0 ){
					actlink = 'list.html?chan=' + hotActivity.actId;
				}else if (hotActivity.actType === 1) {
					actlink = hotActivity.actlink;
				}

				var l_price = limitProduct.act_price > 0 ? limitProduct.act_price : limitProduct.price;
				ag.lp_actPrice = (l_price/100).toFixed(0);
				ag.lp_title = limitProduct.title;
				ag.lp_plogo = limitProduct.plogo;
				ag.lp_link = Base.url.getItemUrl(limitProduct.pid);
				ag.ha_actUrl = hotActivity.actUrl;
				ag.ha_title = hotActivity.title;
				ag.ha_actLink = actlink;
				ag.ha_link = actlink;
				ag.spl_plogo = starProductList[0].plogo;
				ag.spl_pid = starProductList[0].pid;
				ag.spl_title = starProductList[0].title;
				ag.spl_link = Base.url.getItemUrl(starProductList[0].pid);
				ag.spr_plogo = starProductList[1].plogo;
				ag.spr_pid = starProductList[1].pid;
				ag.spr_title = starProductList[1].title;
				ag.spr_link = Base.url.getItemUrl(starProductList[1].pid);
				lpEndTime = limitProduct.endTime - new Date();
				fullDom += this.tmpl(this.tpl.activeGroup, ag);
			}
			if(fullDom){
				this.el.append(fullDom);
				if(lpEndTime / 3600000 < 24 && lpEndTime > 0){
					Base.Widget.Countdown.push({
						time: lpEndTime,
						$item: this.el.find('.limitTime'),
						makeUp: true
					});
				}
				this.loading.hide();
			}
		}

	});


	var Action = Base.klass.create({
		tpl: '<div class="item j-action-item" data-id="<%=id%>">\
				<dl>\
					<dt><a href="<%=actlink%>"><img src="<%=pic%>"></a></dt>\
					<dd>\
						<p><%=title%></p>\
						<p class="remaintime j-remaintime hide"><span class="icon-remain"></span><code></code></p>\
					</dd>\
				</dl>\
			</div>',
		cgi: {
			action: '/api/product/getActList.jsp'
				// action: 'action.json'
		},
		pageParams:{
			pageSize:10,
			chanid:1
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
			
			this.pageParams._ = new Date - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;

				if ((list = o.activityList)) {
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

					remaintime = list[i].remaintime;

					this.el.append(this.tmpl(this.tpl, {
						id: item.actid,
						title: item.title2,
						pic: item.acturl,
						actlink: function(t) {
							if (t === 0) {
								return 'list.html?chan=' + item.actid;
							} else if (t === 1) {
								return item.actlink;
							}
						}(item.acttype),
					}));

					// 24小时内结束的活动 3600000
					// debug_flag
					// remaintime = remaintime/100000;
					// debug_flag_end

					if (remaintime / 3600000 < 24 && remaintime > 0) {
						Base.Widget.Countdown.push({
							time: remaintime,
							$item: this.el.find('.j-action-item[data-id="' + item.actid + '"]').find('.j-remaintime').removeClass('hide').find('code')
						});
					}
				}

				this.loading.hide();
			} else {
				this.loading.html();
			}
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
			chanid: 5,
			pageNo: 1,
			pageSize: 5
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
			if(this.swiper){
				this.swiper.startAutoplay();
			}
		},
		hide: function() {
			this.el.hide();
			if(this.swiper){
				this.swiper.stopAutoplay();
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

	sliderAction = new SliderAction({
		el: '.j-slider-container'
	});
	action = new Action({
		el: '.j-action-list'
	});
	queryMain = new QueryMain({
		el: '.j-queryMain'
	});


	bottomBar = new Base.Widget.BottomBar();
	bottomBar.setCurrentTap('dutyFree');
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