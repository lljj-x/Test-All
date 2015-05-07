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
})(jQuery);


(function($,window,document){
    var HTIMER1;
    var HTIMER2;

    var S = $("#stratbtn");


    function startBtnChange(type){
        if(type === 'on'){
            S.addClass('on');
        }else{
            S.removeClass("on");
        }
    }








    $.fn.startAnimation = function(){
        startBtnChange('on');


    }

    $.fn.stopAnimation = function(){
        startBtnChange('off');

    }
})(jQuery,window,document);