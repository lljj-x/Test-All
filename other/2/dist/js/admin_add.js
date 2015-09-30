$(document).ready(function(){
	$("#tabbar-div span").click(function(){
		var index = $(this).attr('atr');
		$("#tabbar-div span").each(function(i){
	        if(index == i){
				$(this).attr('class','tab-front');
				$('#showtab'+i).show();
			}else{
				$(this).attr('class','tab-back');
				$('#showtab'+i).hide();
			}
		 });
	 });
	
	//if(($.cookie('WEB[last_choose]')!=null)&&(document.location.href.indexOf("goods.php?act=add")>=0)){cat_load($.cookie('WEB[last_choose]'));} //装载最后一次默认选择
	
	//$('.input_style').focus(function(){ return  Validator.FocusOne(this)});
	//$('.input_style').blur(function(){ return Validator.ValidateOne(this,3)});
	//商品属性输入方式选择
	$('.input_type').click(function(){
		if ($(".input_type:checked").val()==1){
			$(".input_type_value").attr("disabled",false);
		}else{
			$(".input_type_value").attr("disabled",true);
		}
	});
	
	//分类上传图片
	$("#d_file").hide();				
	$(".up_pic").click(function(){
		$("#d_file").is(":hidden")?$("#d_file").show():$("#d_file").hide();				
	})
	
	$("#select_cat").livequery("change",function(){
		var cat_id = $(this).val();
		var goods_id = $('#pgoods_id').val();
		cat_load(cat_id,goods_id);
	});
	
	var n = $(".addOtherCat").attr("ext_catnum");
	
	$(".addOtherCat").livequery('click',function(){
		n++;
		var item = $(this);
		get_ext_child(item,n);
		
	});
	
	//增加扩展分类
	function get_ext_child(item,n){
		var CatAttr = $("#CatAttr").html();
		if(CatAttr){

			CatAttr=CatAttr.replace(/ID/g,n);

		}
		$.ajax({
			type: "GET",
			cache:false,
			url: "category.php?act=get_ext_parent_list&n="+n,
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				item.after(msg+CatAttr+'<br><br>');
			}
		});
	}
	
		var s=$(".addCat").attr("ext_catnum");
	$(".addCat").livequery('click',function(){
		s++;
		var data = $(this);
		get_child(data,s);
		
	});
	function get_child(data,s){
		var CatAttr = $("#CatAttr").html();
		if(CatAttr){

			CatAttr=CatAttr.replace(/ID/g,s);

		}
		$.ajax({
			type: "GET",
			cache:false,
			url: "category.php?act=get_ext_parent_list&n="+s,
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				data.after(msg+CatAttr+'<br><br>');
			}
		});
	}

	//选择扩展分类
	$(".OtherCat").livequery('change',function(){
        var item = $(this)
		var cat_id = item.val();
		get_ext_child_list(item,cat_id);
	});
	
	//取得扩展分类子类
	function get_ext_child_list(item,cat_id){
		yy = item.attr('ectype');
		$.ajax({
			type: "GET",
			cache:false,
			url: "category.php?act=get_ext_child_list&cat_id=" + cat_id+"&n="+yy,
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				item.nextAll().remove('*[ectype="'+yy+'"]');
				item.after(msg);
			}
		});
	}

	
	$(".peijian_cat").livequery('change',function(){
        var item = $(this)
		var cat_id = item.val();
		get_child_list(item,cat_id);
	});
	
	//添加分类
	$(".muli_cat").livequery('change',function(){
        var item = $(this)
		var cat_id = item.val();
		get_child_list(item,cat_id,'');
	});
	
	//添加产品
	$(".goods_cat").livequery('change',function(){
        var item = $(this)
		var cat_id = item.val();
		get_child_list(item,cat_id,'get_goods_child_list');
	});


	function get_child_list(item,cat_id,act){
		act = act?act:'get_child_list';
		$.ajax({
			type: "GET",
			url: "category.php?act="+act+"&cat_id=" + cat_id,
			cache:false,
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				item.nextAll().remove('select');
				item.after(msg);
			}
		});
	}
	
	
	
	//-------------------------
	//----商品添加--------------
	//-------------------------
	//自动计算区间价格
	$("#count_volume_price").keyup(function(){
		var lilv = $("#lilv").html();
		var price = $(this).val();
		count_each_price(lilv,price);
	});
	//
	$("#shop_price").keyup(function(){
	       $("#count_volume_price").val($(this).val());
			var lilv = $("#lilv").html();
			var price = $(this).val();
			count_each_price(lilv,price);
			$("#market_price").val(parseFloat(price*1.2 + (Math.random()*price)/2).toFixed(2));
	});
	
	//计算区间价格
	function count_each_price(lilv,price){
		if (price!=''){
			if (isNaN(parseFloat(price))) {
				alert("请输入价格,不要输入字符");
				$("#count_volume_price").val('');
			}else{
				//lilv = (lilv==0)?1:(lilv*0.1);
				lilv = lilv.split('|');
				$("#tbody-volume tr").each(function(i){
					$("#count_volume_price"+(i+1)).val(parseFloat(price/lilv[0]*lilv[i]).toFixed(2));
				});
			}
		}
	}
	
	

	function cat_load(cat_id,goods_id){
		$.ajax({
			type: "GET",
			url: "category.php?act=goods_jiage&id=" + cat_id+"&goods_id=" + goods_id,
			cache:false,
			dataType: "script",
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				//$("#lilv").html(catArr[1]);
				//$("#tbody-volume tr").remove();
				var $table=$("#tbody-volume tr");
				var len=$table.length;
				for (i=2;i<=len;i++){
				    $("tr[id='"+i+"']").remove();
				}
				$("#lilv").html(catArr[1]);
				$("#firstgrad").val(catArr[2]);
				$("#tbody-volume").append(catArr[0]);
				
				var item = $('#shop_price');
				if (item.val()>0) { item.keyup();}

			}
		});
	}
	
	//促销价格控制JS
    $("#is_promote").livequery("click",function(){
		$("#promote_c").is(":hidden")?$("#promote_c").show():$("#promote_c").hide();				
		$("#promote_4").is(":hidden")?$("#promote_4").show():$("#promote_4").hide();
		$("#promote_percent").is(":hidden")?$("#promote_percent").show():$("#promote_percent").hide();
	});
	
	//生成缩图控制JS
    $("#auto_thumb").livequery("click",function(){
		$("#auto_thumb_1").is(":hidden")?$("#auto_thumb_1").show():$("#auto_thumb_1").hide();				
		$("#auto_thumb_2").is(":hidden")?$("#auto_thumb_2").show():$("#auto_thumb_2").hide();				
	});
	
	
	//取得类型属性
	$("#getAttrList").livequery("change",function(){
		var cat_id = $(this).val();
		$.ajax({
			type: "GET",
			cache:false,
			url: "goods.php?act=get_attr&goods_type=" + cat_id,
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				$("#tbody-goodsAttr").html(msg);
			}
		});
	});
	
	
	
	$("#addPrice").livequery("click",function(){
		var $table=$("#tbody-volume tr");
		var len=$table.length;
		addhtml(len);
	});
	
	
	function addhtml(x){
		$("#tbody-volume").append('<tr id='+(x+1)+'><td height="23"> <a href="javascript:;" onclick="deltr('+(x+1)+')">[- ]</a> 数量 <input type="text" name="volume_number[]" size="8" value=""/> 价格 <input type="text" name="volume_price[]"  id="count_volume_price'+(x+1)+'" size="8" value=""/></td> </tr>');
	}
	
	//更新INDEX中SEO词
	$('#inemptyvalue').click(function(){
		$.ajax({
			type: "GET",
			cache:false,
			url: "keyword_goods_details.php?act=updateempty",
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				alert(msg);
			}
		});
	});
	
	//配件
	$('#peijian_search_button').click(function(){
		var cat_id  = 	$('.peijian_cat').val();						
		var keyword = $.trim($('#keyword2').val());	
		$.ajax({
			type: "GET",
			cache:false,
			url: "goods.php?act=get_goods_list&cat_id=" + cat_id +"&keyword=" +keyword,
			beforeSend:function(){toploadshow();}, 
			success: function(msg){
				toploadhide();
				$(".source_select2").empty(); //先清空
				$(".source_select2").append(msg);
			}
		});
	});
	
	$('.source_select2').change(function(){
		var gid = $(this).val();
		var goods_price = $("#"+gid).attr("price");
		$('#price2').val(goods_price);
	})
	
	$('.source_select2').dblclick(function(){
        var flag = true;
		var yuan = $("#s_select2 select option:selected").val();
		var tark = $("#tar_sele select option").each(function(){
					if ($(this).val() == yuan) {
						flag = false;
						alert('该配件已经填加了');
					}
			});
		if (flag){
			var gid = $(this).val();
			var pid = $("#pgoods_id").val();
			var goods_price = $("#price2").val();
			var pageurl = "goods.php?act=add_group_goods&goods_id=" + gid +"&price=" +goods_price+"&pid="+pid;
			load_peijian(pageurl);
			$("#target_select2").append($("#s_select2 select option:selected"));
		}
	});
	
	$('#zengjia').click(function(){
        var flag = true;
		var yuan = $("#s_select2 select option:selected").val();
		if(yuan == undefined)flag = false;
		var tark = $("#tar_sele select option").each(function(){
					if ($(this).val() == yuan) {
						flag = false;
						alert('该配件已经存在了');
					}
			});
		if (flag){
			var gid = $('.source_select2').val();
			var pid = $("#pgoods_id").val();
			var goods_price = $("#price2").val();
			var pageurl = "goods.php?act=add_group_goods&goods_id=" + gid +"&price=" +goods_price+"&pid="+pid;
			load_peijian(pageurl);
			$($("#s_select2 select option:selected")).appendTo("#target_select2");
		}
	});
	
	
	//删除一个配件
	$('#jianqu').click(function(){
        var flag = true;
		var yuan = $("#tar_sele select option:selected").val();
		if(yuan == undefined)flag = false;
		var tark = $("#s_select2 select option").each(function(){
					if ($(this).val() == yuan) {flag = false; }
			});
		if (flag){
			var gid = $('#target_select2').val();
			var pid = $("#pgoods_id").val();
			var pageurl = "goods.php?act=drop_group_goods&goods_id=" + gid +"&pid="+pid;
			load_peijian(pageurl);
		}
		
		if (flag){
			$($("#tar_sele select option:selected")).appendTo(".source_select2");
		}else{
			$($("#tar_sele select option:selected")).remove();
		}
		
		
		
	});
	
	$('#jianqu_all').click(function(){
        var flag = true;
		var yuan = $($("#tar_sele select option")).html();	
		if(yuan == null)flag = false;
		
		if (flag){
			var pid = $("#pgoods_id").val();
			var pageurl = "goods.php?act=drop_group_goods&all=yes&pid="+pid;
			load_peijian(pageurl);
			$($("#tar_sele select option")).remove();
		}
	});
	
	
	function load_peijian(pageurl){
		$.ajax({
			type: "GET",
			cache:false,
			url: pageurl,
			beforeSend:function(){toploadshow();$('.source_select2').attr("disabled",true);}, 
			success: function(msg){	toploadhide();$('.source_select2').attr("disabled",false);}
		});
	}
	
	//-------------------------
	//----商品添加结束 ----------
	//-------------------------


    $('#is_login_1').click(function(){
			$('.login_times').hide();
	});

    $('#is_login_0').click(function(){
			$('.login_times').show();
	});
	
	$('#email_type').change(function(){
		if($(this).val() == '2'){
			$('.login_state').show();
		}else{
			$('.login_state').hide();
		}
		
		
		if($(this).val() == '3'){
			$('.order_state').show();
		}else{
			$('.order_state').hide();
		}
	});

    //按分类修改价格
	$("#leixing_0").click(function(){
		$("#leixingfuhao").html('%');						   
	});

	$("#leixing_1").click(function(){
		$("#leixingfuhao").html('美元');						   
	});



  /**
   * 添加扩展分类
   */
	  
  function addOtherCat()
  {
	  
/*      var selCat = document.forms['regform'].elements['cat_id[]'];
      for (j = 0; j < selCat.length; j++)
	  {
		  var sel = document.createElement("SELECT");
		  for (i = 0; i < selCat[j].length; i++)
		  {
			  var opt = document.createElement("OPTION");
			  opt.text = selCat[j].options[i].text;
			  opt.value = selCat[j].options[i].value;
			  if (Browser.isIE)
			  {
				  sel.add(opt);
			  }
			  else
			  {
				  sel.appendChild(opt);
			  }
		  }
		conObj.appendChild(sel);
		sel.name = "other_cat["+j+"][]";
		sel.onChange = function() {checkIsLeaf(this);};
     }
*/  }

});


	function deltr(index){
		$table=$("#tbody-volume tr");
		if(index>$table.length)
		return;
		else
		{
			$("tr[id='"+index+"']").remove();　
			//alert("tr[id='"+index+"']");
			for(var temp=index+1;temp<=$table.length;temp++)
            {
				$("tr[id='"+temp+"']").replaceWith("<tr id="+(temp-1)+"><td height='23'><a href='javascript:;' onclick='deltr("+(temp-1)+")'>[- ]</a> 数量 <input type='text' name='volume_number[]' size='8' value=''/> 价格 <input type='text' name='volume_price[]'  id='count_volume_price"+(temp-1)+"' size='8' value=''/>");
			}
		}　
     }


function toploadshow(){
	//top.frames['header-frame'].document.getElementById("load-div").style.display = "block";
}

function toploadhide(){
	//top.frames['header-frame'].document.getElementById("load-div").style.display = "none";
}



var Browser = new Object();

Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument != 'undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") != - 1);
Browser.isSafari = (navigator.userAgent.toLowerCase().indexOf("safari") != - 1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera") != - 1);


function rowindex(tr)
{
  if (Browser.isIE)
  {
    return tr.rowIndex;
  }
  else
  {
    table = tr.parentNode.parentNode;
    for (i = 0; i < table.rows.length; i ++ )
    {
      if (table.rows[i] == tr)
      {
        return i;
      }
    }
  }
}

	  /**
	   * 新增一个图片
	   */
	  function addImg(obj)
	  {
		  var src  = obj.parentNode.parentNode;
		  var idx  = rowindex(src);
		  var tbl  = document.getElementById('showtab4');
		  var row  = tbl.insertRow(idx + 1);
		  var cell = row.insertCell(-1);
		  cell.innerHTML = src.cells[0].innerHTML.replace(/(.*)(addImg)(.*)(\[)(\+)/i, "$1removeImg$3$4- ");
	  }
	
	  /**
	   * 删除图片上传
	   */
	  function removeImg(obj)
	  {
		  var row = rowindex(obj.parentNode.parentNode);
		  var tbl = document.getElementById('showtab4');
	
		  tbl.deleteRow(row);
	  }
	
	  /**
	   * 删除图片
	   */
	  function dropImg(imgId)
	  {
		dropImg(imgId);
	  }
	  
	  
	  function dropImg(imgId){
		$.ajax({
			type: "GET",
			url: 'goods.php?is_ajax=1&act=drop_image&img_id='+imgId,
			cache:false,
			beforeSend:function(){toploadshow();},
			success: function(msg){
				toploadhide();
				dropImgResponse(msg,imgId);
			}
		});
	  }
	  
	  function dropImgResponse(result,imgId)
	  {
		  if (result == 0)
		  {
			  document.getElementById('gallery_' + imgId).style.display = 'none';
		  }
	  }


  /**
   * 新增一个规格
   */
  function addSpec(obj)
  {
      var src   = obj.parentNode.parentNode;
      var idx   = rowindex(src);
      var tbl   = document.getElementById('attrTable');
      var row   = tbl.insertRow(idx + 1);
      var cell1 = row.insertCell(-1);
      var cell2 = row.insertCell(-1);
      var regx  = /<a([^>]+)<\/a>/i;

      cell1.className = 'label';
      cell1.innerHTML = src.childNodes[0].innerHTML.replace(/(.*)(addSpec)(.*)(\[)(\+)/i, "$1removeSpec$3$4-");
      cell2.innerHTML = src.childNodes[1].innerHTML.replace(/readOnly([^\s|>]*)/i, '');
  }

  /**
   * 删除规格值
   */
  function removeSpec(obj)
  {
      var row = rowindex(obj.parentNode.parentNode);
      var tbl = document.getElementById('attrTable');
      tbl.deleteRow(row);
  }

  /**
   * 处理规格
   */
  function handleSpec()
  {
      var elementCount = document.forms['theForm'].elements.length;
      for (var i = 0; i < elementCount; i++)
      {
          var element = document.forms['theForm'].elements[i];
          if (element.id.substr(0, 5) == 'spec_')
          {
              var optCount = element.options.length;
              var value = new Array(optCount);
              for (var j = 0; j < optCount; j++)
              {
                  value[j] = element.options[j].value;
              }

              var hiddenSpec = document.getElementById('hidden_' + element.id);
              hiddenSpec.value = value.join(String.fromCharCode(13)); // 用回车键隔开每个规格
          }
      }
      return true;
  }







  function handleAutoThumb(checked)
  {
      document.forms['theForm'].elements['goods_thumb'].disabled = checked;
      document.forms['theForm'].elements['goods_thumb_url'].disabled = checked;
  }




	function updateProgress(sMsg, iWidth, phpWidth)
	{
		 document.getElementById("status").innerHTML = sMsg;
		 document.getElementById("progress").style.width = iWidth + "px";
		 document.getElementById("percent").innerHTML = parseInt(iWidth / phpWidth * 100) + "%";
	}


