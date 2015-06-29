<?php

$arrStr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

$outputFilename = "C:/Users/Administrator/Desktop/text.txt";
$outputFp = fopen($outputFilename, 'w') or die("can't create file".$outputFilename);

 for($a = 0;$a<=25;$a++){
    $one = $arrStr[$a];
     for($b=0;$b<=25;$b++){
         $two = $arrStr[$b];
         for($c=0;$c<=25;$c++){
             $three = $arrStr[$c];
             for($d=0;$d<=25;$d++){
                 $four = $arrStr[$d];
                 echo $one . $two .$three . $four . '<br>';
             }
         }
     }
 }
