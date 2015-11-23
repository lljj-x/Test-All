/**
 * pager.js
 */
(function($) {

	var tip;

	tip = new Base.Widget.Tip();

	var FavorControl = Base.klass.create({
		elements: {
			'.j-favorinfo': 'elFavorBtn'
		},
		events:{
			'click .j-favorinfo': 'changeFavorState'
		},
		cgi: {
			action: '/api/user/favorite.jsp'
		},
		init: function() {
		},
		pageParams:{
			op:0,
			pid:0
		},
		buttonLock: false,
		getFavorState:function(){
			var op = 4;
			var pid = this.elFavorBtn.attr('data-pid');
			if(pid) this.getData(op,pid);
		},
		setItemPageFavor:function(){
			var pid = Base.url.findUrlPid();
			if(pid) this.elFavorBtn.attr('data-pid', pid);
			return this;
		},
		changeFavorState:function(e){
			var el = $(e.currentTarget);
			var op = el.hasClass('isFavor') ? 2:1;
			var pid = el.attr('data-pid');
			if(pid) this.getData(op,pid);
		},
		getData: function(opera, productId) {
			
			// $.extend(this.pageParams, params);
			this.pageParams.op = opera;
			this.pageParams.pid = productId;
			this.pageParams._ = new Date() - 0;
			if(!this.buttonLock){
				$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
				this.buttonLock = true;
			}
		},
		getDataBack: function(result) {
			var list,
				o;
			var pid = this.pageParams.pid;
			var curBtn = this.el.find('.j-favorinfo[data-pid="'+pid+'"]');

			if (result && result.obj && result.errCode === 0) {
				if(result.obj.favorite){
					curBtn.addClass('isFavor');
					tip.show('收藏成功',{'timeout': 1000});
				}else if(result.obj.delFavorite){
					curBtn.removeClass('isFavor');
					tip.show('已取消收藏',{'timeout': 1000});
				}else if(result.obj.isFavorited){
					curBtn.addClass('isFavor');
				}else{
					tip.show(result.errMsg);
				}
			} else if(result.errCode === 6003){
				// 不作处理
			} else {
				tip.show(result.errMsg);
			} 
			this.buttonLock = false;
		}
	});

	Base.Widget.FavorControl = FavorControl;

})(window.Zepto);