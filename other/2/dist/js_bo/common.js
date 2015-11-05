// JavaScript Document
//定义空间命名
window.GLOBAL ={};

//*********************************************************************邮件验证
GLOBAL.checkmail=function(Email){
    var pattern=/^[\w][\.\w_-]+[\w]@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    var flag=pattern.test(Email);
    if (flag){
        return true;
    }else{
        return false;
    }
};

//*********************************************************************图片懒加载
GLOBAL.lazyLoad = {
    scrollLazyLoad : function(selectBox){
        var $selectBox = $(selectBox);

        $selectBox.lazyload({
            threshold : 100,
            effect: "fadeIn",
            failure_limit : 60,
            skip_invisible : false
        });
    }
};

//*********************************************************************搜索相关
GLOBAL.Search = function(sKeyword,sCatgory){
    var reg = /[^\w\.]/g,
        $keyword = sKeyword,
        $category = sCatgory,
        kw,cat_id;

        kw  = $.trim($keyword.val());
        kw  = kw.replace(/\*/g,'~~');
        kw  = kw.replace(/\|/g,']]');
        kw  = kw.replace(/\=/g,'((');
        kw  = kw.replace(/\"/g,' ');
        kw  = kw.replace(/\</g,'))');
        kw  = kw.replace(/\>/g,')))');
        kw  = kw.replace(/\?/g,'!!!');
        kw  = kw.replace(/\+/g,'__');
        kw  = kw.replace(/\-/g,'^^');
        kw  = kw.replace(/\//g,'..');
        kw  = kw.replace(/\\/g,'...');
        kw  = kw.replace(/\%/g,'!!');
        kw  = kw.replace(/\#/g,'~~~');
        kw  = kw.replace(/\>/g,'___');
        kw  = kw.replace(/\</g,'^^^');
        kw  = kw.replace(/\"/g,'[[');
        kw  = kw.replace(/\$/g,'[[[');
        kw  = kw.replace(/\s+/g, "-");
        kw = kw.toLowerCase();
        kw = kw.replace(/\b\w+\b/g, function(word){
            return word;
        });
    if (kw.length < 1){
                       
        $keyword.focus();
    }else{
        kw = kw.replace('%20','-');
        cat_id = $category.val();
        /*
        if(cat_id == '0'){
            window.location.href = '/index.php?m=search&k='+kw;
        }else{
            window.location.href = '/index.php?m=search&k=' + kw + '&b=' + cat_id;
        }
        */
        // window.location.href = '/cheap/' + kw + '/';
        
        window.location.href = DOMAIN + '/s/' + kw + '/';
    }
    return false;
};

//*********************登陆相关
GLOBAL.login={
    /*  检测用户是否登陆
    @param      {function}     检测完成回调函数
    */
    info_check : function(callBack){
        $.ajax({
            url: DOMAIN + '/fun/?act=info_check',
            type: 'POST',
            dataType: 'json'
        })
        .done(function(data) {
            //data 返回{firstname:用户名,cart_items:购物车数量}，如果firstname为空，表示没有登录
            // data = {"firstname":"张三","cart_items":2};
            var firstname = data.firstname,
                cart_itemsNum = data.cart_items;

            var $isLogin = $(".isLogin"),
                $isNotLogin = $(".isNoLogin"),
                $js_topCartNum = $("#js_topCartNum"),
                $js_leftCartNum = $("#js_leftCartNum");

            //是否登录
            if(firstname){
                $isNotLogin.hide();
                $isLogin.show();
                $isLogin.find(".js_userName").html(firstname);
            }else{
                $isNotLogin.show();
                $isLogin.hide();
            }

            //购物车数量
            if(cart_itemsNum){
                $js_topCartNum.html(cart_itemsNum);
                $js_leftCartNum.html(cart_itemsNum);
            }

            if(callBack && typeof(callBack)=='function'){
               callBack(data);
            }
        });
        
    },
    isLogin:function(){
        $("#isNoLogin").hide();
        $("#isLogin").show();
    }
};

//*********************购物车相关
GLOBAL.cart={
    // 20151026 -liu 重写所有购物车相关操作，合并代码 精简方法
    /**
     * 完整购物车 可区分min 和cart 页面
     * @param call
     */
    getCartObj : function (call) {
        if(typeof(CART) == "undefined"){
            $LAB.script("cart.min.js?2015101002")
                .wait(function () {
                    call.call(CART);
                })
        }else{
            call.call(CART);
        }
    },

    /**
     * 显示min 购物车
     */
    showMinCart : function (result) {
        var self = this;
        var $minCart = $("#js_minCart"),
            minCartIsEmpty = !($minCart.children().length > 0);
        clearTimeout(self.minCartTimer);
        $minCart.stop(true,true).fadeIn(300);
        self.minCartTimer = setTimeout(function () {
            if(! $minCart.hasClass("mouse-over") && !$("#js_topCartBtn").hasClass("mouse-over")){
                $minCart.stop(true,true).fadeOut(300);
            }else{
                // 不想重写 直接递归
                self.showMinCart();
            }
        },4000);

        if(minCartIsEmpty || result != undefined) {
            this.updateMinCart(result);
        }
    },

    /**
     * 更新min购物车，需要依赖 CART 对象
     * @param result
     */
    updateMinCart: function (result) {
        this.getCartObj(function () {
            this.init(true,'js_minCart',result);
        });
    },
    
    cartItems:function(){
        // 不敢删..
    },

    /**
     * 获取购物车数量按钮并缓存
     * @returns {*|jQuery|HTMLElement}
     */
    getGoodsNumInput : function () {
        (this.goodsNumInput == undefined) && (this.goodsNumInput = $("#js_qty"));
        return this.goodsNumInput;
    },

    /**
     * 获取加入购物车按钮并缓存
     * @returns {*|jQuery|HTMLElement}
     */
    getAddToCartBtn : function () {
        (this.addToCartBtn == undefined) && (this.addToCartBtn = $("#js_addCart"));
        return this.addToCartBtn;
    },

    /**
     *　获取顶部Fixed加入购物车按钮并缓存
     * @returns {*|jQuery|HTMLElement}
     */
    getFixedAddToCartBtn : function () {
        (this.fixedAddToCartBtn == undefined) && (this.fixedAddToCartBtn = $("#js_aAddCart"));
        return this.fixedAddToCartBtn;
    },

    /**
     * 获取立即购买按钮并缓存
     * @returns {*|jQuery|HTMLElement}
     */
    getBuyNowBtn : function () {
        (this.buyNowbtn == undefined) && (this.buyNowbtn = $("#js_buyBtn"));
        return this.buyNowbtn;
    },

    /**
     * 获取Fixed立即购买按钮并缓存
     * @returns {*|jQuery|HTMLElement}
     */
    getFixedBuyNowBtn : function () {
        (this.fixedBuyNowbtn == undefined) && (this.fixedBuyNowbtn = $("#js_aBuyBtn"));
        return this.fixedBuyNowbtn;
    },

    /**
     * 获取提示1
     * @returns {*|jQuery|HTMLElement}
     */
    getOverAmountTip1 : function () {
        (this.overAmountTip1 == undefined) && (this.overAmountTip1 = $("#js_overAmountTip_1"));
        return this.overAmountTip1;
    },

    /**
     * 获取提示2
     * @returns {*|jQuery|HTMLElement}
     */
    getOverAmountTip2 : function () {
        (this.overAmountTip2 == undefined) && (this.overAmountTip2 = $("#js_overAmountTip_2"));
        return this.overAmountTip2;
    },

    /**
     * 获取当前价格
     */
    getGoodsPrice : function () {
        // 获取商品价格
        (this.goodsPrice == undefined) && (this.goodsPrice = $("#js_currentPrice").attr("value") - 0);
        return this.goodsPrice;
    },

    /**
     *  获取需要更新相同操作按钮 合集
     */
    getGoodsBtnCollection: function () {
        return this.getAddToCartBtn().add(this.getBuyNowBtn()).add(this.getFixedAddToCartBtn()).add(this.getFixedBuyNowBtn());
    },

    /**
     * 设置提示信息
     * @param currentGoodsPrice
     */
    setStatusMsg: function (currentGoodsPrice) {
        // 待修改 。。
        if(currentGoodsPrice > 500 && currentGoodsPrice < 1000){
            this.getOverAmountTip1().show();
            this.getOverAmountTip2().hide();
            this.getBuyNowBtn().removeClass('disabled');
            this.getFixedBuyNowBtn().removeClass('disabled');
        }else if(currentGoodsPrice > 1000){
            this.getOverAmountTip1().hide();
            this.getOverAmountTip2().show();
            this.getBuyNowBtn().addClass('disabled');
            this.getFixedBuyNowBtn().addClass('disabled');
        }else{
            this.getOverAmountTip1().hide();
            this.getOverAmountTip2().hide();
            this.getBuyNowBtn().removeClass('disabled');
            this.getFixedBuyNowBtn().removeClass('disabled');
        }
    },

    /**
     * 商品详细页面更新数量操作
     * @param num
     */
    updateGoodsNumber : function (num) {
        // 更新数量操作
        var maxNum = 999999;
        num = num - 0;
        num = (num > maxNum) ? maxNum : (num <= 0) ? 1 : num;

        this.getGoodsNumInput().val(num);
        this.getGoodsBtnCollection().attr('num', num);

        // 检查金额
        this.setStatusMsg(num * this.getGoodsPrice());
    },

    /**
     * 商品详细页面 + 1
     */
    add:function(){
        // + 1
        var $numbBox = this.getGoodsNumInput();
        this.updateGoodsNumber(Number($numbBox.val()) + 1);
    },

    /**
     * 商品详细页面 - 1
     */
    reduce:function(){
        // - 1
        var $goodsNumInput = this.getGoodsNumInput();
        var orig = Number($goodsNumInput.val()) - 1;
        (orig>= 1) && this.updateGoodsNumber(orig);
    },

    /**
     *  手动输入
     */
    input_quantity:function(){
        // 输入
        var self = this,
            qtyNum = self.getGoodsNumInput().val();
        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout(function () {
            if(!isNaN(qtyNum)){
                self.updateGoodsNumber(qtyNum);
            }else{
                layer.open({
                    btn: ['确定'],
                    content: '请输入正确的数字',
                    end: function(){
                        self.getGoodsNumInput().focus();
                    }
                });
                self.updateGoodsNumber(1);
                return false;
            }
        },200);
    },

    //添加商品到购物车
    addcart:function(obj,callback){
        callback = callback || function () {};
        var that = $(obj),
            self = this,
            goods_id = that.attr("gid"),
            goodsNum = that.attr("num") - 0,
            express = that.hasClass('buyNow')?1:0;

        //如果购买按钮失效，直接返回
        if(that.hasClass('disabled')) return false;

        $.ajax({
            url: '/m-flow-a-add_to_cart.html',
            type: 'POST',
            dataType: 'json',
            data: {goods_id: goods_id, goods_num: goodsNum, express: express}
        })
        .done(function(data) {
            var $shopCart = $("#js_shopcart");
            if (data.status !== 0) {
                layer.open({
                    btn: ['确定'],
                    content: data.msg
                })
            } else {
                //跳转到checkout支付页面
                if (express == 1) window.location.href = DOMAIN_CART + "/m-flow-a-checkout.html";

                // 加入购物车按钮
                if (that.hasClass('addToCart')) {
                    var windowScrollTop = $(window).scrollTop();

                    if (window.requestAnimationFrame) {
                        var flyer = $('<img class="u-flyer" src="' + that.data("proimg") + '"/>');
                        flyer.fly({
                            start: {
                                left: that.offset().left,
                                top: that.offset().top - windowScrollTop
                            },
                            end: {
                                left: $shopCart.offset().left,
                                top: $shopCart.offset().top - $(window).scrollTop(),
                                width: 20,
                                height: 20
                            },
                            onEnd: function ()//元素飞动完成回调函数
                            {
                                $shopCart.find('.num').text(data.data.cart_num);
                                flyer.remove();
                            }
                        });
                    } else {
                        $shopCart.find('.num').text(cart_items);
                    }
                }
                self.showMinCart(data);
                callback();
            }
        });
    },
    addCartAjaxFn : function(opts,callback){
        var goods_id = opts.goods_id, goods_num = opts.goods_num,self = this;
        $.ajax({
            type: "POST",
            url: "/m-flow-a-add_to_cart.htm",
            data : {goods_id:goods_id,goods_num:goods_num},
            dataType:"jsonp",
            success: function(data){
                // 显示min cart
                self.showMinCart(data);
                if(callback && typeof(callback) == 'function'){
                    callback(data);
                }
            }
        });  
    }
};
GLOBAL.setFLoatBoxPosition = function(){
    var $win = $(window);
    var mainScrllTop = $(".js_mainBgWrap").offset().top + 46,
        $rightBar = $("#rightBar"),
        $leftBar = $("#leftBar"),
        sTop = 66,
        $win_width = $win.width();

    if($win.scrollTop() <= mainScrllTop - sTop){
        $rightBar.css({position: "absolute",top: mainScrllTop}).show();
        if($win_width >= 1440){
            $leftBar.css({position: "absolute",top: mainScrllTop}).show();
        }
    }else{
        $rightBar.css({position: "fixed",top: sTop}).show();
        if($win_width >= 1440){
            $leftBar.css({position: "fixed",top: sTop}).show();
        }
    }
};

GLOBAL.otherGlobal = {
    /**
     * requestAnimationFrame 兼容
     */
    requestAnimationFrame : function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    },

    /**
     * 检查 css 兼容性
     * @param prop
     * @returns {boolean}
     */
    supports : function(prop){
        var div = document.createElement('div'),
            vendors = 'Khtml O Moz Webkit'.split(' '),
            len = vendors.length;
        if ( prop in div.style ) return true;
        if ('-ms-' + prop in div.style) return true;
        prop = prop.replace(/^[a-z]/, function(val) {
            return val.toUpperCase();
        });
        while(len--) {
            if ( vendors[len] + prop in div.style ) {
                return true;
            }
        }
        return false;
    },

    /**
     * 时间戳 转 时分秒
     * @param limitTime
     * @returns {*}
     */
    getTime : function(limitTime){
        if(limitTime > 0){
            var seconds = limitTime;
            var minutes = Math.floor(seconds/60);
            var CHour = Math.floor(minutes/60);

            var CMinute = minutes % 60;
            var CSecond = seconds % 60;

            if(CHour<10){
                CHour='0'+CHour;
            }
            if(CMinute<10){
                CMinute='0'+CMinute;
            }
            if(CSecond<10){
                CSecond='0'+CSecond;
            }
            return {
                hours : CHour,
                minutes : CMinute,
                seconds : CSecond
            };
        }else{
            return false;
        }
    },
    /**
     * 时间戳 转 天时分秒
     * @param limitTime
     * @returns {*}
     */
    getTimeWithDay : function(limitTime){
        if(limitTime > 0){
            var seconds = limitTime;
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var CDay = Math.floor(hours/24);

            var CHour = hours % 24;
            var CMinute = minutes % 60;
            var CSecond = seconds % 60;

            if (CDay<10) {
                CDay ='0'+CDay;
            }
            if(CHour<10){
                CHour='0'+CHour;
            }
            if(CMinute<10){
                CMinute='0'+CMinute;
            }
            if(CSecond<10){
                CSecond='0'+CSecond;
            }
            return {
                days: CDay,
                hours : CHour,
                minutes : CMinute,
                seconds : CSecond
            };
        }else{
            return false;
        }
    },
    /**
     * 添加cookie
     * @param options
     */
    addCookie : function(options){
        options = $.extend({
            name:'',
            value : '',
            expiresHours : 3 * 24,
            domain : COOKIESDIAMON,
            path : '/'
        },options);

        var cookieString= options.name + "=" + escape(options.value) + ';path=' + options.path + ';domain=' + options.domain;
        if(options.expiresHours > 0){
            var date=new Date();
            date.setTime(date.getTime() + options.expiresHours * 3600 * 1000);
            cookieString=cookieString+"; expires=" + date.toGMTString();
        }
        document.cookie=cookieString;
    },
    /**
     * get Cookie
     * @param name
     * @returns {*}
     */
    getCookie : function (name) {
        var strCookie=document.cookie;
        var arrCookie=strCookie.split("; ");
        for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(arr[0]==name)return arr[1];
        }
        return "";
    },
    /**
     * delete Cookie
     * @param name
     */
    deleteCookie : function (name) {
        var date=new Date();
        date.setTime(date.getTime()-10000);
        document.cookie=name+"=v; expires="+date.toGMTString();
    },

    /**
     * 限定form input
     */
    inputLimitedDigital : function (elm) {
        elm.value = elm.value.replace(/\D/g,'');
    },
    inputToUpperCase : function (elm) {
        elm.value = elm.value.toUpperCase();
    },
    /**
     * 模拟 ploaceHolder
     * @param jqSelector jq选择器
     */
    myPlaceholder : {
        check: function(){
            return 'placeholder' in document.createElement('input');
        },
        init : function($select,height){
            this.$jqSelector = $select;
            if(! $select.length > 0) {return false;}

            (! this.check()) && this.create(height);
        },
        showHolder : function ($elm,$holder) {
            $holder.show();
        },
        hideHolder : function ($elm,$holder) {
            $holder.hide();
        },
        create : function (height) {
            var self = this;
            self.$jqSelector.each(function(){
                var $this = $(this),
                    txt = $this.attr('placeholder');

                $this.wrap($('<span></span>').css({display:"block",position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));

                var h = height || $this.outerHeight(true),
                    paddingLeft = $this.css('padding-left');

                var $holder = $('<span></span>').text(txt).css({position:'absolute', left:0, top:0, height:h, lineHeight:h + "px", paddingLeft:paddingLeft, color:'#aaa',fontSize:"14px"}).appendTo($this.parent());

                ($this.val() != "") && $holder.hide();

                $this.focusin(function() {
                    $holder.hide();
                }).focusout(function() {
                    ($this.val() == "") && self.showHolder($this,$holder);
                });

                $holder.on("mousedown",function() {
                    self.hideHolder($this,$holder);
                    $this.focus();
                });

                // 监听自动填充 记住密码等 change 事件
                if(typeof document.addEventListener == "undefined") {
                    // ie7 8 不支持 input事件 Placeholder属性
                    $this.on("propertychange", function () {
                        ($this.val() == "") ? self.showHolder($this,$holder) : self.hideHolder($this,$holder);
                    });
                }else{
                    // ie9 支持 input事件，不支持 Placeholder 属性
                    $this.on("input", function () {
                        ($this.val() == "") ? self.showHolder($this,$holder) : self.hideHolder($this,$holder);
                    });
                }
            });
        }
    },
    minCart : function () {
        var $minCart = $("#js_minCart");
        $("#js_topCartBtn").on("mouseenter", function () {
            GLOBAL.cart.showMinCart();
            $(this).addClass("mouse-over");
        }).on("mouseleave", function () {
            $(this).removeClass("mouse-over");
        });

        $minCart.on("mouseenter", function () {
            $minCart.addClass("mouse-over");
        }).on("mouseleave", function () {
            clearTimeout(GLOBAL.cart.minCartTimer);
            $minCart.removeClass("mouse-over").fadeOut(300);
        });
    },
    
    navEvent: function () {
        var $parent = $("#funcTab");
        $parent.on("mouseenter",".js_category", function () {
            var $subNav = $(this).find(".js_subNav");
            if ($subNav.length == 0) return;
            $subNav.show().addClass("img-loaded");
            if(! $subNav.hasClass("img-loading")){
                $subNav.find(".js_subNavImg").each(function () {
                    $(this).attr({
                        src : $(this).data("src")
                    })
                });
            }
        });
        $parent.on("mouseleave",".js_category", function () {
            var $subNav = $(this).find(".js_subNav");
            if ($subNav.length == 0) return;
            $subNav.hide();
        });
    }
};

;(function ($) {
    $.fn.toTop = function (options) {
        options = $.extend({
            speed : 200
        },options);
        this.each(function () {
            $(this).on("click", function () {
                $("html, body").animate({
                    scrollTop: 0
                }, options.speed);
            })
        });
        return this;
    };
})(jQuery);

/*
 * keyup延迟函数 delayKeyup
 * 使用方法: $("#input").delayKeyup(function(){},1000);
 */
(function ($) {
 $.fn.delayKeyup = function(callback,ms){
  var timer = 0;
  $(this).on("keyup",function(event){
   clearTimeout(timer);
   if(callback && typeof(callback)=='function'){
      timer=setTimeout(function(){callback(event)},ms);
    }
    else{
        alert("Your callback is not valid")
    }
  });
  return $(this);
 };
})(jQuery);


$(function(){
    // 兼容requestAnimationFrame
    GLOBAL.otherGlobal.requestAnimationFrame();

    // minCart
    GLOBAL.otherGlobal.minCart();

    // 导航
    GLOBAL.otherGlobal.navEvent();

    layer.config({
        skin:'layer-ext-moon',
        extend:'skin/moon/style.css'
    });

    // 全局ajax 事件
    var ajaxLayerIndex;
    $(document).ajaxStart(function (event) {
        ajaxLayerIndex = layer.msg('努力加载中', {
            icon: 16,
            scrollbar: true,
            shade: [0.3,'#000'],
            time: 15000
        });
    })
    .ajaxComplete(function (event) {
        setTimeout(function () {
            layer.close(ajaxLayerIndex);
        },500)
    });

    $.ajaxSetup({
        // contentType:"application/xml;charset=utf-8",
        global: false,
        timeout: 10000
    });

    //等待加载
    $(".js_loading").on("click",function(){
        layer.open({type: 2,shadeClose:false});
    });

    //检测登陆
    GLOBAL.login.info_check();

    //图片懒加载
    GLOBAL.lazyLoad.scrollLazyLoad($("img[data-original]"));

    //页面右侧悬浮框
    if ($("#rightBar,#leftBar").length > 0 && $(".js_mainBgWrap").length > 0){
        $(window).scroll(function(event) {
            /* Act on the event */
            GLOBAL.setFLoatBoxPosition();
        });

        GLOBAL.setFLoatBoxPosition();

         $(window).resize(function(event) {
            var $this = $(this);
            var $leftBar = $("#leftBar"),
            
                win_width = $this.width();
            /* Act on the event */
            setTimeout(function(){ 
               if(win_width >= 1600){
                    $leftBar.show();
                }else{
                    $leftBar.hide();
                }
            },500)
        });
    }

    if($("#rightBar").length > 0){
        $(".js_scrollToTop").click(function(){
            $("html,body").animate({scrollTop:0}, 500);
        });
    }
});



//公共页面操作事件
(function(){
    //图片预加载
    // $("img.js_lazyimg").lazyload({
    //  effect:"fadeIn"
    // });

    //鼠标划过收藏图标加载收藏列表
    // $(".user_favorite").on("mouseenter",function(){
    //  GLOBAL.MiniFav();
    // });

    //顶部搜索 and 搜索结果页搜索
    $(".js_topSearchBtn").parent().find("input[name='keyword']").on("keydown",function(e){
        var $this = $(this);
        if(e.keyCode===13){
            $this.parent().find(".js_topSearchBtn").trigger("click");
        }
    });

    $(".js_topSearchBtn").click(function(){
        var $this = $(this),
            $kwd = $this.parent().find("input[name='keyword']"),
            $cat = $this.parent().find("input[name='category']")
        GLOBAL.Search($kwd,$cat);
    });

    //搜索 auto complete
    (function(){
        var sBox = $("#js_seachComplete"),//下拉框div
            sIpt = $("#js_topSearch"),//搜索输入框
            // sBtn = $("#js_topSearchBtn"),//搜索按钮
            oldKeyWord = sBox.html(); //页面默认热门搜索词

        //点击空白区域隐藏下拉框
        $(document).on("click",function(event){
            searchTipsHide();
        });

        //点击搜索框显示下拉框
        $("#js_topSearch,#js_seachComplete").on("click",function(event){
            event.stopPropagation();
            searchTipsShow();
        });

        sIpt.delayKeyup(function(event){
            //方向键,F5不执行
            if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 116 || event.keyCode == 27){
                return;
            }
            searchAjax();
        },300);     

        //选择提示的搜索词
        sBox.on('click', 'li a', function(event){
            var $this = $(this);
            sIpt.val($this.find("span").text());
            // $("#js_topSearchBtn").trigger('click');
            searchTipsHide();
            return false;
        });
        
        //搜索接口
        function searchAjax(){
            var val = sIpt.val();
            if(val){
                $.ajax({
                    type:"GET",
                    // url:"http://www.rosegal.com/eload_admin/crontab/update_notice_keyword.php?action=show_word&callback=jQuery191045410024863667786_1440752762429&keyword=dress&_=1440752762460",
                    url: DOMAIN + "/temp/skin1/dist/minjs/demo_search.json",
                    data:{keyword:val},
                    // dataType:"jsonp",
                    dataType:"json",
                    beforeSend:function(){
                        $("#js_seachLoading").show();
                    },
                    success:function(data){
                        $("#js_seachLoading").hide();
                        if(data.res!='fail'){
                            sBox.html(data.res);
                            searchTipsShow();
                        }
                        else{
                            searchTipsHide();
                        }  
                    }
                });
            }
            else{           
                searchTipsHide();
            }       
        }

        function searchTipsShow(){
            sBox.show();//显示下拉框   
            var searchTipsLi = sBox.find("li"),
                size = searchTipsLi.size(),
                val = sIpt.val(),
                downCount = 0;

            //鼠标划过li元素
            sBox.find("li").on("mouseover",function(event){
                event.preventDefault();
                var $this = $(this);
                downCount = $this.index()+1;
                $this.siblings("li").find("a").removeClass("current");      
                $this.find("a").addClass("current");
            });


            //按上下键时
            $(document).on('keydown', function(event){
                //向上
                if(event.keyCode == 38){
                     downCount--;
                     if(downCount <= 0) {
                        downCount = size;
                     }
                }
                ////向下
                else if (event.keyCode == 40){ 
                     downCount++;
                     if(downCount > size) {
                        downCount = 1;
                     }
                }
                //ESC关闭
                else if(event.keyCode == 27){
                    searchTipsHide();
                    return;
                }
                else{
                    return;
                }

                var searchTipsLiEq = searchTipsLi.eq(downCount-1);

                sBox.find("li").find("a").removeClass("current");//移出元素current样式
                searchTipsLiEq.find("a").addClass("current");//当前元素添加current样式
                sIpt.val(searchTipsLiEq.find("span").text());//给搜索框赋值

            });
        }

        function searchTipsHide(){
            var val = sIpt.val();
            if(!val){
                sBox.html(oldKeyWord);
            }
            sBox.hide();
            $(document).off('keydown');//移除键盘事件
        }
    })();
})();



(function(){
    $('.js_addToCart').on('click', addProduct);

    function addProduct(event) {
        var $this = $(event.target);
        var windowScrollTop = $(window).scrollTop();
        var $shopCart = $("#js_shopcart");

        //如果库存为0，则直接返回(注：库存为0时，会有class="disabled")
        if($this.hasClass('disabled')){
            return false;
        }
        //var num = $shopCart.find('.num').text();

        if( window.requestAnimationFrame){
            var flyer = $('<img class="u-flyer" src="'+ $this.data("proimg") +'"/>');
            flyer.fly({
                start: {
                    left:$this.offset().left,
                    top: $this.offset().top - windowScrollTop
                },
                end: {
                    left: $shopCart.offset().left,
                    top:  $shopCart.offset().top -$(window).scrollTop(),
                    width: 20,
                    height: 20
                },
                onEnd: function ()//元素飞动完成回调函数
                {

                   //$shopCart.find('.num').text(num - 0 + 1);
                   
                   GLOBAL.cart.addCartAjaxFn({goods_id:$this.data("goods_id"),goods_num:1},setCartNum);

                   flyer.remove();
                   
                }
            });
        }else{
            GLOBAL.cart.addCartAjaxFn({goods_id:$this.data("goods_id") , goods_num :1 },setCartNum);
        }
    }

    function setCartNum (resultJson){
        //程序返回商品数量
        var status = resultJson.status,
            cart_items = resultJson.cart_items;

        if(!status){
            var $shopCart = $("#js_shopcart"),
                $js_topCartNum = $("#js_topCartNum");

            $shopCart.find('.num').text(cart_items);
            $js_topCartNum.text(cart_items);
        }else{
            alert(resultJson.msg);
        }
    }
})();

