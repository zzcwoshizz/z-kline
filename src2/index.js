import 'babel-polyfill';
import 'whatwg-fetch';
import { KLine, Depth } from './KLine';
var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;

var app = document.getElementById('app');
app.style.width = bodyWidth + 'px';
app.style.height = bodyHeight + 'px';
app.style.position = 'relative';

// const socket = window.io.connect('http://120.26.203.206:9092');
const socket = window.io.connect('http://45.248.68.30:3000');
let depth;
socket.on('connect', function() {
    depth = new Depth(app, { width: bodyWidth, height: bodyHeight, fontSize: 24 });
});
setTimeout(function() {
    // socket.emit('subscribe:market', 'okcoin_btc');
    socket.emit('market.subscribe', 'dogebtc:poloniex');
}, 1000);
// socket.on('depth', function(data) {
socket.on('update:depth', function(data) {
    // depth.setData({ buy: data.bids, sell: data.asks });
    const buy = [];
    const sell = [];
    let bids = data.bids.replace(/\[|\]/g, '').split(',');
    let asks = data.asks.replace(/\[|\]/g, '').split(',');
    data.bids.replace(/\[|\]/g, '').split(',').forEach((el, i) => {
        let index = parseInt(i / 2);
        if (i % 2 === 0) {
            buy[index] = [];
            buy[index].push(Number(el));
        } else {
            buy[index].push(Number(el));
        }
    });
    data.asks.replace(/\[|\]/g, '').split(',').map((el, i) => {
        let index = parseInt(i / 2);
        if (i % 2 === 0) {
            sell[index] = [];
            sell[index].push(Number(el));
        } else {
            sell[index].push(Number(el));
        }
    });
    depth.setData({ buy, sell: sell.reverse() });
});

// var canvas = document.createElement('canvas');
// canvas.style.width = bodyWidth + 'px';
// canvas.style.height = bodyHeight + 'px';
// canvas.style.position = 'absolute';
// canvas.width = bodyWidth * 2;
// canvas.height = bodyHeight * 2;
// var overCanvas = document.createElement('canvas');
// overCanvas.style.width = bodyWidth + 'px';
// overCanvas.style.height = bodyHeight + 'px';
// overCanvas.style.position = 'absolute';
// overCanvas.style.top = 0;
// overCanvas.style.left = 0;
// overCanvas.width = bodyWidth * 2;
// overCanvas.height = bodyHeight * 2;

// app.appendChild(canvas);
// app.appendChild(overCanvas);

// const period = 60;
// const url = 'https://www.sosobtc.com/widgetembed/data/period?symbol=bittrexdogebtcbtc&step=' + period;
// fetch('http://45.248.68.30:3000/data?url=' + window.encodeURIComponent(url)).then(res => {
    // return res.json();
// }).then(json => {
    // let chart = new KLine(canvas, overCanvas, {
        // data: json,
        // period,
        // priceDecimal: 9,
        // timeFilter: function(ctx, d) {
            // let cha = (d[d.length - 1].time - d[0].time) / (d.length - 1);
            // let data;
            // if (cha < 3600) {
                // data = d.map(el => ({ time: new Date(el.time * 1000).toString('d日 H:m'), x: el.x, y: el.y }));
            // } else if (cha < 3600 * 24) {
                // data = d.map(el => ({ time: new Date(el.time * 1000).toString('d日 H'), x: el.x, y: el.y }));
            // } else if (cha < 3600 * 24 * 31) {
                // data = d.map(el => ({ time: new Date(el.time * 1000).toString('yyyy/M/d'), x: el.x, y: el.y }));
            // } else {
                // data = d.map(el => ({ time: new Date(el.time * 1000).toString('yyyy/M'), x: el.x, y: el.y }));
            // }
            // data.forEach(el => {
                // ctx.fillText(el.time, el.x, el.y);
            // });
        // },
        // overTimeFilter: function(d) {
            // return new Date(d * 1000).toString('yyyy/MM/dd HH:mm');
        // }
    // });
    // window.addEventListener('resize', function(e) {
        // var bodyWidth = document.body.clientWidth;
        // var bodyHeight = document.body.clientHeight;
        // app.style.width = bodyWidth + 'px';
        // app.style.height = bodyHeight + 'px';
        // canvas.style.width = bodyWidth + 'px';
        // canvas.style.height = bodyHeight + 'px';
        // canvas.width = bodyWidth * 2;
        // canvas.height = bodyHeight * 2;
        // overCanvas.style.width = bodyWidth + 'px';
        // overCanvas.style.height = bodyHeight + 'px';
        // overCanvas.width = bodyWidth * 2;
        // overCanvas.height = bodyHeight * 2;
        // chart.setOption({});
    // });
// });
