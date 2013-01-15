BEM.DOM.decl({
    name: 'b-form-input',
    modName: 'autocomplete',
    modVal: 'yes'
},{
    _getAutocompleteItems: function(data) {
        var _this = this;

        return BEMHTML.apply({
            block: 'b-menu',
            mods: {
                layout: 'vert'
            },
            content: $.map(data[1], function(item, i) {
                var type,
                    url = '#',
                    content = item,
                    prefix = '';
                
                if ($.isArray(item)) {
                    type = 'link';

                    // перевод
                    if (item[0] == 'lingvo') {
                        content = [item[1].text, {
                            block: 'b-autocomplete-item',
                            elem: 'val',
                            tag: 'span',
                            content: ' &mdash; ' + item[1].translation
                        }];
                        url = encodeURI('/translate.xml?text=' + item[1].text + '&lang=' + item[1].from + '-' + item[1].to);
                    // энциклопедии
                    } else if (item[0] == 'meaning') {
                        content = item[1].text;
                        url = encodeURI('/meaning.xml?text=' + item[1].text);
                    // русский язык
                    } else if (item[0] == 'spelling') {
                        content = item[1].text;
                        url = encodeURI('/spelling.xml?text=' + item[1].text);
                    }
                }

                return {
                    elem: 'item',
                    mix: [{
                        block: 'b-autocomplete-item',
                        js: {
                            prefix: prefix
                        },
                        mods: {
                            type: type
                        }
                    },{
                        block: 'i-pressed-controller',
                        js: true
                    }],
                    content: {
                        block: 'b-link',
                        url: url,
                        content: content
                    }
                };
            })
        });
    }
});
