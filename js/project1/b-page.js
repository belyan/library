$(document).ready(function() {

    // поля для выделения
    var types = ['location', 'score', 'university'];

    $.each(types, function(index, value) {

        var $link = $('.b-link_type_' + value);
        var $search = $('.b-search-education_type_' + value);
        var $input = $search.find('.b-form-input__input');

        // класс для выделения рамкой
        var active = 'b-search-education_mark_yes';

        $input.blur(function() {
            $search.removeClass(active);
        });

        $link.mousedown(function(e) {
            // нужно чтобы не сработало событие blur
            e.preventDefault();

            if (!$search.hasClass(active)) {
                $search.addClass(active);
                $input.focus();
            } else {
                $input.blur();
            }
        });

    });

});
