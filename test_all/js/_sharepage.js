$(function(){

    var Action = Base.klass.create({
        tpl: {
            head:'<div id="header" class="<%=hasH%>"><div class="app-gen"><a id="appDlBtn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.allpyra.android&g_f=991653"><div class="ag-wrap clearfix"><div class="ag-l"><div class="app-img"><img src="img/sharepage/app_logo.jpg" alt=""></div><div class="app-des"><i class="stars"></i><h2>金字塔</h2><p>美好生活供应商</p></div></div><div class="ag-r"><div class="app-btn"><button>下载APP</button></div></div></div></a></div></div>',
            body:'<h1 class="title <%=hasCom_class%>"><%=title%></h1><p class="art-info creattime"><a href="<%=rebateuser_page%>"><img src="<%=rebateuser_avater%>" alt="useravater">&nbsp;&nbsp;<em><%=rebateuser_nickname%></em></a>&nbsp;&nbsp;<%=hasCom_br%><span><%=fcreatetime%></span></p><div class="brokerage <%=hasCom%>"><p class="brg-ttl">佣金（元）</p><p class="brg-act"><%=com%></p></div><p class="art-info <%=hasRs%>">阅读量：<span class="read-count"><%=read_count%></span>&nbsp;&nbsp;销量：<span class="sell-count"><%=sell_count%></span></p><div class="title-img"><img src="<%=title_img%>" alt="<%=title%>"></div>',
            type1:'<div class="type-1"><p><%=txt%></p></div>',
            type2:'<div class="type-2"><img src="<%=imgUrl%>" alt="<%=txt%>"></div>',
            type3:'<div class="type-3"><div class="pdt-gen"><a href="<%=furl%>" target="_blank"><div class="pg-wrap"><div class="pdt-img"><img src="<%=logourl%>" alt="<%=name%>"></div><div class="pdt-des"><p class="p-ttl"><%=name%></p><p class="p-pic"><span>￥<%=price%></span></p><p class="p-origin"><%=origin%></p><p class="p-depot"><%=depotName%></p></div></div></a></div></div>'
        },
        elements: {
            '.j-load-page': 'elLoadPage',
            '.j-err-prompt': 'elErrPrompt'
        },
        cgi: {
            action:'/api/essay/viewEssay.jsp'
        },
        pageParams:{
            t_id:'',
            eid:'',
            g_chan:'',
            op:2
        },
        hasWXTips:false,
        viewParams:{
            has_rs:false,
            has_h:true,
            has_com:false
        },
        init: function() {
            this.pageParams.t_id = Base.url.param('t_id') || '';
            this.pageParams.g_chan = Base.url.param('g_chan') || '';
            this.pageParams.eid = this.pageParams.t_id.replace('E_','');

            var WXTips = Base.url.param('wxtips') || '';
            this.hasWXTips = (WXTips && WXTips == 1);

            if(this.pageParams.t_id){
                this.viewParams.has_rs = false;
                this.viewParams.has_h = Base.url.param('head') === 'no' ? false : true;
                this.viewParams.has_com = Base.url.param('com') === 'yes';
                this.getData();
                
            }else{
                this.elLoadPage.hide();
                this.elErrPrompt.show();
            }
        },
        getData: function() {
            this.pageParams._ = new Date() - 0;

            $.get(this.cgi.action, this.pageParams, this.proxy(this.getDataBack));

        },
        getDataBack: function(result) {
            var o;

            this.elLoadPage.hide();

            if (result && result.errCode === 0) {
                o = result.obj;
                this.renderArt(o);
            } else {
                this.elErrPrompt.find('tips').text('获取数据失败。【' + result.errMsg + '】');
                 this.elErrPrompt.show();
            }
        },
        renderArt:function(obj){
            var o = obj, content = [], tranContent='';
            var formatTime = this.formatTime;
            var coverPrice = this.coverPrice;
            var D='', h_D = '', main_D = '', sub_D='';
            var h_prop = {}, main_prop={}, sub_prop = null;

            h_prop = {
                hasH:this.viewParams.has_h ? '' : 'hide'
            };
            h_D = this.tmpl(this.tpl.head, h_prop);

            main_prop = {
                hasCom_class:this.viewParams.has_com ? 'hasCom' : '',
                hasCom_br:this.viewParams.has_com ? '<br />' : '',
                hasCom:this.viewParams.has_com ? '' : 'hide',
                hasRs:this.viewParams.has_rs ? '' : 'hide',
                title:o.title,
                fcreatetime:formatTime(o.createtime),
                com:'￥'+coverPrice(o.sumCommission),
                read_count:o.read_count,
                sell_count:o.sell_count,
                title_img:o.title_img,
                rebateuser_page: o.eid ? '/rebate/rebateuser.html?eid='+o.eid : '',
                rebateuser_avater:o.headimgurl || 'img/app2/userDefaultAvater.jpg',
                rebateuser_nickname:o.nickname || '神秘塔客',
            };
            main_D = this.tmpl(this.tpl.body, main_prop);

            tranContent = o.content.replace(/\\r|\\n|\r|\n/g, "<br />");

            try {
               content = $.parseJSON(tranContent);
            }
            catch (e) {
            }

            for(var i=0; i<content.length; i++){
                var item = content[i];
                sub_prop = null;
                if(item.type){
                    var type = Number(item.type);
                    sub_prop = {};
                    switch(type)
                    {
                    case 1:
                        sub_prop.txt = '';
                        if(item.text){
                            sub_prop.txt = item.text;
                            try {
                               sub_prop.txt = decodeURI(item.text);
                            }catch (e) {
                            }
                        }
                        sub_D += this.tmpl(this.tpl.type1, sub_prop);
                      break;
                    case 2:
                        sub_prop.imgUrl = item.imgUrl || '';
                        sub_prop.txt = item.text || '';
                        sub_D += this.tmpl(this.tpl.type2, sub_prop);
                      break;
                    case 3:
                        sub_prop.price = coverPrice(item.price);
                        sub_prop.furl = Base.url.getItemUrl(item.pid);
                        sub_prop.logourl = item.logourl;
                        sub_prop.name = item.name;
                        sub_prop.origin = item.origin;
                        sub_prop.depotName = item.depotName;
                        sub_D += this.tmpl(this.tpl.type3, sub_prop);
                      break;
                    default:
                      sub_D += '';
                    }
                }
            }

            D = h_D+'<div id="article" style="display:block"><div class="art-gen">'+main_D+sub_D+'</div></div>';

            this.el.append(D);

            if (Base.Browser.type === 'weixin') {

                // 微信分享提示
                if(this.hasWXTips){
                    $('.wxtips-mark').on('click', function(){
                        $(this).hide();
                    }).show();
                }

                var eid = this.pageParams.eid;
                var t_id = this.pageParams.t_id || '';
                var g_chan = this.pageParams.g_chan || '';
                var link = window.location.href;
                if(t_id && g_chan){
                    link = 'http://m.allpyra.com'+'/sharepage.html?t_id=E_'+eid+'&g_chan='+g_chan;
                }
                var config = {
                    'title': o.title,
                    'imgUrl': o.title_img || 'http://m.allpyra.com/img/share/logo.jpg',
                    'desc': '我在金字塔发现的这篇文章实在太给力了，没理由不分享！',
                    'link': link
                };

                new Base.Widget.WXShare({config:config});

            }
        }
    });

    new Action({el: '.j-wrapper'});

});