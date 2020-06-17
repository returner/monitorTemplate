import { ChartData } from "../models/chartData";
import d3 = require("d3");
import { GaugeChartOption } from "../models/chartOption/gaugeChartOption";



export class GaugeChart {
    public drawGaugeChart(groupElement : any, chartOption : GaugeChartOption) {
        
         let data = [0.4, 0.3, 0.3]
         var colors = ["green", "orange", "red"]
        var anglesRange = 0.5 * Math.PI
        var radis = Math.min(chartOption.monitorDimensition.width, 2 * chartOption.monitorDimensition.height) / 2
        var thickness = chartOption.monitorDimensition.width * 0.17
        let gaugeDrawData = [ 
            {
                ratio : 0.4,
                color : "green"
            }, 
            {
                ratio : 0.3,
                color : "orange"
            },
            {
                ratio : 0.3,
                color : "red"
            }
        ];
    
    var pies = d3.pie()
    	.value( d => {return Number(d)})
    	.sort(null)
    	.startAngle( anglesRange * -1)
    	.endAngle( anglesRange)
    
		var arc = d3.arc()
    	.outerRadius(radis)
    	.innerRadius(radis - thickness)
        .cornerRadius(5)
    groupElement.selectAll("path")
    .data(pies(data))
    .enter()
    .append("path")
    .attr("fill", (d, i) => colors[i])
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
            .style("fill","green")

        // const valueText = groupElement
        //     .append('g')
        //     .append("text")
        //     .text("00")
        //     .attr("dy", `-${monitorDimensition.width * 0.02}em`)
        //     .style("font-size", `${(monitorDimensition.width * 0.002)}em`)
        //     .attr("text-anchor", "middle")
        //     .style("font-family","Consolas")
        //     .style("font-weight","bold")
        //     .style("fill","navy")
        //     .attr('transform', "rotate(-90)");
        let range = angle.maxAngle - angle.minAngle;
        let minValue = chartOption.rangeMinValue;
		let maxValue = chartOption.rangeMaxValue;
        const needleRotateScale = d3.scaleLinear()
        .range([0,1])
        .domain([minValue, maxValue]);

        const chart = (selection) => {
            selection.each((chartDatas: Array<ChartData>) => {
                if (chartDatas.length <= 0)
                return;
                let chartData = chartDatas[chartDatas.length - 1];
                var arcRatioValue = angle.minAngle + (needleRotateScale(chartData.value) * range);
                var chartDataRatio = needleRotateScale(chartData.value);
                console.log(`chartData:${chartData.value}, arcRatioValue:${arcRatioValue}, chartDataRatio:${chartDataRatio}`)
                needle.transition()
                    .duration(400)
                    .attr('transform', `rotate(${arcRatioValue})`);
                
                ratioValueText.transition().duration(400).text(`${Math.floor(needleRotateScale(chartData.value * 100)).toString()}%`);
                let currentRatio = 0;
                for(var i =0; i < gaugeDrawData.length; i++){
                    currentRatio = currentRatio + gaugeDrawData[i].ratio
                    if (currentRatio >= chartDataRatio) {
                        ratioValueText
                        .style("fill", gaugeDrawData[i].color);
                        break;
                    }
                }

                // valueText
                // .text(chartData.value.toString())
                // .transition()
                // .duration(400)
                // .attr('transform', `rotate(${arcRatioValue})`);
           });
        }

        return chart;
    }
}