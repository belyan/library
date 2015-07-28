var HTTP = {};

HTTP._factories = [
    function() { return new XMLHttpRequest(); },
    function() { return new ActiveXObject("Msxml2.XMLHTTP") },
    function() { return new ActiveXObject("Microsoft.XMLHTTP") }
];

HTTP._factory = null;

/**
 * Создает и возвращает новый объект XMLHttpRequest
 */
HTTP.newRequest = function() {
    if (HTTP._factory != null) return HTTP._factory();

    for (var i = 0; i < HTTP._factories.length; i++) {
        try {
            var factory = HTTP._factories[i];
            var request = factory();
            if (request != null) {
                HTTP._factory = factory;
                return request;
            }
        } catch(e) {
            continue;
        }
    }

    HTTP._factory = function() {
        throw new Error("Объект XMLHttpRequest не поддерживается");
    };
    HTTP._factory();
};

/**
 * Принимает ответ в виде простого текста и передает его указанной функции
 */
HTTP.getText = function(url, callback) {
    var request = HTTP.newRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };

    request.open("GET", url);
    request.send(null);
};

/**
 * Принимает XML-документ и передает его функции обратного вызова
 */
HTTP.getXML = function(url, callback) {
    var request = HTTP.newRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseXML);
        }
    };

    request.open("GET", url);
    request.send(null);
};

/**
 * Использует HTTP-запрос HEAD для получения заголовков с указанного URL-адреса
 */
HTTP.getHeaders = function(url, callback, errorHandler) {
    var request = HTTP.newRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(HTTP.parseHeaders(request));
            } else {
                if (errorHandler) {
                    errorHandler(request.status, request.statusText);
                } else {
                    callback(null);
                }
            }
        }
    };

    request.open("HEAD", url);
    request.send(null);
};

/**
 * Анализирует заголовки ответа, полученные в XMLHttpRequest, и возвращает
 * имена и значения в виде свойств нового объекта
 */
HTTP.parseHeaders = function(request) {
    var headerText = request.getAllResponseHeaders();
    var headers = {};
    var ls = /^\s*/;
    var ts = /\s*$/;

    var lines = headerText.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.length == 0) continue;
        var pos = line.indexOf(":");
        var name = line.substring(0, pos).replace(ls, "").replace(ts, "");
        var value = line.substring(pos + 1).replace(ls, "").replace(ts, "");
        headers[name] = value;
    }

    return headers;
};

/**
 * Отправляет HTTP-запрос POST по указанному URL-адресу,
 * используя имена и значения свойств объекта в качестве тела запроса.
 */
HTTP.post = function(url, values, callback, errorHandler) {
    var request = HTTP.newRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(HTTP._getResponse(request));
            } else {
                if (errorHandler) {
                    errorHandler(request.status, request.statusText);
                } else {
                    callback(null);
                }
            }
        }
    };

    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(HTTP.encodeFormData(values));
};

/**
 * Интерпретирирует имена и значения свойств объекта, как елси бы они были
 * значениями элементов формы, использует формат application/x-www-form-urlencoded
 */
HTTP.encodeFormData = function(data) {
    var pairs = [];
    var regexp = /%20/g;

    for (var name in data) {
        var value = data[name].toString();
        var pair = encodeURIComponent(name).replace(regexp, "+") + "=" +
            encodeURIComponent(value).replace(regexp, "+");
        pairs.push(pair);
    }

    return pairs.join("&");
};

HTTP._getResponse = function(request) {
    switch (request.getResponseHeader("Content-Type")) {
        case "text/xml":
            return request.responseXML;
        case "text/json":
        case "text/javascript":
        case "application/javascript":
        case "application/x-javascript":
            return eval(request.responseText);
        default:
            return request.responseText;
    }
};

/**
 * Отправляет HTTP-запрос GET с заданным URL. В случае успешного
 * получения ответа он преобразуется в объект на основе заголовка
 * Content-Type и передается указанной функции обратного вызова.
 * Дополнительные аргументы могут быть переданы в виде свойств объекта options.
 */
HTTP.get = function(url, callback, options) {
    var request = HTTP.newRequest();
    var n = 0;
    var timer;

    if (options.timeout) {
        timer = setTimeout(function() {
            request.abort();
            if (options.timeoutHandler) {
                options.timeoutHandler(url);
            }
        }, options.timeout);
    }

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (timer) clearTimeout(timer);
            if (request.status == 200) {
                callback(HTTP._getResponse(request));
            } else {
                if (options.errorHandler) {
                    options.errorHandler(request.status, request.statusText);
                } else {
                    callback(null);
                }
            }
        } else if (options.progressHandler) {
            options.progressHandler(++n);
        }
    };

    var target = url;
    if (options.parameters) {
        target += "?" + HTTP.encodeFormData(options.parameters);
    }

    request.open("GET", target);
    request.send(null);
};