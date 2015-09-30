// JavaScript Document	 //cookie util
	 if (typeof LIM == "undefined") window.LIM = {};
	 LIM.getCookie = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    var value = "";
    if (arr) {
        value = unescape(arr[2]);
    } else {
        value = null;
    }
    if (value != null) {
        value = value.replace(/\"/g, "");
    }
    return value;
	};
	LIM.setCookie = function(name, value, exp) {
	    var Days = 30;
	    
	    var s = this.getHostAndPath();
	    try {
	        document.cookie = name + "=" + value + ";";
	    } catch (e) {
	        throw "storing document cookie has error!";
	    }
	};
	
	(function(){//保存访客来源必须添加到所有页面中
	   var docref = document.referrer || "";
	   if(docref && docref.toLowerCase().indexOf(location.hostname) == -1 ){//非本站才算入来源
	     LIM.setCookie("refferChat",docref);
	   }
     
	}());
	
	
	
	function openChat(chaturl,kuan,gao){
	try{
		var url=chaturl;
			url+="&enterurl="+encodeURIComponent(document.URL||window.location);
			url+="&pagetitle="+encodeURIComponent(document.title||window.location);
			url+="&timestamp="+new Date().getTime();
			url+="&pagereferrer="+(LIM.getCookie("refferChat")||"");
		window.open(url,"800chatbox","toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width="+kuan+",height="+gao+"");
		if(document.getElementById("InviteWindow")!="undefined")//打开对话后，隐藏邀请窗口
				document.getElementById("InviteWindow").style.display="none";
	}catch(e){}
}