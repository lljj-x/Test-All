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
var changeEndCall = function(swiper){
    $("#v-wrapper").children(".swiper-slide-active").addClass("m-active").siblings(".swiper-slide").removeClass("m-active");
}

$(document).ready(function(){
    mySwiper = new Swiper('.swiper-container',{
        direction : 'vertical',
        mousewheelControl : true,
        watchSlidesProgress: true,
        /**
        effect : 'coverflow',
        coverflow: {
            rotate: 20,
            stretch: 40,
            depth: 300,
            modifier: 2,
            slideShadows : true
        },
        **/

        /**
        onProgress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides[i];
                var progress = slide.progress;
                var translate, boxShadow;

                translate = progress * swiper.height * 0.8;
                scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                boxShadowOpacity = 0;

                slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';

                if (i == swiper.myactive) {
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                    es.zIndex=0;
                }else{
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
                    es.zIndex=1;
                }
            }
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                es = swiper.slides[i].style;
                es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
            }
        },
        onTransitionEnd: function(swiper, speed) {
            swiper.myactive = swiper.activeIndex;
        },
        **/

        speed : 300,
        onInit: initCall,
        onSlideChangeEnd: changeEndCall
    });
});

