define("goods",[],function(){var e=function(){this.init()};return e.prototype={init:function(){this.getData()},getData:function(){console.log("goods getData")},setData:function(){console.log("goods setData")}},e}),define("user",["goods"],function(e){var n=new e;return n.setData(),console.log("User init"),{say:function(){console.log("Hello word !!!")}}}),define("b",["require","a"],function(){return alert("b"),function(e){var n=require("a");return console.log(n.hi),{hi:"b"}}}),define("a",["b"],function(){return alert("a"),{hi:"nihao"}}),function(){require.config({baseUrl:"js/lib",paths:{goods:"../app/Goods",user:"../app/User",other:"../app/other",a:"../app/a",b:"../app/b"}}),require(["user"],function(e){e.say()});var e=document.getElementById("js_clickMe");e.addEventListener("click",function(){require(["a"],function(){})})}(),define("Main",function(){});