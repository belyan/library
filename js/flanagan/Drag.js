/**
 * Drag.js
 *
 * Данный модуль определяет единственную функцию drag(), которая предназначена
 * для вызова из обработчика события onmousedown. Последующие события mousemove будут вызывать
 * перемещение заданного элемента.
 * Событие mouseup завершит операцию перетаскивания.
 * Если элемент перемещается за пределы экрана, окно прокручиваться не будет.
 */
function drag(elementToDrag, event) {
    var startX = event.clientX, startY = event.clientY;
    var origX = elementToDrag.offsetLeft, origY = elementToDrag.offsetTop;
    var deltaX = startX - origX, deltaY = startY - origY;

    if (document.addEventListener) {
        document.addEventListener("mousemove", moveHandler, true);
        document.addEventListener("mouseup", upHandler, true);
    } else if (document.attachEvent) {
        elementToDrag.setCapture();
        elementToDrag.attachEvent("onmousemove", moveHandler);
        elementToDrag.attachEvent("onmouseup", upHandler);

        elementToDrag.attachEvent("onlosecapture", upHandler);
    } else {
        var oldmovehandler = document.onmousemove;
        var olduphandler = document.onmouseup;

        document.onmousemove = moveHandler;
        document.onmouseup = upHandler;
    }

    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }

    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }

    function moveHandler(e) {
        if (!e) e = window.event;

        elementToDrag.style.left = (e.clientX - deltaX) + "px";
        elementToDrag.style.top = (e.clientY - deltaY) + "px";

        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    function upHandler(e) {
        if (!e) e = window.event;

        if (document.removeEventListener) {
            document.removeEventListener("mouseup", upHandler, true);
            document.removeEventListener("mousemove", moveHandler, true);
        } else if (document.detachEvent) {
            elementToDrag.detachEvent("onlosecapture", upHandler);
            elementToDrag.detachEvent("onmouseup", upHandler);
            elementToDrag.detachEvent("onmousemove", moveHandler);
            elementToDrag.releaseCapture();
        } else {
            document.onmouseup = olduphandler;
            document.onmousemove = oldmovehandler;
        }

        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
}