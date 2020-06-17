import d3 = require("d3");
import { ChartData } from "../models/chartData";
import { ScatterChartOption } from "../models/chartOption/scatterChartOption";
import { GraphTypeAccessor } from "../accessor/graphTypeAccessor";


export class ScatterChart {
    public drawScatterChart(groupElement : any, chartOption : ScatterChartOption) {
        const bounds = groupElement;
        bounds.append("g")
            .attr("class","xAxis")
            .style("transform", `translateY(${chartOption.monitorDimensition.height}px)`)
            .transition()
        bounds.append("g")
            .attr("class","yAxis")

        const chart = (selection) => {
            selection.each((datas: Array<ChartData>) => {
                let accessor = new GraphTypeAccessor();

                const yScale = d3.scaleLinear()
                .domain(<[number,number]>d3.extent(datas, accessor.yAccessor))
                .range([chartOption.monitorDimensition.height, 0])

            const xScale = d3.scaleTime()
                .domain(<[Date,Date]>d3.extent(datas, accessor.xAccessor))
                .range([0, chartOption.monitorDimensition.width]);
            
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
                .style("transform", `translateY(${chartOption.monitorDimensition.height}px)`)
            }
            bounds.selectAll("circle").remove();
            datas.forEach(d => {
                bounds.append("circle")
                .attr("cx", xScale(accessor.xAccessor(d)))
                .attr("cy", yScale(accessor.yAccessor(d)))
                .attr("r", 2)
                .attr("fill", chartOption.expressionColor)
                .attr("stroke", "darkgray")
                .attr("stroke-width", 1)
            })
        })
    }

        return chart;
    }
}