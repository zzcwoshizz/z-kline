export default function draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    drawBackground.call(this);
    drawTime.call(this);

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
