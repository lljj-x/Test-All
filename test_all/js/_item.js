/**
 * item.js
 */
(function($) {

	var tip;

	var viewPicDialog;

	var HASH;

	var productImgs, productImgsDialog, product, hashManager, cart, favorControl;

	var dialogSwiper;

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
			t_id:'',
			g_chan:'',
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
			'.j-delivertime': 'elDelivertime'
		},
		init: function() {
			var id, WXTips;

			this.pageParams.t_id = Base.url.param('t_id') || '';
			this.pageParams.g_chan = Base.url.param('g_chan') || '';

			WXTips = Base.url.param('wxtips') || '';
			this.hasWXTips = (WXTips && WXTips == 1);

			id = window.location.hash.replace(/#id-/, '');
			id = id.replace(/\?.*/, '');

			this.flush(id);
		},
		flush: function(id) {

			this.pageParams.pid = id;
			this.getData();
		},
		getData: function(url) {
			if (!this.pageParams.pid) return;

			this.pageParams._ = new Date - 0;

			$.get(url || this.cgi.product, this.pageParams, this.proxy(this.getDataBack));
			// $.get(url || this.cgi.product, params, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var list;

			if (result && result.errCode === 0) {
				this.render(result.obj);
			} else {
				// 获取数据失败！
			}
		},
		render: function(product) {
			var imgexplain = [], referance_price = '';
			var curtime = new Date() - 0;
			var discount = Math.round(product.price/product.referance_price*100)/10;

			if (!product) return;

			productImgs.setData(product.detailpics);

			productImgsDialog.setData(product.detailpics);

			this.renderAttributes(product.attribute);

			this.elName.text(product.name);
			document.title = 'Allpyra金字塔-' + product.name;

			this.elPrice.text(this.coverPrice(product.price));
			product.descword && this.elEditor.html(product.descword.replace(/\n/g, '<br />') + '<br /><span style="color:#663300;line-height:48px;">注：本商品仅适于自用，购买后不得进行转售。</span>');

			$(product.imgexplain).each(function(m, n) {
				imgexplain.push('<img src="' + n + '" />')
			});

			imgexplain.length && this.elImgExplain.html(imgexplain.join(''));

			this.elDeliver.text(product.depotName);

			this.elOrigin.text(product.origin);
			if (product.act_endtime && product.act_endtime > 0 && (product.act_endtime-curtime) / 3600000 < 24 ) {
				Base.Widget.Countdown.push({
					time: product.act_endtime-curtime,
					$item: this.elActtime.removeClass('hide').find('i')
				});
			}
			referance_price = product.price < product.referance_price ? '￥<i>'+this.coverPrice(product.referance_price)+'</i>' : '';
			this.elRefprice.html(referance_price);
			if(discount<10){
				this.elDiscount.removeClass('hide').text(discount+'折');
			}

			if(product.arriveDays && product.arriveDays > 0){
				this.elDelivertime.text('预计'+product.arriveDays+'工作日送达');
			}

			// 无库存
			if (product.maxbuy < 1 || product.status === 0) {
				this.elSeldout.show();
				cart.disable();
			}
			
			if (Base.Browser.type === 'weixin') {
				var link = window.location.href;
				var pid = this.pageParams.t_id.replace('P_', '');
				if(this.pageParams.t_id && this.pageParams.g_chan){
					link = 'http://fl.morning-star.cn'+'/item.jsp?t_id=P_'+pid+'&g_chan='+this.pageParams.g_chan+'#id-'+pid;
				}
				new Base.Widget.WXShare({
					config: {
						'title': 'Allpyra金字塔-' + product.name,
						'imgUrl': product.detailpics[0],
						'desc': product.descword.replace(/\n/g, ''),
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

			// 如果是套装商品隐藏加入购物车按钮
			if(product.ptype === 2){
				cart.hideAddToCart();
			}

			cart.show();
		},
		renderAttributes: function(attribute) {
			var tmpl = this.tmpl,
				tpl = this.tpl,
				$attributes = this.elAttributes;

			if (!attribute) {
				$attributes.html('暂无属性');
			} else {
				$attributes.html('');

				$(attribute.split('\n')).each(function(m, n) {
					var item = n.split('###');

					if (item && item[0] && item[1]) {
						$attributes.append(tmpl(tpl.attribute, {
							key: item[0],
							value: item[1]
						}));
					}
				});
			}
		}
	});

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
			// this.el.addClass('hide');
			this.elAddToCart.addClass('disabled');
			this.elCheckout.addClass('disabled');
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

	cart = new Cart({
		el: '.j-cart-container'
	});

	favorControl = new Base.Widget.FavorControl({
		el: '.j-cart-container'
	});

	favorControl.setItemPageFavor().getFavorState();

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