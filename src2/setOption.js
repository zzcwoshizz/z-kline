export default function setOption(option = {}) {
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    let data = option.data;
    if (this.option) {
        const lastPeriod = this.option.period;
        this.option = {
            theme: option.theme || this.option.theme,
            fontSize: option.fontSize || this.option.fontSize,
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
        this.draw();
    } else {
        this.option = {
            theme: option.theme || 'light',
            fontSize: option.fontSize || 12,
            mainCsi: option.mainCsi || 'ma',
            aidCsi: option.aidCsi || 'volume',
            timeFilter: option.timeFilter || (t => new Date(t * 1000).toLocaleDateString()),
            overTimeFilter: option.overTimeFilter || (t => new Date(t * 1000).toLocaleTimeString()),
            priceDecimal: option.priceDecimal || 2,
            data: (data || []).map(d => d),
            period: option.period || 60 * 60,
        };

        init.call(this, option);
        this.draw();
    }
}

function init() {
    this.device = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) ? 'mb' : 'pc';
    // 设置全局色彩
    const isDarkTheme = this.option.theme === 'dark';
    this.colors = {
        background: isDarkTheme ? '#2e3947' : 'white',
        timeBackground: isDarkTheme ? '#343f4d' : '#fff',
        splitLine: isDarkTheme ? 'rgb(66, 73, 82)' : '#eee',
        textColor: isDarkTheme ? '#fff' : '#333',
        currentTextColor: isDarkTheme ? 'rgb(239, 229, 46)' : 'rgb(242, 121, 53)',
        textFrameColor: isDarkTheme ? 'white' : 'black',
        greenColor: isDarkTheme ? '#3bd181' : '#48b484',
        redColor: isDarkTheme ? '#eb3f2f' : '#d64541',
        ma30Color: isDarkTheme ? 'rgb(234, 177, 103)' : 'rgb(234, 177, 103)',
        ma7Color: isDarkTheme ? 'rgb(166, 206, 227)' : 'rgb(59, 187, 59)',
        macdColor: isDarkTheme ? 'rgb(208, 146, 209)' : 'rgb(208, 146, 209)',
        hairLine: isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
        mobileBar: isDarkTheme ? '#343f4d' : '#fafafa',
    };

    this.ctx.font = this.option.fontSize * this.dpr + 'px sans-serif';
    this.overCtx.font = this.option.fontSize * this.dpr + 'px sans-serif';

    const yAxisWidth = this.setData();

    const left = 20;
    const right = 20;
    const top = 40 * this.dpr;
    const bottom = 80;
    const middle = 20;

    const width = this.width;
    const height = this.height;

    this.proportion = 0.7;

    let mainView = {
        x: left,
        y: top,
        w: width - yAxisWidth - left - right - middle,
        h: (height - top - bottom) * this.proportion - middle * 0.5,
    };
    let mainYaxisView = {
        x: mainView.w + mainView.x + middle,
        y: mainView.y,
        w: yAxisWidth,
        h: mainView.h,
    };
    let aidView = {
        x: mainView.x,
        y: mainView.y + mainView.h + middle,
        w: mainView.w,
        h: (height - top - bottom) * (1 - this.proportion) + middle * 0.5,
    };
    let aidYaxisView = {
        x: mainYaxisView.x,
        y: aidView.y,
        w: yAxisWidth,
        h: aidView.h,
    };
    let timeView = {
        x: mainYaxisView.x,
        y: aidView.y + aidView.h,
        w: width,
        h: bottom,
    };
    this.mainView = mainView;
    this.mainYaxisView = mainYaxisView;
    this.aidView = aidView;
    this.aidYaxisView = aidYaxisView;
    this.timeView = timeView;

    this.maxVerticalRectNumber = parseInt(mainView.w / this.dpr / 2) % 2 === 0 ? parseInt(mainView.w / this.dpr / 2) : parseInt(mainView.w / this.dpr / 2) + 1;
    this.minVerticalRectNumber = 30;
}
