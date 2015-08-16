/**
 * InputFilter.js
 *
 * Данный модуль отыскивает все элементы <input type="text"> в документе,
 * которые имеют нестандартный атрибут "allowed". Регистрирует обработчик
 * события onkeypress для всех таких элементов с целью ограничить возможность
 * ввода символов только теми, которые перечислены в значении атрибута allowed.
 * Если элемент <input> имеет при этом атрибут "messageid", значение
 * этого атрибута воспринимается как id другого элемента документа.
 * Когда пользователь пытается ввести недопустимый символ, отображается
 * элемент messageid. Когда пользователь вводит допустимый символ,
 * элемент messageid скрывается.
 */
(function() {
    if (window.addEventListener) {
        window.addEventListener("load", init, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", init);
    }

    function init() {
        var inputTags = document.getElementsByTagName("input");
        for (var i = 0; i < inputTags.length; i++) {
            var tag = inputTags[i];
            if (tag.type != "text") continue;

            var allowed = tag.getAttribute("allowed");
            if (!allowed) continue;

            if (tag.addEventListener) {
                tag.addEventListener("keypress", filter, false);
            } else {
                tag.onkeypress = filter;
            }
        }
    }

    function filter() {
        var e = event || window.event;
        var code = e.charCode || e.keyCode;

        if (e.charCode == 0) return true;
        if (e.ctrlKey || e.altKey) return true;
        if (code < 32) return true;

        var allowed = this.getAttribute("allowed");
        var messageElement = null;
        var messageId = this.getAttribute("messageid");

        if (messageId) {
            messageElement = document.getElementById(messageId);
        }

        var c = String.fromCharCode(code);
        if (allowed.indexOf(c) != -1) {
            if (messageElement) messageElement.style.visibility = "hidden";
            return true;
        } else {
            if (messageElement) messageElement.style.visibility = "visible";
            if (e.preventDefault) e.preventDefault();
            if (e.returnValue) e.returnValue = false;
            return false;
        }
    }
})();