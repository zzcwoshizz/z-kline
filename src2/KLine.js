import setOption from './setOption';
import setData from './setData';
import draw from './draw';
import drawMain from './drawMain';
import drawAid from './drawAid';
import operation from './operation';
import select from './select';
import { moveRange, scaleRange } from './range';
import computAxis from './computAxis';
import canDraw from './canDraw';
import Depth from './Depth';

export function KLine(canvas, overCanvas, option) {
    this.canvas = canvas;
    this.overCanvas = overCanvas;
    if (canvas.width !== overCanvas.width || canvas.height !== overCanvas.height) {
        console.log('Two canvas\'s width and height must equal');
        return;
    }
    this.ctx = canvas.getContext('2d');
    this.overCtx = overCanvas.getContext('2d');
    this.dpr = canvas.width / canvas.getBoundingClientRect().width;
    this.setOption(option);
    this.draw();
    this.operation(canvas, overCanvas);
}

KLine.prototype = {
    setOption,
    setData,
    draw,
    drawMain,
    drawAid,
    operation,
    select,
    getMousePos,
    setDP,
    isInLineView,
    moveRange,
    scaleRange,
    canDraw,
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
    return Math.abs(num) > 0.1 ? Number(num.toFixed(2)) : Number(num.toFixed(7));
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

Depth.prototype.getMousePos = getMousePos;
Depth.prototype.setDP = setDP;

export {
    Depth
};
