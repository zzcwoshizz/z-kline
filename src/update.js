export default function update(data) {
    let lastState = this.state;
    this.setData(data);
    let cha = 0;
    if (lastState.endIndex === lastState.times.length && this.state.times.length > lastState.times.length) {
        cha = 1;
    }
    this.state.startIndex = lastState.startIndex + cha;
    this.state.endIndex = lastState.endIndex + cha;
    this.state.verticalRectNumber = lastState.verticalRectNumber;
    this.draw();
}
