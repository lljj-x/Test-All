<!DOCTYPE html>
<html lang="en" class="over-y-hide">
<head>
    <?php include 'r_top.htm'; ?>
</head>
<body class="over-y-hide">
<header id="pageheader" >
    <?php include 'r_list_public_top.htm'; ?>
</header>

<div class="criMain">
    <div id="warp-middle">
        <section class="recruit_content pr">
            <div id="loading"></div>
            <div class="page page1">
                <div class="imgDiv middle center mapBg" data-dw="1188" data-dh="594">
                    <img class="wMap" src="../images/domeimg/jobs/campus_recruitment/wMap.png" alt=""/>
                    <div class="hasCss3 wline_bg percent_div">
                        <img class="wLine" src="../images/domeimg/jobs/campus_recruitment/wLines.png" alt=""/>
                        <img class="wIcon" src="../images/domeimg/jobs/campus_recruitment/wIcon.png" alt=""/>
                    </div>
                </div>
                <div class="imgDiv center hasCss3 bText" data-dw="850" data-dh="150">
                    <img class="imgText" src="../images/domeimg/jobs/campus_recruitment/text.png" alt=""/>
                </div>
            </div>

            <div class="page page2">
                <div class="cri-bg hasCss3"></div>
                <div class="imgDiv middle center" data-dh="700" data-dw="1200">
                    <div class="imgDiv hasCss3 middle chinaMapBg" data-dw="859" data-dh="700">
                        <img class="cMapB" src="../images/domeimg/jobs/campus_recruitment/cMap_b.png" alt=""/>
                        <img class="cMapW hasCss3" src="../images/domeimg/jobs/campus_recruitment/cMap_w.png" alt=""/>
                        <div class="cityBg hasCss3">
                            <a href="#" class="city1 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">大连</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city2 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">北京</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city3 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">郑州</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city4 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">西安</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city5 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">武汉</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city6 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">成都</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city7 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">南昌</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city8 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">长沙</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city9 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">广州</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city10 imgDiv" data-dw="10" data-dh="10">
                                <span class="city-name">南宁</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                            <a href="#" class="city11 imgDiv current" data-dw="10" data-dh="10">
                                <span class="city-name">深圳</span>
                                <span class="icon-origin"><span class="hasCss3 animation-origin"></span></span>
                            </a>
                        </div>
                    </div>
                    <div class="imgDiv rightQr hasCss3 middle" data-dw="111" data-dh="660">
                        <img src="../images/domeimg/jobs/campus_recruitment/lc.png" alt=""/>
                        <div class="qrCode imgDiv center" data-dw="120" data-dh="150">
                            <span class="cup js_showQr">环球二维码 <span class="qr-triangle crl-triangle"><span class="crl-triangle crl-triangle2"></span></span></span>
                            <img class="qrCodeImg mt10" src="../images/domeimg/jobs/campus_recruitment/qr.jpg" alt="环球易购微信二维码"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
<?php include 'r_foot_c_js.htm'; ?>

<script>
    $LAB.script("r_index.min.js")
        .script("imagesloaded.min.js")
        .wait(function () {
            var myRecruitPage = new RecruitPage($("#warp-middle").find("section"),{top: 84,defaultHeight: 750,resizeCalculated : 'height',minHeight: 300});

            $(".js_showQr").click(function () {
                $(".qrCodeImg").stop(true,false).slideToggle(300);
            });

            var checkLoading = function (call) {
                var myCall = call || $.noop;
                $("#warp-middle").imagesLoaded(function () {
                    $("#loading").fadeOut(500);
                    myCall();
                });
            }

            if($.supports("transition")){
                // css3 Animation 事件
                var pfx = ["webkit", "moz", "MS", "o", ""];

                function getVendorPrefix() {
                    var body = document.body || document.documentElement,
                        style = body.style,
                        i = 0;
                    while (i < pfx.length) {
                        if (typeof style[pfx[i] + 'Transition'] === 'string') {
                            return pfx[i];
                        }
                        i++;
                    }
                }

                var currentPrefix = '-' + getVendorPrefix() + '-';
                var currentEventName;
                switch (currentPrefix){
                    case '-webkit-' :
                        currentEventName = 'webkitAnimationEnd';
                        break;
                    case '-moz-' :
                        currentEventName = 'animationend';
                        break;
                    case '-MS-' :
                        currentEventName = 'MSAnimationEnd';
                        break;
                        break;
                    case '-o-' :
                        currentEventName = 'oanimationend';
                        break;
                    default :
                        currentEventName = 'animationend';
                        break;
                }

                $.fn.onePrefixedEvent = function (type,callback) {
                    // chrome 同时支持 animationend webkitAnimationEnd 导致异常
                    // this.one('webkitAnimationEnd oanimationend MSAnimationEnd animationend',callback);
                    // 修改为固定 animationend 事件，type参数无效
                    this.one(currentEventName,callback);
                }

                $.fn.css3 = function(data){
                    var css3Data = {};
                    $.each(data, function (i, v) {
                        css3Data[currentPrefix + i] = v;
                        css3Data[i] = v;
                    });
                    this.css(css3Data);
                }

                var $parent = $("#warp-middle");
                var $lineBg = $parent.find(".wline_bg");
                var $bText = $parent.find(".bText");
                var $mapBg = $parent.find(".mapBg");
                var $chinaMapBg = $parent.find('.chinaMapBg');
                var $bg = $parent.find(".cri-bg");
                var $chinaMapB = $parent.find(".cMapB");
                var $chinaMapW = $parent.find(".cMapW");
                var $cityBg = $parent.find(".cityBg");
                var $rightQr = $parent.find(".rightQr");

                var _startAnimation = function(e){
                    if(e){
                        // console.log(e.type);
                    }
                    $parent.dequeue('myAnimation');
                }

                var pageOneIn = function () {
                    $parent.clearQueue('myAnimation');
                    $parent.queue('myAnimation',[
                        function() {
                            setTimeout(function () {
                                $lineBg.css3({
                                    'pointer-events' : 'auto',
                                    'animation-name' : "zoomFadeIn",
                                    'animation-fill-mode' : 'forwards',
                                    'transform-origin': '75% 41%',
                                    'animation-duration' : '0.6s'
                                })
                            },800);
                            $lineBg.onePrefixedEvent("AnimationEnd",_startAnimation);
                        },
                        function() {
                            $mapBg.css3({
                                'pointer-events': 'auto',
                                'animation-name': 'moveUp',
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.6s'
                            });
                            $bText.css3({
                                'pointer-events': 'auto',
                                'animation-name': 'bottomfadeIn',
                                'animation-duration' : '0.6s',
                                'animation-fill-mode': 'forwards'
                            })
                            $bText.onePrefixedEvent("AnimationEnd", function () {
                                var timer = setTimeout(pageTwoIn,1500); // 进入第二页
                            });
                        }
                    ])

                    _startAnimation();
                }
                
                var pageTwoIn = function () {
                    $parent.clearQueue('myAnimation');
                    $parent.queue('myAnimation',[
                        function () {
                            $mapBg.css3({
                                'animation-name': 'mapBg2',
                                'pointer-events' : 'none',
                                'transform-origin' : '79% 40%',
                                'animation-duration' : '1s'
                            });
                            $chinaMapBg.css3({
                                'pointer-events' : 'auto',
                                'animation-name' : "chinaMapZoomFadeIn1",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.1s',
                                'transform-origin' : '75% 35%'
                            });

                            $lineBg.css3({
                                'pointer-events' : 'none',
                                'animation-name': 'fadeOut',
                                'animation-duration' : '0.7s'
                            });

                            $bText.css3({
                                'pointer-events' : 'none',
                                'animation-name': 'fadeOut'
                            });

                            $chinaMapBg.onePrefixedEvent("AnimationEnd", _startAnimation);
                        }, function () {
//                            $mapBg.css3({
//                                'animation-name': 'mapBg3',
//                                'animation-duration' : '0.9s',
//                                'transform-origin' : '68% 24%'
//                            });
                            $chinaMapBg.css3({
                                'pointer-events' : 'auto',
                                'animation-name' : "chinaMapZoomFadeIn2",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.9s',
                                'transform-origin' : '75% 35%'
                            })
                            $chinaMapBg.onePrefixedEvent("AnimationEnd", _startAnimation);
                        }, function () {
                            $bg.css3({
                                'pointer-events' : 'auto',
                                'animation-name' : "fadeIn",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.7s'
                            });
                            $chinaMapB.css({
                                'pointer-events' : 'none',
                                'animation-name' : "fadeOut",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.7s'
                            });
                            $chinaMapW.css({
                                'pointer-events' : 'auto',
                                'animation-name' : "fadeIn",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.7s'
                            });
                            $chinaMapW.onePrefixedEvent("AnimationEnd", _startAnimation);
                        }, function () {
                            $cityBg.css({
                                'pointer-events' : 'auto',
                                'animation-name' : "fadeIn",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.5s'
                            });
                            $cityBg.onePrefixedEvent("AnimationEnd", _startAnimation);
                        }, function () {
                            $rightQr.css({
                                'pointer-events' : 'auto',
                                'animation-name' : "bottomfadeIn1",
                                'animation-fill-mode' : 'forwards',
                                'animation-duration' : '0.6s'
                            })
                        }
                    ]);
                    _startAnimation();
                }
                checkLoading(pageOneIn);
            }else{
                // 直接显示最终页面
                $(".page1,.cMapB").remove();
                $(".hasCss3").css({
                    opacity : 1,
                    pointerEvents : 'auto'
                });

                $(".cri-bg").append(
                    $("<img />").attr({
                        'class' : 'bgImg middle center',
                        'data-dw': 1920,
                        'data-dh' : 955,
                        'src' : '../images/domeimg/jobs/campus_recruitment/bg.jpg'
                    })
                )
                checkLoading();
            }
        })
</script>
</body>
</html>