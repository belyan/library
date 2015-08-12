var SVG = {};

SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";

/**
 * Создает и возвращает пустой элемент <svg>
 */
SVG.makeCanvas = function(id, pixelWidth, pixelHeight, userWidth, userHeight) {
    var svg = document.createElementNS(SVG.ns, "svg:svg");
    svg.setAttribute("id", id);
    svg.setAttribute("width", pixelWidth);
    svg.setAttribute("height", pixelHeight);
    svg.setAttribute("viewBox", "0 0 " + userWidth + " " + userHeight);
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", SVG.xlinkns);

    return svg;
};

/**
 * Сериализовать элемент "холста" в строку и использовать эту строку
 * в спецификаторе data: URL-адреса для отображения тега <object>
 */
SVG.makeDataURL = function(canvas) {
    var text = (new XMLSerializer()).serializeToString(canvas);
    var encodedText = encodeURIComponent(text);
    return "data:image/svg+xml," + encodedText;
};

/**
 * Создает тег <object> для вывода SVG-рисунка с помощью URL-адреса
 * со спецификатором data:
 */
SVG.makeObjectTag = function(canvas, width, height) {
    var object = document.createElement("object");
    object.width = width;
    object.height = height;
    object.data = SVG.makeDataURL(canvas);
    object.type = "image/svg+xml";
    return object;
};
