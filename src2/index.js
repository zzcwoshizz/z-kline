import 'babel-polyfill';
import 'whatwg-fetch';
import { KLine, Depth } from './KLine';
var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;

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

const period = 60;
const url = 'https://www.sosobtc.com/widgetembed/data/period?symbol=btc38dogecny&step=' + period;
fetch('http://45.248.68.30:3000/data?url=' + window.encodeURIComponent(url)).then(res => {
    return res.json();
}).then(json => {
    let chart = new KLine(canvas, overCanvas, {
        data: json,
        period,
        priceDecimal: 4,
        timeFilter: function(ctx, d) {
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
        overTimeFilter: function(d) {
            return new Date(d * 1000).toString('yyyy/MM/dd HH:mm');
        }
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
    var socket = window.io('http://45.248.68.30:3000');
    socket.on('connect', function() {
        socket.emit('market.subscribe', 'doge:btc38');
    });
    socket.on('update:trades', function(d) {
        // d = JSON.parse(d);
        for (let data of d) {
            let newTime = parseFloat(data.date);
            let newPrice = parseFloat(data.price);
            if (newTime - json[json.length - 1][0] < period) {
                let hi = Math.max(json[json.length - 1][2], newPrice);
                let lo = Math.min(json[json.length - 1][3], newPrice);
                let close = data.price;
                json[json.length - 1][2] = hi;
                json[json.length - 1][3] = lo;
                json[json.length - 1][4] = newPrice;
                json[json.length - 1][5] += parseFloat(data.amount.toFixed(3));
            } else {
                json.push([json[json.length - 1][0] + period, newPrice, newPrice, newPrice, newPrice, data.amount]);
            }
        }
        chart.setOption({ data: json });
    });
    setTimeout(function() {
        chart.setOption({ theme: 'light', data: json });
    }, 3000);

    // var ele = document.getElementById('depth');
    // var depth = new Depth(ele, { width: document.body.clientWidth, height: document.body.clientHeight * 0.5 });
    // socket.on('depth', function(data) {
        // data = JSON.parse(data);
        // const buy = [];
        // const sell = [];
        // data.asks.forEach(el => {
            // sell.push(el);
        // });
        // data.bids.forEach(el => {
            // buy.push(el);
        // });
        // depth.setData({ buy, sell: sell.reverse() });
    // });
});
