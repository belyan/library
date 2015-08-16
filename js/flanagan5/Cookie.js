/**
 * Cookie.js
 *
 * Данный конструктор отыскивает cookie с заданным именем для текущего документа.
 * Если cookie существует, его значение интерпретируется как набор пар имя-значение,
 * после чего эти значения сохраняются в виде свойств вновь созданного объекта.
 *
 */
function Cookie(name) {
    this.$name = name;

    var allcookies = document.cookie;
    if (allcookies == "") return;

    var cookies = allcookies.split(";");
    var cookie = null;

    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].substring(0, name.length + 1) == (name + "=")) {
            cookie = cookies[i];
            break;
        }
    }

    if (cookie == null) return;

    var cookieval = cookie.substring(name.length + 1);
    var a = cookieval.split("&");

    for (i = 0; i < a.length; i++) {
        a[i] = a[i].split(":");
    }
    for (i = 0; i < a.length; i++) {
        this[a[i][0]] = decodeURIComponent(a[i][1]);
    }
}

/**
 * Метод store() объекта Cookie
 *
 * @param {number} daysToLive - срок жизни cookie-файла в сутках
 * @param {string} path - значение атрибута path в cookie
 * @param {string} domain - значение атрибута domain в cookie
 * @param {boolean} secure - если передается значение true, устанавливается атрибут secure в cookie-файле
 */
Cookie.prototype.store = function(daysToLive, path, domain, secure) {
    var cookieval = "";
    for (var prop in this) {
        if ((prop.charAt(0) == "$") || ((typeof this[prop]) == "function")) {
            continue;
        }
        if (cookieval != "") cookieval += "&";
        cookieval += prop + ":" + encodeURIComponent(this[prop]);
    }

    var cookie = this.$name + "=" + cookieval;

    if (daysToLive || daysToLive == 0) {
        cookie += "; max-age=" + (daysToLive * 24 * 60 * 60);
    }
    if (path) cookie += "; path=" + path;
    if (domain) cookie += "; domain=" + domain;
    if (secure) cookie += "; secure=";

    document.cookie = cookie;
};

/**
 * Метод remove() объекта Cookie
 *
 * @param {string} path - значение атрибута path в cookie
 * @param {string} domain - значение атрибута domain в cookie
 * @param {boolean} secure - если передается значение true, устанавливается атрибут secure в cookie-файле
 */
Cookie.prototype.remove = function(path, domain, secure) {
    for (var prop in this) {
        if ((prop.charAt(0) != "$") && ((typeof prop) != "function")) {
            delete this[prop];
        }
    }

    this.store(0, path, domain, secure);
};

/**
 * Статический метод определяет, разрешено ли использование cookies в браузере
 *
 * @return {boolean}
 */
Cookie.enabled = function() {
    if (navigator.cookieEnabled != undefined) return navigator.cookieEnabled;
    if (Cookie.enabled.cache != undefined) return Cookie.enabled.cache;

    document.cookie = "testcookie=test; max-age=10000";

    var cookies = document.cookie;
    if (cookies.indexOf("testcookie=test") == -1) {
        return Cookie.enabled.cache = false;
    } else {
        document.cookie = "testcookie=test; max-age=0";
        return Cookie.enabled.cache = true;
    }
};

