import { ChartType } from "./models/chartType";
import { ChartOption } from "./models/chartOption";
import { MonitorDimensition } from "./models/monitorDimensition";
import { ChartData } from "./models/chartData";

export class DrawLineGaugeChart {
    public drawLinearGauge(groupElement : any, chartOption : ChartOption, monitorDimensition : MonitorDimensition) {
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
}