/**
 * BarChart.js
 *
 * В этом файле содержится определение функции makeBarChart(), которая
 * создает гистрограмму для вывода содержимого массива data[]
 */
function makeBarChart(data, width, height, barColor) {
    if (!width) width = 500;
    if (!height) height = 350;
    if (!barColor) barColor = "blue";

    width -= 24; // 10px отступа сдева и справа и 2px толщины рамки слева и справа
    height -= 14; // 10px отступа сверху и 2px толщины рамки сверху и снизу

    var chart = document.createElement("div");
    chart.style.position = "relative";
    chart.style.width = width + "px";
    chart.style.height = height + "px";
    chart.style.border = "solid black 2px";
    chart.style.paddingLeft = "10px";
    chart.style.paddingRight = "10px";
    chart.style.paddingTop = "10px";
    chart.style.paddingBottom = "0px";
    chart.style.backgroundColor = "white";

    var barwidth = Math.floor(width / data.length);
    var maxdata = Math.max.apply(this, data);
    var scale = height / maxdata;

    for (var i = 0; i < data.length; i++) {
        var bar = document.createElement("div");
        var barheight = data[i] * scale;
        bar.style.position = "absolute";
        bar.style.left = (barwidth * i + 1 + 10) + "px";
        bar.style.top = height - barheight + 10 + "px";
        bar.style.width = (barwidth - 2) + "px";
        bar.style.height = (barheight - 1) + "px";
        bar.style.border = "solid black 1px";
        bar.style.backgroundColor = barColor;
        bar.style.fontSize = "0px";
        chart.appendChild(bar);
    }

    return chart;
}