/**
 * Base
 */
// 全局配置
var DOMAIN = 'http://m.allpyra.com',
    DOMAIN_COOKIE = 'test.local';

(function($) {

	var root = window;

	var Base = {};

	var domain = DOMAIN_COOKIE;

	var _spliter = /^(\S+)\s*(.*)$/;

	var _hasprop = Object.prototype.hasOwnProperty;

	var _slice = Array.prototype.slice;

	var _concat = Array.prototype.concat;

	var _getType = function(o) {
		return Object.prototype.toString.call(o);
	};

	var _isFunction = function(o) {
		return _getType(o) === '[object Function]';
	};

	var _isObject = function(o) {
		return _getType(o) === '[object Object]';
	};

	var _isArray = function(o) {
		return _getType(o) === '[object Array]';
	};

	var _isString = function(o) {
		return _getType(o) === '[object String]';
	};

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
			}

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

	Base.cookie ={
        /**
         * cookie
         * @param options
         */
        setCookie : function(options){
            options = $.extend({
                name:'',
                value : '',
                expiresHours : 7 * 24,
                domain : DOMAIN_COOKIE,
                path : '/'
            },options);

            var cookieString= options.name + "=" + escape(options.value) + ';path=' + options.path + ';domain=' + options.domain;
            if(options.expiresHours > 0){
                var date=new Date();
                date.setTime(date.getTime() + options.expiresHours * 3600 * 1000);
                cookieString=cookieString+"; expires=" + date.toGMTString();
            }
            document.cookie=cookieString;
        },
        /**
         * get Cookie
         * @param name
         * @returns {*}
         */
        getCookie : function (name){
            var strCookie=document.cookie;
            var arrCookie=strCookie.split("; ");
            for(var i=0;i<arrCookie.length;i++){
                var arr=arrCookie[i].split("=");
                if(arr[0]==name)return arr[1];
            }
            return "";
        },

		/**
		 * 删除cookie
		 * @param name
		 */
		deleteCookie : function(name){
			var exp = new Date();
			exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
			var cVal = Base.cookie.getCookie(name);
			document.cookie = name + "=" + cVal + "; expires=" + exp.toGMTString();
		}
	};

	/**
	 * 浏览器相
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

	Base.MobileBrowser = function(){
		var sys = '', ver = '', v = [];
		var ua = window.navigator.userAgent;
		if (/iP(hone|od|ad)/.test(ua)) {
		    sys = 'ios';
		    v = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
		    ver = parseInt(v[1], 10);
		}else if(/Android/.test(ua)){
			sys = 'android';
			v = ua.match(/Android (\d+).(\d+).?(\d+)?/);
			ver = parseInt(v[1], 10);
		}
		return {sys:sys, ver:ver};
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

        function makeUp(count, cla){
            return '<span class="'+cla+'">'+count+'</span>';
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
                        endCall = n.endCall,
                        zero = n.zero || '',
                        makeUp = n.makeUp || false,
                        tmpCoverTime;

                    if (time > 0 && $item.length) {
                        tmpCoverTime = coverTime(n.time -= 1000, makeUp);
                        $item.html( (tmpCoverTime == '') ? zero : tmpCoverTime);
                    } else {
                        cache.splice(m, 1);
                        _isFunction(endCall) && endCall.call($item);
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

})(window.jQuery);