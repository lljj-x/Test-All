<?php
/**
 * Created by PhpStorm.
 * User: LiuJun
 * Time: 15-1-31 下午1:46 
 */

// int preg_match ( string $pattern , string $subject [, array &$matches [, int $flags = 0 [, int $offset = 0 ]]] )

echo "preg_match<br />";
$subject = "defdefgh";
$pattern = "/def/";
preg_match($pattern,$subject,$matches,PREG_OFFSET_CAPTURE);
echo "<pre>";
print_r($matches);
echo "</pre>";
echo "<br /><br /><br /><br />";


echo "preg_match_all <br />";
preg_match_all("|<[^>]+>(.*)</[^>]+>(fff)|U","<b>example: </b>fff<div align=left>this is a test</div>fff",$out);
echo "<pre>";
print_r($out);
echo "</pre>";
echo "<br /><br /><br /><br />";



$imgurls = "{dede:pagestyle maxwidth='800' pagepicnum='20' ddmaxwidth='200' row='3' col='4' value='1'/}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03225.jpg' text='fsadfasdf' width='849' height='565'} /uploads/allimg/141218/1-14121R03225.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03231.jpg' text='fasdf' width='849' height='565'} /uploads/allimg/141218/1-14121R03231.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03240.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03240.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03247.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03247.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03256.jpg' text='asfd' width='849' height='565'} /uploads/allimg/141218/1-14121R03256.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03307.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03307.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03315.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03315.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03323.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03323.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03332.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03332.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03342.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03342.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03347.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03347.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03357.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03357.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03408.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03408.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03413.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03413.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03422.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03422.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03429.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03429.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03440.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03440.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03449.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03449.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03501.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03501.jpg {/dede:img}
{dede:img ddimg='/uploads/allimg/141218/1-14121R03508.jpg' text='' width='849' height='565'} /uploads/allimg/141218/1-14121R03508.jpg {/dede:img}
";

preg_match_all("/{dede:img (.*)}(.*){\/dede:img/isU", $imgurls, $wordcount);

preg_match_all("/text='(.*)' width/isU", $imgurls, $texts);

echo "<pre>";
print_r($wordcount[2]);
echo "</pre>";

echo "<pre>";
print_r($texts[1]);
echo "</pre>";