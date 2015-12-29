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
            'click #j-btn' : 'lotteryEvent'
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
                            index : i + 1,
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

        getWinningUser : function () {
            return Base.cookie.getCookie(this.params.winningCookieId);
        },

        addWinningUser : function (id) {

        },
        clearWinningUser : function () {

        },
        
        getRandomNumber: function (length) {
            length = length || this.params.data.length;

            var winningUser = this.getWinningUser(),
                random = Math.ceil(Math.random() * length);



            return random ;
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
            var winNum = this.getRandomNumber();

            this.elBtn.removeClass(this.params.playFlag);

            if(winNum){


            }else{
                alert("所有人都中过奖了！xxx");
            }


        }

    });


    $(function () {
        new Lottery();
    });

})(jQuery);