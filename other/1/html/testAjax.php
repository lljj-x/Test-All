<?php
/**
 * Created by PhpStorm.
 * User: Liu.Jun
 * Date: 2015/6/15
 * Time: 15:41
 */

if($_GET['page']){
    // echo $_GET['page'];
    $arrData = array(
        array(
            'post' => '我的ajax测试职位',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门',
            'number' => '2',
            'address' => '深圳',
            'time' => '2015-5-5'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax测试职位',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门',
            'number' => '2',
            'address' => '深圳',
            'time' => '2015-5-5'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        ),
        array(
            'post' => '我的ajax2',
            'postUrl' => 'http://www.baidu.com',
            'department' => '测试部门2',
            'number' => '3',
            'address' => '深圳2',
            'time' => '2015-6-6'
        )
    );

    $pageNum = 5;
    $currentPage = $_GET['page'];

    echo json_encode(array_slice($arrData,((int)$currentPage - 1) * $pageNum,$pageNum));
}