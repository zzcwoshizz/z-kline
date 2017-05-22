import { KLine } from './KLine';
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

const url = 'https://www.sosobtc.com/widgetembed/data/period?symbol=okcoinbtccny&step=' + 60;
fetch('http://45.248.68.30:3000/data?url=' + window.encodeURIComponent(url)).then(res => {
    return res.json();
}).then(json => {
    let chart = new KLine(canvas, overCanvas, {
        data: json,
    });
    const socket = window.io.connect('http://45.248.68.30:3000');
    socket.on('connect', function() {
        socket.emit('market.subscribe', 'btc:okcoin');
    });
    socket.on('update:trades', function(d) {
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
});
