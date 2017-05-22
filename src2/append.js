export default function append(data) {
    const lastRange = this.state.range;
    if (this.option.data.length === data.length) {
        this.setOption({ data });
    } else if (data.length > this.option.data.length) {
        let d = data.slice(data.length - this.option.data.length, data.length);
        this.setOption({ data: d });
    }
    this.state.range = lastRange;
    this.draw();
}
