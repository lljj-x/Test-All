/**
 * rebate/search.js
 */
(function($) {

	var action, hashManager;

	var g_tip = new Base.Widget.Tip();

	var Action = Base.klass.create({
		elements: {
			'.j-coupon-rule': 'elCouponRule',
			'.j-no-data': 'elNoData',
			'.j-details-list': 'elDetailsList',
			'.j-action-list': 'elActionList',
			'.j-sort-tab': 'elSortTab',
			'.j-rule-mark': 'elRuleMark',
			'.j-si-txt': 'elSiTxt',
			'.j-loading-wrap': 'elLoadingWrap'
		},
		events:{
			'click .j-coupon-rule': 'showCouponRule',
			'click .j-rule-mark':'hideCouponRule',
			'click .j-sort-tab': 'changeSortTab',
			'click .j-si-clear': 'clearExchangeInput',
			'submit .j-exchange-form' : 'doExchange',
			'click .use-ready': 'useCoupon'
		},
		tpl: {
			item:'<li><div class="item-wrap <%=status_f%> <%=couponType_f%> <%=useready%>" data-couponCode="<%=couponCode%>"><div class="plane-left"><div class="bg-wrap"><p class="denom "><%=couponFee_f%></p><h3 class="title"><%=couponTypeName%></h3></div></div><div class="plane-right"><div class="table-wrap"><p class="des"><%=title%><br /><span class="limit">有效期：<%=beginDate_f%>至<%=endDate_f%></span></p></div></div></div></li>'
		},
		cgi: {
			action:'/api/coupon/queryCoupons.jsp'
		},
		pageParams:{
			op:1,
			pageSize:10
		},
		innerParmas:{
			usecoupon:'',
			orderid:''
		},
		init: function() {
			this.isTotal = false;


			this.pageParams.scope = Base.url.param('scope') || 1;
			this.innerParmas.usecoupon = Base.url.param('usecoupon') || '';
			this.innerParmas.orderid =  Base.url.param('orderid') || '';

			this.pageParams.pageNo = Base.url.param('pg') || 1;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elLoadingWrap
			});

			this.flush();

		},
		flush: function() {
			this.renderSortTab();
			this.pager.setCurrent(this.pageParams.pageNo);
			this.isTotal = false;
			window.scrollTo(0, 0);
			this.getData();
		},
		pagerGo: function(pageNo) {
			this.pageParams.pageNo = pageNo;
			this.flush();
		},
		getData: function() {

			this.elHide(['j-no-data', 'j-details-list']);
			this.pageParams.scope = this.pageParams.scope || 1;
			this.pageParams._ = new Date() - 0;
			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));
			this.loading.show();

		},
		getDataBack: function(result) {
			var list,
				o;
			if (result && result.errCode === 0) {
				o = result.obj;
				if (o.list && o.list.length > 0) {
					this.renderList(o.list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				} else {
					this.elNoData.html('<p>暂无优惠券</p>');
					this.elHide(['j-details-list']);
					this.elShow(['j-no-data']);
				}
			} else {
				this.elNoData.html('<p>获取数据失败。【' + result.errMsg + '】</p>');
				this.elHide(['j-details-list']);
				this.elShow(['j-no-data']);
			}
			this.loading.hide();
		},
		renderList: function(list) {
			var  item = '', result_dom = '', item_vals;
			var  useReady = '';

			var c_orderid = this.innerParmas.orderid;
			var c_usecoupon = this.innerParmas.usecoupon;
			var c_scope = this.pageParams.scope;
			if(c_orderid && c_usecoupon == 1 && c_scope == 1){
				useReady = 'use-ready';
			}

			this.elActionList.html('');

			for (var i = 0, len = list.length; i < len; i++) {
				item_vals = list[i];
				item_vals.status_f = '';
				if(c_scope == 1){
					item_vals.status_f = 's-yyy';
				}else if(c_scope == 2){
					item_vals.status_f = 's-ysy';
				}else if(c_scope == 3){
					item_vals.status_f = 's-ygq';
				}
				item_vals.couponType_f = '';
				if(item_vals.couponType == 1){
					item_vals.couponType_f = 't-mj';
				}else if(item_vals.couponType == 2){
					item_vals.couponType_f = 't-xj';
				}
				item_vals.couponFee_f = Math.floor(Number(item_vals.couponFee)/100);
				item_vals.beginDate_f = this.formatTime(Number(item_vals.beginDate),'yyyy-MM-dd');
				item_vals.endDate_f = this.formatTime(Number(item_vals.endDate),'yyyy-MM-dd');
				item_vals.useready = useReady;
				item = this.tmpl(this.tpl.item, item_vals);
				result_dom += item;
			}
			this.elActionList.html('<ul>'+result_dom+'</ul>');
			
			this.elHide(['j-no-data']);
			this.elShow(['j-details-list']);
		},
		renderSortTab:function(){
			var scope = this.pageParams.scope;
			this.elSortTab.removeClass('active').each(function(){
				var tab = $(this);
				if(tab.attr('data-scope') == scope){
					tab.addClass('active');
					return false;
				}
			});
		},
		changeSortTab:function(e){
			var tab = $(e.currentTarget);
			var scope = tab.attr('data-scope');
			this.pageParams.scope = scope;
			this.pagerGo(1);
		},
		clearExchangeInput:function(){
			this.elSiTxt.val('');
		},
		doExchange:function(e){
			var self = this;
			e.preventDefault();
			var ecode = this.elSiTxt.val();
			if(ecode === '' || !(/^[A-Za-z0-9]+$/.test(ecode))){
				this.elSiTxt.val('');
				g_tip.show('请输入字母数字组合的兑换码');
				return false;
			}
			$.ajax({
                type: 'POST',
                url: '/api/coupon/exchangeCoupon.jsp',
                data: {code:ecode},
                dataType: 'json',
                timeout: 5000,
                success: function(data) {
                	if(data.errCode === 0 && data.obj){
                		var o =data.obj;
                		var couponTypeName = o.couponTypeName || '';
                		var title = o.title || '';
                		self.elSiTxt.val('');
	                    g_tip.show(title+' '+couponTypeName+' '+'兑换成功');
	                    self.pageParams.scope = 1;
						if(window.location.hash === '#pg-1'){
							if(hashManager) hashManager.setHash('');
						}else{
							self.pagerGo(1);
						}
                	}else{
                		g_tip.show(data.errMsg);
                	}
                },
                error: function(xhr, type) {
                    g_tip.show('系统繁忙，稍后再试');
                }
            });
		},
		showCouponRule:function(){
			this.elRuleMark.show();
		},
		hideCouponRule:function(){
			this.elRuleMark.hide();
		},
		useCoupon:function(e){
			var coupon = $(e.currentTarget);
			var couponCode = coupon.attr('data-couponCode');
			var orderid = this.innerParmas.orderid;
			window.location.href = '/checkout/index.html?coupon='+couponCode+'&orderid='+orderid;
		},
		elShow:function(elArr){
			if(!elArr.length) return false;
			for(var i = 0, len = elArr.length; i<len; i++){
				this.el.find('.'+elArr[i]).removeClass('hide');
			}
		},
		elHide:function(elArr){
			if(!elArr.length) return false;
			for(var i = 0, len = elArr.length; i<len; i++){
				this.el.find('.'+elArr[i]).addClass('hide');
			}
		}
	});

	action = new Action({
		el: '.j-action-group'
	});


})(window.Zepto);