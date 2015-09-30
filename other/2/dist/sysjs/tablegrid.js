$.fn.tablegrid = function(params){
    var options = {
        oddColor   : '#E0EFFA',
        evenColor  : '#F2F9FD',
        overColor  : '#C0D0E0',
        selColor   : '#FFCC99',
        useClick   : false
    };
    $.extend(options, params);
    $(this).each(function(){
        $(this).find('tr:odd > td').css('backgroundColor', options.oddColor);
        $(this).find('tr:even > td').css('backgroundColor', options.evenColor);
        $(this).find('tr').each(function(){
            this.origColor = $(this).find('td').css('backgroundColor');
            this.clicked = false;
            if (options.useClick) {
                $(this).click(function(){
                    if (this.clicked) {
                        $(this).find('td').css('backgroundColor', this.origColor);
                        this.clicked = false;
                    } else {
                        $(this).find('td').css('backgroundColor', options.selColor);
                        this.clicked = true;
                    }
                   // $(this).find('td > input[@type=checkbox]').attr('checked', this.clicked);
                });
            }
            $(this).mouseover(function(){
                $(this).find('td').css('backgroundColor', options.overColor);
            });
            $(this).mouseout(function(){
                if (this.clicked) {
                    $(this).find('td').css('backgroundColor', options.selColor);
                } else {
                    $(this).find('td').css('backgroundColor', this.origColor);
                }
            });
        });
    });
};