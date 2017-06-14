export default function ParallelSegment(ctx, colors) {
    this.ctx = ctx;
    this.colors = colors;
    this.step = 0;
    this.points = [];
}

ParallelSegment.prototype.draw = function() {
    if (this.points.length === 0) {
        return;
    }
    const ctx = this.ctx;
    const [point1, point2] = this.points;
    ctx.strokeStyle = this.colors.textColor;
    ctx.fillStyle = this.colors.background;
    ctx.beginPath();
    ctx.moveTo(point1.x, point2.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();

    if (this.step !== 2) {
        ctx.beginPath();
        ctx.arc(point1.x, point2.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(point2.x, point2.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
};

ParallelSegment.prototype.next = function(point) {
    if (this.step === 0) {
        this.step = 1;
        this.points = [point, point];
    } else if (this.step === 1) {
        this.step = 2;
        this.points = [this.points[0], point];
        return true;
    }
};

ParallelSegment.prototype.setPoint = function(point) {
    if (this.step === 0) {
        this.points = [point, point];
    } else if (this.step === 1) {
        this.points = [this.points[0], point];
    }
};
