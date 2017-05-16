export function moveRange(distance) {
    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;
    let newStartIndex = startIndex - distance;
    let newEndIndex = endIndex - distance;
    if (newStartIndex >= this.state.times.length) {
        newStartIndex = this.state.times.length - 1;
        newEndIndex = newStartIndex + verticalRectNumber;
    }
    if (newStartIndex < 0) {
        newStartIndex = 0;
        newEndIndex = verticalRectNumber;
    }
    this.state.range = [newStartIndex, newEndIndex];
}
