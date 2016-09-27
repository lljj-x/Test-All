$(document).ready(function(){
	$(".div1 span").click(function(){	//span 标签 click
		var txt = $(".div1 .msg").html() + "<p>内层span元素被点击.<\/p>";
		$(".div1 .msg").html(txt);
	});

	$(".div1 .content").click(function(){	// content click
		var txt=$(".div1 .msg").html() + "<p>外层div元素被点击.<\/p>";
		$(".div1 .msg").html(txt);
	});

	$("body").click(function(){	//body click
		var txt = $(".div1 .msg").html() + "<p>body元素被点击.<\/p>";
		$(".div1 .msg").html(txt);
	});



	$(".div2 span").click(function(event){	//span 标签 click
		var txt = $(".div2 .msg").html() + "<p>内层span元素被点击.<\/p>";
		$(".div2 .msg").html(txt);
		event.stopPropagation();	//阻止事件冒泡
		// return false;

	});

	$(".div2 .content").click(function(event){	// content click
		var txt=$(".div2 .msg").html() + "<p>外层div元素被点击.<\/p>";
		$(".div2 .msg").html(txt);
		event.stopPropagation();	//阻止事件冒泡

	});

	$("body").click(function(){	//body click
		var txt = $(".div2 .msg").html() + "<p>body元素被点击.<\/p>";
		$(".div2 .msg").html(txt);
	});

	$("#sub").click(function(event){	//preventDefault 阻止默认事件
		if ($("#username").val() == "") {
			$("#msg").html("<p>文本框的值不能为空.</p>");	
			alert("注意使用 returen false 会停止后面所有操作，所以会阻止 body click 事件的浏览器操作.但是preventDefault只会单单阻止默认事件,所以 body click 事件还会继续冒泡");
			// return false;
			event.preventDefault();	//阻止默认提交表单事件
		};

	})


})