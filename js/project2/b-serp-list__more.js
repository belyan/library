$(document).ready(function() {

    var PAGE = $('.b-serp-list__more')[0].ondblclick().page;

    $('.b-serp-list__more').delegate('.b-form-button', 'click', function() {
        var button = $(this);
        var more = button.closest('.b-serp-list__more');
        var params = more[0].ondblclick();
        var spin = more.find('.b-spin');

        more.ajaxStart(function() {
            button.addClass('i-hidden');
            spin.addClass('b-spin_progress_yes');
        }).ajaxStop(function() {
            spin.removeClass('b-spin_progress_yes');
            button.removeClass('i-hidden');
        });

        $.get('/meaning.xml', {
            'text': params.text,
            'page': PAGE,
            'async': 1
        }, function(data){
            $(data).find('.b-serp-item').insertBefore(more);
            //$(data).find('.b-serp-item').insertAfter(button.closest('.b-serp-list').find('.b-serp-item:last'));

            if (params.count < PAGE) {
                more.remove();
            }
        });

        PAGE++;
        return false;
    });

});
