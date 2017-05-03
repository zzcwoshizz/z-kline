export default function Depth(ele, option) {
    this.dpr = window.devicePixelRatio > 2 ? window.devicePixelRatio : 2;
    ele.style.width = option.width + 'px';
    ele.style.height = option.height + 'px';

    let canvas = document.createElement('canvas');
    canvas.style.width = option.width + 'px';
    canvas.style.height = option.height + 'px';
    canvas.width = option.width * this.dpr;
    canvas.height = option.height * this.dpr;
    this.canvas = canvas;

    this.width = option.width * this.dpr;
    this.height = option.height * this.dpr;
    this.ctx = canvas.getContext('2d');
    this.ctx.font = this.dpr * 12 + 'px sans-serif';

    ele.appendChild(canvas);

    this.theme = option.theme || 'white';
    this.colors = {
        background: this.theme === 'dark' ? 'black' : 'white',
        fontColor: this.theme === 'dark' ? '#656565' : '#656565',
        splitColor: this.theme === 'dark' ? '#333' : '#ccc',
    };

    canvas.addEventListener('mousemove', e => {
        this.pos = this.getMousePos(e);
        this.setData();
    });
    canvas.addEventListener('mouseout', e => {
        this.pos = null;
        this.setData();
    });
    canvas.addEventListener('mousecancel', e => {
        this.pos = null;
        this.setData();
    });
}

Depth.prototype.setData = function(data) {
    if (!data) {
        data = this.data;
    } else {
        this.data = data;
    }
    const { buy, sell } = this.data;

    const buyPrice = [];
    const sellPrice = [];
    const buyVolume = [];
    const sellVolume = [];
    buy.forEach(el => {
        buyPrice.push(el[0]);
        buyVolume.push(el[1]);
    });
    sell.forEach(el => {
        sellPrice.push(el[0]);
        sellVolume.push(el[1]);
    });
    let buyDepth = [];
    for (let i = 0; i < buyVolume.length; i++) {
        if (i === 0) {
            buyDepth[i] = parseFloat(buyVolume[i]);
            continue;
        }
        buyDepth[i] = buyDepth[i - 1] + parseFloat(buyVolume[i]);
    }
    let sellDepth = [];
    for (let i = 0; i < sellVolume.length; i++) {
        if (i === 0) {
            sellDepth[i] = parseFloat(sellVolume[i]);
            continue;
        }
        sellDepth[i] = sellDepth[i - 1] + parseFloat(sellVolume[i]);
    }

    const maxVolume = Math.max(buyDepth[buyDepth.length - 1], sellDepth[sellDepth.length - 1]);
    let n = (maxVolume * 0.2).toFixed(0).length;
    const interval = Math.ceil(maxVolume * 0.2 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    const yAxis = [];
    for (let i = interval; i < maxVolume; i += interval) {
        yAxis.unshift(i);
    }

    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = this.colors.background;
    ctx.fillRect(0, 0, this.width, this.height);


    let maxLength = 0;
    for (let i = interval; i < maxVolume; i += interval) {
        maxLength = Math.max(maxLength, ctx.measureText(i.toString()).width);
    }
    this.contentWidth = this.width - maxLength - 10;
    this.contentHeight = this.height - this.dpr * 16;


    n = ((sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]) * 0.25).toFixed(0).length;
    const intervalX = Math.ceil(maxVolume * 0.25 / Math.pow(10, n - 1)) * Math.pow(10, n - 1);
    ctx.fillStyle = this.colors.fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = buyPrice[buyPrice.length - 1] + intervalX; i < sellPrice[sellPrice.length - 1]; i += intervalX) {
        ctx.fillText(parseInt(i), (i - buyPrice[buyPrice.length - 1]) / (sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]) * this.contentWidth, this.contentHeight);
    }

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.fontColor;
    ctx.save();
    ctx.strokeStyle = this.colors.splitColor;
    ctx.setLineDash([2, 2]);
    for (let i = interval; i < maxVolume; i += interval) {
        let y = this.contentHeight - this.contentHeight * i / maxVolume;
        ctx.fillText(i, this.contentWidth + 5, y);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.contentWidth, y);
        ctx.stroke();
    }
    ctx.restore();

    // 买单
    const p1 = (buyPrice[0] - buyPrice[buyPrice.length - 1]) / (sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]);
    ctx.lineWidth = this.dpr;
    ctx.beginPath();
    ctx.moveTo(0, this.contentHeight - buyDepth[buyDepth.length - 1] / maxVolume * this.contentHeight);
    for (let i = buyDepth.length - 2; i >= 0; i--) {
        ctx.lineTo(this.contentWidth * p1 - this.contentWidth * p1 * i / buyDepth.length, this.contentHeight - buyDepth[i] / maxVolume * this.contentHeight);
        if (i === 0) {
            ctx.lineTo(this.contentWidth * p1 - this.contentWidth * p1 * i / buyDepth.length, this.contentHeight);
        }
    }
    ctx.lineTo(0, this.contentHeight);
    ctx.closePath();
    let lineargradient = ctx.createLinearGradient(0, 0, 0, this.contentHeight);
    lineargradient.addColorStop(0, 'rgba(54, 168, 83, 1)');
    lineargradient.addColorStop(1, 'rgba(171, 205, 82, 0.2)');
    ctx.fillStyle = lineargradient;
    ctx.fill();
    ctx.strokeStyle = '#246b38';
    ctx.stroke();

    // 卖单
    const p2 = (sellPrice[sellPrice.length - 1] - sellPrice[0]) / (sellPrice[sellPrice.length - 1] - buyPrice[buyPrice.length - 1]);
    ctx.beginPath();
    ctx.moveTo(this.contentWidth, this.contentHeight - sellDepth[sellDepth.length - 1] / maxVolume * this.contentHeight);
    for (let i = sellDepth.length - 2; i >= 0; i--) {
        ctx.lineTo(this.contentWidth * (1 - p2) + this.contentWidth * p2 * i / sellDepth.length, this.contentHeight - sellDepth[i] / maxVolume * this.contentHeight);
        if (i === 0) {
            ctx.lineTo(this.contentWidth * (1 - p2) + this.contentWidth * p2 * i / sellDepth.length, this.contentHeight);
        }
    }
    ctx.lineTo(this.contentWidth, this.contentHeight);
    ctx.closePath();
    lineargradient = ctx.createLinearGradient(this.contentWidth, 0, this.contentWidth, this.contentHeight);
    lineargradient.addColorStop(0, 'rgba(216, 34, 13, 1)');
    lineargradient.addColorStop(1, 'rgba(233, 84, 21, 0.2)');
    ctx.fillStyle = lineargradient;
    ctx.fill();
    ctx.strokeStyle = '#b81c0b';
    ctx.stroke();

    ctx.strokeStyle = this.colors.fontColor;
    ctx.strokeRect(0, 0, this.contentWidth, this.contentHeight);

    if (this.pos && this.pos.x < this.contentWidth && this.pos.y < this.contentHeight) {
        const num = buy.length * 2;
        const currentIndex = parseInt(this.pos.x / this.contentWidth * num);
        let x;
        let y;
        let rectH = 90;
        let text;
        if (currentIndex >= buy.length) {
            let i = currentIndex - buy.length;
            text = [sell[i][0], sellDepth[i]];
            ctx.beginPath();
            x = this.contentWidth * (1 - p2) + this.contentWidth * p2 * i / sellDepth.length;
            y = this.contentHeight - sellDepth[i] / maxVolume * this.contentHeight;
            ctx.arc(x, y, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(255, 0, 0)';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        } else {
            let i = currentIndex;
            text = [buy[buy.length - 1 - i][0], buyDepth[buyDepth.length - 1 - i]];
            ctx.beginPath();
            x = this.contentWidth * p1 * i / buyDepth.length;
            y = this.contentHeight - buyDepth[buyDepth.length - 1 - i] / maxVolume * this.contentHeight;
            ctx.arc(x, y, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = 'rgb(0, 255, 0)';
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
        ctx.strokeStyle = 'white';

        let rectW = ctx.measureText('买单：' + this.setDP(text[1])).width + 30;
        x = x > this.contentWidth * 0.5 ? x - 10 : x + 10;
        y = y > this.contentHeight * 0.5 ? y - 10 : y + 10;
        rectW = x > this.contentWidth * 0.5 ? -rectW : rectW;
        rectH = y > this.contentHeight * 0.5 ? -rectH : rectH;
        ctx.save();
        ctx.shadowColor = this.colors.fontColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 3;
        ctx.strokeRect(x, y, rectW, rectH);
        ctx.restore();

        ctx.fillStyle = '#656565';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        let textX = x > this.contentWidth * 0.5 ? x + rectW + 10 : x + 10;
        let textY = y > this.contentHeight * 0.5 ? y + rectH * 2 / 3 : y + rectH / 3;
        ctx.fillText('￥' + text[0], textX, textY);
        textY = y > this.contentHeight * 0.5 ? y + rectH / 3 : y + rectH * 2 / 3;
        ctx.fillText((currentIndex < buy.length ? '买单：' : '卖单：') + this.setDP(text[1]), textX, textY);
    }
};
