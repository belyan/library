/**
 * Validate.js
 *
 * После загрузки документа данный модуль сканирует документ в поисках
 * HTML-форм и текстовых полей в формах. Если обнаруживаются элементы
 * с атрибутом "required" или "pattern", к ним добавляются соответствующие
 * обработчики событий, выполняющие проверку данных формы.
 *
 */
(function() {
    if (window.addEventListener) {
        window.addEventListener("load", init, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", init);
    }

    function init() {
        for (var i = 0; i < document.forms.length; i++) {
            var f = document.forms[i];
            var needsValidation = false;

            for (var j = 0; j < f.elements.length; j++) {
                var e = f.elements[j];
                if (e.type != "text") continue;

                var pattern = e.getAttribute("pattern");
                var required = e.getAttribute("required") != null;

                if (required && !pattern) {
                    pattern = "\\S";
                    e.setAttribute("pattern", pattern);
                }

                if (pattern) {
                    e.onchange = validateOnChange;
                    needsValidation = true;
                }
            }

            if (needsValidation) f.onsubmit = validateOnSubmit;
        }
    }

    function validateOnChange() {
        var textField = this;
        var pattern = textField.getAttribute("pattern");
        var value = textField.value;

        if (value.search(pattern) == -1) {
            textField.className = "invalid";
        } else {
            textField.className = "valid";
        }
    }

    function validateOnSubmit() {
        var invalid = false;

        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i];

            if (e.type == "text" && e.onchange == validateOnChange) {
                e.onchange();

                if (e.className == "invalid") invalid = true;
            }
        }

        if (invalid) {
            document.getElementById("message").innerHTML = "Форма заполнена не полностью " +
            "или были введены некорректные данные.\n" +
            "Пожалуйста, проверьте правильность выделенных полей " +
            "и повторите попытку.";
            return false;
        }
    }
})();
