/**
 * user
 */
(function($) {

	var Setting = Base.klass.create({
		events: {
			'click .j-act-logout': 'logOut'
		},
		logOut: function() {
			Base.cookie('sid', null);
			window.location.href = '/';
		}
	});

	var setting = new Setting({
		el : '.lg-btn-wrap'
	});

	var isWeixin = Base.Browser.type === 'weixin';

	if(isWeixin){
		$('.j-retrievepassword').addClass('hide');
	}

})(window.Zepto);