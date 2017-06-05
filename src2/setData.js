export default function setData() {
    let maxLength = -1;
    const data = this.option.data;
    let times = [];
    let start = [];
    let hi = [];
    let lo = [];
    let close = [];
    let volume = [];
    data.forEach(d => {
        times.push(d[0]);
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
                return this.setDP(sum / 30, this.option.priceDecimal + 2);
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
                return this.setDP(sum / 20, this.option.priceDecimal + 2);
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
                return this.setDP(sum / 7, this.option.priceDecimal + 2);
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
        range: data.length > 70 ? [data.length - 70, data.length + 18] : [0, 88],
    };
    this.state.ema30 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema30[i] = el;
        } else {
            let val = 2 / 31 * (this.state.close[i] - this.state.ema30[i - 1]) + this.state.ema30[i - 1];
            this.state.ema30[i] = this.setDP(val, this.option.priceDecimal + 2);
        }
    });
    this.state.ema7 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema7[i] = el;
        } else {
            let val = 2 / 8 * (this.state.close[i] - this.state.ema7[i - 1]) + this.state.ema7[i - 1];
            this.state.ema7[i] = this.setDP(val, this.option.priceDecimal + 2);
        }
    });
    this.state.ema15 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema15[i] = el;
        } else {
            let val = 2 / 16 * (this.state.close[i] - this.state.ema15[i - 1]) + this.state.ema15[i - 1];
            this.state.ema15[i] = this.setDP(val, this.option.priceDecimal + 2);
        }
    });
    this.state.ema26 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema26[i] = el;
        } else {
            let val = 2 / 27 * (this.state.close[i] - this.state.ema26[i - 1]) + this.state.ema26[i - 1];
            this.state.ema26[i] = this.setDP(val, this.option.priceDecimal + 2);
        }
    });
    this.state.ema12 = [];
    this.state.close.forEach((el, i) => {
        if (i === 0) {
            this.state.ema12[i] = el;
        } else {
            let val = 2 / 13 * (this.state.close[i] - this.state.ema12[i - 1]) + this.state.ema12[i - 1];
            this.state.ema12[i] = this.setDP(val, this.option.priceDecimal + 2);
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
        this.state.mb.push(this.setDP(this.state.ma20[i - 1], this.option.priceDecimal + 2));
        this.state.up.push(this.setDP(this.state.ma20[i - 1] + 2 * md, this.option.priceDecimal + 2));
        this.state.dn.push(this.setDP(this.state.ma20[i - 1] - 2 * md, this.option.priceDecimal + 2));
    });

    // 计算kdj
    this.state.k = [];
    this.state.d = [];
    this.state.j = [];
    this.state.close.forEach((el, i) => {
        let h = this.state.hi[i - 8 < 0 ? 0 : i - 8];
        let l = this.state.lo[i - 8 < 0 ? 0 : i - 8];
        let defaultIndex = i - 8 < 0 ? 0 : i - 8;
        for (let index = defaultIndex; index <= i; index++) {
            l = Math.min(this.state.lo[index], l);
            h = Math.max(this.state.hi[index], h);
        }
        let rsv;
        if (h === l) {
            rsv = 100;
        } else {
            rsv = (el - l) / (h - l) * 100;
        }
        if (i === 0) {
            this.state.k.push(this.setDP(100 / 3 + rsv / 3));
            this.state.d.push(this.setDP(100 / 3 + this.state.k[i] / 3));
            this.state.j.push(this.setDP(3 * this.state.k[i] - 2 * this.state.d[i]));
            return;
        }
        this.state.k.push(this.setDP(2 / 3 * this.state.k[i - 1] + rsv / 3));
        this.state.d.push(this.setDP(2 / 3 * this.state.d[i - 1] + this.state.k[i] / 3));
        this.state.j.push(this.setDP(3 * this.state.k[i] - 2 * this.state.d[i]));
    });

    // 计算sar
    this.state.sar = [];
    let af = 0.02;
    for (let i = 0; i < times.length; i++) {
        if (i === 0) {
            this.state.sar.push(this.state.lo[i]);
            continue;
        }
        if (i === 1) {
            this.state.sar.push(this.state.hi[i]);
            continue;
        }
        let ep;
        if (this.state.close[i] > this.state.close[i - 1]) {
            ep = Math.max(this.state.hi[i - 1], this.state.hi[i - 2]);
        } else {
            ep = Math.min(this.state.lo[i - 1], this.state.lo[i - 2]);
        }
        if (this.state.close[i] > this.state.close[i - 1] && this.state.close[i - 1] > this.state.close[i - 2]) {
            if (Math.max(this.state.hi[i], this.state.hi[i - 1]) > Math.max(this.state.hi[i - 1], this.state.hi[i - 2])) {
                af = af + 0.02 > 0.2 ? 0.2 : af + 0.02;
            }
        } else if (this.state.close[i] <= this.state.close[i - 1] && this.state.close[i - 1] <= this.state.close[i - 2]) {
            if (Math.min(this.state.lo[i], this.state.lo[i - 1]) < Math.min(this.state.lo[i - 1], this.state.lo[i - 2])) {
                af = af + 0.02 > 0.2 ? 0.2 : af + 0.02;
            }
        } else {
            af = 0.02;
        }
        let preSar = this.state.sar[i - 1];
        let sar = preSar + af * (ep - preSar);
        if (this.state.close[i] > this.state.close[i - 1]) {
            if (sar > this.state.lo[i] || sar > this.state.lo[i - 1] || sar > this.state.lo[i - 2]) {
                sar = Math.min(this.state.lo[i], this.state.lo[i - 1], this.state.lo[i - 2]);
            }
        } else {
            if (sar < this.state.hi[i] || sar < this.state.hi[i - 1] || sar < this.state.hi[i - 2]) {
                sar = Math.max(this.state.hi[i], this.state.hi[i - 1], this.state.hi[i - 2]);
            }
        }
        this.state.sar.push(sar);
    }
    maxLength = maxLength > 20 ? 20 : maxLength;

    return Math.ceil(this.ctx.measureText(10 ** maxLength).width);
}
