$(document).ready(function() {

    $('.b-translate__more').delegate('.b-form-button', 'click', function() {
        var button = $(this);
        var more = button.closest('.b-translate__more');
        var params = more[0].ondblclick();
        var spin = more.find('.b-spin');

        more.ajaxStart(function() {
            button.addClass('i-hidden');
            spin.addClass('b-spin_progress_yes');
        }).ajaxStop(function() {
            more.remove();
        });

        $.get('/translate.xml', {
            'text': params.text,
            'lang': params.lang,
            'dict': (params.dict ? params.dict : ''),
            'async': 1
        }, function(data) {
            $(data).insertAfter(more);
        });

        return false;
    });

});
