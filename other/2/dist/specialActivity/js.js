/**
 * Created by Liu.Jun on 2015/8/13.
 */
;(function ($) {

    /**
     * Tab
     * @param elm
     * @param options
     * @constructor
     */
    var MyTab = function (elm,options) {
        this.$elm = elm;
        this.options = options;
    };
    MyTab.prototype = {
        init : function(){
            this.bindEvent();
            this.$tabls = this.$elm.find(this.options.item);
            var $cTab = this.$tabls.eq(this.options.startIn);
            this.tabSwitch($cTab,true);       // init 设置默认当前
            return this;
        },
        bindEvent : function () {
            var that = this;
            that.$elm.on(that.options.triggerType,that.options.item, function (event) {
                event.preventDefault();
                that.tabSwitch($(this));
            });
            that.$elm.on("click", function (event) {
                event.preventDefault();
            });
        },
        tabSwitch : function ($cTab,isStart) {
            if ($cTab.length > 0) { // ...
                isStart = (arguments.length > 1) ? isStart : false; // ..
                var that = this;
                var id = $cTab.attr("href");
                $cTab.addClass(this.options.activeClass).parent().siblings().children().removeClass(this.options.activeClass);

                var $con = this.options.container.find(id);

                $con.fadeIn(0).siblings().hide();
                that.options.tabInCallBack($con);
            }
        },
        setTab : function(select){
            // 参数可以是选择器，或者 index
            var $cTab;
            if(isNaN(select)){
                // 选择器
                $cTab = this.$elm.find(select);
            }else{
                // index
                $cTab = this.$tabls.eq(select);
            }

            this.tabSwitch($cTab,false);
        }
    };
    $.fn.myTab = function (options) {
        var options = $.extend({
            item : 'a', // 触发点 selector
            container : $(".tab-contents"), // 内容区域 jQuery Obj
            triggerType : 'click',  // 事件
            startIn : 0, // 默认位置
            activeClass: 'active',
            tabInCallBack : $.noop
        },options);

        return this.each(function () {
            $(this).data("myTab",new MyTab($(this),options).init());
        });
    };

    /**
     * 宽度
     * @param options
     * @constructor
     */
    window.CheckCurrentW = function (options) {
        options = $.extend({
            value : 1400,
            moreThanCall : $.noop,
            orLessCall : $.noop
        },options);
        this.options = options;
        this.init();
    };
    CheckCurrentW.prototype = {
        init : function(){
            this.check();
            this.event();
        },
        getW : function(){
            return $(window).width();
        },
        event : function(){
            var self = this;
            $(window).resize(function () {
                self.check();
            });
        },
        check : function(){
            if(this.getW() > this.options.value){
                this.options.moreThanCall();
            }else{
                this.options.orLessCall();
            }
        }
    };

    /**
     * 秒杀活动
     * @type {{spikeTab: string, startText: string, inProgresstext: string, endText: string, getTabContents: Function, setCurrentSpike: Function, getCurrentSpike: Function, init: Function, end: Function, setSyTime: Function}}
     */
    window.Spike = {
        spikeTab : '',  //切换当前活动
        startText : '距离本场开始还有：',
        inProgresstext : '距离本场结束还有：',
        endText : '你来晚了，本场活动已结束：',

        getTabContents : function () {
            if(typeof (this.tabContents) == 'undefined'){
                this.tabContents = $("#spike-tab-contents").children("li");
            }
            return this.tabContents;
        },
        setCurrentSpike : function (index) {
            this.currentSpike = index;
        },

        getCurrentSpike : function () {
            // return index;
            return this.currentSpike;
        },
        init : function(){
            var self = this;
            this.getTabContents().each(function (i,v) {
                var $this = $(this);
                var startTimeSy = $this.data("start-time");
                var endTimeSy = $this.data("end-time");
                var durationSy =  endTimeSy - startTimeSy;

                if(startTimeSy == 0 && endTimeSy != 0){
                    // 当前活动
                    self.setCurrentSpike(i);
                }

                var $jstime = $this.find(".js_time");
                var $jsText = $this.find(".js_text");
                if(GLOBAL.otherGlobal.getTime(startTimeSy)){
                    // 开始倒计时 （暂未开始）
                    $jsText.text(Spike.startText);

                    self.setSyTime($jstime,startTimeSy, function () {
                        $jsText.text(Spike.inProgresstext); // 转入结束倒计时
                        self.setSyTime($jstime,durationSy, function () {
                            // 活动已结束
                            self.end($jstime,$jsText);
                        })
                    });
                }else if(GLOBAL.otherGlobal.getTime(endTimeSy)){
                    // 结束倒计时 （进行中）
                    $jsText.text(Spike.inProgresstext);
                    self.setSyTime($jstime,endTimeSy, function () {
                        // 活动已结束
                        self.end($jstime,$jsText);
                    });
                }else{
                    // 活动结束
                    self.end($jstime,$jsText);
                }

            });
        },
        end: function ($jstime,$jsText) {
            $jstime.html('<span class="h">00</span><span class="m">00</span><span class="s">00</span>');
            $jsText.text(Spike.endText);

            var $currentSpikeDiv = $jstime.closest(".js_spike");

            // 设置结束状态
            $currentSpikeDiv.find(".spike-warp").remove();
            $currentSpikeDiv.find("li").each(function () {
                var $this = $(this);
                var cHref = $this.find(".goods-img a").attr("href");
                $this.append('<a class="spike-end spike-warp" href="' + cHref + '" target="_blank">已结束<span class="spike-layer"></span></a>');
                $this.find(".spike-btn").remove();
            });

            // 活动结束自动转入下一场活动
            this.spikeTab.setTab($currentSpikeDiv.index() + 1);
        },
        setSyTime : function (jQelm,sytime,callBack) {
            // 倒计时
            var $this = jQelm;
            var currentT = GLOBAL.otherGlobal.getTime(sytime);
            if(currentT == false){
                callBack();
                return false;
            }else{
                $this.html('<span class="h">' + currentT.hours + '</span><span class="m">' + currentT.minutes + '</span><span class="s">' + currentT.seconds + '</span>');
            }
            sytime --;
            setTimeout(function () {
                Spike.setSyTime(jQelm,sytime,callBack);
            },1000);
        }
    }

    /**
     * 底部滚动更随
     */

    var scrollMore = function (elm, options) {
        this.$elm = elm;
        this.options = options;
    };
    scrollMore.prototype = {
        initParams: function () {
            this.top = $(this.options.scrollMoreParent).offset().top;
            this.bottomTop = this.top + $(this.options.scrollMoreParent).height();
            this.windowH = $(window).height();
            this.isBeyond = true;  // 底部是否超出，避免重复回调
            this.scrollChange();
        },
        init: function () {
            var self = this;
            self.initParams();

            $(window).on("scroll", function () {
                self.scrollChange();
            });

            $(window).on("resize", function () {
                self.initParams();
            });
            return this;
        },
        getScrollTop: function () {
            return $(window).scrollTop();
        },
        scrollChange: function () {
            if (this.getScrollTop()  > this.top && this.getScrollTop() + this.windowH < this.bottomTop) {
                // 顶部超出屏幕 && 底部未进入屏幕 (不通用)
                if (this.isBeyond) {
                    this.isBeyond = false;
                    this.options.inCall.call(this.$elm);
                }
            } else {
                // 底部进入
                if (!this.isBeyond) {
                    this.isBeyond = true;
                    this.options.outCall.call(this.$elm);
                }
            }
        }
    };


    $.fn.scrollMore = function (options) {
        var options = $.extend({
            scrollMoreParent : '#cate-warp',  // 需更随的父级元素 position:relative
            outCall : $.noop,  // 底部超出回调
            inCall : $.noop     // 顶部不超出回调
        },options);

        return this.each(function () {
            $(this).data("scrollMore",new scrollMore($(this),options).init());
        });
    };

    $.fn.myHide = function (isCss3) {
        if(isCss3){
            if($(this).hasClass("animation-show")){
                $(this).addClass("animation-hide").removeClass("animation-show");
            }
        }else{
            $(this).hide();
        }

        $(this).find(".active").removeClass("active");
    };

    $.fn.myShow = function (isCss3) {
        if(isCss3){
                $(this).removeClass("animation-hide").addClass("animation-show");
        }else{
            $(this).show();
        }
    }

})(jQuery);


$(function () {
    // init
    var isSupportsAnimation = GLOBAL.otherGlobal.supports('animation');
    if(isSupportsAnimation){
        $("#js_sidebar").addClass('css3-hide').show();
    }

    //nav
    $('#js_sidebar').onePageNav({
        navItems: '.cate-list a',
        scrollSpeed: 750,
        changeHash: false,
        currentClass: 'active',
        parent :'li',
        easing: 'swing'
        //scrollChange: function ($parent) {
        //    $(this).myShow(isSupportsAnimation)
        //},
        //onGoBeyondCall : function () {
        //    // 添加超出回调方法
        //    $(this).myHide(isSupportsAnimation)
        //    $(this).find(".active").removeClass("active");
        //}
    });

    //to top
    $(".js_toTop").toTop();

    // 小分辨率
    new CheckCurrentW({
        moreThanCall : function () {
            $("body").removeClass("w1300");
        },
        orLessCall : function () {
            $("body").addClass("w1300");
        }
    });

    // spikeTab 倒计时动态切换当前活动
    $("#spike-tabs").myTab({
        item : 'a', // 触发点 selector
        container : $("#spike-tab-contents"), // 内容区域 jQuery Obj
        triggerType : 'click',  // 事件
        // startIn : Spike.getCurrentSpike(), // 修改为通过 init 自动切换
        startIn : 0,
        activeClass: 'active',
        tabInCallBack : $.noop
    });

    // 设置当前 myTab 对象
    Spike.spikeTab = $("#spike-tabs").data("myTab");

    // 倒计时
    Spike.init();


    $("#js_sidebar").scrollMore({
        outCall : function(){
            $(this).myHide(isSupportsAnimation);
        },
        inCall : function(){
            $(this).myShow(isSupportsAnimation);
        }
    });
});