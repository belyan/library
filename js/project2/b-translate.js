$(document).ready(function() {

    var TEXT_MORE;
    var TEXT_HIDE = 'Скрыть примеры';

    $('.b-translate').delegate('.b-translate__toggle', 'click', function() {
        var toggle = $(this);
        var button = toggle.find('.b-form-button__inner');
        var article = toggle.closest('.b-translate__article');

        article.toggleClass('b-translate__article_extended_no');

        if (!TEXT_MORE) TEXT_MORE = button.html();
        button.html(button.html() == TEXT_MORE ? TEXT_HIDE : TEXT_MORE);
    });

});
