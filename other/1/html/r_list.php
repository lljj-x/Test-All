<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'r_top.htm'; ?>

</head>
<body>
<header id="pageheader" >
    <?php include 'r_list_public_top.htm'; ?>
</header>

<div class="hf post-list">
    <form action="" class="r-search-form">
        <input id="search-keyword" type="text" placeholder="搜索您想应聘的职位" />
        <button id="search-submit">
            <span>
                <i class="post-icon"></i>
                搜索职位
            </span>
        </button>
    </form>
    <div class="r-top-post">
        <span class="r-tl-icon post-icon">
        </span>
        <ul id="js_top_post">
            <li class="r-top-item">
                <div>
                    <p class="r-top-title"><a href="#">Amazon/Ebay销售专员</a></p>
                    <p class="r-top-info">按产品品类划分，负责Amazon/Ebay市场调查分析，寻找热销产品，并站点帐号管理，完成公司规定的销售目标。</p>
                </div>
            </li>
            <li class="r-top-item">
                <div>
                    <p class="r-top-title"><a href="#">Ebay/Amazon销售专员</a></p>
                    <p class="r-top-info">按产品品类划分，负责Amazon/Ebay市场调查分析，寻找热销产品，并站点帐号管理，完成公司规定的销售目标。</p>
                </div>
            </li>
            <li class="r-top-item">
                <div>
                    <p class="r-top-title"><a href="#">Amazon/Ebay销售专员</a></p>
                    <p class="r-top-info">按产品品类划分，负责Amazon/Ebay市场调查分析，寻找热销产品，并站点帐号管理，完成公司规定的销售目标。</p>
                </div>
            </li>
        </ul>
        <span class="js_up con-button up"></span>
        <span class="js_down con-button down"></span>
    </div>
    <ul class="post-cate clearfix">
        <li class="has-line on"><a href="#">全部</a><span class="b-line"><span></span></span></li>
        <li class="has-line"><a href="#">市场</a><span class="b-line"><span></span></span></li>
        <li class="has-line"><a href="#">运营</a><span class="b-line"><span></span></span></li>
        <li class="has-line"><a href="#">产品</a><span class="b-line"><span></span></span></li>
        <li class="has-line"><a href="#">技术</a><span class="b-line"><span></span></span></li>
        <li class="has-line"><a href="#">客服</a><span class="b-line"><span></span></span></li>
        <li class="has-line"><a href="#">仓储物理</a><span class="b-line"><span></span></span></li>
        <li class="has-line mr0"><a href="#">职能支撑</a><span class="b-line"><span></span></span></li>
    </ul>

    <div class="r-post-list">
        <table id="r-post-table" border="0" cellpadding="0" cellspacing="0">
            <thead>
            <tr>
                <th>职位</th>
                <th>所属部门</th>
                <th>人数</th>
                <th>地点</th>
                <th>更新时间</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td><a href="#">渠道广告销售-市场营销中心</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>
                <tr>
                    <td><a href="#">直客广告销售-市场营销</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>
                <tr>
                    <td><a href="#">直客广告销售-市场营销</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>
                <tr>
                    <td><a href="#">直客广告销售-市场营销</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>
                <tr>
                    <td><a href="#">直客广告销售-市场营销</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>
                <tr>
                    <td><a href="#">直客广告销售-市场营销</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>
                <tr>
                    <td><a href="#">直客广告销售-市场营销</a></td>
                    <td>市场部</td>
                    <td>1</td>
                    <td>深圳</td>
                    <td>2015-06-11</td>
                </tr>

                <tr id="inert-before">
                    <td class="load-more tc" colspan="5">
                        <p><a href="#">点击加载更多</a></p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<footer id="pageFooter">
    <?php include 'foot.htm'; ?>
</footer>
<?php include 'foot_c_js.htm'; ?>

<script>
    (function($){
        $.fn.setTableBg = function (classColorEven,classColorOdd) {
            $("tr :even",this).addClass(classColorEven);
            $("tr :odd",this).addClass(classColorOdd);
        };

        $.fn.simpleParallaxanimation = function(options){
            var options = $.extend({
                easing: 'swing',
                auto: 2000,
                speed : 500,
                parallaxPixel : 40,
                upClassName : 'js_up',
                downClassName: 'js_down'
            },options);
            var TIMER = null;
            var PARENTBG = this.parent();
            var ANIMATEH = PARENTBG.outerHeight();
            var THAT = this;
            var ITEMLENGTH = this.children().length;
            var CURRENTNUM = 1;

            var animation = function(type){
                type = type || 'down';
                if(CURRENTNUM == 1 && type=="up"){
                    // 最上到最下
                    CURRENTNUM = ITEMLENGTH;
                }else if(CURRENTNUM == ITEMLENGTH && type=="down"){
                    // 最下到最上
                    CURRENTNUM = 1;
                }else{
                    (type === 'up') ? CURRENTNUM -- : CURRENTNUM ++ ;
                }
                animateTO(CURRENTNUM);
            }

            var animateTO = function(to){
                var $parallaxPixelElm = THAT.children().eq(CURRENTNUM - 1).find(".r-top-info");
                $parallaxPixelElm.css({ marginTop : options.parallaxPixel});
                THAT.stop().animate({top : - (to - 1) * ANIMATEH + "px"},options.speed,options.easing);
                $parallaxPixelElm.stop().animate({marginTop : "0px"},options.speed ,options.easing);
            }

            var autoPlay = function () {
                TIMER = setInterval(animation,options.auto);
            }

            if(options.auto){
                // 自动播放
                autoPlay();
                PARENTBG.hover(function(){
                    clearInterval(TIMER);
                }, function () {
                    autoPlay()
                })
            }

            $("." + options.upClassName).on("click", function (e) {
                animation('up');
            });

            $("." + options.downClassName).on("click", function (e) {
                animation('down');
            });
            return this;
        }

        $(function(){
            // 表格变色
            $("#r-post-table").setTableBg("even","odd");

            // 顶部职位 简单视差动画
            $("#js_top_post").simpleParallaxanimation();

            //搜索框
            $("#search-submit").click(function (e) {
                e.preventDefault();
                var k = $("#search-keyword").val();
                if(k === ""){
                    layer.tips('请输入你要搜索的职位 ！', '#search-keyword', {
                        tips: [4, '#ffcc01']
                    });
                    $("#search-keyword").focus();
                    return false;
                }
                var url = '/job/sociology/k' + k + '/cid10000/';
                window.location.href = url;
            });

            // ajax get more
            var getUrl = 'testAjax.php';
            var page = 2;
            $(".load-more").find("a").on("click",function(e){
                e.preventDefault();
                if($(this).hasClass("disabled")) return;
                $.ajax({
                    type: "GET",
                    url: getUrl,
                    data:{
                        page : page
                    },
                    dataType: "json",
                    success: function(data,s){
                        if(s){
                            page ++;
                            if(data){
                                var insertData = "";
                                $.each(data,function(i,v){
                                    insertData += '<tr><td><a href="' + v.postUrl + '">' + v.post + '</a></td><td>' + v.department + '</td><td>' + v.number + '</td><td>' + v.address + '</td><td>' +  v.time +'</td></tr>'
                                });
                                $(insertData).insertBefore("#inert-before");
                                $("#r-post-table").setTableBg("even","odd");
                                if(data.length <5 ){
                                    $(".load-more").find("a").addClass("disabled").text("没有更多了");
                                }
                            }else{
                                // 没有数据了
                                $(".load-more").find("a").addClass("disabled").text("没有更多了");
                            }
                        }else{
                            alert("加载失败 ....");
                        }
                    }
                })
            });
        })
    })(jQuery);
</script>
</body>
</html>