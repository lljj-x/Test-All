/**
 * cart.js
 */
(function($) {

	var tip;

	var Cart = Base.klass.create({
		tpl: {
			item: '<div class="item j-item">\
						<div class="checker">\
							<span class="check <%=isChecked%> j-check-btn"></span>\
						</div>\
						<div class="detail j-product" data-pid="<%=pid%>" data-originprice="<%=originprice%>" data-max="<%=maxbuy%>">\
							<dl>\
								<dt>\
									<a href="<%=url%>"><img src="<%=logourl%>"></a>\
								</dt>\
								<dd>\
									<a href="<%=url%>"><strong class="title"><%=name%></strong></a>\
									<span class="price">￥<%=price%></span>\
								</dd>\
							</dl>\
							<div class="oper">\
								<div class="amount">\
									<a href="#" class="minus j-changenum<%=disabledMinus%>" data-type="minus">-</a>\
									<span class="j-currentnum"><%=num%></span>\
									<a href="#" class="plus j-changenum<%=disabledPlus%>" data-type="plus">+</a>\
								</div>\
							</div>\
						</div>\
						<a href="#" class="remove j-act-remove" data-pid="<%=pid%>">删除</a>\
					</div>',
		},
		elements: {
			'.j-empty': 'elEmpty',
			'.j-default': 'elDefault',
			'.j-list': 'elList',
			'.j-text-totalfee': 'elTotalfee',
			'.j-checkout-container': 'elCheckoutContainer',
			'.j-check-btn': 'elCheckBtn',
			'.j-allcheck-btn': 'elAllCheckBtn',
			'.j-act-payment': 'elActPayment'
		},
		events: {
			'click .j-changenum': 'clickChangeNum',
			'click .j-act-remove': 'clickRemove',
			'click .j-act-payment': 'clickPayment',
			'click .j-check-btn': 'selectProducts',
			'click .j-allcheck-btn': 'selectAllProducts'
		},
		cgi: {
			cart: '/api/cart/showCartPage.jsp',
			// cart: 'json/cart.json',
			setnum: '/api/cart/set.jsp',
			// setnum: 'json/cartadd.json',
			checkout: '/api/order/createPreOrder.jsp'
				// checkout: 'checkout.json'
		},
		onCheckList:[],
		initAllCheck:true,
		init: function() {
			this.loadlayer = new Base.Widget.Loadlayer({
				owner: 'body'
			});

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getData();
		},
		clickChangeNum: function(e) {
			var $e = $(e.currentTarget),
				$product = $e.closest('.j-product'),
				$currentNum = $product.find('.j-currentnum'),
				type = $e.attr('data-type'),
				pid = +$product.attr('data-pid'),
				currentNum = +$currentNum.text();

			if ($e.hasClass('disabled')) return false;

			if (type === 'plus') {
				currentNum++;
			} else if (type === 'minus') {
				currentNum--;
			}

			this.setNum(pid, currentNum);

			return false;
		},
		clickPayment: function(e) {
			var $item = this.el.find('.j-item'),
				result = [];

			if ($item.length) {
				$item.each(function() {
					var $this = $(this),
						isChecked = $this.find('.j-check-btn').hasClass('isChecked'),
						pid = $this.find('.j-product').attr('data-pid'),
						num = $this.find('.j-currentnum').text();

					if(isChecked){
						result.push(pid + ',' + num);
					}
				});
			}
			if(result.length <= 0){
				tip.show('请勾选商品要结算商品');
			}else{
				this.payment(result.join('###'));
			}
		},
		clickRemove: function(e) {
			var $e = $(e.currentTarget),
				pid = +$e.attr('data-pid');

			if (window.confirm('确定要删除该商品吗？')) {
				this.setNum(pid, 0);
			}

			return false;
		},
		selectProducts:function(e){
			var $e = $(e.currentTarget);
			$e.toggleClass('isChecked');
			this.resumTotal();
		},
		selectAllProducts:function(e){
			var $e = $(e.currentTarget);
			if($e.hasClass('isChecked')){
				this.el.find('.j-check-btn').removeClass('isChecked');
			}else{
				this.el.find('.j-check-btn').addClass('isChecked');
			}
			this.resumTotal();
		},
		resumTotal:function(){
			var $item = this.el.find('.j-item');
			var $total = this.elTotalfee;
			var $ap = this.elActPayment;
			var coverPrice = this.coverPrice;
			var total = 0; 
			var isAllChecked = true;
			var onCheckList = this.onCheckList = [];
			var totalNum = 0;

			if ($item.length) {
				$item.each(function() {
					var $this = $(this);
					var ischecked = $this.find('.j-check-btn').hasClass('isChecked');
					var originprice = $this.find('.j-product').attr('data-originprice');
					var pid = $this.find('.j-product').attr('data-pid');
					var num = $this.find('.j-currentnum').text();

					if(ischecked){
						onCheckList.push(pid);
						total += Number(originprice) * Number(num);
						totalNum += Number(num);
					}
					// total += ischecked ? Number(originprice) * Number(num) : 0;
					isAllChecked = isAllChecked && ischecked;
				});
			}
			this.elAllCheckBtn.toggleClass('isChecked', isAllChecked);
			$total.text('￥' + coverPrice(total));
			$ap.text('去结算('+totalNum+')');

		},
		setNum: function(pid, num) {
			if (pid === void 0 || num === void 0) return;

			var params = {
				pid: pid,
				num: num
			};

			$.ajax({
				type: 'POST',
				url: this.cgi.setnum,
				data: params,
				success: this.proxy(this.setNumBack),
				error: this.proxy(this.setNumError)
			});

			this.loadlayer.show();
		},
		setNumBack: function(result) {
			if (result) {
				this.getDataBack(result);
			}

			this.loadlayer.hide();
		},
		setNumError: function() {
			tip.show('网络连接异常');
			this.loadlayer.hide();
		},
		getData: function() {
			var params = {
				_: new Date - 0
			};

			$.get(this.cgi.cart, params, this.proxy(this.getDataBack));

			this.loading.show();
		},
		getDataBack: function(result) {
			var $list = this.elList,
				$total = this.elTotalfee,
				tpl = this.tpl,
				tmpl = this.tmpl,
				coverPrice = this.coverPrice,
				initAllCheck = this.initAllCheck,
				list;

			var onCheckList = this.onCheckList;
			

			if (result && result.errCode === 0) {

				$list.html('');

				if ((list = result.obj).length) {

					this.elDefault.removeClass('hide');

					$(list).each(function(m, n) {
						var plist = n.cartProducts,
							arr = [];

						$(plist).each(function(j, k) {
							arr.push(tmpl(tpl.item, {
								pid: k.pid,
								name: k.name,
								originprice:k.price,
								price: coverPrice(k.price),
								url: Base.url.getItemUrl(k.pid),
								logourl: k.logourl,
								num: k.num,
								maxbuy: k.maxbuy,
								depotName: n.depotName,
								isChecked: (initAllCheck || $.inArray(k.pid, onCheckList) >= 0) ? 'isChecked' : '',
								disabledMinus: (k.num === 1 ? ' disabled' : ''),
								disabledPlus: (k.num === k.maxbuy ? ' disabled' : '')
							}));
						});

						$list.append(arr.join(''));

						// $total.text('￥' + coverPrice(n.totalfee));
						
					});
					this.resumTotal();
				} else {
					this.elEmpty.removeClass('hide');
					this.elDefault.addClass('hide');
					this.elCheckoutContainer.addClass('hide');
				}

				this.loading.hide();

			} else {
				tip.show('获取购物车信息失败【' + result.errMsg + '】');
				this.loading.hide();
			}

			this.initAllCheck = false;

			// console.log(this.onCheckList);
		},
		payment: function(result) {
			var params;

			if (!result) return;

			params = {
				pinfos: result
			};

			$.post(this.cgi.checkout, params, this.proxy(this.paymentBack));

			this.loadlayer.show();
		},
		paymentBack: function(result) {
			var o;

			if (result) {
				o = result;

				switch (o.errCode) {

					// 未登录
					case 101:
						location.href = 'login.html?sourceurl=/cart.html';
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
		}
	});

	tip = new Base.Widget.Tip();

	new Cart({
		el: '.j-cart-container'
	});

	bottomBar = new Base.Widget.BottomBar();
	bottomBar.setCurrentTap('cart');
	bottomBar.getUserInfo();

	Base.url.coverFrom();

})(window.Zepto);