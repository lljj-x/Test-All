/**
 * rebate/incomedetail.js
 */
(function($) {

	var action, hashManager, sliderAction, commission;

	var Action = Base.klass.create({
		tpl: {
			item:'<li><div class="item-wrap"><a href="<%=href_f%>"><h3 class="title"><%=contentName%></h3><p class="order <%=hide_order%>">订单编号:<%=orderId%></p><p class="time"><%=commissionTime_f%></p><div class="comm-wrap"><h4>佣金(元)</h4><p><%=commission_f%></p></div></a></div></li>'
		},
		elements: {
			'.j-action-list': 'elActionList',
			'.j-lt-tab': 'elLtTab'
		},
		cgi: {
			action:'/api/commission/queryCommissionList.jsp'
		},
		pageParams:{
			listType:1,
			op:2,
			pageSize:10
		},
		init: function() {
			this.isTotal = false;

			this.pageParams.listType = Base.url.param('lt') || 1;
			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});

			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elActionList
			});

			this.loading.tpl = '<div class="j-ui-loading"><img src="../img/loading.gif" align="absmiddle"> 数据加载中，请稍等...</div>';

			this.renderListTab();

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

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;

				if(o.commmissionList && o.commmissionList.length > 0){
					this.renderList(o.commmissionList);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				}else{
					this.loading.html('暂时没有数据');
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			var item = '', rsl_dom = '', itemVals;
			var self = this;

			if (list && list.length > 0) {
				this.elActionList.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					itemVals = list[i];
					itemVals.href_f = "void(0)";
					itemVals.hide_order = "";
					if(this.pageParams.listType == 1){
						itemVals.href_f = '/item'+itemVals.contentId+'.html';
					}else if(this.pageParams.listType == 2){
						itemVals.href_f = '/sharepage.html?t_id=E_'+itemVals.contentId;
					}else if(this.pageParams.listType == 3){
						itemVals.hide_order = "hide-order";
					}
					itemVals.commissionTime_f = this.formatTime(itemVals.commissionTime);
					itemVals.commission_f = this.coverPrice(itemVals.commission);
					item = this.tmpl(this.tpl.item, itemVals);
					rsl_dom += item;
				}
				this.elActionList.html('<ul>'+rsl_dom+'</ul>');
				this.loading.hide();
			} else {
				this.loading.html();
			}
		},
		renderListTab:function(){
			var lt = this.pageParams.listType;
			this.elLtTab.removeClass('active').each(function() {
				var lttab = $(this);
				if(lt == lttab.attr('data-lt')){
					lttab.addClass('active');
					return false;
				}
			});
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
		el: '.j-rebate-group'
	});




})(window.Zepto);