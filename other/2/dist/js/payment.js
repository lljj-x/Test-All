$(document).ready(function(){
	var re = /\s/g; 					   
	$('#pay_name').keyup(function(){
		$('#pay_code').val($('#pay_name').val().replace(re,''))});
})