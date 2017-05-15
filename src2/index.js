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
});
