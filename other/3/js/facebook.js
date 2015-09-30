//277682888966553
(function () {
    $('#img-loginFacebook').click(facebook_signup);
}());

window.fbAsyncInit = function() {
    FB.init({ appId: '1406009852948446', status: true, cookie: true, oauth: true, xfbml: true });
};
(function() {
    var e = document.createElement('script');
    e.type = 'text/javascript';
    e.src = 'https://connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementsByTagName('head')[0].appendChild(e);
} ());

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

//Facebook 弹出框
function openPop(fbuid,fname,lname){
    //赋值给js_fbEmail的属性，方便输入邮箱时获取
    $('#js_fbEMail').data("fbuid",fbuid);
    $('#js_fbEMail').data("fname",fname);
    $('#js_fbEMail').data("lname",lname);

    return $.layer({
        type : 1,
        title:false,
        border : [0],
        area : ['400px','220px'],
        offset : [($(window).height()-240)/2+'px' , '50%'],
        page : {dom : '#js_fbEMail'}
    });
}

//如果不是emial用户，发送一个ajax
function checkUser(fbuid,fname,lname){
    if(fbuid.length > 0){
        $.get('/fun/?act=chk_fb_sign&fbuid='+fbuid, function(data) {
            /*optional stuff to do after success */

            if(data == 1){
                faceBookLoginGoto();
            }else{
               openPop(fbuid,fname,lname);
            }
        });
    }
}

function facebook_signup() {

       FB.login(function(response) {
        if (response.authResponse) {
            var fbuid = response.authResponse.userID;
            var fbtoken = response.authResponse.accessToken;
                FB.api({
                    method: 'fql.query',
                    query: 'select first_name,last_name,email from user where uid=' + fbuid
                },
                    function(rep){
                        var fname = rep[0].first_name;
                        var lname = rep[0].last_name;
                        var fbEmail = rep[0].email;
                        dinoLoginForFB(fbuid,fbtoken,fname,lname,fbEmail,0,1);
                    }
                );
            } else {
                return;
            }
        }, {scope:'email'});

}


function dinoLoginForFB(fbuid,fbtoken,fname,lname,fbEmail,fstats,status){
    if(status==1)
    {
        //判断email
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(reg.test(fbEmail))
        {
            var postData = "FTextUserEmail="+fbEmail+"&ebID="+fbuid+"&firstname="+fname+"&lastname="+lname+"&FTextUserPwd2="+parseInt(Math.random()*1000000);
            postData = postData + "&ebToken=" + fbtoken + "&ebStats=" + fstats + "&ebUid=" + fbuid + "&actions=facebookLogin";
            $.ajax({
                type:'post',
                url: 'https://' + location.hostname + '/fb_eb_login.php',
                data:postData,
                error:function(XMLHttpRequest, textStatus, errorThrown){
                            //alert("AJAX Login Error."+textStatus+"-"+errorThrown,26,0,fbEmail);
                        },
                success:function(result){
                    // var ref = $.cookie("pp_login_ref");
                    // if(ref=="cart"){
                    //     var param = "";
                    //     var pcode = $("#promotion_code").val();
                    //     if(pcode.length > 0){
                    //         param = "?pcode=" + pcode;
                    //     }
                    //     window.location.href =  'http://cart.sammydress.com/m-flow-a-cart.htm'+param;
                    // }else if(ref == "login"){
                    //     window.location.href =  'http://user.sammydress.com/m-users-a-order_list.htm';
                    // }else{
                    //     window.location.reload();
                    // }
                    faceBookLoginGoto();
                }
            });
        }
        else
        {
            checkUser(fbuid,fname,lname);
            //window.location.href =  HTTPS_LOGIN_DOMAIN +'/'+JS_LANG+'m-users-a-sign.htm?type=1';
        }
    }
}