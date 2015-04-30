/**
 * Created by liu.jun on 15-4-15.
 */
var mySwiper;

var initCall = function(){
    $("#preloader").delay(500).fadeOut(500);
    var $_firstSlide = $("#v-wrapper").children(".swiper-slide").first();
    if($_firstSlide.hasClass("swiper-slide-active")){
        $_firstSlide.addClass("m-active");
    }
}

$(document).ready(function(){
    $("#flipbook").turn({
        width: 320,
        height: 506,
        elevation: 20,
        display :'single',
        gradients: true,
        autoCenter: true
    });
});

