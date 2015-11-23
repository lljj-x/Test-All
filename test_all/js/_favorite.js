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
					            	<img src="<%=pic%>">\
					            </div>\
					            <dl class="details">\
					            	<dt class="title"><%=title%></dt>\
					            	<dd class="origin"><%=origin%></dd>\
					                <dd class="source"><%=depotstr%></dd>\
					            </dl>\
					        </a>\
					        <div class="favor j-favorinfo isFavor" data-pid="<%=id%>"><a href="javascript:void(0);"></a></div>\
					        </div>\
						</div>\
					</li>'
		},
		cgi: {
			action:'/api/user/favorite.jsp',
		},
		pageParams:{
			pageSize:10,
			op:3
		},
		init: function() {
			this.isTotal = false;

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

			this.pageParams._ = new Date() - 0;

			$.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

			this.loading.show();

		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {

				o = result.obj;				

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
				var dom = '<div class="nodata-wrap"><p>暂无数据</p></div>';
				this.el.html(dom);
				// this.loading.html('获取数据失败。【' + result.errMsg + '】');
				this.loading.hide();
			}
		},
		renderList: function(list) {
			var item,
				spliter,
				slist,
				listI,
				rsl_dom;

			if (list && list.length) {
				rsl_dom = '';
				this.el.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					listI = list[i];

					item = this.tmpl(this.tpl.item, {
						url:Base.url.getItemUrl(listI.pid),
						id: listI.pid,
						title: listI.name,
						origin: listI.origin,
						pic: listI.logourl,
						price: this.coverPrice(listI.price),
						depotstr: listI.depotName,
					});
					rsl_dom += item;
				}
				this.el.html('<ul>'+rsl_dom+'</ul>');
				
			} else {
				var dom = '<div class="nodata-wrap"><p>暂无数据</p></div>';
				this.el.html.html(dom);
				// this.loading.html();
			}
			this.loading.hide();
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

	favorControl = new Base.Widget.FavorControl({
		el: '.j-action-list'
	});

	// Base.url.coverFrom();

})(window.Zepto);