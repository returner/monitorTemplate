
import * as  d3 from "d3";
import {ChartType} from "./monitor/models/chartType"
import {DrawChartManager} from "./monitor/drawChartManager"
import {Util} from "./monitor/util/util"
import {MonitorDimensition} from "./monitor/models/monitorDimensition"
import { ChartData } from "./monitor/models/chartData";
import { ChartOption } from "./monitor/models/chartOption";


class Main {
    private wrapperElement : HTMLDivElement;
    private drawChartManager : DrawChartManager;
    private svgElement : any;

    public init(parentElement : HTMLDivElement, width : number, height : number): void {
        this.wrapperElement = parentElement;
        this.drawChartManager = new DrawChartManager(parentElement, width, height);
        this.svgElement = d3.select(this.wrapperElement[0])
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    }

    public clear() {
        this.drawChartManager.clear(this.svgElement);
    }
    
    public drawChart(chartType : ChartType, monitorDimensition : MonitorDimensition, chartOption : ChartOption) : void {
        
        //this.drawChartManager.addChart(chartType,this.dataGenerator(), monitorDimensition, chartOption);
        let chart = this.drawChartManager.drawChart(this.svgElement,chartType,monitorDimensition, chartOption);
        d3.select(this.svgElement).datum(this.dataGenerator()).call(chart);
    }

    public drawLineChart(monitorDimensition : MonitorDimensition){
        let chartOption = new ChartOption();
        chartOption.lineColor = "darkred";
        this.drawChart(ChartType.Line, monitorDimensition, chartOption);
    }

    public drawCurveLineChart(monitorDimensition : MonitorDimensition) {
        let chartOption = new ChartOption();
        chartOption.lineColor = "darkblue";
        this.drawChart(ChartType.CurveLine, monitorDimensition, chartOption);
    }

    public dataGenerator() : Array<ChartData> {
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
}

window["Main"] = new Main();
