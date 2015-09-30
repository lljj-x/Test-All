function show_goods(id,num){
		$("#J_MarkerTip_"+id+"_"+num).show();
		$(".poster_"+num).css('display','block');
	
	}
function show_market(id){
	//$(".poster-point").hide();
	$(".poster_"+id).css('display','block');
}
$(function(){
	$(".image-wrapper").mouseleave(function(){
		$(".poster-point").hide();
		$(".goods-tip").hide();

	});
	$(".goods-tip").mouseleave(function(){
		$(".goods-tip").hide();
	});
	 //жидибщжЄТы
	$('#flashverify').live("click",function(){
		var timenow = new Date().getTime();
		$('#verify').attr({ src:'/fun/verify.php?rand='+timenow});
	});

});
