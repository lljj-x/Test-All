/**
 * loadlayer
 */
(function($) {

	var Loadlayer = Base.klass.create({
		tpl: '<div class="j-ui-loadlayer"><img src="/img/loading.gif"/></div>',

		init: function() {
			this.isSetup = false;
		},

		setup: function() {
			var $owner;

			if (this.isSetup || !($owner = this.options.owner && (typeof this.options.owner === 'string' ? $(this.options.owner) : this.options.owner))) return this;

			this.$el = $(this.tpl).appendTo($owner);

			this.$el.css({
				width: this.options.owner === 'body' ? $(window).width() : $owner.width(),
				height: this.options.owner === 'body' ? $(window).height() : $owner.height()
			});

			this.isSetup = true;
		},

		show: function() {
			this.setup();
			this.$el && this.$el.show();
		},

		hide: function() {
			this.$el && this.$el.hide();
		}
	});

	Base.Widget.Loadlayer = Loadlayer;

})(window.Zepto);