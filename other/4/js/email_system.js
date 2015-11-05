function countDown() {
	var $send_time = $('#send_time');
	$send_time.html($send_time.html() * 1 - 1);
	if ($send_time.html() == '0') {
		clearInterval(timer);
		$('#send_email').css('backgroundColor', '#ff0047').data('clickFlag', '0');
		$('#send_tips').slideUp();
	}
}
var timer;
$(function() {
	$('#send_email').click(function() {
		var $this = $(this);
		var clickFlag = $this.data('clickFlag');
		if (clickFlag != '1') {
			$.post(DOMAIN_USER + '/m-users-a-send_validation.html',function(data){
				data = eval('(' + data + ')');
				if(data.status == false){
					alert(data.msg);
				}else{
					$this.data('clickFlag', '1').css('backgroundColor', '#ccc');
					$('#send_time').html('60');
					$('#send_tips').slideDown();
					timer = setInterval("countDown()", 1000);
				}
			});
		}
	});
})