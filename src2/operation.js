export default function operation(canvas, overCanvas) {
    const overCtx = this.overCtx;
    const { mainView, mainYaxisView, aidView, aidYaxisView } = this;

    let isDown = false;
    let lastIndex = -1;

    const move = e => {
        const pos = this.getMousePos(e);
        let [startIndex, endIndex] = this.state.range;
        const verticalRectNumber = endIndex - startIndex;
        if (this.isInLineView(pos)) {
            drawHairLine.call(this, pos);
        } else {
            overCtx.clearRect(0, 0, this.width, this.height);
        }
        if (isDown) {
            const currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
            this.moveRange(currentIndex - lastIndex);
            this.draw();
            lastIndex = currentIndex;
        }
    };

    const scale = n => {
        if (n > 20) {
            n = 20;
        }
        if (n < -20) {
            n = -20;
        }
        this.scaleRange(n);
        this.draw();
    };

    if (this.device === 'pc') {
        const mousedown = e => {
            isDown = true;
            const pos = this.getMousePos(e);
            const verticalRectNumber = this.state.range[1] - this.state.range[0];
            const currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
            lastIndex = currentIndex;
        };
        const mouseup = () => {
            isDown = false;
        };
        const mouseout = () => {
            isDown = false;
        };
        overCanvas.addEventListener('mousedown', mousedown);
        overCanvas.addEventListener('mouseup', mouseup);
        overCanvas.addEventListener('mouseout', mouseout);
        overCanvas.addEventListener('mousemove', move);
        overCanvas.addEventListener('wheel', function(e) {
            e.preventDefault();
            let n = Number(e.deltaY.toFixed(0));
            scale(n);
        });
    }
}

function drawHairLine(pos) {
    const overCtx = this.overCtx;
    const { mainView, mainYaxisView, aidView, aidYaxisView, timeView } = this;
    let [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;

    const currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
    const x = currentIndex * aidView.w / verticalRectNumber + aidView.w / verticalRectNumber * 0.5 + mainView.x;
    const y = pos.y;

    overCtx.clearRect(0, 0, this.width, this.height);
    if (currentIndex + startIndex >= this.state.times.length || currentIndex + startIndex < 0) {
        return;
    }

    overCtx.lineWidth = this.dpr;
    overCtx.strokeStyle = this.colors.hairLine;

    overCtx.beginPath();
    overCtx.moveTo(x, this.height);
    overCtx.lineTo(x, 0);
    overCtx.stroke();

    overCtx.beginPath();
    overCtx.moveTo(0, y);
    overCtx.lineTo(this.width, y);
    overCtx.stroke();

    // x轴坐标
    const currentTime = this.state.times[startIndex + currentIndex];
    overCtx.textAlign = 'center';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.timeBackground;
    overCtx.fillRect(x - overCtx.measureText(currentTime).width * 0.5 - 10, this.height - timeView.h * 0.5, overCtx.measureText(currentTime).width + 20, timeView.h * 0.5 - this.dpr);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(x - overCtx.measureText(currentTime).width * 0.5 - 10, this.height - timeView.h * 0.5, overCtx.measureText(currentTime).width + 20, timeView.h * 0.5 - this.dpr);
    overCtx.fillStyle = this.colors.textColor;
    overCtx.fillText(this.option.overTimeFilter(currentTime), x, this.height - (timeView.h * 0.5 - this.dpr) * 0.5);

    // 画y轴坐标
    const { max, min } = this.computAxis();
    let view = mainYaxisView;
    let w = this.width - view.x;
    overCtx.textAlign = 'right';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.background;
    overCtx.fillRect(view.x, y - 16, w, 32);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(view.x, y - 16, w, 32);
    overCtx.fillStyle = this.colors.textColor;

    overCtx.textAlign = 'center';
    if (this.isInLineView(pos) === mainView) {
        const yText = max - (max - min) * (y - view.y) / view.h;
        overCtx.fillText(yText.toFixed(this.option.priceDecimal), mainYaxisView.x + mainYaxisView.w * 0.5, y);
    } else {
        view = aidYaxisView;
        if (this.option.aidCsi === 'volume') {
            const yText = (1 - (y - view.y) / view.h) * (this.csiYaxisSector[0] - this.csiYaxisSector[1]);
            overCtx.fillText(this.setDP(yText), mainYaxisView.x + mainYaxisView.w * 0.5, y);
        } else if (this.option.aidCsi === 'macd') {
            const yText = this.csiYaxisSector[1] * (y - view.y) / view.h + this.csiYaxisSector[0] * (1 - (y - view.y) / view.h);
            overCtx.fillText(this.setDP(yText), mainYaxisView.x + mainYaxisView.w * 0.5, y);
        }
    }
}
