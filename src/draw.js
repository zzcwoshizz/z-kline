let lastStartIndex = -1;
let lastEndIndex = -1;
let lastVerticalRectNumber = -1;
export default function draw(flag) {
    if (this.isDraw) {
        return;
    }
    if (lastStartIndex === this.state.startIndex && lastEndIndex === this.state.endIndex && lastVerticalRectNumber === this.state.verticalRectNumber && !flag) {
        return;
    }
    this.isDraw = true;
    this.state.yaxis = computAxis.call(this);
    this.option.onChange(this.state);
    this.ctx.clearRect(0, 0, this.width, this.height);
    drawBackground.call(this);
    drawKLine.call(this);
    if (this.option.csi2.length > 0) {
        this.drawCsi();
    }
    this.isDraw = false;
    lastStartIndex = this.state.startIndex;
    lastEndIndex = this.state.endIndex;
    lastVerticalRectNumber = this.state.verticalRectNumber;
}

function drawKLine() {
    const ctx = this.ctx;
    const theme = this.option.theme;

    const times = this.state.times;
    const timeStr = this.state.timeStr;
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
        intervalY,
    } = this.state.yaxis;

    const view1 = this.views[0];
    const view2 = this.views[1];

    ctx.fillStyle = this.colors.textColor;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    let lengthY = (max - min) / intervalY;
    for (let i = 1; i < lengthY; i++) {
        ctx.fillText(this.option.priceFilter(max - (i * intervalY)), view2.x + view2.w, i * intervalY / (max - min) * view2.h + view2.y);
        ctx.beginPath();
        ctx.moveTo(0, i * intervalY / (max - min) * view2.h + view2.y);
        ctx.lineTo(view2.x, i * intervalY / (max - min) * view2.h + view2.y);
        ctx.stroke();
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    let ix = Math.ceil(this.state.verticalRectNumber * 0.25);
    for (let i = ix + this.state.startIndex; i < this.state.verticalRectNumber + this.state.startIndex; i += ix) {
        if (i >= times.length) {
            break;
        }
        let x = view1.x + (i - this.state.startIndex) / this.state.verticalRectNumber * view1.w;
        if (x > this.width || x < 0) {
            continue;
        }
        let y = this.height - 10;
        ctx.fillText(timeStr[i], x, y);
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.strokeStyle = this.colors.redColor;
    ctx.fillStyle = this.colors.redColor;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= times.length) {
            break;
        }
        if (close[i] <= start[i]) {
            let x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            let y = (max - Math.max(start[i], close[i])) / (max - min) * view1.h + view1.y;
            let w = view1.w / this.state.verticalRectNumber * 0.8;
            let h = (Math.max(start[i], close[i]) - Math.min(start[i], close[i])) / (max - min) * view1.h;
            ctx.fillRect(x, y, w, h < this.dpr ? this.dpr : h);
            let x1 = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            let y1 = (max - hi[i]) / (max - min) * view1.h + view1.y;
            let x2 = x1;
            let y2 = (max - lo[i]) / (max - min) * view1.h + view1.y;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    ctx.strokeStyle = this.colors.greenColor;
    ctx.fillStyle = this.colors.greenColor;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= times.length) {
            break;
        }
        if (close[i] > start[i]) {
            let x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            let y = (max - Math.max(start[i], close[i])) / (max - min) * view1.h + view1.y;
            let w = view1.w / this.state.verticalRectNumber * 0.8;
            let h = (Math.max(start[i], close[i]) - Math.min(start[i], close[i])) / (max - min) * view1.h;
            ctx.fillRect(x, y, w, h < this.dpr ? this.dpr : h);
            let x1 = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
            let y1 = (max - hi[i]) / (max - min) * view1.h + view1.y;
            let x2 = x1;
            let y2 = (max - lo[i]) / (max - min) * view1.h + view1.y;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
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
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);

    const marginTop = 16;
    // 垂直分割线
    ctx.strokeStyle = this.colors.splitLine;
    ctx.beginPath();
    ctx.moveTo(this.views[1].x, 0);
    ctx.lineTo(this.views[3].x, this.views[3].y + this.views[3].h + marginTop);
    ctx.stroke();
    if (theme === 'dark') {
        ctx.fillStyle = this.colors.timeBackground;
        ctx.fillRect(0, this.views[2].y + marginTop + this.views[2].h, this.width, this.height);
    } else {
        ctx.beginPath();
        ctx.moveTo(0, this.views[2].y + this.views[2].h + marginTop);
        ctx.lineTo(this.views[3].x + this.views[3].w, this.views[2].y + this.views[2].h + marginTop);
        ctx.stroke();
    }

    // 画分割线
    if (this.option.csi2.length > 0) {
        ctx.strokeStyle = this.colors.splitLine;
        ctx.beginPath();
        ctx.moveTo(0, (this.views[0].h + this.views[0].y + this.views[2].y) * 0.5);
        ctx.lineTo(this.width, (this.views[0].h + this.views[0].y + this.views[2].y) * 0.5);
        ctx.stroke();
    }
}

export function computAxis() {
    const start = this.state.start;
    const hi = this.state.hi;
    const lo = this.state.lo;
    const close = this.state.close;
    const ma30 = this.state.ma30;
    const ma7 = this.state.ma7;
    const ema30 = this.state.ema30;
    const ema7 = this.state.ema7;
    const startIndex = this.state.startIndex;
    const endIndex = this.state.endIndex;
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
        let maxVal = Math.max(start[i], hi[i], lo[i], close[i], ma30[i], ma7[i], ema30[i], ema7[i]);
        let minVal = Math.min(start[i], hi[i], lo[i], close[i], ma30[i], ma7[i], ema30[i], ema7[i]);
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
    const n = ((maxPrice - minPrice) * 0.25).toFixed(0).length;
    const intervalY = Math.ceil((maxPrice - minPrice) * 0.25 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    return {
        maxY,
        minY,
        maxPrice,
        maxPriceIndex,
        minPrice,
        minPriceIndex,
        max: maxY + intervalY - maxY % intervalY + intervalY,
        min: minY - minY % intervalY - intervalY,
        intervalY,
    };
}
