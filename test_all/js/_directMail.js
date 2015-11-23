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
				// action: 'action.json'
		},
		pageParams: {
			pageSize: 10,
			chanid: 50
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
						url: Base.url.getItemUrl(item.pid),
						id: item.pid,
						title: item.name,
						pic: item.blogourl,
						origin: item.origin,
						depotName: item.depotName
					}));

				}

				this.loading.hide();
			} else {
				this.loading.html();
			}
		}
	});


	var ActAction = Base.klass.create({
		elements: {
			'.j-channel-list': 'elChannelList',
			'.j-sub-chan': 'elSubChan',
			'.j-sc-item': 'elScitem'
		},
		events: {
			'click .j-mc-item': 'getChanList',
			'click .j-sc-item': 'getChanList'
		},
		tpl: '<a href="<%=actlink%>"><img src="<%=acturl%>" alt="<%=title2%>"></a>',
		cgi: {
			action: '/api/product/getActList.jsp'
				// action: 'action.json'
		},
		pageParams: {
			pageSize: 10,
			pageNo: 1
		},
		init: function() {

			// this.chanList = [21,22,23,24,25];

			this.chanDecade = 50;
			this.chanLen = 1;
			this.dataCache = {};

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.flush();
		},
		flush: function(chanDecade) {
			var decade = chanDecade || this.chanDecade;
			decade = Number(decade);
			this.renderState(decade);
			for (var i = 1; i <= this.chanLen; i++) {
				this.getData({
					decade: decade,
					count: i,
					chan: decade + i
				});
			}
		},
		getData: function(cobj) {

			this.pageParams.chanid = cobj.chan;
			this.pageParams._ = new Date - 0;

			if (this.dataCache['chan' + cobj.chan]) {
				this.renderList(this.dataCache['chan' + cobj.chan], cobj);
			} else {
				$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack, this, cobj));
			}
			// this.find('.act'+chanid).loading.show();
		},
		getDataBack: function(cobj, result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;

				if ((list = o.activityList)) {
					this.dataCache['chan' + cobj.chan] = list;
					this.renderList(list, cobj);
				} else {
					this.renderList([], cobj);
				}
			} else {
				// 获取数据失败！
			}
		},
		renderList: function(list, cobj) {
			var actDom = '',
				resultDom = '',
				item,
				$active;

			var chanid = Number(this.pageParams.chanid);
			var actlink = '';

			if (list && list.length) {

				var len = list.length > 2 ? 2 : list.length;
				var aw = len === 2 ? 1 : 2;

				$active = this.elScitem.filter('.active'); // 哪个州馆高亮

				for (var i = 0; i < len; i++) {

					item = list[i];
					if(Math.floor(chanid/10) !== 4){
						item.actlink = 'directMailItem.html?chanid=' + (+$active.attr('data-chan') + 1);
					}
					actDom += '<div class="actimg-wrap aw2-' + aw + '">' + this.tmpl(this.tpl, item) + '</div>';
				}

				resultDom = actDom;

				this.el.find('.dm' + cobj.count).html(resultDom);

				this.loading.hide();
			} else {
				this.loading.html();
			}
		},
		renderState: function(chanDecade) {
			this.elChannelList.find('li').removeClass('active');
			if (chanDecade !== 40) {
				this.elChannelList.find('li.j-sc-group').attr('data-chan', chanDecade);
				this.elSubChan.removeClass('hide');
			} else {
				this.elSubChan.addClass('hide');
			}
			this.elChannelList.find('li[data-chan="' + chanDecade + '"]').addClass('active');
		},
		getChanList: function(e) {
			var self = $(e.currentTarget);
			if (!self.hasClass('active')) {
				var chanDecade = Number(self.attr('data-chan'));
				this.flush(chanDecade);
			}
			if (self.attr('data-pdtchan')) {
				var pdtchan = self.attr('data-pdtchan');
				if (action) {
					action.pageParams.chanid = pdtchan;
					if ('' == Base.url.hash()) {
						$(window).trigger('hashchange');
					} else {
						hashManager.setHash('');
					}
				}
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
		pageParams: {
			chanid: 30,
			pageSize: 5,
			pageNo: 1
		},
		init: function() {
			var self = this;

			this.swiper = null;

			this.getData();

			$(window).bind('resize', function() {
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

	actAction = new ActAction({
		el: '.j-act-case-group'
	});


	bottomBar = new Base.Widget.BottomBar();
	bottomBar.setCurrentTap('directMail');
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