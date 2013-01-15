$(document).ready(function() {

    $('.b-hsearch').submit(function(event) {
        event.preventDefault();

        var form = $(this);
        var queryString = form.serialize();
        var formParams = {};

        $.each(queryString.split('&'), function(index, value) {
            var paramName = value.split('=')[0];
            var paramValue = value.split('=')[1];

            if (paramValue != '') {
                if (formParams[paramName]) {
                    formParams[paramName] += '|' + encodeURIComponent(paramValue);
                } else {
                    formParams[paramName] = encodeURIComponent(paramValue);
                }
            }
        });

        var formParamsModify = [];

        $.each(formParams, function(index, value) {
            formParamsModify.push(index + '=' + decodeURIComponent(value));
        });

        queryString = (formParamsModify.length > 0) ? '?' + formParamsModify.join('&') : ''; 

        window.location.href = form.attr('action') + queryString;
    });

});
