export default function drawCsi() {
    const csi = this.option.csi2;
    const views = this.views;
    let volumeIndex = csi.indexOf('volume');
    if (volumeIndex > -1) {
        drawVolume.call(this, views[(volumeIndex + 1) * 2], views[(volumeIndex + 1) * 2 + 1]);
    }
}

function drawVolume(view1, view2) {
    const ctx = this.ctx;
    const theme = this.option.theme;

    const realVolume = [];
    this.state.volume.forEach((el, i) => {
        if (i >= this.state.startIndex) {
            realVolume.push(el);
        }
    });
    const maxVolume = Math.max(...realVolume);
    this.state.csiYAxisSector = [maxVolume, 0];
    const n = (maxVolume * 0.25).toFixed(0).length;
    const interval = Math.floor(maxVolume * 0.25 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
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
        ctx.lineTo(view1.x + view1.w, view2.y + view2.h - yAxis[i] / maxVolume * view2.h);
        ctx.stroke();
        ctx.closePath();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = this.dpr;
    for (let i = this.state.startIndex, j = 0; i < this.state.endIndex; i++, j++) {
        if (i >= this.state.times.length) {
            break;
        }
        let x = (j + 0.1) * view1.w / this.state.verticalRectNumber + view1.x;
        let w = view1.w / this.state.verticalRectNumber * 0.8;
        let h = realVolume[j] / maxVolume * view1.h;
        let y = view1.y + view1.h - h;
        if (this.state.start[i] < this.state.close[i]) {
            ctx.fillStyle = this.colors.greenColor;
            ctx.fillRect(x, y, w, h);
        }
        if (this.state.close[i] <= this.state.start[i]) {
            ctx.fillStyle = this.colors.redColor;
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
    ctx.closePath();

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
