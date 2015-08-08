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