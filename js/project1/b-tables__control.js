$(document).ready(function() {

    var orderAsc = true; // по умолчанию сортировка по возрастанию

    $('.b-tables__control .b-link').click(function() {
        var thisControl = $(this).closest('.b-tables__control');
        var thisTable = thisControl.closest('.b-tables');

        var classStateSelected = 'b-tables__control_state_selected';
        var classOrderAsc = 'b-tables__control_order_asc';
        var classOrderDesc = 'b-tables__control_order_desc';

        if (!thisControl.hasClass(classStateSelected)) {
            orderAsc = true;
            // Убираем сортировку в остальных колонках
            thisTable.find('.b-tables__control').removeClass(classStateSelected + ' ' + classOrderAsc + ' ' + classOrderDesc);
            thisControl.addClass(classStateSelected + ' ' + classOrderAsc);
        } else {
            orderAsc = !orderAsc;
            thisControl.toggleClass(classOrderAsc + ' ' + classOrderDesc);
        }

        var column = $(this)[0].onclick().column;
        var orderBy = orderAsc ? column : '-' + column;
        var dataType = thisTable.hasClass('b-tables_type_programs') ? 'programs' : 'universities';

        var pathName = window.location.pathname;
        var queryString = window.location.search;

        $.get(pathName + queryString, {
            'data_type': dataType,
            'order_by': orderBy,
            'async': true
        }, function(data) {
            $('.b-tables_type_' + dataType).find('.b-tables__body .b-tables__row').remove();
            $('.b-tables_type_' + dataType).find('.b-tables__body').append(data);
        });

        return false;
    });

});
