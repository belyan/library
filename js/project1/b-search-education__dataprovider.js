BEM.decl('b-search-education__dataprovider', {
    onSetMod: {
        'js': function() {}
    },

    get: function(request, callback) {
        var $self = this;
        var url = $self.params['url'];
        var $input;

        // Связываем саджесты university и location
        if (url.indexOf('university') != -1) {
            $input = $('.b-search-education_type_location .b-form-input__input');
            request += '&location=' + $input.val();
        }

        $.getJSON(url + request, {}, function(data) {
            callback.call($self, {
                items: data[1], metainfo: data[2]
            });
        });
    }
});
