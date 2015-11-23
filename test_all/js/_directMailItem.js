/**
 * directMailItem
 */
(function($) {

	var categoryHomeAction, hashManager;

	var directMailItem = Base.klass.create({
		elements: {
			'.j-image-list': 'elImageList',
			'.j-product-list': 'elProductList'
		},
		tpl: {
			item: '<li>\
						<div class="item-wrap">\
							<a href="item.html#id-<%=pid%>">\
					            <div class="thumbnail">\
					            	<img src="<%=logourl%>">\
					            </div>\
					            <dl class="details">\
					            	<dt class="title"><%=name%></dt>\
					                <dd class="price"><label>￥ <strong><%=price%></strong></label></dd>\
					                <dd class="source"><span><%=depotName%></span></dd>\
					            </dl>\
					        </a>\
					        <div class="discount"><%=discount%>折</div>\
						</div>\
					</li>'
		},
		cgi: {
			action: '/api/product/queryProductList.jsp'
		},
		pageParams: {
			pageSize: 10,
			pageNo: 1
		},
		init: function() {
			this.isTotal = false;

			this.isFirst = false;

			this.chanid = Base.url.param('chanid') || '';

			if (this.chanid) {
				this.pager = new Base.Widget.Pager({
					el: '.j-pager'
				});
				this.pager.bind('go', this.proxy(this.pagerGo));

				this.loading = new Base.Widget.Loading({
					owner: this.elProductList
				});

				this.initImage();

				this.flush();
			} else {
				// 没有参数跳首页
				window.location.href = '/';
			}

		},
		initImage: function() {
			var chanid = this.chanid,
				$list = this.elImageList,
				list = [];

			switch (+chanid) {
				case 51: // 亚洲馆
					list.push('http://m.allpyra.com/lp/1509172341590026/img/p_01.jpg');
					list.push('http://m.allpyra.com/lp/1509172341590026/img/p_02.jpg');
					break;
				case 61: // 美洲馆
					list.push('http://m.allpyra.com/lp/1509172343120028/img/p_01.jpg');
					list.push('http://m.allpyra.com/lp/1509172343120028/img/p_02.jpg');
					break;
				case 71: // 欧洲馆
					list.push('http://m.allpyra.com/lp/1509172342540027/img/p_01.jpg');
					list.push('http://m.allpyra.com/lp/1509172342540027/img/p_02.jpg');
					break;
				case 81: // 大洋洲馆
					list.push('http://m.allpyra.com/lp/1509172343370029/img/P_01.jpg');
					list.push('http://m.allpyra.com/lp/1509172343370029/img/P_02.jpg');
					break;
			}

			if (list.length) {
				$list.html('');
				$(list).each(function(m, n) {
					$list.append('<img src="' + n + '" />')
				});
			}
		},
		flush: function(page) {

			this.page = page || 1;

			this.getData();

		},
		pagerGo: function(page) {
			hashManager.setHash('pg-' + page);
		},
		getData: function() {

			var params;

			params = {
				op: 20,
				pageNo: this.page,
				pageSize: 10,
				scope: 5,
				chanid: this.chanid
			}

			$.get(this.cgi.action, params, this.proxy(this.getDataBack));

			this.loading.show();
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;
				if (o) {
					this.renderList(o.list);
					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageParams.pageSize);
						this.isTotal = true;
					}
				} else {
					this.loading.html('服务器异常');
				}
			} else {
				this.loading.html('获取数据失败');
			}

			if (!this.isFirst) {
				this.isFirst = true;
			}else{
				$(window).scrollTop(this.elProductList.offset().top);
			}
		},
		renderList: function(list) {
			var $list = this.elProductList,
				tmpl = this.tmpl,
				tpl = this.tpl,
				coverPrice = this.coverPrice;

			if (list && list.length) {

				$list.html('');

				$(list).each(function(m, n) {
					$list.append(tmpl(tpl.item, $.extend(n, {
						price: coverPrice(n.price),
						discount: parseFloat(n.price / n.referance_price * 10).toFixed(1),
						depotName: n.depotName || ''
					})));
				});

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
			categoryHomeAction.flush(pageNo);
		}
	});

	hashManager = new HashManager();

	categoryHomeAction = new directMailItem({
		el: '.j-directmail-home'
	});

})(window.Zepto);