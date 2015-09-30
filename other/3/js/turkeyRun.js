(function(){
	$('#js_voiceLis').flexslider({
	 	namespace:"",
	    animation: "slide",
	    selector: ".slides > li",
	    direction: "vertical",
	    pauseOnAction:false,
	    controlNav:false,
        directionNav:false,
	    slideshowSpeed: 4000
	});	
	// $('.js_shareList').flexslider({
	//  	namespace:"",
	//     animation: "slide",
	//     selector: ".slide > li",
	//    	itemWidth: 130,
	//     pauseOnAction:false,
	//     controlNav:false,
	//     directionNav:false,
	//     reverse: false,
	//     animationLoop:true,
	//     move:1,
	//     minItems: 2,
	// 	maxItems: 6,
	//     slideshowSpeed: 3000

	// });

	
})($);

(function(){
	/**
	    Scroll对象
	    @param options； 
	        options = {
	            scrollWrapId:String, //滚动列表ul父级Id
	            privId:String, //向前滚动的button Id
	            nextId:String, //向后滚动的button Id
	            setTime:Number, //滚动时间,默认为15毫秒
	            waitTime:Number,//停顿时间，默认为1000毫秒
	            autoScroll:Bool //是否开器自动滚动，默认关闭
	        }
	*/
	function ScrollBox(options) {
	    this.scrollWrap = document.getElementById(options.scrollWrapId);
	    this.scrollWrapUl = document.getElementById(options.scrollWrapId).getElementsByTagName("ul")[0];
	    this.prevElm = document.getElementById(options.prevId);
	    this.nextElm = document.getElementById(options.nextId);
	    this.len = document.getElementById(options.scrollWrapId).getElementsByTagName("li").length;
	    this.index = 0;
	    this.vis = options.vis;
	    this.setTime = options.setTime || 15;
	    this.waitTime = options.waitTime || 1000;
	    this.autoScroll = options.autoScroll || false;
	    this.scrllFlag = 0;

	};

	//flag=="left"，向前滚动；flag=="right"，向后滚动;
	ScrollBox.prototype.setScrollFun = function(flag) {
	    var that = this,
	        len = that.len,
	        scrollFistLi = that.scrollWrapUl.getElementsByTagName("li")[0],
	        scrollLastLi = that.scrollWrapUl.getElementsByTagName("li")[len-1],
	        marginLeft = that.getStyle(scrollFistLi,"marginLeft") ? that.getStyle(scrollFistLi,"marginLeft") : 0,
	        marginRight = that.getStyle(scrollFistLi,"marginRight") ? that.getStyle(scrollFistLi,"marginRight") : 0,
	        scrollW = scrollFistLi.offsetWidth + parseInt(marginLeft,10)  + parseInt(marginRight,10),
	        _blank;
	        
	    if(that.scrllFlag != 0 ){return false;}//如果任务还在执行中，不可执行下次任务

	    if( flag == "left" ) {
	        _blank = setInterval(function(){
	            that.scrllFlag = that.scrllFlag + scrollW/that.setTime;

	            if(that.scrllFlag <= scrollW){
	                that.scrollWrapUl.getElementsByTagName("li")[0].style.marginLeft = "-" + that.scrllFlag+"px";
	            }else{
	                that.scrllFlag = 0;
	                
	                that.scrollWrapUl.removeChild(scrollFistLi);
	                
	                that.scrollWrapUl.appendChild(scrollFistLi);

	                scrollFistLi.style.marginLeft = marginLeft;
	                
	                clearInterval(_blank);
	            }
	            
	        },that.setTime)
	    }

	    
	    if( flag == "right" ) {
	        that.scrllFlag = 0 - scrollW;
	        that.scrollWrapUl.removeChild(scrollLastLi);
	        scrollLastLi.style.marginLeft = that.scrllFlag+"px";
	        that.scrollWrapUl.insertBefore(scrollLastLi, scrollFistLi);
	        _blank = setInterval(function(){
	            that.scrllFlag =  that.scrllFlag +  scrollW/that.setTime;
	            if(that.scrllFlag <= parseInt(marginLeft,10)){
	                that.scrollWrapUl.getElementsByTagName("li")[0].style.marginLeft = that.scrllFlag+"px";
	            }else{
	                that.scrllFlag = 0;
	                that.scrollWrapUl.getElementsByTagName("li")[0].style.marginLeft = marginLeft;
	                clearInterval(_blank);
	            }
	        },that.setTime)

	    }

	};

	/**
	    计算元素样式
	    @param elem 要计算样式的元素，dom对象或字符串（id 号）
	    @param pro 要获取的样式属性，这个字符串是驼峰型的，如marginLeft而不是margin-left;
	*/
	ScrollBox.prototype.getStyle = function(elem,pro){
	    elem = ('String' == typeof elem) ? document.getElementById(elem) : elem;

	    if(!elem) { return null;}

	    if(elem.style[pro]) {//内联
	        return elem.style[pro];
	    }else if(elem.currentStyle){//IE
	        return elem.currentStyle[pro];
	    }else if(window.getComputedStyle){//w3c标准
	        return window.getComputedStyle(elem,null)[pro];

	    }else if(document.defaultView && document.defaultView.getComputedStyle){//ff,chorme等
	        pro = pro.replace(/([A-Z])/g,"-$1"); //如marginLeft 转为margin-Left
	        pro = pro.toLowerCase(); //在转为小写margin-left
	        var s =  document.defaultView.getComputedStyle(ele,"");
	        return s && s.getPropertyValue(pro);
	    }

	};

	/**
	    计算元素样式
	    @param elem 要设置样式的元素，dom对象或字符串（id 号）
	    @param blockW 要滚动元素的宽度
	    @param vis 可见的几个元素
	*/
	ScrollBox.prototype.setDefault = function(elem,blockW,vis){
	    elem = ('String' == typeof elem) ? document.getElementById(elem) : elem;

	    var boxWidth = blockW*vis;
	    elem.style.cssText = "overflow:hidden;width:"+boxWidth+"px;"
	};

	ScrollBox.prototype.ini = function(){
	    var that = this,
	        len = that.len,
	        scrollFistLi = that.scrollWrapUl.getElementsByTagName("li")[0];
		
	    var scrollLastLi = that.scrollWrapUl.getElementsByTagName("li")[len-1],
	        marginLeft = that.getStyle(scrollFistLi,"marginLeft") ? that.getStyle(scrollFistLi,"marginLeft") : 0,
	        marginRight = that.getStyle(scrollFistLi,"marginRight") ? that.getStyle(scrollFistLi,"marginRight") : 0,
	        scrollW = scrollFistLi.offsetWidth + parseInt(marginLeft,10)  + parseInt(marginRight,10);
	    var _blank;

	    that.setDefault(that.scrollWrap,scrollW,that.vis);
	    that.setDefault(that.scrollWrapUl,scrollW,that.len);

	    if(that.prevElm){
	    	that.prevElm.onclick = function(){
	    	    clearScroll(_blank);
	    	    that.setScrollFun("left");
	    	};
	    }
	    
	    if( that.nextElm){
	    	that.nextElm.onclick = function(){
	    	    clearScroll(_blank);
	    	    that.setScrollFun("right");
	    	};
	    }
	    

	    if(that.autoScroll){

	        function autoScroll(){
	          return setInterval(function(){that.setScrollFun("right");}, that.waitTime)
	        }
	        function clearScroll(srcollId){
	            clearInterval(srcollId);
	        }

	         _blank = autoScroll();

	        that.scrollWrapUl.onmouseover = function(){
	            clearScroll(_blank);
	        };

	        

	        that.scrollWrap.onmouseleave = function(){
	            _blank = autoScroll();
	        };
	        if(that.prevElm){
		        that.prevElm.onmouseenter = function(){
		             clearScroll(_blank);
		        };
		         that.prevElm.onmouseout = function(){
		             _blank = autoScroll();
		        };
		    }
		    if(that.nextElm){
		        that.nextElm.onmouseover = function(){
		             clearScroll(_blank);
		        };
		        that.nextElm.onmouseout = function(){
		             _blank = autoScroll();
		        };
		    }
	    }

	};
	if($("#js_turkeyList").find('li').length > 6){
		var brandsScroll = new ScrollBox({
			"scrollWrapId":"js_turkeyList",
			"prevId":"",
			"nextId":"",
			"vis":6,
			"autoScroll":true,
			"waitTime":5000
		});
	    brandsScroll.ini();
	}
	
	if($("#js_tweedyList").find('li').length > 6){
	    var brandsScroll = new ScrollBox({
			"scrollWrapId":"js_tweedyList",
			"prevId":"",
			"nextId":"",
			"vis":6,
			"autoScroll":true,
			"waitTime":7000
		});
		brandsScroll.ini();
	}
    

})($);

(function(){
	/**
	 * 倒计时对象
	 * @param {jquery 对象} $cutBox 用来显示倒计时的容器
	 * @param {String} cutTime 记录结束时间的，如 “02/12/2013 08:59:59 AM”
	 * @param {Number} msec 是否显示毫秒，1不显示，0或者不填显示
	 */
	GLOBAL.Untime = function($cutBox,cutTime,msec){
		this.timeBox = $cutBox;
		this.cutTime = cutTime;
		this._bland = "";
		this.msec = msec;
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
		var daytext = "days"; 
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

			daytext = n > 1 ? "days" : "day";

			if(this.msec == 1 ){
				if(n > 0){
					that.timeBox.html(n+"<span> "+ daytext +" </span>"+time_h+":"+tmme_m+":"+time_s)
				}else{
					that.timeBox.html(time_h+":"+tmme_m+":"+time_s)
				}
				
			}else{
				if(n>0){
					that.timeBox.html(n+"<span> "+ daytext +" </span>"+time_h+":"+tmme_m+":"+time_s+":"+time_ms)
				}else{
					that.timeBox.html(time_h+":"+tmme_m+":"+time_s+":"+time_ms)
				}
			}
			that._bland = setTimeout(function(){
				that.setCutTime(d-1)
			}, 1000);
		}else{
			window.reload();
			that.timeBox.html("00 : 00 : 00");
			if(that._bland){
				clearTimeout(that._bland);
			}
		}
	}//倒计时对象结束


var Turkey = {
	userInfo : {
		islogin : 1,
		team : 1,
		shareNum:0

	},

	ini : function(){
		var that = this;
		that.getUserInfo();
		that.choiceTeam();
		that.hideSlide();
		that.facebookLink();
		that.twitterLink();
		that.sharePro();
		that.chagneNum();//更改支持数字
		that.showSideBar();
		that.shareResult();

		setTimeout(function(){//每隔三分钟更新下
     		that.chagneNum();//更改支持数字
		}, 300000)
	},

	facebookLink : function(){
		//facebook 
	    window.fbAsyncInit = function() {
	        FB.init({
	          appId      : '1406009852948446',
	          xfbml      : true,
	          version    : 'v2.1'
	        });
	    };
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	},

	shareFaceBook:function(link,goodsid){
		var that = this;

		FB.ui({
       	  method: 'share',
       	  name: 'Facebook Dialogs',
       	  href: link
       	 
       	},function(response) {
       		if (response && !response.error_code){//分享成功了
       			that.sharefn(goodsid);
       		} 
       });
	},

	twitterLink : function(){
		var that = this;

		window.twttr = (function (d, s, id) {
		  var t, js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src= "https://platform.twitter.com/widgets.js";
		  fjs.parentNode.insertBefore(js, fjs);
		  return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
		}(document, "script", "twitter-wjs"));

		twttr.ready(function (twttr) {
	
			twttr.events.bind(
			  'tweet',
			  function (event) {
			    that.sharefn(that.goodsid);
			  }
			);
		 
		});
	},
	sharefn : function(goodsid){
		var that = this;

		if(that.userInfo.shareNum < 4 ){//如果分享次数没有超过五次
			$.get('m-turkey.html?act=start_game',{goodsid:goodsid}, function(data) {//{status:1,isend:1,helpnum:20,shareNum:2,code:"TURKEYRUN",nextGame:"5",cutTime:"19565656"}
				/*optional stuff to do after success */

				that.userInfo.shareNum = data.shareNum;

				if (data.status==1) {

					that.chagneNum();//更改支持数字

					if(data.isend == 1){
						$(".js_nextGame").text(data.nextGame);
						


						if(data.win_team == 1){
							GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_gameover_turkey_pop"},
								end: function(){
									that.getUserInfo();
								}
							});
						}else if(data.win_team == 2){
							GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_gameover_tweedy_pop"},
								end: function(){
									that.getUserInfo();
								}
							});
						}
						
					}else{
						$("strong.js_helpnum").text(data.helpnum);


						if($.trim(data.code).length){//如果获取了coupon码
							$(".js_codeCouponWarp").show();
							$(".js_codeCouponWarp").find("strong.js_codeCoupon").text(data.code);
							$(".js_codeCouponWarp").find("strong.js_codeCouponoff").text(data.off+"%"+" OFF");
						}else{
							$(".js_codeCouponWarp").hide();
						}
					

						if(that.userInfo.team == 1){
							GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_shareOk_turkey_pop"}});

						}else if(that.userInfo.team == 2){
							GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_shareOk_tweedy_pop"}});
						}
					
					}
					
				}else if(data.status==0){
					window.reload();
				};

			},"json");
		}else{
			if(that.userInfo.team == 1){
				GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_maxShare_turkey"}});

			}else if(that.userInfo.team == 2){
				GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_maxShare_turkey"}});
			}
			
			//alert("小样你分享的次数超过5次了")
		}
	},
	chagneNum : function(){
		$.get('m-turkey.html?act=get_num', function(data) { //{status:1,turkeynum:200,tweedynum:0}
			/*optional stuff to do after success */
			if(data.status==1){
				$("#js_tweedyTeamNumBox").text(data.tweedynum);
				$("#js_turkeyTeamNumBox").text(data.turkeynum);
			}
			
		},'json');
	},
	// isLogin : function(fn,options){

	// 	var that = this;
	// 	var ops = {fn:fn,options:options}

	// 	if(!that._islogin){//如果没有登录异步判断是否登录
	// 		GLOBAL.login.isLogin(function(msg,ops){
	// 			var fn,options;

	// 			if(ops){
	// 				fn = ops.fn;
	// 				options = ops.options;
	// 			}
				

	// 			if(msg){
	// 				that._islogin = 1;//记录登录状态
					

	// 				if(fn){
	// 					fn(options);//执行回调函数
	// 				}
					
	// 			}else{
	// 				if(fn){
	// 					window.location.href = HTTPS_LOGIN_DOMAIN + "/" + JS_LANG + "m-users-a-sign.htm?ref="+window.location.href;
	// 				}
					
	// 			}
	// 		})
	// 	}else{
			

	// 		if(fn){
	// 			fn(options);//执行回调函数
	// 		}
	// 	}
		
	// },
	/**
	 * //如果用户登录了，就请求用户数据,同步的
	
	 */
	getUserInfo:function(){
		var that = this;

		$.ajax({
			url: 'm-turkey.html?act=get_user',
			type: 'GET',
			async:false,
			dataType: 'json'
		})
		.done(function(data) {//{"status":1,islogin":1,"team":1,"shareNum":3}
			
			if(data.status){
				that.userInfo.islogin = data.islogin;
				that.userInfo.team = data.team;
				that.userInfo.shareNum = data.shareNum;
				
				if(data.game_is_end == 1){
					var Timecut = new GLOBAL.Untime($(".js_waintcutTime"),data.cuttime,1);
						Timecut.ini();

					
						GLOBAL.PopObj.openPop({bgcolor : 'none',shadeClose:0,closeBtn:0,border : 0,page : {dom:"#js_waintNextGame"}});
				}
			}
			
		})
		
		
	},
	slideFun : function(Jwarp){
		Jwarp.find('.js_proList').flexslider({
		 	namespace:"",
		    animation: "slide",
		    selector: ".slide > li",
		   	itemWidth: 153,
		   	slideshow: true,
		    pauseOnAction:false,
		    controlNav:false,
		    directionNav:true,

		    minItems: 6,
			maxItems: 6,
		    slideshowSpeed: 7000

		});	
	},
	//设定为一个队伍
	setTeam : function(team){

		this.userInfo.team ? "" : this.userInfo.team = team,$.get('m-turkey.html?act=select_team', {team: team});

		if(this.userInfo.team == 1){
			$("#js_maxShare").addClass('turkey_pop');
		}else if(this.userInfo.team == 2){
			$("#js_maxShare").addClass('tweedy_pop');
		}

	},
	choiceTeam : function(){//选择队伍

		var that = this;

		$(".js_choiceTeam").on("click",function(){

			var JslideBox = $($(this).data("targetbox"));
			var team = $(this).data("team");
			
			if(JslideBox.is(":visible")){
				return false;
			}

			if(that.userInfo.islogin == 1 ){//如果已经登陆了

				
				if(that.userInfo.team == 0){
					that.userInfo.team == team;
				}
				
				that.setTeam(team);

				if(that.userInfo.team != team){//如果已经选择队伍了，就不能在换队伍了

					GLOBAL.PopObj.openPop({bgcolor : 'none',border : 0,page : {dom:"#js_hasChoiceTeam"}});
					//alert("你已经选择帮助某某了，这一局游戏结束前不能更改队伍")
					return false;
				}
				

				if(!JslideBox.hasClass('.direction-nav')){//商品添加滚动插件
					that.slideFun(JslideBox);
				}
				//商品显示
				JslideBox.show();
				
			}else{
				window.location.href = HTTPS_LOGIN_DOMAIN + "/" + JS_LANG + "m-users-a-sign.htm?ref="+window.location.href;
				
			}

			// that.isLogin(function(options){//先要登录才能继续
			// 	var op = options;

			// 	if(!op.JslideBox.hasClass('.direction-nav')){//商品添加滚动插件
			// 		Turkey.slideFun(op.JslideBox);
			// 	}
			// 	//商品显示
			// 	op.JslideBox.show();


			// },{JslideBox:JslideBox})

			
		});
	},
	hideSlide : function(){
		$(".js_upRow2").on("click",function(){
			var JslideBox = $(this).closest('.row2');

			JslideBox.hide();
		})
	},
	sharePro : function(){
		var that = this;

		$(".js_proList").on("click","a",function(){
			var $this = $(this);
			var targetParent = $this.closest('p');

			var link = targetParent.data("link"),
				desc = targetParent.data("desc");
				that.goodsid =  targetParent.data("goodsid");

			if($this.hasClass('shareFb')){
				that.shareFaceBook(link,that.goodsid);

			}else if($this.hasClass('shareTwitter')){
				// var iWidth=650;                          //弹出窗口的宽度;
				// var iHeight=500;                        //弹出窗口的高度;
				// var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
				// var iLeft = (window.screen.availWidth-10-iWidth)/2;        //获得窗口的水平位置;

				// url = 'https://twitter.com/share?url='+encodeURIComponent(link)+'&text='+desc;
				// window.open(url,'', 'width='+iWidth+',height='+iHeight+',top='+iTop+',left='+iLeft);
			}
			//return false;
		})
	},
	shareResult	: function(){
		$(".js_shareResult").on("click",function(){
			FB.ui({
	       	  method: 'share',
	       	  name: 'Facebook Dialogs',
	       	  href: window.location.href
	       	 
	       	},function(response) {
	       		layer.closeAll();
	       });
		})
	},
	showSideBar : function(){
		var _bland = null;
		$("#js_mui-barTag").on("click",function(){
			if(_bland){
				clearTimeout(_bland);
			}
			var Jbar = $("#js_mui-mbar");

			if(Jbar.hasClass('hover')){
				Jbar.animate({"right":"-280px"}, 500);
			}else{
				Jbar.animate({"right":0}, 500);
			}
			Jbar.toggleClass('hover');
		}).trigger('click');

		_bland = setTimeout(function(){
			
			$("#js_mui-barTag").trigger('click')
		}, 8000);

	    $("#js_mui-mbar").on("click",function(e){
	     	return false;
	    });
	    $("body").on("click",function(){
	    	if(_bland){
	    		clearTimeout(_bland);
	    	}
	    	var Jbar = $("#js_mui-mbar");

	    	if(Jbar.hasClass('hover')){
	    		Jbar.animate({"right":"-280px"}, 500);
	    		Jbar.removeClass('hover');
	    	}
	    })
	}

} 

Turkey.ini();
})($)


