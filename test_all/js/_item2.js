/**
 * item.js
 */
(function($) {

	var tip;

	var viewPicDialog;

	var HASH;

	var productImgs, productImgsDialog, product, hashManager, cart, favorControl;

	var dialogSwiper;

	

	var Cart = Base.klass.create({
		elements: {
			'.j-cartinfo': 'elCartInfo',
			'.j-buttons': 'elButtons',
			'.j-cart-num': 'elCartNum',
			'.j-act-addtocart': 'elAddToCart',
			'.j-act-checkout': 'elCheckout'
		},
		events: {
			'click .j-act-addtocart': 'addToCart',
			'click .j-act-checkout': 'checkout'
		},
		cgi: {
			cart: '/api/cart/add.jsp',
			checkout: '/api/order/createPreOrder.jsp'
				// checkout: 'json/checkout.json'
		},
		init: function() {
			this.getTotal();

			this.loadlayer = new Base.Widget.Loadlayer({
				owner: this.el
			});
		},
		getTotal: function() {
			$.get('/api/cart/getTotalCount.jsp', null, this.proxy(this.getTotalBack));
		},
		getTotalBack: function(result) {
			if (result && +result.obj > 0) {
				this.animate(result.obj);
			}
		},
		animate: function(num) {
			this.elCartNum
				.show()
				.text(+this.elCartNum.text() + num);
			// .animate({
			// 	'width': 20,
			// 	'height': 20
			// }, 100, function() {
			// 	$(this).animate({
			// 		'width': 15,
			// 		'height': 15
			// 	}, 100)
			// });
		},
		addToCart: function(e) {
			var $e = $(e.currentTarget),
				params;

			if ($e.hasClass('disabled')) return;

			this.loadlayer.show();

			params = {
				pid: product.pageParams.pid,
				num: 1
			};

			$.ajax({
				type: 'POST',
				url: this.cgi.cart,
				data: params,
				success: this.proxy(this.addToCartBack),
				error: this.proxy(this.addToCartError)
			});
		},
		addToCartBack: function(result) {
			if (result && +result.errCode === 0) {
				this.animate(1);
			} else {
				tip.show(result.errMsg);
			}

			this.loadlayer.hide();
		},
		addToCartError: function() {
			tip.show('网络连接异常');
			this.loadlayer.hide();
		},
		checkout: function(e) {
			var $e = $(e.currentTarget),
				params,
				num;

			if ($e.hasClass('disabled')) return;

			this.loadlayer.show();

			num = 1;

			params = {
				pinfos: product.pageParams.pid + ',' + num // 直接购买1件
			};

			$.ajax({
				type: 'POST',
				url: this.cgi.checkout,
				data: params,
				success: this.proxy(this.checkoutBack),
				error: this.proxy(this.checkoutError)
			});
		},
		checkoutBack: function(result) {
			var o;

			if (result) {
				o = result;

				switch (o.errCode) {

					// 未登录
					case 101:
						location.href = 'login.html?sourceurl=' + encodeURIComponent(window.location.href);
						break;

						// 没有收货地址
					case 601:
						location.href = 'address.html?orderid=' + o.obj;
						break;

						// 成功
					case 0:
						location.href = 'checkout/?orderid=' + o.obj;
						break;

					default:
						tip.show(o.errMsg);
						break;
				}
			} else {
				tip.show('后台数据异常。');
			}

			this.loadlayer.hide();
		},
		checkoutError: function() {
			tip.show('网络连接异常');
			this.loadlayer.hide();
		},
		show: function(){
			this.el.show();
		},
		hideAddToCart: function(){
			// this.elCartInfo.hide();
			// this.elButtons.width('100%');
			// this.elAddToCart.hide();
			// this.elCheckout.width('100%');
			this.elAddToCart.addClass('hide');
			this.elCheckout.removeClass('hide');
		},
		disable: function() {
			this.elAddToCart.addClass('disabled');
			this.elCheckout.addClass('disabled');
		}
	});

	cart = new Cart({
		el: '.j-cart-container'
	});

	var ProductImgs = Base.klass.create({
		tpl: {
			item: '<div class="swiper-slide">\
						<div class="item j-item">\
							<img src="<%=src%>">\
						</div>\
					</div>'
		},
		elements: {
			'.j-list': 'elList'
		},
		events: {
			'click .j-item': 'showViewPic'
		},
		init: function() {
			HASH = window.location.hash;

			viewPicDialog = new Base.Widget.Dialog();

			$('.j-dialog-closer').click(function() {
				window.history.go(-1);
			});
		},
		showViewPic: function(e) {
			var $e = $(e.currentTarget),
				left = $e.offset().left,
				swiper = this.swiper;

			setTimeout(function() {
				var l = $e.offset().left;
				if (l === left) {

					hashManager.setHash('VIEWPIC');

					dialogSwiper.swipeTo(swiper.activeIndex);
				}
			}, 200);
		},
		setData: function(list) {
			var $list;

			if (list && list.length) {
				$list = this.elList;

				for (var i = 0, len = list.length; i < len; i++) {

					$list.append(this.tmpl(this.tpl.item, {
						src: list[i]
					}));

				}

				this.initEvents();
			}
		},
		initEvents: function() {
			this.swiper = new Swiper('.j-imgs', {
				pagination: '.dotted'
			});
		}
	});

	var ProductImgsDialog = Base.klass.create({
		tpl: {
			item: '<div class="swiper-slide">\
						<div class="item">\
							<img src="<%=src%>">\
						</div>\
					</div>'
		},
		elements: {
			'.j-list': 'elList'
		},
		setData: function(list) {
			var $list;

			if (list && list.length) {
				$list = this.elList;

				for (var i = 0, len = list.length; i < len; i++) {

					$list.append(this.tmpl(this.tpl.item, {
						src: list[i]
					}));

				}

				this.initEvents();
			}
		},
		initEvents: function() {
			dialogSwiper = new Swiper('.j-imgs-dialog', {
				pagination: '.dotted-dialog'
			});
		}
	});

	var Product = Base.klass.create({
		cgi: {
			product: '/api/product/getProduct.jsp'
				// product: 'json/product.json'
		},
		pageParams:{
			pid:null
		},
		hasWXTips:false,
		tpl: {
			'attribute': '<tr>\
							 <td class="title"><%=key%> ：</td>\
							 <td><%=value%></td>\
						 </tr>'
		},
		elements: {
			'.j-main-name': 'elName',
			'.j-main-price': 'elPrice',
			'.j-main-desc': 'elDesc',
			'.j-main-editor': 'elEditor',
			'.j-main-deliver': 'elDeliver',
			'.j-main-attributes': 'elAttributes',
			'.j-main-seldout': 'elSeldout',
			'.j-main-imgexplain': 'elImgExplain',
			'.j-origin': 'elOrigin',
			'.j-acttime': 'elActtime',
			'.j-refprice': 'elRefprice',
			'.j-discount': 'elDiscount',
			'.j-product-status':'elProductStatus',
			'.j-weixin-info':'elWeixinInfo'
		},
		init: function() {
			var WXTips;

			this.pageParams.t_id = Base.url.param('t_id') || '';
			this.pageParams.g_chan = Base.url.param('g_chan') || '';

			WXTips = Base.url.param('wxtips') || '';
			this.hasWXTips = (WXTips && WXTips == 1);

			this.pageParams.pid = Base.url.findUrlPid();
			this.render();

		},
		render: function(product) {
			var curtime = new Date() - 0;

			productImgs.initEvents();
			productImgsDialog.initEvents();

			var remaintime = this.elActtime.attr('data-endTime') || 0;
			remaintime = Number(remaintime);
			
			if (remaintime && remaintime > 0 && remaintime/3600000 < 24 ) {
				Base.Widget.Countdown.push({
					time: remaintime,
					$item: this.elActtime.removeClass('hide').find('i')
				});
			}

			


			if (Base.Browser.type === 'weixin') {
				var w_name = this.elWeixinInfo.attr('data-name');
				var w_img = this.elWeixinInfo.attr('data-img');
				var w_desc = this.elWeixinInfo.attr('data-desc');

				var link = window.location.href;
				var pid = this.pageParams.t_id.replace('P_', '');
				
				if(this.pageParams.t_id && this.pageParams.g_chan){
					link = 'http://fl.morning-star.cn'+'/item.jsp?t_id=P_'+pid+'&g_chan='+this.pageParams.g_chan+'#id-'+pid;
				}
				new Base.Widget.WXShare({
					config: {
						'title': 'Allpyra金字塔-' + w_name,
						'imgUrl': w_img,
						'desc': w_desc,
						'link': link
					}
				});
				// 微信分享提示
				if(this.hasWXTips){
					$('.wxtips-mark').on('click', function(){
						$(this).hide();
					}).show();
				}
			}
			
			cart.show();
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
			var hash = window.location.hash.replace('#', '');
			this.trigger('change', hash);
		}
	});

	tip = new Base.Widget.Tip();

	productImgs = new ProductImgs({
		el: '.j-imgs'
	});

	productImgsDialog = new ProductImgsDialog({
		el: '.j-imgs-dialog'
	});

	product = new Product();

	favorControl = new Base.Widget.FavorControl({
		el: '.j-cart-container'
	});

	favorControl.getFavorState();

	hashManager = new HashManager();

	function hashChange(hash) {
		var id;

		if (hash === 'VIEWPIC') {
			viewPicDialog.html('.j-dialog-viewpic', {
				title: '图片预览'
			});
		} else {
			viewPicDialog.hide();
		}
	}

	hashManager.bind('change', hashChange);

	Base.url.coverFrom();

})(window.Zepto);