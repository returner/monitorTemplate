import * as  d3 from "d3";
import {WrapperElement} from "./models/wrapperElement"
import {ChartType} from "./models/chartType"
import { MonitorDimensition } from "./models/monitorDimensition";
import { ChartData } from "./models/chartData";
import { ChartOption } from "./models/chartOption";
import { style } from "d3";

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

    private yAccessor = (d : ChartData) => {return d.yAxis};
    private xAccessor = (d : ChartData) => {return d.xAxis};

    private buildGroupWrapper(baseSvgElement : any, monitorDimensition : MonitorDimensition) {
        return baseSvgElement.append("g")
            .style("transform", `translate(${monitorDimensition.left}px, ${monitorDimensition.top}px)`)
    }

    public drawLinearGauge(baseSvgElement : any, chartType : ChartType, chartOption : ChartOption, monitorDimensition : MonitorDimensition) {
        const bounds = this.buildGroupWrapper(baseSvgElement, monitorDimensition);
        
        const linearGradient = bounds.append("defs").append("linearGradient")
            .attr("id", "mainGradient")
            .attr('x1','0%')
            .attr('y1','0%')
            .attr('x2','100%')
            .attr('y2','0%')
            .attr('spreadMethod', 'pad');

        linearGradient.append("stop")
        .attr('offset','0%')
        .attr('stop-color','green')
        .attr('stop-opacity', '1');

        linearGradient.append("stop")
        .attr('offset','60%')
        .attr("stop-color", "orange")
        .attr('stop-opacity', '1');

        linearGradient.append("stop")
        .attr('offset','100%')
        .attr("stop-color", "red")
        .attr('stop-opacity', '1');

        const linearBar = bounds.append('g')
                        .append('rect')
                        .attr('x', 0 )
                        .attr('y', 0 )
                        .style('fill','url(#mainGradient)')
                        .attr("width", monitorDimensition.width)
                        .attr("height", monitorDimensition.height)
        const point = bounds.append('g')
                        .append('path');
     
        const leftIndicator = bounds.append('g')
                                .append('text')
                                .text( "Safe" )
                                .attr("x", 0)
                                .attr("y", monitorDimensition.height + 20)
     
        const rightIndicator = bounds.append('g')
                                .append('text')
                                .attr('text-anchor','end')
                                .text( "Warning" )
                                .attr("x", monitorDimensition.width)
                                .attr("y", monitorDimensition.height + 20)
        const textPosition = bounds.append("g")
        .append("text")
        .attr("class","currentValue")
        .attr("font-family", "arial")
        
        .attr("fill", "darkblue")
        .attr("font-weight","bold")
        .attr("x",monitorDimensition.width/2 - 20 + (monitorDimensition.width * 0.05))
        .attr("y",monitorDimensition.height/2);
        if (monitorDimensition.height <= 50) {
            textPosition.attr("font-size", "12px");
        } else if (monitorDimensition.height > 50 && monitorDimensition.height <= 100){
            textPosition.attr("font-size", "16px");
        } else {
            textPosition.attr("font-size", "22px");
        }

        const chart = (selection) => {
            selection.each((chartDatas : Array<ChartData>) => {
                if (chartDatas.length <= 0)
                return;
                let chartData = chartDatas[chartDatas.length - 1];
                let textPos = monitorDimensition.height + 20
                let pointSize = 8;
                let pointPos = monitorDimensition.width * (chartData.value / chartOption.rangeMaxValue);
                textPosition.text(chartData.value);
                point.transition().attr('d','M'+pointPos+' '+(monitorDimensition.height+5)+', L'+(pointPos-pointSize)+' '+textPos+', L'+(pointPos+pointSize)+' '+textPos+' Z');
             });
        }

        return chart;
    }

    public drawScatterChart(baseSvgElement : any, chartType : ChartType, chartOption : ChartOption, monitorDimensition : MonitorDimensition) {
        const bounds = this.buildGroupWrapper(baseSvgElement, monitorDimensition);
        bounds.append("g")
            .attr("class","xAxis")
            .style("transform", `translateY(${monitorDimensition.height}px)`)
            .transition()
        bounds.append("g")
            .attr("class","yAxis")

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
                const yAxis = bounds.select(".yAxis")
                .call(yAxisGenerator)
            }
            
            if (chartOption.isShowXAsix) {
                const format = d3.timeFormat('%H:%M');
                const xAxisGenerator = d3.axisBottom(xScale).tickFormat(format as (dv: Date | { valueOf(): number; }, i: number) => string)
                const xAxis = bounds.select(".xAxis")
                .call(xAxisGenerator)
                .style("transform", `translateY(${monitorDimensition.height}px)`)
            }
            bounds.selectAll("circle").remove();
            datas.forEach(d => {
                bounds.append("circle")
                .attr("cx", xScale(this.xAccessor(d)))
                .attr("cy", yScale(this.yAccessor(d)))
                .attr("r", 2)
                .attr("fill", chartOption.valueColorCode)
                .attr("stroke", "darkgray")
                .attr("stroke-width", 1)
            })
        })
    }

        return chart;
    }
    
    public drawLineChart(baseSvgElement : any, chartType : ChartType, chartOption : ChartOption, monitorDimensition : MonitorDimensition){
        const bounds = this.buildGroupWrapper(baseSvgElement, monitorDimensition);
        bounds.append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", chartOption.valueColorCode)
            .attr("stroke-width", 1)
        bounds.append("g")
            .attr("class","xAxis")
            .style("transform", `translateY(${monitorDimensition.height}px)`)
            .transition()
        bounds.append("g")
            .attr("class","yAxis")

        const chart = (selection) => {
            selection.each((datas: Array<ChartData>) => {
                let xMin = d3.min(datas, (chartData: ChartData) => { return chartData.xAxis });
                let xMax = d3.max(datas, (chartData: ChartData) => { return chartData.xAxis });

                const xScale = d3.scaleTime()
                //.domain(<[Date,Date]>d3.extent(datas, this.xAccessor))
                .domain([xMin!,xMax!])
                .range([0, monitorDimensition.width]);

                let yMin = d3.min(datas, (chartData: ChartData) => { return chartData.yAxis });
                let yMax = d3.max(datas, (chartData: ChartData) => { return chartData.yAxis });

                const yScale = d3.scaleLinear()
                .domain([yMin!,yMax!])
                .range([monitorDimensition.height, 0])
           
            
            if (chartOption.isShowYAsix) {
                const yAxisGenerator = d3.axisLeft(yScale);
                const yAxis = bounds.select(".yAxis")
                .call(yAxisGenerator)
            }
            
            if (chartOption.isShowXAsix) {
                const format = d3.timeFormat('%H:%M');                
                const xAxisGenerator = d3.axisBottom(xScale).tickFormat(format as (dv: Date | { valueOf(): number; }, i: number) => string)
                const xAxis = bounds.select(".xAxis")
                .call(xAxisGenerator)
                
            }
            
            let line = d3.line<ChartData>()
                .x((lineData: ChartData) => xScale(this.xAccessor(lineData)))
                .y((lineData: ChartData) => yScale(this.yAccessor(lineData)))

            if (chartType === ChartType.CurveLine){
                line.curve(d3.curveBasis)
            }

            let lineSelect = bounds.select(".line")
                .attr("transform", null)
                .datum(datas)
                .attr("d", line)
            })
        }

        return chart;
    }
}