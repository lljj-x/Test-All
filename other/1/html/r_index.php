<!DOCTYPE html>
<html lang="en" class="over-y-hide">
<head>
    <?php include 'r_top.htm'; ?>

</head>
<body class="over-y-hide">
<header>
    <?php include 'r_publick_top.htm'; ?>
</header>

<div id="warp-middle">
    <section class="clearfix recruit_content pr">
            <img class="bgImg middle center" src="../images/domeimg/recruit/bg.jpg" alt="Globalegrow E-commerce" data-dw="1920" data-dh="932"/>
            <div class="js_mouseOver view_culm inline-block">
                <div class="bg_layer percent_div"></div>
                <span class="right_line"></span>
                <div class="r_icon imgDiv center" data-dw="212" data-dh="500">
                    <a href="#" class="percent_div psr" target="">
                        <img src="../images/domeimg/recruit/iconShehui.png" alt=""/>
                    </a>
                    <div class="culm_left_text">
                        我想和你一起看遍环球的美景，你欣赏美景，而我，<span class="blod">欣赏你</span>
                    </div>
                </div>
                <ul class="culm_right_list imgDiv" data-dw="480" data-dh="500">
                    <li><a href="#"><img src="../images/domeimg/recruit/button_1.png" alt="产品部"><span class="percent_div right_cate_name">产品部</span></a></li>
                    <li><a href="#"><img src="../images/domeimg/recruit/button_2.png" alt="运营部"><span class="percent_div right_cate_name">运营部</span></a></li>
                    <li><a href="#"><img src="../images/domeimg/recruit/button_3.png" alt="Ebay项目组"><span class="percent_div right_cate_name">Ebay项目组</span></a></li>
                    <li><a href="#"><img src="../images/domeimg/recruit/button_4.png" alt="海购项目组"><span class="percent_div right_cate_name">海购项目组</span></a></li>
                </ul>
            </div>
            <div class="js_mouseOver view_culm inline-block">
                <div class="bg_layer percent_div"></div>
                <div class="r_icon imgDiv center" data-dw="212" data-dh="500">
                    <a href="#" class="percent_div psr" target="">
                        <img src="../images/domeimg/recruit/iconXiaoyuan.png" alt=""/>
                    </a>
                    <div class="culm_left_text tc">
                        世界那个大，你应来看看... <br/>
                        <p class="enter"><a href="#">Enter</a></p>
                    </div>
                </div>
                <div class="culm_right_list imgDiv" data-dw="480" data-dh="500">
                    <div class="video_bg imgDiv psr" data-dw="480" data-dh="263" >
                        <img src="../images/domeimg/recruit/video_bg.jpg" alt=""/>
                        <div class="bg_layer percent_div"></div>
                        <span class="imgDiv video_play middle center" data-dw="80" data-dh="80" >
                            <img src="../images/domeimg/recruit/play.png" alt="播放按钮"/>
                        </span>
                    </div>
                    <p class="coming tc">敬请期待 ...</p>
                </div>
                <span class="right_line"></span>
            </div>
            <div class="js_mouseOver view_culm inline-block">
                <div class="bg_layer percent_div"></div>
                <div class="r_icon imgDiv center" data-dw="212" data-dh="500">
                    <a href="#" class="percent_div psr" target="">
                        <img src="../images/domeimg/recruit/iconHuan.png" alt=""/>
                    </a>
                    <div class="culm_left_text">
                        你拿什么吸引我...
                    </div>
                </div>
                <ul class="culm_right_list imgDiv" data-dw="480" data-dh="500">
                    <li><a href="#"><img src="../images/domeimg/recruit/button_2_1.png" alt="环球之星"><span class="percent_div right_cate_name">环球之星</span></a></li>
                    <li><a href="#"><img src="../images/domeimg/recruit/button_2_2.png" alt="人在环球"><span class="percent_div right_cate_name">人在环球</span></a></li>
                </ul>
                <span class="right_line"></span>
            </div>
            <div class="view_culm inline-block">
                <div class="r_icon imgDiv center" data-dw="212" data-dh="500">
                    <a href="#" class="percent_div psr" target="">
                        <img src="../images/domeimg/recruit/iconWaiji.png" alt=""/>
                    </a>
                </div>
            </div>
    </section>
</div>

<footer id="pageFooter">
    <?php include 'r_foot.htm'; ?>
</footer>
<?php include 'r_foot_c_js.htm'; ?>

<script>
    $(function () {
        $.fn.indexHoverAnimation = function(options){
            var options = $.extend({
                type:'in',
                speed : 800,
                easing : 'easeOutQuart',
                data :{
                    bgLayerO : '0.3',
                    rIconL : '18%',
                    thisW : '55%',
                    siblingsW : '15%'
                }
            },options);

            $(this).find(".bg_layer").stop(true,false).animate({ opacity : options.data.bgLayerO},options.speed,options.easing);
            $(this).find(".r_icon").stop(true,false).animate({left : options.data.rIconL},options.speed,options.easing);

            if(options.type === 'in'){
                $(this).find(".culm_left_text").stop(true,true).fadeIn(options.speed);
                $(this).find(".culm_right_list").stop(true,true).delay(300).fadeIn(options.speed);
            }else{
                $(this).find(".culm_right_list").stop(true,true).fadeOut(200);
                $(this).find(".culm_left_text").stop(true,true).fadeOut(options.speed);
            }

            $(this).stop(true,false).animate({width : options.data.thisW},options.speed,options.easing).siblings(".view_culm").stop(true,false).animate({
                width: options.data.siblingsW
            },options.speed,options.easing);

        }

        $LAB.script("jquery.easing.js")
            .script('r_index.min.js')
            .wait(function () {
                new RecruitPage($("#warp-middle").children("section"));
                $(".js_mouseOver").hover(function(){
                    $(this).indexHoverAnimation({
                        type: 'in',
                        data :{bgLayerO : '0.3', rIconL : '18%', thisW : '55%', siblingsW : '15%'}
                    })
                },function(){
                    $(this).indexHoverAnimation({
                        type: 'out',
                        data :{bgLayerO : '0', rIconL : '50%', thisW : '25%', siblingsW : '25%'}
                    });
                })
            })
    })
</script>
</body>
</html>