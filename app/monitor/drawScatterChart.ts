import { ChartType } from "./models/chartType";
import { ChartOption } from "./models/chartOption";
import { MonitorDimensition } from "./models/monitorDimensition";
import d3 = require("d3");
import { ChartData } from "./models/chartData";


export class DrawScatterChart {
    public drawScatterChart(groupElement : any, chartOption : ChartOption, monitorDimensition : MonitorDimensition) {
        const bounds = groupElement;
        bounds.append("g")
            .attr("class","xAxis")
            .style("transform", `translateY(${monitorDimensition.height}px)`)
            .transition()
        bounds.append("g")
            .attr("class","yAxis")

        const chart = (selection) => {
            selection.each((datas: Array<ChartData>) => {
                const yScale = d3.scaleLinear()
                .domain(<[number,number]>d3.extent(datas, chartOption.accessor.yAccessor))
                .range([monitorDimensition.height, 0])

            const xScale = d3.scaleTime()
                .domain(<[Date,Date]>d3.extent(datas, chartOption.accessor.xAccessor))
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
                .attr("cx", xScale(chartOption.accessor.xAccessor(d)))
                .attr("cy", yScale(chartOption.accessor.yAccessor(d)))
                .attr("r", 2)
                .attr("fill", chartOption.valueColorCode)
                .attr("stroke", "darkgray")
                .attr("stroke-width", 1)
            })
        })
    }

        return chart;
    }
}