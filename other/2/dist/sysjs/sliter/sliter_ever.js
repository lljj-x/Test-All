$(function(){
	
	//dfp slides
	$(".slide_dfp_l").slideDfp();
	$(".slide_dfp_s").slideDfp();	
	

    //active count down
    jQuery(".count_down").each(function(){
    	jQuery(this).countDown();      
    });
	
    jQuery(".slide_dfp_l").each(function(){
		jQuery(this).slideDfp();
	});
	jQuery(".slide_dfp_s").each(function(){
		jQuery(this).slideDfp();      
	});
});






jQuery.fn.slideDfp = function() {
	var mc = $(this).children('div');
        var slides = mc.size(), index = 0;
	$(mc).hide().eq(index).show();
        if ($(this).attr('class')!='slide_dfp_l') {
            $(this).append('<img title="pre" style="left:0" src="/sysjs/sliter/img/prev_arrow.png" /><img title="next" src="/sysjs/sliter/img/next_arrow.png" style="right:0" />');
            $(this).children('img').css({position:'absolute','z-index':1000,top:$(this).height()/2-10}).bind('click',function(event){
                ($(event.target).attr('title')=='pre')?index--:index++;
                index = (index+slides) % slides;
                $(mc).hide().eq(index).show();
            });
        }else {
	    $(this).append('<img title="pre" style="right:'+(10+14*(slides+1))+'px;" src="/sysjs/sliter/img/prev_arr.jpg" /><img title="next" src="/sysjs/sliter/img/next_arr.jpg" style="right:10px;" />');
	    for (var i=0;i<slides;i++) {
                $(this).append('<img class="dfp_dot" title="'+(i+1)+'" style="right:'+(10+14*(slides-i))+'px;" src="/sysjs/sliter/img/dot.jpg" />');
            }

            $(this).children('img').css({position:'absolute',cursor:'pointer',bottom:'7px','z-index':1000}).bind('click',function(event){
		if($(event.target).attr('title')=='pre'){
		    index--;
		}else if($(event.target).attr('title')=='next'){
		    index++;
		}else{
		    index = parseInt($(event.target).attr('title'))-1;
		}
                index = (index+slides) % slides;
                $(mc).hide().eq(index).show();
		$(this).parent().children('img.dfp_dot').css('opacity',0.5).eq(index).css('opacity',1);
            }); 
	    $(this).children('img.dfp_dot').css('opacity',0.5).eq(index).css('opacity',1);
        }
};

jQuery.fn.countDown = function(){
	var el = jQuery(this);
	if(!el.attr('endtime')) 
		return;
	
	var startTime;
	try {
		startTime = new Date(setHs);
	}catch (e) {
		startTime = new Date();
	}
      
	var timer;
	var now = (new Date(el.attr('endtime')) - startTime);            
	var displayDay, displayHour, displayMin, displaySec;
	var l_d = 2, l_h = 2, l_m = 2, l_s = 2;            
	el.find('td').each(function(){
		var td = jQuery(this);
		if (td.hasClass('d')) {
			displayDay = td;
			l_d = td.html().length;
		}
		if (td.hasClass('h')) {
			displayHour = td;
			l_h = td.html().length;
		}
		if (td.hasClass('m')) {
			displayMin = td;
			l_m = td.html().length;
		}
		if (td.hasClass('s')) {
			displaySec = td;
			l_s = td.html().length;
		}
	})

	if (now <= 0) {
		return;
	}
	var tick = function(){
		now -= 1000;                
		if (now.valueOf() < 0) {
			window.clearInterval(timer);
			return;
		};
		//update the values
		var seconds = now.valueOf() / 1000;
		var day = (Math.floor(seconds / 86400)) % 86400;
		var hrs = (Math.floor(seconds / 3600)) % 24;
		var min = (Math.floor(seconds / 60)) % 60;
		var sec = (Math.floor(seconds / 1)) % 60;
          
		if (l_d == 2) 
			day = (day + "").length < 2 ? "0" + day : day;
		if (l_h == 2) 
			hrs = (hrs + "").length < 2 ? "0" + hrs : hrs;
		if (l_m == 2) 
			min = (min + "").length < 2 ? "0" + min : min;
		if (l_s == 2) 
			sec = (sec + "").length < 2 ? "0" + sec : sec;
          
		if (displayDay) 
			displayDay.html(day);
		if (displayHour) 
			displayHour.html(hrs);
		if (displayMin) 
			displayMin.html(min);
		if (displaySec) 
			displaySec.html(sec);
          
          
		if (parseInt(day) > 1) {
			el.find('.day_2').show();
		}else{
			el.find('.day_2').hide();
			el.find('.day_1').show();
		}
	}
	tick();
	timer = window.setInterval(tick, 1000);
	el.parent().show();
};
jQuery.fn.tooltip = function(){
	return this.each(function(){
		if(!jQuery(this).attr('tooltip'))
			return;
		
		if($('#tooltip').size()<1){
			$('<div id="tooltip"><div id="tooltip_con"></div><div class="tooltip-bottom"></div><div>').prependTo("body"); 
		}
			
		jQuery(this).hover(
			function(){
				jQuery('#tooltip_con').html(jQuery(this).attr('tooltip'));
				var offset = jQuery(this).offset();
				var el = jQuery(this);
				var tooltip = jQuery('#tooltip');
	
				var offleft = offset.left - (jQuery(window).width()-952)/2;
				if((offleft+el.width())>693){
					tooltip.css('left',(offset.left+el.width())-259);
					tooltip.children(".tooltip-con").css({'background-position':'-819px -131px'});
				}else{ 
					tooltip.css('left',offset.left-10);
				}
				tooltip.css('top',offset.top+el.height()).show();
			},
			function(){
				jQuery('#tooltip').hide();
			}
		)
	})
};
jQuery.fn.slide = function(settings){
	return this.each(function(){
	    jQuery.extend(this, {defertime:7000, btnopacity:0.9, showbutton: true,fadingtime: 800,slides:3}, settings);
	    var _c = this, index = 0, timer,slides = slides?slides:_c.slides;
	   
	    jQuery(_c).hover(function(){
	        clearInterval(timer);
	    },function(){
	        timer = setInterval(function(){sliding(++index%slides)}, _c.defertime);
	    }).trigger("mouseleave");
	
	    function sliding(n){
	        jQuery(_c).find("img").stop().animate({opacity:0},_c.fadingtime).css('z-index','').end().find("img").eq(n).stop().css('z-index',slides).animate({opacity:1},_c.fadingtime);
	        jQuery(_c).find("li").css({'color':'#B3B3B3','background':'#fff','font-weight':'normal'}).eq(n).css({'color':'#fff','background':'#c5c5c3','font-weight':'bold'});
	    }
	    var btnstr = '<ul style="position:absolute;z-index:'+(slides+1)+';right:3px;bottom:3px;">';   
	    for(var i=0; i<slides; i++){
	        btnstr += '<li style="float:left;color:#B3B3B3;text-align:center;line-height:18px;width:28px;height:18px;font-size:12px;cursor:pointer;overflow: hidden;margin:0px 1px;border:1px solid #F3F3F3;background:#fff;">'+(i+1)+'</li>';
	    }   
	    btnstr += '</ul>';
	    if(_c.showbutton)
	        jQuery(_c).append(btnstr);
	   
	    jQuery(_c).find("img").css({'opacity':0,'position':'absolute','top':'0','left':'0'}).eq(0).css({'z-index':1,'opacity':1});
	    jQuery(_c).find("li").hover(function(){
	        jQuery(this).css({'color':'#fff','background':'#c5c5c3','font-weight':'bold'});
	    },function(){
	        if(jQuery(_c).find("li").index(this)!==index)jQuery(_c).find("li").eq(jQuery(_c).find("li").index(this)).css({'color':'#B3B3B3','background':'#fff','font-weight':'normal'});
	    }).click(function(){index = jQuery(_c).find("li").index(this);sliding(index);jQuery(this).css({'color':'#fff','background':'#c5c5c3','font-weight':'bold'})}).fadeTo("fast", _c.btnopacity).eq(0).css({'color':'#fff','background':'#c5c5c3','font-weight':'bold'});   
	})
};


jQuery.fn.slideDfp = function() {
	return this.each(function(){
		var mc = $(this).children('div');
		var slides = mc.size(), index = 0;
		$(mc).hide().eq(index).show();
		function sliding(n){
			$(mc).show();
			$(mc).find("img").stop().animate({opacity:0},800).css('z-index','').end().find("img").eq(n).stop().css('z-index',slides).animate({opacity:1},{duration:800,complete:function(){$(mc).hide().eq(n).show();}});

			$(mc).parent().children('img.dfp_dot').css('opacity',0.5).eq(n).css('opacity',1);
		}
		$(this).hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(function(){sliding(++index%slides)}, 4000);
		}).trigger("mouseleave");

		if ($(this).attr('class')!='slide_dfp_l') {
			$(this).append('<img title="pre" style="left:0" src="/sysjs/sliter/img/prev_arrow.png" /><img title="next" src="/sysjs/sliter/img/next_arrow.png" style="right:0" />');
			$(this).children('img').css({position:'absolute','z-index':1000,top:$(this).height()/2-10}).bind('click',function(event){
				($(event.target).attr('title')=='pre')?index--:index++;
				index = (index+slides) % slides;
				sliding(index);
			});
		}else{
			$(this).append('<img title="pre" style="right:'+(10+14*(slides+1))+'px;" src="/sysjs/sliter/img/prev_arr.jpg" /><img title="next" src="/sysjs/sliter/img/next_arr.jpg" style="right:10px;" />');
			for (var i=0;i<slides;i++) {
				$(this).append('<img class="dfp_dot" title="'+(i+1)+'" style="right:'+(10+14*(slides-i))+'px;" src="/sysjs/sliter/img/dot.jpg" />');
			}		

			$(this).children('img').css({position:'absolute',cursor:'pointer',bottom:'7px','z-index':1000}).bind('click',function(event){
				if($(event.target).attr('title')=='pre'){
					index--;
				}else if($(event.target).attr('title')=='next'){
					index++;
				}else{
					index = parseInt($(event.target).attr('title'))-1;
				}
				index = (index+slides) % slides;
				sliding(index);
			}); 
			$(this).children('img.dfp_dot').css('opacity',0.5).eq(index).css('opacity',1);
		}
	})
};