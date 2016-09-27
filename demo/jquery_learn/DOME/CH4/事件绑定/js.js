$(document).ready(function(){
	$("#reset").click(function(){
		$(".head").unbind();
		$(".content").hide();
	});

	$("button").click(function(){
		isreset(); //所有操作按钮执行前判断点击
	});

	$("#click1").bind("click",function(){	//点击展开
		$(".head").bind("click",function(){
			$(this).next().show();
		})
	});

	$("#click2").click(function(){	//点击展开隐藏切换 click()
		$(".head").bind("click",function(){
			if ($(this).next().is(":visible")){
				$(this).next().hide();
			}else{
				$(this).next().show();
			}
		})
	});

	$("#click3").click(function(){	//划过显示 隐藏 mouseove -> mouseout
		$(".head").bind("mouseover",function(){
			$(this).next().show();
		});
		$(".head").bind("mouseout",function(){
			$(this).next().hide();
		})
	});

	$("#click4").click(function(){	//滑过隐藏显示  jQuery hover(enter.leave)方法
		$(".head").hover(
			function(){
				$(this).next().show();
			},
			function(){
				$(this).next().hide();
			}
			);
	});

	$("#click5").click(function(){		// 点击显示隐藏, toggle(fn1,fn2,fn3),点击一次执行 fn1 fn2 fn3,然后重新循环	
		$(".head").toggle(
			function(){
				$(this).next().show();
			},
			function(){
				$(this).next().hide();
			}
		);
	});

	$("#click6").click(function(){		//toggle()方法还有一个作用 :用于切换元素的可见性，所有上面代码可以改写成
		$(".head").bind("click",function(){
			$(this).next().toggle();
		});
	});

	$("#click7").click(function(){
		$(".head").toggle(
			function(){
				$(this).next().show();
				$(this).addClass("highlight");
			},
			function(){
				$(this).next().hide();
				$(this).removeClass("highlight");
			}
		);
	});
	
})

function isreset(){
	if ($("#isreset").is(":checked")) {
		$(".head").unbind();
		$(".content").hide();
	};
}