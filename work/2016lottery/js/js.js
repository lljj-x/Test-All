(function ($) {
    "use strict";

    var USERDATA = '001,刘星,总经办;001,刘星,总经办;002,高鹏,海外事业部;003,吕孟欣,总经办;004,黄俊,技术部;005,张明哲,商务部;006,李典意,技术部;007,吕元璐,产品运营部;009,吴畏,第三方运营部;010,孟宪宝,供应链部;011,杨洪强,设计部;015,周强,技术部;016,李秋玉,商务部;017,陈娟,设计部;019,陈胜,技术部;020,赵少小,技术部;021,龚洪波,技术部;022,梁铭,第三方运营部;023,胡云,第三方运营部;024,卓邦友,产品运营部;025,罗静,技术部;026,许庆亚,海外事业部;027,钟浩,技术部;028,许其龙,技术部;029,吴佳坤,产品运营部;030,罗傲霜,产品运营部;031,张飞鹏,商务部;032,林佩锋,第三方运营部;034,吴鹏飞,技术部;035,杜果,设计部;036,利全佳,技术部;037,李峰,供应链部;038,申赋育,产品运部营;039,张晴,供应链部;040,李洁,设计部;041,吴珊,第三方运营部;042,黄绵卫,产品运营部;043,李路青,设计部;044,万雪良,产品运营部;045,吴优,设计部;046,陈花,技术部;047,余俊,产品运营部;048,杨志鹏,商务部;049,封美丽,商务部;051,李辉,产品运营部;052,汪凌峰,产品运营部;053,林卉,产品运营部;054,李芳芳,财务部;055,郑军,供应链部;056,杜莎莎,产品运营部;057,孙佳慧,人力行政部;059,李明晶,产品运营部;062,杨威,海外事业部;063,周易里,产品运营部;064,文雯,技术部;065,吴伟欣,商务部;066,邹丽,第三方运营部;067,张喆,第三方运营部;069,曹雅茹,产品运营部;070,罗成,技术部;071,李嘉莹,财务部;073,鲍飞,技术部;074,李令成,第三方运营部;075,谢斌,商务部;076,曾瑶敏,人力行政部;077,仲一成,商务部;079,李妍,产品运营部;080,刘羽,产品运营部;081,梁成进,技术部;082,谢诚诚,设计部;083,黄义秦,设计部;085,刘文俊,产品运营部;087,张飞云,商务部;088,程秀,商务部;089,刘旭东,产品运营部;090,蔡秋金,人力行政部;091,柳俊,技术部;092,屈国洪,供应链部;093,陈之励,运营部;094,陈洁琼,运营部;095,林増,产品运营部;096,黄逸明,运营部;098,邓雨婷,运营部;099,游如凤,商务部;101,曹方芳,产品运营部;102,刘文清,技术部;103,李颖,商务部;105,郭璋,海外事业部;106,周毅,海外事业部;107,汪庆文,技术部;109,徐美霞,产品运营部;110,文健,海外事业部;111,戴树云,人力资源部;112,李行,产品运营部;113,林伟令,第三方运营部;116,刘巧灵,供应链部;117,吕阳,人力资源部;118,杨争方,供应链部;119,杨元,财务部;120,魏仁志,技术部;122,尹利群,设计部;123,王超辉,技术部;124,胡浩,海外事业部;125,徐林楠,设计部;126,方增鸿,技术部';

    var Lottery = Base.klass.create({
        elements: {
            '#j_controlBtn': 'elBtn',
            "#j_num_1": 'elNum1',
            "#j_num_2": 'elNum2',
            "#j_num_3": 'elNum3',
            '#j_resultWrap': 'elResultWrap',
            '#j_gameWrap' : 'elGameWrap'
        },
        events: {
            'click #j_controlBtn': 'lotteryEvent',
            'click #j-clearList': 'clearListEvent',
            'click #j_layerBg': 'closeLayerEvent'
        },
        debug: false,
        params: {
            animateSpeed: 100,   // 移动一格 ms,
            singleHeight: 185,    // 单个高度
            data: null,
            winningCookieId: 'winningId',
            isPlaying: false,
            playFlag: 'active'
        },
        consoleLog: function (v) {
            if (this.debug) {
                console.log(v);
            }
        },
        init: function () {
            this.params.data = this._parseData();

            // data
            this.consoleLog(this.params.data);

            // 特殊事件
            this.specialEvent();

            this.flush();
        },
        _parseData: function () {
            var userArr,
                userLength,
                reData = [],
                o;
            if (USERDATA) {
                userArr = String(USERDATA).split(';');
                userLength = userArr.length;
                if (userLength > 0) {
                    for (var i = 0; i < userLength; i++) {
                        o = String(userArr[i]).split(',');
                        reData.push({
                            id: o[0],
                            name: o[1],
                            department: o[2]
                        })
                    }
                }
            }
            return reData;
        },

        flush: function () {

        },
        specialEvent : function () {
            var $elWel = $("#j_wel2016"),
                self = this,
                duration = 1000;
            $elWel.one("click", function () {
                $elWel.animate({
                    bottom : 0,
                    right : 0,
                    width : '15%'
                },duration);
                self.elGameWrap.fadeIn(2000);
            });

        },
        lotteryEvent: function (e) {
            e.preventDefault();
            if (this.params.isPlaying) return false;
            this.elBtn.hasClass(this.params.playFlag) ? this.endLottery() : this.startLottery();
        },
        clearListEvent: function () {
            this.clearWinningedUser();
            alert("清除中奖纪录成功");
        },

        closeLayerEvent: function () {
            this.elResultWrap.fadeOut();
        },
        getWinningedUser: function () {
            return Base.cookie.getCookie(this.params.winningCookieId);
        },

        addWinningedUser: function (id) {
            Base.cookie.setCookie({
                name: this.params.winningCookieId,
                value: (this.getWinningedUser() + ',' + id).replace(/^,*/, '')
            });
        },

        clearWinningedUser: function () {
            Base.cookie.setCookie({
                name: this.params.winningCookieId,
                value: ''
            });
        },

        getRandomUser: function (length) {
            var data = this.params.data,
                winningedUser = this.getWinningedUser(),
                randomNum;

            length = length || data.length;

            // 所有人中过奖了
            if (winningedUser.split(',').length >= length) return false;

            function getRandomNum() {
                var randomNum = Math.floor(Math.random() * length);

                // 通过 id 检查是否中过奖
                this.consoleLog(randomNum + '是中过奖' + (winningedUser.indexOf(data[randomNum].id) > -1));

                randomNum = (winningedUser.indexOf(data[randomNum].id) > -1) ? getRandomNum.call(this, length) : randomNum;
                return randomNum;
            }

            // cache 中奖号码
            randomNum = getRandomNum.call(this);

            return data[randomNum];
        },
        _animate: function ($el, options) {
            options = $.extend({
                isFree: true,      //滚动不停止
                singleSpeed: this.params.animateSpeed,
                easing: 'linear',
                singleHeight: this.params.singleHeight,
                numberLength: 10,
                delay: 0,   // 延迟开始时间
                endCall: $.noop
            }, options);

            var top = 0 - options.singleHeight * (options.numberLength),
                speed = +(options.singleSpeed) * options.numberLength;

            function toGo() {
                $el.css({
                    top : 0
                }).delay(options.delay).animate({
                    top: top + "px"
                }, speed, options.easing, function () {
                    if (options.isFree) {
                        $el.css({top: 0});
                        options.delay = 0;
                        toGo();
                    } else {
                        options.endCall();
                    }
                });
            }

            function end(endCall) {
                options.isFree = false;
                typeof endCall === 'function' && (options.endCall = endCall);
            }

            // 开始动画
            toGo();

            return {
                start: toGo,
                end: end
            }
        },
        startAnimate: function () {
            this.animateNum1 = this._animate(this.elNum1, {
                delay: 400
            });

            this.animateNum2 = this._animate(this.elNum2, {
                delay: 200
            });

            this.animateNum3 = this._animate(this.elNum3);
        },
        fixRandomNum: function (x) {
            return (x < 10) ? '00' + x : (x < 100) ? '0' + x : x;
        },
        endAnimate: function () {
            var num = this.fixRandomNum(+this.winUser.id),
                self = this,
                length = 3,
                timer = null,
                limitTimer = 700,
                resuleTime = 1000;

            self.params.isPlaying = true; //抽奖中

            function control() {
                clearTimeout(timer);

                timer = setTimeout(function () {
                    self['animateNum' + length].end(function () {
                        self['elNum' + length].css({top: 0});

                        self._animate(self['elNum' + length], {
                            isFree: false,
                            //singleSpeed  : 2000,
                            numberLength: + String(num).charAt(length - 1),
                            endCall: function () {
                                length--;
                                if (length != 0) {
                                    control();
                                } else {
                                    setTimeout(function () {
                                        self._showResult();
                                        self.params.isPlaying = false;
                                    }, resuleTime);
                                }
                            }
                        });
                    })
                }, limitTimer);
            }

            control();
        },
        _showResult: function () {
            this.elResultWrap.find(".j_id").text('MS0' + this.winUser.id);
            this.elResultWrap.find(".j_department").text(this.winUser.department);
            this.elResultWrap.find(".j_name").text(this.winUser.name);
            this.elResultWrap.fadeIn();
        },
        startLottery: function () {
            this.elBtn.addClass(this.params.playFlag);
            this.startAnimate();
        },
        endLottery: function () {
            var winUser;

            this.elBtn.removeClass(this.params.playFlag);

            this.winUser = winUser = this.getRandomUser();

            if (winUser != false) {
                // 添加中奖纪录
                this.consoleLog('当前中奖用户:');
                this.consoleLog(winUser);
                this.addWinningedUser(winUser.id);

                this.endAnimate();
            } else {
                alert("所有人都中过奖了");
            }
        }
    });

    $(function () {
        new Lottery();
    });
})(jQuery);