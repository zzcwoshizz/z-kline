const express = require('express');
const cors = require('cors');
const request = require('request');
const WebSocket = require('ws');

const app = express();
app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
}));

app.get('/data', function(req, res) {
    request({
        url: 'https://k.sosobtc.com/data/period?symbol=okcoinbtccny&step=60',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
            'Content-Type': 'application/json',
        },
    }, function (erro, response, body) {
        res.json(JSON.parse(body));
    });
});


const io = require('socket.io').listen(app.listen(3000));
io.sockets.on('connection', function(socket) {
    let wurl = 'wss://io.sosobtc.com/socket.io/?EIO=3&transport=websocket';
    let ws = new WebSocket(wurl, [], {
        perMessageDeflate: true
    });
    ws.on('open', function() {
        ws.send('420["market.subscribe","btc:okcoin"]');
        setInterval(function() {
            ws.send('3');
        }, 3600);
        ws.on('message', function(data, flags) {
            if (data.indexOf('update:trades') > -1) {
                console.log(JSON.parse(data.slice(2, data.length))[1][0]);
                socket.emit('update', JSON.parse(data.slice(2, data.length))[1][0]);
            }
        });
    });
});
