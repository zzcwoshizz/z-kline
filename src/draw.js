export default function draw() {
    this.state.yaxis = computAxis.call(this);
    this.option.onChange(this.state);
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawBackground.call(this);
    drawKLine.call(this);
}

function drawKLine() {
    const ctx = this.ctx;
    const theme = this.option.theme;

    const times = this.state.times;
    const start = this.state.start;
    const hi = this.state.hi;
    const lo = this.state.lo;
    const close = this.state.close;

    const {
        max,
        min,
        maxPrice,
        maxPriceIndex,
        minPrice,
        minPriceIndex,
    } = this.state.yaxis;

    const view1 = this.views[0];
    const view2 = this.views[1];

    ctx.fillStyle = this.colors.textColor;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    let lengthY = (max - min) / this.option.intervalY;
    for (let i = 0; i <= lengthY; i++) {
        ctx.fillText(this.option.priceFilter(max - (i * this.option.intervalY)), view2.x + view2.w, i * this.option.intervalY / (max - min) * view2.h + view2.y);
        ctx.beginPath();
        ctx.moveTo(0, i * this.option.intervalY / (max - min) * view2.h + view2.y);
        ctx.lineTo(view1.x + view1.w, i * this.option.intervalY / (max - min) * view2.h + view2.y);
        ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    for (let i = this.option.intervalX + this.state.startIndex; i < this.state.verticalRectNumber + this.state.startIndex; i += this.option.intervalX) {
        if (i >= times.length) {
            break;
        }
        ctx.fillText(this.option.timeFilter(times[i]), view1.x + (i - this.state.startIndex) / this.state.verticalRectNumber * view1.w, this.height - 7);
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= times.length) {
            break;
        }
        ctx.strokeStyle = start[i] < close[i] ? this.colors.greenColor : this.colors.redColor;
        ctx.fillStyle = start[i] < close[i] ? this.colors.greenColor : this.colors.redColor;
        let x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
        let y = (max - Math.max(start[i], close[i])) / (max - min) * view1.h + view1.y;
        let w = view1.w / this.state.verticalRectNumber * 0.8;
        let h = (Math.max(start[i], close[i]) - Math.min(start[i], close[i])) / (max - min) * view1.h;
        if (close[i] < start[i]) {
            ctx.fillRect(x, y, w, h);
        }
        if (close[i] > start[i]) {
            ctx.fillRect(x, y, w, h);
        }
        if (close[i] == start[i]) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + w, y);
            ctx.stroke();
            ctx.closePath();
        }

        let x1 = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        let y1 = (max - hi[i]) / (max - min) * view1.h + view1.y;
        let x2 = x1;
        let y2 = (max - lo[i]) / (max - min) * view1.h + view1.y;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y);
        ctx.stroke();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2, y + h);
        ctx.stroke();
        ctx.closePath();
    }

    if (this.option.csi === 'ma') {
        // ma30
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (let i = this.state.startIndex, j = 0; j < this.state.verticalRectNumber; i++, j++) {
            if (i >= this.state.times.length) {
                break;
            }
            let x = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            let y = (max - this.state.ma30[i]) / (max - min) * view1.h + view1.y;
            if (j == 0) {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();

        // ma7
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (let i = this.state.startIndex, j = 0; j < this.state.verticalRectNumber; i++, j++) {
            if (i >= this.state.times.length) {
                break;
            }
            let x = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            let y = (max - this.state.ma7[i]) / (max - min) * view1.h + view1.y;
            if (j == 0) {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    } else if (this.option.csi === 'ema') {
        // ema30
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma30Color;
        for (let i = this.state.startIndex, j = 0; j < this.state.verticalRectNumber; i++, j++) {
            if (i >= this.state.times.length) {
                break;
            }
            let x = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            let y = (max - this.state.ema30[i]) / (max - min) * view1.h + view1.y;
            if (j == 0) {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();

        // ema7
        ctx.beginPath();
        ctx.strokeStyle = this.colors.ma7Color;
        for (let i = this.state.startIndex, j = 0; j < this.state.verticalRectNumber; i++, j++) {
            if (i >= this.state.times.length) {
                break;
            }
            let x = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            let y = (max - this.state.ema7[i]) / (max - min) * view1.h + view1.y;
            if (j == 0) {
                ctx.moveTo(x, y);
            }
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    // 画最高点，最低点
    ctx.fillStyle = this.colors.textColorLight;
    ctx.textBaseline = 'middle';
    let index = (maxPriceIndex - this.state.startIndex);
    let index1 = (minPriceIndex - this.state.startIndex);
    let maxX = view1.w / this.state.verticalRectNumber * 0.5 + (index + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
    let maxY = (max - maxPrice) / (max - min) * view1.h + view1.y;
    let minX = view1.w / this.state.verticalRectNumber * 0.5 + (index1 + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
    let minY = (max - minPrice) / (max - min) * view1.h + view1.y;
    if (index < this.state.verticalRectNumber * 0.5) {
        ctx.textAlign = 'left';
        ctx.fillText(' ← ' + maxPrice, maxX, maxY);
    } else {
        ctx.textAlign = 'right';
        ctx.fillText(maxPrice + ' → ', maxX, maxY);
    }
    if (index1 < this.state.verticalRectNumber * 0.5) {
        ctx.textAlign = 'left';
        ctx.fillText(' ← ' + minPrice, minX, minY);
    } else {
        ctx.textAlign = 'right';
        ctx.fillText(minPrice + ' → ', minX, minY);
    }

    // 当前价格
    ctx.textAlign = 'left';
    ctx.fillStyle = this.colors.currentTextColor;
    ctx.fillText(' ← ' + close[close.length - 1], view1.x + view1.w, (max - close[close.length - 1]) / (max - min) * view1.h + view1.y);
}

function drawBackground() {
    const ctx = this.ctx;
    const theme = this.option.theme;
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.colors.timeBackground;
    ctx.fillRect(0, this.views[2].y + this.views[2].h, this.width, this.height);

    // 画分割线
    if (this.option.csi2.length > 0) {
        ctx.strokeStyle = this.colors.splitLine;
        ctx.moveTo(0, (this.views[0].h + this.views[0].y + this.views[2].y) * 0.5);
        ctx.lineTo(this.width, (this.views[0].h + this.views[0].y + this.views[2].y) * 0.5);
        ctx.stroke();
        ctx.closePath();
    }
}

export function computAxis() {
    const start = this.state.start;
    const hi = this.state.hi;
    const lo = this.state.lo;
    const close = this.state.close;
    const ma30 = this.state.ma30;
    const ma7 = this.state.ma7;
    const startIndex = this.state.startIndex;
    const endIndex = this.state.endIndex;
    const intervalY = this.option.intervalY;
    let maxY = -99999;
    let minY = 99999;
    let maxPrice = -99999;
    let minPrice = 99999;
    let maxPriceIndex = -1;
    let minPriceIndex = -1;
    for (let i = startIndex; i < endIndex; i++) {
        if (i < startIndex || i >= endIndex) {
            return;
        }
        let maxVal = Math.max(start[i], hi[i], lo[i], close[i], ma30[i], ma7[i]);
        let minVal = Math.min(start[i], hi[i], lo[i], close[i], ma30[i], ma7[i]);
        maxY = maxVal > maxY ? maxVal : maxY;
        minY = minVal < minY ? minVal : minY;
        let maxPriceVal = hi[i];
        let minPriceVal = lo[i];
        if (maxPriceVal > maxPrice) {
            maxPriceIndex = i;
            maxPrice = maxPriceVal;
        }
        if (minPriceVal < minPrice) {
            minPriceIndex = i;
            minPrice = minPriceVal;
        }
    }
    return {
        maxY,
        minY,
        maxPrice,
        maxPriceIndex,
        minPrice,
        minPriceIndex,
        max: maxY + intervalY - maxY % intervalY,
        min: minY - minY % intervalY,
    };
}
