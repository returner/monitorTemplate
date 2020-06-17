
import { NumberChartOption } from "../models/chartOption/numberChartOption";
import { ChartData } from "../models/chartData";
import { LinearValueExpressionType } from "../models/chartOption/linearValueExpressionType";
import { ScaleHelper } from "../util/scaleHelper";

export class NumberChart {
    public drawNumberChart(groupElement : any, chartOption : NumberChartOption) {
        const bounds = groupElement;
        const linearGradient = bounds.append("defs").append("linearGradient")
            .attr("id", "mainGradient")
            .attr('x1','0%')
            .attr('y1','0%')
            .attr('x2','100%')
            .attr('y2','0%')
            .attr('spreadMethod', 'pad');

        let gradientOffset = 0
        for(var i=0; i < chartOption.gaugeRatioColors.length; i++) {
            linearGradient.append("stop")
            .attr('offset',`${gradientOffset * 10}%`)
            .attr("stop-color", `${chartOption.gaugeRatioColors[i].color}`)
            .attr('stop-opacity', '1');
            gradientOffset += chartOption.gaugeRatioColors[i].ratio * 10;
        }

        const linearBar = bounds.append('g')
                        .append('rect')
                        .attr('x', 0 )
                        .attr('y', 0 )
                        .style('fill','url(#mainGradient)')
                        .attr("width", chartOption.monitorDimensition.width)
                        .attr("height", chartOption.monitorDimensition.height)
                        .attr("rx", 6)
        
        const wrapperRect = bounds.append("g")
            .append("rect")
            .attr('x', chartOption.monitorDimensition.width / 6 )
            .attr('y', chartOption.monitorDimensition.height / 6 )
            .style('fill','lightgray')
            .attr("width", chartOption.monitorDimensition.width - (chartOption.monitorDimensition.width / 3))
            .attr("height", chartOption.monitorDimensition.height - (chartOption.monitorDimensition.height / 3))
            .style("stroke","darkgray")
            .style("stroke-width",2)
            .style("opacity",0.5)
            .attr("rx", 6)

        
        const textPosition = bounds.append("g")
        .append("text")
        .text("")
        .attr("class","currentValue")
        .attr("x", chartOption.monitorDimensition.width / 2)
        .attr("y", chartOption.monitorDimensition.height / 2)
        .attr("fill", "darkblue")
        .style("font-family", "arial")
        .style("font-weight","bold")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline","central")
        .style("font-family","Consolas")
        .style("font-size", `${(chartOption.monitorDimensition.width * 0.012)}em`)
        

        const chart = (selection) => {
            selection.each((chartDatas : Array<ChartData>) => {
                if (chartDatas.length <= 0)
                return;
                let chartData = chartDatas[chartDatas.length - 1];
                let textPos = chartOption.monitorDimensition.height + 20
                let pointSize = 8;
                let pointPos = chartOption.monitorDimensition.width * (chartData.value / chartOption.rangeMaxValue);
                let scaleHelper = new ScaleHelper();
                let positionText = "";
                if (chartOption.expressionValueType == LinearValueExpressionType.OriginValue)
                    positionText = chartData.value.toFixed(chartOption.expressionFixedDigits).toString();
                else if (chartOption.expressionValueType == LinearValueExpressionType.RatioValue)
                    positionText = (scaleHelper.scaleMinMax(chartOption.rangeMinValue, chartOption.rangeMaxValue, chartData.value) * 100).toFixed(chartOption.expressionFixedDigits) + "%";

                textPosition.text(positionText);
             });
        }

        return chart;
    }
}