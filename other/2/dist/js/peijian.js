/**
 * peiian.js            配件管理js
 *
 * @author              mashanling(msl-138@163.com)
 * @date                2012-05-15 14:29:22
 * @last modify         2012-05-17 10:34:15 by mashanling
 */

var PEIJIAN = {//配件管理
    url: 'peijian.php'
};

PEIJIAN.list = {//列表
    /**
     * 绑定事件
     * 
     * @return {object} 配件对象
     */
    bindEvents: function() {
        var me = this;
        
        $('#btn-delete').click(function() {//删除
            var ids = getCheckedAll();
            ids && me['delete'](ids);
        });
        
        //操作
        $('#stripe_tb td.operate').on('click', 'a', function() {
            var element = $(this), elementId = element.attr('id'), _parent = element.parent();
            switch (element.attr('class')) {
                case 'delete'://删除
                    me['delete'](elementId.substr(2), '此');
                    break;
                
                case 'edit'://编辑
                    _parent.hide().next().show();
                    break;
                    
                case 'cancel'://取消编辑
                    _parent.hide().prev().show();
                    break;
                
                case 'confirm'://确认编辑
                    var val = element.prev().val();
                    
                    if (!val) {
                        Alert('请输入配件价格');
                    }
                    else {
                        var idArr = elementId.split('_');
                        _parent.hide().prev().show();
                        
                        setLoading();
                        
                        $.post(PEIJIAN.url + '?act=edit_price', {
                            parent_id: idArr[1],
                            goods_id: idArr[2],
                            price: val,
                            edit_all: _parent.find(':checked').length
                        }, function(data) {
                            C.callback(data, location.href, L.edit + L.success);
                        });
                    }
                    break;
            }
           
           return false;
        });//end 操作
        
        return this;
    },//end bindEvents
    
    /**
     * 初始化
     * 
     * @return {void} 无返回值
     */
    init: function() {
        var me = this;
        var cat_id = $('#hidden-cat_id');//分类id元素
        var txt = cat_id.prev();//分类框
        var element = $('#div-category');//分类树div
        var div = element.parent();
        
        txt.attr('title', txt.val()).click(function() {//选择
            !element.html() && element.tree({//tree.js
                data: ALL_CATEGORIES,
                theme: 'x-tree-lines',
                imgPath: '/temp/skin3/eload_admin/images/tree/',
                /**
                 * 分类权限判断, this = node 当前节点
                 * 
                 * @return {bool} 有权限，返回true，否则返回false
                 */
                beforeBuildNode: function() {
                 
                    if (typeof CATEGORY_PRIV != 'undefined' && CATEGORY_PRIV[0] && this.parent_id == '0' && $.inArray(this.id, CATEGORY_PRIV) == -1) {
                        return false;
                    }
                    
                    return true;
                }
            });
            
            div.show().mouseleave(function() {//鼠标离开，隐藏分类树
                $(this).hide();
            });
            
            var checkValues = element.getTreeCheckedValues();//选中节点
            checkValues && element.setTreeCheckedNodes(checkValues, 0);
            cat_id.val() && element.setTreeCheckedNodes(cat_id.val(), 1);
        });//end 选择
        
        $('#a-confirm').click(function() {//确认选择
            var nodes = element.getTreeCheckedNodes();//选中节点
            var values = [], text = [];
            $.each(nodes, function(index, item) {
                values.push(item.id);//id
                text.push(item.text);//类名
            });
            text = text.join()
            txt.val(text).attr('title', text);
            cat_id.val(values.join());
            div.hide();
        });
        
        $('#a-clear').click(function() {//清除
            div.hide();
            txt.val('').attr('title', '');
            element.setTreeCheckedNodes(false, 0);
            cat_id.val('');
        });
    },
    /**
     * 删除
     * 
     * @param {string} ids        id串，主商品id_配件商品id
     * @param {string} confirmMsg 确认信息
     * 
     * @return {void} 无返回值
     */
    'delete': function(ids, confirmMsg) {
        
        if (confirm('您确定要删除' + (confirmMsg || '选中') + '记录？')) {
            setLoading();
            
            $.post(PEIJIAN.url + '?act=delete', 'ids=' + ids, function(data) {
                C.callback(data, location.href, L.del + L.success);
            });
        }
    }
};

PEIJIAN.add = function() {//添加配件
    $('#stripe_tb td').on('click', '.plus', function() {//点+,添加主（配件）商品
        var _parent = $(this).parents('tr:first');//所在tr
        var clone = _parent.clone(true).find('.plus').replaceWith('<strong style="color: red; cursor: pointer;" class="minus">[-]</strong>').text('[-]').end()//复制，+ => -
        .find('input').val('').end()//清空输入框值
        .find('.info').html('').end()//清空商品信息
        .insertBefore($(this).parent().hasClass('parent_id') ? $('#tr-main') : $('#tr-peijian'));//添加
    }).on('click', '.minus', function() {//点-,删除主（配件）商品
        $(this).parents('tr:first').remove();//删除所在tr
    }).on('blur', 'input.goods_sn', function() {//商品编码
        var element = $(this), goods_sn = element.val(), span = element.parent().find('.info');
        if (goods_sn && goods_sn.toUpperCase() != span.find('.goods_sn').text().toUpperCase()) {//未加载信息或已加载
            span.html('加载中...');
            
            $.post('goods.php?act=peijian_get_goods_info', {
                goods_sn: goods_sn
            }, function(data) {
                data = $.parseJSON(data);
                if (data && data.success) {//加载商品信息成功
                   var html = '\
                    <input type="hidden" name="' + (element.parent().hasClass('parent_id') ? 'parent_id' : 'goods_id') + '[]" value={goods_id} />\
                    <span class="goods_sn display-none">{goods_sn}</span>\
                    <img src="{goods_thumb}" style="cursor: default; width: 30px; height: 30px; vertical-align: middle" alt="" />\
                    <span title="{goods_title}">{name}</span>\
                    <span style="color: red">({peijian_price}/{shop_price})</span>'.format(data.data);
                    span.html(html);//设置商品信息
					element.parent().find('.price').val(data.data.peijian_price);
                }
                else {//加载失败
                    span.html('<span style="color: red;" class="not-exists">商品不存在或商品未上架或商品库存量为0</span>');
                }
            });
        }
    });
    
    var form = $('#form').submit(function (){
        
        if (form.find('.not-exists').length) {
            Alert('至少有一个商品不存在');
            return false;
        }
        
        var data = form.serializeArray(), addType = form.find(':checked').val(), checked = true;

        $.each(data, function(index, item) {//判断信息是否完整
            if (addType == 0) {
                
                if (item['name'] == 'main_goods_sn[]' && !item['value']) {
                    Alert('请正确填写主商品信息');
                    checked = false;
                    return false;
                }
            }
            else if(addType == 1){ 
				if(!$('#hidden-cat_id').val()) {
					Alert('请选择商品分类');
					checked = false;
					return false;
            
				}
            }
            if (item['name'] == 'goods_sn[]' && !item['value']) {
                Alert('请正确填写配件编码');
                checked = false;
                return false;
            }
            else if (item['name'] == 'price[]' && isNaN(parseFloat(item['value']))) {
                Alert('请正确填写配件价格');
                checked = false;
                return false;
            }
        });

        if (checked) {
            setLoading();
            var action_url=$('#act').val();
			if(action_url==''){
				action_url="?act=save";
			
				$.post(PEIJIAN.url + action_url, $.param(data), function(data) {//保存
					C.callback(data, document.referrer || PEIJIAN.url, L.add + L.success);
				});
			}else{
				$.post(PEIJIAN.url + action_url, $.param(data), function(data) {//保存
					C.callback(data, '?act=category_add', L.add + L.success);
				});
			}
        }
        
        return false;
    });//end submit
    
    form.find(':radio').click(function() {//添加类型
        var val = $(this).val(), trSn = $('.tr-sn'), trCategory = $('#tr-category');
        
        if (val == 0) {//商品编码
            trSn.show();
            trCategory.hide();
			$(".tr-pl").hide();
        }
        else if(val == 1) {//分类
            trSn.hide();
            trCategory.show();
			$(".tr-pl").hide();
        }
		else{
			trSn.hide();
            trCategory.hide();
			$(".tr-pl").show()
		}
    });
    
    return this;
};