/**
 * addresslist.js
 */
(function($) {

	var AddressList = Base.klass.create({
		elements: {
			'.j-list': 'elList'
		},
		events: {
			'click .j-act-del': 'clickDel'
		},
		tpl: {
			address: '<div class="item j-item" data-id="<%=aid%>">\
						<p>收货人：<%=receiver%> <span><%=receiverPhone%></span></p>\
						<p class="address">收货地址：<%=province%><%=city%><%=district%> <%=receiverAddress%></p>\
						<div class="oper">\
							<a href="addressedit.html?id=<%=aid%>" class="edit j-act-edit"></a>\
							<!--<a href="#" class="del j-act-del">删除</a>-->\
						</div>\
					</div>'
		},
		cgi: {
			address: '/api/addr/getAddrList.jsp',
			// address: 'json/addresslist.json',
			del: '/api/addr/removeOneAddr.jsp'
				// del: 'del.json'
		},
		init: function() {
			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.getData();
		},
		clickDel: function(e) {
			var $e = $(e.currentTarget),
				$item = $e.closest('.j-item'),
				id = $item.attr('data-id');

			if (window.confirm('确定要删除吗？')) {
				this.del(id);
			}

			return false;
		},
		getData: function() {
			var params = {
				_: new Date - 0
			};

			$.get(this.cgi.address, params, this.proxy(this.getDataBack));

			this.loading.show();
		},
		getDataBack: function(result) {
			var tmpl = this.tmpl,
				tpl = this.tpl,
				$list = this.elList,
				list;

			if (result && (list = result.obj).length) {
				$(list).each(function(m, n) {
					$list.append(tmpl(tpl.address, $.extend(n, {
						receiverIdcard: function(idcard) {
							return idcard ? idcard.replace(/\d/g, function(j, k, x) {
								return k > 3 && k < x.length - 4 ? '*' : j;
							}) : '暂无';
						}(n.receiverIdcard)
					})));
				});
				this.loading.hide();
			} else {
				this.loading.html('暂无收货地址哦，<a href="address.html">立即添加</a>');
			}
		},
		del: function(id) {
			var params;

			if (!id) return;

			params = {
				aid: id
			};

			$.post(this.cgi.del, params, this.proxy(this.delBack, this, id));
		},
		delBack: function(id, result) {
			if (result && +result.errCode === 0) {
				this.elList.find('.j-item[data-id="' + id + '"]').remove();
			} else {
				alert('删除地址失败。');
			}
		}
	});

	new AddressList({
		el: '.j-address-list'
	});

	Base.url.coverFrom();

})(window.Zepto);