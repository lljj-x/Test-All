/**
 * Created by Liu.Jun on 2015/6/11.
 */
(function($,window){
    var RecruitPage =  function($section,options){
        this.options = $.extend({},{
            top : 66,
            minWidth : 1200,
            defaultWidth : 1920,
            defaultHeight: 750,         // 只有resize 通过高度计算，才需要
            minHeight: 0,             // 只有resize 通过高度计算，才需要
            resizeCalculated : 'width'  // resize 计算方式， width / height
        },options);

        this.sections = $section;
        this.resizeTimer = null;
        this.currentWidth;
        this.currentHeight;

        this.init();
        return this;
    };
    RecruitPage.prototype = {
        init : function(){
            this.resize();
            var that = this;

            $(window).resize(function(){
                that.resize();
            });
        },
        resize: function(){
            this.currentWidth = this.getCurrentWidth();
            this.currentHeight = this.getCurrentHeight();
            var that = this;

            this.sections.each(function(){
                // section 全屏
                $(this).css({
                    width : that.currentWidth + "px",
                    height: that.currentHeight + "px"
                });

                // 设置背景图片铺满全屏
                if($(this).find(".bgImg").length > 0){
                    $(this).find(".bgImg").each(function(){
                        var currentImgWidth,currentImgHeight;
                        var xxx = that.currentWidth / that.currentHeight;
                        var ooo = $(this).data("dw") / $(this).data("dh");

                        // 设置当前图片宽高
                        if(xxx > ooo){
                            // 浏览器宽高比 大于图片
                            currentImgWidth = that.currentWidth;
                            currentImgHeight = Math.round(currentImgWidth / ooo);
                        }else if(xxx < ooo){
                            currentImgHeight = that.currentHeight;
                            currentImgWidth = Math.round(currentImgHeight * ooo);
                        }else{
                            currentImgWidth =  that.currentWidth;
                            currentImgHeight = that.currentHeight;
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
                if(that.options.resizeCalculated === 'height'){
                    // 高度小于默认高度 ，按比例缩放
                    var tmpCh = (that.currentHeight > that.options.defaultHeight) ? that.options.defaultHeight : that.currentHeight;
                    xx = tmpCh / that.options.defaultHeight;
                }else{
                    xx = that.currentWidth / that.options.defaultWidth;
                }

                $(this).find(".imgDiv").each(function(){
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

                // 分类垂直居中
                var lh = (480 * xx) * (100 / 480);
                $(this).find(".right_cate_name") .each(function(){
                    $(this).css("line-height",lh + "px");
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

