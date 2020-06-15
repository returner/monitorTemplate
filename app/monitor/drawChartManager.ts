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

        return this.svgBaseElement;
    }

    public clear(svgElement : any) {
        d3.selectAll(svgElement).remove();
    }

    private yAccessor = (d : ChartData) => {return d.value};
    private xAccessor = (d : ChartData) => {return d.xAxis};

    private buildGroupWrapper(baseSvgElement : any, monitorDimensition : MonitorDimensition) {
        return baseSvgElement.append("g")
            .style("transform", `translate(${monitorDimensition.left}px, ${monitorDimensition.top}px)`)
    }

    public addChart(chartType : ChartType, dataset : Array<ChartData>, monitorDimensition : MonitorDimensition, chartOption : ChartOption) {
        const bounds = this.svgBaseElement.append("g")
        .style("transform", `translate(${monitorDimensition.left}px, ${monitorDimensition.top}px)`)

        const yScale = d3.scaleLinear()
            .domain(<[number,number]>d3.extent(dataset, this.yAccessor))
            .range([monitorDimensition.height, 0])

        const xScale = d3.scaleTime()
            .domain(<[Date,Date]>d3.extent(dataset, this.xAccessor))
            .range([0, monitorDimensition.width])

        // 5. Draw data
        const lineGenerator = d3.line<ChartData>()
            //.curve(d3.curveBasis)
            .x(chartData => xScale(this.xAccessor(chartData)))
            .y(chartData => yScale(this.yAccessor(chartData)))

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

    public drawChart(baseSvgElement : any, chartType : ChartType, monitorDimensition : MonitorDimensition, chartOption : ChartOption){
        const bounds = this.buildGroupWrapper(baseSvgElement, monitorDimensition);
        bounds.append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", chartOption.lineColor)
            .attr("stroke-width", 1)

        const chart = (selection) => {
            selection.each((datas: Array<ChartData>) => {
                const yScale = d3.scaleLinear()
                .domain(<[number,number]>d3.extent(datas, this.yAccessor))
                .range([monitorDimensition.height, 0])

            const xScale = d3.scaleTime()
                .domain(<[Date,Date]>d3.extent(datas, this.xAccessor))
                .range([0, monitorDimensition.width]);
            if (chartOption.isShowYAsix) {
                const yAxisGenerator = d3.axisLeft(yScale);
                const yAxis = bounds.append("g")
                .call(yAxisGenerator)
            }
            if (chartOption.isShowXAsix) {
                const format = d3.timeFormat('%H:%M:%S');
                const xAxisGenerator = d3.axisBottom(xScale).tickFormat(format as (dv: Date | { valueOf(): number; }, i: number) => string)
                const xAxis = bounds.append("g")
                .call(xAxisGenerator)
                .style("transform", `translateY(${monitorDimensition.height}px)`)
            }
            
            let line = d3.line<ChartData>()
                .curve(d3.curveBasis)
                .x((lineData: ChartData) => xScale(this.xAccessor(lineData)))
                .y((lineData: ChartData) => yScale(this.yAccessor(lineData)))

            let lineSelect = bounds.select(".line")
                .datum(datas)
                .attr("d", line)
            })
        }

        return chart;
    }
}