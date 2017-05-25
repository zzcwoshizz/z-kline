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
    this.state = { ...this.state, range: [newStartIndex, newEndIndex] };
}

export function scaleRange(n) {
    const [startIndex, endIndex] = this.state.range;
    const verticalRectNumber = endIndex - startIndex;
    let newStartIndex = startIndex - n;
    let newEndIndex = endIndex + n;
    if ((endIndex - startIndex) * 0.5 > this.state.times.length - startIndex) {
        newStartIndex += n;
        newEndIndex += n;
    }
    let newVerticalRectNumber = newEndIndex - newStartIndex;
    if (newVerticalRectNumber < this.minVerticalRectNumber) {
        newStartIndex = startIndex - (this.minVerticalRectNumber - verticalRectNumber) * 0.5;
        newEndIndex = endIndex + (this.minVerticalRectNumber - verticalRectNumber) * 0.5;
    }
    if (newVerticalRectNumber > this.maxVerticalRectNumber) {
        newStartIndex = startIndex - (this.maxVerticalRectNumber - verticalRectNumber) * 0.5;
        newEndIndex = endIndex + (this.maxVerticalRectNumber - verticalRectNumber) * 0.5;
    }
    newVerticalRectNumber = newEndIndex - newStartIndex;

    if (newStartIndex >= this.state.times.length) {
        newStartIndex = this.state.times.length - 1;
        newEndIndex = newStartIndex + newVerticalRectNumber;
    }
    if (newStartIndex < 0) {
        newStartIndex = 0;
        newEndIndex = newVerticalRectNumber;
    }
    this.state = { ...this.state, range: [newStartIndex, newEndIndex] };
}
