/**
 * 团购详情
 */
(function($) {

	var tip;

	var Groupon = Base.klass.create({
		elements: {
			'.j-tip-container': 'elTipContainer',
			'.j-tip-img': 'elTipImg',
			'.j-tip-content': 'elTipContent',

			'.j-product-link': 'elProductLink',
			'.j-product-img': 'elProductImg',
			'.j-product-title': 'elProductTitle',
			'.j-product-num': 'elProductNum',
			'.j-product-price': 'elProductPrice',

			'.j-status-progress': 'elStatusProgress',
			'.j-status-success': 'elStatusSuccess',
			'.j-status-failed': 'elStatusFailed',

			'.j-text-countdown': 'elCountdown',
			'.j-text-surplus': 'elSurplus',

			'.j-member-list': 'elMemberList',
			'.j-member-default': 'elMemberDefault',

			'.j-step-container': 'elStepContainer',

			'.j-act-invite': 'elActInvite',
			'.j-act-gohome': 'elActGohome',
			'.j-act-join': 'elActJoin',
			'.j-act-vieworder': 'elActVieworder',

			'.j-dialog-container': 'elDialog'
		},
		events: {
			'click .j-act-gohome': 'clickActGohome',
			'click .j-act-join': 'clickActJoin',
			'click .j-act-vieworder': 'clickActVieworder'
		},
		tpl: {
			member: '<div class="item">\
						<div class="user">\
							<img src="<%=headimgurl%>" align="absmiddle">\
							<%=nickName%>\
						</div>\
						<div class="time">\
							<%=joinTime%>\
						</div>\
					</div>'
		},
		cgi: {
			one: '/api/groupbuy/groupbuy.jsp',

			checkout: '/api/order/createPreOrder.jsp'
		},
		clickActGohome: function() {
			window.location.href = 'home.html';
		},
		clickActJoin: function() {
			this.join();
		},
		clickActVieworder: function() {
			if (this.cacheObj.orderId) {
				window.location.href = '/orderdetail.html?orderid=' + this.cacheObj.orderId;
			} else {
				tip.show('缺少订单ID');
			}
		},
		init: function() {
			this.gbid = Base.url.param('gbid');

			if (this.gbid) {

				this.cacheObj = null;

				this.loadlayer = new Base.Widget.Loadlayer({
					owner: 'body'
				});

				this.getOne();

			} else {
				tip.show('缺少团购ID');
			}
		},
		getOne: function() {
			var params;

			params = {
				op: 4,
				gbid: this.gbid
			}

			$.get(this.cgi.one, params, this.proxy(this.getOneBack));

			this.loadlayer.show();
		},
		getOneBack: function(result) {
			var o;

			if (result && +result.errCode === 0) {

				o = this.cacheObj = result.obj.groupBuy;

				this.setStatus(o);

				this.setProduct(o);

				this.setMember(o);

				this.setShareBtn(o);

			} else {
				tip.show(result.errMsg);
			}

			this.loadlayer.hide();
		},
		setStatus: function(o) {
			var status = +o.status,
				isOwner = !!o.isOwner,
				joinStatus = !!o.joinStatus;

			if (status === 1) {
				// 进行中

				// 是否团长
				if (isOwner) {
					this.showOpenSuccessTip();

					this.elActInvite.removeClass('hide');

					this.elMemberDefault.removeClass('hide');
				} else {
					// 是否已经参团
					if (joinStatus) {
						this.showJoinSuccessTip();
						this.elActInvite.removeClass('hide');

						this.elMemberDefault.removeClass('hide');
					} else {
						this.showWaitTip();
						this.elActJoin.removeClass('hide');
						// this.elStepContainer.removeClass('hide');
					}
				}

				this.elStatusProgress.removeClass('hide');

				this.getSystemTime(o.endTime);

				this.elSurplus.text(o.joinLimitNum - o.groupMember.length);

			} else if (status === 2) {

				// 组团成功

				this.showCompleteTip();

				this.elStatusSuccess.removeClass('hide');

				if (isOwner || joinStatus) {
					this.elActVieworder.removeClass('hide');
				} else {
					this.elDialog.removeClass('hide');
				}

			} else if (status === 3 || status === 5 || status === 6) {

				// 组团失败

				this.showFailedTip();

				this.elStatusFailed.removeClass('hide');

				if (isOwner || joinStatus) {
					this.elActGohome.removeClass('hide');
				} else {
					this.elDialog.removeClass('hide');
				}

			} else if(status === 4){

				// 等待支付
				
				this.showCompleteTip();

				this.elStatusSuccess.removeClass('hide');

				this.elDialog.removeClass('hide');
				
			} else {
				tip.show('团购状态异常:' + status);
			}
		},
		getSystemTime: function(endTime) {
			var params;

			params = {
				_: new Date - 0
			}

			$.get('/api/common/getSystemTime.jsp', params, this.proxy(this.getSystemTimeBack, this, endTime));
		},
		getSystemTimeBack: function(endTime, result) {
			var now;

			if (result && +result.errCode === 0) {
				now = result.obj;
			} else {
				now = new Date - 0;
			}

			Base.Widget.Countdown.push({
				time: endTime - now,
				$item: this.elCountdown
			});
		},
		setProduct: function(o) {
			var p = o.groupProduct;

			this.elProductLink.attr('href', 'item.html?gbid=' + this.gbid + '&gbpid=' + o.gbpid);
			this.elProductImg.attr('src', p.logourl);
			this.elProductTitle.text(p.title);
			this.elProductNum.text(p.joinLimitNum + '人团');
			this.elProductPrice.text('￥' + this.coverPrice(p.groupBuyPrice));
		},
		setMember: function(o) {
			var m = o.groupMember,
				tmpl = this.tmpl,
				tpl = this.tpl,
				formatTime = this.formatTime,
				$list = this.elMemberList;

			$(m).each(function(m, n) {
				$list.append(tmpl(tpl.member, $.extend(n, {
					nickName: n.isOwner ? '团长 ' + n.nickName : n.nickName,
					headimgurl: n.headimgurl ? n.headimgurl : '../img/groupon/icon-defaultPortrait@2x.png',
					joinTime: n.isOwner ? formatTime(n.joinTime) + ' 开团' : formatTime(n.joinTime) + ' 参团'
				})));
			});
		},
		setShareBtn: function(o) {
			var p = o.groupProduct;
			var remainder = Number(o.joinLimitNum) - o.groupMember.length;

			var sh_title = '', sh_pic = '', sh_des = '';
			sh_title = '我参加了' + p.title + ' ' + p.subTitle + ' 拼单';
			sh_pic = p.logourl;
			sh_des = '【还差' + remainder + '人】金字塔·美好生活供应商，海外优质商品直供，大家一起拼！';

			this.elActInvite.attr('data-title', sh_title);
			this.elActInvite.attr('data-pic', sh_pic);
			this.elActInvite.attr('data-des', sh_des);
			this.elActInvite.attr('data-link', '');

			// 微信内分享设置
			if (Base.Browser.type === 'weixin') {
				var link = window.location.href;
				new Base.Widget.WXShare({
					config: {
						'title': sh_title,
						'imgUrl': sh_pic,
						'desc': sh_des,
						'link': link
					}
				});
				// 微信分享提示
				if(this.hasWXTips){
					$('.wxtips-mark').on('click', function(){
						$(this).hide();
					}).show();
				}
			}

		},
		showOpenSuccessTip: function() {
			this.elTipContainer.addClass('success');
			this.elTipImg.attr('src', '../img/groupon/icon-groupFilished@2x.png');
			this.elTipContent.html('恭喜您开团成功！<p>快邀请好友一起拼团吧</p>');
		},
		showJoinSuccessTip: function() {
			this.elTipContainer.addClass('success');
			this.elTipImg.attr('src', '../img/groupon/icon-groupFilished@2x.png');
			this.elTipContent.html('恭喜您，参团成功！');
		},
		showWaitTip: function() {
			this.elTipContainer.addClass('success');
			this.elTipImg.attr('src', '../img/groupon/icon-groupFilished@2x.png');
			this.elTipContent.html('TA们正翘首以待，就等您的参与！');
		},
		showCompleteTip: function() {
			this.elTipContainer.addClass('success');
			this.elTipImg.attr('src', '../img/groupon/icon-groupFilished@2x.png');
			this.elTipContent.html('恭喜您，组团成功！');
		},
		showFailedTip: function() {
			this.elTipContainer.addClass('failed');
			this.elTipImg.attr('src', '../img/groupon/icon-groupFailure@2x.png');
			this.elTipContent.html('很遗憾，组团失败！');
		},
		join: function() {
			var pid = this.cacheObj.groupProduct.pid,
				num = 1;

			params = {
				gbid: this.gbid,
				pinfos: pid + ',' + num // 直接购买1件
			};

			$.ajax({
				type: 'POST',
				url: this.cgi.checkout,
				data: params,
				success: this.proxy(this.joinBack),
				error: this.proxy(this.joinError)
			});
		},
		joinBack: function(result) {
			var o;

			if (result) {
				o = result;

				switch (o.errCode) {

					// 未登录
					case 101:
						location.href = '/login.html?sourceurl=' + encodeURIComponent(window.location.href);
						break;

						// 没有收货地址
					case 601:
						location.href = '/address.html?orderid=' + o.obj;
						break;

						// 成功
					case 0:
						location.href = '/checkout/?orderid=' + o.obj;
						break;

					default:
						tip.show(o.errMsg);
						break;
				}
			} else {
				tip.show('后台数据异常。');
			}

			this.loadlayer.hide();
		},
		joinError: function() {
			tip.show('网络连接异常');
			this.loadlayer.hide();
		}
	});

	tip = new Base.Widget.Tip();

	new Groupon();

})(window.Zepto);