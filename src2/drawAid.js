function toInt(num) {
    return ~~(0.5 + num);
}
export default function drawAid() {
    if (this.option.aidCsi === 'volume') {
        drawVolume.call(this);
    } else if (this.option.aidCsi === 'macd') {
        drawMacd.call(this);
    } else if (this.option.aidCsi === 'kdj') {
        drawKdj.call(this);
    }
}

function drawVolume() {
    const ctx = this.ctx;
    const aidView = this.aidView;
    const aidYaxisView = this.aidYaxisView;
    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;

    const realVolume = [];
    const realVolumeMa7 = [];
    const realVolumeMa30 = [];
    this.state.volume.forEach((el, i) => {
        if (i >= startIndex && i < endIndex) {
            realVolume.push(el);
            realVolumeMa7.push(this.state.volumeMa7[i]);
            realVolumeMa30.push(this.state.volumeMa30[i]);
        }
    });
    const maxVolume = Math.max(...realVolume, ...realVolumeMa7, ...realVolumeMa30) * 1.25;
    this.csiYaxisSector = [maxVolume, 0];

    let n = 0;
    if (maxVolume >= 1) {
        n = maxVolume.toFixed(0).length;
    } else {
        let str = maxVolume.toString().split('.')[1];
        for (let i = 0; i < str.length; i++) {
            if (str.charAt[1] == 0) {
                n--;
            }
        }
    }
    const interval = Math.ceil(maxVolume * 0.25 / Math.pow(10, n - 2)) * Math.pow(10, n - 2);
    const yAxis = [];
    for (let i = interval; i < maxVolume; i += interval) {
        yAxis.unshift(i);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (let i = 0; i < yAxis.length; i++) {
        ctx.fillText(yAxis[i], aidYaxisView.x + aidYaxisView.w * 0.5, aidYaxisView.y + aidYaxisView.h - yAxis[i] / maxVolume * aidYaxisView.h);
        ctx.beginPath();
        ctx.moveTo(0, aidYaxisView.y + aidYaxisView.h - yAxis[i] / maxVolume * aidYaxisView.h);
        ctx.lineTo(aidYaxisView.x, aidYaxisView.y + aidYaxisView.h - yAxis[i] / maxVolume * aidYaxisView.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.strokeStyle = this.colors.textColor;
    for (let i = 0; i < yAxis.length; i++) {
        let x = aidYaxisView.x;
        let y = aidYaxisView.y + aidYaxisView.h - yAxis[i] / maxVolume * aidYaxisView.h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }

    ctx.fillStyle = this.colors.greenColor;
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.start[i] < this.state.close[i]) {
            let x = (j + 0.1) * aidView.w / verticalRectNumber + aidView.x;
            let w = aidView.w / verticalRectNumber * 0.8;
            let h = -realVolume[j] / maxVolume * aidView.h;
            let y = aidView.y + aidView.h;
            ctx.fillRect(x, y, w, h);
        }
    }

    ctx.fillStyle = this.colors.redColor;
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.close[i] <= this.state.start[i]) {
            let x = (j + 0.1) * aidView.w / verticalRectNumber + aidView.x;
            let w = aidView.w / verticalRectNumber * 0.8;
            let h = -realVolume[j] / maxVolume * aidView.h;
            let y = aidView.y + aidView.h;
            ctx.fillRect(x, y, w, h);
        }
    }
    ctx.beginPath();
    for (let i = startIndex, j = 0; j < verticalRectNumber; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma30Color;
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (maxVolume - this.state.volumeMa30[i]) / maxVolume * aidView.h + aidView.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let i = startIndex, j = 0; j < verticalRectNumber; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        ctx.strokeStyle = this.colors.ma7Color;
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (maxVolume - this.state.volumeMa7[i]) / maxVolume * aidView.h + aidView.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawMacd() {
    const ctx = this.ctx;
    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;
    const aidView = this.aidView;
    const aidYaxisView = this.aidYaxisView;

    let max = 0;
    let min = 0;
    this.state.macd.forEach((el, i) => {
        if (i < startIndex || i >= endIndex) {
            return;
        }
        let val = Math.max(el, this.state.dif[i], this.state.dea[i]);
        max = max > val ? max : val;
        val = Math.min(el, this.state.dif[i], this.state.dea[i]);
        min = min < val ? min : val;
    });
    max = (max > Math.abs(min) ? max : Math.abs(min)) * 1.25;
    this.csiYaxisSector = [max, -max];
    const yAxis = [max, max * 2 / 3, max / 3, -max / 3, -max * 2 / 3, -max];

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (let i = 1; i < yAxis.length - 1; i++) {
        ctx.fillText(this.setDP(yAxis[i]), aidYaxisView.x + aidYaxisView.w * 0.5, aidYaxisView.y + i / (yAxis.length - 1) * aidYaxisView.h);
        ctx.beginPath();
        ctx.moveTo(0, aidYaxisView.y + i / (yAxis.length - 1) * aidYaxisView.h);
        ctx.lineTo(aidYaxisView.x, aidYaxisView.y + i / (yAxis.length - 1) * aidYaxisView.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.fillStyle = this.colors.greenColor;
    ctx.strokeStyle = this.colors.greenColor;
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.macd[i] > 0) {
            let y = aidView.y + aidView.h * 0.5;
            let w = aidView.w / verticalRectNumber * 0.8;
            let x = j * aidView.w / verticalRectNumber + aidView.x + w * 0.1;
            let h = -this.state.macd[i] / max * aidView.h * 0.5;
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
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        if (this.state.macd[i] <= 0) {
            let y = aidView.y + aidView.h * 0.5;
            let w = aidView.w / verticalRectNumber * 0.8;
            let x = j * aidView.w / verticalRectNumber + aidView.x + w * 0.1;
            let h = -this.state.macd[i] / max * aidView.h * 0.5;
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
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (max - this.state.dif[i]) / (2 * max) * aidView.h + aidView.y;
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
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (max - this.state.dea[i]) / (2 * max) * aidView.h + aidView.y;
        if (j === 0) {
            ctx.moveTo(x, y);
            continue;
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function drawKdj() {
    const ctx = this.ctx;
    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;
    const aidView = this.aidView;
    const aidYaxisView = this.aidYaxisView;

    let max = 0;
    let min = 0;
    this.state.k.forEach((el, i) => {
        if (i < startIndex || i >= endIndex) {
            return;
        }
        let val = Math.max(el, this.state.d[i], this.state.j[i]);
        max = max > val ? max : val;
        val = Math.min(el, this.state.d[i], this.state.j[i]);
        min = min < val ? min : val;
    });
    this.csiYaxisSector = [max, min];

    max *= 1.1;
    const cha = max - min;

    let n = 0;
    if (cha >= 1) {
        n = cha.toFixed(0).length;
    } else {
        let str = cha.toString().split('.')[1];
        for (let i = 0; i < str.length; i++) {
            if (str.charAt[1] == 0) {
                n--;
            }
        }
    }
    const interval = Math.ceil(cha * 0.25 / Math.pow(10, n - 2)) * Math.pow(10, n - 2);
    const yAxis = [];
    for (let i = 0; i < max; i += interval) {
        yAxis.unshift(i);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.textColor;
    ctx.setLineDash([2 * this.dpr], 2 * this.dpr);
    ctx.strokeStyle = this.colors.splitLine;
    ctx.lineWidth = this.dpr * 0.5;
    for (let i = 0; i < yAxis.length; i++) {
        ctx.fillText(yAxis[i], aidYaxisView.x + aidYaxisView.w * 0.5, aidYaxisView.y + (max - yAxis[i]) / cha * aidYaxisView.h);
        ctx.beginPath();
        ctx.moveTo(0, aidYaxisView.y + (max - yAxis[i]) / cha * aidYaxisView.h);
        ctx.lineTo(aidYaxisView.x, aidYaxisView.y + (max - yAxis[i]) / cha * aidYaxisView.h);
        ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    ctx.strokeStyle = this.colors.textColor;
    for (let i = 0; i < yAxis.length; i++) {
        let x = aidYaxisView.x;
        let y = aidYaxisView.y + (max - yAxis[i]) / cha * aidYaxisView.h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }

    ctx.strokeStyle = this.colors.ma7Color;
    ctx.beginPath();
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (max - this.state.k[i]) / cha * aidView.h + aidView.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = this.colors.ma30Color;
    ctx.beginPath();
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (max - this.state.d[i]) / cha * aidView.h + aidView.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = this.colors.macdColor;
    ctx.beginPath();
    for (let i = startIndex, j = 0; i < endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = j * aidView.w / verticalRectNumber + 0.5 * aidView.w / verticalRectNumber + aidView.x;
        let y = (max - this.state.j[i]) / cha * aidView.h + aidView.y;
        if (j == 0) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}
