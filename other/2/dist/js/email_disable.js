$(document).ready(function(){
    var check_radio = $("#is_validated_1").attr('checked');
	if(check_radio == true){
	   $("#is_validated_0").attr('disabled','disabled');
	   $("#is_validated_1").attr('disabled','disabled');
	}
});