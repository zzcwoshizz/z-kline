export default function setData() {
    let maxLength = -1;
    const data = this.option.data;
    let times = [];
    let timeStr = [];
    let start = [];
    let hi = [];
    let lo = [];
    let close = [];
    let volume = [];
    data.forEach(d => {
        times.push(d[0]);
        timeStr.push(this.option.timeFilter(d[0]));
        start.push(d[1]);
        hi.push(d[2]);
        lo.push(d[3]);
        close.push(d[4]);
        volume.push(d[5]);
        maxLength = Math.max(
            maxLength,
            d[1].toFixed(this.option.priceDecimal).length,
            d[2].toFixed(this.option.priceDecimal).length,
            d[3].toFixed(this.option.priceDecimal).length,
            d[4].toFixed(this.option.priceDecimal).length,
            d[5].toFixed(this.option.priceDecimal).length
        );
    });
    this.state = {
        times,
        timeStr,
        start,
        hi,
        lo,
        close,
        volume,
        ma30: close.map((el, i) => {
            if (i < 29) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 30; index--) {
                    sum += close[index];
                }
                return this.setDP(sum / 30);
            }
        }),
        ma20: close.map((el, i) => {
            if (i < 19) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 20; index--) {
                    sum += close[index];
                }
                return this.setDP(sum / 20);
            }
        }),
        ma7: close.map((el, i) => {
            if (i < 6) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 7; index--) {
                    sum += close[index];
                }
                return this.setDP(sum / 7);
            }
        }),
        volumeMa7: volume.map((el, i) => {
            if (i < 6) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 7; index--) {
                    sum += volume[index];
                }
                return this.setDP(sum / 7);
            }
        }),
        volumeMa30: volume.map((el, i) => {
            if (i < 29) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 30; index--) {
                    sum += volume[index];
                }
                return this.setDP(sum / 30);
            }
        }),
        isDown: false,
        range: data.length > 44 ? [data.length - 44, data.length + 44] : [0, 88],
    };
    this.state.ema30 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema30[i] = el;
        } else {
            let val = 2 / 31 * (this.state.close[i] - this.state.ema30[i - 1]) + this.state.ema30[i - 1];
            this.state.ema30[i] = this.setDP(val);
        }
    });
    this.state.ema7 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema7[i] = el;
        } else {
            let val = 2 / 8 * (this.state.close[i] - this.state.ema7[i - 1]) + this.state.ema7[i - 1];
            this.state.ema7[i] = this.setDP(val);
        }
    });
    this.state.ema15 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema15[i] = el;
        } else {
            let val = 2 / 16 * (this.state.close[i] - this.state.ema15[i - 1]) + this.state.ema15[i - 1];
            this.state.ema15[i] = this.setDP(val);
        }
    });
    this.state.ema26 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema26[i] = el;
        } else {
            let val = 2 / 27 * (this.state.close[i] - this.state.ema26[i - 1]) + this.state.ema26[i - 1];
            this.state.ema26[i] = this.setDP(val);
        }
    });
    this.state.ema12 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema12[i] = el;
        } else {
            let val = 2 / 13 * (this.state.close[i] - this.state.ema12[i - 1]) + this.state.ema12[i - 1];
            this.state.ema12[i] = this.setDP(val);
        }
    });
    this.state.dif = this.state.ema12.map((el, i) => {
        let val = el - this.state.ema26[i];
        return this.setDP(val);
    });
    this.state.dea = [];
    this.state.dif.forEach((el, i) => {
        if (i === 0) {
            this.state.dea[i] = el;
        } else {
            let val = this.state.dea[i - 1] * 0.8 + el * 0.2;
            this.state.dea[i] = this.setDP(val);
        }
    });
    this.state.macd = this.state.dif.map((el, i) => {
        let val = (el - this.state.dea[i]) * 2;
        const macd = this.setDP(val);
        maxLength = Math.max(maxLength, macd.toString().length);
        return macd;
    });

    // 计算BOLL
    this.state.up = [];
    this.state.mb = [];
    this.state.dn = [];
    this.state.ma20.forEach((el, i) => {
        if (i === 0) {
            this.state.mb.push(this.state.ma20[i]);
            this.state.up.push(this.state.ma20[i]);
            this.state.dn.push(this.state.ma20[i]);
            return;
        }
        let sum = 0;
        for (let index = i < 20 ? 0 : i - 20; index < i; index++) {
            sum += (this.state.close[index] - this.state.ma20[index]) ** 2;
        }
        let md = Math.sqrt(sum / (i < 20 ? i : 20));
        this.state.mb.push(this.setDP(this.state.ma20[i - 1]));
        this.state.up.push(this.setDP(this.state.ma20[i - 1] + 2 * md));
        this.state.dn.push(this.setDP(this.state.ma20[i - 1] - 2 * md));
    });

    maxLength += 3;
    return Math.ceil(this.ctx.measureText(10 ** maxLength).width);
}
