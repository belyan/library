BEM.DOM.decl('b-tabbed-pane', {

    selectByIndex: function(index) {
        this.__base.apply(this, arguments);

        var tab = this.elem('tab').eq(index);
        var tabType = this.getMod(tab, 'type');

        $('.b-head-search').attr('action', '/' + tabType + '.xml');

        // Передавать параметр lang только в переводе
        $('.b-form-input__lang').attr('disabled', (tabType == 'translate') ? false : true);

        var search = $('.b-head-search');
        var searchInput = search.find('.b-form-input__input');

        if (searchInput.val()) {
            // Запустить поиск при смене вкладки, если запрос не пустой
            search.submit();
        } else {
            // Если запрос пустой, то обновить url саджеста
            var suggest = search.find('.b-form-input_autocomplete_yes');
            var suggestUrl = suggest.bem('b-slovari-dataprovider').get(tabType);

            suggest.bem('b-form-input')._dataprovider.params.url = suggestUrl;
        }
    }

});
