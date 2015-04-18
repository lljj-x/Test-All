/**
 * Created by LiuJun on 15-4-5下午2:06.
 */
$(document).ready(function(){
    function slideSocial(){
        $("#toggle-menu").toggleClass("current").next("#drop-menu").slideToggle();
    }

    function slideMenu(){
        if($("#mainMenu").hasClass("current")){
            var right1 = '0px';
            var right2 = '-240px';
        }else{
            var right1 = '240px';
            var right2 = '0px';
        }

        $("#mainMenu").toggleClass("current");
        var $header = $("#header");

        $("#header>.weixun-top-bg,.wrap").css({
            "right": right1
        });

        $header.children("#menu").css({
            "right": right2
        });
    }

    $("#toggle-menu").click(function(e){
        e.stopPropagation();
        slideSocial();
        if($("#mainMenu").hasClass("current")){
            slideMenu();
        }
    });
    $("#mainMenu").click(function(e){
        e.stopPropagation();
        slideMenu();
        if($("#toggle-menu").hasClass("current")){
            slideSocial();
        }
    });

    $("body").click(function(){
        if($("#toggle-menu").hasClass("current")){
            slideSocial();
        }
        if($("#mainMenu").hasClass("current")){
            slideMenu();
        }
    });
});

(function (window, document, exportName, $) {
    var defaults = {
        isAutoPlay: false,				    // 是否自动轮播
        isLoop: false,                      // 循环
        idDisControllBtn: false,            // 显示控制按钮
        interval: '3000',				    // 如果自动轮播 设置间隔时间 (ms)
        imgPageNums: 1,				        // 每次滚动多少张图片
        prevBtnId: 'left_button',		    // 上一页按钮 Id 名称
        nextBtnId: 'right_button',		    // 下一页按钮 Id 名称
        switchDivId: 'index-top-pro-list', 	// 指示器放在那个div中
        speed: 500,                         // 动画时间
        isTouch: true,                     // 触屏
        easing: 'easeOutSine'               //需要animate easing 扩展，或者jquery ui
    }

    function Carousel(jQueryElement, options) {
        options = options || {};
        this.options = $.extend({}, defaults, options);
        this.jQelement = jQueryElement;
        this.contentList = $(".l_content_list", this.jQelement);
        this.imgNums = $(".l_content_list li", this.jQelement).length;

        this.viewSize = 0;
        this.imgPages = 0;
        this.imgCurrentPage = 1;
//        jQueryElement.css({
//            "overflow" : "hidden"
//        });
        this.init();
        return this;
    }

    Carousel.prototype = {
        checkDisable: function () {
            if (this.imgCurrentPage == 1) {
                $("#" + this.options.prevBtnId).addClass("disable");
            } else {
                if ($("#" + this.options.prevBtnId).hasClass("disable")) {
                    $("#" + this.options.prevBtnId).removeClass("disable");
                }
            }
            if (this.imgCurrentPage == this.imgPages) {
                $("#" + this.options.nextBtnId).addClass("disable");
            } else {
                if ($("#" + this.options.nextBtnId).hasClass("disable")) {
                    $("#" + this.options.nextBtnId).removeClass("disable");
                }
            }
        },

        init: function () {
            var myThis = this;
            myThis.changeParams();
            var gotoSection = function (thisIndex) {
                if (thisIndex >= myThis.imgPages - 1) {
                    thisIndex = myThis.imgPages - 1;
                }
                if (thisIndex <= 0) {
                    thisIndex = 0;
                }

                myThis.contentList.stop().animate({"left": -(myThis.viewSize * (thisIndex))}, myThis.options.speed, myThis.options.easing);
                myThis.imgCurrentPage = thisIndex + 1;
                if (myThis.options.idDisControllBtn) {
                    $("#" + myThis.options.switchDivId).children("span").eq(thisIndex).addClass("current").siblings().removeClass("current");
                }
                myThis.checkDisable();
            }

            // 触屏手势
            if (myThis.options.isTouch) {
                var hammerCon = new Hammer(myThis.jQelement[0]);
                hammerCon.get("pan").set({direction: Hammer.DIRECTION_HORIZONTAL});
                var _left = 0;
                hammerCon.on("panstart", function () {
                    _left = parseInt(myThis.contentList.css("left").replace("px", ""));
                });
                hammerCon.on("panend pancancel", function (ev) {
                    if (Math.abs(ev.deltaX) >= ((myThis.viewSize / 2 >= 50) ? 50 : (myThis.viewSize / 2))) {
                        if (ev.deltaX > 0) {
                            gotoSection(myThis.imgCurrentPage - 2);
                        } else {
                            gotoSection(myThis.imgCurrentPage);
                        }
                    } else {
                        myThis.contentList.stop().animate({"left": _left + "px"}, myThis.options.speed, myThis.options.easing);
                    }
                });
                hammerCon.on("panmove", function (ev) {
                    myThis.contentList.css({
                        left: (_left + ev.deltaX) + "px"
                    });
                });
            }

            if (myThis.options.idDisControllBtn) {
                // 添加指示器
                var htmlInnerSwitch = '<span class="current">1</span>';
                for (var i = 1; i <= myThis.imgPages; i++) {
                    if (i > 1) {
                        htmlInnerSwitch = htmlInnerSwitch + '<span>' + i + '</span>';
                    }
                };
                $("#" + myThis.options.switchDivId).append($(htmlInnerSwitch));
                // 指示器点击事件
                $("#" + myThis.options.switchDivId).children("span").on("click", function () {
                    var thisIndex = $(this).index();
                    gotoSection(thisIndex);
                });
            }

            $("#" + myThis.options.prevBtnId).on("click", function (event) {
                event.preventDefault();
                // 上一页事件
                if (!myThis.contentList.is(":animated")) {
                    if (myThis.imgCurrentPage == 1) {
                        if (myThis.options.isLoop) {
                            myThis.contentList.animate({"left": "-=" + (myThis.viewSize * (myThis.imgPages - 1))}, myThis.options.speed, myThis.options.easing)
                            myThis.imgCurrentPage = myThis.imgPages;
                        } else {
                            return false;
                        }
                    } else {
                        myThis.contentList.animate({"left": "+=" + myThis.viewSize}, myThis.options.speed, myThis.options.easing)
                        myThis.imgCurrentPage--;
                    }
                    $("#" + myThis.options.switchDivId).children("span").eq(myThis.imgCurrentPage - 1).addClass("current").siblings().removeClass("current");
                }
                myThis.checkDisable();
            });
            $("#" + myThis.options.nextBtnId).on("click", function (event) {
                event.preventDefault();
                // 下一页事件
                if (!myThis.contentList.is(":animated")) {
                    if (myThis.imgCurrentPage == myThis.imgPages) {
                        if (myThis.options.isLoop) {
                            this.contentList.animate({"left": "+=" + myThis.viewSize * (myThis.imgPages - 1)}, myThis.options.speed, myThis.options.easing)
                            myThis.imgCurrentPage = 1;
                        } else {
                            return false;
                        }
                    } else {
                        myThis.contentList.animate({"left": "-=" + myThis.viewSize}, myThis.options.speed, myThis.options.easing)
                        myThis.imgCurrentPage++;
                    }
                    $("#" + myThis.options.switchDivId).children("span").eq(myThis.imgCurrentPage - 1).addClass("current").siblings().removeClass("current");
                }
                myThis.checkDisable();
            });

            // 自动轮播
            if (myThis.options.isAutoPlay) {
                function autoPlay() {
                    $("#" + myThis.options.nextBtnId).trigger("click");
                };
                var thisId = setInterval(autoPlay, myThis.options.interval);
                this.jQelement.attr({"intervalid": thisId});
            }
        },
        changeParams: function (changeParams) {
            changeParams = changeParams || {};
            this.options = $.extend({}, this.options, changeParams);
            this.viewSize = $(".l_content_list li", this.jQelement).outerWidth(true) * this.options.imgPageNums;
            this.imgPages = Math.ceil(this.imgNums / this.options.imgPageNums);
            this.imgCurrentPage = 1;
            this.contentList.css({
                position: "absolute",
                top: "0px",
                left: "0px",
                width: this.viewSize * this.imgPages + "px"
            });
            this.checkDisable();
        }
    };
    window[exportName] = Carousel;
}(window, document, 'Carousel', jQuery));

