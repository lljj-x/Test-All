"use strict";
(function ($, window) {
    // 所有操作不能重写该方法
    $.textDetection = {
        // 默认参数
        defaults: {
            config: ["detectionUrl","detectionLength","detectionImgAttr","detectionTagP","detectionTableMerger"],  // 按行匹配
            configTitle:["检测代码出现链接不规范或图片命名不规范：", "检测代码超过了500字符：", "检测代码未添加alt/height/width信息：", "检测代码包含p标签：", "检测代码包含 rowspan / colspan 属性："],

            fullTextSearchConfig : ["detectionEmail"], // 全文搜索
            fullTextSearchConfigTitle : ["检测是否包含退订代码："],

            inputElm: "#js_inputText",
            consoleWrap : $("#js_consoleWrap")
        },

        htmlEncode: function (str) {
            var s;
            if (str.length == 0) return "";
            s = str.replace(/&/g, ">");
            s = s.replace(/</g, "<");
            s = s.replace(/>/g, ">");
            s = s.replace(/ /g, " ");
            s = s.replace(/\'/g, "'");
            s = s.replace(/\"/g, '"');
            s = s.replace(/\n/g, "<br>");
            return s;
        },
        htmlDecode : function (str) {
            var s;
            if (str.length == 0) return "";
            s = str.replace(/>/g, "&");
            s = s.replace(/</g, "<");
            s = s.replace(/>/g, ">");
            s = s.replace(/ /g, " ");
            s = s.replace(/'/g, "\'");
            s = s.replace(/"/g, "\"");
            s = s.replace(/<br>/g, "\n");
            return s;
        },

        // 输出提示信息
        consoleLog: function (msg, $consoleWrap,className) {
            className = className || "fail";

            // 过滤 html 标签只留 span
            var html = $("<p />").text(msg).html().replace('&lt;span&gt;',"<span>").replace('&lt;/span&gt;',"</span>");
            $("<p />").html(html).attr({
                "class": className
            }).appendTo($consoleWrap);
        },

        validate: {
            // 默认错误
            defaultError: {
                detectionUrlSpace: '第 {0} 行： 链接 "{1}" 中存在 <span>空格</span>',
                detectionUrlSlash: '第 {0} 行： 链接 "{1}" 以 <span>/</span> 结尾',
                detectionUrlQmark: '第 {0} 行： 链接 "{1}" 中包含 <span>?</span>',
                detectionUrlImageNum: "第 {0} 行： 图片 '{1}' 图片命名中包含有 <span>数字</span>",
                detectionLength : '第 {0} 行： 代码超过 <span>500</span> 字符',
                detectionImgAttr : "第 {0} 行： 图片 '{1}' 未添加 <span>alt/height/width</span> 信息",
                detectionTagP : '第 {0} 行： 代码 "{1}" 包含 <span>p</span> 标签',

                detectionEmail : "没有发现退订代码  ... <span>{$email}</span>  ...",
                detectionTableMerger : '第 {0} 行： 包含 <span>{2}</span> 标签'
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
                        matchUrlArr = text.match(reg);

                    // 首先匹配到 " "首尾包含 0- 个空白的url
                    if (matchUrlArr) {
                        var reBool = true,
                            matchUrl;

                        for (var i =0;i<matchUrlArr.length;i++) {
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
                            if (matchUrl.indexOf('?') > -1 && matchUrl.indexOf('{track_code}') < 0) {
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
                        imgTagArr = text.match(reg);

                    if (imgTagArr) {
                        var imgTag,
                            reBool = true;

                        // 一行可能存在多个匹配
                        for (var i=0;i<=imgTagArr.length;imgTagArr++) {
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
                },
                detectionTagP : function (text, lineNum, funNam, options) {
                    var regClose = /(<\s*p.*?>).*?(<\s*\/\s*p\s*>)/g,
                        pTagArr = text.match(regClose),
                        reBool = true;
                    if(pTagArr){
                        // 完整闭合标签 p
                        for (var i=0;i<pTagArr.length;pTagArr++) {
                            $.textDetection.validate.setError(funNam, options, [lineNum,pTagArr[i]]);
                        }
                        reBool = false;
                    }else if(text.search(/<\s*p.*?>/) >-1 || text.search(/<\s*\/\s*p\s*>/) >-1 ){
                        // 开头 || 结束 p
                        $.textDetection.validate.setError(funNam, options, [lineNum,text]);
                        reBool = false;
                    }
                    return reBool;
                },
                detectionTableMerger : function (text, lineNum, funNam, options) {
                    var reBool = true;
                    if(text.indexOf('colspan') > -1){
                        $.textDetection.validate.setError(funNam, options, [lineNum,text,'colspan']);
                        reBool = false;
                    }

                    if(text.indexOf('rowspan') > -1){
                        $.textDetection.validate.setError(funNam, options, [lineNum,text,'rowspan']);
                        reBool = false;
                    }
                    return reBool;
                },

                // 全文检测方法参数不要 lineNum
                detectionEmail : function (text, funNam, options) {
                    // 整个文档直接检测 所以不要 lineNum
                    if(text.indexOf('{$email}') < 0){
                        $.textDetection.validate.setError(funNam, options);
                        return false;
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
        this.config = this.options.config;  // 按行匹配params Array
        this.fullTextSearchConfig = this.options.fullTextSearchConfig;  // 全文搜索 params Array
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
                self.inputElmVal = self.$inputElm.val();
                self.inputDataArr = self.inputElmVal.split(/\r?\n|\r/); // 先更新数据

                //self.setlineNums();     // 显示行号
                var globalNotHasHasError = true,
                    methodNotHasHasError,
                    cIndex = 1;           // 当前检测方法 index

                // 全文搜索
                for(var i in self.fullTextSearchConfig){
                    methodNotHasHasError = true;  // 默认每种检测方法没有错误
                    $.textDetection.consoleLog(cIndex + ' 、' + self.options.fullTextSearchConfigTitle[i], self.options.consoleWrap,"validate-title");
                    if($.textDetection.validate.method[self.fullTextSearchConfig[i]] != undefined){
                        methodNotHasHasError = $.textDetection.validate.method[self.fullTextSearchConfig[i]](self.inputElmVal, self.fullTextSearchConfig[i], self.options) && methodNotHasHasError;
                    }else {
                        alert('fullTextSearchConfig 配置有误，' + self.fullTextSearchConfig[i] + ' 方法不存在');
                    }

                    methodNotHasHasError && $.textDetection.consoleLog('木有错误 \\(^o^)/', self.options.consoleWrap,"success");
                    globalNotHasHasError = globalNotHasHasError && methodNotHasHasError;
                    cIndex ++ ;
                }

                // 执行用户配置的检测类型
                for (var validateNum in self.config) {
                    methodNotHasHasError = true;  // 默认每种检测方法没有错误
                    $.textDetection.consoleLog(cIndex + ' 、' + self.options.configTitle[validateNum], self.options.consoleWrap,"validate-title");
                    var currentMethod = $.textDetection.validate.method[self.config[validateNum]];
                    if(currentMethod != undefined){
                        for(var lineNum in self.inputDataArr){
                            // 剔除首尾空格
                            var lineText = self.inputDataArr[lineNum].replace(/(^\s*)|(\s*$)/g,'');
                            if(lineText == "") continue;  // 空行不检测
                            methodNotHasHasError = currentMethod(lineText, lineNum - 0 + 1, self.config[validateNum],self.options) && methodNotHasHasError;
                        }
                    }else{
                        alert('config 配置有误，' + self.config[validateNum] + ' 方法不存在');
                    }
                    methodNotHasHasError && $.textDetection.consoleLog('木有错误 \\(^o^)/', self.options.consoleWrap,"success");
                    globalNotHasHasError = globalNotHasHasError && methodNotHasHasError;
                    cIndex ++ ;
                }
                globalNotHasHasError && $.textDetection.consoleLog('猴赛雷 ✪ ω ✪ ,一个错误都木有 ！！！' , self.options.consoleWrap,"global-success");
            });
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