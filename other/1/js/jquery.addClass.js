/**
 * Created by Liu.Jun on 2015/6/16.
 */
$(function(){
    var TimingaddClass = function(item, options){
        this.defaults = {
            item: "li",
            currentNum : 0,
            auto : 3000,
            className : 'current'
        }
        this.options = $.extend({}, this.defaults, options);
        this.currentNum = this.options.currentNum;
        this.parent = item;
        this.items = this.parent.find(this.options.item);
        this.itemLength = this.items.length;
        this.timer = null;
        this.init();
    };
    TimingaddClass.prototype = {
        init : function () {
            this.play();
            if(this.options.auto) this.autoPlay();
            var that = this;

            // 鼠标移入停止
            this.parent.on('mouseover',this.options.item, function (e) {
                that.items.removeClass(that.options.className);
                $(this).addClass(that.options.className);
                that.currentNum = that.items.index(this) + 1;
                clearInterval(that.timer);
            });

            this.parent.on('mouseleave',this.options.item, function (e) {
                that.autoPlay();
            })

            //this.items.hover(function () {
            //    that.items.removeClass(that.options.className);
            //    $(this).addClass(that.options.className);
            //    that.currentNum = $(this).index(this.items) + 1;
            //    clearInterval(that.timer);
            //}, function () {
            //    that.autoPlay();
            //})
        },
        play: function () {
            this.currentNum = (this.currentNum >= this.itemLength) ? 0 : this.currentNum;
            this.items.removeClass(this.options.className);
            this.items.eq(this.currentNum).addClass(this.options.className);
            this.currentNum ++ ;
        },
        autoPlay: function () {
            var that = this;
            this.timer = setInterval(function () {
                that.play()
            },this.options.auto);
        }
    }
    $.fn.timingaddClass = function (options) {
        return this.each(function() {
            new TimingaddClass($(this), options);
        });
    }
});