import setOption from './setOption';
import setData from './setData';
import draw from './draw';
import drawMain from './drawMain';
import drawAid from './drawAid';
import operation from './operation';
import { moveRange, scaleRange } from './range';
import computAxis from './computAxis';

export function KLine(canvas, overCanvas, option) {
    this.width = canvas.width;
    this.height = canvas.height;
    if (this.width !== overCanvas.width || this.height !== overCanvas.height) {
        console.log('Two canvas\'s width and height must equal');
        return;
    }
    this.ctx = canvas.getContext('2d');
    this.overCtx = overCanvas.getContext('2d');
    this.dpr = canvas.width / canvas.getBoundingClientRect().width;
    this.setOption(option);
    this.operation(canvas, overCanvas);
}

KLine.prototype = {
    setOption,
    setData,
    draw,
    drawMain,
    drawAid,
    operation,
    getMousePos,
    setDP,
    isInLineView,
    moveRange,
    scaleRange,
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

// 判断鼠标是否在${this.views}中
function isInLineView(pos) {
    const { x, y } = pos;
    const view1 = this.mainView;
    const view2 = this.aidView;
    if (x >= view1.x && x < view1.x + view1.w && y >= view1.y && y < view1.y + view1.h) {
        return view1;
    } else if (x >= view2.x && x < view2.x + view2.w && y >= view2.y && y < view2.y + view2.h) {
        return view2;
    } else {
        return false;
    }
}
