/**
 * ImageLoop.js Класс ImageLoop для создания эффекта анимации
 *
 * @param imageId - идентификатор тега <img>, в котором воспроизводится анимация
 * @param fps - количество кадров в секунду
 * @param frameURLs - массив URL-адресов, по одному на каждый кадр в анимации
 */
function ImageLoop(imageId, fps, frameURLs) {
    this.imageId = imageId;
    this.frameInterval = 1000 / fps;
    this.frames = new Array(frameURLs.length);

    this.image = null;
    this.loaded = false;
    this.loadedFrames = 0;
    this.startOnLoad = false;
    this.frameNumber = 1;
    this.timer = null;

    for (var i = 0; i < frameURLs.length; i++) {
        this.frames[i] = new Image();
        this.frames[i].onload = countLoadedFrames;
        this.frames[i].src = frameURLs[i];
    }

    var loop = this;

    function countLoadedFrames() {
        loop.loadedFrames++;
        if (loop.loadedFrames == loop.frames.length) {
            loop.loaded = true;
            if (loop.startOnLoad) loop.start();
        }
    }

    this._displayNextFrame = function() {
        loop.frameNumber = (loop.frameNumber + 1) % loop.frames.length;
        loop.image.src = loop.frames[loop.frameNumber].src;
    };
}

/**
 * Этот метод начинает анимацию ImageLoop. Если загрузка кадров еще не закончилась,
 * он просто взводит флаг, в результате чего анимация начинается автоматически по окончании загрузки
 */
ImageLoop.prototype.start = function() {
    if (this.timer != null) return;
    if (!this.loaded) {
        this.startOnLoad = true;
    } else {
        if (!this.image) this.image = document.getElementById(this.imageId);
        this._displayNextFrame();
        this.timer = setInterval(this._displayNextFrame, this.frameInterval);
    }
};

/**
 * метод останавливает анимацию ImageLoop
 */
ImageLoop.prototype.stop = function() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
};