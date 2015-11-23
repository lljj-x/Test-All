/**
 * userinfoedit.js
 */
(function($) {

	var isWeixin = Base.Browser.type === 'weixin';

	if(isWeixin){
		$('.j-nickName-wrap').addClass('hide');
	}

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
		},
		isEmail: function(str) {
			return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
		},
		isMobile: function(str) {
			return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
		},
		isHKMobile: function(str) {
			return /^[0-9]{8}$/.test(str);
		},
		isCode: function(str) {
			return /^[0-9]{6}$/.test(str);
		},
		isDate: function(str){
			// 匹配 YYYY-MM-DD 或 YYYY/MM/DD
			return /^(\d{4})(\-|\/)(\d{2})(\-|\/)(\d{2})$/.test(str);
		}
	};




	var Userinfoedit = Base.klass.create({
		elements: {
			'.j-user-avater': 'elUserAvater',
			'.j-changeimg-ipt': 'elChangeImgIpt',
			'.j-nickName': 'elNickName',
			'.j-sex': 'elSex',
			'.j-birthday': 'elBirthday',
			'.j-constellatory': 'elConstellatory',
			'.j-constellatory-txt': 'elConstellatoryTxt',
			'.j-email': 'elEmail',
			'.j-phone': 'elPhone'
		},
		events: {
			'click .j-changeimg-btn': 'addNewImg',
			'change .j-changeimg-ipt' : 'changeImg',
			'change .j-birthday': 'chkBirthday',
			'change .j-email': 'chkEmail',
			'change .j-phone': 'chkPhone',
			'click .j-confirm': 'confirm'
		},
		cgi:{
			getuserinfo:'/api/user/queryUser.jsp',
			updateuserinfo:'/api/user/updateUser.jsp',
			changeavater:'/api/user/changeheadimg.jsp'
		},
		pageParams:{
			op:1
		},
		init:function(){
			this.getUserInfo();
		},
		getUserInfo:function(){
			
			this.pageParams._ = new Date - 0;
			
			$.get(this.cgi.getuserinfo, this.pageParams, this.proxy(this.getUserInfoBack));
		},
		getUserInfoBack:function(result){
			var list;

			if (result && result.errCode === 0) {
				this.render(result.obj);
			} else {
				// 获取数据失败！
			}
		},
		render:function(o){
			var headImgUrl = $.trim(o.headImgUrl);
			headImgUrl = headImgUrl || '/img/app2/userDefaultAvater.jpg';
			this.elUserAvater.attr('src',headImgUrl);
			this.elNickName.val(o.nickName);
			this.elSex.val(o.sex);
			this.elBirthday.val(o.birthday);
			this.elConstellatory.val(o.constellatory);
			this.elConstellatoryTxt.text(o.constellatory);
			this.elEmail.val(o.email);
			this.elPhone.val(o.phone);
		},
		confirm: function() {
			var self = this,
				can = true,
				$form;

			if (this.isSubmit) return;


			
			can = can && this.chkBirthday();
		
			can = can && this.chkEmail();
		
			can = can && this.chkPhone();
			


			if (can) {
				$form = this.el.find('form.txtInfo');

				$.ajax({
					type: 'POST',
					url: $form.attr('action'),
					dataType: "json",
					data: $form.serialize(),
					success: this.proxy(this.confirmBack),
					error: function() {
						self.isSubmit = false;
					}
				});

				this.isSubmit = true;
			}
		},
		confirmBack: function(result) {

			if (result && result.errCode === 0 && result.obj && result.obj.updated) {
				tip.show('更新个人信息成功');
				this.getUserInfo();		
			} else {
				var errMsg = result.errMsg || '更新个人信息失败';
				tip.show(errMsg);
			}

			this.isSubmit = false;
		},
		setConstellatory:function(){
			var bDate = this.elBirthday.val();
			var bDateArr = bDate.split('-');
			if(bDateArr.length !== 3) return;
			var bMonth = bDateArr[1];
			var bDay = bDateArr[2];
			var con = this.getConstellatory(bMonth, bDay);
			this.elConstellatory.val(con);
			this.elConstellatoryTxt.text(con);
		},
		getConstellatory:function (v_month, v_day) {
		    v_month = parseInt(v_month, 10);
		    v_day = parseInt(v_day, 10);
		    if ((v_month == 12 && v_day >= 22) || (v_month == 1 && v_day <= 20)) {
		        return "摩羯座";
		    } else if ((v_month == 1 && v_day >= 21) || (v_month == 2 && v_day <= 19)) {
		        return "水瓶座";
		    } else if ((v_month == 2 && v_day >= 20) || (v_month == 3 && v_day <= 20)) {
		        return "双鱼座";
		    } else if ((v_month == 3 && v_day >= 21) || (v_month == 4 && v_day <= 20)) {
		        return "白羊座";
		    } else if ((v_month == 4 && v_day >= 21) || (v_month == 5 && v_day <= 21)) {
		        return "金牛座";
		    } else if ((v_month == 5 && v_day >= 22) || (v_month == 6 && v_day <= 21)) {
		        return "双子座";
		    } else if ((v_month == 6 && v_day >= 22) || (v_month == 7 && v_day <= 22)) {
		        return "巨蟹座";
		    } else if ((v_month == 7 && v_day >= 23) || (v_month == 8 && v_day <= 23)) {
		        return "狮子座";
		    } else if ((v_month == 8 && v_day >= 24) || (v_month == 9 && v_day <= 23)) {
		        return "处女座";
		    } else if ((v_month == 9 && v_day >= 24) || (v_month == 10 && v_day <= 23)) {
		        return "天秤座";
		    } else if ((v_month == 10 && v_day >= 24) || (v_month == 11 && v_day <= 22)) {
		        return "天蝎座";
		    } else if ((v_month == 11 && v_day >= 23) || (v_month == 12 && v_day <= 21)) {
		        return "射手座";
		    }
		    return "";
		},
		chkBirthday: function() {
			var $e = this.elBirthday,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				// err = '请输入生日日期';
			} else if (!Tools.isDate(val)) {
				err = '请输入正确日期格式，如1990-01-01';
			}
			if (err) {
				this.showErr(err);
				return false;
			} else {
				this.setConstellatory();
				return true;
			}
		},
		chkEmail: function() {
			var $e = this.elEmail,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				// err = '请输入邮箱';
			} else if (!Tools.isEmail(val)) {
				err = '请输入正确邮箱格式。';
			}
			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
		},
		chkPhone: function() {
			var $e = this.elPhone,
				val = Tools.trim($e.val()),
				err;

			$e.val(val);

			if (Tools.isEmpty(val)) {
				// err = '请输入手机号';
			} else if (!Tools.isMobile(val)) {
				err = '请输入正确手机号格式。';
			}
			if (err) {
				this.showErr(err);
				return false;
			} else {
				return true;
			}
		},
		showErr: function(s) {
			tip.show(s);
		},
		addNewImg:function(){
			this.elChangeImgIpt.trigger('click');
		},
		renderHeadImg:function(src){
			var headImgUrl = $.trim(src);
			headImgUrl = headImgUrl || '/img/app2/userDefaultAvater.jpg';
			this.elUserAvater.attr('src',headImgUrl);
		},
		changeImg:function(){
			var self = this;
			if (self.isSubmit) return;
			if(typeof FileReader == "undefined"){
				tip.show("你的浏览器不支持上传图片，请下载新版浏览器");
				return;
			}
			
			
			var file = self.elChangeImgIpt[0].files[0];

		    // Ensure it's an image
		    if(file.type.match(/image.*/)) {
		        // tip.show("请选择图片格式文件");

		        // Load the image
		        var reader = new FileReader();
		        reader.onload = function (readerEvent) {
		            var image = new Image();
		            image.onload = function (imageEvent) {

		                // Resize the image
		                var canvas = document.createElement('canvas'),
		                    max_size = 100,// TODO : pull max size from a site config
		                    width = image.width,
		                    height = image.height;
		                if (width > height) {
		                    if (width > max_size) {
		                        height *= max_size / width;
		                        width = max_size;
		                    }
		                } else {
		                    if (height > max_size) {
		                        width *= max_size / height;
		                        height = max_size;
		                    }
		                }
		                canvas.width = width;
		                canvas.height = height;
		                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
		                var dataUrl = canvas.toDataURL('image/jpeg');
		                var idx = dataUrl.indexOf(',');
		                dataUrl = dataUrl.substring(idx+1); 
		                self.isSubmit = true;
				        $.ajax({
				        	type: 'POST',
				            url: self.cgi.changeavater,
				            data: {img:dataUrl},
				            // dataType: "json",
				            success: function(result){
				            	if (result && result.errCode === 0) {
									tip.show('更新头像成功');
									var src = (result.obj && result.obj.headImgUrl) ? result.obj.headImgUrl : '';
									self.renderHeadImg(src);
								} else {
									var errMsg = result.errMsg || '更新头像失败';
									tip.show(errMsg);
								}
								self.isSubmit = false;
				            },
				            error: function() {
								self.isSubmit = false;
							}
				        });
		            };
		            image.src = readerEvent.target.result;
		        };
		        reader.readAsDataURL(file);
		    }else{
		    	tip.show("请选择图片格式文件"); 
		    }
		}
	});

	tip = new Base.Widget.Tip();

	new Userinfoedit({
		el: '.j-userinfoedit-container'
	});

	// Base.url.coverFrom();

})(window.Zepto);