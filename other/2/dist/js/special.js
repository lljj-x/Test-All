/**
 * vote.js              后台专题管理js
 *
 * @author              mashanling(msl-138@163.com)
 * @date                2011-11-03
 * @last modify         2011-11-03 by mashanling
 */
$(function(){
    var msg = $.cookie(L.msg);
    $.cookie(L.msg, null);
    msg && Alert(msg, true); //提示信息
});
var specialArr = {}; //所有专题
//专题管理
var SPECIAL = {
    url: 'special_mgr.php'
};

//专题
SPECIAL.special = {
    //专题-验证数组
    checkArr: [{
        id: 'txt-name',
        msg: '专题名称不能为空'
    }, {
        id: 'txt-module',
        msg: 'url组件名不能为空'
    }],
    
    /**
     * 专题管理列表
     *
     */
    list: function(){
        $('.a-delete').click(function(){
		
            if (confirm('删除该专题的同时，将会删除其下板块\n\n您确定要删除?')) {
                $.post(SPECIAL.url + '?act=delete_special', 'special_id=' + this.id.substr(2), function(data){
                    C.callback(data, SPECIAL.url, L.del + L.success);
                });
            }
			
			return false;
        });
    },
    
    /**
     * 专题-添加或编辑
     *
     */
    add: function(){
        var _this = this;
        
        $('#form-special_add').submit(function(){ //提交
        
            if (checkPost(_this.checkArr)) {
                $.post(SPECIAL.url + '?act=save_special', $(this).serialize(), function(data){
                    
                    if (data) {
                        Alert(data);
                        return false;
                    }
                    
                    var msg = specialId ? L.edit : L.add;
                    msg += L.success;
                    C.callback(data, SPECIAL.url, msg);
                });
            }
            
            return false;
        });
    }
};

//专题板块
SPECIAL.specialPosition = {
    //专题板块-验证数组
    checkArr: [{
        id: 'txt-name',
        msg: '板块名称不能为空'
    }, {
        id: 'select-specialId',
        msg: '所属专题不能为空'
    }],
    
    /**
     * 专题板块列表
     *
     */
    list: function(){
        $('.a-delete').click(function(){
		
            if (confirm('确认要删除该板块?')) {
                var idArr = this.id.split('-');
                $.post(SPECIAL.url + '?act=delete_special_position', {
                    special_id: idArr[1],
                    position_id: idArr[2]
                }, function(data){
                    C.callback(data, location.href, L.del + L.success);
                });
            }
			
			return false;
        });
    },
    
    /**
     * 专题板块-添加或编辑
     *
     */
    add: function(){
        var _this = this;
        
        $('#form').submit(function(){ //提交
        
            if (checkPost(_this.checkArr)) {
                
                $.post(SPECIAL.url + '?act=save_special_position', $(this).serialize(), function(data){
                    
                    if (data) {
                        Alert(data);
                        return false;
                    }
                    
                    var msg = positionId ? L.edit : L.add;
                    msg += L.success;
                    C.callback(data, SPECIAL.url + '?act=special_position_list&special_id=' + (specialId ? specialId : $('#select-specialId').val()), msg);
                });
            }
            
            return false;
        });
    }
};

//专题商品
SPECIAL.specialGoods = {
    //专题商品-验证数组
    checkArr: [{
        id: 'txt-sn',
        msg: '商品编码不能为空'
    }, {
        id: 'select-specialId',
        msg: '所属专题不能为空'
    }, {
        id: 'select-positionId',
        msg: '所属板块不能为空'
    }],
    
    /**
     * 专题商品列表
     *
     */
    list: function(){
        $('.a-delete').click(function(){
		
            if (confirm('确认要删除该商品?')) {
                $.post(SPECIAL.url + '?act=delete_special_goods', 'auto_id=' + this.id.substr(2), function(data){
                    C.callback(data, location.href, L.del + L.success);
                });
            }
			
			return false;
        });
    },
    
    /**
     * 专题商品-添加或编辑
     *
     */
    add: function(){
        var _this = this;
        
        $('#form').submit(function(){ //提交
        
            if (checkPost(_this.checkArr)) {
                
                $.post(SPECIAL.url + '?act=save_special_goods', $(this).serialize(), function(data){
                    
                    if (data) {
                        Alert(data);
                        return false;
                    }
                    
                    var msg = autoId ? L.edit : L.add;
                    msg += L.success;
                    C.callback(data, SPECIAL.url + '?act=special_goods&special_id={0}&position_id={1}'.format(specialId ? specialId : selectSpecialId.val(), positionId ? positionId : selectPositionId.val()), msg);
                });
            }
            
            return false;
        });
        
        return this;
    },
    
    loadPositions: function() {
        var id = selectSpecialId.val(), html = '', tpl = '<option value="{0}"{1}>{2}</option>';
        $.each(specialArr[id].special_positions, function(index, item) {
            html += tpl.format(item.position_id, item.position_id == positionId ? ' selected="selected"' : '', item.name);
        });
        selectPositionId.html(html ? html : tpl.format('', '', '暂无板块'));
    }
};