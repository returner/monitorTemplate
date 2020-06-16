import { ChartType } from "./models/chartType";
import { ChartOption } from "./models/chartOption";
import { MonitorDimensition } from "./models/monitorDimensition";
import { ChartData } from "./models/chartData";
import d3 = require("d3");

export class DrawLineChart {
    public drawLineChart(groupElement : any, chartOption : ChartOption, monitorDimensition : MonitorDimensition){
        const bounds = groupElement;
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
                .x((lineData: ChartData) => xScale(chartOption.accessor.xAccessor(lineData)))
                .y((lineData: ChartData) => yScale(chartOption.accessor.yAccessor(lineData)))

            let lineSelect = bounds.select(".line")
                .attr("transform", null)
                .datum(datas)
                .attr("d", line)
            })
        }

        return chart;
    }
}