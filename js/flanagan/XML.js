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

/**
 * Этот класс XML.Transformer инкапсулирует таблицу XSL-стилей.
 * Если параметр stylesheet представляет собой URL-адрес, выполняется
 * загрузка таблицы. Иначе предполагается, что это ссылка
 * на соответствующий DOM-объект Document.
 */
XML.Transformer = function(stylesheet) {
    if (typeof stylesheet == "string") stylesheet = XML.load(stylesheet);
    this.stylesheet = stylesheet;

    if (typeof XSLTProcessor != "undefined") {
        this.processor = new XSLTProcessor();
        this.processor.importStylesheet(this.stylesheet);
    }
};

/**
 * Это метод transform() класса XML.Transformer.
 * Выполняет преобразование указанного xml-узла с использованием
 * инкапсулированной таблицы стилей.
 * Предполагается, что в результате преобразования получается HTML-код,
 * которым следует заменить содержимое указанного элемента.
 */
XML.Transformer.prototype.transform = function(node, element) {
    if (typeof element == "string") element = document.getElementById(element);

    if (this.processor) {
        var fragment = this.processor.transformToFragment(node, document);
        element.innerHTML = "";
        element.appendChild(fragment);
    } else if ("transformNode" in node) {
        element.innerHTML = node.transformNode(this.stylesheet);
    } else {
        throw "XSLT не поддерживается в этом браузере";
    }
};

/**
 * Эта вспомогательная функция, выполняющая XSLT-преобразование,
 * может быть удобна, когда таблица стилей должна использоваться всего один раз.
 */
XML.transform = function(xmldoc, stylesheet, element) {
    var transformer = new XML.Transformer(stylesheet);
    transformer.transform(xmldoc, element);
};

/**
 * XML.XPathExpression – это класс, инкапсулирующий XPath-запрос
 * и ассоциированное с ним отображение префикса пространства имен в URL.
 * После того как объект XML.XPathExpression создан, он может
 * использоваться для многократного выполнения выражения (в одном
 * или более контекстах) посредством методов getNode() и getNodes().
 */
XML.XPathExpression = function(xpathText, namespaces) {
    this.xpathText = xpathText;

    if (document.createExpression) {
        this.xpathExpr = document.createExpression(xpathText, function(prefix) {
            return namespaces[prefix];
        });
    } else {
        this.namespaceString = "";
        if (namespaces != null) {
            for (var prefix in namespaces) {
                if (this.namespaceString) this.namespaceString += " ";
                this.namespaceString += "xmlns:" + prefix + "=\"" + namespaces[prefix] + "\"";
            }
        }
    }
};

/**
 * Метод getNodes() класса XML.XPathExpression. Он выполняет XPath-выражение
 * в указанном контексте. Аргумент context должен быть объектом Document
 * или Element. Возвращаемое значение  массив или объект, похожий на массив,
 * где содержатся узлы, соответствующие выражению.
 */
XML.XPathExpression.prototype.getNodes = function(context) {
    if (this.xpathExpr) {
        var result = this.xpathExpr.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var a = new Array(result.snapshotLength);
        for (var i = 0; i < result.snapshotLength; i++) {
            a[i] = result.snapshotItem(i);
        }
        return a;
    } else {
        try {
            var doc = context.ownerDocument;
            if (doc == null) doc = context;
            doc.setProperty("SelectionLanguage", "Xpath");
            doc.setProperty("SelectionNamespaces", this.namespaceString);
            if (context == doc) context = doc.documentElement;
            return context.selectNodes(this.xpathText);
        } catch(e) {
            throw "XPath не поддерживается этим браузером.";
        }
    }
};

/**
 * Метод getNode() класса XML.XPathExpression. Он выполняет XPath-выражение
 * в заданном контексте и возвращает единственный узел, соответствующий
 * выражению (или null, если совпадений не найдено). Если обнаружено
 * более одного совпадения, метод возвращает первое из них.
 */
XML.XPathExpression.prototype.getNode = function(context) {
    if (this.xpathExpr) {
        var result = this.xpathExpr.evaluate(context, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    } else {
        try {
            var doc = context.ownerDocument;
            if (doc == null) doc = context;
            doc.setProperty("SelectionLanguage", "Xpath");
            doc.setProperty("SelectionNamespaces", this.namespaceString);
            if (context == doc) context = doc.documentElement;
            return context.selectSingleNode(this.xpathText);
        } catch(e) {
            throw "XPath не поддерживается этим браузером.";
        }
    }
};

XML.getNodes = function(context, xpathExpr, namespaces) {
    return (new XML.XPathExpression(xpathExpr, namespaces)).getNodes(context);
};

XML.getNode = function(context, xpathExpr, namespaces) {
    return (new XML.XPathExpression(xpathExpr, namespaces)).getNode(context);
};