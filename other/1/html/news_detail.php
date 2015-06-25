<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
</head>
<body>
<header id="pageheader" >
    <?php include 'publick_top.htm'; ?>
</header>

<div class="sub_banner">
    <img src="../images/domeimg/banner/news_banner.jpg" width="100%">
</div>

<?php include 'n_path.htm' ?>

<div id="newsWarp">
    <div class="news-content hf clearfix">
        <div class="pt60 pb60 clearfix">
            <div class="news-detail news-list fl">
                <div class="news-detail-title-bg">
                    <div class="news-date">
                        <span class="news-date-d">02</span> <br/>
                        <span class="news-date-m">06.2015</span>
                    </div>
                    <div class="news-item tc">
                        <div class="news-title-border">
                            <h1 class="news-title"><a href="">单身狗注意：PayPal称海淘超八成是已婚族</a></h1>
                            <p class="news-info">
                                作者: <span>亿邦动力网</span> 来源: <span>亿邦动力网</span> 2015-06-02 15:16:36
                            </p>
                        </div>
                    </div>
                </div>
                <article class="news-detail-content">
                    <p>
                        这里显示文章的内容,这里显示文章的内容,这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容
                    </p>
                    <p>
                        这里显示文章的内容,这里显示文章的内容,这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容
                    </p>
                    <p>
                        这里显示文章的内容,这里显示文章的内容,这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容这里显示文章的内容
                    </p>
                </article>
            </div>
            <aside class="fl news-sidebar">
                <div class="news-search">
                    <h3>新闻搜索</h3>
                    <form action="" class="news-search-form">
                        <div class="mt15 news-search-year pr zi999">
                            <select name="year" id="news-search-year" style="display: none;">
                                <option value="">* 选择年份</option>
                                <option value ="2000">2000</option>
                                <option value ="2012">2012</option>
                                <option value ="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                            </select>
                        </div>
                        <div class="mt15 news-search-md clearfix pr zi888">
                            <div class="news-search-month fl mr25 w115">
                                <select name="month" id="news-search-month" style="display: none;">
                                    <option value="">*月</option>
                                    <option value ="1">1</option>
                                    <option value ="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div class="news-search-day fl w115">
                                <select name="day" id="news-search-day" style="display: none;">
                                    <option value="">*日</option>
                                </select>
                            </div>
                        </div>
                        <p class="mt15 news-search-border">
                            <input type="text" placeholder="输入关键词" class="news-search-key" name="keyword"/>
                        </p>
                        <p class="mt15">
                            <input type="submit" value="搜索" class="news-search-submit"/>
                        </p>
                    </form>
                </div>
                <div class="news-right-img" id="news-slides">
                    <ul class="slides clearfix">
                        <li class="news-slide">
                            <a href="#">
                                <img src="../images/domeimg/news/news1.jpg" alt="新闻标题"/>
                                <p class="slide-news-title"><span>新闻标题</span></p>
                            </a>
                        </li>
                        <li class="news-slide">
                            <a href="#">
                                <img src="../images/domeimg/news/news2.jpg" alt="新闻标题"/>
                                <p class="slide-news-title"><span>新闻标题</span></p>
                            </a>
                        </li>
                        <li class="news-slide">
                            <a href="#">
                                <img src="../images/domeimg/news/news3.jpg" alt="新闻标题"/>
                                <p class="slide-news-title"><span>新闻标题</span></p>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>

</div>
<!--news-->

<footer id="pageFooter">
    <?php include 'foot.htm'; ?>
</footer>
<?php include 'foot_c_js.htm'; ?>
<script>
    $LAB.script("../minjs/news_index.min.js")
        .script("../minjs/jquery.flexslider.min.js")
        .wait(function(){
            // 模拟select 样式 + 日期联动
            $().mySelect();

            //右侧新闻 滚动
            $('#news-slides').flexslider({
                namespace:"",
                animation: "slide",
                pauseOnAction:false,
                controlNav:true,
                slideshowSpeed: 5000,
                itemWidth: 295,
                animationLoop: true,
                slideshow:true,
                animationSpeed: 400,
                pauseOnHover: true
            });
        })
</script>
</body>
</html>