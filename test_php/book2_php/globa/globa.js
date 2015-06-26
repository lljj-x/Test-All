/**
 * Created by LiuJun on 15-1-13 上午11:14.
 */

(function(window,document,$){
    $.inTitle = function(strTitle){
        $("title").text(strTitle + $("title").text());
    }
}(window,document,jQuery));
