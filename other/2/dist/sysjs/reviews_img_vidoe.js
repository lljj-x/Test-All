var reveiw_img = {};
    reveiw_img.iframePop = function(options){
        // $.layer({
        // type : 2,
        // shadeClose : true,
        // title : options.title,
        // border : options.border,
        // iframe : {src : options.url},
        // area : [options.width, options.height],
        // offset : [options.top,options.left]
        // });

        ymPrompt.win({
            message:"",
            width:options.width,
            height:options.height,
            title:"",
            maskAlpha:0.5,
            fixPosition:true,
            iframe:{id:'myId',name:'myName',src:options.url}
        });
    }; 

    reveiw_img.show_reviewVido = function(url){
        ymPrompt.win({
            message:"<div style=\"width:570px; height:340px; padding:10px; background:#fff\"><object width=\"570\" height=\"340\"><param name=\"movie\" value=\"http://www.youtube.com/v/" + url + "&rel=1&autoplay=1\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\"http://www.youtube.com/v/" + url + "&rel=1&autoplay=1\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" width=\"570\" height=\"340\"></embed></object></div>",
            width:593,
            height:390,
            title:"",
            maskAlpha:0.5,
            fixPosition:true
        });
        // $.layer({
        //     type: 1,
        //     title: false,
        //     shadeClose : true,
        //     border : [10, 0.5, '#666', false],
        //     offset: ['50px',''],
        //     move: ['.juanmove', false],
        //     area: ['590px','360px'],
        //     page: {
        //         html: "<div style=\"width:570px; height:340px; padding:10px; background:#fff\"><object width=\"570\" height=\"340\"><param name=\"movie\" value=\"http://www.youtube.com/v/" + url + "&rel=1&autoplay=1\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\"http://www.youtube.com/v/" + url + "&rel=1&autoplay=1\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" width=\"570\" height=\"340\"></embed></object></div>"
        //     }
        // });
    };
    //留言图片弹出观看
    reveiw_img.imgoptions = {
        url:"",
        width:"820",
        height:"520"
    };

    $(function(){
       $(".js_reviews_img_list").find("a.js_reviews_img").each(function(i,v){

            $(this).click(function(){
                //index是用来标记点击图片是同类图片中的第几张
                reveiw_img.imgoptions.url = $(this).attr("href")+"?index="+i;
                //options是弹出iframe框的配置信息
                reveiw_img.iframePop(reveiw_img.imgoptions);
                return false;
            })
        }); 
        //视频弹出框
       
        $(".js_reviews_video_list").find("a.js_reviews_video").click(function(){
            reveiw_img.show_reviewVido($(this).attr("data-video"));
            return false;
        }); 

        $("#maskLevel").live("click",function(){
              ymPrompt.close()  
        });
    });
    