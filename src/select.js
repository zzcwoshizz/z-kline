export default function(data, flag) {
    const bar = this.topBar[flag];
    let topContent = '';
    for (let key in data) {
        let color = '';
        switch (key) {
            case 'time':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px">
                    时间：${this.option.overTimeFilter(data[key])}
                </div>`;
                break;
            case 'volume':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px">
                    量：${data[key]}
                </div>`;
                break;
            case 'start':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px">
                    开：${data[key]}
                </div>`;
                break;
            case 'hi':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px">
                    高：${data[key]}
                </div>`;
                break;
            case 'lo':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px">
                    低：${data[key]}
                </div>`;
                break;
            case 'close':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px">
                    收：${data[key]}
                </div>`;
                break;
            case 'ma7':
                color = this.colors.ma7Color;
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px;color:${color}">
                    MA7：${data[key]}
                </div>`;
                break;
            case 'ma30':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px;color:${this.colors.ma30Color}">
                    MA30：${data[key]}
                </div>`;
                break;
            case 'ema7':
                color = this.colors.ma7Color;
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px;color:${color}">
                    EMA7：${data[key]}
                </div>`;
                break;
            case 'ema30':
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}px;color:${this.colors.ma30Color}">
                    EMA30：${data[key]}
                </div>`;
                break;
            default:
                topContent += `<div style="float:left;margin-right:${this.dpr * 10}">${data[key]}</div>`;
                break;
        }
    }
    bar.innerHTML = topContent;

}
