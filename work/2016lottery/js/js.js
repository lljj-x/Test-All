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
            "#j_num_3" : 'elNum3'
        },
        events : {
            'click #j_controlBtn' : 'lotteryEvent',
            'click #j-clearList' : 'clearListEvent'
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
            this.elBtn.hasClass(this.params.playFlag) ? this.endLottery() : this.strartLottery();
        },
        clearListEvent : function () {
            this.clearWinningedUser();
            alert("清楚中奖纪录成功");
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

            function getRandomNum(){
                // 未作所有人都中过奖的限定
                var randomNum = Math.floor(Math.random() * length);

                // 通过 id 检查是否中过奖
                this.consoleLog(randomNum + '是中过奖' + (winningedUser.indexOf(data[randomNum].id) > -1));

                randomNum = (winningedUser.indexOf(data[randomNum].id) > -1) ? getRandomNum.call(this,length) : randomNum ;
                return randomNum;
            }

            randomNum = getRandomNum.call(this);

            return data[randomNum];
        },
        _aniamte: function ($el,options) {
            options = $.extend({
                isFree: true,      //随机滚动不停止
                singleSpeed: this.params.animateSpeed,
                easing: 'linear',
                singleHeight : this.params.singleHeight,
                numberLength : 10,
                delay : 0   // 延迟开始时间
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
                    }
                });
            }

            toGo();
        },
        startAniamte: function () {
            this._aniamte(this.elNum1);
            this._aniamte(this.elNum2,{
                delay : 200
            });
            this._aniamte(this.elNum3,{
                delay : 400
            });
        },
        endAnimate : function () {

        },
        strartLottery : function () {
            this.elBtn.addClass(this.params.playFlag);
            this.startAniamte();
        },
        endLottery : function () {
            this.elBtn.removeClass(this.params.playFlag);

            var winUser = this.getRandomUser();

            // 不考虑所有人都中过奖的情况
            if(winUser){
                // 添加中奖纪录
                this.consoleLog('当前中奖用户:');
                this.consoleLog(winUser);
                this.consoleLog('\n');

                this.addWinningedUser(winUser.id);

                // 提示中奖消息

            }
        }
    });

    $(function () {
        new Lottery();
    });
})(jQuery);