"use strict";
(function ($, window) {
    // 所有操作不能重写该方法
    $.textDetection = {
        // 默认参数
        defaults: {
            config: ["detectionUrl","detectionLength","detectionImgAttr"],
            inputElm: "#js_inputText",
            consoleWrap : $("#js_consoleWrap")
        },

        // 输出提示信息
        consoleLog: function (msg, $consoleWrap,className) {
            $("<p />").text(msg).attr({
                class: className || "fail"
            }).appendTo($consoleWrap);
        },

        validate: {
            // 默认错误
            defaultError: {
                detectionUrlSpace: '第 {0} 行： 链接 "{1}" 中存在空格',
                detectionUrlSlash: '第 {0} 行： 链接 "{1}" 以 / 结尾',
                detectionUrlQmark: '第 {0} 行： 链接 "{1}" 中包含 ? ',
                detectionUrlImageNum: '第 {0} 行： 图片 "{1}" 图片命名中包含有数字',

                detectionLength : '第 {0} 行： 代码超过 500 字符',
                detectionImgAttr : '第 {0} 行： 图片 "{1}" 未添加alt/height/width信息'
            },
            // 获取错误文字
            setError: function (funNam,options,arrParams) {
                var msgText = this.defaultError[funNam];
                if(arguments.length > 2){
                    for(var i in arrParams){
                        msgText = msgText.replace('{' + i + '}',arrParams[i]);
                    }
                }
                $.textDetection.consoleLog(msgText,options.consoleWrap,"fail");
            },
            // 检测方法
            method: {
                detectionUrl: function (text, lineNum, funNam, options) {
                    var reg = /"(\s)*(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)(\s)*"/g,
                        matchUrl = text.match(reg);

                    // 首先匹配到 " "首尾包含 0- 个空白的url
                    if (matchUrl) {

                        var matchUrlArr = matchUrl.splice(','),
                            reBool = true;

                        for (var i in matchUrlArr) {
                            // url 检测使用一个方法，错误信息 要区分开来，不直接默认使用方法名对应错误信息

                            matchUrl = matchUrlArr[i].toString().replace(/(^"*)|("*$)/g, '');

                            // ① 检测是否包含首尾空格
                            if (/(^\s+)|(\s+$)/.test(matchUrl)) {
                                reBool = false;
                                $.textDetection.validate.setError(funNam + 'Space', options, [lineNum, matchUrl]);
                            }

                            // ② 检测是否 / 结尾
                            if (/\/\s*$/.test(matchUrl)) {
                                reBool = false;
                                $.textDetection.validate.setError(funNam + 'Slash', options, [lineNum, matchUrl]);
                            }

                            // ③ 检测链接地址是否 包含 ？
                            if (matchUrl.indexOf('?') > -1) {
                                reBool = false;
                                $.textDetection.validate.setError(funNam + 'Qmark', options, [lineNum, matchUrl]);
                            }

                            // ④ 图片命名包含数字 (直接匹配最后一个搞不定 ，只能分割 ( ▼-▼ ))
                            if (/\.(png|jpg|gif)\s*$/.test(matchUrl)) {
                                // 图片
                                var tmpArr = matchUrl.split('/');
                                if(tmpArr && tmpArr[tmpArr.length - 1].search(/\d/) > -1){
                                    reBool = false;
                                    $.textDetection.validate.setError(funNam + 'ImageNum', options, [lineNum, matchUrl]);
                                }
                            }
                        }
                        return reBool;
                    } else {
                        return true;
                    }
                },
                detectionLength: function (text, lineNum, funNam, options) {
                    var maxLength = 500;
                    // ⑤　长度检测
                    if (text.length > maxLength) {
                        $.textDetection.validate.setError(funNam, options, [lineNum]);
                        return false;
                    } else {
                        return true;
                    }
                },
                detectionImgAttr: function (text, lineNum, funNam, options) {
                    // 不贪婪
                    var reg = /(<\s*img\s+).*?(\/?\s*>)/g,
                        imgTag = text.match(reg);

                    if (imgTag) {
                        var imgTagArr = imgTag.splice(','),
                            reBool = true;

                        // 一行可能存在多个匹配
                        for (var i in imgTagArr) {
                            imgTag = imgTagArr[i].toString();
                            // img 标签未添加 alt/height/width eg : alt alt="" alt = "" alt = " "

                            // 过滤掉空格
                            var noBankimgTag = imgTag.replace(/\s*/g,'');

                            if(noBankimgTag.search(/alt="(?!").+?"/) <0 || noBankimgTag.search(/height="(?!").+?"/) < 0 || noBankimgTag.search(/width="(?!").+?"/) <0 -1){
                                // 不包含 alt width height 中任何一个 返回错误
                                reBool = false;
                                $.textDetection.validate.setError(funNam, options, [lineNum,imgTag]);
                            }
                        }
                        return reBool;
                    }else{
                        return true;
                    }
                }
            }
        }
    };

    var TextDetection = function (selector, options) {
        this.$instans = $(selector);
        this.options = options;
        this.config = this.options.config;  // Array
        this.init();
    };

    TextDetection.prototype = {
        init: function () {
            // init
            this.$lineNums = $("#js_lineNums");
            this.$inputElm = $(this.options.inputElm);
            this.bindEvent();
        },

        /**
         * 绑定事件
         */
        bindEvent: function () {
            var self = this;
            self.$instans.on("click", function (event) {
                self.options.consoleWrap.empty();
                self.inputDataArr = self.getTextData(); // 先更新数据
                self.setlineNums();
                var notHasError = true; // 默认木有错误
                // 遍历每一行
                for (var lineNum in self.inputDataArr) {
                    // 剔除首尾空格
                    var lineText = self.inputDataArr[lineNum].replace(/(^\s*)|(\s*$)/g,'');
                    // 执行用户配置的检测类型

                    if(lineText == "") continue;  // 空行不检测

                    for (var validateNum in self.config) {
                        if ($.textDetection.validate.method[self.config[validateNum]] != undefined) {
                            notHasError = $.textDetection.validate.method[self.config[validateNum]](lineText, lineNum - 0 + 1, self.config[validateNum],self.options) && notHasError;
                        } else {
                            alert('config配置有误，' + self.config[validateNum] + ' 方法不存在');
                        }
                    }
                }

                // 木有错误
                notHasError && $.textDetection.consoleLog("猴赛雷 ✪ ω ✪，木有错误 ！", self.options.consoleWrap,"success");
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
        setlineNums: function () {
            var html = "",
                nums = this.getLineNums();

            for (var i = 0; i <= nums - 1; i++) {
                html += '<span>' + (i + 1) + '</span>';
            }

            this.$lineNums.html(html);
            this.setTextAreaHeight(this.$lineNums.outerHeight());
        },

        /**
         *  设置 textarea 高度
         */
        setTextAreaHeight: function (height) {
            this.$inputElm.height(height - 10 * 2 + 5); // padding : 10  +5 滚动条
        },

        /**
         *  获取输入框行数
         */
        getLineNums: function () {
            return this.inputDataArr.length;
        }
    };

    $.fn.textDetection = function (options) {
        this.each(function () {
            new TextDetection(this, $.extend({}, $.textDetection.defaults, options));
        });
    };


})(jQuery, window);

$(function () {
    /**
     * @params options
     * @author Liu.Jun
     */
    $("#js_detection").textDetection();
});