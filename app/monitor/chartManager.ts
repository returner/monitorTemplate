import * as  d3 from "d3";
import {WrapperElement} from "./models/wrapperElement"
import {ChartType} from "./models/chartType"
import { MonitorDimensition } from "./models/monitorDimensition";
import { LineChart } from "./drawChart/lineChart";
import { CurveLineChart } from "./drawChart/curveLineChart";
import { LineGaugeChart } from "./drawChart/lineGaugeChart";
import { ScatterChart } from "./drawChart/scatterChart";
import { GaugeChart } from "./drawChart/gaugeChart";
import { LineChartOption } from "./models/chartOption/lineChartOption";
import { v1 as uuid } from 'uuid'
import { CurveLineChartOption } from "./models/chartOption/curveLineChartOption";
import { LinearGaugeChartOption } from "./models/chartOption/linearGaugeChartOption";
import { ScatterChartOption } from "./models/chartOption/scatterChartOption";
import { GaugeChartOption } from "./models/chartOption/gaugeChartOption";

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
    public buildGroupWrapper(baseSvgElement : any, monitorElementInstanceId : string, chartOption : any) {
        return baseSvgElement
            .append("g")
            .attr("monitorElementInstanceId", monitorElementInstanceId)
            .style("transform", `translate(${chartOption.monitorDimensition.left}px, ${chartOption.monitorDimensition.top}px)`)
    }

    public drawChart(chartElement : any, chartOption : any) : any|null {
        switch(chartOption.chartType){
            case ChartType.Line:
                let lineOption = new LineChartOption();
                lineOption.monitorElementInstanceId = chartOption.monitorElementInstanceId;
                lineOption.expressionColor = chartOption.expressionColor;
                lineOption.isShowXAsix = chartOption.isShowXAsix;
                lineOption.isShowYAsix = chartOption.isShowYAsix;
                lineOption.monitorDimensition = chartOption.monitorDimensition;
                let lineObj = new LineChart();
                return lineObj.drawLineChart(chartElement, lineOption);
                break;
            case ChartType.CurveLine:
                let curveLineOption = new CurveLineChartOption();
                curveLineOption.monitorElementInstanceId = chartOption.monitorElementInstanceId;
                curveLineOption.expressionColor = chartOption.expressionColor;
                curveLineOption.isShowXAsix = chartOption.isShowXAsix;
                curveLineOption.isShowYAsix = chartOption.isShowYAsix;
                curveLineOption.monitorDimensition = chartOption.monitorDimensition;
                let curveLineObj = new CurveLineChart();
                return curveLineObj.drawLineChart(chartElement, curveLineOption);
                break;
            case ChartType.LinearGauge:
                let linearGaugeOption = new LinearGaugeChartOption();
                linearGaugeOption.monitorElementInstanceId = chartOption.monitorElementInstanceId;
                linearGaugeOption.expressionColor = chartOption.expressionColor;
                linearGaugeOption.monitorDimensition = chartOption.monitorDimensition;
                linearGaugeOption.rangeMaxValue = chartOption.rangeMaxValue;
                linearGaugeOption.rangeMinValue = chartOption.rangeMinValue;
                let linearGaugeObj = new LineGaugeChart();
                return linearGaugeObj.drawLinearGauge(chartElement, linearGaugeOption);
                break;
            case ChartType.Scatter:
                let scatterOption = new ScatterChartOption();
                scatterOption.monitorElementInstanceId = chartOption.monitorElementInstanceId;
                scatterOption.expressionColor = chartOption.expressionColor;
                scatterOption.isShowXAsix = chartOption.isShowXAsix;
                scatterOption.isShowYAsix = chartOption.isShowYAsix;
                scatterOption.monitorDimensition = chartOption.monitorDimensition;
                let scatterObj = new ScatterChart();
                return scatterObj.drawScatterChart(chartElement, scatterOption);
                break;
            case ChartType.Gauge:
                let gaugeOption = new GaugeChartOption();
                gaugeOption.monitorElementInstanceId = chartOption.monitorElementInstanceId;
                gaugeOption.expressionColor = chartOption.expressionColor;
                gaugeOption.monitorDimensition = chartOption.monitorDimensition;
                gaugeOption.rangeMaxValue = chartOption.rangeMaxValue;
                gaugeOption.rangeMinValue = chartOption.rangeMinValue;
                let gaugeObj = new GaugeChart();
                return gaugeObj.drawGaugeChart(chartElement, gaugeOption);
                break;
            case ChartType.Number:
                break;
            case ChartType.Device:
                break;
        }
        return null;
    }
}