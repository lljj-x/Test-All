/**
 * list.js
 */
(function($) {

	var categorySearchAction, hashManager;

	var CategorySearchAction = Base.klass.create({
		elements: {
			'.j-main-class': 'elMainClass',
			'.j-sub-class': 'elSubClass',
			'.j-category-case':'elCategoryCase',
			'.j-search-input':'elSearchInput',
			'.j-search-case':'elSearchCase'
		},
		events: {
			'click .j-mc-tap': 'changeTap',
			'focus .j-si-txt' : 'jsiOnFocus',
			'blur .j-si-txt' : 'jsiOnBlur',
			'click .j-si-clear' : 'jsiClear',
			'click .j-sh-item' : 'selectHistory',
			'click .j-sh-clear' : 'clearHistory',
			'submit .j-search-form' : 'doSearch'

		},
		tpl: {
			item:'<li class="j-mc-tap <%=isActive%>" data-cid="<%=cid%>">\
				    <div class="ct-item">\
				        <p><img class="ct-icon" src="<%=logourl%>" alt=""><%=cname%></p>\
				    </div>\
				</li>',
			subItem:'<li>\
						<div class="cts-item">\
							<a href="searchResult.html?catid=<%=cid%>&func=<%=funid%>"><%=funname%></a>\
						</div>\
					</li>',
			shItem:'<li><a class="sh-item j-sh-item" href="searchResult.html?sword=<%=shWord%>"><%=shWord%></a></li>'
			},
		cgi: {
			action:'/api/main/queryCategory.jsp'
		},
		pageParams:{},
		init: function() {

			this.hsKey = 'searchHis';

			this.loading = new Base.Widget.Loading({
				owner: this.el
			});

			this.resetCategory();

			this.getData();

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
				
				if (o) {
					this.renderList(o);
				} else {
					this.renderList([]);
				}

			} else {
				this.loading.html('获取数据失败。【' + result.errMsg + '】');
			}
		},
		changeTap:function(e){
			var self = $(e.currentTarget);
			var curCid = self.attr('data-cid');
			if(!self.hasClass('active')){
				this.elMainClass.find('.j-mc-tap').removeClass('active');
				self.addClass('active');
				this.elSubClass.find('.j-sub-list').addClass('hide').each(function() {
					var subList = $(this);
					if(subList.attr('data-cid') == curCid){
						subList.removeClass('hide');
					}
				});

			}
		},
		renderList: function(list) {
			var item,
				listI,
				Cls,
				flist,
				subitem,
				sublistI,
				subCls,
				subClsGroup;

			if (list && list.length) {
				Cls = '';
				subClsGroup = '';
				this.elMainClass.html('');
				this.elSubClass.html('');
				for (var i = 0, len = list.length; i < len; i++) {
					listI = list[i];
					item = this.tmpl(this.tpl.item, {
						cid: listI.cid,
						cname: listI.cname,
						logourl: listI.logourl,
						isActive: i === 0 ? 'active' : ''
					});
					Cls += item;
					flist = listI.flist;
					isHide = i === 0 ? '' : 'hide';
					
					if(flist && flist.length){
						subCls = '';
						for(var j = 0, flen = flist.length; j < flen; j++) {
							sublistI = flist[j];
							subitem = this.tmpl(this.tpl.subItem, {
								funid:sublistI.funid,
		    					funname:sublistI.funname,
		    					logourl:sublistI.logourl,
		    					cid: listI.cid
							});
							subCls += subitem;
						}
						subClsGroup += '<ul class="subList j-sub-list '+isHide+'" data-cid="'+listI.cid+'">'+subCls+'</ul>';
					}
				}
				this.elMainClass.html('<ul>'+Cls+'</ul>');
				this.elSubClass.html(subClsGroup);

				this.loading.hide();
			} else {
				this.loading.html();
			}
		},
		renderHistoryList:function(){
			var shList = this.getHistoryList();
			shList = shList ? shList : '<p class="no-history">暂无搜索历史</p>';
			this.elSearchCase.find('.sh-list').html(shList);
		},
		getHistoryList:function(){
			var hisArr = this.getHistoryCookie();
			var itemGroup = '';
			for(var i=0; i<hisArr.length; i++){
				if(hisArr[i] !== ''){
					itemGroup += this.tmpl(this.tpl.shItem, {
						shWord:hisArr[i],
					});
				}
			}
			if(itemGroup !== '')  itemGroup = '<ul>'+itemGroup+'</ul>';
			return itemGroup;
		},
		jsiOnFocus:function(){
			this.elCategoryCase.addClass('hide');
			this.elSearchCase.removeClass('hide');
			this.renderHistoryList();
		},
		jsiOnBlur:function(){
			var self = this;
			setTimeout(self.resetCategory, 100);
		},
		jsiClear:function(){
			this.elSearchInput.find('.j-si-txt').val('');
		},
		selectHistory:function(e){
			var self = $(e.currentTarget);
			var word = self.text();
			// this.elSearchInput.find('.j-si-txt').val(word);
		},
		clearHistory:function(){
			$.fn.cookie(this.hsKey,'');
			this.renderHistoryList();
		},
		doSearch:function(e){
			e.preventDefault();
			var qryText = this.elSearchInput.find('.j-si-txt').val();
			if(!qryText) return false;
			var url = 'searchResult.html?sword='+qryText;
			if(this.insertHistoryCookie(qryText) === 1){
				window.location = url;
			}
		},
		resetCategory:function(){
			$('.j-category-case').removeClass('hide');
			$('.j-search-case').addClass('hide');
		},
		getHistoryCookie:function(){
			var hisStr = $.fn.cookie(this.hsKey) || '';
			var hisArr = hisStr.split('#');
			return hisArr;
		},
		insertHistoryCookie:function(sword){
			var rslStr = '';
			var hisStr = $.fn.cookie(this.hsKey) || '';
			var hisArr = hisStr.split('#');
			var idx = $.inArray(sword, hisArr);
			if(idx >= 0){
				hisArr.splice(idx,1);
			}
			hisArr.unshift(sword);
			rslStr = hisArr.join('#');
			$.fn.cookie(this.hsKey, rslStr);
			return 1;
		}
	});

	categorySearchAction = new CategorySearchAction({
		el: '.j-category-search'
	});


	// Base.url.coverFrom();

})(window.Zepto);