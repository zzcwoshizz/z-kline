import { KLine, Depth } from './KLine.js';
fetch('http://192.168.16.160:3000/data').then(res => {
    return res.json();
}).then(json => {
    var chart = new KLine(document.getElementById('app'), {
        width: 800,
        height: document.documentElement.clientHeight,
        intervalY: 30,
        theme: 'dark',
    });
    chart.setData(json);
    // var ws = new window.WebSocket('ws://192.168.16.49:8080/infoCenter/btc');
    // ws.onopen = function(e) {
        // ws.send('["market:add","btctrade:btc"]');
    // };
    // ws.onmessage = function(e) {
        // console.log(e.data);
    // };
    // ws.onerror = function(e) {
        // console.log(e);
    // };
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
        } else {
            json.push([json[json.length - 1][0] + 60, newPrice, newPrice, newPrice, newPrice, data.amount]);
            chart.update(json);
        }
    });

    var ele = document.getElementById('depth');
    var depth = new Depth(ele, { width: 300, height: 400 });
    socket.on('depth', function(data) {
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
});
