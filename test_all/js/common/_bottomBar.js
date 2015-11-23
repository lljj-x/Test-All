/**
 * pager.js
 */
(function($) {

	var BottomBar = Base.klass.create({
		el: '.j-bottom-bar',
		elements: {
			'.j-bb-cart': 'elCart',
			'.j-bb-me': 'elUser'
		},
		tapMap: {
			'home':'.j-bb-home',
			'dutyFree':'.j-bb-dutyFree',
			'directMail':'.j-bb-directMail',
			'cart':'.j-bb-cart',
			'me':'.j-bb-me',
		},
		cgi: {
			userinfo: '/api/user/getSimpleUserInfo.jsp'
		},
		pageParams:{},
		init: function() {
			this.reset();
			this.curTap = '';
			this.coverFrom();
		},
		reset:function(){
			this.el.find('li.option').removeClass('active hasNews');
		},
		render: function() {
		},
		setCurrentTap: function(tapName) {
			this.curTap = tapName;
			var curTap = this.tapMap[this.curTap];
			this.el.find(curTap).addClass('active');
		},
		getUserInfo: function() {

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.userinfo, this.pageParams, this.proxy(this.getUserInfoBack));
		},
		getUserInfoBack: function(result) {
			var o;

			if (result && result.errCode === 0) {

				o = result.obj;

				if (o.noPayCount > 0 || o.noReceiveCount > 0) {
					this.elUser.addClass('hasNews');
				}

				if(o.cartCount > 0){
					this.elCart.addClass('hasNews');
				}

				if (o.g_chan && Number(o.g_chan) > 0){
					$('#FixedSearchBar .rebate-btn').removeClass('hide');
				}
			}
		},
		coverFrom: function() {
			var href = this.elUser.find('a').attr('href');
			var sourceurl = Base.url.param('sourceurl') || encodeURIComponent(location.href);
			var tranHref = href+'?sourceurl='+sourceurl;
			this.elUser.find('a').attr('href', tranHref);
		}
	});

	Base.Widget.BottomBar = BottomBar;

})(window.Zepto);