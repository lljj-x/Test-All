(function(){
	$('#js_voiceLis').flexslider({
	 	namespace:"",
	    animation: "slide",
	    selector: ".slides > li",
	    direction: "vertical",
	    pauseOnAction:false,
	    controlNav:false,
	    slideshowSpeed: 5000
	});	

	$(".guessBox").on("click","span",function(){
		var that = $(this);
		var goodsId = that.parents().data('goodsid');
		var num = that.text();

		$.get('/m-lucker-a-guess.html',{num:num,goodsId:goodsId},function(data) {//返回的数据{state:1,num:5}
			
			if(data.state != 1 && data.state !=3){ 
				$("#js_luckNum"+goodsId).html(data.num);
			}
			openPop(data.state,that);
		},'json');
	})

	function openPop(num,that){ 
		var obj = that;
		var html ="";
		switch(parseInt(num,10)){
			case 1 :
				html = '<div id="lucker_popBox"><i class="icon st_1"></i><h4>Sorry</h4><p>you need to log in or register before guessing the price.</p><a href="/m-users-a-sign.htm?ref='+window.location.href+'">Ok</a></div>';
				break;
		
			case 2: 
				html = '<div id="lucker_popBox"><i class="icon st_2"></i><h4>Sorry</h4><p>your answer is wrong, please view the other items and try again.</p><a href="javascript:void(0)" class="xubox_close_ok">Ok</a></div>';
				obj.closest(".opreal").html('<div class="already">You already guessed</div>');
				break;

			case 3:
				html = '<div id="lucker_popBox"><i class="icon st_3"></i><h4>Sorry</h4><p>you have already guessed three times. Thanks for playing!</p><a href="javascript:void(0)" class="xubox_close_ok">Ok</a></div>';
				
				break;
			case 4:
				html = '<div id="lucker_popBox"><i class="icon st_4"></i><h4>Congratulations!</h4><p>You’ve guessed correctly! You’ve won a 10% OFF coupon. The coupon code is: <strong>LUCKY</strong></p><a href="javascript:void(0)" class="xubox_close_ok">Ok</a></div>';
				obj.closest(".opreal").html('<div class="win">You already guessed</div>');
				break;
			case 5:
				html = '<div id="lucker_popBox"><i class="icon st_5"></i><h4>Congratulations!</h4><p>You guessed correctly! guess it! You have won the Third prize: $5 cash coupon. The coupon code is: <strong>SAMMY5</strong></p><a href="javascript:void(0)" class="xubox_close_ok">Ok</a></div>';
				obj.closest(".opreal").html('<div class="win">You already guessed</div>');
				break;
			case 6:
				html = '<div id="lucker_popBox"><i class="icon st_6"></i><h4>Congratulations!</h4><p>You guessed the correct number! You’ve won the Second Prize of <strong>500 S Points</strong>!</p><a href="javascript:void(0)" class="xubox_close_ok">Ok</a></div>';
				obj.closest(".opreal").html('<div class="win">You already guessed</div>');
				break;
			case 7:
				html = '<div id="lucker_popBox"><i class="icon st_6"></i><h4>Congratulations!</h4><p>you have just won the Grand Prize, a $50 cash coupon prize. The coupon code is: <strong>LUCKY50</strong></p><a href="javascript:void(0)" class="xubox_close_ok">Ok</a></div>';
				obj.closest(".opreal").html('<div class="win">You already guessed</div>');
				break;
		}


		var pagei = $.layer({
		    type: 1,   //0-4的选择,
		    title: false,
		    border: [0],

		    shadeClose: true,
		    area: ['365px', '320px'],
		    page: {
		        html: html //此处放了防止html被解析，用了\转义，实际使用时可去掉
		    }
		});

		$('body').on('click','.xubox_close_ok',function(){
			layer.close(pagei);
		})
	}


})()