import setData from './setData';
import draw from './draw';
import operation from './operation';
import select from './select';
import drawCsi from './drawCsi';
import update from './update';
import Depth from './Depth';
function KLine(ele, option) {
    if (option === undefined || option === null) {
        option = {};
    }
    this.ele = ele;
    this.setOption(option);
    this.operation();
}

KLine.prototype = {
    setOption,
    init,
    operation,
    setData,
    draw,
    drawCsi,
    select,
    setDP,
    getMousePos,
    isInLineView,
    update,
};

// 获取鼠标在canvas上的坐标点
function getMousePos(e) {
    let rect = e.target.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * this.dpr,
        y: (e.clientY - rect.top) * this.dpr
    };
}

// 判断鼠标是否在${this.views}中
function isInLineView(pos) {
    const { x, y } = pos;
    const view1 = this.views[0];
    const view2 = this.views[2];
    if (x >= view1.x && x < view1.x + view1.w && y >= view1.y && y < view1.y + view1.h) {
        return 0;
    } else if (x >= view2.x && x < view2.x + view2.w && y >= view2.y && y < view2.y + view2.h) {
        return 1;
    } else {
        return false;
    }
}

// 控制小数位数
function setDP(num) {
    return Math.abs(num) > 1 ? Number(num.toFixed(2)) : Number(num.toFixed(7));
}

function setOption(option) {
    // 配置项
    if (this.option) {
        this.option = {
            theme: option.theme || this.option.theme,
            width: option.width || this.option.width,
            height: option.height || this.option.height,
            yAxisWidth: option.yAxisWidth || this.option.yAxisWidth,
            fontSize: option.fontSize || this.option.fontSize,
            csi: option.csi || this.option.csi,
            csi2: option.csi2 || this.option.csi2,
            timeFilter: option.timeFilter || this.option.timeFilter,
            priceFilter: option.priceFilter || this.option.priceFilter,
            overTimeFilter: option.overTimeFilter || this.option.overTimeFilter,
            overYFilter: option.overYFilter || this.option.overYFilter,
        };
    } else {
        this.option = {
            theme: option.theme || 'dark',
            width: option.width,
            height: option.height,
            yAxisWidth: option.yAxisWidth || 140,
            fontSize: option.fontSize || 12,
            csi: option.csi || 'ema',
            csi2: option.csi2 || ['volume'],
            timeFilter: option.timeFilter || (t => {
                return new Date(t * 1000).toLocaleDateString();
            }),
            priceFilter: option.priceFilter || (d => {
                return Number(d.toFixed(2));
            }),
            overTimeFilter: option.overTimeFilter || (t => {
                return new Date(t * 1000).toLocaleTimeString();
            }),
            overYFilter: option.overYFilter || (d => {
                return Number(d.toFixed(2));
            }),
        };
    }
    this.init();
}

function init() {
    let flag = true;
    this.device = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) ? 'mb' : 'pc';
    this.dpr = 2;
    const ele = this.ele;
    ele.style.fontSize = this.option.fontSize + 'px';
    this.ele = ele;

    var width = this.option.width * this.dpr;
    var height = this.option.height * this.dpr;
    // canvas宽度
    this.width = width;
    // canvas高度
    this.height = height;
    ele.style.width = width / this.dpr + 'px';
    ele.style.height = height / this.dpr + 'px';
    ele.style.position = 'relative';

    var canvas = this.canvas || document.createElement('canvas');
    if (!this.canvas) {
        ele.appendChild(canvas);
        flag = false;
    }
    // 渲染canvas
    this.canvas = canvas;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';

    var overCanvas = this.overCanvas || document.createElement('canvas');
    if (!this.overCanvas) {
        ele.appendChild(overCanvas);
    }
    // 覆盖层canvas
    this.overCanvas = overCanvas;
    overCanvas.width = width;
    overCanvas.height = height;
    overCanvas.style.width = '100%';
    overCanvas.style.height = '100%';
    overCanvas.style.position = 'absolute';

    // 渲染上下文对象
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    this.ctx.font = this.option.fontSize * this.dpr + 'px sans-serif';
    // 覆盖层的渲染上下文对象
    const overCtx = overCanvas.getContext('2d');
    this.overCtx = overCtx;
    this.overCtx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    // 上下画图区域高度比
    if (this.option.csi2.length == 1) {
        this.split = [7, 3];
    } else {
        this.split = [10, 0];
    }
    const yAxisWidth = this.option.yAxisWidth;

    const left = 20;
    const right = 20;
    const top = 40 * this.dpr;
    const bottom = 100;
    const middle = 20;
    let view1 = {
        x: left,
        y: top,
        w: width - yAxisWidth - left - right - middle,
        h: (height - top - bottom) * (this.split[0] / (this.split[0] + this.split[1])) - middle * 0.5,
    };
    let view2 = {
        x: view1.w + view1.x + middle,
        y: view1.y,
        w: yAxisWidth,
        h: view1.h,
    };
    let view3 = {
        x: view1.x,
        y: view1.y + view1.h + middle,
        w: view1.w,
        h: (height - top - bottom) * (this.split[1] / (this.split[0] + this.split[1])) + middle * 0.5,
    };
    let view4 = {
        x: view2.x,
        y: view3.y,
        w: yAxisWidth,
        h: view3.h,
    };
    const views = [view1, view2, view3, view4];
    this.views = views;

    // 设置全局色彩
    const isDarkTheme = this.option.theme === 'dark';
    this.colors = {
        background: isDarkTheme ? '#2e3947' : 'white',
        timeBackground: isDarkTheme ? '#343f4d' : '#fff',
        splitLine: isDarkTheme ? 'rgb(66, 73, 82)' : '#eee',
        subline: isDarkTheme ? 'rgb(86, 93, 102)' : '#ddd',
        textColor: isDarkTheme ? '#fff' : '#333',
        currentTextColor: isDarkTheme ? 'rgb(239, 229, 46)' : 'rgb(242, 121, 53)',
        textFrameColor: isDarkTheme ? 'white' : 'black',
        greenColor: isDarkTheme ? '#3bd181' : '#48b484',
        redColor: isDarkTheme ? '#eb3f2f' : '#d64541',
        ma30Color: isDarkTheme ? 'rgb(234, 177, 103)' : 'rgb(234, 177, 103)',
        ma7Color: isDarkTheme ? 'rgb(166, 206, 227)' : 'rgb(59, 187, 59)',
        macdColor: isDarkTheme ? 'rgb(208, 146, 209)' : 'rgb(208, 146, 209)',
    };
    if (flag) {
        this.setData(this.data);
    }
}

export {
    KLine,
    Depth,
};
Depth.prototype.getMousePos = getMousePos;
Depth.prototype.setDP = setDP;
