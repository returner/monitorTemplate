import * as  d3 from "d3";
import {WrapperElement} from "./models/wrapperElement"
import {ChartType} from "./models/chartType"
import { MonitorDimensition } from "./models/monitorDimensition";
import { ChartData } from "./models/chartData";
import { ChartOption } from "./models/chartOption";
import { style } from "d3";
import { DrawLineChart } from "./drawLineChart";
import { DrawCurveLineChart } from "./drawCurveLineChart";
import { DrawLineGaugeChart } from "./drawLineGaugeChart";
import { DrawScatterChart } from "./drawScatterChart";

export class ChartManager {
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
    public buildGroupWrapper(baseSvgElement : any, monitorDimensition : MonitorDimensition) {
        return baseSvgElement.append("g")
            .style("transform", `translate(${monitorDimensition.left}px, ${monitorDimensition.top}px)`)
    }

    public drawChart(chartElement : any, chartOption : ChartOption, monitorDimensition : MonitorDimensition) : any|null {
        switch(chartOption.chartType){
            case ChartType.Line:
                let lineObj = new DrawLineChart();
                return lineObj.drawLineChart(chartElement, chartOption, monitorDimensition);
                break;
            case ChartType.CurveLine:
                let curveLineObj = new DrawCurveLineChart();
                return curveLineObj.drawLineChart(chartElement, chartOption, monitorDimensition);
                break;
            case ChartType.LinearGauge:
                let linearGaugeObj = new DrawLineGaugeChart();
                return linearGaugeObj.drawLinearGauge(chartElement, chartOption, monitorDimensition);
                break;
            case ChartType.Scatter:
                let scatterObj = new DrawScatterChart();
                return scatterObj.drawScatterChart(chartElement, chartOption, monitorDimensition);
                break;
            case ChartType.Gauge:
                break;
            case ChartType.Number:
                break;
        }

        // if (chartType === ChartType.Line || chartType === ChartType.CurveLine){
        //     monitorObject.d3DrawObject = this.drawChartManager.drawChart(monitorObject.element, chartOption, monitorDimensition);
        // }
            
        // if (chartType === ChartType.Scatter) {
        //     monitorObject.d3DrawObject = this.drawChartManager.drawChart(monitorObject.element, chartOption, monitorDimensition);
        // }
            
        // if (chartType === ChartType.LinearGauge || chartType === ChartType.Gauge || chartType === ChartType.Number) {
        //     monitorObject.d3DrawObject = this.drawChartManager.drawChart(monitorObject.element,chartType,chartOption, monitorDimensition);
        // }

        return null;
    }
}