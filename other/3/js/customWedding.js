//婚纱定制弹出框
$("#custom_button").click(function(){
	this.checked = true;
	var pagesrc = $(this).data("page");

	$.layer({
		type: 2,
		title: "Custom Options",
		shade : [0.8 , '#000' , true],
		iframe:{src:pagesrc},
		area: ['840px','520px'],
		offset: [($(window).height()-500)/2 +"px",'50%'],
		border : [1, 1, '#ddd', true],
		move : ['.xubox_title' , false],
		close:function(index){
			layer.close(index);
		},
        end : function(){
            $.get("?",{"get_custom_session":1, "t":Math.random()},function(data){
                //alert(data);
                if(data == 1){
                	if(document.getElementById('select_custom_size')){
		                var is_add = document.getElementById('select_custom_size').disabled;
		            }else{
		                var is_add = false;
		            }
		            var custom_size_yuanshi = $(".custom_size_price").attr('orgp');
                  	if(is_add==false && typeof(custom_size_yuanshi) !== "undefined"){
                    	var bizhong = $(".bizhong").html();
						var yuanshi = $("#unit_price").attr('orgp');
						var pk0 = $("#pk0").attr('orgp');
						var pk1 = $("#pk1").attr('orgp');
						var pk2 = $("#pk2").attr('orgp');
						var pk3 = $("#pk3").attr('orgp');

						if(bizhong == "JPY"){
			             	var s1 = parseFloat(my_array[bizhong]) * parseFloat(yuanshi);
			             	var s2 = parseFloat(my_array[bizhong]) * parseFloat(custom_size_yuanshi);
			             	var p0 = parseFloat(my_array[bizhong]) * parseFloat(pk0);
			             	var p1 = parseFloat(my_array[bizhong]) * parseFloat(pk1);
			             	var p2 = parseFloat(my_array[bizhong]) * parseFloat(pk2);
			             	var p3 = parseFloat(my_array[bizhong]) * parseFloat(pk3);
			             	var sum = (parseFloat(s1)+parseFloat(s2)).toFixed(0);
			             	var sum0 = (parseFloat(p0)+parseFloat(s2)).toFixed(0);
			             	var sum1 = (parseFloat(p1)+parseFloat(s2)).toFixed(0);
			             	var sum2 = (parseFloat(p2)+parseFloat(s2)).toFixed(0);
			             	var sum3 = (parseFloat(p3)+parseFloat(s2)).toFixed(0);
			             	var jpy = sum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			             	var jpy0 = sum0.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			             	var jpy1 = sum1.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			             	var jpy2 = sum2.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			             	var jpy3 = sum3.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			                var jpy4 = s2.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
			             	//$("#unit_price").html(jpy);
                            $("#custom_price_content").show();
                            $("#custom_price").html(jpy4);
			             	$("#pk0").html(jpy0);
			             	$("#pk1").html(jpy1);
			             	$("#pk2").html(jpy2);
			             	$("#pk3").html(jpy3);

			            }else{
			            	var s1 = parseFloat(my_array[bizhong]) * parseFloat(yuanshi);
			             	var s2 = parseFloat(my_array[bizhong]) * parseFloat(custom_size_yuanshi);
			             	var p0 = parseFloat(my_array[bizhong]) * parseFloat(pk0);
			             	var p1 = parseFloat(my_array[bizhong]) * parseFloat(pk1);
			             	var p2 = parseFloat(my_array[bizhong]) * parseFloat(pk2);
			             	var p3 = parseFloat(my_array[bizhong]) * parseFloat(pk3);
			             	var sum = (parseFloat(s1)+parseFloat(s2)).toFixed(2);
			             	var sum0 = (parseFloat(p0)+parseFloat(s2)).toFixed(2);
			             	var sum1 = (parseFloat(p1)+parseFloat(s2)).toFixed(2);
			             	var sum2 = (parseFloat(p2)+parseFloat(s2)).toFixed(2);
			             	var sum3 = (parseFloat(p3)+parseFloat(s2)).toFixed(2);

			             	//$("#unit_price").html(sum);
                            $("#custom_price_content").show();
                            $("#custom_price").html(s2.toFixed(2));
			             	$("#pk0").html(sum0);
			             	$("#pk1").html(sum1);
			             	$("#pk2").html(sum2);
			             	$("#pk3").html(sum3);
                   		}
		            }
		            if(document.getElementById('select_custom_size')){
                   		document.getElementById('select_custom_size').disabled=true;
                   	}

                    //定制婚纱切换语言刷新缓存
                    $(".curLang_1").each(function(j){
                        cur_lang_url = $(this).attr('href');
                        cur_lang_url_arr = cur_lang_url.split('?');
                        $(this).attr('href',cur_lang_url_arr[0]+'?custom');
                    });



                }else{
                	if(document.getElementById('select_custom_size')){
                    	document.getElementById('select_custom_size').disabled=false;
                    }
                }
            })

        }
	});
})


if(document.getElementById('select_custom_size')){
var is_add = document.getElementById('select_custom_size').disabled;
}else{
    var is_add = false;
}
var custom_size_yuanshi = $(".custom_size_price").attr('orgp');
if(is_add && typeof(custom_size_yuanshi) !== "undefined"){
    $("#custom_price_content").show();
}
