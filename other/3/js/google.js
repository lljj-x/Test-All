 
(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js?onload=render';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function render() {
    gapi.signin.render('customBtn', {
      'callback': 'signinCallback',
	  'approvalprompt': 'force',
      'clientid': '538587022529-lg9orktcfol1h0l8rvkejjnfq75dcgnr.apps.googleusercontent.com',//495176459217-v8rl4fuo74o4pe6qqqiclek5vf7rn3fu.apps.googleusercontent.com',
      'cookiepolicy': 'http://sammydress.com',
      'requestvisibleactions': 'http://schemas.google.com/AddActivity',
	 // 'redirecturi': 'postmessage',
      'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
    });
}

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // 已成功授权
    gapi.auth.setToken(authResult['access_token']); // 存储传回的令牌。

    var url = '/index.php?m=users&a=sign&type=google';

    $.getJSON(url,{'access_token':authResult['access_token']}, function(data){
      if(data.result == 'ok'){//登陆成功
              faceBookLoginGoto();
          }else{
              /*options = {
                  msg : data.msg,
                  typeTag :0
              }
              GLOBAL.PopObj.alert(options);*/
          }

    })
  } else if (authResult['error']) {
    // 存在错误。
    // 可能的错误代码：
    //   “access_denied” - 用户拒绝访问您的应用
    //   “immediate_failed”- 无法自动登录用户帐户
    // console.log('存在错误：' + authResult['error']);
  }
}


//Facebook 登陆成功跳转
function faceBookLoginGoto(){
    var flow = $('#flow').val(),
        ref = $('#ref').val();
    
    if(ref != ''){
        window.location.href=ref; //返回
    }else{
        if (flow == 'checkout'){
            window.location.href = HTTPS_ORDER_DOMAIN +'/'+JS_LANG+'m-flow-a-checkout.htm'; //返回购物车
        }else{
            window.location.href='/'+JS_LANG+"m-users.htm";
        }
    }
} 