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
            this.$lineNums = $("#js_lineNums");
            this.$inputElm = $(this.options.inputElm);
            this.$consoleWrap = $("#js_consoleWrap");

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
                self.notHasError = true; // 默认木有错误
                // 遍历每一行
                for(var lineNum in self.inputDataArr) {
                    var lineText = self.inputDataArr[lineNum];

                    // 执行用户配置的检测类型
                    for(var validateNum in self.config){
                        if(self.validate.method[self.config[validateNum]]){
                            self.notHasError = self.validate.method[self.config[validateNum]](lineText,lineNum - 0 + 1 ) && self.notHasError;
                        }else{
                            alert("config配置有误，self.config[validateNum] 方法不存在");
                        }
                    }
                }
            });
        },

        /**
         * 获取input框内容 转为数组
         * @returns {Array}
         */
        getTextData: function () {
            return this.$inputElm.val().split(/\r?\n|\r/);
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

            this.$lineNums.html(html);
            this.setTextAreaHeight(this.$lineNums.outerHeight());
        },

        /**
         *  设置 textarea 高度
         */
        setTextAreaHeight : function (height) {
            this.$inputElm.height(height - 10 * 2 + 5); // padding : 10  +5 滚动条
        },

        /**
         *  获取输入框行数
         */
        getLineNums : function () {
            return this.inputDataArr.length;
        },

        /**
         * 输出检测信息
         * @params msg 信息
         * @params 信息类型，true正确  false错误
         */
        consoleLog : function (msg,type) {
            type = type || false;
            $("<p />").html(msg).attr({
                class : type ? "success" : "fail"
            }).appendTo(this.$consoleWrap);
        },

        /**
         * 检测
         */
        validate : {
            defaultError : {
                detectionLabelA : "第 {0} 行缺少 a 标签."

            },
            method : {
                detectionLabelA : function (text,lineNum) {
                    if(1==2){
                        // 木有错误

                        return true;

                    }else{

                        alert("xxx");


                        return false;

                    }

                }

            }
        }
    };

    $.fn.textDetection = function (options) {
        this.each(function () {
            new TextDetection(this, $.extend({}, $.fn.textDetection.defaults,options));
        });
    };

    // 直接暴露默认参数
    $.fn.textDetection.defaults = {
        config : ["detectionLabelA"],
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

    $("#js_detection").textDetection();
});