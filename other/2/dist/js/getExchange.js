// JavaScript Document
$(document).ready(function(){
	$("#get_rate").click(function(){
		$("#showtips").css("display","");
		$.getJSON(
			"/eload_admin/exchange.php",
			//"/get_exchange.php",
			{act:"getExchange"},
			function(date){
				//alert(date[0].title);
				$("#showtips").css("display","none");
				$(":submit").attr("disabled","");
				$.each(date,function(i){
									// alert(date[i].v);
					try{$("#"+date[i].title).val(date[i].value)}
					catch(err){};
				});
			}
		);
	});	
});