
import * as  d3 from "d3";
import {ChartType} from "./monitor/models/chartType"
import {DrawChartManager} from "./monitor/drawChartManager"
import {Util} from "./monitor/util/util"
import {MonitorDimensition} from "./monitor/models/monitorDimensition"
import { ChartData } from "./monitor/models/chartData";
import { ChartOption } from "./monitor/models/chartOption";
import { MonitorObject } from "./monitor/models/monitorObject";


class Main {
    private wrapperElement : HTMLDivElement;
    private drawChartManager : DrawChartManager;
    private svgElement : any;
    private monitoringObjects : Array<MonitorObject> = [];
    
    public init(parentElement : HTMLDivElement, width : number, height : number): void {
        this.wrapperElement = parentElement;
        this.drawChartManager = new DrawChartManager(parentElement, width, height);
        this.svgElement = d3.select(this.wrapperElement[0])
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    }

    private getChartType(chartTypeValue : string) : ChartType{
        switch(chartTypeValue){
            case "line":
                return ChartType.Line;
            case "curveLine":
                return ChartType.CurveLine;
            case "gauge":
                return ChartType.Gauge;
            case "scatter":
                return ChartType.Scatter;
            case "number":
                return ChartType.Number;
            case "linearGauge":
                return ChartType.LinearGauge;
        }
        return ChartType.Line;
    }

    public clear() {
        this.drawChartManager.clear(this.svgElement);
    }
    
    public drawChart(aasId : number, chartTypeValue : string, chartOption : ChartOption, monitorDimensition : MonitorDimensition){
        let monitorObject = new MonitorObject();
        let chartType = this.getChartType(chartTypeValue);
        let chart : any;
        monitorObject.aasId = aasId;
        monitorObject.monitorDatas = [];
        monitorObject.monitorData = new ChartData();
        monitorObject.element = this.svgElement;
        if (chartType === ChartType.Line || chartType === ChartType.CurveLine){
            monitorObject.d3DrawObject = this.drawChartManager.drawLineChart(monitorObject.element,chartType,chartOption, monitorDimensition);
            this.monitoringObjects.push(monitorObject);
            d3.select(monitorObject.element).datum(monitorObject.monitorDatas).call(monitorObject.d3DrawObject);
        }
            
        if (chartType === ChartType.Scatter) {
            monitorObject.d3DrawObject = this.drawChartManager.drawScatterChart(monitorObject.element,chartType,chartOption, monitorDimensition);
            this.monitoringObjects.push(monitorObject);
            d3.select(monitorObject.element).datum(monitorObject.monitorDatas).call(monitorObject.d3DrawObject);
        }
            
        if (chartType === ChartType.LinearGauge || chartType === ChartType.Gauge || chartType === ChartType.Number) {
            monitorObject.d3DrawObject = this.drawChartManager.drawLinearGauge(monitorObject.element,chartType,chartOption, monitorDimensition);
            this.monitoringObjects.push(monitorObject);
            d3.select(monitorObject.element).datum(monitorObject.monitorDatas).call(monitorObject.d3DrawObject);
        }
    }

    public updateMonitor(aasId : number, chartData : ChartData) {
        let currentObject = this.monitoringObjects.find(d => d.aasId === aasId);
        if (currentObject === undefined)
        return;
        currentObject.monitorData = chartData;
        currentObject.monitorDatas.push(chartData);
        if (currentObject.monitorDatas.length > 30)
            currentObject.monitorDatas.shift();

        d3.select(currentObject.element).call(currentObject.d3DrawObject);
    }

    private dataGeneratorXYvalues() : Array<ChartData> {
        let lineDatas : Array<ChartData> = [];
        let now = new Date();
        for (var i=0; i < 100; i++) {
            let data = new ChartData();
            data.value = Util.randomNumber(0,255);
            data.xAxis = new Date(now.getTime() - ((100 - i) * 500));
            lineDatas.push(data);
        }

        return lineDatas;
    }

    private dataGeneratorNumbers() : Array<ChartData> {
        let lineDatas : Array<ChartData> = [];
        let now = new Date();
        for (var i=0; i < 100; i++) {
            let data = new ChartData();
            data.value = Util.randomNumber(0,255);
            lineDatas.push(data);
        }

        return lineDatas;
    }
}

window["Main"] = new Main();
