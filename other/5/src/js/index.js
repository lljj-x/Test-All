@@include('_common/jquery-1.9.1.min.js');
@@include('_common/base.js');
@@include('_common/jquery.flexslider.min.js');

(function($,window){
    "use strict";
    var RecruitPage =  function($section,options){
        this.options = $.extend({},{
            top : 0,
            minWidth : 1100,
            defaultWidth : 1920,
            defaultHeight: 750,
            minHeight: 550,
            resizeCalculated : 'width'  // resize 计算方式， width / height
        },options);

        this.sections = $section;
        this.init();
        return this;
    };
    RecruitPage.prototype = {
        init : function(){
            var self = this;
            this.resize();
            $(window).resize(function () {
                self.resize();
            });
        },
        throttle: function(fn, delay) {
            var timer = null;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            };
        },
        resize: function(){
            this.currentWidth = this.getCurrentWidth();

            // console.log(this.currentWidth);

            this.currentHeight = this.getCurrentHeight();
            var self = this;

            this.sections.each(function(){
                // section 全屏
                $(this).css({
                    width : self.currentWidth + "px",
                    height: self.currentHeight + "px"
                });

                // 设置背景图片铺满全屏
                if($(this).find(".j-bg-img").length > 0){
                    $(this).find(".bg-img").each(function(){
                        var currentImgWidth,currentImgHeight;
                        var xxx = self.currentWidth / self.currentHeight;
                        var ooo = $(this).data("dw") / $(this).data("dh");

                        // 设置当前图片宽高
                        if(xxx > ooo){
                            // 浏览器宽高比 大于图片
                            currentImgWidth = self.currentWidth;
                            currentImgHeight = Math.round(currentImgWidth / ooo);
                        }else if(xxx < ooo){
                            currentImgHeight = self.currentHeight;
                            currentImgWidth = Math.round(currentImgHeight * ooo);
                        }else{
                            currentImgWidth =  self.currentWidth;
                            currentImgHeight = self.currentHeight;
                        }

                        // 设置水平 垂直居中
                        if($(this).hasClass("center")){
                            $(this).css({
                                left : "50%",
                                marginLeft : - Math.round(currentImgWidth / 2 ) + "px"
                            })
                        }
                        if($(this).hasClass("middle")){
                            $(this).css({
                                top : "50%",
                                marginTop : - Math.round(currentImgHeight / 2 ) + "px"
                            })
                        }

                        $(this).css({
                            width: currentImgWidth,
                            height: currentImgHeight
                        })
                    });
                }

                // imgDiv 自适应, 需要区分 高度和宽度自适应
                var xx;
                if(self.options.resizeCalculated === 'height'){
                    // 高度小于默认高度 ，按比例缩放
                    var tmpCh = (self.currentHeight > self.options.defaultHeight) ? self.options.defaultHeight : self.currentHeight;
                    xx = tmpCh / self.options.defaultHeight;
                }else{
                    xx = self.currentWidth / self.options.defaultWidth;
                }

                $(this).find(".j-img-div").each(function(){
                    var imgW = Math.round($(this).data("dw") * xx );
                    var imgH = Math.round($(this).data("dh") * xx );

                    if($(this).hasClass("center")){
                        $(this).css({
                            // "left": "50%", 改成通过css手动去设置
                            "margin-left" : - (imgW / 2 ) + "px"
                        });
                    }

                    if($(this).hasClass("middle")){
                        $(this).css({
                            // "top": "50%", 改成通过css手动去设置
                            "margin-top" : - (imgH / 2)  + "px"
                        });
                    }

                    $(this).css({
                        "width" : imgW + "px",
                        "height" : imgH + "px"
                    });
                });
            });
        },
        getCurrentWidth : function(){
            var sectionW = $(window).width();
            if (sectionW == 0) sectionW = $(document.body).width();
            if(sectionW <= this.options.minWidth) sectionW = this.options.minWidth;
            return sectionW;
        },
        getCurrentHeight : function(){
            var sectionH = $(window).height();
            if (sectionH == 0) sectionH = $(document.body).height();
            if(sectionH <= this.options.minHeight) sectionH = this.options.minHeight;
            return sectionH - this.options.top;
        }
    };

    window.RecruitPage = RecruitPage;
})(jQuery,window);

$(function () {
    "use strict";
    // 全屏
    new RecruitPage($(".j-full-section"));

    //  轮播
    var $banner = $('#js_banner');
    $banner.flexslider({
        namespace:"",
        animation: "fade",
        selector: ".j-slide-list > li",
        pauseOnAction:true, //
        directionNav: false, // 前后控制
        controlNav : true,
        animationSpeed : 600,
        slideshowSpeed: 6000
    });
});