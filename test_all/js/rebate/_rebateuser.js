/**
 * rebate/rebateuser.js
 */
(function($) {

	var action, hashManager;

	var Action = Base.klass.create({
		elements: {
			'.j-rebate-list': 'elRebateList',
			'.j-user-avater':'elUserAvater',
			'.j-nickname':'elNickName',
			'.j-sex':'elSex',
			'.j-constellatory':'elConstellatory',
			'.j-commission':'elCommission'
		},
		events: {
			'click .j-act-logout': 'logOut'
		},
		tpl: {
			item:'<li><div class="pdt-item"><a href="/sharepage.html?t_id=E_<%=eid%>&head=no" target="_blank"><div class="thumbnail"><span class="label"></span><div class="img-wrap"><img src="<%=title_img%>"></div></div><div class="detail"><h3 class="title"><%=title%></h3><p class="count">阅读量：<span class="read"><%=read_count%></span>&nbsp;&nbsp;&nbsp;&nbsp;被引用：<span class="quote"><%=quote_count%></span></p><p class="date"><%=createtime_f%></p></div></a></div></li>'
		},
		cgi: {
			action:'/api/user/personalHomePage.jsp'
		},
		pageParams:{
			eid:0,
			pageSize:10
		},
		init: function() {
			this.isTotal = false;

			this.pageParams.eid = Base.url.param('eid') || 0;

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elRebateList
			});

			this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';

			this.flush();

		},
		flush: function() {
			this.pageParams.pageNo = Base.url.getPageHash() || 1;
			this.getData();
			this.pager.setCurrent(this.pageParams.pageNo);
			this.isTotal = false;
			window.scrollTo(0, 0);
		},
		pagerGo: function(pageNo) {
			hashManager.setHash('pg-' + pageNo);
		},
		getData: function() {

			if(this.pageParams.eid && this.pageParams.eid > 0){
				this.pageParams._ = new Date() - 0;
				$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
				this.loading.show();
			}else{
				this.userNotFound();
			}	
			
		},
		getDataBack: function(result) {
			var o;

			if (result && result.errCode === 0) {
				o = result.obj;
				this.renderList(o);
				if (!this.isTotal) {
					this.pager.total(o.totalNum, this.pageParams.pageSize);
					this.isTotal = true;
				}				
			} else {
				this.el.html('');
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(o) {
			var item,
				item_d,
				result;
			var formatTime = this.formatTime;
			var coverPrice = this.coverPrice;
			var tranSex = this.tranSex;
			var isEmptyObj = this.isEmptyObj;
			var list = o.list, personal = o.personal;

			if(personal && !isEmptyObj(personal)){

				if(personal.headImgUrl) this.elUserAvater.attr('src', personal.headImgUrl);
				this.elNickName.text(personal.nickName || '神秘塔客');
				this.elSex.text(tranSex(personal.sex));
				this.elConstellatory.text((personal.constellatory || '未知'));
				this.elCommission.text('￥'+coverPrice(personal.commission));

				if (list && list.length > 0) {
					rsl_dom = '';
					this.elRebateList.html('');
					for (var i = 0, len = list.length; i < len; i++) {
						item = list[i];
						item.createtime_f = formatTime(item.createtime);
						item_d = this.tmpl(this.tpl.item, item);
						rsl_dom += item_d;
					}
					this.elRebateList.html('<ul>'+rsl_dom+'</ul>');
					this.loading.hide();
				} else {
					this.loading.html();
				}
			}else{
				this.userNotFound();
			}
		},
		tranSex: function(sexcode){
			var sexttl = '未知';
			if(sexcode == 1){
				sexttl = '男';
			}else if(sexcode == 2){
				sexttl = '女';
			}
			return sexttl;
		},
		userNotFound:function(){
			this.el.hide();
			$('.j-err-prompt').show();
		},
		isEmptyObj : function(obj) {
    		if (obj === null) return true;
		    if (obj.length > 0)    return false;
		    if (obj.length === 0)  return true;
		    for (var key in obj) {
		        if (hasOwnProperty.call(obj, key)) return false;
		    }
		    return true;
		}
	});

	var HashManager = Base.klass.create({
		init: function() {
			$(window).on('hashchange', this.proxy(this.hashChange));
		},
		setHash: function(hash) {
			window.location.hash = hash;
		},
		hashChange: function() {
			var pageNo = Base.url.getPageHash();
			action.flush();
		}
	});


	hashManager = new HashManager();

	action = new Action({
		el: '.j-container'
	});

	// Base.url.coverFrom();

})(window.Zepto);