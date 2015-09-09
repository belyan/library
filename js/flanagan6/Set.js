/**
 * Set.js: произвольное множество значений
 */
function Set() {
    this.values = {};
    this.n = 0;

    // Перегрузка конструктора
    if (arguments.length == 1 && Array.isArray(arguments[0])) {
        this.add.apply(this, arguments[0]);
    } else if (arguments.length > 0) {
        this.add.apply(this, arguments);
    }
}

/**
 * Добавляет все аргументы в множество
 */
Set.prototype.add = function() {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._v2s(val);
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this;
};

/**
 * Удаляет все аргументы из множества
 */
Set.prototype.remove = function() {
    for (var i = 0; i < arguments.length; i++) {
        var str = Set._v2s(arguments[i]);
        if (this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

/**
 * Проверяет значение value на вхождение в множество
 */
Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(Set._v2s(value));
};

/**
 * Возвращает размер множества
 */
Set.prototype.size = function() {
    return this.n;
};

/**
 * Вызывает функцию f в указанном контексте для каждого элемента множества
 */
Set.prototype.foreach = function(f, context) {
    for (var s in this.values) {
        if (this.values.hasOwnProperty(s)) {
            f.call(context, this.values[s]);
        }
    }
};

/**
 * Проверяет равенство с заданным множеством
 */
Set.prototype.equals = function(that) {
    if (this === that) return true;
    if (!(that instanceof Set)) return false;
    if (this.size() != that.size()) return false;
    try {
        this.foreach(function(v) { if (!that.contains(v)) throw false; });
        return true;
    } catch(x) {
        if (x === false) return false;
        throw x;
    }
};

/**
 * Преобразует любые значения в уникальные строки
 */
Set._v2s = function(val) {
    switch(val) {
        case undefined: return "u";
        case null: return "n";
        case true: return "t";
        case false: return "f";
        default: switch(typeof val) {
            case "number": return "#" + val;
            case "string": return "@" + val;
            default: return "$" + objectId(val);
        }
    }

    function objectId(o) {
        var prop = "__id__";
        if (!o.hasOwnProperty(prop)) {
            o[prop] = Set._v2s.next++;
        }
        return o[prop];
    }
};

Set._v2s.next = 100;
