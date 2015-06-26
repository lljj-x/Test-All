<?php
    $mysql = new PDO("mysql:host=localhost;dbname=test","root","");
    $mysql->setAttribute(PDO::ATTR_AUTOCOMMIT,PDO::ERRMODE_EXCEPTION);
    $mysql->exec("set names utf8");

    $sql = 'SELECT * FROM customers';
    $reset = $mysql->query($sql);
    $customerArr = [];
    foreach($reset as $customer){
        $customerArr[] = $customer;
    }
    echo json_encode($customerArr);

