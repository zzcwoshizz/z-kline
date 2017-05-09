export default function resize(width, height) {
    this.width = width * this.dpr;
    this.height = height * this.dpr;

    this.ele.style.width = this.width / this.dpr + 'px';
    this.ele.style.height = this.height / this.dpr + 'px';

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    this.overCanvas.width = this.width;
    this.overCanvas.height = this.height;
    this.overCtx = this.overCanvas.getContext('2d');
    this.overCtx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    // 上下画图区域高度比
    if (this.option.csi2.length == 1) {
        this.split = [6, 4];
    } else {
        this.split = [10, 0];
    }
    const yAxisWidth = this.option.yAxisWidth;

    width = this.width;
    height = this.height;

    this.maxKLineNumber = parseInt(this.width / 2 / this.dpr) % 2 === 0 ? parseInt(this.width / 2 / this.dpr) : parseInt(this.width / 2 / this.dpr) - 1;
    this.minKLineNumber = 16;

    const left = 20;
    const right = 20;
    const top = 40 * this.dpr;
    const bottom = 100;
    const middle = 20;
    let view1 = {
        x: left,
        y: top,
        w: width - yAxisWidth - left - right - middle,
        h: height * (this.split[0] / (this.split[0] + this.split[1])) - 10,
    };
    let view2 = {
        x: view1.w + view1.x + middle,
        y: view1.y,
        w: yAxisWidth,
        h: view1.h,
    };
    let view3 = {
        x: view1.x,
        y: view1.y + view1.h + middle * 0.5,
        w: view1.w,
        h: height - view1.h - middle * 0.5 - bottom,
    };
    let view4 = {
        x: view2.x,
        y: view3.y,
        w: yAxisWidth,
        h: view3.h,
    };
    const views = [view1, view2, view3, view4];
    this.views = views;

    this.draw(true);
}
