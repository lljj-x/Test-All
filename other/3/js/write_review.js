$(function(){
	// 问号出表格
	var _blank = null;
	var _ask = $('.ask'),_askTable = _ask.find('table');
	_ask.hover(function() {
		if(_blank){clearTimeout(_blank)};
		_askTable.fadeIn('fast');
	}, function() {
		_blank = setTimeout(function(){
			_askTable.fadeOut('fast');
		},500)
		
	});

	//设置默认值
	setDefualt('.js_selectBox');

	function setDefualt(selectBox){
		$(selectBox).find("li").each(function(){ 

			if($(this).hasClass("selected")){
				var htmls = $(this).find("a").html();
				var selectBox  = $(this).parents(".js_selectBox");
				var textBox = selectBox.find('.js_valBox');
				var inputBox = selectBox.find('input');

				textBox.data("val",$(this).data("val")).html(htmls);
				inputBox.val($(this).data("val"));
			}
		})
	}
	//英尺和厘米的转换
	$('.weight_unit').on("click","li",function(){
		// var _Height = $('#Height').find('option[value!=-1]');
		var _Height = $(this).parents('li').next('li').find('.Height');
		var _HeightArray = _Height.find('li:gt(0)'); 
		var _valBox = _Height.find('.js_valBox');
		var that = $(this);
		
		var unit = 30.48;
		if(that.data('val') == 'Kg'){		

			if(_HeightArray.eq(1).data('ft')){
				var flag = false;						
			}else{
				var flag = true;
			}

			

			if(_Height.data('unit')!='Kg'){

				_Height.data('unit','Kg');
				$.each(_HeightArray, function(index, val) {
				 /* iterate through array or object */
					var _ft = $(val).find("a").html();

					if(flag){
						$(val).data('ft',_ft);
					};

					$(val).find("a").html(Math.round(unit * _ft.substr(0,1) + unit * (_ft.slice(3,-1)/12))+"cm");
					
				});
			}
			

		}
		if(that.data('val') == 'Lbs'){
			_Height.data('unit','Lbs');

			$.each(_HeightArray, function(index, val) {
				 /* iterate through array or object */
				$(val).find("a").html($(val).data("ft"));
			});				

		}
		setDefualt(_Height);
	});
	

	$('.js_selectBox').hover(function(){
		$(this).find("dd").show();
	},function(){
		$(this).find("dd").hide();
	}).on("click","li",function(){
		var that = $(this);
		var val = that.data("val");
		var selectBox = that.parents(".js_selectBox");

		selectBox.find(".js_valBox").data("val",val).html(that.find("a").text());
		selectBox.find("dd").hide();

		selectBox.find("input").val(val);

		that.addClass('selected').siblings("li").removeClass('selected');
	});

	$("#typical_size").on("mouseenter","li",function(){
		var thisVal = $(this).data("val");
		var us,inchOption,cmOption;

		switch(thisVal){
			case 0:
				us = 0; inchOption={Bust:30,Waist:'23½',Hips:'32¼'};cmOption={Bust:76,Waist:60,Hips:82};
				break;

			case 2:
				us = 2; inchOption={Bust:'31½',Waist:'25¼',Hips:'33¾'};cmOption={Bust:80,Waist:64,Hips:86};
				break;

			case 4:
				us = 4; inchOption={Bust:33,Waist:'26¾',Hips:'35½'};cmOption={Bust:84,Waist:68,Hips:90};
				break;

			case 6:
				us = 6; inchOption={Bust:'34¾',Waist:'28¼',Hips:'37'};cmOption={Bust:88,Waist:72,Hips:94};
				break;

			case 8:
				us = 8; inchOption={Bust:'36¼',Waist:'30',Hips:'38½'};cmOption={Bust:92,Waist:76,Hips:98};
				break;

			case 10:
				us = 10; inchOption={Bust:'37¾',Waist:'31½',Hips:'40¼'};cmOption={Bust:96,Waist:80,Hips:102};
				break;

			case 12:
				us = 12; inchOption={Bust:'39¼',Waist:'33',Hips:'41¾'};cmOption={Bust:100,Waist:84,Hips:106};
				break;

			case 14:
				us = 14; inchOption={Bust:'41',Waist:'34¾',Hips:'43¼'};cmOption={Bust:104,Waist:88,Hips:110};
				break;

			case 16:
				us = 16; inchOption={Bust:'42½',Waist:'36¼',Hips:'45'};cmOption={Bust:108,Waist:88,Hips:116};
				break;
		}
		if(thisVal != -1){
			var html = '<div id="js_typicalTableS" class="typicalTableS" style="width:200px"></div>';
			var table = setTable(us,inchOption,cmOption);
			//alert($("#js_typicalTableS").length);
			if($("#js_typicalTableS").length){
				$("#js_typicalTableS").css({top:$(this).offset().top}).html(table);
			}else{
				$(html).css({top:$(this).offset().top,left:$(this).offset().left,'margin':'-40px 0 0 -203px'}).append(table).appendTo('body');
			}
		}
	});
	$("#typical_size").find(".js_selectBox").on("mouseleave",function(){
		$('body').find("#js_typicalTableS").remove();
	});
	//生成一个表
	function setTable(us,inchOption,cmOption){
		var html = '<table width="100%" class="table"  border="0" cellspacing="0" cellpadding="0">';
			html += '<tr><th colspan="2" scope="row">US '+us+'</th></tr>';
			html += '<tr><th scope="row">'+jsLg.bust+'</th><td>'+inchOption.Bust+' inch ('+cmOption.Bust+' cm)</td></tr>';
			html += '<tr><th scope="row">'+jsLg.waist+'</th><td>'+inchOption.Waist+' inch ('+cmOption.Waist+' cm)</td></tr>';
			html += '<tr><th scope="row">'+jsLg.hips+'</th><td>'+inchOption.Hips+' inch ('+cmOption.Hips+' cm)</td></tr>';
			html += '</table>';
		return html;
	}
})