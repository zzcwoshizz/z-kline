export default function PriceLine(ctx, colors, context) {
    this.ctx = ctx;
    this.colors = colors;
    this.step = 0;
    this.context = context;
    this.index = -1;
    this.price = -1;
    this.moving = false;
}

PriceLine.prototype.draw = function() {
    if (this.index.length === 0) {
        return;
    }
    const ctx = this.ctx;
    const point = this.getPos();

    const linePath = this.getLine();
    if (this.isInPath(this.context.mousePos, linePath)) {
        ctx.lineWidth = this.context.dpr;
        if (this.step === 1) {
            ctx.strokeStyle = this.colors.lineHilightColor;
            ctx.fillStyle = this.colors.lineHilightColor;
        } else {
            ctx.strokeStyle = this.colors.lineColor;
            ctx.fillStyle = this.colors.lineColor;
        }
        ctx.stroke(linePath);
        ctx.fillText(this.price.toFixed(this.context.option.priceDecimal), point.x, point.y);
        this.drawPoint();
    } else {
        ctx.lineWidth = this.context.dpr;
        ctx.strokeStyle = this.colors.lineColor;
        ctx.fillStyle = this.colors.lineColor;
        ctx.stroke(linePath);
        ctx.fillText(this.price.toFixed(this.context.option.priceDecimal), point.x, point.y);
    }

    if (this.step !== 1) {
        this.drawPoint();
    }
};

PriceLine.prototype.next = function() {
    if (this.step === 0) {
        this.step = 1;
        return true;
    }
};

PriceLine.prototype.isInPath = function(pos, path) {
    const ctx = this.ctx;
    ctx.lineWidth = this.context.dpr * 10;
    if (!path) {
        path = this.getLine();
    }
    if (ctx.isPointInStroke(path, pos.x, pos.y)) {
        return true;
    }
    return false;
};

PriceLine.prototype.getCircle = function() {
    const ctx = this.ctx;
    const point = this.getPos();

    const circle = new Path2D();
    circle.arc(point.x, point.y, 5 * this.context.dpr, 0, Math.PI * 2);

    return circle;
};

PriceLine.prototype.getLine = function() {
    const ctx = this.ctx;
    const point = this.getPos();

    const path = new Path2D();
    path.moveTo(point.x, point.y);
    path.lineTo(this.context.mainYaxisView.x, point.y);

    return path;
};

PriceLine.prototype.drawPoint = function() {
    const ctx = this.ctx;
    const circle = this.getCircle();

    ctx.lineWidth = this.context.dpr;
    ctx.fillStyle = this.colors.background;

    ctx.fill(circle);
    ctx.stroke(circle);
};

PriceLine.prototype.setPosition = function(index, price) {
    if (this.step === 0) {
        this.index = index;
        this.price = price;
    }
};

PriceLine.prototype.move = function(index, price) {
    this.index += index;
    this.price += price;
};

PriceLine.prototype.getPos = function() {
    const { mainView } = this.context;
    const [startIndex, endIndex] = this.context.state.range;
    const verticalRectNumber = endIndex - startIndex;
    const { max, min } = this.context.computAxis();

    const x = (this.index - startIndex) * mainView.w / verticalRectNumber + mainView.w / verticalRectNumber * 0.5 + mainView.x;
    const y = mainView.y + (max - this.price) / (max - min) * mainView.h;
    return { x, y };
};
