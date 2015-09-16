(function ($,window) {
   var TextDetection = function (selector,options) {
        this.$instans = $(selector);
        this.options = options;
        this.config = this.options.config;  // Array
        this.init();
    };

    TextDetection.prototype = {
        init : function () {
            // init
            this.bindEvent();
        },

        /**
         * 绑定事件
         */
        bindEvent : function () {
            var self = this;
            this.$instans.on("click", function (event) {
                self.inputDataArr = self.getTextData(); // 先更新数据
                self.setlineNums();
                return;
                // 遍历每一行
                for(var lineText in self.inputDataArr) {

                    // 执行用户配置的检测类型
                    for(var validate in self.getConfig()){

                    }
                }
            });
        },

        /**
         * 获取input框内容 转为数组
         * @returns {Array}
         */
        getTextData: function () {
            return $(this.options.inputElm).val().split(/\r?\n|\r/);
        },

        /**
         *  显示行号
         */
        setlineNums : function () {
            var html = "",
                nums = this.getLineNums();

            for(var i=0;i<=nums - 1;i++){
                html += '<span>' + (i + 1) + '</span>';
            }

            $(".js_lineNums").html(html);
        },

        /**
         *  设置用户需要检测的类型
         */
        setConfig : function () {

        },

        /**
         *  获取用户需要检测的类型
         */
        getConfig : function () {

        },

        /**
         *  获取输入框行数
         */
        getLineNums : function () {
            return this.inputDataArr.length;
        },

        /**
         * 检测
         */
        validate : {


        }
    };

    $.fn.textDetection = function (options) {
        this.each(function () {
            new TextDetection(this, $.extend({}, $.fn.textDetection.defaults,options));
        });
    };

    // 直接暴露默认参数
    $.fn.textDetection.defaults = {
        config : [],
        inputElm : "#js_inputText"  // selector
        // eventType : "input" // 开发中
    };
    
})(jQuery,window);

$(function () {
    /**
     * @params 元素选择器
     * @params 需要过滤的配置包含 [] ,
     * @author Liu.Jun
     */

    $("#js_detection").textDetection({
        config : []
    });
});