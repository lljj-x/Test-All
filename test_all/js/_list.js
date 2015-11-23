/**
 * list.js
 */
(function($) {

	var action, hashManager;

	var Action = Base.klass.create({
		tpl: {
			item:'<li>\
						<div class="item-wrap">\
							<a href="<%=url%>">\
					            <div class="thumbnail">\
					            	<img src="<%=pic%>" onerror="this.onerror=null;this.src=&quot;img/app2/pic_nor.png&quot;;">\
					            </div>\
					            <dl class="details">\
					            	<dt class="title"><%=title%></dt>\
					                <dd class="price"><label>￥ <strong><%=price%></strong></label></dd>\
					                <dd class="source"><%=depotstr%></dd>\
					            </dl>\
					        </a>\
					        <div class="discount <%=discount_hide%>"><%=discount%>折</div>\
					        <div class="seldout-cover <%=seldout%>">\
					        	<span class="seldout"></span>\
					        </div>\
						</div>\
					</li>'
			
		},
		cgi: {
			chanAction:'/api/product/getProductList.jsp',
			funcAction:'/api/product/queryProductByFuncId.jsp'
				// action: 'json/activity.json'
		},
		pageParams:{
			pageSize:10
		},
		listType: '',
		init: function() {
			this.isTotal = false;

			var func = Base.url.param('func') || '';
			if(func){
				this.pageParams.funcId = func;
				this.listType = 'func';
				this.cgi.action = this.cgi.funcAction;
			} 
			var chan = Base.url.param('chan') || '';
			if(chan){
				this.pageParams.actid = chan;
				this.listType = 'chan';
				this.cgi.action = this.cgi.chanAction;
			}

			this.pageParams.pageNo = Base.url.getPageHash() || 1;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

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
			
			this.pageParams._ = new Date - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();
			
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;

				if(this.listType === 'chan'){
					if (o.activityName) {
						$('#j-act-title').html(o.activityName);
						document.title = 'Allpyra金字塔-' + o.activityName;
					}
				}else if(this.listType === 'func'){
					$('#j-act-title').html('分类商品');
					document.title = 'Allpyra金字塔-分类商品';
				}

				if ((list = o.productList)) {
					this.renderList(list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				} else {
					this.renderList([]);
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		renderList: function(list) {
			var item,
				spliter,
				slist,
				listI,
				rsl_dom,
				discount;

			if (list && list.length) {
				rsl_dom = '';
				this.el.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					listI = list[i];
					discount = Math.round((listI.price / listI.referance_price)*100)/10;
					item = this.tmpl(this.tpl.item, {
						url:Base.url.getItemUrl(listI.pid),
						id: listI.pid,
						title: listI.name,
						pic: listI.logourl,
						price: this.coverPrice(listI.price),
						depotstr: listI.depotName,
						discount: discount,
						discount_hide: discount > 9.9 ? 'hide' : '',
						seldout: (listI.maxbuy < 1 || listI.status === 0) ? '' : 'hide'
					});
					rsl_dom += item;
				}
				this.el.html('<ul>'+rsl_dom+'</ul>');

				this.loading.hide();
			} else {
				this.loading.html();
			}
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
		el: '.j-action-list'
	});

	// Base.url.coverFrom();

})(window.Zepto);