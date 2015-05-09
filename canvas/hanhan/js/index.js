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

    //  bind event
    $("#stratbtn").on("touchstart",function(event){
        // 开始动画
        event.preventDefault();
        $.fn.startAnimation();

        $(document).one("touchend",function(event){
            // 结束动画
            event.preventDefault();
            $.fn.stopAnimation();
        })
    });

    // 背景音乐开关
    $("#box-sound").on("touchstart",function(event){
        event.preventDefault();

        var bgAudio = $("#bgAudio")[0];
        if($(this).hasClass("off")){
            $(this).removeClass("off");
        }else{
            $(this).addClass("off");
        }
    })

});