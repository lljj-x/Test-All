/**
 * Created by Liu.Jun on 2015/10/27.
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
        },
        tabSwitch : function ($cTab) {
            if ($cTab.length > 0) { // ...
                var that = this;
                var id = $cTab[0].hash;
                $cTab.addClass(this.options.activeClass).parent().siblings().children().removeClass(this.options.activeClass);
                var $con = this.options.container.find(id);
                $con.show().siblings().hide();
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
        options = $.extend({
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

    // 秒杀
    window.Spike = {
        spikeTab : '',  //切换当前活动
        getSpikeDataUrl : '/m-sales-a-index_ajax.html',
        spikeText : {
            startText : '距抢购开始',
            inProgressText : '距抢购结束',
            endText : '抢购已结束'
        },
        statusText: {
            startText : '即将开始',
            inProgressText : '秒杀进行中',
            endText : '已结束'
        },
        getTabContents : function () {
            if(typeof (this.tabContents) == 'undefined'){
                this.tabContents = $("#js_spikeTabContents").children("li");
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
        
        setStartText: function ($parent) {
            var self = this,
                thisIndex = $parent.index();

            $parent.find(".js_text").text(self.spikeText.startText);
            $("#js_spikeTabs").find(".js_spikeStatus").eq(thisIndex).text(self.statusText.startText)
        },
        setInProgressText: function ($parent) {
            var self = this,
                thisIndex = $parent.index();

            $parent.find(".js_text").text(self.spikeText.inProgressText);
            $("#js_spikeTabs").find(".js_spikeStatus").eq(thisIndex).text(self.statusText.inProgressText)
        },
        setEndText: function ($parent) {
            var self = this,
                thisIndex = $parent.index();
            $parent.find(".js_text").text(self.spikeText.endText);
            $("#js_spikeTabs").find(".js_spikeStatus").eq(thisIndex).text(self.statusText.endText)
        },
        getLaytpl : function (call) {
            if(typeof(laytpl) == "undefined"){
                $LAB.script("laytpl.min.js?2015101001")
                    .wait(function () {
                        call();
                    })
            }else{
                call();
            }
        },
        
        createTable : function () {
            // spikeTab 倒计时动态切换当前活动
            var $tab = $("#js_spikeTabs");
            $tab.myTab({
                item : 'a', // 触发点 selector
                container : $("#js_spikeTabContents"), // 内容区域 jQuery Obj
                triggerType : 'click',  // 事件
                startIn : 0,
                activeClass: 'active',
                tabInCallBack : $.noop
            });

            // 设置当前 myTab 对象
            this.spikeTab = $tab.data("myTab");
        },
        
        renderData : function (call) {
            // 20151102-liu 直接先渲染数据后重新执行 原方法
            var self = this;
            self.getLaytpl(function () {
                $.ajax({
                    url : self.getSpikeDataUrl,
                    type : "POST",
                    dataType: 'json'
                }).done(function (result) {
                    if(result.status != 0) return false;
                    var tplText = document.getElementById('js_spikeTpl').innerHTML;
                    laytpl(tplText).render(result.data, function(html){
                        document.getElementById('js_spikeWrap').innerHTML = html;
                        self.createTable();
                        call.call(self);
                    });
                });
            });
        },
        init : function(){
            var self = this;
            self.renderData(function () {
                this.getTabContents().each(function (i) {
                    var $this = $(this),
                        startTimeSy = $this.data("start-time"),
                        endTimeSy = $this.data("end-time"),
                        durationSy =  endTimeSy - startTimeSy;

                    if(startTimeSy == 0 && endTimeSy != 0){
                        // 当前活动
                        self.spikeTab.setTab(i);
                    }

                    var $jstime = $this.find(".js_time");
                    if(GLOBAL.otherGlobal.getTime(startTimeSy)){
                        // 开始倒计时 （暂未开始）
                        self.setStartText($this);
                        self.setSyTime($jstime,startTimeSy, function () {
                            self.setInProgressText($this);
                            self.setSyTime($jstime,durationSy, function () {
                                // 活动已结束
                                self.setEndText($this);
                                self.end($jstime);
                            })
                        });
                    }else if(GLOBAL.otherGlobal.getTime(endTimeSy)){
                        // 结束倒计时 （进行中）
                        self.setInProgressText($this);
                        self.setSyTime($jstime,endTimeSy, function () {
                            // 活动已结束
                            self.setEndText($this);
                            self.end($jstime);
                        });
                    }else{
                        // 活动结束 或者后台参数设置错误
                        if(endTimeSy === "" || startTimeSy === "") {
                            // 参数设置有问题 ，不跳转下一场
                            if (window["console"]){
                                console.log("第" + (i + 1) + "场次参数设置异常");
                            }
                        }else{
                            self.setEndText($this);
                            self.end($jstime);
                        }
                    }
                });
            });
        },
        end: function ($jstime) {
            $jstime.html('<span class="h time">00</span><span>:</span><span class="m time">00</span><span>:</span><span class="s time">00</span>');
            var $currentSpikeDiv = $jstime.closest(".js_spike");

             //设置结束状态
            $currentSpikeDiv.find(".spike-warp").remove();
            $currentSpikeDiv.addClass("ended").find("li").each(function () {
                var $this = $(this);
                var cHref = $this.find(".goods-img a").attr("href");
                $this.append('<a class="spike-end spike-warp" href="' + cHref + '" target="_blank">已结束<span class="spike-layer"></span></a>');
                $this.find(".spike-btn").html("去看看");
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
                $this.html('<span class="h time">' + currentT.hours+ '</span><span>:</span><span class="m time">' + currentT.minutes + '</span><span>:</span><span class="s time">' + currentT.seconds+ '</span>');
            }
            sytime --;
            setTimeout(function () {
                Spike.setSyTime(jQelm,sytime,callBack);
            },1000);
        }
    };
})(jQuery);

$(function () {
    // 倒计时
    Spike.init();
});