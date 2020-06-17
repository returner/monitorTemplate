

import { ChartData } from "../models/chartData";
import { LinearGaugeChartOption } from "../models/chartOption/linearGaugeChartOption";

export class LinearGaugeChart {
    public drawLinearGauge(groupElement : any, chartOption : LinearGaugeChartOption) {
        const bounds = groupElement;
        
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
                        .attr("width", chartOption.monitorDimensition.width)
                        .attr("height", chartOption.monitorDimensition.height)
                        .attr("rx", 6)
        const point = bounds.append('g')
                        .append('path')
                        .attr("fill","rgb(194,0,0)")
     
        // const leftIndicator = bounds.append('g')
        //                         .append('text')
        //                         .text( "Safe" )
        //                         .attr("x", 0)
        //                         .attr("y", chartOption.monitorDimensition.height + 20)
     
        // const rightIndicator = bounds.append('g')
        //                         .append('text')
        //                         .attr('text-anchor','end')
        //                         .text( "Warning" )
        //                         .attr("x", chartOption.monitorDimensition.width)
        //                         .attr("y", chartOption.monitorDimensition.height + 20)
        const textPosition = bounds.append("g")
        .append("text")
        .text("0%")
        .attr("class","currentValue")
        .attr("font-family", "arial")
        .attr("fill", "darkblue")
        .attr("font-weight","bold")
        .attr("text-anchor", "middle")
        .style("font-family","Consolas")
        .style("font-size", `${(chartOption.monitorDimensition.width * 0.006)}em`)
        .attr("dy", `5em`)
        .attr("dy", `1.8em`)
        
        // if (chartOption.monitorDimensition.height <= 50) {
        //     textPosition.attr("font-size", "12px");
        // } else if (chartOption.monitorDimensition.height > 50 && chartOption.monitorDimensition.height <= 100){
        //     textPosition.attr("font-size", "16px");
        // } else {
        //     textPosition.attr("font-size", "22px");
        // }

        const chart = (selection) => {
            selection.each((chartDatas : Array<ChartData>) => {
                if (chartDatas.length <= 0)
                return;
                let chartData = chartDatas[chartDatas.length - 1];
                let textPos = chartOption.monitorDimensition.height + 20
                let pointSize = 8;
                let pointPos = chartOption.monitorDimensition.width * (chartData.value / chartOption.rangeMaxValue);

                textPosition.text(chartData.value);
                point.transition().attr('d','M'+pointPos+' '+(chartOption.monitorDimensition.height+5)+', L'+(pointPos-pointSize)+' '+textPos+', L'+(pointPos+pointSize)+' '+textPos+' Z');
             });
        }

        return chart;
    }
}