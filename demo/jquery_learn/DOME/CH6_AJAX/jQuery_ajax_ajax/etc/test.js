
// comments 为一个json 对象所以可以直接操作 

var comments = [{
	"username": "张三",
	"content": "沙发."
}, {
	"username": "李四",
	"content": "板凳."
},{
	"username": "王五",
	"content": "地板."
}];

/*
	方法 2  json 格式的字符串转为 一个 json 对象可以使用  eval('(' + str + ')'); 方法
	var str_comments = '[{"username":"张三","content":"沙发."},{"username":"李四","content":"板凳."},{"username":"王五","content":"地板."}]';
	var comments = eval('(' + str_comments + ')');
*/



var html = '';
$.each(comments, function(commentsIndex, comment) {
	html += '<div class="comment"><h6>' + comment['username'] + ':</h6><p class="para">' + comment['content'] + '</p></div>';
})

$("#resText").html(html);