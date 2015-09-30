<?php

/**
 *  调用日历 JS
*/

$lang = (!empty($_GET['lang'])) ? trim($_GET['lang']) : 'zh_cn';

if (!file_exists('../languages/' . $lang . '/calendar.php'))
{
    $lang = 'zh_cn';
}

//require(dirname(dirname(__FILE__)) . '/eload_admin/cache_files/website_info.php');
header('Content-type: application/x-javascript; charset=utf8');

include_once('calendar_zh_cn.php');

foreach ($_LANG['calendar_lang'] AS $cal_key => $cal_data)
{
    echo 'var ' . $cal_key . " = \"" . $cal_data . "\";\r\n";
}

include_once('./calendar/calendar.js');

?>