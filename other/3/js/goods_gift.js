(function(){
	function SendGift (){
		this.Obj = $("#js_gotGift");
		this.goodsId = 0;
		this.ini();
	};
	SendGift.prototype.ini = function(){
		var _self = this;

		if(this.Obj){
			this.goodsId = this.Obj.data("goods-id");

			this.Obj.click(function(){
				var $this = $(this);

				if($this.data("isAjax") != 1){
					$this.data("isAjax",1);
					
					layer.load('loading...');
					
					$.get(DOMAIN_USER + '/m-users-a-ajax_get_gift.htm',{"goods_id" : _self.goodsId }, function(data) {
						/*optional stuff to do after success */
						$this.data("isAjax",0);
						layer.closeAll();

						if(data.status == 0){//还没有登录
							_self.showIsNoLogin();

						}else if(data.status == 1){//已经登陆
							var point = 0;
							if(data.point){
								point = data.point;
							}
							_self.gotGift(data.gift,point);

						}else if(data.status == 2){//已经获取了
							_self.canNotGotAgin();
						}
					},'jsonp');
				}
			});
		}
	};
	SendGift.prototype.showIsNoLogin = function(){
		var html = '';
		html += '<div class="giftShowBox">';
		html += 	'<p><img src="'+JS_IMG_URL  +'images/pageimg/special/anniversary_gift/gift_show_3.gif" width="78" height="70"></p>';
		html += 	'<p class="show_tips">'+jsLg.goods_gift.showIsNoLogin+'</p>';
		html += 	'<p class="show_btn fb"><a href="'+HTTPS_LOGIN_DOMAIN+ '/m-users-a-sign.htm?ref='+ window.location.href+'">'+jsLg.ok+'</a></p>';
		html += '</div>';

		GLOBAL.PopObj.openPop({
			page : {html:html}
		})
		
	};
	SendGift.prototype.canNotGotAgin = function(){
		var html = '';
		html += '<div class="giftShowBox">';
		html += 	'<p><img  src="'+JS_IMG_URL  +'images/pageimg/special/anniversary_gift/gift_show_4.gif"  width="78" height="70"></p>';
		html += 	'<p class="show_tips">'+jsLg.goods_gift.canNotGotAgin+'</p>';
		html += 	'<p class="show_btn fb"><a href="javascript:;"  class="xubox_close">'+jsLg.ok+'</a></p>';
		html += '</div>';

		GLOBAL.PopObj.openPop({
			page : {html:html}
		})
	};

	SendGift.prototype.gotGift = function(gift,point){

		var html = '';
		html += '<div class="giftShowBox">';
		if(gift == 1 || gift==2 || gift == 3 ){
			html += 	'<p><img  src="'+JS_IMG_URL  +'images/pageimg/special/anniversary_gift/gift_show_1.gif"  width="128" height="98"></p>';
			html += 	'<p class="show_tips">'+jsLg.goods_gift.gotGift_1+'</p>';
		}else if(gift == 4){
			html += 	'<p><img  src="'+JS_IMG_URL  +'images/pageimg/special/anniversary_gift/gift_show_2.gif"  width="78" height="70"></p>';
			html += 	'<p class="show_tips">'+jsLg.goods_gift.gotGift_2+'</p>';
		}
	
		
		html += 	'<p class="show_btn fb"><a href="javascript:;" class="xubox_close">'+jsLg.ok+'</a></p>';
		html += '</div>';
		GLOBAL.PopObj.openPop({
			page : {html:html}
		});

		if(gift == 1 || gift==2 || gift == 3){
			$("#js_gotGiftPoint").text(point);
		}
	}
	
	new SendGift();
})();