import { KLine } from './KLine.js';
fetch('http://192.168.16.160:3000/data').then(res => {
    return res.json();
}).then(json => {
    var chart = new KLine(document.getElementById('app'), {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        intervalY: 30,
    });
    chart.setData(json);
    console.log(chart);
    var socket = window.io.connect('http://192.168.16.160:3000');
    socket.on('update', function(data) {
        let newTime = parseInt(data.date);
        let newPrice = parseInt(data.price);
        if (newTime - json[json.length - 1][0] < 60) {
            let hi = Math.max(json[json.length - 1][2], newPrice);
            let lo = Math.min(json[json.length - 1][3], newPrice);
            let close = data.price;
            json[json.length - 1][2] = hi;
            json[json.length - 1][3] = lo;
            json[json.length - 1][4] = newPrice;
            json[json.length - 1][5] += data.amount;
            chart.update(json);
            console.log(data);
        } else {
            json.push([json[json.length - 1][0] + 60, newPrice, newPrice, newPrice, newPrice, data.amount]);
            chart.update(json);
        }
    });
});
