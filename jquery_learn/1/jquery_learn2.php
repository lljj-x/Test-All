<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>判断checkbox</title>
	<script type="text/javascript" src="http://localhost/magento_mipow/skin/frontend/default/mipow/js/jquery.1.8.js"></script>
</head>
<body>
	<input type="checkbox" id="cr"><label for="cr">我已经阅读了制度</label>
	<script type="text/javascript">
		$(document).ready(function(){
			// jquery 判断是否选中
			// $("#cr").click(function(){
			// 	if ($(this).is(":checked")){
			// 		alert ("true");
			// 	}else alert ("false");
			// });

			// js DOM 方法判断是否选中
			var $cr=$("#cr");
			var cr=$cr[0]; //这两部只是为了把一个jq对象转为dom对象
			$cr.click(function(){
				if (cr.checked) { //DOM 方法判断
					alert ("true");
				};	
			})
			
		})
	</script>

</body>
</html>
