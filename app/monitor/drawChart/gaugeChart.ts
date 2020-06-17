import { ChartData } from "../models/chartData";
import d3 = require("d3");
import { GaugeChartOption } from "../models/chartOption/gaugeChartOption";
import { GaugeRatioColor } from "../models/chartOption/gaugeRatioColor";
import { ScaleHelper } from "../util/scaleHelper";
import { LinearValueExpressionType } from "../models/chartOption/linearValueExpressionType";




export class GaugeChart {
    public drawGaugeChart(groupElement : any, chartOption : GaugeChartOption) {
        var anglesRange = 0.5 * Math.PI
        var radis = Math.min(chartOption.monitorDimensition.width, 2 * chartOption.monitorDimensition.height) / 2
        var thickness = chartOption.monitorDimensition.width * 0.17
    
        var pies = d3.pie<GaugeRatioColor>()
            .value((d : GaugeRatioColor) => {return d.ratio})
            .sort(null)
            .startAngle( anglesRange * -1)
            .endAngle( anglesRange)
        
        var arc = d3.arc()
            .outerRadius(radis)
            .innerRadius(radis - thickness)
            .cornerRadius(chartOption.monitorDimensition.width * 0.01)
        groupElement.selectAll("path")
        .data(pies(chartOption.gaugeRatioColors))
        .enter()
        .append("path")
        .attr("fill", (d : any, i) => d.data.color)
        .attr("d", arc)
        
        var r =  chartOption.monitorDimensition.width / 2;
        var pointerWidth = 10;
		var pointerTailLength = 5;
        var pointerHeadLengthPercent = 0.9;
        var pointerHeadLength = Math.round(r * pointerHeadLengthPercent)
        var lineData = [ [pointerWidth / 2, 0], 
						[0, -pointerHeadLength],
						[-(pointerWidth / 2), 0],
						[0, pointerTailLength],
                        [pointerWidth / 2, 0] ];
  
        const angle = {
            minAngle : -90,
            maxAngle : 90
        };
                        
		var pointerLine = d3.line().curve(d3.curveBasis);
				
        let needle = groupElement
            .append('g')
            .data([lineData])
            .attr('class', 'pointer')
            .attr('transform', `translate(0,0)`)
            .append('path')
            .attr('d', pointerLine)
            .attr("fill", "navy")
            .attr('transform', 'rotate(' + angle.minAngle +')');
        
        const ratioValueText = groupElement
            .append('g')
            .append("text")
            .text("00")
            .attr("dy", `-${chartOption.monitorDimensition.width * 0.002}em`)
            .style("font-size", `${(chartOption.monitorDimensition.width * 0.006)}em`)
            .attr("text-anchor", "middle")
            .style("font-family","Consolas")
            .style("font-weight","bold")
            .style("fill",chartOption.gaugeRatioColors[0].color)

        let range = angle.maxAngle - angle.minAngle;
        // let minValue = chartOption.rangeMinValue;
		// let maxValue = chartOption.rangeMaxValue;
        // const needleRotateScale = d3.scaleLinear()
        // .range([0,1])
        // .domain([minValue, maxValue]);

        const chart = (selection) => {
            selection.each((chartDatas: Array<ChartData>) => {
                if (chartDatas.length <= 0)
                return;
                let scaleHelper = new ScaleHelper();
                let chartData = chartDatas[chartDatas.length - 1];
                let chartDataScaleValue = scaleHelper.scaleMinMax(chartOption.rangeMinValue, chartOption.rangeMaxValue, chartData.value);
                var arcRatioValue = angle.minAngle + (chartDataScaleValue * range);
                
                needle.transition()
                    .duration(400)
                    .attr('transform', `rotate(${arcRatioValue})`);
                
                let text = "";
                if (chartOption.expressionValueType == LinearValueExpressionType.OriginValue)
                    text = chartData.value.toFixed(chartOption.expressionFixedDigits).toString();
                else if (chartOption.expressionValueType == LinearValueExpressionType.RatioValue)
                    text = `${scaleHelper.scaleMinMax(chartOption.rangeMinValue, chartOption.rangeMaxValue,chartData.value * 100).toFixed(chartOption.expressionFixedDigits).toString()}%`;
                
                let currentRatio = 0;
                for(var i =0; i < chartOption.gaugeRatioColors.length; i++){
                    currentRatio = currentRatio + chartOption.gaugeRatioColors[i].ratio
                    if (currentRatio >= chartDataScaleValue) {
                        ratioValueText
                        .transition()
                        .duration(400)
                        .style("fill", chartOption.gaugeRatioColors[i].color)
                        .text(text)
                        break;
                    }
                }
           });
        }

        return chart;
    }
}