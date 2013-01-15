$(document).ready(function() {

    var MAX_COUNT = 3; // максимальное кол-во инпутов
    var CLASS_NAME = '.b-search-education__content_control_yes';
    var newControl;

    $('.b-search-education').delegate('.b-search-education__control .b-form-button', 'click', function() {
        var button = $(this);
        var action = (button.find('.b-form-button__simple').html() == '+' ? 'add' : 'remove');
        var count = button.closest('.b-search-education').find(CLASS_NAME).length;

        // Фокус после клика не убирается, убираем вручную
        button.removeClass('b-form-button_focused_yes');

        if (action == 'add' && count < MAX_COUNT) {
            addControl(button, count);
        }

        if (action == 'remove' && count > 1) {
            removeControl(button, count);
        }
    });

    // Добавить поле ввода
    var addControl = function(button, count, value) {
        var rnd = Math.round(Math.random() * 10000);

        newControl = button.closest(CLASS_NAME).clone(false);
        newControlHint = newControl.find('.b-form-input__hint');
        newControlInput = newControl.find('.b-form-input__input');

        // Исправляем несовершенство BEM
        newControlHint.attr('for', newControlHint.attr('for') + rnd);
        newControlInput.attr('id', newControlInput.attr('id') + rnd);
        newControlInput.val(value);

        newControl.find('.b-form-input').removeClass('b-form-input_js_inited');
        newControl.find('.b-search-education__control').removeClass('b-search-education__control_type_add');
        newControl.find('.b-form-button').removeClass('b-form-button_focused_yes');
        newControl.find('.b-form-button__simple').html('&#8722;'); // minus

        var noControl = button.closest('.b-search-education').find('.b-search-education__content_control_no');

        if (noControl.length > 0) {
            $(newControl.attr('data', rnd)).insertBefore(noControl);
        } else {
            button.closest('.b-search-education').find('.b-search-education__extend__i').append(newControl.attr('data', rnd));
        }

        count++;

        if (count == MAX_COUNT) {
            button.bem('b-form-button').setMod('disabled', 'yes');
        }

        BEM.DOM.init(newControl);
    }

    // Удалить поле ввода
    var removeControl = function(button, count) {
        var firstControl = button.closest('.b-search-education').find('.b-search-education__control_type_add');

        button.closest(CLASS_NAME).remove();
        count--;

        if (count = MAX_COUNT - 1) {
            var test = firstControl.find('.b-form-button').bem('b-form-button');
            firstControl.find('.b-form-button').bem('b-form-button').setMod('disabled', 'false');
        }
    }

    // Инициализация формы
    var initForm = function() {
        var queryString = window.location.search.substring(1);

        if (queryString != '') {
            var queryParams = queryString.split('&');

            $.each(queryParams, function(index, value) {
                var paramName = value.split('=')[0];
                var paramValue = value.split('=')[1];

                // TODO: Сделать проверку на тип
                if (paramValue.indexOf('|') != -1 && paramName != 'duration') {
                    var paramValues = paramValue.split('|');
                    var thisColumn = $('.b-search-education_type_' + paramName);
                    var thisControl = thisColumn.find('.b-search-education__control .b-form-button');

                    $.each(paramValues, function(index, value) {
                        if (index == 0) {
                            thisColumn.find('.b-form-input__input').val(decodeURIComponent(value));
                        } else {
                            addControl(thisControl, index, decodeURIComponent(value));
                        }
                    });
                }

            });
        }
    }

    initForm();

});
