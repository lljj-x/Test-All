<?php
/**
 * Created by PhpStorm.
 * User: Liu.Jun
 * Date: 2015/7/6
 * Time: 10:14
 */

$callback = isset($_GET["callback"])?$_GET["callback"]:"callback";

$foo = isset($_GET["foo"])?$_GET["foo"]:"'";

$format = isset($_GET["format"])?$_GET["format"]:"";

$array = array("foo"=>$foo,"format"=>$format);

echo $callback . "(". json_encode($array). ")";

?>