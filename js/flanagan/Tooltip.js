/**
 * Tooltip.js
 *
 * Этот модуль определяет класс Tooltip. Объекты класса Tooltip создаются с помощью конструктора Tooltip().
 * После этого подсказку можно сделать видимой вызовом метода show().
 * Чтобы скрыть подсказку следует вызвать метод hide().
 *
 */
function Tooltip() {
    this.tooltip = document.createElement("div");
    this.tooltip.style.position = "absolute";
    this.tooltip.style.visibility = "hidden";
    this.tooltip.className = "tooltipShadow";

    this.content = document.createElement("div");
    this.content.style.position = "relative";
    this.content.className = "tooltipContent";

    this.tooltip.appendChild(this.content);
}

Tooltip.prototype.show = function(text, x, y) {
    this.content.innerHTML = text;
    this.tooltip.style.left = x + "px";
    this.tooltip.style.top = y + "px";
    this.tooltip.style.visibility = "visible";

    if (this.tooltip.parentNode != document.body) {
        document.body.appendChild(this.tooltip);
    }
};

Tooltip.prototype.hide = function() {
    this.tooltip.style.visibility = "hidden";
};