import setOption from './setOption';
import setData from './setData';
import draw from './draw';
import drawMain from './drawMain';
import drawAid from './drawAid';
import drawTimeline from './drawTimeline';
import operation, { drawHairLine } from './operation';
import select from './select';
import { moveRange, scaleRange } from './range';
import computAxis from './computAxis';
import canDraw from './canDraw';
import Depth from './Depth';
import drawLines from './tools/drawLines';
import drawLineCache from './tools/drawLineCache';
import ParallelSegment from './tools/ParallelSegment';

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
    drawHairLine,
    drawTimeline,
    drawLines,
    drawLineCache,
    operation,
    select,
    getMousePos,
    setDP,
    isInLineView,
    moveRange,
    scaleRange,
    canDraw,
    computAxis,
    forceUpdate: function(canvasCanDraw, overCanvasCanDraw) {
        this.force = [canvasCanDraw || this.force[0], overCanvasCanDraw || this.force[1]];
    },
    string: function(num) {
        if (Math.abs(num) > 0.000001) {
            return num;
        }
        let length = num.toFixed(20).match(/([1-9]*)(0*)$/)[2].length;
        return num.toFixed(20 - length);
    },
    beginDrawLine: function(type) {
        if (type === 'parallelsegment') {
            this.lineCache = new ParallelSegment(this.overCtx, this.colors);
        }
    },
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
function setDP(num, priceDecimal) {
    if (priceDecimal) {
        return parseFloat(num.toFixed(priceDecimal));
    }
    let n = /(\d*).(0*)(\d*)$/.exec(num.toFixed(20))[2].length;
    if (n > 17) {
        return parseFloat(num.toFixed(20));
    } else {
        return parseFloat(num.toFixed(n + 3));
    }
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
