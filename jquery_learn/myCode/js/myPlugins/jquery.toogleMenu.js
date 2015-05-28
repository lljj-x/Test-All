/**
 *
 *
 * Created by LiuJun on 2015/5/2820:46.
 */

$.fn.toogleMenu = function (options) {
    var defaults = {
        hasDropMenuClass : '.hasDropMenu',
        oepnd: 'opend',
        dropMenuCLass : '.dropMenuClass',
        showClassName : "show",
        time : 500
    };
    var options = $.extend({},defaults,options || {});
    var clearTimer = function($obj){
        clearTimeout($obj.attr("data-timer"));
    }
    this.each(function(){
        var timer = null;
        var $myThis = $(this);

        $(this).find(options.dropMenuCLass).hover(function(){
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
            },options.time);
            $myThis.attr("data-timer",timer);
        });
    });
    return this;
};

$(function () {
    $("#menu").toogleMenu();

});


