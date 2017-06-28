function toInt(num) {
    return ~~(0.5 + num);
}
const getPeriod = n => {
    return (...arr) => {
        if (Math.floor(n) >= arr.length) {
            return arr[arr.length - 1];
        } else {
            return arr[Math.floor(n)];
        }
    };
};
export default function drawTimeline() {
    const ctx = this.ctx;
    const times = this.state.times;
    const timeStr = this.state.timeStr;
    const mainView = this.mainView;
    const timeView = this.timeView;
    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;
    const period = this.option.period;
    // 时间轴
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let p;
    const n = verticalRectNumber / this.maxVerticalRectNumber * 5;
    if (period === 60) {
        p = getPeriod(n)(600, 1200, 1800, 2400, 3000);
    } else if (period === 60 * 3) {
        p = getPeriod(n)(600 * 3, 1200 * 3, 1800 * 3, 2400 * 3, 3000 * 3);
    } else if (period === 60 * 5) {
        p = getPeriod(n)(600 * 5, 1200 * 5, 1800 * 5, 2400 * 5, 3000 * 5);
    } else if (period === 60 * 15) {
        p = getPeriod(n)(600 * 15, 1200 * 15, 1800 * 15, 2400 * 15, 3000 * 15, 3600 * 15);
    } else if (period === 60 * 30) {
        p = getPeriod(n)(600 * 30, 1200 * 30, 1800 * 30, 2400 * 30, 3000 * 30, 3600 * 30);
    } else if (period === 60 * 60) {
        p = getPeriod(n)(600 * 60, 1200 * 60, 1800 * 60, 2400 * 60, 3000 * 60, 3600 * 60);
    } else if (period === 60 * 60 * 12) {
        p = getPeriod(n)(600 * 60 * 12, 1200 * 60 * 12, 1800 * 60 * 12, 2400 * 60 * 12, 3000 * 60 * 12, 3600 * 60 * 12);
    } else if (period === 60 * 60 * 24) {
        p = getPeriod(n)(600 * 60 * 24, 1200 * 60 * 24, 1800 * 60 * 24, 2400 * 60 * 24, 3000 * 60 * 24, 3600 * 60 * 24);
    } else if (period === 60 * 60 * 24 * 7) {
        p = getPeriod(n)(600 * 60 * 24 * 7, 1200 * 60 * 24 * 7, 1800 * 60 * 24 * 7, 2400 * 60 * 24 * 7, 3000 * 60 * 24 * 7, 3600 * 60 * 24 * 7);
    } else if (period === 60 * 60 * 24 * 30) {
        p = false;
    }
    const timeFilterParams = [];
    for (let i = startIndex; i < endIndex; i++) {
        if (i >= times.length) {
            break;
        }
        if (times[i] % p === 0) {
            let x = (i - startIndex) / verticalRectNumber * mainView.w + mainView.x;
            let y = timeView.y + timeView.h * 0.5;
            x = toInt(x);
            y = toInt(y);
            timeFilterParams.push({ x, y, time: times[i] });
            // ctx.beginPath();
            // ctx.moveTo(x, this.height - 2);
            // ctx.lineTo(x, this.height - 8);
            // ctx.stroke();
        }
    }
    this.option.timeFilter(ctx, timeFilterParams);
}
