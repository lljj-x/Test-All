/**
 * Created by Liu.Jun on 15-5-13.
 */
var currentNum = 0,
    maxNum = 10;
var yuData = {
    size:{
        w: 80,
        h: 105,
        dW: 80,
        dH: 105
    },
    0:{
        left:"7%",top:"21%"
    },
    1:{
        left:"68%",top:"19%"
    },
    2:{
        left:"22%",top:"18%"
    },
    3:{
        left:"36%",top:"32%"
    },
    4:{
        left:"79%",top:"25%"
    },
    5:{
        left:"62%",top:"20%"
    },
    6:{
        left:"27%",top:"25%"
    },
    7:{
        left:"52%",top:"6%"
    },
    8:{
        left:"34%",top:"22%"
    },
    9:{
        left:"10%",top:"16%"
    },
    10:{
        left:"10%",top:"10%"
    }
}

$.fn.myshow = function(){
    $(this).addClass("show");
}

$(function(){
    var cW,
        defaultWidth = 1920;
    function resizeData(){
        cW = $(window).width();
        var xx = cW / defaultWidth;
        yuData.size.w = Math.round(yuData.size.dW * xx);
        yuData.size.h = Math.round(yuData.size.dH * xx);
    }

    function addYu(i,name,str){
        if($("#yuanwang_" + i).length > 0){
            $("#yuanwang_" + i).removeClass("show");
            $("#yuanwang_" + i).find(".yu-name").text(name + "：");
            $("#yuanwang_" + i).find(".yu-str").attr("my-title",str).text(str.substr(0,15));
            setTimeout(function(){
                $("#yuanwang_" + i).myshow();
            },300);
        }else{
            $("<div />").attr({
                'id' : "yuanwang_" + i,
                'class' : "yuan"
            }).css({
                width: yuData.size.w,
                height: yuData.size.h
            }).css(yuData[i]).appendTo("#yu-bg")
                .append(
                    $("<img />").attr({"src": "images/g.png", "class": "img-g"})
                )
                .append(
                    $("<div />").attr({"class":"yu-txt"})
                        .append($("<div />").attr("class","yu-name").text(name + "："))
                        .append($("<div />").attr({"class":"yu-str","my-title" : str}).text(str.substr(0,15)))
                );
        }
        $("#yuanwang_" + i).addClass("yao-animation");
    }

    function init(){
        // 初始化数据
        resizeData();
        $.each(jsonData,function(i,v){
            addYu(i, v.name, v.str);
            currentNum = i;
        });
    }

    $.fn.mySlideFadeIn = function(outCall){
        this.each(function(){
            $(this).show();
            var $this = $(this);
            $(".bg").fadeIn(200,function(){
                $this.myshow();
                $(".bg").one("click",function(e){
                    e.preventDefault();
                    $this.mySlideFadeOut(outCall);
                })
            })
        });
        return this;
    }

    $.fn.mySlideFadeOut = function(call){
        call = call || function(){};
        this.each(function(){
            $this = $(this);
            $(this).removeClass("show");
            $(".bg").fadeOut(200,function(){
                $this.hide();
                call.call();
            })
        })
    }

    // resize
    var resizeTimer = null;
    $(window).resize(function(){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            resizeData();
            var $yuan = $(".yuan");
            if($yuan.length > 0){
                $yuan.each(function(){
                    $(this).css({
                        width : yuData.size.w,
                        height: yuData.size.h
                    })
                })
            }
        },70);
    });

    init();
    setTimeout(function(){
        $(".yuan").myshow();
    },400);

    // event
    $("#btn-add-yu").click(function(){
        $("#add-form").mySlideFadeIn(function(){
            $("#name").val("");
            $("#number").val("");
            $("#str").val("");
        });
    })
    $("#btn-weixin").click(function(){});

    $("#yu-bg").on("click",".yuan",function(){
        $("#de-yuanwang").css({
            left : (yuData.size.w + 15) + "px",
            top : 0,
            width: yuData.size.w * 3 + "px"
        })
        $this = $(this);
        $(this).removeClass("yao-animation");
        $(this).append($("#de-yuanwang"));
        var name = $(this).find(".yu-name").text();
        var str = $(this).find(".yu-str").attr("my-title");

        $("#de-yuanwang").find(".de-name").text(name);
        $("#de-yuanwang").find(".de-str").text(str);

        var curId = $this.attr("id");
        $("#de-yuanwang").mySlideFadeIn(function(){
            $("#" + curId).addClass("yao-animation");
        });
    })

    // ajax
    function check() {
        var telreg = /^1[3458]\d{9}$/gi;
        var name = $.trim($("#name").val());
        var number =$.trim($("#number").val());
        var str = $.trim($("#str").val());

        if (name == "" || name == "您的姓名" || name.length > 5) {
            alert("请输入正确的名称");
            $("#name").focus();
            return false;
        }else if (number == "" || number == "您的联系电话") {
            alert("请输入联系电话")
            $("#number").focus();
        }else if (number == "" || number == "您的联系电话") {
            alert("请输入联系电话")
            $("#number").focus();
        }else if (!telreg.test(number)) {
            alert("请输入正确的联系电话")
            $("#number").focus();
        }else if (str == "" || str == "您的许愿") {
            alert("请输入您的许愿")
            $("#str").focus();
            return false;
        }else {
            return true;
        }
    }

    $("#submit").click(function(event){
        event.preventDefault();
        if(check()){
            $.ajax({
                type : "POST",
                url : "add.php",
                data : $("#xuyuan-form").serialize(),
                dataType : "text",
                success : function(data,textStatus){
                    if(data == 'success'){
                        // 添加
                        var ci = (currentNum + 1 >= maxNum) ? Math.ceil(Math.random() * maxNum) : currentNum + 1;
                        addYu(ci, $.trim($("#name").val()), $.trim($("#str").val()));
                        $("#add-form").mySlideFadeOut(function(){
                            $("#name").val("");
                            $("#number").val("");
                            $("#str").val("");
                            $("#yuanwang_" + (++ currentNum)).addClass("show");
                        });
                    }else{
                        alert(data);
                    }
                }
            })
        }
    });
})