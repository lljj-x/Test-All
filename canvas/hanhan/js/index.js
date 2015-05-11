/**
 * Created by Liu.Jun on 15-5-6.
 */
$(function(){
    //ready
    $("#box-content").chenkImagesIsLoaded({
        callback: function(){
            $("#loading").fadeOut(300);
        }
    });

    /* ua */
    /**
    var UA = function(){
        var userAgent = navigator.userAgent.toLowerCase();
        return {
            ipad: /ipad/.test(userAgent),
            iphone: /iphone/.test(userAgent),
            android: /android/.test(userAgent),
            qqnews: /qqnews/.test(userAgent),
            weixin: /micromessenger/.test(userAgent)
        };
    }
    **/

    var isTouch = false;
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