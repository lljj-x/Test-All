/**
 * address.js
 */
(function($) {

	var tip;

	var defaultAddress;

	var addressList;

	var checkout;

	var yhq;

	var isWeixin = Base.Browser.type === 'weixin' && Base.Browser.version >= 5.0 && !Base.url.param('wxfail');

	var isTest = /^http(s)?:\/\/test/.test(window.location.href);

	var GetOrderInfo = Base.klass.create({
		cgi: {
			data: '/api/order/getOrderById.jsp'
				// data: '../json/order.json'
		},
		init: function() {
			this.getData();
		},
		getOrderID: function() {
			return Base.url.param('orderid');
		},
		getData: function() {
			var params = {
				orderid: this.getOrderID(),
				_: new Date - 0
			};

			$.get(this.cgi.data, params, this.proxy(this.getDataBack));
			// $.get(this.cgi.data, params, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var o;

			if (result) {

				defaultAddress = new DefaultAddress({
					el: '.j-defaultaddress-container'
				});

				addressList = new AddressList({
					el: '.j-addresslist-container'
				});

				checkout = new Checkout();

				// 有订单信息
				if (result.errCode === 0) {
					o = result.obj;

					defaultAddress.render({
						id: 0, // 此时后端无地址id数据
						name: o.rname,
						phone: o.rphone,
						idcard: o.idcard,
						province: o.province,
						city: o.city,
						district: o.district,
						address: o.address
					});

					checkout.orderType = 1; //已有订单

					// 字段名兼容
					checkout.renderFees($.extend({}, o, {
						p_totalfee: o.totalfee,
						totalfee: o.realvalue
					}));

					// 满减活动
					if (o.couponfee && +o.couponfee > 0) {
						checkout.renderCoupon({
							couponPrice: o.couponfee,
							couponTitle: '全场满减活动',
							couponRemark: ''
						});
					}

					// 优惠券
					if (o.couponfeenew) {
						yhq = new YHQ({
							el: '.j-yhq-container'
						});
						yhq.showFee(o.couponfeenew);
					}

				} else {
					defaultAddress.setup();
					addressList.getData();
				}
			} else {
				tip.show('获取订单信息失败：【' + result.errMsg + '】');
			}
		}
	});

	var DefaultAddress = Base.klass.create({
		elements: {
			'.j-text-rname': 'elName',
			'.j-text-rphone': 'elPhone',
			'.j-text-idcard': 'elIdcard',
			'.j-text-address': 'elAddress'
		},
		cgi: {
			data: '/api/addr/getDefaultAddr.jsp'
				// data: '../json/defaultaddress.json'
		},
		init: function() {
			this.ID = null;
		},
		setup: function() {
			this.getData();

			this.el.on('click', function() {
				if (!checkout.isCreate) {
					addressList.show();
				}
			});
		},
		getID: function() {
			return this.ID;
		},
		getData: function() {
			var params = {
				_: new Date - 0
			};

			$.get(this.cgi.data, params, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var o;

			if (result && result.errCode === 0) {
				o = result.obj;

				this.render({
					id: o.aid,
					name: o.receiver,
					phone: o.receiverPhone,
					idcard: o.receiverIdcard,
					province: o.province,
					city: o.city,
					district: o.district,
					address: o.receiverAddress
				});

				checkout.getFee();

			} else {
				tip.show('获取默认地址失败：【' + result.errMsg + '】');
			}
		},
		render: function(o) {
			this.ID = o.id;
			this.elName.html(o.name);
			this.elPhone.html(o.phone);
			this.elIdcard.html(o.idcard.replace(/\d/g, function(j, k, x) {
				return k > 3 && k < x.length - 4 ? '*' : j;
			}));
			this.elAddress.html(o.province + o.district + o.district + ' ' + o.address);
		}
	});

	var AddressList = Base.klass.create({
		elements: {
			'.j-list': 'elList'
		},
		events: {
			'click .j-item': 'clickItem',
			'click .j-act-addnew': 'clickAddNew'
		},
		tpl: {
			address: '<li class="j-item" data-id="<%=aid%>">\
							<p>\
							<strong><%=receiver%></strong>\
							<span><%=receiverPhone%></span>\
							</p>\
							<span><%=province%><%=city%><%=district%> <%=receiverAddress%></span>\
						</li>'
		},
		cgi: {
			address: '/api/addr/getAddrList.jsp'
				// address: '../json/addresslist.json'
		},
		init: function() {
			this.cacheData = {};
			this.isShow = false;
		},
		getOrderID: function() {
			return Base.url.param('orderid');
		},
		clickItem: function(e) {
			var $e = $(e.currentTarget),
				id = $e.attr('data-id'),
				o = this.cacheData[id];

			defaultAddress.render({
				id: o.aid,
				name: o.receiver,
				phone: o.receiverPhone,
				idcard: o.receiverIdcard,
				province: o.province,
				city: o.city,
				district: o.district,
				address: o.receiverAddress
			});

			this.hide();
		},
		clickAddNew: function(e) {
			window.location.href = '../address.html?orderid=' + this.getOrderID();
		},
		show: function() {
			if (this.isShow) {
				this.hide();
				return;
			}
			this.el.removeClass('hide');
			this.isShow = true;
		},
		hide: function() {
			this.el.addClass('hide');
			this.isShow = false;
		},
		getData: function() {
			var params = {
				_: new Date - 0
			};

			$.get(this.cgi.address, params, this.proxy(this.getDataBack));
		},
		getDataBack: function(result) {
			var tmpl = this.tmpl,
				tpl = this.tpl,
				$list = this.elList,
				cacheData = this.cacheData,
				list;

			if (result && result.errCode === 0) {
				if ((list = result.obj).length) {
					$(list).each(function(m, n) {
						cacheData[n.aid] = n;
						$list.append(tmpl(tpl.address, n));
					});
				} else {
					$list.html('<label>暂无数据。</label>');
				}
			} else {
				tip.show('获取地址列表失败：【' + result.errMsg + '】');
			}
		}
	});

	var Checkout = Base.klass.create({
		elements: {
			'.j-text-productfee': 'elProductFee',
			'.j-text-postfee': 'elPostFee',
			'.j-text-ppatfee': 'elPpatFee',
			'.j-text-totalfee': 'elTotalFee',
			'.j-text-coupontotalfee': 'elCoupontotalfee',
			'.j-paytype-item': 'elPaytypeItem',

			'.j-coupon-container': 'elCouponContainer',

			'.j-act-submit': 'elActSubmit'
		},
		events: {
			'click .j-paytype-item': 'clickPaytypeItem',

			'click .j-act-cancel': 'clickCancel',
			'click .j-act-submit': 'clickSubmit'
		},
		cgi: {
			fee: '/api/order/showFeePage.jsp',
			// fee: '../json/totalfee.json',
			pay: '/api/order/createOrder.jsp'
				// pay: '../json/createorder.json'
		},
		init: function() {
			this.isCreate = false; // 是否已经创建订单

			this.fee = null;

			this.totalFee = null;

			this.orderType = 0; // 默认准订单，1为已有订单(再次支付)

			this.initPayType();
		},
		initPayType: function() {
			// 微信支付
			if (isWeixin) {
				this.elPaytypeItem.removeClass('checked');
				this.elPaytypeItem.filter('[data-value="2"]').addClass('checked').removeClass('hide');
			} else {
				// 网页版支付宝
				if (Base.Browser.isPC) {
					this.elPaytypeItem.removeClass('checked');
					this.elPaytypeItem.filter('[data-value="3"]').addClass('checked').removeClass('hide');
				} else {
					this.elPaytypeItem.filter('[data-value="1"]').removeClass('hide');
				}
			}
		},
		getPayType: function() {
			return this.elPaytypeItem.filter('.checked').attr('data-value');
		},
		getOrderID: function() {
			return Base.url.param('orderid');
		},
		getAddressID: function() {
			return defaultAddress.getID();
		},
		getGchan: function() {
			return Base.cookie('g_chan');
		},
		getFee: function() {
			var params;

			params = {
				preorderid: this.getOrderID(),
				addrid: this.getAddressID(),
				paytype: this.getPayType(),
				_: new Date - 0
			};


			// 有优惠券码（从用户优惠券列表返回）
			if (Base.url.param('coupon')) {
				$.extend(params, {
					couponCode: Base.url.param('coupon')
				});
			}

			$.get(this.cgi.fee, params, this.proxy(this.getFeeBack));
		},
		getFeeBack: function(result) {
			var o;

			if (result && result.errCode === 0) {
				o = result.obj;

				this.orderType = +o.ordertype;

				this.renderCoupon(o);

				this.renderFees(o);
			} else {
				tip.show('获取商品总额失败【' + result.errMsg + '】');
			}
		},
		renderCoupon: function(o) {
			var $item;

			if (o.couponPrice) {
				$item = this.elCouponContainer;

				$item.removeClass('hide');

				$item.find('h5').text(o.couponTitle);

				$item.find('p').text(o.couponRemark);

				$item.find('.amount').text('- ￥' + this.coverPrice(o.couponPrice));
			}
		},
		renderFees: function(o) {
			this.elProductFee.text('￥' + this.coverPrice(o.p_totalfee));
			this.elPostFee.text(o.postfee === 0 ? '已缴' : '￥' + this.coverPrice(o.postfee));
			this.elPpatFee.text(o.ppatfee === 0 ? '已缴' : '￥' + this.coverPrice(o.ppatfee));
			// this.elCoupontotalfee.text(); // 优惠金额，暂时还没有逻辑
			this.elTotalFee.text('￥' + this.coverPrice(this.totalFee = o.totalfee));

			// 启用提交按钮
			this.enable();

			yhq = new YHQ({
				el: '.j-yhq-container'
			});

			yhq.initYHQ(o);

		},
		clickCancel: function() {
			window.history.go(-1);
		},
		clickSubmit: function() {
			if (this.elActSubmit.hasClass('disabled')) return;

			this.submit();
		},
		clickPaytypeItem: function(e) {
			var $e = $(e.currentTarget);

			this.elPaytypeItem.removeClass('checked');
			$e.addClass('checked');
		},
		submit: function() {
			var payType,
				orderid,
				params;

			payType = this.getPayType();

			orderid = this.getOrderID();

			// 已有订单
			if (this.orderType === 1) {
				this.submitBack({
					errCode: 0,
					obj: orderid
				});
			} else if (this.orderType === 0) {
				params = {
					preorderid: orderid,
					addrid: this.getAddressID(),
					paytype: payType,
					totalfee: this.totalFee,
					g_chan: this.getGchan()
				};

				// 有优惠券码（从用户优惠券列表返回）
				if (Base.url.param('coupon')) {
					$.extend(params, {
						couponCode: Base.url.param('coupon')
					});
				}

				// 获取正式的订单ID
				$.post(this.cgi.pay, params, this.proxy(this.submitBack));
			}

			this.disable();
		},
		submitBack: function(result) {
			if (result && +result.errCode === 0 && result.obj) {
				this.isCreate = true; // 已创建订单
				Pay.do(this.getPayType(), result.obj);
			} else {
				tip.show(result.errMsg); // 创建订单失败错误
				checkout.enable();
			}
		},
		disable: function() {
			this.elActSubmit.addClass('disabled').text('提交中...');
		},
		enable: function() {
			this.elActSubmit.removeClass('disabled').text('确认');
		}
	});

	var Pay = Base.klass.single({
		do: function(type, orderid) {

			this.orderid = orderid;

			switch (+type) {
				case 1:
					this.alipaymobile();
					break;
				case 2:
					this.wxpay();
					break;
				case 3:
					this.alipaypc();
					break;
				case 4:
					this.unionpay();
					break;
			}

		},
		/**
		 * 手机版支付宝支付
		 */
		alipaymobile: function() {
			var href = isTest ? 'http://test.allpyra.com/alipay/wap/alipayapi.jsp' : 'http://www.allpyra.com/alipay/wap/alipayapi.jsp';

			window.location.href = href + '?orderid=' + this.orderid;
		},
		/**
		 * PC版支付宝支付
		 */
		alipaypc: function() {
			var href = isTest ? 'http://test.allpyra.com/alipay/pay.jsp' : 'http://www.allpyra.com/alipay/pay.jsp';

			window.location.href = href + '?orderid=' + this.orderid;
		},
		/**
		 * 银联支付
		 */
		unionpay: function() {
			var href = isTest ? 'http://test.allpyra.com/unionpay/jsp/wap/consumePay.jsp' : 'http://www.allpyra.com/unionpay/jsp/wap/consumePay.jsp';

			window.location.href = href + '?orderid=' + this.orderid;
		},
		/**
		 * 微信支付
		 */
		wxpay: function() {
			var href,
				params,
				orderid,
				o;

			orderid = this.orderid;

			params = {
				orderid: orderid,
				_: new Date - 0
			};

			function doPay() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": o.appId, //公众号名称，由商户传入     
						"timeStamp": o.timeStamp, //时间戳，豪秒数     
						"nonceStr": o.nonceStr, //随机串     
						"package": o.package,
						"signType": o.signType, //微信签名方式
						"paySign": o.sign //微信签名
					},
					function(res) {
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							location.href = '../paysuccess.html?orderid=' + orderid;
						} else if (/cancel/.test(res.err_msg)) {
							tip.show('支付已取消');
						} else if (/fail/.test(res.err_msg)) {
							tip.show('支付失败【' + res.err_msg + '】');
						} else {
							tip.show(res.err_msg);
						}
						checkout.enable();
					}
				);
			}

			$.get('/wxpay/jsapi/pay.jsp', params, function(result) {
				if (result && result.result_code === 'SUCCESS') {
					o = result.content;

					if (typeof WeixinJSBridge == "undefined") {
						if (document.addEventListener) {
							document.addEventListener('WeixinJSBridgeReady', doPay, false);
						} else if (document.attachEvent) {
							document.attachEvent('WeixinJSBridgeReady', doPay);
							document.attachEvent('onWeixinJSBridgeReady', doPay);
						}
					} else {
						doPay();
					}
				} else {
					tip.show('支付失败:【' + result.result_msg + '】');
					checkout.enable();
				}
			});
		}
	});

	var YHQ = Base.klass.create({
		elements: {
			'.j-text-num': 'elNum',
			'.j-icon-arr': 'elArr',
			'.j-text-amount': 'elAmount',
			'.j-act-cancelyhq': 'elCancelyhq',
			'.j-text-empty': 'elEmpty'
		},
		events: {
			'click .j-act-cancelyhq': 'clickCancel'
		},
		cgi: {
			one: '/api/coupon/queryCoupons.jsp'
		},
		init: function() {
			this.orderid = Base.url.param('orderid');

			this.couponCode = Base.url.param('coupon');
		},
		initYHQ: function(o) {
			// 如果是团购则不显示优惠券
			if(o.gbid && +o.gbid > 0) return;

			// 如果选择了优惠券并且优惠金额大于0
			if (this.couponCode && o.couponfeenew && +o.couponfeenew > 0) {
				this.showOne(o.couponfeenew);
			} else {
				this.showTotal(o.couponNum);
			}
		},
		clickCancel: function(e) {
			if (this.orderid) {
				window.location.href = '/checkout/?orderid=' + this.orderid; // 去掉优惠券参数取消优惠
			}

			return false;
		},
		showTotal: function(total) {
			var orderid = this.orderid;

			if (total !== undefined) {

				this.el.removeClass('hide');

				if (+total > 0) {
					this.elNum.removeClass('hide').text(total + '张可用');
				} else {
					this.elEmpty.removeClass('hide');
				}

				this.elArr.removeClass('hide');

				this.el.on('click', function() {
					window.location.href = '../coupons.html?orderid=' + orderid + '&usecoupon=1';
				});
			}
		},
		showOne: function(fee) {
			this.el.removeClass('hide');

			if (fee && +fee > 0) {
				this.showFee(fee);
				this.elCancelyhq.removeClass('hide'); // 可以取消
			} else {
				this.elEmpty.removeClass('hide');
				this.elArr.removeClass('hide');

				this.el.on('click', function() {
					window.location.href = '../coupons.html?orderid=' + orderid + '&usecoupon=1';
				});
			}
		},
		showFee: function(fee) {
			this.el.removeClass('hide');

			this.elAmount.removeClass('hide').text('- ￥' + this.coverPrice(fee));
		}
	});

	tip = new Base.Widget.Tip();

	new GetOrderInfo();

	Base.url.coverFrom();

})(window.Zepto);