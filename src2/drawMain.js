export default function drawMain(yaxis) {
    const ctx = this.ctx;

    const times = this.state.times;
    const timeStr = this.state.timeStr;
    const start = this.state.start;
    const hi = this.state.hi;
    const lo = this.state.lo;
    const close = this.state.close;


    const { max, min, maxPrice, maxPriceIndex, minPrice, minPriceIndex, intervalY } = yaxis;

    const mainView = this.mainView;
    const mainYaxisView = this.mainYaxisView;
    const timeView = this.timeView;

    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;

    // y轴刻度数值 y轴刻度线
    ctx.fillStyle = this.colors.textColor;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let lengthY = (max - min) / intervalY;
    for (let i = 0; i < lengthY; i++) {
        ctx.fillText((max - (i * intervalY)).toFixed(this.option.priceDecimal), mainYaxisView.x + mainYaxisView.w * 0.5, i * intervalY / (max - min) * mainYaxisView.h + mainYaxisView.y);

        let x = mainYaxisView.x;
        let y = i * intervalY / (max - min) * mainYaxisView.h + mainYaxisView.y;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    ctx.lineWidth = this.dpr;
    ctx.setLineDash([]);
    ctx.strokeStyle = this.colors.textColor;
    for (let i = 0; i < lengthY; i++) {
        let x = mainYaxisView.x;
        let y = i * intervalY / (max - min) * mainYaxisView.h + mainYaxisView.y;
        ctx.beginPath();
        ctx.moveTo(x + 10, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    // 时间轴
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 1; i < 5; i++) {
        let index = parseInt((i / 5) * verticalRectNumber + startIndex);
        if (index >= times.length) {
            break;
        }
        let x = mainView.x + mainView.w * i / 5;
        let y = timeView.y + timeView.h * 0.5;
        ctx.fillText(timeStr[index], x, y);

        ctx.beginPath();
        ctx.moveTo(x, this.height - 2);
        ctx.lineTo(x, this.height - 8);
        ctx.stroke();
    }

    // 蜡烛线
    ctx.strokeStyle = this.colors.redColor;
    ctx.fillStyle = this.colors.redColor;
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= times.length) {
            break;
        }
        if (close[i] > start[i]) {
            continue;
        }
        let x = (j + 0.1) * mainView.w / verticalRectNumber + mainView.x;
        let y = (max - Math.max(start[i], close[i])) / (max - min) * mainView.h + mainView.y;
        let w = mainView.w / verticalRectNumber * 0.8;
        let h = (Math.max(start[i], close[i]) - Math.min(start[i], close[i])) / (max - min) * mainView.h;
        ctx.fillRect(x, y, w, h < this.dpr ? this.dpr : h);
        let x1 = j * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
        let y1 = (max - hi[i]) / (max - min) * mainView.h + mainView.y;
        let x2 = x1;
        let y2 = (max - lo[i]) / (max - min) * mainView.h + mainView.y;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    ctx.strokeStyle = this.colors.greenColor;
    ctx.fillStyle = this.colors.greenColor;
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= times.length) {
            break;
        }
        if (close[i] <= start[i]) {
            continue;
        }
        let x = (j + 0.1) * mainView.w / verticalRectNumber + mainView.x;
        let y = (max - Math.max(start[i], close[i])) / (max - min) * mainView.h + mainView.y;
        let w = mainView.w / verticalRectNumber * 0.8;
        let h = (Math.max(start[i], close[i]) - Math.min(start[i], close[i])) / (max - min) * mainView.h;
        ctx.fillRect(x, y, w, h < this.dpr ? this.dpr : h);
        let x1 = j * mainView.w / verticalRectNumber + 0.5 * mainView.w / verticalRectNumber + mainView.x;
        let y1 = (max - hi[i]) / (max - min) * mainView.h + mainView.y;
        let x2 = x1;
        let y2 = (max - lo[i]) / (max - min) * mainView.h + mainView.y;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
