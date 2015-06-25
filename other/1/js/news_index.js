/**
 * Created by Liu.Jun on 2015/6/13.
 */
(function($){
    /**
     * 年月日 联动 + 模拟 select 样式
     * 必须先选择  年 > 月 >日
     */

    $.fn.mySelect = function(options){
        var options = $.extend({
            elementY : $("#news-search-year"),
            elementM : $("#news-search-month"),
            elementD : $("#news-search-day"),
            slide: true,
            slideSpeed: 200
        },options);

        var isLeapYear = function(years){
            return (years%4==0 && years%100!=0)||(years%400==0);
        }

        var setDisabled = function(parent){
            parent.find(".news-select-drop").addClass("disabled");
        }

        var removeDisabled = function(parent){
            parent.find(".news-select-drop").removeClass("disabled");
        }

        var createLi = function(length){
            var liStr = "";
            for(var i = 1;i<=length;i++){
                liStr = liStr + '<li class="option" data-value="' + i + '">' + i + '</li>';
            }
            return liStr;
        }

        var setDays = function($dayElm,length,currentDay){
            var liStr = createLi(length);

            // 设置模拟样式
            $dayElm.children("ul").html($(liStr));

            // 设置select框
            var defaultOptionsText =  options.elementD.find("option").first().text()
            var selectOptions = '<option value="">' + defaultOptionsText + '</option>';
            for(var i = 1;i<=length;i++){
                selectOptions = selectOptions + '<option value=' + i + '>' + 2000 + '</option>';
            }
            options.elementD.html($(selectOptions));

            // 设置选中
            options.elementD.val(currentDay);
            // 设置样式
            if(currentDay > 0 && currentDay <= length) {

            }else{
                $dayElm.children(".news-select-drop").find("span").eq(0).text(defaultOptionsText);
            }
        }
        
        var selectList = function () {
            
        }

        var createElm = function($currentEle,length){
            var $returnDiv = $("<div />").append($("<ul />").addClass("news-drop-list").hide()).addClass("mypr");
            $currentEle.hide().find("option").each(function(i,v){
                var $this = $(this);
                if( i === 0){
                    $("<p />").attr({
                        class : "news-select-drop news-search-border"
                    }).append($("<span />").text($this.text()))
                        .append($("<span />").attr({
                            class : "right-drop-icon"
                        }).append($("<span />"))
                    ).prependTo($returnDiv);
                }else{
                    $("<li />").text($this.text()).attr({
                        class : "option",
                        "data-value" : $this.val()
                    }).appendTo($returnDiv.children("ul"));
                }
            });

            if(arguments[1]){
                var liStr = createLi(length);
                $returnDiv.children("ul").append($(liStr));
            }

            $returnDiv.appendTo($currentEle.parent());
            return $returnDiv;
        }

        // 年
        var $yearElm = createElm(options.elementY);

        // 月
        var $monthElm = createElm(options.elementM);
        setDisabled($monthElm);

        // 日 通过月份动态
        var $dayElm = createElm(options.elementD);
        setDisabled($dayElm);

        // 下拉框
        $(".news-select-drop").on("click",function(e){
            e.stopPropagation();
            $(".news-drop-list").hide();
            if($(this).hasClass("disabled")) return;
            if(options.slide){
                $(this).next(".news-drop-list").stop(true,false).slideToggle(options.slideSpeed);
            }else{
                $(this).next(".news-drop-list").toggle();
            }
        });

        $yearElm.find(".news-drop-list").on("click",".option",function(){
            // 切换年份
            var currentY =  $(this).data("value");
            // 设置模拟样式
            $(this).closest(".mypr").find(".news-select-drop").children("span").eq(0).text($(this).text());
            // 设置select 值
            options.elementY.val(currentY);
            removeDisabled($monthElm);

            // 如果当前月份为2月份
            if(options.elementM.val() == '2'){
                var days = isLeapYear(currentY) ? 29 : 28;
                setDays($dayElm,days,29);
            }
        });

        $monthElm.find(".news-drop-list").on("click",".option",function(){
            // 切换月份
            var currentM =  $(this).data("value");
            $(this).closest(".mypr").find(".news-select-drop").children("span").eq(0).text($(this).text()); //设置模拟位置
            options.elementM.val(currentM); // 设置原始 select
            removeDisabled($dayElm);

            var data31 = [1,3,5,7,8,10,12];

            // 获取当月天数
            var days;
            if(currentM == '2'){
                if(isLeapYear(options.elementY.val())){
                    // 闰年
                    days = 29;
                }else{
                    days = 28;
                }
            }else{
                if($.inArray(currentM,data31) > -1){
                    days = 31;
                }else{
                    days = 30;
                }
            }

            // 设置到模拟样式和select
            setDays($dayElm,days,options.elementD.val());
        });

        $dayElm.find(".news-drop-list").on("click",".option",function(){
            // 切换日
            var currentD =  $(this).data("value");
            $(this).closest(".mypr").find(".news-select-drop").children("span").eq(0).text($(this).text()); //设置模拟位置
            options.elementD.val(currentD);
        });

        $("body").on("click",function(){
            if($(".news-drop-list").is(":visible")){
                $(".news-drop-list").stop(true,false).slideUp(options.slideSpeed);
            }
        })
    };

    // 搜索按钮
    $(function () {
        if($(".news-search-submit").length > 0){
            // 文章和详细页面搜索功能
            $(".news-search-submit").click(function (e) {
                e.preventDefault();
                var y = $("#news-search-year").val() ? $("#news-search-year").val() : 0;
                var m = $("#news-search-month").val() ? $("#news-search-month").val() : 0;
                var d = $("#news-search-day").val() ? $("#news-search-day").val() : 0;
                var k = $(".news-search-key").val();
                if(k === ""){
                    layer.tips('请输入关键词 ！', '.news-search-key', {
                        tips: [4, '#ffcc01']
                    });
                    $(".news-search-key").focus();
                    return false;
                }
                var url = '/news/y' + y + '/m' + m + '/d' + d + '/k' + k + '/' ;
                window.location.href = url;
            });
        }
    });
})(jQuery);