/**
 * Created by Liu.Jun on 2016/10/5.
 */

// let JavaScript新增了块级作用域。
{
    var a = 1;
    let b = 2;
}

var tmp = new Date();
function f() {
    console.log(tmp);
    if (false) {
        var tmp = "hello world";
    }
}

f(); // undefined

// const命令 常量 同样的也是块级作用域内有效果







