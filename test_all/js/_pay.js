/**
 * pay.js
 */
(function($) {

	var tip;

	var isWeixin = Base.Browser.type === 'weixin' && Base.Browser.version >= 5.0 && !Base.url.param('wxfail');

	var isTest = /^http(s)?:\/\/test/.test(window.location.href);

	var Pay = Base.klass.create({
		elements: {
			'.j-paytype-item': 'elPaytypeItem',

			'.j-act-submit': 'elActSubmit'
		},
		events: {
			'click .j-paytype-item': 'clickPaytypeItem',

			'click .j-act-cancel': 'clickCancel',
			'click .j-act-submit': 'clickSubmit'
		},
		init: function() {
			this.orderid = Base.url.param('orderid');

			if (!this.orderid) {
				tip.show('缺少订单参数');
				setTimeout(function() {
					window.history.go(-1);
				}, 3000);
			} else {
				this.initPayType();

				this.isSubmit = false;
			}
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
		clickCancel: function() {
			window.history.go(-1);
		},
		clickSubmit: function() {
			if (this.elActSubmit.hasClass('disabled')) return;

			this.do(this.getPayType(), this.orderid);
		},
		clickPaytypeItem: function(e) {
			var $e = $(e.currentTarget);

			this.elPaytypeItem.removeClass('checked');
			$e.addClass('checked');
		},
		disable: function() {
			this.elActSubmit.addClass('disabled').text('提交中...');
		},
		enable: function() {
			this.elActSubmit.removeClass('disabled').text('确认');
		},
		do: function(type, orderid) {

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
			var self = this,
				href,
				params,
				o;

			params = {
				orderid: this.orderid,
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
							location.href = '../paysuccess.html';
						} else if (/cancel/.test(res.err_msg)) {
							tip.show('支付已取消');
						} else if (/fail/.test(res.err_msg)) {
							tip.show('支付失败【' + res.err_msg + '】');
						} else {
							tip.show(res.err_msg);
						}
						self.enable();
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
					tip.show('调用微信支付接口失败:【' + result.result_msg + '】');
					self.enable();
				}
			});
		}
	});

	tip = new Base.Widget.Tip();

	new Pay();

	Base.url.coverFrom();

})(window.Zepto);