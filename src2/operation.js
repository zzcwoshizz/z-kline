export default function operation(canvas, overCanvas) {
    const overCtx = this.overCtx;
    const getMainView = () => this.mainView;
    const getAidView = () => this.aidView;

    let isDown = false;
    let lastIndex = -1;
    let lastPrice = -1;
    let lastTouchDistance = 0;
    let moveLine = null;

    const move = e => {
        const mainView = getMainView();
        const aidView = getAidView();
        const pos = this.getMousePos(e);
        this.mousePos = pos;
        let [startIndex, endIndex] = this.state.range;
        const verticalRectNumber = endIndex - startIndex;
        const currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
        const { max, min } = this.computAxis();
        const price = max - (max - min) * (pos.y - mainView.y) / mainView.h;
        if (isDown) {
            if (moveLine && moveLine.moving) {
                if (pos.x > mainView.x && pos.x < (mainView.x + mainView.w) && pos.y > mainView.y && pos.y < (mainView.y + mainView.h)) {
                    moveLine.move(currentIndex - lastIndex, price - lastPrice);
                }
            } else {
                this.moveRange(currentIndex - lastIndex);
            }
        }
        if (this.isInLineView(pos)) {
            this.pos = pos;
            if (this.lineCache && pos.x > mainView.x && pos.x < (mainView.x + mainView.w) && pos.y > mainView.y && pos.y < (mainView.y + mainView.h)) {
                this.lineCache.setPosition(currentIndex + startIndex, price);
            }
            this.forceUpdate(false, true);
        }
        lastIndex = currentIndex;
        lastPrice = price;
    };

    const scale = n => {
        if (n > 20) {
            n = 20;
        }
        if (n < -20) {
            n = -20;
        }
        this.scaleRange(n);
    };

    if (this.device === 'pc') {
        const mousedown = e => {
            const aidView = getAidView();
            const pos = this.getMousePos(e);
            if (e.button === 0) {
                isDown = true;
                this.lines.forEach(line => {
                    if (line.isInPath(pos)) {
                        moveLine = line;
                        moveLine.moving = true;
                        return;
                    }
                });
                const verticalRectNumber = this.state.range[1] - this.state.range[0];
                const currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
                lastIndex = currentIndex;
            } else if (e.button === 2) {
                overCanvas.oncontextmenu = () => false;
                let index = null;
                this.lines.forEach((line, i) => {
                    if (line.isInPath(pos)) {
                        index = i;
                        return;
                    }
                });
                if (index !== null) {
                    this.clearLine(index);
                }
            }
            this.forceUpdate(false, true);
        };
        const mouseup = () => {
            isDown = false;
            if (moveLine) {
                moveLine.moving = false;
                moveLine = null;
            }
            this.forceUpdate(false, true);
        };
        const mouseout = () => {
            isDown = false;
            if (moveLine) {
                moveLine.moving = false;
                moveLine = null;
            }
            this.forceUpdate(false, true);
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
        overCanvas.addEventListener('click', e => {
            e.preventDefault();
            if (!this.lineCache) {
                return;
            }
            const pos = this.getMousePos(e);
            const complete = this.lineCache.next();
            if (complete) {
                this.lines.unshift(this.lineCache);
                this.lineCache = null;
            }
            this.forceUpdate(false, true);
        });
    } else {
        const touchstart = e => {
            isDown = true;
            const mainView = getMainView();
            if (e.targetTouches.length == 2) {
                const touch1 = this.getMousePos(e.targetTouches[0]);
                const touch2 = this.getMousePos(e.targetTouches[1]);
                lastTouchDistance = Math.sqrt(Math.pow(touch1.x - touch2.x, 2) + Math.pow(touch1.y - touch2.y, 2));
            } else if (e.targetTouches.length === 1) {
                const pos = this.getMousePos(e.targetTouches[0]);
                let [startIndex, endIndex] = this.state.range;
                const verticalRectNumber = endIndex - startIndex;
                const currentIndex = Math.floor((pos.x - mainView.x) / mainView.w * verticalRectNumber);
                lastIndex = currentIndex;
                this.pos = pos;
                this.forceUpdate(false, true);
            }
        };
        const touchend = () => {
            isDown = false;
            this.forceUpdate(false, true);
        };
        const touchcancel = () => {
            isDown = false;
            overCtx.clearRect(0, 0, this.width, this.height);
            this.forceUpdate(false, true);
        };
        const touchmove = e => {
            e.preventDefault();
            if (e.targetTouches.length === 2) {
                const touch1 = this.getMousePos(e.targetTouches[0]);
                const touch2 = this.getMousePos(e.targetTouches[1]);
                const currentDistance = Math.sqrt(Math.pow(touch1.x - touch2.x, 2) + Math.pow(touch1.y - touch2.y, 2));
                let [startIndex, endIndex] = this.state.range;
                const verticalRectNumber = endIndex - startIndex;
                let n = (verticalRectNumber - currentDistance / lastTouchDistance * verticalRectNumber);
                lastTouchDistance = currentDistance;
                if (n > 0) {
                    n = Math.ceil(n);
                } else {
                    n = Math.floor(n);
                }
                this.pos = touch1;
                scale(n);
            } else {
                move(e.targetTouches[0]);
            }
            this.forceUpdate(false, true);
        };
        overCanvas.addEventListener('touchstart', touchstart);
        overCanvas.addEventListener('touchend', touchend);
        overCanvas.addEventListener('touchcancel', touchcancel);
        overCanvas.addEventListener('touchmove', touchmove);
    }
}

export function drawHairLine() {
    const pos = this.pos;
    if (!pos) {
        return;
    }
    const overCtx = this.overCtx;
    const { mainView, mainYaxisView, aidView, aidYaxisView, timeView } = this;
    let [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;

    const currentIndex = Math.floor((pos.x - aidView.x) / aidView.w * verticalRectNumber);
    const x = currentIndex * aidView.w / verticalRectNumber + aidView.w / verticalRectNumber * 0.5 + mainView.x;
    const y = pos.y;

    // overCtx.clearRect(0, 0, this.width, this.height);
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
    const currentTime = this.option.overTimeFilter(this.state.times[startIndex + currentIndex]);
    overCtx.textAlign = 'center';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.background;
    overCtx.fillRect(x - overCtx.measureText(currentTime).width * 0.5 - 10, timeView.y + this.dpr, overCtx.measureText(currentTime).width + 20, timeView.h - this.dpr * 2);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(x - overCtx.measureText(currentTime).width * 0.5 - 10, timeView.y + this.dpr, overCtx.measureText(currentTime).width + 20, timeView.h - this.dpr * 2);
    overCtx.fillStyle = this.colors.currentTextColor;
    overCtx.fillText(currentTime, x, timeView.h * 0.5 + timeView.y);

    // 画y轴坐标
    const { max, min } = this.computAxis();
    let view = mainYaxisView;
    let w = this.width - view.x;
    overCtx.textAlign = 'right';
    overCtx.textBaseline = 'middle';
    overCtx.fillStyle = this.colors.background;
    overCtx.fillRect(view.x + this.dpr, y - 10 * this.dpr, w - 2 * this.dpr, 20 * this.dpr);
    overCtx.strokeStyle = this.colors.textFrameColor;
    overCtx.strokeRect(view.x + this.dpr, y - 10 * this.dpr, w - 2 * this.dpr, 20 * this.dpr);
    overCtx.fillStyle = this.colors.textColor;

    overCtx.textAlign = 'center';
    overCtx.fillStyle = this.colors.currentTextColor;
    if (this.isInLineView(pos) === mainView) {
        const yText = max - (max - min) * (y - view.y) / view.h;
        overCtx.fillText(yText.toFixed(this.option.priceDecimal), mainYaxisView.x + mainYaxisView.w * 0.5, y);
    } else {
        view = aidYaxisView;
        if (this.option.aidCsi === 'volume') {
            const yText = (1 - (y - view.y) / view.h) * (this.csiYaxisSector[0] - this.csiYaxisSector[1]);
            overCtx.fillText(this.setDP(yText), mainYaxisView.x + mainYaxisView.w * 0.5, y);
        } else if (this.option.aidCsi === 'macd' || this.option.aidCsi === 'kdj') {
            const yText = this.csiYaxisSector[1] * (y - view.y) / view.h + this.csiYaxisSector[0] * (1 - (y - view.y) / view.h);
            overCtx.fillText(this.setDP(yText), mainYaxisView.x + mainYaxisView.w * 0.5, y);
        }
    }

    const basicSelectOption = {
        time: this.state.times[currentIndex + startIndex],
        start: this.state.start[currentIndex + startIndex],
        hi: this.state.hi[currentIndex + startIndex],
        lo: this.state.lo[currentIndex + startIndex],
        close: this.state.close[currentIndex + startIndex],
        volume: this.state.volume[currentIndex + startIndex],
    };
    let selectOption = { ...basicSelectOption };
    if (this.option.mainCsi === 'ma') {
        selectOption = {
            ...selectOption,
            ma7: this.state.ma7[currentIndex + startIndex],
            ma30: this.state.ma30[currentIndex + startIndex],
        };
    } else if (this.option.mainCsi === 'ema') {
        selectOption = {
            ...selectOption,
            ema7: this.state.ema7[currentIndex + startIndex],
            ema30: this.state.ema30[currentIndex + startIndex],
        };
    } else if (this.option.mainCsi === 'boll') {
        selectOption = {
            ...selectOption,
            up: this.state.up[currentIndex + startIndex],
            mb: this.state.mb[currentIndex + startIndex],
            dn: this.state.dn[currentIndex + startIndex],
        };
    }

    this.select(selectOption, 0);

    if (this.option.aidCsi === 'volume') {
        this.select({
            volume: this.state.volume[currentIndex + startIndex],
            ma7: this.state.volumeMa7[currentIndex + startIndex],
            ma30: this.state.volumeMa30[currentIndex + startIndex],
        }, 1);
    }
    if (this.option.aidCsi === 'macd') {
        this.select({
            dif: this.state.dif[currentIndex + startIndex],
            dea: this.state.dea[currentIndex + startIndex],
            macd: this.state.macd[currentIndex + startIndex],
        }, 1);
    }
    if (this.option.aidCsi === 'kdj') {
        this.select({
            k: this.state.k[currentIndex + startIndex],
            d: this.state.d[currentIndex + startIndex],
            j: this.state.j[currentIndex + startIndex],
        }, 1);
    }
}
