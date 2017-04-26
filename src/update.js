export default function update(data) {
    let lastState = this.state;
    this.setData(data);
    let cha = 0;
    this.state.timeStr = lastState.timeStr;
    if (this.state.times.length > lastState.times.length) {
        this.state.timeStr.push(this.option.timeFilter(this.state.times[this.state.times.length - 1]));
        if (lastState.endIndex === lastState.times.length) {
            cha = 1;
        }
    }
    this.state.startIndex = lastState.startIndex + cha;
    this.state.endIndex = lastState.endIndex + cha;
    this.state.verticalRectNumber = lastState.verticalRectNumber;
    this.draw(true);
}
