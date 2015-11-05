$(function(){
	(function(){
	
		var  costumerWestern = {
			//用来判断是简单选择大小，还是填写大小值
			formFlag : 1,
			//表单是否可以提交
			canUpFlag:0,
			//0表示单位为in,1表示单位为cm
			unitFlag:$("#s-custom_size").val(),
			// 1(in) = 2.5 (cm)
			unitOrg:2.54,
			//如果单位发生改变，根据换算改变相应的值
			changeUnitFun:function(flag){
				var that = this;
				var curFlag = flag;
				var curUnit = "cm";
				if(curFlag==0){curUnit = "in";}
				if(that.unitFlag!=curFlag){
					that.unitFlag=curFlag;
					$(".numpass").each(function(index, element) {
						if($(this).val()){
							if(curFlag==0){
								$(this).val(($(this).val()/that.unitOrg).toFixed(1));
							}else{
								$(this).val(($(this).val()*that.unitOrg).toFixed(1));	
							}
							//$(this).siblings("div").hide();
							// costumerWestern.cheackNumpass($(this))	
						}
					});
					$(".custom_unit").text(curUnit);
				}
			},
			//判断当前输入的值是否为有效值，并给出提示
			cheackNumpass:function($this){
				var val = $.trim($this.val());
				var wrongDiv = "tips1";
                var reg = /^[1-9]\d*|0$/;
				if(!reg.test(val)){
                    $this.addClass("wrongNum");
                    $this.siblings("."+wrongDiv).show();
				}else{
                    $this.removeClass("wrongNum");
                    $this.siblings("."+wrongDiv).hide();

                }
			},
			//判断表单是否可以提交
			canUpForm:function(){
				var that = this;
				that.canUpFlag=1
				if(that.formFlag==1){
					if($("dl.custom_input dd").find(".numpass").hasClass("wrongNum")){
						that.canUpFlag=0;
					}
					$(".custom_input").find("input.numpass").each(function(index, element) {
						if(!$(this).val()){
							that.canUpFlag=0;	
						}
					});
				}else{
					if(!$("#select-goods-size").val()){that.canUpFlag=0;}
				}
				if(that.canUpFlag==1){
					$("#s-apply_ptailor").attr("class","redBtn");	
				}else{
					$("#s-apply_ptailor").attr("class","grayBtn");		
				}
			}
		};
		
		
		var _custom_button = document.getElementById("custom_Mode");
		//如果seassion中存值了，复选框标记为选中
		if(_custom_button &&  _custom_button.getAttribute("flag")==1){
			_custom_button.checked = "checked";
		}
		//切换成标准选择大小
		$(".s-size_link").click(function(){
			$("#s-size").show();
			$("#s-pri_cussize").hide();
			$("#s-ptail_more_change").html("0.00");
			costumerWestern.formFlag = 0;
			//判断表单是否可以提交
			costumerWestern.canUpForm();
			return false;
		});
		
		//选择标准大小
		$("#select-goods-size").change(function(){
			//判断表单是否可以提交
			costumerWestern.canUpForm();
		});
		
		//切换成自由输入大小
		$(".s-size-choose").click(function(){
			$("#s-size").hide();
			$("#s-pri_cussize").show();
			$("#s-ptail_more_change").html($("#s-ptail_more").html());
			costumerWestern.formFlag = 1;
			//判断表单是否可以提交
			costumerWestern.canUpForm();
			return false;
		});
		
		//切换单位
		$("#s-custom_size").change(function(){
				//如果单位发生改变，根据换算改变相应的值
				costumerWestern.changeUnitFun($(this).val());
		});
		
		//输入大小值
		$(".custom_input").find("input.numpass").each(function(index, element) {
            $(this).keyup(function(){
				//判断当前输入的值是否为有效值，并给出提示
				 costumerWestern.cheackNumpass($(this))	;
				 //判断表单是否可以提交
				 costumerWestern.canUpForm();
			})
        });
		
		//提交表单
		$("#s-apply_ptailor").click(function(){
			if(costumerWestern.canUpFlag==1){
				if(costumerWestern.formFlag==1){
					$.post($("#s-pri_cussizeForm").attr("action"),$("#s-pri_cussizeForm").serialize(),function(){
							//$("#fancybox-close").trigger("click");
							//数据提交成功改变复选框flag属性的值
							_custom_button.setAttribute("flag",1);		
							//关闭弹出层
							$(".xubox_close").trigger("click");
					});
					//滚动到高级定制
					if(this.getAttribute("data-highGrade")==1){
						var $ad_suitCustom = $("#advanced_suitCustom");
						$('html,body').animate({scrollTop:$ad_suitCustom.offset().top},500);
						 $ad_suitCustom.trigger("click");
					}
				}else{
					window.location.href='/'+JS_LANG+'product'+$("#select-goods-size").val()+'.html';
				}
			}
			return false;
		});
		
		//取消选择
		$("#s-cancel_ptailor").click(function(){
			if(costumerWestern.formFlag==1){
				$("input.numpass").each(function(i,v){
					$(this).val("");
				});
				//清空seassion中存的值；并初始化复选框的状态
 
				$.get($("#s-pri_cussizeForm").attr("action")+'clear_suit_session=1',function(){
					_custom_button.checked = false;
					_custom_button.setAttribute("flag",0);
				});
				
			}
			$(".xubox_close").trigger("click");
		});
		//选择布料
		$(".selectWoolCheakBox").find("input:checkbox").each(function(i,v){
			$(this).click(function(){
				var allFlag = true;
				if(this.value==0){
					$("input.value_category").attr("checked",this.checked);
					this.checked?($("#selectWoolList").find("li").show()):($("#selectWoolList").find("li").hide());
				}else{
					$("input.value_category").each(function(){
						if(!this.checked){
							allFlag = false;
							$("#value_category0").attr("checked",false);
						}	
					})
					allFlag?($("#value_category0").attr("checked","checked")):($("#value_category0").attr("checked",false));
					$("li."+this.id).toggle();
				}
			})
		});
		
		
	})()

})