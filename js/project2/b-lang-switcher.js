$(document).ready(function() {

    $('.b-lang-switcher').delegate('.b-lang-switcher__switch', 'click', function() {
        var switcher = $(this);
        var langs = switcher.siblings('.b-lang-switcher__langs');

        switcher.after($(langs[0]));
        switcher.before($(langs[1]));

        var lang = $('.b-form-input__lang');
        var langList = lang.val().split('-');

        // Перевод однонаправленный
        if (langList.length == 2) {
            lang.val(langList[1] + '-' + langList[0]);
        }
    });

    $('.b-lang-switcher').delegate('.b-lang-switcher__langs', 'change', function() {
        var langs = $(this);
        var value = langs.val();
        var lang = $('.b-form-input__lang');

        // Для украинского и казахского языка перевод однонаправленный
        if (value == 'uk' || value == 'kk') {
            lang.val(langs.index() ? 'ru-' + value : value + '-ru');
        } else {
            lang.val(value);
        }

        var suggest = $('.b-form-input_autocomplete_yes');
        var suggestUrl = suggest.bem('b-slovari-dataprovider').get();

        suggest.bem('b-form-input')._dataprovider.params.url = suggestUrl;

        var search = $('.b-head-search');
        var searchInput = search.find('.b-form-input__input');

        // Запускать поиск при смене языка, если запрос не пустой
        if (searchInput.val()) {
            $('.b-head-search').submit();
        }
    });

});
