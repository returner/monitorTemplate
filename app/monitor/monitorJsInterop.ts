import * as  d3 from "d3";
import { D3Dimensition } from "./models/d3Dimensition"
import { LineData } from "./models/lineData"
import { D3Margin } from "./models/d3Margin"
import { MonitorDimensition } from "./models/monitorDimensition"
import { MonitorItemOption } from "./models/monitorItemOption"
import { MonitorObject } from "./models/monitorObject"

import { DrawD3 } from "./drawD3"

export class MonitorJsInterop {
    private monitors: Array<MonitorObject> = [];
    private monitorRootElement: any;
    private svgRoot: any;
    private drawD3: DrawD3;
    public init(rootElement: HTMLDivElement, wrapperWidth : number, wrapperHeight : number): void {
        //console.log("rootElement", rootElement);
        let svgElement = d3.select(rootElement[0])
            .append("svg")
            .attr("id","SVG_ROOT")
            .attr("width", wrapperWidth)
            .attr("height", wrapperHeight)
        console.log(svgElement);
        this.monitorRootElement = svgElement;
        this.drawD3 = new DrawD3();
        //drawD3.drawD3Sample(this.monitorRootElement);
        //this.svgRoot = this.drawD3.createSvg(this.monitorRootElement);
        console.log("init");
    }

    

    public addItem(monitorItemOption : MonitorItemOption ): void {
        let monitorObject = new MonitorObject();
        monitorObject.aasId = monitorItemOption.aasId;
        //monitorObject.d3DrawObject = this.drawD3.drawMonitoringItem(this.monitorRootElement, monitorItemOption.left, monitorItemOption.top);
        //this.monitors.push(monitorObject);
        //this.monitorRootElement.appendChild(monitorObject.d3DrawObject);
        monitorObject.element = d3.select("monitoringWrapper");
        console.log("monitorObject.element", monitorObject.element);
        //let svgElement = d3.select("svg")

        //d3.select(monitorObject.element)
        //    .attr("id", `ROOT_DIV_${monitorItemOption.aasId}`)
        //    .style("position", "absolute")
        //    //.style("border", "darkblue 1px red")
        //    .style("left", `${monitorItemOption.left}px`)
        //    .style("top", `${monitorItemOption.top}px`)
        //    .style("width", "179px")
        //    .style("height", "145px")
        //console.log(this.monitorRootElement);
        //monitorObject.element = this.monitorRootElement;
        //console.log(monitorObject.element);
        let drawD3 = new DrawD3();
        monitorObject.d3DrawObject = drawD3.drawMonitoringItem(monitorItemOption.aasId, monitorObject.element, monitorItemOption.left, monitorItemOption.top);
        d3.select(monitorObject.element).datum(monitorObject.monitorDatas).call(monitorObject.d3DrawObject);

        this.monitors.push(monitorObject);
        //this.monitorRootElement.appendChild(monitorObject.element);
        console.log(this.monitors);
    }


    private randomNumberBounds(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }

    private generateSeedDatas(): Array<LineData> {
        var now = new Date();

        let lineDatas: Array<LineData> = [];
        for (var i = 0; i < 100; ++i) {
            lineDatas.push({
                date: new Date(now.getTime() - ((100 - i) * 500)),
                monitorValue: this.randomNumberBounds(0, 250),
                colorValue: `${this.randomNumberBounds(0, 250)},${this.randomNumberBounds(0, 250)},${this.randomNumberBounds(0, 250)}`
            });
        }

        return lineDatas;
    }

    public updateMonitor(id: number, colorCode:string, assetValues : Array<number>) {
        let currentItem = this.monitors.find((m) => { return m.aasId === id });
        if (currentItem === undefined)
            return;
        
        let lineData = new LineData();
        lineData.colorValue = colorCode;
        lineData.date = new Date();
        lineData.monitorValue = assetValues[this.randomNumberBounds(0, 50)];
        
        console.log(`(${id})receive:`, lineData.colorValue, lineData.monitorValue);

        // currentItem.monitorDatas.push(lineData)
        // if (currentItem.monitorDatas.length > 30)
        //     currentItem.monitorDatas.shift();
        // d3.select(currentItem.element).call(currentItem.d3DrawObject);
    }
}


window["MonitorJsInterop"] = new MonitorJsInterop();
