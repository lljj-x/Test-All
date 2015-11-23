/**
 *   dialog
 **/
(function($) {

    var lang = {
        title: '温馨提示',
        confirm: '确定',
        cancel: '取消',
        close: '关闭'
    }

    var Mask = Base.klass.create({
        'defaultOpts': {
            'backgroundColor': '#000', // 背景颜色
            'opacity': 0.8, // 背景透明度
            'zIndex': 1000000
        },

        _isIE6: !-[1, ] && !window.XMLHttpRequest,

        init: function() {
            this.opts = $.extend({}, this.defaultOpts, this.options);

            this.render();

            this.enterDocument();
        },

        _getArea: function() {
            return {
                width: this._isIE6 ? Math.max($(window).width(), $(document.body).width()) : '100%',
                height: this._isIE6 ? Math.max($(document.documentElement).height(), $(document.body).height()) : '100%'
            }
        },

        _fixedIE6: function() {
            if (!this._isIE6) return;

            var $iframe = $('<iframe>'),
                area = this._getArea();

            $iframe
                .css(Base.mixin(area, {
                    opacity: 0
                }))
                .attr({
                    src: 'about:blank'
                })
                .appendTo(this.$el);

            this.$el.css({
                position: 'absolute'
            });

            this.resetFn = this.throttle($.proxy(this.reset, this), 200);
            $(window).bind('resize', this.resetFn);
        },

        render: function() {
            this.$el = $(this.createElement('<div class="ui-mask-container" style="display:none;position:fixed;top:0;left:0;"></div>'));
        },

        enterDocument: function() {
            var opts = this.opts;

            this.$el.css($.extend(this._getArea(), {
                backgroundColor: opts.backgroundColor,
                opacity: opts.opacity,
                zIndex: opts.zIndex
            }));

            this._fixedIE6();

            this.isRender = true;

            this.state = 'ready';
        },

        exitDocument: function() {
            if (this._isIE6) {
                $(window).unbind('resize', this.resetFn);
            }
        },

        show: function() {
            !this.isRender && this.render();

            this.state = 'show';

            this.$el.show();

            this.reset();

            this.trigger('show');
        },

        hide: function() {
            this.$el.hide();

            this.state = 'hide';

            this.trigger('hide');
        },

        reset: function() {
            var area;

            if (this.state === 'show' && this._isIE6) {
                area = this._getArea();

                this.$el
                    .css(area)
                    .find('iframe')
                    .css(area);
            }
        },

        createElement: function(html) {
            var $e = $(html);
            $(document.body).append($e);
            return $e;
        },

        dispose: function() {
            this.exitDocument();
            this.$el.remove();
        }
    });

    var Dialog = Base.klass.create({
        'defaultOpts': {

            // 最小宽度也是loading,alert,confirm的宽度
            'minWidth': 300,

            // 是否跟随滚动
            'follow': false,

            /**
             * 是否显示遮罩
             * 参数类型可以是 boolean 或者是 object
             *
             * true 显示遮罩,创建一个默认样式的遮罩层
             * false 不显示遮罩
             *
             * object : 设置遮罩样式
             *     backgroundColor  遮罩层背景颜色
             *     opacity  遮罩层透明度
             *     zIndex   遮罩层层级，注意这里的层级如果自定义不能大于弹层本身的层级
             */
            'mask': true,

            // 背景透明度
            'opacity': 1,

            // z-index
            'zIndex': 1000000

        },

        _isIE6: !-[1, ] && !window.XMLHttpRequest,

        init: function() {
            this.opts = $.extend({}, this.defaultOpts, this.options);

            this.render();

            this.enterDocument();
        },

        _useMask: function() {
            var opts = {
                zIndex: this.opts.zIndex - 1
            };

            typeof this.opts.mask === 'object' && $.extend(opts, this.opts.mask);

            this._mask = new Mask(opts);
        },

        _showMask: function() {
            this.opts.mask !== false && this._mask.show();
        },

        _hideMask: function() {
            this.opts.mask !== false && this._mask.hide();
        },

        _clearTimer: function() {
            this.timer && (clearTimeout(this.timer), this.timer = null);
        },

        _resetContent: function() {
            this._resetLastHtml();

            this.$el.find('.j-dialog-title, .j-dialog-closer').show(); // 如果是loading状态会隐藏这两个区域

            this.$el.find('.j-dialog-content').empty(); // 清空主内容
            this.$el.find('.j-dialog-buttons').empty(); // 清空按钮内容
        },

        /**
         * 把缓存中的dom放回到body上
         */
        _resetLastHtml: function() {
            this.$lastHtml && ($(document.body).append(this.$lastHtml.hide()), this.$lastHtml = null);
        },

        _scanO: function(o) {
            if (o) {
                this.title(o.title || lang.title);
                o.timeout && this.timeout(o.timeout);
            } else {
                this.title(lang.title);
            }
        },

        loading: function(s, o) {
            this.content(s);
            this.$el.find('.j-dialog-title, .j-dialog-closer').hide();
            this.width(this.opts.minWidth);
            this.show();
            this._scanO(o);
        },

        alert: function(s, o) {
            this.content(s);
            this.buttons([{
                text: '<button>' + lang.confirm + '</button>',
                callBack: function() {
                    this.hide();
                }
            }]);
            this.width(this.opts.minWidth);
            this.show();
            this._scanO(o);
        },

        confirm: function(s, o) {
            this.content(s);
            this.buttons(o.buttons);
            this.width(this.opts.minWidth);
            this.show();
            this._scanO(o);
        },

        html: function(s, o) {
            this.content(s);
            this.show();
            this._scanO(o);
        },

        render: function() {
            this.$el = $(this.createElement(this.opts.mainTmpl || Dialog.defaults.mainTmpl));
        },

        enterDocument: function() {
            var opts = this.opts,
                $el = this.$el;

            this.state = 'ready';

            this.timer = null; // 主要用在自动关闭

            this.resetFn = this.throttle($.proxy(this.reset, this), 100); // 此处使用了节流100毫秒

            opts.mask !== false && this._useMask();

            $el.on('click', '.j-dialog-closer', $.proxy(this.hide, this));

            $(window).bind('resize', this.resetFn);

            if (this.opts.follow === true) {
                if (this._isIE6) {
                    $(window).bind('scroll', this.resetFn);
                } else {
                    this.$el.css('position', 'fixed');
                }
            }
        },

        exitDocument: function() {
            this.$el.off('click');
            $(window).unbind('resize', this.resetFn);
            this._isIE6 && $(window).unbind('scroll', this.resetFn);
        },

        /**
         * 设置标题
         */
        title: function(s) {
            this.$el.find('.j-dialog-title').text(s);
        },

        /**
         * 设置内容
         */
        content: function(s) {
            if (!s) return;

            var $s = s,
                $el = this.$el,
                $content = $el.find('.j-dialog-content');

            this._resetContent();

            if (s instanceof $) { // jquery 对象
                this.$lastHtml = s;
            } else if (/^[\.#].*/.test(s)) { // jquery 选择器
                $s = $(s);
                this.$lastHtml = $s;
            } else if (/^\s*<.*>\s*?/.test(s)) { // dom结构
                $s = $(s);
            }

            // 如果内容是隐藏的则显示出来
            $s.is && $s.show();

            $content.append($s);

            // fixed ie7-
            this.$el.width($content.children().width() || this.opts.minWidth);
        },

        /**
         * 设置按钮
         */
        buttons: function(a) {
            if (!a || a.length === 0) return;

            var self = this,
                $btns = this.$el.find('.j-dialog-buttons'),
                $btn,
                item;

            $btns.empty();

            for (var i = 0, len = a.length; i < len; i++) {
                item = a[i];

                $btn = $(a[i].text);

                $btn.click(function(i) {
                    return function() {
                        a[i].callBack.apply(self, arguments);
                    }
                }(i));

                $btn.appendTo($btns);
            }
        },

        /**
         * 设置自动关闭(time 毫秒)
         */
        timeout: function(time) {
            if (!time) return;

            this._clearTimer();
            this.timer = setTimeout($.proxy(this.hide, this), +time);
        },

        /**
         * 设置弹层宽度
         */
        width: function(width) {
            this.$el.width(width);
        },
        
        /**
         * 设置弹层高度
         */
        height: function(height) {
            this.$el.height(height);
        },

        show: function() {
            var $el = this.$el,
                opts = this.opts;

            this._clearTimer(); // 清除自动关闭

            this.state = 'show';

            $el
                .show()
                .css({
                    opacity: opts.opacity,
                    zIndex: opts.zIndex
                });

            this._showMask();

            this.reset();

            this.trigger('show', this);
        },

        hide: function() {
            this.$el.hide();
            this._hideMask();

            this._resetLastHtml();

            this.state = 'hide';

            this.trigger('hide', this);
        },

        reset: function() {
            if (this.state !== 'show') return;

            var $el = this.$el,
                opts = this.opts,
                height = $el.height(),
                width = $el.width(),
                width = width < this.opts.minWidth ? this.opts.minWidth : width,
                top = $(window).height() / 2 - height / 2,
                left = $(window).width() / 2 - width / 2;

            if (!opts.follow || this._isIE6) {
                top += $(window).scrollTop();
                left += $(window).scrollLeft();
            }

            $el.css({
                left: left < 0 ? 0 : left,
                top: top < 0 ? 0 : top,
                width: width
            });
        },

        createElement: function(html) {
            var $e = $(html);
            $(document.body).append($e);
            return $e;
        },

        dispose: function() {
            this.exitDocument();
            this.$el.remove();
        }
    });


    Dialog.defaults = {
        // 弹层主dom结构
        'mainTmpl': '<div class="ui-dialog-main-container">\
                        <a href="javascript:;" title="' + lang.close + '" class="j-dialog-closer"><span>×</span></a>\
                        <h3 class="j-dialog-title">' + lang.title + '</h3>\
                        <div class="j-dialog-content"></div>\
                        <div class="j-dialog-buttons"></div>\
                    </div>'
    };

    Base.Widget.Dialog = Dialog;

})(window.Zepto);