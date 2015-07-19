/**
 * Keymap.js
 *
 * Этот модуль определяет класс Keymap. Экземпляр этого класса представляет
 * собой отображение идентификаторов комбинаций клавиш (определяемых далее)
 * на функции-обработчики. Объект Keymap может устанавливаться в HTML-элемент
 * для обработки событий keydown и keypress. Когда возникает такое событие,
 * объект с помощью карты отображения комбинаций вызывает соответствующую
 * функцию-обработчик.
 */
function Keymap(bindings) {
    this.map = {};
    if (bindings) {
        for (name in bindings) {
            this.map[name.toLowerCase()] = bindings[name];
        }
    }
}

Keymap.prototype.bind = function(key, func) {
    this.map[key.toLowerCase()] = func;
};

Keymap.prototype.unbind = function(key) {
    delete this.map[key.toLowerCase()];
};

Keymap.prototype.install = function(element) {
    var keymap = this;

    function handler(event) {
        return keymap.dispatch(event);
    }

    if (element.addEventListener) {
        element.addEventListener("keydown", handler, true);
        element.addEventListener("keypress", handler, true);
    } else if (element.attachEvent) {
        element.attachEvent("onkeydown", handler);
        element.attachEvent("onkeypress", handler);
    } else {
        element.onkeydown = element.onkeypress = handler;
    }
};

Keymap.keyCodeToFunctionKey = {
    8: "backspace",
    9: "tab",
    13: "return",
    19: "pause",
    27: "escape",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    44: "printscreen",
    45: "insert",
    46: "delete",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scrolllock"
};

Keymap.keyCodeToPrintableChar = {
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    59: ";",
    61: "=",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    107: "+",
    109: "-",
    110: ".",
    188: ",",
    190: ".",
    191: "/",
    192: "'",
    219: "[",
    220: "\\",
    221: "]",
    222: "\""
};

Keymap.prototype.dispatch = function(event) {
    var e = event || window.event;
    var modifiers = "";
    var keyname = null;

    if (e.type == "keydown") {
        var code = e.keyCode;
        if (code == 16 || code == 17 || code == 18) return;

        keyname = Keymap.keyCodeToFunctionKey[code];
        if (!keyname && (e.altKey || e.ctrlKey)) {
            keyname = Keymap.keyCodeToPrintableChar[code];
        }

        if (keyname) {
            if (e.altKey) modifiers += "alt_";
            if (e.ctrlKey) modifiers += "ctrl_";
            if (e.shiftKey) modifiers += "shift_";
        } else {
            return;
        }
    } else if (e.type == "keypress") {
        if (e.altKey || e.ctrlKey) return;
        if (e.charCode != undefined && e.charCode == 0) return;

        var code = e.charCode || e.keyCode;
        keyname = String.fromCharCode(code);

        var lowercase = keyname.toLowerCase();
        if (keyname != lowercase) {
            keyname = lowercase;
            modifiers = "shift_";
        }
    }

    var func = this.map[modifiers + keyname];

    if (!func) func = this.map["default"];
    if (func) {
        var target = e.target;
        if (!target) target = e.srcElement;

        func(target, modifiers + keyname, e);

        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }

        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        return false;
    }
};