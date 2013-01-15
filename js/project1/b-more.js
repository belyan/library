$(document).ready(function() {

    var pageN = 1; // номер страницы

    $('.b-more_type_programs .b-form-button').click(function() {
        var button = $(this);
        var buttonParams = button[0].onclick();

        var pageSize = buttonParams.pageSize; // кол-во программ на странице
        var amount = buttonParams.amount; // общее кол-во программ

        var column = $('.b-tables_type_programs .b-tables__control_state_selected');
        var columnParams = column.find('.b-link')[0].onclick();

        var columnName = columnParams.column;
        var orderBy = column.hasClass('b-tables__control_order_asc') ? columnName : '-' + columnName;

        $.get(window.location.pathname + window.location.search, {
            'page': pageN,
            'data_type': 'programs',
            'order_by': orderBy,
            'async': true
        }, function(data) {
            $('.b-tables_type_programs .b-tables__body').append(data);
            pageN++;
            if (pageN * pageSize >= amount) {
                button.closest('.b-more_type_programs').addClass('i-hidden');
            }
        });

        return false;
    });

});
