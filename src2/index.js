import 'babel-polyfill';
import 'whatwg-fetch';
import { KLine, Depth, Depth2 } from './KLine';
var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;

var app = document.getElementById('app');
app.style.width = bodyWidth + 'px';
app.style.height = bodyHeight + 'px';
app.style.position = 'relative';

var canvas = document.createElement('canvas');
canvas.style.width = bodyWidth + 'px';
canvas.style.height = bodyHeight * 0.6 + 'px';
canvas.style.position = 'absolute';
canvas.width = bodyWidth * 2;
canvas.height = bodyHeight * 0.6 * 2;
var overCanvas = document.createElement('canvas');
overCanvas.style.width = bodyWidth + 'px';
overCanvas.style.height = bodyHeight * 0.6 + 'px';
overCanvas.style.position = 'absolute';
overCanvas.style.top = 0;
overCanvas.style.left = 0;
overCanvas.width = bodyWidth * 2;
overCanvas.height = bodyHeight * 0.6 * 2;

app.appendChild(canvas);
app.appendChild(overCanvas);

const period = 60 * 60;
fetch(`http://120.26.102.105:8080/marketCenter/market/v0/kline?symbol=huobi_btc_cny&type=${period}`).then(res => {
    return res.json();
}).then(json => {
    let chart = new KLine(canvas, overCanvas, {
        data: json,
        period,
        priceDecimal: 2,
        timeFilter: function(ctx, d) {
            if (d.length < 1) {
                return;
            }
            let cha = (d[d.length - 1].time - d[0].time) / (d.length - 1);
            let data;
            if (cha < 3600) {
                data = d.map(el => ({ time: new Date(el.time * 1000).toString('d日 H:m'), x: el.x, y: el.y }));
            } else if (cha < 3600 * 24) {
                data = d.map(el => ({ time: new Date(el.time * 1000).toString('d日 H'), x: el.x, y: el.y }));
            } else if (cha < 3600 * 24 * 31) {
                data = d.map(el => ({ time: new Date(el.time * 1000).toString('yyyy/M/d'), x: el.x, y: el.y }));
            } else {
                data = d.map(el => ({ time: new Date(el.time * 1000).toString('yyyy/M'), x: el.x, y: el.y }));
            }
            data.forEach(el => {
                ctx.fillText(el.time, el.x, el.y);
            });
        },
        type: 'line',
        mainCsi: '',
        aidCsi: 'macd',
        overTimeFilter: function(d) {
            return new Date(d * 1000).toString('yyyy/MM/dd HH:mm');
        }
    });
    chart.beginDrawLine('arrow');
    console.log(chart);
    window.addEventListener('resize', function(e) {
        var bodyWidth = document.body.clientWidth;
        var bodyHeight = document.body.clientHeight;
        app.style.width = bodyWidth + 'px';
        app.style.height = bodyHeight * 0.6 + 'px';
        canvas.style.width = bodyWidth + 'px';
        canvas.style.height = bodyHeight * 0.6 + 'px';
        canvas.width = bodyWidth * 2;
        canvas.height = bodyHeight * 0.6 * 2;
        overCanvas.style.width = bodyWidth + 'px';
        overCanvas.style.height = bodyHeight * 0.6 + 'px';
        overCanvas.width = bodyWidth * 2;
        overCanvas.height = bodyHeight * 0.6 * 2;
        chart.setOption({});
    });
});


fetch('http://120.26.102.105:8080/marketCenter/market/v0/depth?symbol=huobi_btc').then(res => {
    return res.json();
}).then(json => {
    var depthCanvas = document.createElement('canvas');
    depthCanvas.style.width = bodyWidth + 'px';
    depthCanvas.style.height = bodyHeight * 0.4 + 'px';
    depthCanvas.style.position = 'absolute';
    depthCanvas.width = bodyWidth * 2;
    depthCanvas.height = bodyHeight * 0.4 * 2;
    depthCanvas.style.top = bodyHeight * 0.6 + 'px';
    depthCanvas.style.left = 0;
    app.appendChild(depthCanvas);

    var depth = new Depth2(depthCanvas, json, { theme: 'dark' });
});
