/**
 * pager.js
 */
(function() {

	var Pager = Base.klass.create({
		elements: {
			'.j-current-page': 'elCurrentPage',
			'.j-total-page': 'elTotalPage'
		},
		events: {
			'click .j-prev': 'goPrev',
			'click .j-next': 'goNext'
		},
		init: function() {
			this.currentPage = 1;
			this.totalPage = null;
		},
		total: function(count, size) {
			this.totalPage = Math.ceil(parseFloat(count) / parseFloat(size)) || 1;
			this.render();
		},
		goPrev: function() {
			if (this.currentPage > 1) {
				this.currentPage--;
				this.go();
			}
			return false;
		},
		goNext: function() {
			if (this.currentPage < this.totalPage) {
				this.currentPage++;
				this.go();
			}
			return false;
		},
		go: function(page) {
			this.currentPage = page || this.currentPage;
			this.trigger('go', this.currentPage);
			this.render();
		},
		render: function() {
			this.elCurrentPage.text(this.currentPage);
			this.elTotalPage.text(this.totalPage);
		},
		setCurrent: function(page) {
			this.currentPage = page || 1;
		}
	});

	Base.Widget.Pager = Pager;

})();