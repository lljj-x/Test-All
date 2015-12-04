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
		},
		/**
		 * 修复日期成标准日期格式：yyyy/MM/dd
		 */
		repariDate: function(s) {
			return s ? s.replace(/\b([1-9])\b/g, '0$1').replace(/[^0-9]/g, '/') : '';
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

		return $.cookie.apply(null, args);
	};

	Base.url = {
		location: root.location,

		cache: null,

		param: function(key) {
			var ps = this.location.href.split('?')[1],
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

		coverFrom: function() {
			var self = this,
				location = this.location;

			$('.j-act-from').click(function() {
				location.href = $(this).attr('href') + '?from=' + (self.param('from') || encodeURIComponent(location.href));
				return false;
			})
		},
        currentPath: function () {
            var currentPath = this.location.pathname,
                arrPath = currentPath.split('/');
            if(arrPath.length > 2){
                return false;
            }else{
                return arrPath[1].replace('.html','');
            }
        }
	};

	/**
	 * 浏览器相关
	 */
	Base.Browser = function() {
		var ua = navigator.userAgent,
			type,
			version,
			matches;

		if ((matches = ua.match(/MicroMessenger\/(\d\.\d)/)) && matches.length) {
			type = 'weixin';
			version = +matches[1];
		}

		return {
			type: type,
			version: version
		}
	}();

	/**
	 * sideBar
	 * @type {Object}
	 */
	Base.Sidebar = {
		active: function(id, subid) {
			$('.page-sidebar').find('li[data-id="' + id + '"]')
				.addClass('active open')
				.find('.arrow')
				.addClass('open')
				.end()
				.find('.selected')
				.removeClass('hide')
				.end()
				.find('li[data-subid="' + subid + '"]')
				.addClass('active');

			$('.j-text-searchtype').val(id);
		}
	};

	Base.Util = {};

	root.Base = Base;

})(window.jQuery);

$(function () {
	// common js
    var cNav ;
    if(cNav = Base.url.currentPath()){
        $('.j-nav-' + cNav).addClass('current');
    }
});