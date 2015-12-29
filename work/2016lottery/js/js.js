/**
 * Created by LIU.JUN on 2015/12/29.
 */

(function ($) {
    "use strict";
    var lottery;

    var Lottery = Base.klass.create({
        elements : {
           '#j-btn' : 'elBtn'
        },
        events : {
            'click #j-btn' : 'lotteryEvent',
            'click #j-clearList' : 'clearListEvent'
        },
        debug : true,
        params : {
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
        _aniamte: function () {

        },
        startAniamte: function () {

        },
        endAnimate : function () {

        },
        strartLottery : function () {
            this.elBtn.addClass(this.params.playFlag);
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