Date.prototype.format = function(fmt) {
    if (this == 'Invalid Date') {
        return '';
    }
    var o = {
        'M+': this.getMonth() + 1,
        'D+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds(),
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '')
        .substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1,
                (RegExp.$1.length == 1) ?
                (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};
export default function setOption(option = {}) {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    let data = option.data;
    if (this.option) {
        const lastPeriod = this.option.period;
        this.option = {
            theme: option.theme || this.option.theme,
            fontSize: option.fontSize || this.option.fontSize,
            type: option.type || this.option.type,
            mainCsi: option.mainCsi || this.option.mainCsi,
            aidCsi: option.aidCsi || this.option.aidCsi,
            timeFilter: option.timeFilter || this.option.timeFilter,
            overTimeFilter: option.overTimeFilter || this.option.overTimeFilter,
            priceDecimal: option.priceDecimal || this.option.priceDecimal,
            data: (data || this.option.data).map(d => d),
            period: option.period || this.option.period,
        };
        const lastRange = this.state.range;
        init.call(this, option);
        if (lastPeriod === this.option.period) {
            this.state.range = lastRange;
        }
    } else {
        this.option = {
            theme: option.theme || 'dark',
            fontSize: option.fontSize || 12,
            type: option.type || 'candle',
            mainCsi: option.mainCsi || 'ema',
            aidCsi: option.aidCsi,
            timeFilter: option.timeFilter || (t => new Date(t * 1000).toString('M/d/yyyy')),
            overTimeFilter: option.overTimeFilter || (t => new Date(t * 1000).toString('M/d/yyyy')),
            priceDecimal: option.priceDecimal === undefined ? 0 : option.priceDecimal,
            data: (data || []).map(d => d),
            period: option.period || 60 * 60,
        };

        init.call(this, option);
    }
}

function init() {
    this.device = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) ? 'mb' : 'pc';
    // 设置全局色彩
    const isDarkTheme = this.option.theme === 'dark';
    this.colors = {
        background: isDarkTheme ? '#0e2029' : '#ebf5fa',
        splitLine: isDarkTheme ? '#33434b' : '#c2cacf',
        lightColor: isDarkTheme ? '#ddd' : '#666',
        textColor: isDarkTheme ? '#878f94' : '#333',
        currentTextColor: isDarkTheme ? '#cad8e0' : '#000',
        textFrameColor: isDarkTheme ? '#5d727a' : '#a0a8ad',
        greenColor: isDarkTheme ? '#66d430' : '#68d12c',
        redColor: isDarkTheme ? '#d11e37' : '#d11d38',
        ma30Color: isDarkTheme ? 'rgb(234, 177, 103)' : 'rgb(234, 177, 103)',
        ma7Color: isDarkTheme ? 'rgb(166, 206, 227)' : 'rgb(59, 187, 59)',
        macdColor: isDarkTheme ? 'rgb(208, 146, 209)' : 'rgb(208, 146, 209)',
        hairLine: isDarkTheme ? '#33434b' : 'd3dbe0',
        mobileBar: isDarkTheme ? '#343f4d' : '#fafafa',
        lineColor: isDarkTheme ? '#ccc' : '#333',
        lineHilightColor: isDarkTheme ? '#fff' : '#000',
    };

    this.ctx.font = this.option.fontSize * this.dpr + 'px sans-serif';
    this.overCtx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    const yAxisWidth = this.setData();

    const left = 10 * this.dpr;
    const right = 0 * this.dpr;
    const top = 40 * this.dpr;
    const bottom = 20 * this.dpr;
    const middle = 10 * this.dpr;

    const width = this.width;
    const height = this.height;

    if (!this.option.aidCsi) {
        this.proportion = 1;
    } else {
        this.proportion = 0.7;
    }

    let mainView = {
        x: left,
        y: top,
        w: width - yAxisWidth - left - right - middle,
        h: (height - top - bottom) * this.proportion,
    };
    let mainYaxisView = {
        x: mainView.w + mainView.x + middle,
        y: mainView.y,
        w: yAxisWidth,
        h: mainView.h,
    };
    let aidView = {
        x: mainView.x,
        y: mainView.y + mainView.h,
        w: mainView.w,
        h: (height - top - bottom) * (1 - this.proportion),
    };
    let aidYaxisView = {
        x: mainYaxisView.x,
        y: aidView.y,
        w: yAxisWidth,
        h: aidView.h,
    };
    let timeView = {
        x: mainView.x,
        y: aidView.y + aidView.h,
        w: aidView.x + aidView.w + middle,
        h: bottom,
    };
    this.mainView = mainView;
    this.mainYaxisView = mainYaxisView;
    this.aidView = aidView;
    this.aidYaxisView = aidYaxisView;
    this.timeView = timeView;

    this.maxVerticalRectNumber = parseInt(mainView.w / this.dpr / 2) % 2 === 0 ? parseInt(mainView.w / this.dpr / 2) : parseInt(mainView.w / this.dpr / 2) + 1;
    this.minVerticalRectNumber = 30;
    this.force = [true, true];

    this.lines = [];
    this.lineCache = null;
    this.mousePos = {};
}
