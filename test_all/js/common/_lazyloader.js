(function($) {

	var LazyLoader = Base.klass.create({
		init: function() {
			this.itemLength = 0;
			this.loadedLength = 0;

			this.initEvents();
		},
		initEvents: function() {
			$(window)
				.on('scroll.lazyloader.api', this.throttle(this.proxy(this.scroll), 100));

			this.scroll();
		},
		scroll: function() {
			var self = this,
				options = this.options,
				selector = options.selector || 'img',
				alias = options.alias || 'original',
				scrollTop = $(window).scrollTop(),
				$items = this.el.find(selector),
				length = this.itemLength = $items.length;

			// 如果已经全部加载完成
			if(this.loadedLength === this.itemLength){
				this.dispose();
				return;
			}

			$items.each(function() {
				var $this = $(this),
					top = $this.offset().top,
					height = $this.height(),
					thisAlias;

				if (!$this.hasClass('lazyloaded') && (thisAlias = $this.attr(alias)) && (scrollTop + $(window).height() >= top && scrollTop <= top + height)) {
					$this.attr('src', thisAlias).addClass('lazyloaded').on('load', function() {
						self.trigger('loaded', $this);
					});
					self.loadedLength++;
				}
			});
		},
		dispose: function() {
			$(window).off('scroll.lazyloader.api');
		}
	});

	Base.Widget.LazyLoader = LazyLoader;

})(window.jQuery || window.Zepto);