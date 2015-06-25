/**
 * Created by Liu.Jun on 2015/6/18.
 */
;(function ($) {
    $.fn.myToggleMenu = function (options) {
        var defaults = {
            isCss3 : $.supports('transition'),
            hasDropMenuClass : '.hasDropMenu',
            oepnd: 'opend',
            dropMenuCLass : '.dropMenu',
            showClassName : "show",
            showClassNameCss3 : "showCss3",
            timeout : 200
        };

        var options = $.extend({},defaults,options || {});
        options.showClassName = options.isCss3 ? options.showClassNameCss3 : options.showClassName;

        var clearTimer = function($obj){
            clearTimeout($obj.attr("data-timer"));
        }
        this.each(function(){
            var timer = null;
            var $myThis = $(this);
            var $dropMenu = $(this).find(options.dropMenuCLass);

            if(options.isCss3){
                $dropMenu.addClass("hideCss3").css("display","block");
            }
            $dropMenu.hover(function(){
                clearTimer($myThis);
            },function(){
                $(this).removeClass(options.showClassName).siblings(options.hasDropMenuClass).removeClass(options.oepnd);
            });

            $(this).find(options.hasDropMenuClass).hover(function(){
                clearTimer($myThis);
                // 取消当前下拉菜单
                var $curShowMenu =$myThis.find("." + options.showClassName);
                if($curShowMenu.length > 0){
                    $curShowMenu.removeClass(options.showClassName).siblings(options.hasDropMenuClass).removeClass(options.oepnd);
                }
                $(this).addClass(options.oepnd).siblings(options.dropMenuCLass).addClass(options.showClassName);
            },function(){
                var $this = $(this);
                timer = setTimeout(function(){
                    $this.removeClass(options.oepnd).siblings(options.dropMenuCLass).removeClass(options.showClassName);
                },options.timeout);
                $myThis.attr("data-timer",timer);
            });
        });
        return this;
    };
})(jQuery);