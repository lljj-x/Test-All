<!DOCTYPE html>
<html lang="en" class="over-hide">
<head>
    <?php include 'r_top.htm'; ?>
</head>
<body class="w900 over-hide">
<div class="iframeMain post-detail-bg w900">
    <div id="jobs_all">
        <ul class="slides clearfix">
            <li class="jobs-slide">
                <ul class="clearfix">
                    <li><a href="#" class="on has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                </ul>
            </li>
            <li class="jobs-slide">
                <ul class="clearfix">
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                    <li><a href="#" class="has-line">产品开发专员<span class="b-line"><span></span></span></a></li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="js_bg over-auto">
        <div class="post-detail">
            <h1 class="post-title">采购部_行政资产采购主管</h1>
            <p class="post-info">
                <span class="pr50">所属部门: <span class="fc9">环球采购部</span></span>
                <span class="pr50">工作地点: <span class="fc9">深圳</span></span>
                <span class="pr50">招聘人数: <span class="fc9">若干</span></span>
            </p>
            <div class="post-content">
                <div class="i-icon icon-graduates"></div>
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
                <a class="apply-job" href="#">申请岗位</a>
            </p>
        </div>
    </div>
</div>
<script>
    $LAB.script("../minjs/jquery.flexslider.min.js")
        .wait(function(){
            $('#jobs_all').flexslider({
                namespace:"",
                animation: "slide",
                pauseOnAction:false,
                controlNav:false,
                directionNav:true,
                slideshow:false,
                slideshowSpeed: 0,
                itemWidth: 900,
                animationLoop: true,
                animationSpeed: 500,
                pauseOnHover: true,
                start : function () {
                    var $frames = $(parent.document).find("iframe");
                    $frames.each(function () {
                        if($(this).attr("id").indexOf("layui-layer-iframe") > -1){
                            // 找到layer的弹出框避免多个iframe出错
                            var height = $(this).height() - $("#jobs_all").outerHeight(true) - 10;
                            $(".js_bg").height(height);
                            return false;
                        }
                    })
                }
            });
        })
</script>
</body>
</html>