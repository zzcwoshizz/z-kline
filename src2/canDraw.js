export default function canDraw() {
    if (this.state.range[0] != this.lastState.range[0] || this.state.range[1] != this.lastState.range[1]) {
        return true;
    }
    if (this.option != this.lastOption) {
        return true;
    }
    return false;
}
