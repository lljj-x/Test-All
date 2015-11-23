/**
 * modpwd.js
 */
(function($) {

	var tip;

	var Tools = {
		trim: function(str) {
			return String(str).replace(/^\s*|\s*$/g, '');
		},
		isEmpty: function(str) {
			return this.trim(str) === '';
		},
		isPassword: function(str) {
			return /^[a-zA-Z0-9]{6,16}$/.test(str);
		}
	};

	var ModPwd = Base.klass.create({
		elements: {
			'.j-oldpwd': 'elOldpwd',
			'.j-pwd': 'elPwd',
			'.j-repwd': 'elRepwd'
		},
		events: {
			'change .j-oldpwd': 'chkOldpwd',
			'change .j-pwd': 'chkPwd',
			'change .j-repwd': 'chkRepwd',

			'click .j-confirm': 'confirm'
		},
		cgi: {
			submit: '/api/user/updatePassword.jsp'
		},
		confirm: function() {
			var self = this,
				can = true,
				params,
				$form;

			if (this.isSubmit) return;

			can = this.chkOldpwd() && can;

			can = this.chkPwd() && can;

			can = this.chkRepwd() && can;

			if (can) {

				params = {
					oldPassword: this.elOldpwd.val(),
					newPassword: this.elPwd.val()
				}

				$.ajax({
					type: 'POST',
					url: this.cgi.submit,
					dataType: "json",
					data: params,
					success: this.proxy(this.confirmBack),
					error: function() {
						self.isSubmit = false;
					}
				});

				this.isSubmit = true;
			}
		},
		confirmBack: function(result) {
			if (result) {
				switch (+result.errCode) {

					// 修改密码成功
					case 0:
						tip.show('修改密码成功！请牢记您新的登录密码。');
						setTimeout(function() {
							window.location.href = 'user.html';
						}, 3000);
						break;

					default:
						tip.show(result.errMsg);
						break;
				}
			}

			this.isSubmit = false;
		},
		chkOldpwd: function() {
			var $e = this.elOldpwd,
				$item = $e.closest('li'),
				val = $e.val(),
				err;

			val = $.trim(val);

			if (Tools.isEmpty(val)) {
				err = '请输入旧密码';
			} else if (!Tools.isPassword(val)) {
				err = '旧密码输入错误';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				$e.val(val);
				this.hideErr($item);
				return true;
			}
		},
		chkPwd: function() {
			var $e = this.elPwd,
				$item = $e.closest('li'),
				val = $e.val(),
				err;

			val = $.trim(val);

			if (Tools.isEmpty(val)) {
				err = '请输入新密码';
			} else if (!Tools.isPassword(val)) {
				err = '密码只能包含英文、数字，长度为6-16位';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				$e.val(val);
				this.hideErr($item);
				return true;
			}
		},
		chkRepwd: function() {
			var $e = this.elRepwd,
				$pwd = this.elPwd,
				$item = $e.closest('li'),
				val = $e.val(),
				err;

			val = $.trim(val);

			if (Tools.isEmpty(val)) {
				err = '请输入新密码';
			} else if (val !== $pwd.val()) {
				err = '两次输入密码不一致';
			}

			if (err) {
				this.showErr($item, err);
				return false;
			} else {
				$e.val(val);
				this.hideErr($item);
				return true;
			}
		},
		showErr: function($item, err) {
			var $tip = $item.find('.j-tip');

			$item.show().addClass('error');
			$tip.addClass('error').html(err);
		},
		hideErr: function($item) {
			var $tip = $item.find('.j-tip');

			$item.removeClass('error');
			$tip.removeClass('error').html($tip.attr('data-tip') || '');
		}
	});

	tip = new Base.Widget.Tip();

	new ModPwd({
		el: '.j-modpwd-container'
	});

	Base.url.coverFrom();

})(window.Zepto);