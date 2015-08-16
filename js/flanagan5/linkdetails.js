/**
 * linkdetails.js
 *
 * Данный модуль добавляет обработчики событий к ссылкам в документе,
 * с помощью которых отображаются всплывающие подсказки при задержке
 * указателя мыши над этими ссылками в течение полусекунды. Если ссылка
 * указывает на документ на том же сервере, что и исходный документ, всплывающая
 * подсказка будет включать в себя информацию о типе, размере и дате, которая
 * извлекается с помощью HTTP-запроса HEAD, выполняемого объектом XMLHttpRequest.
 *
 * Данный модуль требует наличия модулей Tooltip.js, HTTP.js и Geometry.js
 */
(function() {
    var tooltip = new Tooltip();

    if (window.addEventListener) {
        window.addEventListener("load", init, false)
    } else if (window.attachEvent) {
        window.attachEvent("onload", init);
    }

    function init() {
        var links = document.getElementsByTagName("a");

        for (var i = 0; i < links.length; i++) {
            if (links[i].href) addTooltipToLink(links[i]);
        }
    }

    function addTooltipToLink(link) {
        if (link.addEventListener) {
            link.addEventListener("mouseover", mouseover, false);
            link.addEventListener("mouseout", mouseout, false);
        } else if (window.attachEvent) {
            link.attachEvent("onmouseover", mouseover);
            link.attachEvent("onmouseout", mouseout);
        }

        var timer;

        function mouseover(event) {
            var e = event || window.event;

            var x = e.clientX + Geometry.getHorizontalScroll() + 25;
            var y = e.clientY + Geometry.getVerticalScroll() + 15;

            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(showTooltip, 500);

            function showTooltip() {
                if (link.protocol == "http:" && link.host == location.host) {
                    HTTP.getHeaders(link.href, function (headers) {
                        var tip = "URL: " + link.href + "<br>" +
                            "Тип: " + headers["Content-Type"] + "<br>" +
                            "Сервер: " + headers["Server"] + "<br>" +
                            "Дата: " + headers["Last-Modified"];

                        tooltip.show(tip, x, y);
                    });
                }
            }
        }

        function mouseout() {
            if (timer) window.clearTimeout(timer);
            timer = null;
            tooltip.hide();
        }
    }
})();