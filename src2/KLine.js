import setOption from './setOption';
import setData from './setData';
import draw from './draw';
import drawMain from './drawMain';
import computAxis from './computAxis';

export function KLine(canvas, overCanvas, option) {
    this.width = canvas.width;
    this.height = canvas.height;
    if (this.width !== overCanvas.width || this.height !== overCanvas.height) {
        console.log('Two canvas\'s width and height must equal');
        return;
    }
    this.ctx = canvas.getContext('2d');
    this.overCtx = canvas.getContext('2d');
    this.dpr = canvas.width / canvas.getBoundingClientRect().width;
    this.setOption(option);
}

KLine.prototype = {
    setOption,
    setData,
    draw,
    drawMain,
    getMousePos,
    setDP,
    computAxis,
};

// 获取鼠标在canvas上的坐标点
function getMousePos(e) {
    let rect = e.target.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * this.dpr,
        y: (e.clientY - rect.top) * this.dpr
    };
}

// 控制小数位数
function setDP(num) {
    return Math.abs(num) > 0.01 ? Number(num.toFixed(2)) : Number(num.toFixed(7));
}
