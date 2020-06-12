
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

    public init(parentElement : HTMLDivElement, width : number, height : number): void {
        this.wrapperElement = parentElement;
        this.drawChartManager = new DrawChartManager(parentElement, width, height);
        this.drawChartManager.init();
    }
    
    public drawChart(chartType : ChartType, monitorDimensition : MonitorDimensition) : void {
        let chartOption = new ChartOption();
        //chartOption.lineColor = "#af9358";
        chartOption.lineColor = "rgb(255,0,0)";
        this.drawChartManager.addChart(chartType,this.dataGenerator(), monitorDimensition, chartOption);
    }

    public drawLineChart(monitorDimensition : MonitorDimensition){
        this.drawChart(ChartType.Line, monitorDimensition);
    }

    public drawCurveLineChart() {
        //this.drawChart(ChartType.CurveLine);
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
