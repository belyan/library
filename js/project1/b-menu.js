$(document).ready(function() {

    var $parent = $('.b-menu_type_city');

    $parent.find('.b-link_type_more').click(function() {
        $(this)
            .closest('.b-menu_type_city')
            .find('.i-hidden')
            .removeClass('i-hidden')
            .siblings(':last')
            .addClass('i-hidden');
        return false;
    });
});
