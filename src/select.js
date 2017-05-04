function transformKey(key) {
    if (key === 'time') {
        return '时间';
    } else if (key === 'start') {
        return '开';
    } else if (key === 'hi') {
        return '高';
    } else if (key === 'lo') {
        return '低';
    } else if (key === 'close') {
        return '收';
    } else if (key === 'volume') {
        return '量';
    } else if (key === 'macd') {
        return 'MACD';
    } else if (key === 'ema7') {
        return 'EMA7';
    } else if (key === 'ema30') {
        return 'EMA30';
    } else if (key === 'ma7') {
        return 'MA7';
    } else if (key === 'ma30') {
        return 'MA30';
    } else if (key === 'dif') {
        return 'DIF';
    } else if (key === 'dea') {
        return 'DEA';
    } else {
        return key;
    }
}

function setStyle(key, ctx) {
    key = key.toLowerCase();
    if (key === 'ema7' || key === 'ma7' || key === 'dif') {
        ctx.fillStyle = this.colors.ma7Color;
    } else if (key === 'ema30' || key === 'ma30' || key === 'dea') {
        ctx.fillStyle = this.colors.ma30Color;
    } else if (key === 'macd') {
        ctx.fillStyle = this.colors.macdColor;
    } else {
        ctx.fillStyle = this.colors.textColorLight;
    }
}

export default function(data, flag) {
    let overCtx = this.overCtx;
    overCtx.textAlign = 'left';
    overCtx.textBaseline = 'top';
    if (flag === 0) {
        if (this.device === 'pc') {
            let x = 5;
            let y = 5;
            for (let i = 0; i < Object.keys(data).length; i++) {
                let key = Object.keys(data)[i];
                let text;
                if (key === 'time') {
                    text = '时间：' + this.option.overTimeFilter(data[key]);
                } else {
                    text = transformKey(key) + '：' + data[key];
                }
                if (overCtx.measureText(text).width + x + 40 > this.views[0].x + this.views[0].w) {
                    x = 5;
                    y += 40;
                }
                setStyle.call(this, key, overCtx);
                overCtx.fillText(text, x, y);
                x += overCtx.measureText(text).width + 40;
            }
        } else {
            let text = `${this.option.overTimeFilter(data.time)}   开${data.start}   高${data.hi}   低${data.lo}   收${data.close}`;
            overCtx.textAlign = 'center';
            overCtx.textBaseline = 'middle';
            overCtx.fillStyle = '#343f4d';
            overCtx.fillRect(0, 0, this.width, 32 * this.dpr);
            overCtx.fillStyle = this.colors.textColor;
            overCtx.fillText(text, this.width * 0.5, 16 * this.dpr);
            let x = 5;
            let y = 32 * this.dpr + 5;
            overCtx.textAlign = 'left';
            overCtx.textBaseline = 'top';
            for (let i = 0; i < Object.keys(data).length; i++) {
                let key = Object.keys(data)[i];
                if (/(time|start|hi|lo|end)/g.test(key)) {
                    continue;
                }
                text = transformKey(key) + '：' + data[key];
                if (overCtx.measureText(text).width + x + 40 > this.views[0].x + this.views[0].w) {
                    x = 5;
                    y += 40;
                }
                setStyle.call(this, key, overCtx);
                overCtx.fillText(text, x, y);
                x += overCtx.measureText(text).width + 40;
            }
        }
    } else if (flag === 1) {
        let x = 5;
        let y = this.views[2].y;
        for (let i = 0; i < Object.keys(data).length; i++) {
            let key = Object.keys(data)[i];
            let text = transformKey(key) + '：' + data[key];
            if (overCtx.measureText(text).width + x + 40 > this.views[0].x + this.views[0].w) {
                x = 5;
                y += 40;
            }
            setStyle.call(this, key, overCtx);
            overCtx.fillText(text, x, y);
            x += overCtx.measureText(text).width + 40;
        }
    }
}
