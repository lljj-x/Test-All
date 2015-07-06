<?php
/**
 * Created by PhpStorm.
 * User: Liu.Jun
 * Date: 2015/7/2
 * Time: 10:53
 */


function checkUrl($url){
    return is_string($url) ? $url : '#';
};

echo checkUrl('http://www.baidu.com');

echo '<br><br><br>';


echo checkUrl(232132);