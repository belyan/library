/**
 * Данная функция-конструктор создает элемент div, в котором средствами CSS
 * может быть нарисована фигура. С помощью мптодов экземпляра можно рисовать
 * линии и прямоугольники и вставлять полученные фигуры в документ.
 */
function CSSDrawing() {
    var d = this.div = document.createElement("div");
    var next;

    if (arguments.length >= 4 && typeof arguments[3] == "number") {
        d.style.position = "absolute";
        d.style.left = arguments[0] + "px";
        d.style.top = arguments[1] + "px";
        d.style.width = arguments[2] + "px";
        d.style.height = arguments[3] + "px";
        next = 4;
    } else {
        d.style.position = "relative";
        d.style.width = arguments[0] + "px";
        d.style.height = arguments[1] + "px";
        next = 2;
    }

    if (arguments[next]) d.className = arguments[next];
    if (arguments[next + 1]) d.id = arguments[next + 1];
}

/**
 * Добавляет к рисунку прямоугольник
 */
CSSDrawing.prototype.box = function(x, y, w, h, content, classname, id) {
    var d = document.createElement("div");
    if (classname) d.className = classname;
    if (id) d.id = id;
    d.style.position = "absolute";
    d.style.left = x + "px";
    d.style.top = y + "px";
    d.style.width = w + "px";
    d.style.height = h + "px";
    d.innerHTML = content;
    this.div.appendChild(d);
    return d;
};

/**
 * Добавляет к рисунку горизонтальную линию
 */
CSSDrawing.prototype.horizontal = function(x, y, width, classname, id) {
    var d = document.createElement("div");
    if (classname) d.className = classname;
    if (id) d.id = id;
    d.style.position = "absolute";
    d.style.left = x + "px";
    d.style.top = y + "px";
    d.style.width = width + "px";
    d.style.height = 1 + "px";
    d.style.borderLeftWidth = d.style.borderRightWidth = d.style.borderBottomWidth = "0px";
    this.div.appendChild(d);
    return d;
};

/**
 * Добавляет к рисунку вертикальную линию
 */
CSSDrawing.prototype.vertical = function(x, y, height, classname, id) {
    var d = document.createElement("div");
    if (classname) d.className = classname;
    if (id) d.id = id;
    d.style.position = "absolute";
    d.style.left = x + "px";
    d.style.top = y + "px";
    d.style.width = 1 + "px";
    d.style.height = height + "px";
    d.style.borderRightWidth = d.style.borderBottomWidth = d.style.borderTopWidth = "0px";
    this.div.appendChild(d);
    return d;
};

/**
 * Вставляет рисунок в документ как дочерний элемент указанного контейнера
 */
CSSDrawing.prototype.insert = function(container) {
    if (typeof container == "string") container = document.getElementById(container);
    container.appendChild(this.div);
};

/**
 * Вставляет рисунок в документ, замещяя указанный элемент
 */
CSSDrawing.prototype.replace = function(elem) {
    if (typeof elem == "string") elem = document.getElementById(elem);
    elem.parentNode.replaceChild(this.div, elem);
};