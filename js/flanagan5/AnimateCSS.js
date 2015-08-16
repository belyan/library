/**
 * AnimateCSS.js
 * @param element - Анимируемый HTML-элемент
 * @param numFrames - Общее число кадров в анимации
 * @param timePerFrame - Количество миллисекунд отображения каждого кадра
 * @param animation - Объект, определяющий анимацию
 * @param [whendone] - Необязательная функция, вызываемая по завершении анимации
 */
function animateCSS(element, numFrames, timePerFrame, animation, whendone) {
    var frame = 0;
    var time = 0;

    var intervalId = setInterval(displayNextFrame, timePerFrame);

    function displayNextFrame() {
        if (frame >= numFrames) {
            clearInterval(intervalId);
            if (whendone) whendone(element);
            return;
        }

        for (var cssprop in animation) {
            try {
                element.style[cssprop] = animation[cssprop](frame, time);
            } catch(e) {}
        }

        frame++;
        time += timePerFrame;
    }
}