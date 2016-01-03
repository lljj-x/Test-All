/**
 * Created by LIU.JUN on 2015/12/29.
 */

(function ($) {
    "use strict";

    var Lottery = Base.klass.create({
        elements : {
           '#j_controlBtn' : 'elBtn',
            "#j_num_1" : 'elNum1',
            "#j_num_2" : 'elNum2',
            "#j_num_3" : 'elNum3',
            '#j_resultWrap' : 'elResultWrap'
        },
        events : {
            'click #j_controlBtn' : 'lotteryEvent',
            'click #j-clearList' : 'clearListEvent',
            'click #j_layerBg' : 'closeLayerEvent'
        },
        debug : true,
        params : {
            animateSpeed:100,   // 移动一格 ms,
            singleHeight : 145,    // 单个高度
            data : null,
            winningCookieId : 'winningId',
            isPlaying : false,
            playFlag : 'active'
        },
        consoleLog : function (v) {
            if(this.debug){
                console.log(v);
            }
        },
        init : function () {
            this.params.data = this._parseData();
            //
            this.consoleLog(this.params.data);

            this.flush();
        },
        _parseData : function () {
            var userArr,
                userLength,
                reData = [],
                o;
            if(USERDATA){
                userArr = String(USERDATA).split(';');
                userLength = userArr.length;
                if(userLength > 0){
                    for(var i =0 ;i<userLength;i++){
                        o = String(userArr[i]).split(',');
                        reData.push({
                            id : o[0],
                            name : o[1],
                            department : o[2]
                        })
                    }
                }
            }
            return reData;
        },

        flush : function () {

        },
        lotteryEvent : function (e) {
            e.preventDefault();
            if(this.params.isPlaying) return false;
            this.elBtn.hasClass(this.params.playFlag) ? this.endLottery() : this.startLottery();
        },
        clearListEvent : function () {
            this.clearWinningedUser();
            alert("清楚中奖纪录成功");
        },
        closeLayerEvent: function () {
            this.elResultWrap.fadeOut();
        },
        getWinningedUser : function () {
            return Base.cookie.getCookie(this.params.winningCookieId);
        },

        addWinningedUser : function (id) {
            Base.cookie.setCookie({
                name: this.params.winningCookieId,
                value : (this.getWinningedUser() + ',' + id).replace(/^,*/,'')
            });
        },

        clearWinningedUser : function () {
            Base.cookie.setCookie({
                name : this.params.winningCookieId,
                value : ''
            });
        },

        getRandomUser: function (length) {
            var data = this.params.data,
                winningedUser = this.getWinningedUser(),
                randomNum;

            length = length || data.length;

            // 所有人中过奖了
            if(winningedUser.split(',').length >= length) return false;

            function getRandomNum(){
                // 未作所有人都中过奖的限定
                var randomNum = Math.floor(Math.random() * length);

                // 通过 id 检查是否中过奖
                this.consoleLog(randomNum + '是中过奖' + (winningedUser.indexOf(data[randomNum].id) > -1));

                randomNum = (winningedUser.indexOf(data[randomNum].id) > -1) ? getRandomNum.call(this,length) : randomNum ;
                return randomNum;
            }

            // cache 中奖号码
            this.randomNum = randomNum = getRandomNum.call(this);

            return data[randomNum];
        },
        _animate: function ($el,options) {
            options = $.extend({
                isFree: true,      //滚动不停止
                singleSpeed: this.params.animateSpeed,
                easing: 'linear',
                singleHeight : this.params.singleHeight,
                numberLength : 10,
                delay : 0,   // 延迟开始时间
                endCall: $.noop
            },options);

            var top = 0 - options.singleHeight * (options.numberLength),
                speed = +(options.singleSpeed) * options.numberLength;

            function toGo(){
                $el.delay(options.delay).animate({
                    top : top + "px"
                },speed,options.easing, function () {
                    if(options.isFree){
                        $el.css({top : 0});
                        options.delay = 0;
                        toGo();
                    }else{
                        options.endCall();
                    }
                });
            }

            function end(endCall){
                options.isFree = false;
                typeof endCall === 'function' && (options.endCall = endCall);
            }

            // 开始动画
            toGo();

            return {
                start:toGo,
                end:end
            }
        },
        startAnimate: function () {
            this.animateNum1 = this._animate(this.elNum1);
            this.animateNum2 = this._animate(this.elNum2,{
                delay : 200
            });
            this.animateNum3 = this._animate(this.elNum3,{
                delay : 400
            });
        },
        fixRandomNum : function (x) {
            return (x < 10) ? '00' + x : (x < 100) ? '0' + x : x;
        },
        endAnimate : function () {
            var num = this.fixRandomNum(this.randomNum),
                self = this,
                length = 3,
                timer = null,
                limitTimer = 700,
                resuleTime = 1000;

            self.params.isPlaying = true; //抽奖中

            function control(){
                clearTimeout(timer);

                timer = setTimeout(function () {
                    self['animateNum' + length].end(function () {
                        self['elNum' + length].css({top : 0});

                        self._animate(self['elNum' + length],{
                            isFree: false,
                            //singleSpeed  : 2000,
                            numberLength : +String(num).charAt(length - 1),
                            endCall: function () {
                                length --;
                                if(length != 0 ){
                                    control();
                                }else{
                                    setTimeout(function () {
                                        self._showResult();
                                        self.params.isPlaying = false;
                                    },resuleTime);
                                }
                            }
                        });
                    })
                },limitTimer);
            }

            control();
        },
        _showResult : function () {
            this.elResultWrap.find(".j_id").text(this.winUser.id);
            this.elResultWrap.find(".j_department").text(this.winUser.department);
            this.elResultWrap.find(".j_name").text(this.winUser.name);
            this.elResultWrap.fadeIn();
        },
        startLottery : function () {
            this.elBtn.addClass(this.params.playFlag);
            this.startAnimate();
        },
        endLottery : function () {
            var winUser;

            this.elBtn.removeClass(this.params.playFlag);

            this.winUser = winUser= this.getRandomUser();

            if(winUser != false){
                // 添加中奖纪录
                this.consoleLog('当前中奖用户:');
                this.consoleLog(winUser);
                this.addWinningedUser(winUser.id);

                this.endAnimate();
            }else{
                alert("所有人都中过奖了");
            }
        }
    });

    $(function () {
        new Lottery();
    });
})(jQuery);