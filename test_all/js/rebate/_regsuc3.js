/**
 * rebate/regsuc3.js
 */
(function($) {

	var action;

	var Action = Base.klass.create({
		elements:{
			'.j-tips-mark':'elTipsMark'
		},
		events: {
			// 'click .j-attention-btn': 'doAttention',
			// 'click .j-tips-mark': 'hideTipsMark',
		},
		cgi: {
			gainGift:'/api/user/gainGift.jsp'
		},
		init: function() {

			var self = this;

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getData();

		},
		getData: function() {
			
			var params = {};

			params._ = new Date() - 0;

			$.get(this.cgi.gainGift, params, this.proxy(this.getDataBack));
			
		},
		getDataBack: function(result) {
			var list,
				o;
			if (result && result.errCode === 0) {
				o = result.obj;
			}
		},
		doAttention: function(){
		},
		hideTipsMark:function(){
		}
	});

	action = new Action({
		el:'.j-container'
	});

})(window.Zepto);