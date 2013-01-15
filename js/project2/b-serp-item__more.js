$(document).ready(function() {

    $('.b-serp-item__more').delegate('.b-form-button', 'click', function() {
        var button = $(this);
        var item = button.closest('.b-serp-item');

        if (button.attr('href')) return true;

        button.closest('.b-serp-item__more').remove();
        item.nextUntil(':not(.i-hidden)').removeClass('i-hidden');
    });

});
