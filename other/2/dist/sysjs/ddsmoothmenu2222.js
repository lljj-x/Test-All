$(function(){
    var $mainmenu = $('#myslidemenu>ul');
    //获得有sub menu的li 即folder item
    var $top = $mainmenu.find('ul').parent();
    //遍历所有top menu
    $top.each(function(){
        //鼠标移到的folder节点
        var $folder = $(this);
        var $sub_folder = $folder.find('ul:eq(0)');
        this._dimension = {
            w: this.offsetWidth,
            h: this.offsetHeight,
            subWidth: $sub_folder.outerWidth,
            subHeight: $sub_folder.outerHeight()
        };
        //判断当前的元素是否top menu
        //因为sub menu会位于top menu的下方，而third menu是位于sub menu的右侧或者左侧，而这的top值会不同
        this.isTop = $folder.parents('ul').length == 1 ? true : false;
        $sub_folder.css({
            top: this.isTop ? this._dimension.h + 'px' : '0'
        });
        //添加hover事件
        $folder.hover(function(){
            //目标对象
            var $target_menu = $(this).find('ul:eq(0)');
            //坐标
            this._offsets = {
                left: $(this).offset().left,
                top: $(this).offset().top
            }
            //如果当前的元素位于顶层，那么sub menu的left值为0，即位于当前元素的正下方
            //否则，left值为当前元素的宽度，即位于当前元素的正右方
            var menuleft = this.isTop ? 0 : this._dimension.w;
            //判断弹出的菜单是否超出屏幕宽度
            //若超出，则显示在当前元素的左侧，否则显示在右侧
            menuleft = (this._offsets.left + menuleft + this._dimension.subWidth > $(window).width()) ? (this.isTop ? -this._dimension.subWidth + this._dimension.w : -this._dimensions.w) : menuleft;
            //目标对象没有运行动画
            if (!$target_menu.is(':animated')) {
                $target_menu.css({
                    left: menuleft + 'px',
                    width: this._dimension.subWidth
                }).slideDown('normal');//显示
            }
        }, function(){
            //目标对象
            var $target_menu = $(this).find('ul:eq(0)');
            $target_menu.slideUp('normal');//隐藏
        });//end hover
    });//end each
    $mainmenu.find("ul").css({
        display: 'none',
        visibility: 'visible'
    });
})
