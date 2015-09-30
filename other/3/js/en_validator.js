Validator = {
	Require : /.+/,
	UserId : /^[a-zA-Z_][a-zA-Z_0-9]{3,19}$/,
	Email : /^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/,
	Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/,
	Mobile : /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/,
	Url : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
	IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/,
	Currency : /^\d+(\.\d+)?$/,
	Number : /^\d+$/,
	Zip : /^[1-9]\d{5}$/,
	QQ : /^[1-9]\d{4,8}$/,
	Integer : /^[-\+]?\d+$/,
	Double : /^[-\+]?\d+(\.\d+)?$/,
	English : /^[A-Za-z]+$/,
	Chinese : /^[\u0391-\uFFE5]+$/,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/,
	IsSafe : function(str){return !this.UnSafe.test(str);},
	SafeString : "this.IsSafe(value)",
	Limit : "this.limit(value.length,getAttribute('min'), getAttribute('max'))",
	LimitB : "this.limit(this.LenB(value), getAttribute('min'), getAttribute('max'))",
	Date : "this.IsDate(value, getAttribute('min'), getAttribute('format'))",
	Repeat : "value == document.getElementsByName(getAttribute('to'))[0].value",
	Range : "getAttribute('min') < value && value < getAttribute('max')",
	Compare : "this.compare(value,getAttribute('operator'),getAttribute('to'))",
	Custom : "this.Exec(value, getAttribute('regexp'))",
	Group : "this.MustChecked(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
	KeyGroup: "this.MustInput(getAttribute('name'), getAttribute('min'), getAttribute('max'))",
	ErrorItem : [document.forms[0]],
	ErrorMessage : [jsLg.customTips_1+"：\t\t\t\t"],

	FocusOne : function(obj){
		with(obj){
			this.ClearState(obj);
			try{
				var span = document.createElement("SPAN");
				span.id = "__ErrorMessagePanel";
				span.style.color = "blue";
				obj.parentNode.appendChild(span);
				span.innerHTML = "<img src=http://cloud4.faout.com/imagecache/S/images/onFocus.gif>"+obj.getAttribute("msg");
			}
			catch(e){}	//alert(e.description);
		}
	},

	ValidateOne : function(obj, mode){
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		with(obj){
			var _dataType = getAttribute("dataType");
			if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined")	return true;
			this.ClearState(obj);
			if(value == "") return true;
			switch(_dataType){
				case "Date" :
				case "Repeat" :
				case "Range" :
				case "Compare" :
				case "Custom" :
				case "Group" : 
				case "KeyGroup":
				case "Limit" :
				case "LimitB" :
				case "SafeString" :
					if(!eval(this[_dataType])) {
						this.AddErrorOne(this, getAttribute("msg"));
					}else{
						try{
							var span = document.createElement("SPAN");
							span.id = "__ErrorMessagePanel";
							span.style.color = "blue";
							this.parentNode.appendChild(span);
							span.innerHTML = "<img src=http://cloud4.faout.com/imagecache/S/images/onCorrect.gif>The correct format.";
						}
						catch(e){}	alert(e.description);
					}
					break;
				default :
					if(!this[_dataType].test(value)){
						this.AddErrorOne(this, getAttribute("msx"));
					}else{
						try{
							var span = document.createElement("SPAN");
							span.id = "__ErrorMessagePanel";
							span.style.color = "blue";
							obj.parentNode.appendChild(span);
							span.innerHTML = "<img src=http://cloud4.faout.com/imagecache/S/images/onCorrect.gif>The correct format.";
						}
						catch(e){}	//alert(e.description);
					}
					break;
			}
		}
		if(this.ErrorMessage.length > 1){
			mode = mode || 1;
			switch(mode){
				case 2 :
					obj.style.color = "red";
				case 1 :
					alert(this.ErrorMessage.join("\n"));
					//obj.focus();
					break;
				case 3 :
					try{
						var span = document.createElement("SPAN");
						span.id = "__ErrorMessagePanel";
						span.style.color = "red";
						obj.parentNode.appendChild(span);
						span.innerHTML = this.ErrorMessage[1].replace(/\d+:/,"<img src=http://cloud4.faout.com/imagecache/S/images/onError.gif>");
					}
					catch(e){}//alert(e.description);
					//obj.focus();
					break;
				default :
					alert(this.ErrorMessage.join("\n"));
					break;
			}
			return false;
		}else{
			return true;
		}
	},

	Validate : function(theForm, mode){
		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = obj;
		for(var i=0;i<count;i++){
			with(obj.elements[i]){
				var _dataType = getAttribute("dataType");
				if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined") 
					continue;
				this.ClearState(obj.elements[i]);
				if(disabled)continue;
				if(getAttribute("require") == "false" && value == "") continue;
				switch(_dataType){
					case "Date" :
					case "Repeat" :
					case "Range" :
					case "Compare" :
					case "Custom" :
					case "Group" : 
					case "KeyGroup":
					case "Limit" :
					case "LimitB" :
					case "SafeString" :
						if(!eval(this[_dataType])) {
							this.AddError(i, getAttribute("msg"));
						}
						break;
					default :
						if(!this[_dataType].test(value)){
							this.AddError(i, getAttribute("msg"));
						}
						break;
					}
				}
			}
			if(this.ErrorMessage.length > 1){
				mode = mode || 1;
				var errCount = this.ErrorItem.length;
				switch(mode){
					case 2 :
						for(var i=1;i<errCount;i++)
							this.ErrorItem[i].style.color = "red";
					case 1 :
						alert(this.ErrorMessage.join("\n"));
						this.ErrorItem[1].focus();
						break;
					case 3 :
						for(var i=1;i<errCount;i++){
							try{
								var span = document.createElement("SPAN");
								span.id = "__ErrorMessagePanel";
								span.style.color = "red";
								this.ErrorItem[i].parentNode.appendChild(span);
								span.innerHTML = this.ErrorMessage[i].replace(/\d+:/,"<img src=http://cloud4.faout.com/imagecache/S/images/onError.gif>");
							}
							catch(e){}//alert(e.description);
						}
						this.ErrorItem[1].focus();
						break;
					default :
						alert(this.ErrorMessage.join("\n"));
						break;
				}
			return false;
			}
		return true;
	},
	limit : function(len,min, max){
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function(str){
		return str.replace(/[^\x00-\xff]/g,"**").length;
	},
	ClearState : function(elem){
		with(elem){
			if(style.color == "red")
			style.color = "";
			var lastNode = parentNode.childNodes[parentNode.childNodes.length-1];
			if(lastNode.id == "__ErrorMessagePanel"){
				parentNode.removeChild(lastNode);
			}
		}
	},
	ClearStateAll:function(theForm, mode){
		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[0] = obj;
		for(var i=0;i<count;i++){
			with(obj.elements[i]){
				var _dataType = getAttribute("dataType");
				if(typeof(_dataType) == "object" || typeof(this[_dataType]) == "undefined") 
					continue;
				this.ClearState(obj.elements[i]);
			}
		}
	},
	AddError : function(index, str){
		this.ErrorItem[this.ErrorItem.length] = this.ErrorItem[0].elements[index];
		this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
	},
	AddErrorOne : function(obj,str){
		this.ErrorItem[this.ErrorItem.length] = obj;
		this.ErrorMessage[this.ErrorMessage.length] = this.ErrorMessage.length + ":" + str;
	},
	AddOkMsg : function(obj){
		try{
			var span = document.createElement("SPAN");
			span.id = "__ErrorMessagePanel";
			span.style.color = "blue";
			alert(typeof(obj.parentNode));
			obj.parentNode.appendChild(span);
			span.innerHTML = "<img src=http://cloud4.faout.com/imagecache/S/images/onCorrect.gif>The correct format.";
		}
		catch(e){}	//alert(e.description);
	},
	Exec : function(op, reg){
		return new RegExp(reg,"g").test(op);
	},
	compare : function(op1,operator,op2){
		switch (operator) {
			case "NotEqual":
				return (op1 != op2);
			case "GreaterThan":
				return (op1 > op2);
			case "GreaterThanEqual":
				return (op1 >= op2);
			case "LessThan":
				return (op1 < op2);
			case "LessThanEqual":
				return (op1 <= op2);
			default:
				return (op1 == op2); 
		}
	},
	MustChecked : function(name, min, max){
		var groups = document.getElementsByName(name);
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
			if(groups[i].checked) hasChecked++;
		return min <= hasChecked && hasChecked <= max;
	},
	MustInput : function(name,min,max){
		var groups = document.getElementsByName(name);
		var hasInput = 0;
		min = min || 1;
		max = max || groups.length;
		for(var i=groups.length-1;i>=0;i--)
			if(groups[i].value!="") hasInput++;
		return min <= hasInput && hasInput <= max;
	},
	IsDate : function(op, formatString){
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch(formatString){
			case "ymd" :
				m = op.match(new RegExp("^\\s*((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})\\s*$"));
				if(m == null ) return false;
				day = m[6];
				month = m[5]--;
				year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10));
				break;
			case "dmy" :
				m = op.match(new RegExp("^\\s*(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$"));
				if(m == null ) return false;
				day = m[1];
				month = m[3]--;
				year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10));
				break;
			default :
				break;
		}
		var date = new Date(year, month, day);
		return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate());
		function GetFullYear(y){return ((y<30 ? "20" : "19") + y)|0;}
	}
}
