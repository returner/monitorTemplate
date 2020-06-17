
import * as  d3 from "d3";
import {ChartType} from "./monitor/models/chartType"
import {ChartManager} from "./monitor/chartManager"

import { ChartData } from "./monitor/models/chartData";
import { MonitorObject } from "./monitor/models/monitorObject";

import { v1 as uuid } from 'uuid'
class Main {
    private wrapperElement : HTMLDivElement;
    private chartManager : ChartManager;
    private svgElement : any;
    private monitoringObjects : Array<MonitorObject> = [];
    
    public init(parentElement : HTMLDivElement, width : number, height : number): void {
        this.wrapperElement = parentElement;
        this.chartManager = new ChartManager(parentElement, width, height);
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
        this.chartManager.clear(this.svgElement);
    }
    
    public drawChart(chartOption : any){
        let monitorObject = new MonitorObject();
        monitorObject.monitorElementInstanceId = chartOption.monitorElementInstanceId;
        monitorObject.monitorDatas = [];
        monitorObject.element = this.chartManager.buildGroupWrapper(this.svgElement, monitorObject.monitorElementInstanceId, chartOption);
        monitorObject.drawChartObject = this.chartManager.drawChart(monitorObject.element, chartOption);
        
        this.monitoringObjects.push(monitorObject);
        d3.select(monitorObject.element).datum(monitorObject.monitorDatas).call(monitorObject.drawChartObject);
    }

    public getMonitorElementInstanceId() : string {
        return uuid();
    }

    public updateMonitor(monitorElementInstanceId : string, chartData : ChartData) {
        let currentObject = this.monitoringObjects.find(d => d.monitorElementInstanceId === monitorElementInstanceId);
        if (currentObject === undefined)
        return;
        
        currentObject.monitorDatas.push(chartData);
        if (currentObject.monitorDatas.length > 30)
            currentObject.monitorDatas.shift();

        d3.select(currentObject.element).call(currentObject.drawChartObject);
    }

    // private dataGeneratorXYvalues() : Array<ChartData> {
    //     let lineDatas : Array<ChartData> = [];
    //     let now = new Date();
    //     for (var i=0; i < 100; i++) {
    //         let data = new ChartData();
    //         data.value = Util.randomNumber(0,255);
    //         data.xAxis = new Date(now.getTime() - ((100 - i) * 500));
    //         lineDatas.push(data);
    //     }

    //     return lineDatas;
    // }

    // private dataGeneratorNumbers() : Array<ChartData> {
    //     let lineDatas : Array<ChartData> = [];
    //     let now = new Date();
    //     for (var i=0; i < 100; i++) {
    //         let data = new ChartData();
    //         data.value = Util.randomNumber(0,255);
    //         lineDatas.push(data);
    //     }

    //     return lineDatas;
    // }
}

window["Main"] = new Main();
