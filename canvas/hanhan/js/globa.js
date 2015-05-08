/**
 * Created by Liu.Jun on 15-5-6.
 */
(function($){
    $.extend($.fn,{
        chenkImagesIsLoaded: function(options){
            var defaults = {
                bgimageClassName : 'has-bg-image',
                callback : function(){}
            }
            options = $.extend(defaults,options);

            var myThis = this;
            imagesLoaded(this[0],function(){
                var image;
                var hasBgSection = myThis.find("." + options.bgimageClassName);
                if(hasBgSection.length > 0){
                    // 有背景图片
                    var tmpImages = $("<div />");

                    // 将背景图片以图片的形式插入到 div 中
                    hasBgSection.each(function(){
                        image = $(this).css("background-image").match(/url\((['"])?(.*?)\1\)/);
                        if(image){
                            tmpImages.append($("<img />").attr({
                                "src" : $(this).css("background-image").match(/url\((['"])?(.*?)\1\)/).pop()
                            }))
                        }
                    });
                    imagesLoaded(tmpImages[0],options.callback);

                }else{
                    // 没有背景图片 直接回调
                    options.callback.call();
                }
            })
            return this;
        }
    });
})(Zepto);


(function($,window,document){
    'use strice';
    var ZhenTimer,HTimer2,
        DX = 0,
        DY = 0,
        IsAnimation = false;
        MainTranslateY = 0,
        ZhenPosition = 0;
        ZhenNum = -121;

    var startBtnId = 'stratbtn';

    function startBtnChange(type){
        if(type === 'on'){
            $("#" + startBtnId).addClass("on");
        }else{
            $("#" + startBtnId).removeClass("on");
        }
    }

    function zhenAnimaion(){
        ZhenPosition  += ZhenNum;
        (ZhenPosition === 0) ? (ZhenPosition += ZhenNum) : ZhenPosition;
        if(ZhenNum < 0 && ZhenPosition === -2299 || ZhenNum > 0 && ZhenPosition === 2299){
            ZhenNum = -ZhenNum;
        }
        $("#szhen").css({
            backgroundPosition : "0px " + ZhenPosition + "px"
        })
    }

    function


    $.fn.startAnimation = function(){
        startBtnChange('on');

        $("#szhen-bg").animate({
            top : "13px"
        },100,'ease-out',function(){
            ZhenTimer = setInterval(zhenAnimaion,70);
        })

        return;
    }

    $.fn.stopAnimation = function(){
        startBtnChange('off');
        $("#szhen-bg").css({top : "90px"});
        $("#szhen").css({backgroundPosition:"0px 0px"});

        clearInterval(ZhenTimer);

        return;
    }
})(Zepto,window,document);
