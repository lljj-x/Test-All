/**
 * address.js
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
		isEmail: function(str) {
			return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(str);
		},
		isMobile: function(str) {
			return /^((13[0-9])|(1[478][0-9])|(15[^4\D]))\d{8}$/.test(str);
		},
		isHKMobile: function(str) {
			return /^[0-9]{8}$/.test(str);
		},
		isTelephone: function(str){
			return /^(0+\d{2,3})?\d{7,8}$/.test(str);
		},
		isID: function() {
			var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
			var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   
			function IdCardValidate(idCard) {
				idCard = trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格                     
				if (idCard.length == 15) {
					return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证    
				} else if (idCard.length == 18) {
					var a_idCard = idCard.split(""); // 得到身份证数组   
					if (a_idCard[17] == 'x') {
						return false;
					}
					if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
			/**  
			 * 判断身份证号码为18位时最后的验证位是否正确
			 * @param a_idCard 身份证号码数组
			 * @return
			 */
			function isTrueValidateCodeBy18IdCard(a_idCard) {
				var sum = 0; // 声明加权求和变量   
				if (a_idCard[17].toLowerCase() == 'x') {
					a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
				}
				for (var i = 0; i < 17; i++) {
					sum += Wi[i] * a_idCard[i]; // 加权求和   
				}
				valCodePosition = sum % 11; // 得到验证码所位置   
				if (a_idCard[17] == ValideCode[valCodePosition]) {
					return true;
				} else {
					return false;
				}
			}
			/**  
			 * 验证18位数身份证号码中的生日是否是有效生日
			 * @param idCard 18位书身份证字符串
			 * @return
			 */
			function isValidityBrithBy18IdCard(idCard18) {
				var year = idCard18.substring(6, 10);
				var month = idCard18.substring(10, 12);
				var day = idCard18.substring(12, 14);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 这里用getFullYear()获取年份，避免千年虫问题   
				if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
					return false;
				} else {
					return true;
				}
			}
			/**  
			 * 验证15位数身份证号码中的生日是否是有效生日
			 * @param idCard15 15位书身份证字符串
			 * @return
			 */
			function isValidityBrithBy15IdCard(idCard15) {
				var year = idCard15.substring(6, 8);
				var month = idCard15.substring(8, 10);
				var day = idCard15.substring(10, 12);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
				if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
					return false;
				} else {
					return true;
				}
			}
			//去掉字符串头尾空格   
			function trim(str) {
				return str.replace(/(^\s*)|(\s*$)/g, "");
			}


			/**  
			 * 通过身份证判断是男是女
			 * @param idCard 15/18位身份证号码
			 * @return 'female'-女、'male'-男
			 */
			function maleOrFemalByIdCard(idCard) {
				idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。   
				if (idCard.length == 15) {
					if (idCard.substring(14, 15) % 2 == 0) {
						return 'female';
					} else {
						return 'male';
					}
				} else if (idCard.length == 18) {
					if (idCard.substring(14, 17) % 2 == 0) {
						return 'female';
					} else {
						return 'male';
					}
				} else {
					return null;
				}
			}

			return IdCardValidate;
		}()
	};

	var Address = Base.klass.create({
		elements: {
			'.j-text-name': 'elName',
			'.j-text-phone': 'elPhone',
			'.j-province-list': 'elProvinceList',
			'.j-city-list': 'elCityList',
			'.j-area-list': 'elAreaList',
			'.j-text-postcode': 'elPostCode',
			'.j-text-address': 'elAddress'
		},
		events: {
			'change .j-province-list': 'changeProvince',
			'change .j-city-list': 'changeCity',
			'change .j-area-list': 'changeArea',
			'click .j-act-submit': 'submit'
		},
		init: function() {
			this.provincesCache = {};
			this.citysCache = {};
			this.areaCache = {};

			this.elProvinceList.trigger('change');
		},
		changeProvince: function(e) {
			var $e = $(e.currentTarget),
				val = $e.val(),
				provincesCache;

			if (provincesCache = this.provincesCache[val]) {
				this.renderCityList(provincesCache);
			} else {
				$.ajax({
					url: 'data/addressdata/' + val + '.json',
					dataType: 'json',
					success: this.proxy(this.renderCityList)
				});
			}
		},
		changeCity: function(e) {
			var $e = $(e.currentTarget),
				val = $e.val();

			this.fillPostCode(this.citysCache[val]['zip']);

			this.renderAreaList(this.citysCache[val]['districts']);
		},
		renderCityList: function(result) {
			var $city,
				id,
				citys,
				citysCache;

			if (result) {

				id = result.id;

				citys = result.citys;

				citysCache = this.citysCache = {};

				$city = this.elCityList;

				$city.html('');

				$(citys).each(function(m, n) {
					$city.append('<option value="' + n.id + '">' + n.name + '</option>');
					citysCache[n.id] = n;
				});

				this.fillPostCode(citys[0]['zip']);

				this.renderAreaList(citys[0]['districts']);

				if (!this.provincesCache[id]) {
					this.provincesCache[id] = result;
				}
			}
		},
		changeArea: function(e) {
			var $e = $(e.currentTarget),
				val = $e.val();

			this.fillPostCode(this.areaCache[val]['zip']);
		},
		renderAreaList: function(list) {
			var $area = this.elAreaList,
				areaCache;

			$area.html('');

			if (list && list.length) {
				$area.closest('li').show();

				areaCache = this.areaCache;

				$(list).each(function(m, n) {
					$area.append('<option value="' + n.id + '">' + n.name + '</option>');
					areaCache[n.id] = n;
				});

				this.fillPostCode(list[0]['zip']);
			} else {
				$area.closest('li').hide();
			}
		},
		fillPostCode: function(postcode) {
			this.elPostCode.val(postcode);
		},
		chkName: function() {
			var $e = this.elName,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入收货人姓名');
				return false;
			}

			return true;
		},
		chkPhone: function() {
			var $e = this.elPhone,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入收货人联系电话');
				return false;
			} else if (!Tools.isMobile(val) && !Tools.isTelephone(val)) {
				this.showErr('联系电话格式错误');
				return false;
			}

			return true;
		},
		chkAddress: function() {
			var $e = this.elAddress,
				val = $e.val();

			if (Tools.isEmpty(val)) {
				this.showErr('请输入详细收货地址');
				return false;
			}

			return true;
		},
		submit: function() {
			var can = true,
				params;

			can = can && this.chkName();

			can = can && this.chkPhone();

			can = can && this.chkAddress();

			if (can) {
				params = {
					receiver: this.elName.val(),
					receiverPhone: this.elPhone.val(),
					provinceId: this.elProvinceList.val(),
					cityId: this.elCityList.val(),
					districtId: this.elAreaList.val(),
					receiverZip: this.elPostCode.val(),
					receiverAddress: this.elAddress.val()
				}

				$.post('/api/addr/addAddr.jsp', params, this.proxy(this.submitBack));
			}
		},
		submitBack: function(result) {
			var orderid;

			if (result) {
				if (+result.errCode === 0) {
					window.location.href = (orderid = Base.url.param('orderid')) ? 'checkout/?orderid=' + orderid : 'addresslist.html';
				} else {
					tip.show(result.errMsg);
				}
			} else {
				tip.show('添加收货信息失败：[后台无返回数据]');
			}
		},
		showErr: function(s) {
			tip.show(s);
		}
	});

	tip = new Base.Widget.Tip();

	new Address();

	Base.url.coverFrom();

})(window.Zepto);