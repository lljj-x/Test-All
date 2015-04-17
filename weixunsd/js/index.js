/**
 * Created by LiuJun on 15-4-5下午2:06.
 */
weixunData = {
    'weixun-anli-jingji' : '<div class="slide fp-slide fp-table" data-anchor="slide-anli1" style=""><div class="fp-tableCell" style="height:100%"><div class="table-bg-relative"><div class="table-bg-absolute"><div class="weixun-content-bg"><div class="weixun-content"><div class="section-title">背景</div><div class="section-content">对京基集团旗下昂驰动画的作品进行推广，为后期京基昂驰大电影的宣传做铺垫，最终建立京基昂驰企业品牌与动画IP形象。</div></div></div></div><div class="weixun-icon p-bottom"><a class="a-left weixun-prev" href="javascript:void(0);"><span class="icon-arrow-left"></span></a> <a class="a-right weixun-next" href="javascript:void(0);"><span class="icon-arrow-right"></span></a></div></div></div></div><div class="slide fp-slide fp-table" data-anchor="slide-anli2" style=""><div class="fp-tableCell" style="height:100%"><div class="table-bg-relative"><div class="table-bg-absolute"><div class="weixun-content-bg"><div class="weixun-content"><div class="section-title">挑战</div><div class="section-content">市场动画片种类繁多，国产动画口碑不佳，昂驰豆豆动画的知名度不高，推广难度较大。</div></div></div></div><div class="weixun-icon p-bottom"><a class="a-left weixun-prev" href="javascript:void(0);"><span class="icon-arrow-left"></span></a> <a class="a-center weixun-first" href="javascript:void(0);"><span class="icon-indent-left"></span></a> <a class="a-right weixun-next" href="javascript:void(0);"><span class="icon-arrow-right"></span></a></div></div></div></div><div class="slide fp-slide fp-table" data-anchor="slide-anli3" style=""><div class="fp-tableCell" style="height:100%"><div class="table-bg-relative"><div class="table-bg-absolute"><div class="weixun-content-bg"><div class="weixun-content"><div class="section-title">创意</div><div class="section-content">1、与微博大V合作，利用双方的粉丝进行流量共享与互导，集聚更多粉丝，成功塑造昂驰豆豆的“二货”精神，推出#二货快乐基金#<br>2、在目前最火爆的微信中，利用最新技术手段开发 #二货指数# HtmL5游戏，增加粉丝互动性，达到微博、微信相互导流量。<br>结果：微博粉丝20万， 全网曝光量1.3亿<br>微信粉丝增加3万，平均阅读量4000。<br>成功加强了豆豆的2B形象的塑造，拉近了品牌与粉丝的距离，建立豆豆社会化品牌新形象。</div></div></div></div><div class="weixun-icon p-bottom"><a class="a-left weixun-prev" href="javascript:void(0);"><span class="icon-arrow-left"></span></a> <a class="a-right weixun-first" href="javascript:void(0);"><span class="icon-indent-left"></span></a></div></div></div></div>',
};
weixunResizeTimer = null;

$.supports = function(prop){
    var div = document.createElement('div'),
        vendors = 'Khtml O Moz Webkit'.split(' '),
        len = vendors.length;
    if ( prop in div.style ) return true;
    if ('-ms-' + prop in div.style) return true;
    prop = prop.replace(/^[a-z]/, function(val) {
        return val.toUpperCase();
    });
    while(len--) {
        if ( vendors[len] + prop in div.style ) {
            return true;
        }
    }
    return false;
};
var getResizePaddingTop = function(){
    return ($("#header>.weixun-top-bg").height() >90) ? 90 : $("#header>.weixun-top-bg").height();
}

$.fn.resizeOverFlow = function(){
//    var $_wbg = $(".weixun-content-bg");
//    var parentHeight = $(window).height();
    $(".weixun-content-bg").css({
        "paddingTop" : getResizePaddingTop() + "px"
        // "height" : (parentHeight - getResizePaddingTop()) + "px"
    })
}
$(window).resize(function(){
    clearTimeout(weixunResizeTimer);
    weixunResizeTimer = setTimeout(function(){
        $.fn.resizeOverFlow();
    },300);
});

$.fn.addWeixunEvent = function(){
    $(".section").each(function(){
       var $section = $(this);
//        $section.find(".weixun-prev").click(function(){
//            $.fn.fullpage.moveSlideLeft();
//        })
//        $section.find(".weixun-next").click(function(){
//            $.fn.fullpage.moveSlideRight();
//        })
//        $section.find(".weixun-first").click(function(){
//            $.fn.fullpage.moveTo($section.index() + 1, 0);
//        })
//        $section.find(".weixun-down").click(function(){
//            $.fn.fullpage.moveSectionDown();
//        })
    });
};


$(function () {
    var scrollingSpeed = 700;
    var arrBgColor = ['rgb(1,164,144)', 'rgb(0,137,208)', 'rgb(1,164,144)', 'rgb(0,137,208)', 'rgb(1,164,144)', 'rgb(0,137,208)', 'rgb(1,164,144)', 'rgb(0,137,208)', 'rgb(1,164,144)', 'rgb(0,137,208)', 'rgb(1,164,144)'];
    $('#fullpage').fullpage({
        'verticalCentered': false,
        'css3': $.supports('animation'),
        slidesNavigation: true,
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
        menu: '#nav-menu',
        scrollingSpeed: scrollingSpeed,
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
        anchors: ['Slide1', 'Slide2', 'Slide3', 'Slide4', 'Slide5', 'Slide6', 'Slide7', 'Slide8', 'Slide9', 'Slide10', 'Slide11'],
        sectionsColor: arrBgColor,
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,
        controlArrows: true,
        verticalCentered: true,
        // paddingTop: getResizePaddingTop(),
        paddingTop: 0,
        paddingBottom: '0',
        responsive: 0,

        sectionSelector: '.section',
        slideSelector: '.slide',
        afterRender: function(){
            // ready
            $("#preloader").fadeOut();
            if($("#section_1").hasClass("active")){
                $("#fullpage").children(".section").first().find(".weixun-content").addClass("fadeInDown");
                $(".bg-color").css({
                    "background-color" : arrBgColor[0]
                });
            }
            $.fn.resizeOverFlow();
            $.fn.addWeixunEvent();
        },
        afterLoad: function(anchorLink, index){
            if(index === 1){
                $("#header").removeClass("section_1_out");
            }else{
                $("#header").addClass("section_1_out");
            }
            if((index % 2) === 0){
                $("#header").addClass("even").removeClass("odd");
            }else{
                $("#header").addClass("odd").removeClass("even");
            }

        },
        onLeave: function(index, nextIndex, direction){
            setTimeout(function(){
                $("#fullpage").children(".section").eq(nextIndex -1).find(".weixun-content-fade").addClass("fadeInDown");
                $("#fullpage").children(".section").eq(index -1).find(".weixun-content-fade").removeClass("fadeInDown");
                $(".bg-color").css({
                    "background-color" : arrBgColor[nextIndex - 1]
                });
            },scrollingSpeed);
        }
    });

    $(document).on("click",".ajax-content>a",function(e){
        e.preventDefault();
        var thisDataId = $(this).attr("getData");
        $.fn.fullpage.weixunAddSlide('#' + $(this).closest(".slide").attr("id"),weixunData[thisDataId],$(this).closest(".section").index() + 1);
    });

    $(document).on("click",".weixun-prev",function(e){
        $.fn.fullpage.moveSlideLeft();
    })

    $(document).on("click",".weixun-next",function(e){
        $.fn.fullpage.moveSlideRight();
    })
    $(document).on("click",".weixun-first",function(e){
        $.fn.fullpage.moveTo($(this).closest(".section").index() + 1, 0);
    })
    $(document).on("click",".weixun-down",function(e){
        $.fn.fullpage.moveSectionDown();
    });

})
