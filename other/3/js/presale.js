(function() {
	GLOBAL.lazyLoad.scrollLazyLoad(".js_lazy_0");
	// $("#js_tabBox").on("click", ".btn", function() {
	// 	var that = $(this);
	// 	var wrap = that.closest('li');
	// 	var index = wrap.index();

	// 	that.addClass('on');
	// 	wrap.siblings('li').find('.btn').removeClass('on');

	// 	$(".js_block").eq(index).show().siblings('.js_block').hide();

	// 	//图片懒加载
	// 	GLOBAL.lazyLoad.scrollLazyLoad(".js_lazy_" + (index));
	// });
	(function(){
		$.each($(".js_likeBtn"),function(){
			var id = $(this).data('gid');
			console.log($.cookie('tupiao'+id))
			if($.cookie('tupiao'+id)==='yes'){
				$(this).addClass('on');
			}
		})
	})();

	$(".js_likeBtn").on("click", function() {
		var $this = $(this);
		var Jnext = $this.next(".likeNum");

		if (!$this.hasClass('on') && !$this.hasClass('voteEnd')) {
			$this.addClass('on');
			$.get('/fun/index.php?m=index&act=tupiao&gid='+$this.data("gid"));
			Jnext.find("strong").text(Jnext.find("strong").text() - 0 + 1);
		}
	});

	$(".js_help").click(function(event) {
		/* Act on the event */
		GLOBAL.PopObj.openPop({
			offset: [($(window).height() - 210) / 2 + 'px', '50%'],
			page: {
				dom: '#js_popHelp'
			}
		})
	});
})();

(function() {
	GLOBAL.Untime = function($cutBox,cutTime){
		this.timeBox = $cutBox;
		this.cutTime = $cutBox.data("time")
		this._bland = "";
		//this.msec = msec;
		this.ini();
	}
	GLOBAL.Untime.prototype.ini = function(){
		var that = this;
		var a1,a2;
		var cutTime = this.cutTime;
		if($.isNumeric(cutTime)){
			// a1 = cutTime[0].split("/");
			// a2 = cutTime[1].split(":");			
			that.setCutTime(cutTime);
		}	
	}
	GLOBAL.Untime.prototype.n8 = function(n){
		if(n < 10){return "0" + n.toString()};
		return n.toString();
	}
	GLOBAL.Untime.prototype.n3 = function(n){
		if(n < 10){return "00" + n.toString()};
		if(n < 100){return "0" + n.toString()};
		return n.toString();
	}

	GLOBAL.Untime.prototype.setCutTime = function(d){
		var that = this;
		var time_h,tmme_m,time_s,time_ms,time_day;
		var d1 = new Date();
	    //var zone =  d1.getHours()-d1.getUTCHours();
		var n;
		//var daytext = "days"; 
		n = d*1000;

		if(n > 0){
			time_ms = that.n3(n % 1000);
			n = (n - n % 1000) / 1000;
			time_s = that.n8(n % 60);
			n = (n - n % 60) / 60;
			tmme_m = that.n8(n % 60);
			n = (n - n % 60) / 60;
			time_h = that.n8(n % 24);
			n = (n - n % 24) / 24;

			daytext = window.location.href.indexOf('/fr/')> -1 ? 'j' : 'd'; 

			if (n > 0) {
				that.timeBox.html('<span>' + n +'</span> ' + daytext + ' : <span>' + time_h +'</span> h : <span>' + tmme_m +'</span> m : <span>' + time_s +'</span> s')
			} else {
				that.timeBox.html('<span>' + time_h +'</span> h : <span>' + tmme_m +'</span> m : <span>' + time_s +'</span> s')
			}

			that._bland = setTimeout(function(){
				that.setCutTime(d-1)
			}, 1000);
		}else{
			that.timeBox.html("00 : 00 : 00");
			if(that._bland){
				clearTimeout(that._bland);
			}
		}
	}//倒计时对象结束

	
	$.each($("#js_presaleStep2").find('.js_time'), function(index, val) {
		 /* iterate through array or object */
		 new GLOBAL.Untime($(val));
	});

	$("#js_presaleStep2").on("mousemove","li",function(){
		var $this = $(this);
		var preTime = $(this).find('.preTime');
		
		preTime.show();
	});
	$("#js_presaleStep2").on("mouseleave","li",function(){
		var $this = $(this);
		var preTime = $(this).find('.preTime');

		preTime.hide();
	});
	
})();

(function(){
	//上传图片
	$('#js_upPicNow').click(function(){
		var url = $(this).attr('data-href');
		var claBack = function (loginMsg,url){
			if(loginMsg){//如果已经登陆了
				GLOBAL.PopObj.iframe({
					iframe:{src : url},
					area : ['800px','500px'],
					offset : [($(window).height()-500)/2 + 'px' , '50%'],
				});
			}else{
				window.location.href ='/'+ JS_LANG +'m-users-a-sign.htm?ref='+window.location.href;
			}
		}
		
		GLOBAL.login.isLogin(claBack,url);
		
		return false;
	})
})();

(function(){
	function upimg(){
		this.$progress = $("#progress");
		this.$loading = $("#js_loading");
		//this.$precent = $("#precent");
		this.$upFile = $("#outfit_outfit_image");
		this.$upFileWrap = $("#js_upBtnWrap");
		this.$imgWrap = $("#js_imgShow");
		this.$upImgUrl = $("#upImgUrl");
		this.$upmsg	= $("#js_upmsg");

		this.ini();
	}
	upimg.prototype.ini = function(){
		/* body... */
		var that = this;
		
		that.choice();
		
		//取消图片
		$("#js_detIcon").on("click",function(){
			setTimeout(function(){
				that.upImgFail();
			}, 300)
		})
	}
	upimg.prototype.upImgFail = function(){
		var that = this;
		that.$imgWrap.hide();
		that.$upImgUrl.val("");//清空图片地址
		that.$loading.hide();
		that.$upFileWrap.show();
		that.$upFile.val("");
	};
	// upimg.prototype.setProgress = function(){//初始化上传进度
	// 	var that = this;

	// 	this.$progress.progress({
	// 		bgStyle: {
	// 			lineWidth: 4
	// 		},
	// 		fgStyle: {
	// 			lineWidth: 4
	// 		},
	// 		step: .001,
	// 		onprogress: function(p) {
	// 			that.$precent.html((p * 100).toFixed(0) + "%")
	// 		}
	// 	});
	// }
	// upimg.prototype.setProgressIng = function(num){//设定进度
	// 	this.$progress.progress(num);
	// }
	upimg.prototype.showUpimg = function(imgUrl){
		this.$imgWrap.show().html('<img src="'+imgUrl+'" width="100%" >');
		this.$upImgUrl.val(imgUrl);						
	}
	upimg.prototype.choice = function(){//选择图片上传
		var that = this;


		this.$upFile.on("change",function(){
			if($(this).val().length){
				that.$upFileWrap.hide();//隐藏上传按钮

				//$.support.canvas ? (that.$canvas.show(), that.setProgress()) : "";//显示进度
				that.$loading.show();
				
				$(this).upload({
					//action: "/temp/skin_wap/html/upimg.json",
					action:"/fun/?act=upload_pic",
					
					oncomplete: function() {
						//$button.prop("disabled", 0)
					},
					onsuccess: function(json) { 

						if(json.code == 0){//图片上传成功
							
							that.$upmsg.html("");
							that.$loading.hide();
							that.showUpimg(json.pic_list[0].grid_pic);
						}else{
							that.$upmsg.html(json.msg);
							that.upImgFail();
						}
						
					},
					onprogress: function(e) {
						//that.setProgressIng(e.loaded / e.total);

					}
				});
			}

		})
	}

	new upimg();
})();

