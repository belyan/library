/**
 * Рисует круговую диаграмму внутри элемента <svg>
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

    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data[i];
    }

    var angles = [];
    for (i = 0; i < data.length; i++) {
        angles[i] = data[i] / total * Math.PI * 2;
    }

    var startangle = 0;
    for (i = 0; i < data.length; i++) {
        var endangle = startangle + angles[i];

        var x1 = cx + r * Math.sin(startangle);
        var y1 = cy - r * Math.cos(startangle);
        var x2 = cx + r * Math.sin(endangle);
        var y2 = cy - r * Math.cos(endangle);

        var big = 0;
        if (endangle - startangle > Math.PI) big = 1;

        var path = document.createElementNS(SVG.ns, "path");
        var d = "M " + cx + "," + cy + " L " + x1 + "," + y1 + " A " + r + "," +
            r + " 0 " + big + " 1 " + x2 + "," + y2 + " Z";

        path.setAttribute("d", d);
        path.setAttribute("fill", colors[i]);
        path.setAttribute("stroke", "black");
        path.setAttribute("stroke-width", "2");

        canvas.appendChild(path);
        startangle = endangle;

        var icon = document.createElementNS(SVG.ns, "rect");
        icon.setAttribute("x", lx);
        icon.setAttribute("y", ly + 30 * i);
        icon.setAttribute("width", "20");
        icon.setAttribute("height", "20");
        icon.setAttribute("fill", colors[i]);
        icon.setAttribute("stroke", "black");
        icon.setAttribute("stroke-width", "2");

        canvas.appendChild(icon);

        var label = document.createElementNS(SVG.ns, "text");
        label.setAttribute("x", lx + 30);
        label.setAttribute("y", ly + 30 * i + 18);
        label.setAttribute("font-family", "sans-serif");
        label.setAttribute("font-size", "16");
        label.appendChild(document.createTextNode(labels[i]));

        canvas.appendChild(label);
    }
}