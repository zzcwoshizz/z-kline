export default function ParallelSegment(ctx, colors, context) {
    this.ctx = ctx;
    this.colors = colors;
    this.step = 0;
    this.context = context;
    this.index = [];
    this.price = [];
}

ParallelSegment.prototype.draw = function() {
    if (this.index.length === 0) {
        return;
    }
    const ctx = this.ctx;
    const [point1, point2] = this.getPos();

    ctx.beginPath();
    ctx.moveTo(point1.x, point2.y);
    ctx.lineTo(point2.x, point2.y);
    if (this.isInPath(this.context.mousePos)) {
        if (this.step === 2) {
            ctx.strokeStyle = this.colors.lineHilightColor;
        } else {
            ctx.strokeStyle = this.colors.lineColor;
        }
        ctx.stroke();
        this.drawPoint();
    } else {
        ctx.strokeStyle = this.colors.lineColor;
        ctx.stroke();
    }

    if (this.step !== 2) {
        this.drawPoint();
    }
};

ParallelSegment.prototype.next = function() {
    if (this.step === 0) {
        this.step = 1;
    } else if (this.step === 1) {
        this.step = 2;
        return true;
    }
};

ParallelSegment.prototype.isInPath = function(pos) {
    const [point1, point2] = this.getPos();
    const dis = 5 * this.context.dpr;
    if (pos.x > Math.min(point1.x, point2.x) - dis && pos.x < Math.max(point2.x, point1.x) + dis && pos.y > point2.y - dis && pos.y < point2.y + dis) {
        return true;
    }
    return false;
};

ParallelSegment.prototype.drawPoint = function() {
    const ctx = this.ctx;
    const [point1, point2] = this.getPos();
    ctx.fillStyle = this.colors.background;
    ctx.beginPath();
    ctx.arc(point1.x, point2.y, 5 * this.context.dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(point2.x, point2.y, 5 * this.context.dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
};

ParallelSegment.prototype.setPosition = function(index, price) {
    if (this.step === 0) {
        this.index = [index, index];
        this.price = [price, price];
    } else if (this.step === 1) {
        this.index = [this.index[0], index];
        this.price = [this.price[0], price];
    }
};

ParallelSegment.prototype.getPos = function() {
    const { mainView } = this.context;
    const [startIndex, endIndex] = this.context.state.range;
    const verticalRectNumber = endIndex - startIndex;
    const { max, min } = this.context.computAxis();

    const pos = [];
    this.index.forEach((el, i) => {
        const x = (el - startIndex) * mainView.w / verticalRectNumber + mainView.w / verticalRectNumber * 0.5 + mainView.x;
        const y = mainView.y + (max - this.price[i]) / (max - min) * mainView.h;
        pos.push({ x, y });
    });
    return pos;
};
