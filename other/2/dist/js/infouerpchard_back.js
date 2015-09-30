$(document).ready(function(){
	$("#username").focus();			   
	var WshShell;   
	var safe   =   true;   
	try{   
		WshShell   =   new   ActiveXObject("WScript.Shell");   
	}catch(e){   
		safe=false;   
	}   
	if(!safe)
	{
		alert("请手工更改设置允许ActiveX控件的执行");
	}
	else
	{
		//CPU 信息
		var locator = new ActiveXObject ("WbemScripting.SWbemLocator");
		var service = locator.ConnectServer(".");
		var properties = service.ExecQuery("SELECT * FROM Win32_Processor");
		var e = new Enumerator (properties);
		var p = e.item ();
		$("#cpuid").val(p.ProcessorID);
		$("#pc-name").val(p.SystemName);
		
		//网卡  Win32_NetworkAdapter
		var properties = service.ExecQuery("SELECT * FROM  Win32_NetworkAdapter");
		var e = new Enumerator (properties);
		var p = e.item ();
		$("#macadd").val(p.MACAddress);
		//硬盘  Win32_DiskDrive
		var properties = service.ExecQuery("SELECT * FROM  Win32_DiskDrive");
		var e = new Enumerator (properties);
		var p = e.item ();
		$("#hd-name").val(p.PNPDeviceID);
	}
});