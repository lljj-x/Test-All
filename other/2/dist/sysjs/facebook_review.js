jQuery(function($){
    (function($){$.toJSON=function(o)
    {if(typeof(JSON)=='object'&&JSON.stringify)
    return JSON.stringify(o);var type=typeof(o);if(o===null)
    return"null";if(type=="undefined")
    return undefined;if(type=="number"||type=="boolean")
    return o+"";if(type=="string")
    return $.quoteString(o);if(type=='object')
    {if(typeof o.toJSON=="function")
    return $.toJSON(o.toJSON());if(o.constructor===Date)
    {var month=o.getUTCMonth()+1;if(month<10)month='0'+month;var day=o.getUTCDate();if(day<10)day='0'+day;var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10)hours='0'+hours;var minutes=o.getUTCMinutes();if(minutes<10)minutes='0'+minutes;var seconds=o.getUTCSeconds();if(seconds<10)seconds='0'+seconds;var milli=o.getUTCMilliseconds();if(milli<100)milli='0'+milli;if(milli<10)milli='0'+milli;return'"'+year+'-'+month+'-'+day+'T'+
    hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
    if(o.constructor===Array)
    {var ret=[];for(var i=0;i<o.length;i++)
    ret.push($.toJSON(o[i])||"null");return"["+ret.join(",")+"]";}
    var pairs=[];for(var k in o){var name;var type=typeof k;if(type=="number")
    name='"'+k+'"';else if(type=="string")
    name=$.quoteString(k);else
    continue;if(typeof o[k]=="function")
    continue;var val=$.toJSON(o[k]);pairs.push(name+":"+val);}
    return"{"+pairs.join(", ")+"}";}};$.evalJSON=function(src)
    {if(typeof(JSON)=='object'&&JSON.parse)
    return JSON.parse(src);return eval("("+src+")");};$.secureEvalJSON=function(src)
    {if(typeof(JSON)=='object'&&JSON.parse)
    return JSON.parse(src);var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered))
    return eval("("+src+")");else
    throw new SyntaxError("Error parsing JSON, source is not valid.");};$.quoteString=function(string)
    {if(string.match(_escapeable))
    {return'"'+string.replace(_escapeable,function(a)
    {var c=_meta[a];if(typeof c==='string')return c;c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
    return'"'+string+'"';};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};})(jQuery);

    var facebook_api = 'http://www.facebook.com/dialog/feed';
    var facebook_parameters = {
        app_id:'407411789363512',		//应用ID
        redirect_uri:'http://www.dresslily.com/facebook_callback.php',			//回调URL
        display:'popup',			//显示模式
        /*from:'',to:'',message:'',*/
        link:'',		//页面URL商品详情URL
        picture:'',		//商品图片url
        /*source:'',*/
        name:'',		//商品名称
        caption:'',		//评论用户名
        description:'',	//评论内容
        properties:{},
        actions: 
            {
                name : 'Read All Reviews',
                link : ""
            }
    };

    function OpenWindows2(url,wname,w,h,x,y,parameters){
        w = w || 640;
        h = h || 400;
        x = (window.screen.width - w) / 2;
        y = (window.screen.height - h) / 2;
        if(!parameters){parameters = ',menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes';};
        myWin = window.open(url,wname,'width='+w+',height='+h+',screenX='+x+',screenY='+y+',top='+y+',left='+x+parameters);
        return myWin;
    }

    $('a.fbComment').click(function(){
        var query_json = $.extend({}, facebook_parameters);
        query_json.link = $(this).attr('fblink').replace(/^http:\/\/[^\.]+/, 'http://www');
        query_json.picture = $(this).attr('fbpicture').replace(/^https/, 'http');
        query_json.name = $(this).attr('fbname');
        query_json.caption = 'By ' + $(this).attr('fbuser');
        query_json.description = $(this).attr('fbdesc');
        query_json.actions.link = $(this).attr('fblink2').replace(/^http:\/\/[^\.]+/, 'http://www');
        query_json.actions = $.toJSON(query_json.actions);
        query_json.properties = $.toJSON(query_json.properties);
        var query_string = jQuery.param(query_json); 
        var url = facebook_api+'?'+query_string;
        var facebook = OpenWindows2(url,'facebook',400,350);
        //window.open(url,'facebook','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=400, height=350');
        return false;
    });
});