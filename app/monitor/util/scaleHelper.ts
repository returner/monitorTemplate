import d3 = require("d3");

export class ScaleHelper {
    public scaleMinMax(min : number, max : number, value : number) : number {
        const scale = d3.scaleLinear()
        .range([0,1])
        .domain([min, max]);

        return scale(value);
    }
}