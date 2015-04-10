/**
 * Created by LiuJun on 15-4-5下午2:06.
 */
$(document).ready(function(){
    function slideSocial(){
        $("#toggle-menu").toggleClass("current").next("#drop-menu").slideToggle();
    }

    function slideMenu(){
        if($("#mainMenu").hasClass("current")){
            var right1 = '0px';
            var right2 = '-240px';
        }else{
            var right1 = '240px';
            var right2 = '0px';
        }

        $("#mainMenu").toggleClass("current");
        var $header = $("#header");

        $("#header>.weixun-top-bg,.wrap").css({
            "right": right1
        });

        $header.children("#menu").css({
            "right": right2
        });
    }

    $("#toggle-menu").click(function(e){
        e.stopPropagation();
        slideSocial();
        if($("#mainMenu").hasClass("current")){
            slideMenu();
        }
    });
    $("#mainMenu").click(function(e){
        e.stopPropagation();
        slideMenu();
        if($("#toggle-menu").hasClass("current")){
            slideSocial();
        }
    });

    $("body").click(function(){
        if($("#toggle-menu").hasClass("current")){
            slideSocial();
        }
        if($("#mainMenu").hasClass("current")){
            slideMenu();
        }
    });
})