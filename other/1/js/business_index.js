/**
 * Created by Liu.Jun on 2015/6/17.
 */
;(function ($) {
    $.fn.scrollBs = function (options) {
        var defaults = {
            container: $(window),
            topOffset: 300,
            bottomOffset: 350,
            delayTime : 0,
            callback: $.noop
        };
        var options = $.extend({}, defaults, options || {});
        var myThis = this;
        var timer = null;  // 延时，滚动停止后判断
        var scrolling = function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                var contHeight = options.container.height();
                if (options.container.get(0) === window) {
                    contop = $(window).scrollTop();
                } else {
                    contop = options.container.offset().top;
                }
                myThis.not(".loaded").each(function () {
                    // 避免多次判断
                    var thisoffSetTop = $(this).offset().top;
                    var post = thisoffSetTop - contop;
                    var posb = thisoffSetTop - contop + $(this).height();
                    if ((post < contHeight - options.bottomOffset && post > 0 ) || (posb >= options.topOffset && posb < contHeight)) {
                        // console.log("容器到顶部的距离:" + contop + "\n 内容到顶部的距离: " + thisoffSetTop + "\n 容器高度:" + contHeight + "\n 内容相对容器顶部的距离" + post);
                        // 在当前窗口中
                        $(this).addClass("loaded");
                        options.callback.call(this, $(this));
                    }
                });
            }, options.delayTime);
        };

        scrolling();
        //滚动执行
        options.container.on("scroll", scrolling);
        // window resize
        $(window).resize(scrolling);
    }

})(jQuery);