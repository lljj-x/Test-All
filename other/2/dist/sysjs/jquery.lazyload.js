!function(a,b){var c=a(b);a.fn.lazyload=function(d){function h(){var b=0;e.each(function(){var c=a(this);if(!g.skip_invisible||c.is(":visible"))if(g.is_dispaly_all)if(a.abovethetop(this,g)||a.leftofbegin(this,g));else if(a.belowthefold(this,g)||a.rightoffold(this,g)){if(++b>g.failure_limit)return!1}else c.trigger("appear");else a.belowthefold(this,g)||a.rightoffold(this,g)||c.trigger("appear")})}var f,e=this,g={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,is_dispaly_all:!0};return d&&(void 0!==d.effectspeed&&(d.effect_speed=d.effectspeed,delete d.effectspeed),a.extend(g,d)),f=void 0===g.container||g.container===b?c:a(g.container),0===g.event.indexOf("scroll")&&f.bind(g.event,function(){return h()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,c.one("appear",function(){if(!this.loaded){if(g.appear){var d=e.length;g.appear.call(b,d,g)}a("<img />").bind("load",function(){c.hide().attr("src",c.attr(g.data_attribute))[g.effect](g.effect_speed),b.loaded=!0;var d=a.grep(e,function(a){return!a.loaded});if(e=a(d),g.load){var f=e.length;g.load.call(b,f,g)}}).attr("src",c.attr(g.data_attribute))}}),0!==g.event.indexOf("scroll")&&c.bind(g.event,function(){b.loaded||c.trigger("appear")})}),c.bind("resize",function(){h()}),c.bind("touchmove",function(){h()}),h(),this},a.belowthefold=function(d,e){var f;return f=void 0===e.container||e.container===b?c.height()+c.scrollTop():a(e.container).offset().top+a(e.container).height(),f<=a(d).offset().top-e.threshold},a.rightoffold=function(d,e){var f;return f=void 0===e.container||e.container===b?c.width()+c.scrollLeft():a(e.container).offset().left+a(e.container).width(),f<=a(d).offset().left-e.threshold},a.abovethetop=function(d,e){var f;return f=void 0===e.container||e.container===b?c.scrollTop():a(e.container).offset().top,f>=a(d).offset().top+e.threshold+a(d).height()},a.leftofbegin=function(d,e){var f;return f=void 0===e.container||e.container===b?c.scrollLeft():a(e.container).offset().left,f>=a(d).offset().left+e.threshold+a(d).width()},a.inviewport=function(b,c){return!(a.rightofscreen(b,c)||a.leftofscreen(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return!a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}}),a(document).ready(function(){a("img[data-src]").lazyload({data_attribute:"data-src",effect:"fadeIn",skip_invisible:!0,threshold:450,is_dispaly_all:!1})}),a(document).ready(function(){a("img[original-src]").lazyload({data_attribute:"original-src",effect:"fadeIn",skip_invisible:!0,threshold:100}),a(".trigger").mouseenter(function(){a("#main0 img[original-src]").trigger("appear")})}),a(document).ready(function(){a("img[recomen-data-src]").lazyload({data_attribute:"recomen-data-src",effect:"fadeIn",skip_invisible:!0,threshold:300,is_dispaly_all:!1})})}(jQuery,window);