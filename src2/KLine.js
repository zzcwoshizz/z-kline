import setOption from './setOption';

export function KLine(canvas, overCanvas, option) {
    this.width = canvas.width;
    this.height = canvas.height;
    if (this.width !== overCanvas.width || this.height !== overCanvas.height) {
        console.log('Two canvas\'s width and height must equal');
        return;
    }
    this.setOption(option);
}

KLine.prototype = {
    setOption,
};
