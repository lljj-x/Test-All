$(document).ready(function(){
	$("#agree").live('click',function(){
		if($("#agree").attr("checked") == false){
			$("#errorInfo").show();
		}else{
			$("#errorInfo").hide();
		}
	
	
	});
	var validator = $("#signupform").validate({
		rules: {
			email: {
				required: true,
				maxlength: 60,
				email: true,
				remote: "/index.php?m=users&a=check_email"
			},
			password: {
				required: true,
				maxlength: 60,
				minlength: 5
			},
			password_confirm: {
				required: true,
				minlength: 5,
				maxlength: 60,
				equalTo: "#password"
			},
			verifcode:{
				required: true,
				remote: "/fun/?act=chk_ver"
			}
		},
		messages: {
			email: {
				required: "Please enter a valid email address",
				minlength: "Please enter a valid email address",
				remote: jQuery.format("{0} is already in use")
			},
			password: {
				required: "Provide a password",
				rangelength: jQuery.format("Enter at least {0} characters")
			},
			password_confirm: {
				required: "Repeat your password",
				minlength: jQuery.format("Enter at least {0} characters"),
				equalTo: "Enter the same password as above"
			},
			verifcode:{
				required: "Please enter verification code!",
				minlength: "Enter the characters on picture",
				remote: jQuery.format("Verification code you entered is incorrect!")
			}
		},
		success: function(label) {
			// set &nbsp; as text for IE
			label.html("&nbsp;").addClass("checked");
		}
	});

	var validator = $("#signinform2").validate({
		rules: {
			txtEMail: {
				required: true,
				maxlength: 60,
				email: true
			}
		},

		messages: {
			txtEMail: {
				required: "Your e-mail address is required.",
				rangelength: jQuery.format("Enter at least {0} characters")
			}
		},
		
		success: function(label) {
			//label.html("&nbsp;").addClass("checked");
		}
	});
		
	//重载验证码
	$('#flashverify').click(function(){
		var timenow = new Date().getTime();
		$('#verify').attr({ src:'/fun/verify.php?rand='+timenow}); 
	})
	
	//检测密码强度
	$("#password").keyup(function(){
		pwd = $("#password").val();						 
		checkIntensity(pwd)							 
		});
	
	
	
	var validator = $("#signinform").validate({
		rules: {
			email: {
				required: true,
				maxlength: 60,
				email: true
			},
			passwordsign: {
				required: true,
				maxlength: 60,
				minlength: 5
			}
		},
		messages: {
			email: {
				required: "Please enter a valid email address",
				minlength: "Please enter a valid email address"
			},
			passwordsign: {
				required: "Provide a password",
				rangelength: jQuery.format("Enter at least {0} characters")
			}
		},
		success: function(label) {
			label.html("&nbsp;").addClass("checked");
		}
	});
	
	
	$('#getpassword').click(function(){
		 ymPrompt.setDefaultCfg({okTxt:' Send ',cancelTxt:' Cancel ',closeTxt:'Close',minTxt:'Minimize',maxTxt:'Maximize'});
         ymPrompt.confirmInfo({icoCls:'',msgCls:'confirm',message:"Please enter your email<br><input type='text' id='myInput' onfocus='this.select()' />",title:'Forgot your password',height:150,handler:getpassInput,autoClose:false});	
	});
	
});



/* *
 * 检测密码强度
 * @param       string     pwd     密码
 */
function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++)
  {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57)
    {
      charType = 1;
    }
    else if (t>=65 && t <=90)
    {
      charType = 2;
    }
    else if (t>=97 && t <=122)
      charType = 4;
    else
      charType = 4;
    Modes |= charType;
  }

  for (i=0;i<4;i++)
  {
    if (Modes & 1) m++;
      Modes>>>=1;
  }

  if (pwd.length<=4)
  {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  if(document.getElementById("pwd_lower") !=undefined ){
	document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
  }
  if(document.getElementById("pwd_middle") !=undefined ){
	document.getElementById("pwd_middle").style.borderBottom = Mcolor;
  }
  if(document.getElementById("pwd_high") !=undefined ){
	document.getElementById("pwd_high").style.borderBottom   = Hcolor;
  }

}



