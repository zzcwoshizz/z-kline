export default function drawCsi() {
    const csi = this.option.csi2;
    const views = this.views;
    let volumeIndex = csi.indexOf('volume');
    if (volumeIndex > -1) {
        drawVolume.call(this, views[(volumeIndex + 1) * 2], views[(volumeIndex + 1) * 2 + 1]);
    }
    let macdIndex = csi.indexOf('macd');
    if (macdIndex > -1) {
        drawMacd.call(this, views[(macdIndex + 1) * 2], views[(macdIndex + 1) * 2 + 1]);
    }
}

function drawVolume(view1, view2) {
    const ctx = this.ctx;
    const theme = this.option.theme;

    const realVolume = [];
    this.state.volume.forEach((el, i) => {
        if (i >= this.state.startIndex && i < this.state.endIndex) {
            realVolume.push(el);
        }
    });
    const maxVolume = Math.max(...realVolume) * 1.2;
    this.csiYAxisSector = [maxVolume, 0];
    const n = (maxVolume * 0.25).toFixed(0).length;
    const interval = Math.ceil(maxVolume * 0.25 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    const yAxis = [];
    for (let i = interval; i < maxVolume; i += interval) {
        yAxis.unshift(i);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (let i = 0; i < yAxis.length; i++) {
        ctx.fillText(yAxis[i], view2.w + view2.x, view2.y + view2.h - yAxis[i] / maxVolume * view2.h);
        ctx.beginPath();
        ctx.moveTo(0, view2.y + view2.h - yAxis[i] / maxVolume * view2.h);
        ctx.lineTo(view2.x, view2.y + view2.h - yAxis[i] / maxVolume * view2.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.greenColor;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.start[i] < this.state.close[i]) {
            let x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            let w = view1.w / this.state.verticalRectNumber * 0.8;
            let h = -realVolume[j] / maxVolume * view1.h;
            let y = view1.y + view1.h;
            ctx.fillRect(x, y, w, h);
        }
    }

    ctx.fillStyle = this.colors.redColor;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.close[i] <= this.state.start[i]) {
            let x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
            let w = view1.w / this.state.verticalRectNumber * 0.8;
            let h = -realVolume[j] / maxVolume * view1.h;
            let y = view1.y + view1.h;
            ctx.fillRect(x, y, w, h);
        }
    }
    ctx.beginPath();
    for (let i = this.state.startIndex, j = 0; j < this.state.verticalRectNumber; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma30Color;
        let x = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        let y = (maxVolume - this.state.volumeMa30[i]) / maxVolume * view1.h + view1.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = this.state.startIndex, j = 0; j < this.state.verticalRectNumber; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma7Color;
        let x = j * view1.w / this.state.verticalRectNumber + 0.5 * view1.w / this.state.verticalRectNumber + view1.x;
        let y = (maxVolume - this.state.volumeMa7[i]) / maxVolume * view1.h + view1.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();

}

function drawMacd(view1, view2) {
    const ctx = this.ctx;
    const theme = this.option.theme;

    let max = 0;
    let min = 0;
    this.state.macd.forEach((el, i) => {
        if (i < this.state.startIndex || i >= this.state.endIndex) {
            return;
        }
        let val = Math.max(el, this.state.dif[i], this.state.dea[i]);
        max = max > val ? max : val;
        val = Math.min(el, this.state.dif[i], this.state.dea[i]);
        min = min < val ? min : val;
    });
    max = (max > Math.abs(min) ? max : Math.abs(min)) * 1.5;
    this.csiYAxisSector = [max, -max];
    const yAxis = [max, max * 2 / 3, max / 3, -max / 3, -max * 2 / 3, -max];

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (let i = 1; i < yAxis.length - 1; i++) {
        ctx.fillText(this.setDP(yAxis[i]), view2.x + view2.w, view2.y + i / (yAxis.length - 1) * view2.h);
        ctx.beginPath();
        ctx.moveTo(0, view2.y + i / (yAxis.length - 1) * view2.h);
        ctx.lineTo(view2.x, view2.y + i / (yAxis.length - 1) * view2.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.greenColor;
    ctx.strokeStyle = this.colors.greenColor;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.macd[i] > 0) {
            let y = view1.y + view1.h * 0.5;
            let w = view1.w / this.state.verticalRectNumber * 0.8;
            let x = j * view1.w / this.state.verticalRectNumber + view1.x + w * 0.1;
            let h = -this.state.macd[i] / max * view1.h * 0.5;
            if (Math.abs(this.state.macd[i]) > Math.abs(this.state.macd[i - 1])) {
                ctx.fillRect(x, y, w, h);
            } else {
                if (w <= this.dpr * 4) {
                    ctx.fillRect(x, y, w, h);
                } else {
                    ctx.strokeRect(x, y, w, h);
                }
            }
        }
    }
    ctx.fillStyle = this.colors.redColor;
    ctx.strokeStyle = this.colors.redColor;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.macd[i] <= 0) {
            let y = view1.y + view1.h * 0.5;
            let w = view1.w / this.state.verticalRectNumber * 0.8;
            let x = j * view1.w / this.state.verticalRectNumber + view1.x + w * 0.1;
            let h = -this.state.macd[i] / max * view1.h * 0.5;
            if (Math.abs(this.state.macd[i]) > Math.abs(this.state.macd[i - 1])) {
                ctx.fillRect(x, y, w, h);
            } else {
                if (w <= this.dpr * 4) {
                    ctx.fillRect(x, y, w, h);
                } else {
                    ctx.strokeRect(x, y, w, h);
                }
            }
        }
    }

    // dif
    ctx.strokeStyle = this.colors.ma7Color;
    ctx.beginPath();
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * view1.w / this.state.verticalRectNumber + 0.5 + view1.w / this.state.verticalRectNumber + view1.x;
        let y = (max - this.state.dif[i]) / (2 * max) * view1.h + view1.y;
        if (j === 0) {
            ctx.moveTo(x, y);
            continue;
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    // dea
    ctx.strokeStyle = this.colors.ma30Color;
    ctx.beginPath();
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * view1.w / this.state.verticalRectNumber + 0.5 + view1.w / this.state.verticalRectNumber + view1.x;
        let y = (max - this.state.dea[i]) / (2 * max) * view1.h + view1.y;
        if (j === 0) {
            ctx.moveTo(x, y);
            continue;
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}
