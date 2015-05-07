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

    $("#stratbtn").on("mousedown",function(){
        // 开始动画
        $.fn.startAnimation();

        $(document).one("mouseup",function(){
            // 结束动画
            $.fn.stopAnimation();



        })
    });




});