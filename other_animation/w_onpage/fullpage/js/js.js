/**
 * Created by liu.jun on 15-4-14.
 */
$(document).ready(function(){
    var myAudio = $("#bg-audio>audio")[0];
    $(".audio-btn").on("click",function(){
        if($(this).hasClass("fa-spin")){
            // 播放中
            myAudio.pause();
        }else{
            // 暂停中
            myAudio.play();
        }
        $(this).toggleClass("fa-spin");
    });

    $('#my-fullpage').fullpage({
        css3: true,
        slidesNavigation: true,
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['one', 'two', 'three', 'x', 'five'],
        scrollingSpeed: 700,
        autoScrolling: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: false,
        continuousVertical: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 3,
        anchors: ['Slide1', 'Slide2', 'Slide3', 'Slide4', 'Slide5'],
        sectionsColor: ['rgb(250, 168, 47)', '#00FF00', '#254587', '#695684', '#254875'],
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        controlArrows: true,
        verticalCentered: true,

        paddingTop: 0,
        paddingBottom: '0',
        responsive: 0,

        sectionSelector: '.section',
        slideSelector: '.slide',
        afterRender: function(){
            // ready
            $("#my-fullpage").show();
            $("#preloader").delay(300).fadeOut(500);


            if($("#section_1").hasClass("active")){
                $("#section_1").addClass("m-active");
            }
        },
        afterLoad: function(anchorLink, index){
            $(".section").eq(index - 1).addClass("m-active").siblings(".section").removeClass("m-active");
        },
        onLeave: function(index, nextIndex, direction){

        }
    });
})