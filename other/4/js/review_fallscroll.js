/*==================================
    zhanghua
    2013-4-11
    用于瀑布流页面的js
======================================*/
window.FallScrollObj={
    ini:function($fallScrollWarp,_masonryBlock){
        var that = this;
        that.fallScrollMasonry($fallScrollWarp,_masonryBlock);
        that.infinitescrollFun($fallScrollWarp,_masonryBlock);
    },
    fallScrollMasonry:function($fallScrollWarp,_masonryBlock){
       $fallScrollWarp.masonry({ 
            itemSelector: _masonryBlock,
            gutter: 20,
            animate: true,
            isFitWidth:true,
            singleMode: true
        });
    },
    infinitescrollFun:function($fallScrollWarp,_masonryBlock){//瀑布流滚动加载

        var _sp = 1,$pageNav = $("#page-nav"),$page = $("#myshowPage");
        var _allPageNum = $pageNav.attr("allPage");
        var $container = $fallScrollWarp; 

        if(_allPageNum==1){
            $pageNav.remove();
            $page.show();
            return false;
        }

        $container.infinitescroll({
            navSelector     : "#page-nav",
            nextSelector    : "#page-nav a",
            itemSelector    : _masonryBlock,
            loading: {
                finishedMsg: jsLg.scrollFallPage_1,
                img: JS_IMG_URL+'images/domeimg/6RMhx.gif',

                errorCallback: function(){

                },//当出错的时候，比如404页面的时候执行的函数
                finished:function(){
                    _sp++;
                    $("#infscr-loading").hide();

                    if(_sp>=_allPageNum){
                        $pageNav.remove();
                        $page.show();
                        $(window).unbind('.infscr');
                    }
                }
            }
        }, function( newElements ) {
            //程序执行完的回调函数
            var $newElems = $( newElements).css({opcity:0});

            $newElems.animate({ opacity: 1 });
            $container.masonry( 'appended', $newElems );

            if(newElements.length<10){
                $pageNav.remove();
                $page.show();
                $(window).unbind('.infscr');
            }
        });
    }
}
