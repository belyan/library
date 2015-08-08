var XML = {};

/**
 * Создает новый объект Document. При отсутствии аргументов создает пустой
 * документ. Если указан корневой тег, документ будет содержать единственный
 * корневой тег. Если корневой тег имеет префикс пространства имен, второй аргумент
 * должен содержать URL-адрес, идентифицирующий это пространство имен.
 */
XML.newDocument = function(rootTagName, namespaceURL) {
    if (!rootTagName) rootTagName = "";
    if (!namespaceURL) namespaceURL = "";

    if (document.implementation && document.implementation.createDocument) {
        return document.implementation.createDocument(namespaceURL, rootTagName, null);
    } else {
        var doc = new ActiveXObject("MSXML2.DOMDocument");

        if (rootTagName) {
            var prefix = "";
            var tagname = rootTagName;
            var p = rootTagName.indexOf(":");

            if (p != -1) {
                prefix = rootTagName.substring(0, p);
                tagname = rootTagName.substring(p + 1);
            }

            if (namespaceURL) {
                if (!prefix) prefix = "a0";
            } else {
                prefix = "";
            }

            var text = "<" + (prefix ? prefix + ":" : "") + tagname +
                (namespaceURL ? " xmlns:" + prefix + "=\"" + namespaceURL + "\"" : "") + "/>";

            doc.loadXML(text);
        }

        return doc;
    }
};

/**
 * Синхронно загружает XML-докмуент с заданного URL-адреса
 * и возвращает его в виде объекта Document
 */
XML.load = function(url) {
    var xmldoc = XML.newDocument();

    xmldoc.async = false;
    xmldoc.load(url);
    return xmldoc;
};

/**
 * Асинхронно загружает и анализирует XML-докмуент с заданного URL-адреса.
 * Как только документ будет готов, он передается указанной функции обратного вызова.
 * Данная функция сразу же возвращает управление и не умеет возвращаемого значения.
 */
XML.loadAsync = function(url, callback) {
    var xmldoc = XML.newDocument();

    if (document.implementation && document.implementation.createDocument) {
        xmldoc.onload = function() {
            callback(xmldoc);
        };
    } else {
        xmldoc.onreadystatechange = function() {
            if (xmldoc.readyState == 4) callback(xmldoc);
        };
    }

    xmldoc.load(url);
};