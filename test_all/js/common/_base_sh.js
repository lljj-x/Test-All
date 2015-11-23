/**
 * Base
 */
(function($) {

	var root = window;

	var Base = {};

	var domain = 'allpyra.com';

	var _spliter = /^(\S+)\s*(.*)$/;

	var _hasprop = Object.prototype.hasOwnProperty;

	var _slice = Array.prototype.slice;

	var _concat = Array.prototype.concat;

	var _getType = function(o) {
		return Object.prototype.toString.call(o);
	}

	var _isFunction = function(o) {
		return _getType(o) === '[object Function]';
	}

	var _isObject = function(o) {
		return _getType(o) === '[object Object]';
	}

	var _isArray = function(o) {
		return _getType(o) === '[object Array]';
	}

	var _isString = function(o) {
		return _getType(o) === '[object String]';
	}

	Base.klass = {
		bind: function(ev, callback) {
			this.ev[ev] = callback;
			return this;
		},
		unbind: function(ev) {
			this.ev[ev] && (delete this.ev[ev]);
			return this;
		},
		trigger: function(ev) {
			var rtn = true;
			if (this.ev[ev]) {
				rtn = this.ev[ev].apply(this, _slice.call(arguments, 1));
			}
			return rtn;
		},
		/**
		 * 事件代理
		 */
		proxy: function() {
			if (arguments.length === 0) return;

			var args = arguments,
				fn = args[0],
				context = args.length === 1 ? this : (_isObject(args[1]) && args[1]);

			return function() {
				return fn.apply(context, args.length > 2 ? _concat.call(_slice.call(args, 2), _slice.call(arguments)) : arguments);
			}
		},
		_supper: function(options) {
			this.options = options = options || {};

			this.el = this.el || options.el;

			this.el = this.el && (_isString(this.el) ? $(this.el) : this.el) || $(document);

			options.el && delete options.el;

			this.ev = {};

			this._bind();
		},
		/**
		 * 缓存节点&绑定初始事件
		 */
		_bind: function() {
			this.elements && ~ function(self) {
				for (var item in self.elements) {
					_hasprop.call(self.elements, item) && (self[self.elements[item]] = self.el.find(item));
				}
			}(this);

			this.events && ~ function(self) {
				for (var item in self.events) {
					_hasprop.call(self.events, item) &&
						~ function() {
							var items = _spliter.exec(item),
								type = items[1],
								selector = items[2],
								method = _isFunction(self.events[item]) ? self.events[item] : self[self.events[item]];

							if (method) {
								method = self.proxy(method);
								if (selector) {
									self.el.on(type, selector, method);
								} else {
									self.el.bind(type, method);
								}
							}
						}();
				}
			}(this);
		},
		_create: function() {
			function f() {};
			f.prototype = this;
			return new f;
		},
		/**
		 * 类模式
		 */
		create: function(extend) {
			var Result;

			Result = function() {
				Base.klass._supper.apply(this, arguments);
				this.init && _isFunction(this.init) && this.init.apply(this, arguments);
			};

			$.extend(Result.prototype, this._create());

			extend && _isObject(extend) && $.extend(Result.prototype, extend);

			return Result;
		},
		/**
		 * 单例模式
		 */
		single: function(extend) {
			var Result;

			Result = this._create();

			extend && _isObject(extend) && $.extend(Result, extend);

			this._supper.apply(Result, _slice.call(arguments, 1));

			Result.init && _isFunction(Result.init) && Result.init.apply(Result, _slice.call(arguments, 1));;

			return Result;
		},
		/**
		 * 模板操作
		 */
		tmpl: (function() {
			var cache = {};

			function tmpl(str, data) {
				// Figure out if we're getting a template, or if we need to
				// load the template - and be sure to cache the result.
				var fn = !/\W/.test(str) ?
					cache[str] = cache[str] ||
					tmpl(document.getElementById(str).innerHTML) :

					// Generate a reusable function that will serve as a template
					// generator (and which will be cached).
					new Function("obj",
						"var p=[],print=function(){p.push.apply(p,arguments);};" +

						// Introduce the data as local variables using with(){}
						"with(obj){p.push('" +

						// Convert the template into pure JavaScript
						str
						.replace(/[\r\t\n]/g, " ")
						.split("<%").join("\t")
						.replace(/((^|%>)[^\t]*)'/g, "$1\r")
						.replace(/\t=(.*?)%>/g, "',$1,'")
						.split("\t").join("');")
						.split("%>").join("p.push('")
						.split("\r").join("\\'") + "');}return p.join('');");

				// Provide some basic currying to the user
				return data ? fn(data) : fn;
			};

			return tmpl;
		})(),

		throttle: function(fn, delay) {
			var timer = null;
			return function() {
				var context = this,
					args = arguments;
				clearTimeout(timer);
				timer = setTimeout(function() {
					fn.apply(context, args);
				}, delay);
			};
		},
		coverPrice: function(s) {
			return +s > 99 ?
				String(s).replace(/(\d+)(\d{2})$/, '$1.$2') :
				+s > 9 ?
				'0.' + s :
				'0.0' + s;
		},
		decoverPrice: function(s) {
			var dotted = String(s).split('.'),
				slice;

			return (dotted[0] + (dotted[1] === undefined ? '00' : (slice = dotted[1].slice(0, 2)).length === 1 ? slice + '0' : slice)).replace(/^0*/g, '');
		},
		formatTime: function(time, F) {
			var date = new Date(time),
				F = F || 'yyyy-M-d H:m:s';

			return F.replace(/\b[ymMdHs]+\b/g, function(i) {
				switch (i) {
					case 'yyyy':
						return date.getFullYear();
					case 'yy':
						return String(date.getFullYear()).slice(2);
						break;
					case 'M':
						return date.getMonth() + 1;
					case 'MM':
						return date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
					case 'd':
						return date.getDate();
					case 'dd':
						return date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
					case 'HH':
					case 'H':
						return date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
					case 'mm':
					case 'm':
						return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
					case 'ss':
					case 's':
						return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				}
			});
		}
	};

	Base.domain = domain;

	Base.cookie = function(key, value, options) {
		var args = _slice.call(arguments),
			opts = {};

		if (args.length > 1) {

			if (!options) {
				$.extend(opts, {
					domain: domain,
					path: '/',
					expires: 90 // 默认90天过期
				})
			} else {
				options.domain === void 0 && $.extend(opts, {
					domain: domain
				});

				options.path === void 0 && $.extend(opts, {
					path: '/'
				});

				options.expires === void 0 && $.extend(opts, {
					expires: 90
				});
			}

			options = $.extend(options || {}, opts);

			args[2] = options;
		}

		return $.fn.cookie.apply(null, args);
	}

	Base.url = {
		location: root.location,

		cache: null,

		param: function(key) {
			var href = this.location.href;
			var hrefWithoutHash = href.indexOf('#') > 0 ? href.substr(0, href.indexOf('#')) : href;
			var ps = hrefWithoutHash.split('?')[1],
				cache,
				keys,
				rtn;

			if (ps) {
				if ((cache = this.cache) === null) {
					keys = ps.split('&');

					cache = this.cache = {};

					$(keys).each(function(m, n) {
						var _flag = n.split('=');
						cache[_flag[0]] = _flag[1];
					});
				}

				if (key) {
					return cache[key];
				} else {
					return cache;
				}
			}
		},
		hash: function() {
			return this.location.hash.replace(/^#/, '');
		},
		findUrlPid: function() {
			var pidMap = ["item", "id-"],
				regArr, matchResult = '',
				reg;
			for (var i = 0; i < pidMap.length; i++) {
				reg = new RegExp(pidMap[i] + "\\d+");
				regArr = window.location.href.match(reg);
				if (regArr && regArr.length > 0) {
					matchResult = regArr[0].replace(pidMap[i], '');
				}
				if (matchResult) break;
			}
			return matchResult;
		},
		getPageHash: function() {
			var pageKey = 'pg-';
			var tmpStr = window.location.hash;
			var pageNum = 0;
			if (tmpStr) {
				tmpStr = tmpStr.toLowerCase();
				var reg = new RegExp(pageKey + '\\d+');
				var tmpArr = tmpStr.match(reg);
				var pageStr = (_isArray(tmpArr) && tmpArr.length > 0) ? tmpArr[0] : '0';
				pageNum = pageStr.replace(pageKey, '');
			}
			return pageNum;
		},
		coverFrom: function() {
			var self = this,
				location = this.location;

			$('.j-act-from').click(function(e) {
				location.href = $(this).attr('href') + '?sourceurl=' + (self.param('sourceurl') || encodeURIComponent(location.href));
				e.preventDefault();
			})
		},
		getItemUrl: function(id) {
			return 'item' + id + '.html';
		}
	}

	/**
	 * 浏览器相关
	 */
	Base.Browser = function() {
		var ua = navigator.userAgent,
			isMobile,
			type,
			version,
			matches;

		if ((matches = ua.match(/MicroMessenger\/(\d\.\d)/)) && matches.length) {
			type = 'weixin';
			version = +matches[1];
		}

		return {
			isPC: function() {
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

				if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
					return true;
				}

				return false;
			}(),
			type: type,
			version: version
		}
	}();

	/**
	 * 订单相关
	 */
	Base.Order = {
		getStatus: function(status) {
			if (status !== void 0) {
				switch (+status) {
					case 100:
						return '待支付';
					case 200:
						return '支付成功(待审核)';
					case 300:
						return '已审核';
					case 400:
						return '待海关审核';
					case 500:
						return '待发货';
					case 600:
						return '运单生成';
					case 700:
						return '已发货';
					case 800:
						return '已收货';
					case 10000:
						return '已关闭';
				}
			}
		},
		getPayType: function(type) {
			if (type !== void 0) {
				switch (+type) {
					case 1:
					case 3:
					case 4:
					case 5:
						return '支付宝支付';
					case 2:
					case 21:
					case 22:
						return '微信支付';
				}
			}
		}
	};

	Base.Widget = {

		/**
		 * 信息提示
		 */
		Tip: Base.klass.create({
			'defaults': {
				'auto': true,
				'width': 150,
				'backgroundColor': '#000',
				'color': '#fff',
				'opacity': 0.7,
				'zIndex': 100000,
				'timeout': 3000,
				'tpl': '<div style="position:fixed;text-align:center;padding:10px;border-radius:5px;"></div>'
			},

			_createElement: function() {
				this.$el = $(this['defaults'].tpl);

				this.$el.appendTo(document.body);

				this.isCreateElement = true;
			},

			_clearTimer: function() {
				if (this.timer) {
					clearTimeout(this.timer);
				}
			},

			_autoHide: function() {
				var self = this;

				this._clearTimer();

				this.timer = setTimeout(function() {
					self.hide();
				}, this['defaults'].timeout || 3000);
			},

			show: function(message, o) {
				var o = $.extend(this['defaults'], o),
					$el;

				this._clearTimer();

				if (!this.isCreateElement) {
					this._createElement();
				}

				$el = this.$el;

				$el.css({
					width: o.width,
					backgroundColor: o.backgroundColor,
					color: o.color,
					opacity: o.opacity,
					zIndex: o.zIndex,
					top: '50%',
					left: '50%'
				});

				$el.html(message);

				$el.show();

				$el.css({
					margin: '-' + ($el.height() / 2) + 'px 0 0 -' + ($el.width() / 2) + 'px'
				});

				if (o.auto) {
					this._autoHide();
				}
			},

			hide: function() {
				if (this.$el) {
					this.$el.hide();
				}
			}
		}),

		/**
		 * 分享
		 */
		WXShareConfig: {
			'imgUrl': window.location.origin + '/img/share/logo.jpg',
			'link': window.location.href,
			'desc': '\u81f4\u529b\u4e8e\u4e3a\u4e2d\u56fd\u8ffd\u6c42\u9ad8\u54c1\u8d28\u751f\u6d3b\u7684\u6d88\u8d39\u8005\u63d0\u4f9b\u5168\u7403\u8303\u56f4\u5185\u7684\u9ad8\u7aef\u4f18\u8d28\u5546\u54c1\u91c7\u8d2d\u670d\u52a1', // 致力于为中国追求高品质生活的消费者提供全球范围内的高端优质商品采购服务
			'title': '\u0041\u006c\u006c\u0070\u0079\u0072\u0061\u91d1\u5b57\u5854\u002d\u9ad8\u7aef\u6d77\u5916\u751f\u6d3b\u7528\u54c1\u5546\u57ce', // Allpyra金字塔-高端海外生活用品商城
			'type': '', // 分享类型,music、video或link，不填默认为link
			'dataUrl': '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				// 用户确认分享后执行的回调函数
			},
			cancel: function() {
				// 用户取消分享后执行的回调函数
			}
		},
		WXShareCache: null,
		WXShare: Base.klass.create({
			init: function() {
				this.data = $.extend(Base.Widget.WXShareConfig, this.options.config || {});

				if (!Base.Widget.WXShareCache) {
					this.getKeys();
				} else {

					// 同页面从cache获取
					this.getKeysBack(Base.Widget.WXShare);
				}
			},
			getKeys: function() {
				var params;

				params = {
					url: window.location.href.split('#')[0]
				};

				// $.post('/api/weixin/partake.jsp', params, this.proxy(this.getKeysBack));

				$.ajax({
					async: false, // 同步提交
					type: 'post',
					dataType: 'json',
					url: '/api/weixin/partake.jsp',
					data: params,
					success: this.proxy(this.getKeysBack)
				});
			},
			getKeysBack: function(result) {
				var o,
					data;

				if (result && result.result_code === 'SUCCESS') {

					o = Base.Widget.WXShare = result.content; // cache赋值

					data = this.data;

					wx.config({
						// debug: true,
						appId: o.appId,
						timestamp: o.timestamp,
						nonceStr: o.nonceStr,
						signature: o.signature,
						jsApiList: [
							// 'checkJsApi',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo',
							'scanQRCode'
						]
					});

					wx.ready(function() {

						wx.onMenuShareAppMessage(data);

						wx.onMenuShareTimeline(data);

						wx.onMenuShareQQ(data);

						wx.onMenuShareWeibo(data);
					});
				}
			}
		})
	};

	// 倒计时
	Base.Widget.Countdown = function() {
		var cache = [],
			timer;

		function coverTime(s, hasMakeUp) {
			var h, t_d, t_h, t_m, t_s;

			s = +s;

			h = s / 3600000;

			// 大于24小时
			if (h >= 24) {
				t_d = Math.ceil(h / 24);
				return '剩余' + t_d + '天';
			} else if (s > 0 && h < 24) {
				t_h = fix(parseInt(h % 24, 10));
				t_m = fix(parseInt(s / 60000 % 60, 10));
				t_s = fix(parseInt(s / 1000 % 60, 10));
				t_h = hasMakeUp ? makeUp(t_h, 'ltt hours') : t_h;
				t_m = hasMakeUp ? makeUp(t_m, 'ltt minutes') : t_m;
				t_s = hasMakeUp ? makeUp(t_s, 'ltt seconds') : t_s;
				var ln = hasMakeUp ? ' : ' : ':';
				return t_h + ln + t_m + ln + t_s;
			} else {
				return '';
			}
		}

		function makeUp(count, cla) {
			return '<span class="' + cla + '">' + count + '</span>';
		}

		function fix(i) {
			return i < 10 ? '0' + i : i;
		}

		function start() {
			if (cache.length > 0) {

				if (timer) {
					clearTimeout(timer);
				}

				$(cache).each(function(m, n) {
					var time = n.time,
						$item = n.$item,
						makeUp = n.makeUp || false;

					if (time > 0 && $item.length) {
						$item.html(coverTime(n.time -= 1000, makeUp));
					} else {
						cache.splice(m, 1);
					}
				});

				timer = setTimeout(start, 1000);
			} else {
				timer && clearTimeout(timer);
			}
		}

		return {
			push: function(o) {
				if (o.time && o.$item.length) {
					cache.push(o);
					start();
				}
			},
			clear: function() {
				cache = [];
				clearTimeout(timer);
			}
		}
	}();

	root.Base = Base;

})(window.Zepto);