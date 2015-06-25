<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'r_top.htm'; ?>

</head>
<body>
<header id="pageheader" >
    <?php include 'r_list_public_top.htm'; ?>
</header>

<div class="crldMain hf pt50 pb50">
    <form action="" class="r-search-form">
        <input type="text" placeholder="搜索您想应聘的职位" id="search-keyword"/>
        <button id="search-submit">
            <span>
                <i class="post-icon"></i>
                搜索职位
            </span>
        </button>
    </form>
    <p class="keywords pt10 pb50">
        关键词: <a href="#">市场</a> <a href="#">运营</a> <a href="#">仓储物流</a> <a href="#">职能支撑</a>
    </p>
    <ul class="js-jobs-list jobs-list clearfix">
        <li class="job-item bg1">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">Marketing mouse</p>
                <p class="job-c">在南山的那边粤海的那边有一群marketing，我们活泼又聪明，我们调皮又伶俐~亮丽的光环下，我们可都是实战派哟！</p>
            </a>
        </li>
        <li class="job-item bg2">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">运营喵</p>
                <p class="job-c">灵敏锐利的双眼，抓住每一处细节；从容不迫的脚步，走出不凡人生；运筹帷幄，目注心营，我们是运营喵星人。</p>
            </a>
        </li>
        <li class="job-item bg3">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">产品锦鲤</p>
                <p class="job-c">站的高，才能看得远，池子大，才能游得快。凭着睿智和坚持，我定要看看龙门后的世界~</p>
            </a>
        </li>
        <li class="job-item mr0 bg4">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">技术猿</p>
                <p class="job-c">宅男属性？呆板无知？No！开发、测试、攻bug，我们无所不能。</p>
            </a>
        </li>
        <li class="job-item bg5">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">职能汪</p>
                <p class="job-c">我们善解人意，温柔而细心；我们为同事竭尽心力，从不怕麻烦</p>
            </a>
        </li>
        <li class="job-item bg6">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">物流大神</p>
                <p class="job-c">别相信传说，来了你就是传说。</p>
            </a>
        </li>
        <li class="job-item bg7">
            <a href="/temp/skin4/dist/html/iframe_cr_detail.php" class="js_job_link">
                <img class="job-avatar" src="../images/domeimg/campusRecruitment/2.png" alt=""/>
                <p class="job-t">客服兔</p>
                <p class="job-c">亲们说，客服是电商的第一生产力；没错，谦逊耐心客服兔，卖萌答疑两不误。</p>
            </a>
        </li>
    </ul>
</div>
<footer id="pageFooter">
    <?php include 'foot.htm'; ?>
</footer>
<?php include 'foot_c_js.htm'; ?>

<script>
$(function () {
    $(".js-jobs-list").on("click",".js_job_link", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        var w = "900px";
        var h = Math.round($(window).height() * 0.8) + "px";
        layer.open({
            type: 2,
            title: false,
            maxmin: false,
            scrollbar: false,
            shadeClose: true, //点击遮罩关闭层
            area : [w , h],
            content: url
        });
    });

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
        var url = '/job/campus/search/k' + k + '/';
        window.location.href = url;
    });

})



</script>
</body>
</html>