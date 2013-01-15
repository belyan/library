BEM.decl({
    name : 'b-slovari-dataprovider'
},{
    get: function(type) {
        var host = 'http://suggest-slovari.yandex.ru';
        var langs = $('.b-form-input__lang').val().split('-');
        var lang = langs[0] == 'ru' ? langs[1] : langs[0];

        var path = {
            'translate': '/suggest-lingvo?v=5&lang=' + lang,
            'meaning': '/suggest-sl?v=5',
            'spelling': '/suggest-slovari-rus?v=5'
        };
        var url = host + path[type || 'translate'] + '&callback=?';
        return url;
    }
});
