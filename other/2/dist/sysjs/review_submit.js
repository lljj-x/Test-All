
function checkreviewform(){
	var l_pros = $("textarea[name='pros']").val().length;
	l_cons = $("textarea[name='cons']").val().length;
	l_other_thoughts = $("textarea[name='other_thoughts']").val().length;
	total_l=l_pros+l_cons+l_other_thoughts;
	if(total_l<500){$("#contect_tips").append("<span style='color:red;'>below fields added together, your review does not contain more than 500 characters</span>");};
}
$(function(){
	get_rate(0,"1");
	get_rate(0,"2");
	get_rate(0,"3");
	get_rate(0,"4");
	get_rate(0,"5");
})

function get_rate(rate,no){
	classname = "rate"+no;
	if(rate>0)
		$("#"+classname).val(rate/20);
	else
		$("#"+classname).val("")
	rate=rate.toString();
	var s;
	var g;
	$("."+classname+".g").show();
	if (rate.length>=3){
		s=10;
		g=0;
		$("."+classname+" .g").hide();
	}else if(rate=="0"){
		s=0;
		g=0;
	}else{
		s=rate.substr(0,1);
		g=rate.substr(1,1);
	}
	$("."+classname+" .s").text(s);
	$("."+classname+"  .big_rate_up").animate({width:(parseInt(s)+parseInt(g)) * 7,height:16},300);
	$("."+classname+"b").each(function(){
		$(this).mouseover(function(){
			$("."+classname+" .big_rate_up").width($(this).attr("rate") * 7);
			$("."+classname+".s").text($(this).attr("rate"));
		}).click(function(){
		})
	})
	$("."+classname).mouseout(function(){
		$("."+classname+".s").text(s);
		$("."+classname+".big_rate_up").width((parseInt(s)+parseInt(g)) * 7);
	})
}
function up_rate(rate,no){
	classname = "rate"+no;
	$("."+classname+".big_rate_up").width("0");
	get_rate(rate,no);
}
$().ready(function() {
	
	$("#reviewForm").validate({
	rules: {
			rate_price:{required: true},
			rate_easyuse:{required: true},
			rate_quality:{required: true},
			rate_usefulness:{required: true},
			rate_overall:{required: true},
			password: {
				required: true,
				maxlength: 60,
				minlength: 6
			},
			password_confirm: {
				required: true,
				minlength: 6,
				maxlength: 60,
				equalTo: "#password"
			},
			rate_price:{required: true},
			nickname:{
			required: true
			}},
		messages: {
			rate_price: {required: 'Please vote'},
			rate_price:{required: 'Please vote'},
			rate_easyuse:{required: 'Please vote'},
			rate_quality:{required: 'Please vote'},
			rate_usefulness:{required: 'Please vote'},
			rate_overall:{required: 'Please vote'},
			nickname:{required: 'Please enter you nickname'},
			password: {
				required: "enter password please",
				rangelength: jQuery.format("must more that numbers shown")
			},
			password_confirm: {
				required: "retype password please",
				minlength: jQuery.format("must more that numbers shown"),
				equalTo: "enter same password"
			}
		}						  
							  });
	

});
