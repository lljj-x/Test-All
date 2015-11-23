var myTest = {
    // jQuery proxy

    /*
        用法 1
        $(selector).proxy(function,context)

        用法 2
        $(selector).proxy(context,name)

     */

    jQProxy : {

        testText : "我是测试的文字，this 指向正确",
        defaultIndex : 1,

        init : function () {
            this.exp1();
            this.exp2();

        },
        exp1 : function () {
            // 测试1
            $("h1").on("click", $.proxy(this.clickEvent,this));
        },
        exp2 : function () {
            // 测试2 ，常用在 setTimeout

            console.log(this.testText);
            this.defaultIndex ++ ;

            setTimeout($.proxy(function () {
                this.exp2();
            },this),500);
        },

        clickEvent: function (event) {
            console.log(this.testText);
            console.log(event.currentTarget.nodeName);
        }
    }
};

(function (window) {
    // call apply


    // fun1
    function Fun1(){

    }

    Fun1.prototype = {
        funText : "我是 fun1 ",
        setName : function () {
            this.name = "fun1 name"
        },
        getName : function () {
            return this.name
        },
        sayText : function () {
            alert(this.funText);
        },
        sayName : function () {
            alert(this.name);
        }

    };


    // fun2
    function Fun2(){

    }

    Fun2.prototype = {
        funText : "我是 fun2 "
    };

    window.Fun1 = Fun1;
    window.Fun2 = Fun2;

})(window);


$(function () {
    //myTest.jQProxy.init();

    var myfun1 = new Fun1();

    var myfun2 = new Fun2();

    //myfun1.sayText();

    //myfun1.sayText.call(myfun2);



    // apply

    var arr = [3,2,3,2,42,3,42,342,34];
    Math.max.call(null,arr);

});

