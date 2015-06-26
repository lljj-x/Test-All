<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-3-16 下午5:27 
 */

$a = 'abc';
$b = 123456.4456;

$c = sprintf($b . "保留三位有效数字是%0.3f",$b);
// echo $c;


$str = "   lamp ";

echo strlen($str) . '<br>';
echo strlen(ltrim($str)) . '<br>';
echo strlen(rtrim($str)) . '<br>';

$str = "f12313  fsaf safdas das df";
echo ltrim($str,"f") . '<br>';
echo strtolower($str) . '<br>';
echo strtoupper($str);


function unicode_encode($name)
{
    $name = iconv('UTF-8', 'UCS-2', $name);
    $len = strlen($name);
    $str = '';
    for ($i = 0; $i < $len - 1; $i = $i + 2)
    {
        $c = $name[$i];
        $c2 = $name[$i + 1];
        if (ord($c) > 0)
        {   //两个字节的文字
            $str .= '\u'.base_convert(ord($c), 10, 16).str_pad(base_convert(ord($c2), 10, 16), 2, 0, STR_PAD_LEFT);
        }
        else
        {
            $str .= $c2;
        }
    }
    return $str;
}

function unicode_decode($name)
{
    // 转换编码，将Unicode编码转换成可以浏览的utf-8编码
    $pattern = '/([\w]+)|(\\\u([\w]{4}))/i';
    preg_match_all($pattern, $name, $matches);
    if (!empty($matches))
    {
        $name = '';
        for ($j = 0; $j < count($matches[0]); $j++)
        {
            $str = $matches[0][$j];
            if (strpos($str, '\\u') === 0)
            {
                $code = base_convert(substr($str, 2, 2), 16, 10);
                $code2 = base_convert(substr($str, 4), 16, 10);
                $c = chr($code).chr($code2);
                $c = iconv('UCS-2', 'UTF-8', $c);
                $name .= $c;
            }
            else
            {
                $name .= $str;
            }
        }
    }
    return $name;
}

echo '<br><br><br><br><br>';

$xxxx =  unicode_encode("xxx");
echo $xxxx . '<br>';
echo unicode_decode($xxxx);