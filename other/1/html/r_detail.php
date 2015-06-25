<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'r_top.htm'; ?>

</head>
<body>
<header id="pageheader" >
    <?php include 'r_list_public_top.htm'; ?>
</header>

<div class="hf">
    <div class="post-detail-bg clearfix">
        <div class="post-detail fl">
            <h1 class="post-title">采购部_行政资产采购主管</h1>
            <p class="post-info">
                <span class="pr50">所属部门: <span class="fc9">环球采购部</span></span>
                <span class="pr50">工作地点: <span class="fc9">深圳</span></span>
                <span class="pr50">招聘人数: <span class="fc9">若干</span></span>
            </p>
            <div class="post-content">
                <!-- 测试内容-->
                    <p><b>工作职责</b></p>
                    <p>- 负责公司总部行政相关（服务类、物业类、耗材类等）的采购工作。与行政部门密切配合，深入了解需求，及时完成各项采购或招标任务</p>
                    <p>- 负责分/子公司行政类采购。包括百度旗下北京分公司及其他子公司行政类项目的采购或招标（设备、服务等）</p>
                    <p>- 收集市场资讯及掌握未来变化趋势，争取有竞争力的供货价格。参与大宗采购项目的谈判、签约，检查合同的执行和落实情况</p>
                    <p>- 维护并评估现有合格供货商，收集潜在供货商信息，持续开发新供货商，根据公司需要，选择合适的供应商</p>
                    <p>- 针对业务发展变化，适时优化流程，确保效率</p>
                    <p>- 根据公司业务发展，完成随时可能发生的各类行政软硬件、服务等采购项目</p>

                    <p style="margin-top: 45px;"><b>职位要求</b></p>
                    <p>- 负责公司总部行政相关（服务类、物业类、耗材类等）的采购工作。与行政部门密切配合，深入了解需求，及时完成各项采购或招标任务</p>
                    <p>- 负责分/子公司行政类采购。包括百度旗下北京分公司及其他子公司行政类项目的采购或招标（设备、服务等）</p>
                    <p>- 收集市场资讯及掌握未来变化趋势，争取有竞争力的供货价格。参与大宗采购项目的谈判、签约，检查合同的执行和落实情况</p>
                    <p>- 维护并评估现有合格供货商，收集潜在供货商信息，持续开发新供货商，根据公司需要，选择合适的供应商</p>
                    <p>- 针对业务发展变化，适时优化流程，确保效率</p>
                    <p>- 根据公司业务发展，完成随时可能发生的各类行政软硬件、服务等采购项目</p>
                <!-- 测试内容 end-->

            </div>
            <p class="mt30">
                <a class="apply-job" href="">申请岗位</a>
            </p>
        </div>

        <aside class="fl post-sidebar">
            <div class="post-right-img" id="post-slides">
                <ul class="slides clearfix">
                    <li class="post-slide">
                        <a href="#">
                            <img src="../images/domeimg/jobs/job1.jpg" alt="推荐职位"/>
                        </a>
                    </li>
                    <li class="post-slide">
                        <a href="#">
                            <img src="../images/domeimg/jobs/job1.jpg" alt="推荐职位"/>
                        </a>
                    </li>
                    <li class="post-slide">
                        <a href="#">
                            <img src="../images/domeimg/jobs/job1.jpg" alt="推荐职位"/>
                        </a>
                    </li>
                    <li class="post-slide">
                        <a href="#">
                            <img src="../images/domeimg/jobs/job1.jpg" alt="推荐职位"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="rb-img mt30">
                <a href="#"><img src="../images/domeimg/jobs/job2.jpg" alt=""/></a>
                <p class="tc">这里有你想知道 <br/>却没想到又不知道的...</p>
            </div>
        </aside>
    </div>
</div>

<footer id="pageFooter">
    <?php include 'foot.htm'; ?>
</footer>
<?php include 'foot_c_js.htm'; ?>

<script>
    $LAB.script("../minjs/jquery.flexslider.min.js")
        .wait(function(){
            $('#post-slides').flexslider({
                namespace:"",
                animation: "slide",
                pauseOnAction:false,
                controlNav:true,
                directionNav:false,
                slideshowSpeed: 5000,
                itemWidth: 310,
                animationLoop: true,
                slideshow:true,
                animationSpeed: 400,
                pauseOnHover: true
            });
        })
</script>
</body>
</html>