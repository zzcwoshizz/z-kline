export default function setData(data) {
    this.state = {
        startIndex: data.length - 50,
        endIndex: data.length,
        verticalRectNumber: 50,
        isDown: false,
        times: data.map(d => d[0]),
        start: data.map(d => d[1]),
        hi: data.map(d => d[2]),
        lo: data.map(d => d[3]),
        close: data.map(d => d[4]),
        volume: data.map(d => d[5]),
        ma30: (data.map(d => d[4])).map((el, i) => {
            if (i < 29) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 30; index--) {
                    sum += data.map(d => d[4])[index];
                }
                return this.setDP(sum / 30);
            }
        }),
        ma7: (data.map(d => d[4])).map((el, i) => {
            if (i < 6) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 7; index--) {
                    sum += data.map(d => d[4])[index];
                }
                return this.setDP(sum / 7);
            }
        }),
        volumeMa7: (data.map(d => d[5])).map((el, i) => {
            if (i < 6) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 7; index--) {
                    sum += data.map(d => d[5])[index];
                }
                return this.setDP(sum / 7);
            }
        }),
        volumeMa30: (data.map(d => d[5])).map((el, i) => {
            if (i < 29) {
                return el;
            } else {
                let sum = 0;
                for (let index = i; index > i - 30; index--) {
                    sum += data.map(d => d[5])[index];
                }
                return this.setDP(sum / 30);
            }
        }),
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
    this.draw();
}
