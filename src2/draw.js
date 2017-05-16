export default function draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    drawBackground.call(this);
    drawTime.call(this);
    drawSplitLine.call(this);

    const yaxis = this.computAxis();

    this.drawMain(yaxis);

    this.drawAid();
}

function drawBackground() {
    const ctx = this.ctx;
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);
}

function drawTime() {
    const ctx = this.ctx;
    ctx.fillStyle = this.colors.timeBackground;
    ctx.fillRect(0, this.timeView.y, this.width, this.timeView.h);
}

function drawSplitLine() {
    const ctx = this.ctx;
    ctx.strokeStyle = this.colors.splitLine;
    ctx.beginPath();
    ctx.moveTo(0, (this.mainView.h + this.mainView.y + this.aidView.y) * 0.5);
    ctx.lineTo(this.width, (this.mainView.h + this.mainView.y + this.aidView.y) * 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.mainYaxisView.x, 0);
    ctx.lineTo(this.aidYaxisView.x, this.aidYaxisView.y + this.aidYaxisView.h);
    ctx.stroke();
}
