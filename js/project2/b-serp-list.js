$(document).ready(function() {

    var TEXT_MORE;
    var TEXT_HIDE = 'Скрыть';

    $('.b-serp-list').delegate('.b-serp-item__toggle', 'click', function(){
        var toggle = $(this);
        var content = toggle.closest('.b-serp-item__content');

        content.find('.b-serp-item__text').toggleClass('i-hidden');
        content.find('.b-serp-item__link').toggleClass('i-hidden');

        if (!TEXT_MORE) TEXT_MORE = toggle.html();
        toggle.html(toggle.html() == TEXT_MORE ? TEXT_HIDE : TEXT_MORE);
    });

});
