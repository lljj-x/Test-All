<?php
/**
 * Created by PhpStorm
 * User: Liu.Jun
 * Date: 15-5-13
 * Time: 下午2:31
 * Wetsite: buhuida.com
 */
include_once("mysql.php");

if(! empty($_POST["name"])){
    function checkData(){
        if($_POST["name"] == ""){
            return "请输入你的名字";
        }

        if($_POST["number"]== ""){
            return "请输入电话号码";
        }

        if($_POST["str"]== ""){
            return "请输入你的愿望";
        }

        return false;
    }

    function addData(){
        $mysql = new Mysql('localhost','test','root','liujun','xuyuan');
        $re = $mysql->insert(array(
            "name" => trim($_POST["name"]),
            "number" => $_POST["number"],
            "str" => $_POST["str"]
        ));
        return $re;
    }

    if($errMsg = checkData()){
        echo $errMsg;
    }else{
        $re = addData();
        echo $re ? 'success' : "许愿失败 ，人品太差 !!";
    }
}