(function ($,window) {
    window.TextDetection = function () {
        this.arrData = new Array();
        this.init();
    };

    TextDetection.prototype = {
        init : function () {

        },
        bindEvent : function () {

        },
        setTextData : function () {
            
        },
        getTextData: function () {

        },
        setConfig : function () {

        },
        getLineNums : function () {
            document.getElementById("js_inputText").value.split(/\r?\n|\r/).length;
        },
        validate : {


        }
    };
    
})(jQuery,window);

$(function () {
    var config = ["check1"];

    var text = document.getElementById("js_inputText").value;
    new TextDetection("text",{
        config : [""]
    });
});