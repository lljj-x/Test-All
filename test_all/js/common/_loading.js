/**
 * Loading
 */
(function($) {

	var Loading = Base.klass.create({
		tpl: '<div class="j-ui-loading"><img src="/img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>',

		setup: function() {
			var owner;

			if (!this.$el) {
				if (!(owner = this.options.owner)) return;

				this.$owner = (typeof owner === 'string' ? $(owner) : owner);
				this.$el = $(this.tpl);
			}

			this.$el.prependTo(this.$owner);
		},

		show: function() {
			this.setup();
			this.$el && this.$el.show();

			return this;
		},

		hide: function() {
			this.$el && this.$el.appendTo($(document.body)).hide();

			return this;
		},

		html: function(html) {
			this.$el && this.$el.html(html || '暂无数据。');

			return this;
		}
	});

	Base.Widget.Loading = Loading;

})(window.Zepto);