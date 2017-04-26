import { KLine } from './KLine.js';
fetch('http://localhost:3000/data').then(res => {
    return res.json();
}).then(json => {
    var chart = new KLine(document.getElementById('app'), {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    });
    chart.setData(json);
    console.log(chart);
    var socket = window.io.connect('http://localhost:3000');
    socket.on('update', function(data) {
        let newTime = parseInt(data.date);
        let newPrice = parseInt(data.price);
        if (newTime - json[json.length - 1][0] < 3600) {
            let hi = Math.max(json[json.length - 1][2], newPrice);
            let lo = Math.min(json[json.length - 1][3], newPrice);
            let close = data.price;
            json[json.length - 1][2] = hi;
            json[json.length - 1][3] = lo;
            json[json.length - 1][4] = data.price;
            json[json.length - 1][5] += data.amount;
            chart.setData(json);
            console.log(data);
        }
    });
});
