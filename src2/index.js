import { KLine, Depth } from './KLine';
var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight * 0.5;

var app = document.getElementById('app');
app.style.width = bodyWidth + 'px';
app.style.height = bodyHeight + 'px';
app.style.position = 'relative';

var canvas = document.createElement('canvas');
canvas.style.width = bodyWidth + 'px';
canvas.style.height = bodyHeight + 'px';
canvas.style.position = 'absolute';
canvas.width = bodyWidth * 2;
canvas.height = bodyHeight * 2;
var overCanvas = document.createElement('canvas');
overCanvas.style.width = bodyWidth + 'px';
overCanvas.style.height = bodyHeight + 'px';
overCanvas.style.position = 'absolute';
overCanvas.style.top = 0;
overCanvas.style.left = 0;
overCanvas.width = bodyWidth * 2;
overCanvas.height = bodyHeight * 2;

app.appendChild(canvas);
app.appendChild(overCanvas);

const url = 'https://www.sosobtc.com/widgetembed/data/period?symbol=okcoinbtccny&step=' + 60;
fetch('http://192.168.1.125:8080/infoCenter/market/kline?symbol=btctrade_btc_cny&type=' + 60).then(res => {
    return res.json();
}).then(json => {
    let chart = new KLine(canvas, overCanvas, {
        data: json,
    });
    window.addEventListener('resize', function(e) {
        var bodyWidth = document.body.clientWidth;
        var bodyHeight = document.body.clientHeight * 0.5;
        app.style.width = bodyWidth + 'px';
        app.style.height = bodyHeight + 'px';
        canvas.style.width = bodyWidth + 'px';
        canvas.style.height = bodyHeight + 'px';
        canvas.width = bodyWidth * 2;
        canvas.height = bodyHeight * 2;
        overCanvas.style.width = bodyWidth + 'px';
        overCanvas.style.height = bodyHeight + 'px';
        overCanvas.width = bodyWidth * 2;
        overCanvas.height = bodyHeight * 2;
        chart.setOption({});
    });
    const socket = window.io.connect('http://192.168.1.125:9092');
    socket.on('connect', function() {
        socket.emit('subscribe:market', 'btctrade:btc');
    });
    socket.on('trade', function(d) {
        d = JSON.parse(d);
        for (let data of d) {
            let newTime = parseFloat(data.date);
            let newPrice = parseFloat(data.price);
            if (newTime - json[json.length - 1][0] < 60) {
                let hi = Math.max(json[json.length - 1][2], newPrice);
                let lo = Math.min(json[json.length - 1][3], newPrice);
                let close = data.price;
                json[json.length - 1][2] = hi;
                json[json.length - 1][3] = lo;
                json[json.length - 1][4] = newPrice;
                json[json.length - 1][5] += parseFloat(data.amount.toFixed(3));
            } else {
                json.push([json[json.length - 1][0] + 60, newPrice, newPrice, newPrice, newPrice, data.amount]);
            }
        }
        chart.append(json);
    });

    var ele = document.getElementById('depth');
    var depth = new Depth(ele, { width: document.body.clientWidth, height: document.body.clientHeight * 0.5 });
    socket.on('depth', function(data) {
        data = JSON.parse(data);
        const buy = [];
        const sell = [];
        data.asks.forEach(el => {
            sell.push(el);
        });
        data.bids.forEach(el => {
            buy.push(el);
        });
        depth.setData({ buy, sell: sell.reverse() });
    });
});
