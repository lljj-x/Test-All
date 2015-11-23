/**
 * rebate/systemnew.js
 */
(function($) {


	var action;

	var Action = Base.klass.create({
		cgi: {
			action:'/api/notice/queryNotice.jsp'
		},
		pageParams:{
			op:2,
		},
		init: function() {

			this.pageParams.nid = Base.url.param('nid');

			this.loading = new Base.Widget.Loading({
				owner: this.elActionList
			});

			this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';

			this.getData();

		},
		getData: function() {

			if(!this.pageParams.nid){
				this.el.html('<p style="padding: 100px 0;text-align: center;">没找到改公告详情</p>');
				return false;
			}

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;
				this.renderList(o);
				
			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(o) {
			var formatTime = this.formatTime;

			this.el.find('.title').text(o.title);
			this.el.find('.time').text(formatTime(o.crt_time));
			this.el.find('.content').text(o.content);

			this.loading.hide();

			// if (list && list.length > 0) {
			// 	this.elActionList.html('');
			// 	for (var i = 0, len = list.length; i < len; i++) {
			// 		itemVals = list[i];
			// 		item = this.tmpl(this.tpl.item, itemVals);
			// 		rsl_dom += item;
			// 	}
			// 	this.elActionList.html('<ul>'+rsl_dom+'</ul>');
			// 	this.loading.hide();
			// } else {
			// 	this.loading.html();
			// }
		}
	});

	action = new Action({
		el: '.j-rebate-group'
	});




})(window.Zepto);