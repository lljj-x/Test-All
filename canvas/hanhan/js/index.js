/**
 * Created by Liu.Jun on 15-5-6.
 */
$(function(){
    //ready
//    $("#box-content").chenkImagesIsLoaded({
//        callback: function(){
//            // 准备画布
//            $.fn.drawCanvas();
//            $("#loading").fadeOut(300);
//        }
//    });

    $(window).on("load",function(){
        // 准备画布
        $.fn.drawCanvas();
        $("#loading").fadeOut(300);
    })

    var isTouch = false;

    // 桌面端缩放
    if(!isTouch){
        function setResetIframe(){
            var bW = $(window).width();
            if(bW < 640){
                // 设置缩放
                var ox = bW / 640;
                $("html").css({
                    zoom: ox
                })
            }
        }
        setResetIframe();
        $(window).resize(setResetIframe);
    }


    if( /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
        isTouch = true;
    }
    var startEvent = isTouch ? "touchstart" : "mousedown" ;
    var endEvent = isTouch ? "touchend" : "mouseup mouseout" ;
    $("#stratbtn").on(startEvent,function(event){
        // 开始动画
        event.preventDefault();
        $.fn.startAnimation();

        $(document).one(endEvent,function(event){
            // 结束动画
            event.preventDefault();
            $.fn.stopAnimation();
        })
    });

    // 背景音乐开关
    $("#box-sound").on(startEvent,function(event){
        event.preventDefault();
        var bgAudio = $("#sound")[0];
        if($(this).hasClass("off")){
            bgAudio.play();
            $(this).removeClass("off");
        }else{
            bgAudio.pause();
            $(this).addClass("off");
        }
    })
});