<?php
/**
 * Created by PhpStorm
 * User: Liu.Jun
 * Date: 15-5-13
 * Time: 下午2:32
 * Wetsite: buhuida.com
 */
class Mysql {
    protected $pdo;
    protected $table;

    public function __construct($host,$db,$username,$pass,$table){
        $this->pdo = new PDO("mysql:host={$host};dbname={$db}","{$username}","{$pass}");
        $this->pdo->setAttribute(PDO::ATTR_AUTOCOMMIT,PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec("set names utf8");
        $this->setTable($table);
    }

    public function setTable($table){
        $this->table = $table;
    }

    public function getTable(){
        return $this->table;
    }

    public function insert($array){
        $sql = "insert into " . $this->table . "(name,number,str,time) values (:name,:number,:str," . time() . ")";

        $sth = $this->pdo->prepare($sql);
        $sth->bindParam(":name",$array['name']);
        $sth->bindParam(":number",$array['number']);
        $sth->bindParam(":str",$array['str']);
        $re = $sth->execute();
        return $re ? $this->pdo->lastInsertId() : false;

    }

    public function select($array,$limit,$order,$seq){
        // SELECT * FROM `user` WHERE `Host` = 'localhost'

        $limit = $limit ? (" limit 0," . $limit) : "";
        $order = $order ? " order by " . $order . " " . $seq : "";

        if(is_array($array)){
            $selectStr = "";
            $i = 0;
            foreach($array as $key => $value){
                if($i === 0){
                    $selectStr .= $selectStr . $key . "=" . $value;
                }else{
                    $selectStr .= $selectStr . " and ". $key . "=" . $value;
                }
                $i ++;
            }
            if($selectStr){
                $sql = "select * from " . $this->table . " where " . $selectStr . $order . $limit;
            }else{
                $sql = "select * from " . $this->table . $order. $limit;
            }
        }else{
            $sql = "select * from " . $this->table . $order . $limit;
        }

        $re = $this->pdo->query($sql);
        $reArr = array();
        foreach($re as $row){
            $reArr[] = $row;
        }
        return $reArr;
    }
}


