$(document).ready(function() {

    $('.b-tables_type_programs').delegate('.b-tables__action .b-link', 'click', function() {
        var link = $(this);
        var params = link[0].onclick();
        var action = params.action;

        $.get('/storage.xml', {
            'action': action,
            'id': params.id,
            'sk': params.sk
        }, function(data) {
            if ($('.b-page').hasClass('b-page_name_my') && action == 'remove') {
                window.location.reload(true);
            } else {
                link.closest('.b-tables__col').find('.b-tables__action').toggleClass('i-hidden');
                link.closest('.b-tables__row').toggleClass('b-tables__row_mark_yes');
            }
        });

        // Обновляем кол-во избранных программ в шапке
        var my = $('.b-head-userinfo__service');
        var count = parseInt(my.find('em').text());

        if (action == 'add') count++;
        if (action == 'remove') count--;

        my.find('em').text(count);

        if (count == 0) {
            my.find('span').addClass('i-hidden');
        } else {
            my.find('span').removeClass('i-hidden');
        }

        return false;
    });

});
