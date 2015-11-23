/**
 * groupon/item.js
 */
(function($) {

	// 提示控件
	var tip = new Base.Widget.Tip();

	// 预览图片弹窗
	var viewPicDialog;

	// 当前页面hash
	var HASH;

	// 弹窗滚动
	var dialogSwiper;


	var productImgs, productImgsDialog, product, hashManager, cart;

	// 商品图片
	var ProductImgs = Base.klass.create({
		tpl: {
			item: '<div class="swiper-slide"><div class="item j-item"><img src="<%=src%>"></div></div>'
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

	// 商品图片弹窗
	var ProductImgsDialog = Base.klass.create({
		tpl: {
			item: '<div class="swiper-slide"><div class="item"><img src="<%=src%>"></div></div>'
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

	// 商品信息获取
	var Product = Base.klass.create({
		cgi: {
			product: '/api/groupbuy/groupbuy.jsp'
		},
		pageParams:{
			op:2,
			gbpid:0
		},
		innerParams:{
			pid:0,
			gbid:0
		},
		hasWXTips:false,
			tpl: {
			'attribute': '<tr><td class="title"><%=key%> ：</td><td><%=value%></td></tr>'
		},
		elements: {
			'.j-pdt-title': 'elPdtTitle',					
			'.j-pdt-subtitle': 'elPdtSubTitle',				
			'.j-pdt-des': 'elPdtDes',					
			'.j-pdt-rate': 'elPdtRate',
			'.j-pdt-seldout': 'elSeldout',
			'.j-pdt-remark': 'elRemark',
			'.j-pdt-rate-width': 'elPdtRateWidth',
			'.j-grouponrule': 'elGrouponRule',
			'.j-detail-option': 'elDetailOption',
			'.j-detail-section': 'elDetailSection',
			'.j-main-imgexplain': 'elImgExplain',
			'.j-main-attributes': 'elAttributes'
		},
		events: {
			'click .j-detail-option': 'changeDetailSetion',
			'click .j-grouponrule': 'gotoGrouponRule'
		},
		init: function() {
			var id, WXTips;

			this.pageParams.gbpid = Base.url.param('gbpid') || '';
			this.innerParams.gbid = Base.url.param('gbid') || '';

			WXTips = Base.url.param('wxtips') || '';
			this.hasWXTips = (WXTips && WXTips == 1);

			this.flush();
		},
		flush: function() {

			this.getData();

		},
		getData: function() {

			if (!this.pageParams.gbpid) return;

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.product, this.pageParams, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			// var list;

			if (result && result.errCode === 0 && result.obj && result.obj.groupProduct) {
				this.render(result.obj.groupProduct);
			} else {
				// 获取数据失败！
			}
		},
		render: function(product) {

			var imgexplain = [];
			var elCart = $('.j-cart-container');
			var shareBtn = $('header .j-share-btn');
			var price_f = '0', groupBuyPrice_f = '0';
			var sh_title = '', sh_pic = '', sh_des = '', sh_link = '';

			if (!product) return;

			this.innerParams.pid = product.pid || 0;

			// 设置商品图片
			productImgs.setData(product.detailpics);
			// 设置商品图片弹窗
			productImgsDialog.setData(product.detailpics);
			
			// 设置商品属性
			this.elPdtTitle.text(product.title);
			this.elPdtSubTitle.text(product.subTitle);
			this.elPdtDes.text(product.groupBuyDesc);
			this.elRemark.find('span').text(Number(product.joinLimitNum)-1);
			this.elPdtRate.text(product.saleRate);
			this.elPdtRateWidth.css({width:product.saleRate+'%'});

			// 设置文件标题
			document.title = '海拼团-' + product.title;

			if(product.price){
				price_f = this.coverPrice(product.price);
				elCart.find('span.s-price').text(price_f);
			}
			if(product.groupBuyPrice){
				groupBuyPrice_f = this.coverPrice(product.groupBuyPrice);
				elCart.find('.g-price').text(groupBuyPrice_f);
				elCart.find('.g-member').text(product.joinLimitNum);
			}

			// 商品详情图片
			$(product.imgexplain).each(function(m, n) {
				imgexplain.push('<img src="' + n + '" />');
			});

			if(imgexplain.length){
				this.elImgExplain.html(imgexplain.join(''));
			}
			// 商品参数属性
			this.renderAttributes(product.attribute);


			// 无库存时的视图
			if (product.isFinished) {
				this.elSeldout.show();
				cart.hideCheckout();
			}

			// 分享按钮设置
			sh_title = product.title + ' ' + product.subTitle;
			sh_pic = product.detailpics[0];
			sh_des = '美好生活供应商，海外优质商品直供，大家一起拼';

			shareBtn.attr('data-title', sh_title);
			shareBtn.attr('data-pic', sh_pic);
			shareBtn.attr('data-des', sh_des);
			shareBtn.attr('data-link', '');

			// 微信内分享设置
			if (Base.Browser.type === 'weixin') {
				var link = window.location.href;
				new Base.Widget.WXShare({
					config: {
						'title': sh_title,
						'imgUrl': sh_pic,
						'desc': sh_des,
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
		},
		// 切换商品属性
		changeDetailSetion: function(e){
			var option = $(e.currentTarget);
			var tabid = option.attr('data-tabid');
			this.elDetailOption.removeClass('active').filter('[data-tabid="'+tabid+'"]').addClass('active');
			this.elDetailSection.addClass('hide').filter('[data-caseid="'+tabid+'"]').removeClass('hide');
		},
		gotoGrouponRule:function(){
			var rule_top = this.el.find('.gooddetail').offset().top;
			window.scrollTo(0,rule_top);
			this.elDetailOption.filter('[data-tabid="3"]').trigger('click');
		}
	});

	// 购物车
	var Cart = Base.klass.create({
		elements: {
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
		},
		init: function() {

			this.loadlayer = new Base.Widget.Loadlayer({
				owner: this.el
			});

			this.loadlayer.tpl = '<div class="j-ui-loadlayer"><img src="../img/loading.gif"/></div>';

		},
		animate: function(num) {
			this.elCartNum
				.show()
				.text(+this.elCartNum.text() + num);
		},
		addToCart: function(e) {
			// 加入购物车 （普通购买）
			var $e = $(e.currentTarget),
				params;

			if ($e.hasClass('disabled')) return;

			this.loadlayer.show();

			params = {
				pid: product.innerParams.pid,
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
				// this.animate(1);
				window.location.href = '/cart.html';
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
			// 直接购买	（团购购买）
			var $e = $(e.currentTarget),
				params,
				num;

			if ($e.hasClass('disabled')) return;

			this.loadlayer.show();

			num = 1;

			params = {
				pinfos: product.innerParams.pid+ ',' + num + '###',
				gbpid: product.pageParams.gbpid
			};

			// 有gbid则为参团购买
			if(product.innerParams.gbid){
				params.gbid = product.innerParams.gbid;
			}

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
						location.href = '/login.html?sourceurl=' + encodeURIComponent(window.location.href);
						break;

						// 没有收货地址
					case 601:
						location.href = '/address.html?orderid=' + o.obj;
						break;

						// 成功
					case 0:
						location.href = '/checkout/?orderid=' + o.obj;
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
		hideCheckout:function(){
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

})(window.Zepto);