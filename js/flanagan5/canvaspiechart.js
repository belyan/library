/**
 * Рисует круговую диаграмму в указанном теге <canvas>
 *
 * @param {(object|string)} canvas - SVG-элемент для рисования
 * @param {number[]} data - массив значений для диаграммы, по одному для каждого сектора
 * @param {number} cx
 * @param {number} cy
 * @param {number} r - координаты центра и радиус круга
 * @param {string[]} colors - массив HTML-строк цветов, по одному на каждый сектор
 * @param {string[]} labels - массив меток легенды, по одной на каждый сектор
 * @param {number} lx
 * @param {number} ly - координаты верхнего левого угла легенды диаграммы
 */
function pieChart(canvas, data, cx, cy, r, colors, labels, lx, ly) {
    if (typeof canvas == "string") canvas = document.getElementById(canvas);

    var g = canvas.getContext("2d");
    g.lineWidth = 2;
    g.strokeWidth = "black";

    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i];
    }

    var angles = [];
    for (i = 0; i < data.length; i++) {
        angles[i] = data[i] / total * Math.PI * 2;
    }

    var startangle = -Math.PI / 2;
    for (i = 0; i < data.length; i++) {
        var endangle = startangle + angles[i];

        g.beginPath();
        g.moveTo(cx, cy);
        g.arc(cx, cy, r, startangle, endangle, false);
        g.closePath();
        g.fillStyle = colors[i];
        g.fill();
        g.stroke();

        startangle = endangle;

        g.fillRect(lx, ly + 30 * i, 20, 20);
        g.strokeRect(lx, ly + 30 * i, 20, 20);

        var label = document.createElement("div");
        label.style.position = "absolute";
        label.style.left = (canvas.offsetLeft + lx + 30) + "px";
        label.style.top = (canvas.offsetTop + ly + 30 * i + 4) + "px";
        label.style.fontFamily = "sans-serif";
        label.style.fontSize = "16px";
        label.appendChild(document.createTextNode(labels[i]));
        document.body.appendChild(label);
    }
}