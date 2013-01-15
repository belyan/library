$(document).ready(function() {

    var thisTable = $('.b-tables_type_programs');
    var offsetTop = thisTable.offset().top;
    var newTable = thisTable.clone();

    thisTable.find('.b-tables__head').remove();
    newTable.find('.b-tables__body').remove();

    $('<div class="b-fixed"><div class="b-fixed__i"></div></div>').insertBefore(thisTable);
    $('.b-fixed__i').append($(newTable));

    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop();

        if (scrollTop > offsetTop) {
            $('.b-fixed').addClass('b-fixed_state_turn');
            newTable.addClass('b-tables_fixed_yes');
        } else {
            $('.b-fixed').removeClass('b-fixed_state_turn');
            newTable.removeClass('b-tables_fixed_yes');
        }
    });

});
