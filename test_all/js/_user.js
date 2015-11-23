/**
 * user
 */
(function($) {

	var tip = new Base.Widget.Tip();

	var User = Base.klass.create({
		elements: {
			'.j-text-username': 'elUserName',
			'.j-text-integral': 'elIntegral',
			'.j-nav-wait-pay': 'elNavWaitPay',
			'.j-nav-wait-delivery': 'elNavDelivery',
			'.j-text-cartnum': 'elCartNum',
			'.j-user-avater': 'elUserAvater',
			'.j-wait-pay': 'elWaitPay',
			'.j-wait-delivery': 'elWaitDelivery',
			'.j-act-checkin': 'elActCheckin'
		},
		events: {
			'click .j-act-logout': 'logOut',
			'click .j-act-checkin': 'checkIn'
		},
		cgi: {
			userinfo: '/api/user/userCenter.jsp'
		},
		pageParams:{
		},
		init: function() {
			this.defaultHeadImg = '/img/app2/userDefaultAvater.jpg';
			this.getUserInfo();
		},
		getUserInfo: function() {
			
			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.userinfo, this.pageParams, this.proxy(this.getUserInfoBack));
		},
		getUserInfoBack: function(result) {
			var o, headImg;

			if (result && result.errCode === 0) {

				o = result.obj;

				this.elUserName.text(o.nickname);

				if(o.g_chan && Number(o.g_chan) > 0){
					this.elActCheckin.removeClass('hide');
				}

				if(o.noDealCount){
					this.elWaitPay.addClass('has-new');
				}

				if(o.noReceiveCount){
					this.elWaitDelivery.addClass('has-new');
				}
				// o.noPayCount > 0 && this.elNavWaitPay.addClass('new').find('.icon-new').text(o.noPayCount);
				// o.noReceiveCount > 0 && this.elNavDelivery.addClass('new').find('.icon-new').text(o.noReceiveCount);
				// this.elCartNum.text(o.cartCount);

				this.elIntegral.text(o.point);
				headImg = o.headImg ? o.headImg : this.defaultHeadImg;
				this.elUserAvater.attr('src', headImg);
			}
		},
		logOut: function() {
			Base.cookie('sid', null);
			window.location.href = '/';
		},
		checkIn: function() {
			$.ajax({
                type: 'POST',
                url: '/api/user/signOn.jsp',
                data: {op:1},
                dataType: 'json',
                timeout: 5000,
                success: function(data) {
                	if(data && data.errCode === 0){
                		tip.show('签到成功');
                		if(data.obj && data.obj.point){
                			var point = Number(data.obj.point);
                			var integral = $('.userinfo .j-text-integral');
                			var curPoint = Number(integral.text());
                			if(!isNaN(point) && !isNaN(curPoint)){
                				integral.text(point + curPoint);
                			}
                		}
                	}else{
                		tip.show(data.errMsg);
                	}

                    return false;
                },
                error: function(xhr, type) {
                	tip.show('签到未能完成，请稍后再试');
                    return false;
                }
            });
		}
	});

	new User();

	bottomBar = new Base.Widget.BottomBar();
	bottomBar.setCurrentTap('me');
	bottomBar.getUserInfo();

})(window.Zepto);