$(document).ready(function(){
	//编辑商品分类折扣
	
	//$(this).livequery("dblclick",function(){															 
		$(".zhekou_category_edit").editable('category.php?act=edit_zhekou&big=', {
			 type      : 'textarea',
			 loadurl   : "category.php?act=replace_html&sml=",
			 event     : 'dblclick',
			 width     :  '200',
			 height    :  '80',
			 indicator : 'Saving...',
			 onblur    : 'submit',
			 tooltip   : '双击进行修改...'
		 });
  // });

	//编辑商品分类
	$(".category_edit").livequery("click",function(){
			$(this).editable('category.php?act=editinplace', {
				 type      : 'text',
				 event     : 'dblclick',
				 width     :  '90%',
				 indicator : 'Saving...',
				 onblur    : 'submit',
				 tooltip   : '双击该标题进行修改...'
			 });
    });
	
	//编辑商品类型名称
	$('.goods_type_edit').editable('goods_type.php?act=editinplace', {
		 type      : 'text',
		 width     :  '80%',
		 event     : 'dblclick',
		 indicator : 'Saving...',
		 onblur    : 'submit',
		 tooltip   : '双击该标题进行修改...'
	 });
	
});