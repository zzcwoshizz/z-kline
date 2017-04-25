import setData from './setData';
export function KLine(ele, option) {
    if (option === undefined || option === null) {
        option = {};
    }
    this.ele = ele;
    this.setOption(option);
}

KLine.prototype = {
    setOption,
    setData,
    setDP,
};

// 控制小数位数
function setDP(num) {
    return Math.abs(num) > 1 ? Number(num.toFixed(2)) : Number(num.toFixed(7));
}

function setOption(option) {
    if (option.width === undefined || option.widh === null) {
        console.error('option.width must be number');
    }
    if (option.height === undefined || option.height === null) {
        console.error('option.height must be number');
    }
    // 配置项
    this.option = {
        theme: option.theme || 'dark',
        width: option.width,
        height: option.height,
        intervalY: option.intervalY || 200,
        intervalX: option.intervalX || 50,
        maxKLineNumber: option.maxKLineNumber || parseInt(option.width / 2),
        minKLineNumber: option.minKLineNumber || 20,
        yAxisWidth: option.yAxisWidth || 120,
        fontSize: option.fontSize || 14,
        csi: option.csi || 'ema',
        csi2: option.csi2 || ['macd'],
        onChange: option.onChange || function() {},
        onSelect: option.onSelect || this.select,
        timeFilter: option.timeFilter || (t => {
            return new Date(t * 1000).toLocaleDateString();
        }),
        priceFilter: option.priceFilter || (d => {
            return Number(d.toFixed(2));
        }),
        overTimeFilter: option.overTimeFilter || (t => {
            return new Date(t * 1000).toLocaleTimeString();
        }),
        overYFilter: option.overYFilter || (d => {
            return Number(d.toFixed(2));
        }),
    };
}
