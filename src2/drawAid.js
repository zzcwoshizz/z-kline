export default function drawAid() {
    if (this.option.aidCsi === 'volume') {
        drawVolume.call(this);
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
