import * as  d3 from "d3";
import {WrapperElement} from "./models/wrapperElement"
import {ChartType} from "./models/chartType"
import { MonitorDimensition } from "./models/monitorDimensition";
import { ChartData } from "./models/chartData";
import { ChartOption } from "./models/chartOption";

export class DrawChartManager {
    private wrapperElement : WrapperElement;
    private svgBaseElement : any;

    constructor(wrapperElement : HTMLDivElement, wrapperWidth : number, wrapperHeight : number) {
        this.wrapperElement = new WrapperElement();
        this.wrapperElement.elemenet = wrapperElement[0];
        this.wrapperElement.width = wrapperWidth;
        this.wrapperElement.height = wrapperHeight;
    }

    public init() {
        this.svgBaseElement = d3.select(this.wrapperElement.elemenet)
        .append("svg")
        .attr("width", this.wrapperElement.width)
        .attr("height", this.wrapperElement.height)
    }

    public addChart(chartType : ChartType, dataset : Array<ChartData>, monitorDimensition : MonitorDimensition, chartOption : ChartOption) {
        const yAccessor = (d : ChartData) => {return d.value}
        //const dateParser = d3.timeParse("%Y-%m-%d");
        const dateParser = d3.timeFormat("%hh:%MM");
        //const xAccessor = (d : ChartData) => {return dateParser(d.xAxis)};
        const xAccessor = (d : ChartData) => {return d.xAxis};

        let wrapper = this.svgBaseElement;
        const bounds = wrapper.append("g")
            .style("transform", `translate(${monitorDimensition.left}px, ${monitorDimensition.top}px)`)
        const yScale = d3.scaleLinear()
        .domain(<[number,number]>d3.extent(dataset, yAccessor))
        .range([monitorDimensition.height, 0])

    const xScale = d3.scaleTime()
        .domain(<[Date,Date]>d3.extent(dataset, xAccessor))
        .range([0, monitorDimensition.width])

  // 5. Draw data
    const lineGenerator = d3.line<ChartData>()
        //.curve(d3.curveBasis)
        .x(chartData => xScale(xAccessor(chartData)))
        .y(chartData => yScale(yAccessor(chartData)))

    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", chartOption.lineColor)
        .attr("stroke-width", 2)

        //  6. Draw peripherals

    const yAxisGenerator = d3.axisLeft(yScale)
        //.scale(yScale)

    const yAxis = bounds.append("g")
        .call(yAxisGenerator)
    const format = d3.timeFormat('%H:%M:%S');
    const xAxisGenerator = d3.axisBottom(xScale).tickFormat(format as (dv: Date | { valueOf(): number; }, i: number) => string)
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${monitorDimensition.height}px)`)
        }
}