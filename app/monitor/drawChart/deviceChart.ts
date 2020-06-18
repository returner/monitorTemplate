import { DeviceChartOption } from "../models/chartOption/deviceChartOption";
import d3 = require("d3");
import { ChartData } from "../models/chartData";
import { GraphTypeAccessor } from "../accessor/graphTypeAccessor";

export class DeviceChart extends DeviceChartOption {
    public drawDeviceChart(groupElement : any, chartOption : DeviceChartOption) {
        
        const bounds = groupElement;
        bounds.style("transform", `translate(${chartOption.monitorDimensition.left}px, ${chartOption.monitorDimensition.top}px)`);

        const imageView = bounds.append("defs")
            .append("pattern")
            .attr("id", "imageView")
            .attr("width", 1)
            .attr("height", 1)
            .attr("left", 0)
            .attr("top", 21)
            .attr("viewBox", "0 0 95 95")
            .attr("preserveAspectRatio", "none")
            .append("image")
            .attr('xlink:href', `${chartOption.imageUrl}`)
            .attr('width', 95)
            .attr('height', 95)
            .attr("preserveAspectRatio", "none")

        const topRect = bounds.append("rect")
            .attr("id", "top")
            .attr("width", 179)
            .attr("height", 20)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
        const topText = bounds.append("text")
            .attr("x", 45)
            .attr("y", 14)
            .attr("font-size", "11")
            .attr("font-weight", "bold")
            .text("AAS : Bosch T-1000");
        const topCircle = bounds.append("circle")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", "green")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .attr("r", 6)
            .attr("cx", 3)
            .attr("cy", 3)
            .style("transform", `translate(9px,7px)`)
            .attr("class", "circle")

        const leftRect = bounds.append("rect")
            .attr("id", "left")
            .attr("width", 99)
            .attr("height", 100)
            .attr("fill", "url(#imageView)")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .style("transform", "translate(0px,20px)")
        const rightRect = bounds.append("rect")
            .attr("id", "right")
            .attr("width", 80)
            .attr("height", 100)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .style("transform", "translate(99px,20px)")
        const rightText = bounds.append("text")

        rightText.append("tspan")
            .attr("x", 105)
            .attr("y", 35)
            .attr("font-size", "9")
            .text("Bosch T-1000")
        rightText.append("tspan")
            .attr("x", 105)
            .attr("y", 50)
            .attr("font-size", "9")
            .text("Color:Black")
        rightText.append("tspan")
            .attr("x", 105)
            .attr("y", 65)
            .attr("font-size", "9")
            .text("10x10 inches")

        const bottomRect = bounds.append("rect")
            .attr("id", "bottom")
            .attr("width", 179)
            .attr("height", 25)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .style("transform", "translate(0px,120px)")

        bounds.append("path")
            .attr("width", 179)
            .attr("height", 23)
            .style("transform", `translate(3px,120px)`)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke-width", chartOption.lineTickness)
            .attr("stroke", chartOption.lineColor);
        

        const chart = (selection) => {
            selection.each((datas: Array<ChartData>) => {
                console.log(`w:${chartOption.monitorDimensition.width} / h:${chartOption.monitorDimensition.height}`);
                let xMin = d3.min(datas, (lineData: ChartData) => { return lineData.xAxis });
                let xMax = d3.max(datas, (lineData: ChartData) => { return lineData.xAxis });

                const xScale = d3.scaleTime()
                    .domain([xMin!, xMax!])
                    .rangeRound([0, 170]);

                let yMin = d3.min(datas, (lineData: ChartData) => { return lineData.yAxis });
                let yMax = d3.max(datas, (lineData: ChartData) => { return lineData.yAxis });
                const yScale = d3.scaleLinear()
                    .domain([yMin!, yMax!])
                    .rangeRound([21, 0]);
                    let accessor = new GraphTypeAccessor();
                let line = d3.line<ChartData>()
                    .curve(d3.curveBasis)
                    .x((lineData: ChartData) => xScale(accessor.xAccessor(lineData)))
                    .y((lineData: ChartData) => yScale(accessor.yAccessor(lineData)))

                let lineSelect = bounds.select(".line")
                    .datum(datas)
                    .attr("d", line)
                    

                let circle = bounds.selectAll(".circle")
                    .data(datas)
                    .attr("fill", (d) => {
                        return `rgb(${d.colorValue})`
                    })

            })
        };

        return chart;
    }
}