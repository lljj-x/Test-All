
$(document).ready(function(){
var validator = $("#checkprofile").validate({
		rules: {
			firstname:{required: true,maxlength: 60},
			lastname: {required: true,maxlength: 60},
			msn:{
				maxlength: 60
			},
			
			introduction: {
				required: true,
				maxlength: 500,
				minlength: 6
			},
			paypal_account: {
				required: true,
				email:true,
				minlength: 5,
				maxlength: 60
				
			}
		},
		
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		}
	});

var validator = $("#link_form").validate({
		rules: {
			link_name:{required: true,maxlength: 60},
			img: {maxlength: 200},
			link_text:{
				required: true,
				maxlength: 200
			},
			
			link_url: {
				required: true,
				url:true,
				maxlength: 200
			}
		},
		
		// set this class to error-labels to indicate valid fields
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		}
	});
})