/**
 * user coin
 */
(function($) {

	var userCoin;

	var UserCoin = Base.klass.create({
		elements: {
			'.j-text-totalCoin': 'elTotalCoin',
			'.j-list': 'elList'
		},
		tpl: {
			item: '<li>\
						<span class="coin"><%=coin%></span>\
						<%=title%>\
						<p><%=coinTime%></p>\
					</li>'
		},
		cgi: {
			data: '/api/user/coinCenter.jsp'
		},
		init: function() {
			this.isTotal = false;

			this.isFirst = false;

			this.pageSize = 10;

			this.pager = new Base.Widget.Pager({
				el: '.j-pager'
			});
			this.pager.bind('go', this.proxy(this.pagerGo));

			this.loading = new Base.Widget.Loading({
				owner: this.elList
			});

			this.flush();
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
				pageNo: this.page,
				pageSize: this.pageSize
			}

			$.get(this.cgi.data, params, this.proxy(this.getDataBack));

			this.loading.show();
		},
		getDataBack: function(result) {
			var list,
				o;

			if (result && result.errCode === 0) {
				o = result.obj;
				if (o) {
					this.elTotalCoin.text(o.totalCoin);
					this.renderList(o.list);

					if (!this.isTotal) {
						this.pager.total(o.totalNum, this.pageSize);
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
			} else {
				$(window).scrollTop(this.elList.offset().top);
			}
		},
		renderList: function(list) {
			var $list = this.elList,
				tmpl = this.tmpl,
				tpl = this.tpl,
				formatTime = this.formatTime;

			if (list && list.length) {

				$list.html('');

				$(list).each(function(m, n) {
					$list.append(tmpl(tpl.item, $.extend(n, {
						coinTime: formatTime(n.coinTime),
						coin: '+ ' + n.coin
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
			userCoin.flush(pageNo);
		}
	});

	hashManager = new HashManager();

	userCoin = new UserCoin();

})(window.Zepto);