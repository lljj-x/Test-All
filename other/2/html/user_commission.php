<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'top.htm'; ?>
    <link rel="stylesheet" href="../dist/mincss/user_min.css">
</head>
<body>
<header id="header">
    <?php include 'public_top.htm'; ?>
</header>

<?php
    // 套用模板 请删除
    $bool = ($_GET["xx"] && $_GET["xx"] == "1");
?>

<div class="wrap pb40">
    <div id="user-commission" class="hf">
        <p class="top-nav">
            <a href="#">五洲会海购</a> > <span>个人中心</span>
        </p>
        <div class="user-index-wrap clearfix">
            <div class="user-conent-warp fr">
                <!--  顶部菜单-->
                <div class="user-action-menu-warp">
                    <span class="bline"></span>
                    <ul class="user-action-menu-list clearfix">
                        <li>
                            <a href="#" class="current">我的佣金</a>
                        </li>
                        <li class="split">|</li>
                        <li>
                            <a href="">我的优惠券 <span class="color-increase">2</span></a>
                        </li>
                    </ul>
                </div>
                <!--  顶部菜单-->

                <!--  顶部佣金信息-->
                <div class="commission-list">
                    <div class="commission title">
                        <p>
                            <span>我的佣金：<span class="color-increase">￥1946982.45</span></span>
                            <span class="pr to-cash-warp">

                                <?php if($bool){ ?>
                                    <a href="javascript:void (0);" class="apply-to-cash btn btn-default disabled">申请提现</a>
                                     <span class="commission-prompt prompt">
                                        佣金达到50元，并已开店
                                    </span>
                                <?php  }else{ ?>
                                    <a href="#" class="apply-to-cash btn btn-default">申请提现</a>

                                <?php } ?>
                            </span>
                            <span class="ml10">
                                <a href="#" class="btn btn-outline">申请记录</a>
                            </span>
                        </p>
                    </div>
                </div>

                <div class="mt30 commission-list">
                    <table class="comm-table table">
                        <thead>
                        <tr>
                            <th>佣金来源</th>
                            <th>金额（元）</th>
                            <th>账户余额（元）</th>
                            <th>产生时间</th>
                            <th>
                                <div class="user-drop">
                                    <span class="pointer">全部明细 <i class="triangle-bottom icon-triangle"><i class="triangle-bottom"></i></i></span>
                                    <div class="drop-box user-drop-dropbox commission-drop-dropbox none">
                                        <span class="top-line"></span>
                                        <div class="box-content">
                                            <ul class="user-drop-dropbox-list">
                                                <li><a href="# ">未获得佣金</a></li>
                                                <li><a href="# ">已获得佣金</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="tc">
                            <tr>
                                <td>消费返佣</td>
                                <td class="color-increase bold18">+10.56</td>
                                <td>￥105.56</td>
                                <td class="prompt">2015-06-24 06:21:45</td>
                                <td class="bold">未收货</td>
                            </tr>
                            <tr>
                                <td>市场分红</td>
                                <td class="color-increase bold18">+10.56</td>
                                <td>￥105.56</td>
                                <td class="prompt">2015-06-24 06:21:45</td>
                                <td class="bold">未开店</td>
                            </tr>
                            <tr>
                                <td>系统红利</td>
                                <td class="color-increase bold18">+10.56</td>
                                <td>￥105.56</td>
                                <td class="prompt">2015-06-24 06:21:45</td>
                                <td class="bold">未收货</td>
                            </tr>
                            <tr>
                                <td>消费返佣</td>
                                <td class="color-increase bold18">+10.56</td>
                                <td>￥105.56</td>
                                <td class="prompt">2015-06-24 06:21:45</td>
                                <td class="bold">未收货</td>
                            </tr>
                            <tr>
                                <td>消费返佣</td>
                                <td class="color-increase bold18">+10.56</td>
                                <td>￥105.56</td>
                                <td class="prompt">2015-06-24 06:21:45</td>
                                <td class="bold">未收货</td>
                            </tr>
                            <tr>
                                <td>消费返佣</td>
                                <td class="color-increase bold18">+10.56</td>
                                <td>￥105.56</td>
                                <td class="prompt">2015-06-24 06:21:45</td>
                                <td class="bold">未收货</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="page tc mt50">
                    <div class="p-wrap">
						<span class="p-num">
							<a href="#" class="prev">上一页</a>
							<a href="#" class="cur">1</a>
							<a href="#">2</a>
							<a href="#">3</a>
							<a href="#">4</a>
							<a href="#">5</a>
							<a href="#" class="next">下一页</a>
						</span>
						<span class="p-skip">
							<em>共<b>5</b>页，&nbsp;&nbsp;到第</em>
							<input type="text" value="1" class="input-txt">
							<em>页</em>
							<a href="#" class="btn-go">确定</a>
						</span>
                    </div>
                </div>
            </div>

            <aside class="user-sidebar fl">
                <ul>
                    <li class="user-center-li"><a href="#" class="user-center">个人中心</a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-order"></i>我的订单</a></span></li>
                    <li><a href="#" class="current"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-asset"></i>我的财富</a></span></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-sale"></i>售后管理</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-account"></i>账户信息</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-address"></i>收货地址</span></a></li>
                    <li><a href="#"><span class="bg-layer"></span><span class="sidebar-text"><i class="user-icon icon-commission"></i>佣金排名</span></a></li>
                </ul>
            </aside>
        </div>
    </div>
</div>

<footer id="footer">
    <? include 'foot.php'; ?>
</footer><!--end #footer -->

<script>
    $LAB.script("user.min.js")
</script>

</body>
</html>