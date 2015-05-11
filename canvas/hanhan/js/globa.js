/**
 * Created by Liu.Jun on 15-5-6.
 */
(function($){
    $.extend($.fn,{
        chenkImagesIsLoaded: function(options){
            var defaults = {
                bgimageClassName : 'has-bg-image',
                callback : function(){}
            }
            options = $.extend(defaults,options);

            var myThis = this;
            imagesLoaded(myThis.get(0),function(){
                var image;
                var hasBgSection = myThis.find("." + options.bgimageClassName);
                if(hasBgSection.length > 0){
                    // 有背景图片
                    var tmpImages = $("<div />");

                    // 将背景图片以图片的形式插入到 div 中
                    hasBgSection.each(function(){
                        image = $(this).css("background-image").match(/url\((['"])?(.*?)\1\)/);
                        if(image){
                            tmpImages.append($("<img />").attr({
                                "src" : $(this).css("background-image").match(/url\((['"])?(.*?)\1\)/).pop()
                            }))
                        }
                    });
                    imagesLoaded(tmpImages[0],options.callback);

                }else{
                    // 没有背景图片 直接回调
                    options.callback.call();
                }
            })
            return this;
        }
    });
})(Zepto);

(function($,window,document){
    'use strice';
    var ZhenTimer,
        drawTimer,

        ctxArr = [],
        objImgsArr = [],

        DX = 0,
        DY = 0,
        CurrentNum = 0; // 0 - - - 5
        IsAnimation = false;
        MainTranslateY = -20,

        ZhenPosition = 0;
        ZhenNum = -121,

        canvasT = [48, 86, 594, 1708, 3103, 4355, 5730],
        canvasH = [440, 963, 1400, 1147, 1152, 988],
        data = [[8, 0, 7, 10, 7, 0, 4, 4, 7], [10, 10, 10, 10, 10, 10, 10, 11, 0, 0, 0, 10, 10, 5, 9, 5, 0, 7, 8, 8], [10, 10, 10, 10, 10, 10, 10, 11, 0, 0, 0, 9, 4, 8, 7, 0, 10, 7, 7, 10, 10, 10, 0, 10, 4, 5, 9], [10, 10, 10, 10, 10, 10, 10, 11, 0, 0, 0, 8, 7, 10, 7, 10, 8, 8, 0, 3, 8, 10, 6, 9], [10, 10, 10, 10, 10, 10, 10, 11, 0, 0, 0, 3, 6, 7, 4, 7, 6, 0, 10, 9, 9, 7, 0, 4, 6, 5], [10, 10, 10, 10, 10, 10, 10, 11, 0, 0, 0, 10, 7, 7, 0, 9, 9, 3, 0, 8, 0, 7]]

    var startBtnId = 'stratbtn';

    function startBtnChange(type){
        if(type === 'on'){
            $("#" + startBtnId).addClass("on");
        }else{
            $("#" + startBtnId).removeClass("on");
        }
    }

    function deAnimation(){
        $("#sl-2-3").animate({
            transform: "rotate(5deg)"
        },100,'ease-out',function(){
            $(this).animate({
                transform: "rotate(0deg)"
            },50,'ease-out')
        })
        $("#sl-2-4").animate({
            transform: "rotate(-5deg)"
        },100,'ease-out',function(){
            $(this).animate({
                transform: "rotate(0deg)"
            },50,'ease-out')
        })
    }

    function zhenAnimaion(){
        ZhenPosition  += ZhenNum;
        (ZhenPosition === 0) ? (ZhenPosition += ZhenNum) : ZhenPosition;
        if(ZhenNum < 0 && ZhenPosition === -2299 || ZhenNum > 0 && ZhenPosition === 2299){
            ZhenNum = -ZhenNum;
        }
        $("#szhen").css({
            backgroundPosition : "0px " + ZhenPosition + "px"
        })
    }

    function drawCanvas(){
        var $canvasBg = $("#spanbox");
        var $canvasArr = [];
        $.each(canvasH,function(i,v){
            $canvas = $("<canvas />").attr({
                id: "canvas" + (i + 1),
                width: "450",
                height: canvasH[i]
            }).css({
                left: canvasT[0] + "px",
                top: canvasT[i + 1] + "px",
                position : "absolute",
                display: "block"
            });
            $canvasBg.append($canvas);
            $canvasArr[i] = $canvas;

            objImgsArr[i]  = new Image();
            objImgsArr[i].src = 'http://test.local/canvas/hanhan/images/pages/' + (i + 1) + '.png';

            objImgsArr[i].onload = function(){
                ctxArr[i] = $canvasArr[i].get(0).getContext("2d");
                ctxArr[i].clearRect(0,0,$canvasArr[i].width(),$canvasArr[i].height());
            }
        })
    }

    function drawText(index, DX , DY){
        var ctx = ctxArr[index],
            image = objImgsArr[index];
        ctx.drawImage(image,DX * 45,DY * 44,45,44,DX * 45,DY * 44,45,44);
    }

    function setCss(){
        $("#szhen-bg").css({
            left: ((DX * 45) >= 280 ) ? 280 : (DX * 45)  + "px"
        });
        $("#gamebox").css({
            transform: "translate(0px, " + MainTranslateY + "px)"
        });
    }

    $.fn.bgAnimation = function(a,b,d,c){
        var myThis = this;
        var i = 0;
        var bt = setInterval(function(){
            if(i >= b){
                clearInterval(bt);
            }
            this[0].style.backgroundPosition = "0px " + (-a * i) + "px"
            i ++;
        },d);
        c.call();
    }

    function specialAnimation(){
        DY += 2; //跳过三行空格
        MainTranslateY -= (44 * 2);
        IsAnimation = true;

        var $curXlz = $(".xlz" + CurrentNum);
        $curXlz.addClass("back");
        $(".special-" + CurrentNum).chenkImagesIsLoaded({
            bgimageClassName : 'back',
            callback : function(){
                $curXlz.children("img").remove();
                $curXlz.bgAnimation(20,20,function(){
                    alert("xx");
                });
            }
        });


        switch (CurrentNum){
            case 0 :
                break;
            case 1:


                break;

            default :
                // 默认特殊动画
                break;
        }
    }

    function pageEndAnimation(){
        MainTranslateY = 0 - (parseInt($("#canvas" + (CurrentNum + 1)).css("top").replace("px","")) - 66);
        switch (CurrentNum - 1){
            case 0 :
                break;
            case 1:
                break;

            default :
                break;
        }
    }

    function clearTimer(){
        clearInterval(ZhenTimer);
        clearInterval(drawTimer);
    }

    function drawMain(){
        // 默认位置
        setCss();
        drawTimer = setInterval(function(){
            if((DY + 1) <= data[CurrentNum].length ){
                // 没有超过最后一行
//                console.log(DY + 1);
//                console.log(data[CurrentNum].length);
                setCss();
                if(data[CurrentNum][DY] === 11){
                    // 特殊动画
                    $.fn.stopAnimation();
                    MainTranslateY -= 44;
                    DY++;
                    setCss();
                    specialAnimation();
                    return;
                }

                if(DX < data[CurrentNum][DY]){
                    drawText(CurrentNum, DX , DY);
                }else{
                    // 换行
                    DY ++ ; //  加一行
                    DX = -1; //  移动到第一列
                    deAnimation(); //   两边爪子动一下
                    MainTranslateY -= 44; // 页面往上滚一行
                    clearInterval(drawTimer);
                    drawMain(); // 回调
                }
                DX ++ ;
            }else{
                // 到达下一页
                CurrentNum ++;
                DY = 0 ; //  移动到第一行
                DX = 0; //  移动到第一列
                pageEndAnimation();
            }
        },50);
    }

    /** fn **/
    $.fn.startAnimation = function(){
        if(IsAnimation) return false;

        startBtnChange('on');
        $("#szhen-bg").stop();
        $("#szhen-bg").animate({
            top : "13px"
        },100,'ease-out',function(){
            ZhenTimer = setInterval(zhenAnimaion,70);
            drawMain();
        });
        return;
    }

    $.fn.stopAnimation = function(){
        if(IsAnimation) return false;

        startBtnChange('off');
        clearTimer();
        $("#szhen-bg").animate({
            left : "131px"
        },100,"ease-out",function(){
            $(this).stop();
            clearTimer();
            $("#szhen").css({backgroundPosition:"0px 0px"});
        });
        return;
    }

    $(document).ready(function(){
        drawCanvas();
    });
})(Zepto,window,document);
