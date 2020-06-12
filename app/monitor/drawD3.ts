import * as  d3 from "d3";
import { D3Dimensition } from "./models/d3Dimensition"
import { LineData } from "./models/lineData"
import { D3Margin } from "./models/d3Margin"
import { MonitorDimensition } from "./models/monitorDimensition"

export class DrawD3 {
    private dimensitions: D3Dimensition;
    private rectDimensitions: D3Dimensition;
    private chartDimenstions: D3Dimensition;

    private yAccessor = (d: LineData) => d.monitorValue;
    private xAccessor = (d: LineData) => d.date;
    
    constructor() {
        this.rectDimensitions = {
            left: 0,
            top : 0,
            width: 20,
            height: 20,
            margin: {
                left: 0,
                top: 0,
                right: 0,
                bottom : 0
            },
            boundedHeight: 0,
            boundedWidth : 0
        };
        this.chartDimenstions = {
            left: 40,
            top : 0,
            width: 200,
            height: 30,
            boundedWidth: 0,
            boundedHeight: 0,
            margin: {
                left: 50,
                top: 0,
                right: 0,
                bottom: 0
            }
        };
        this.chartDimenstions.boundedWidth = this.chartDimenstions.width - this.chartDimenstions.margin.left - this.chartDimenstions.margin.right;
        this.chartDimenstions.boundedHeight = this.chartDimenstions.height - this.chartDimenstions.margin.top - this.chartDimenstions.margin.bottom;
    }

    //public createSvg(rootElement: HTMLDivElement): any {
        

    //    return wrapper;
    //}

    //public drawDefaultItem(svgWrapper: any) : any {
    //    //const wrapper = d3.select(rootElement)
    //    //    .append("svg")
    //    //    .attr("width", 1024)
    //    //    .attr("height", 768)
    //    const wrapper = d3.select(rootElement)
    //        .append("svg")
    //        .attr("width", 1024)
    //        .attr("height", 768)
    //    let wrapper = d3.select(svgWrapper);

    //    const bounds = wrapper.append("g")
    //        .attr("id","group")
    //        .attr("width", 179)
    //        .attr("height", 145)
    //    const imageView = bounds.append("defs")
    //        .append("pattern")
    //        .attr("id", "imageView")
    //        .attr("width", 1)
    //        .attr("height", 1)
    //        .attr("left", 0)
    //        .attr("top", 21)
    //        .attr("viewBox", "0 0 95 95")
    //        .attr("preserveAspectRatio", "none")
    //        .append("image")
    //        .attr('xlink:href', './images/tprbceip.png')
    //        .attr('width', 95)
    //        .attr('height', 95)
    //        .attr("preserveAspectRatio", "none")

    //    const topRect = bounds.append("rect")
    //        .attr("id","top")
    //        .attr("width", 179)
    //        .attr("height", 20)
    //        .attr("fill", "transparent")
    //        .attr("stroke", "darkgray")
    //        .attr("stroke-width", 1)
    //    const topText = bounds.append("text")
    //        .attr("x", 45)
    //        .attr("y", 14)
    //        .attr("font-size", "11")
    //        .attr("font-weight","bold")
    //        .text("AAS : Bosch T-1000");
    //    const topCircle = bounds.append("circle")
    //        .attr("width", 12)
    //        .attr("height", 12)
    //        .attr("fill", "green")
    //        .attr("stroke", "darkgray")
    //        .attr("stroke-width", 1)
    //        .attr("r", 6)
    //        .attr("cx", 3)
    //        .attr("cy", 3)
    //        .style("transform", `translate(9px,7px)`)
    //        .attr("class", "circle")

    //    const leftRect = bounds.append("rect")
    //        .attr("id","left")
    //        .attr("width", 99)
    //        .attr("height", 100)
    //        .attr("fill", "url(#imageView)")
    //        .attr("stroke", "darkgray")
    //        .attr("stroke-width", 1)
    //        .style("transform", "translate(0px,20px)")
    //    const rightRect = bounds.append("rect")
    //        .attr("id","right")
    //        .attr("width", 80)
    //        .attr("height", 100)
    //        .attr("fill", "transparent")
    //        .attr("stroke", "darkgray")
    //        .attr("stroke-width", 1)
    //        .style("transform", "translate(99px,20px)")
    //    const rightText = bounds.append("text")

    //    rightText.append("tspan")
    //        .attr("x", 105)
    //        .attr("y", 35)
    //        .attr("font-size","9")
    //        .text("Bosch T-1000")
    //    rightText.append("tspan")
    //        .attr("x", 105)
    //        .attr("y", 50)
    //        .attr("font-size", "9")
    //        .text("Color:Black")
    //    rightText.append("tspan")
    //        .attr("x", 105)
    //        .attr("y", 65)
    //        .attr("font-size", "9")
    //        .text("10x10 inches")

    //    const bottomRect = bounds.append("rect")
    //        .attr("id","bottom")
    //        .attr("width", 179)
    //        .attr("height", 25)
    //        .attr("fill", "transparent")
    //        .attr("stroke", "darkgray")
    //        .attr("stroke-width", 1)
    //        .style("transform", "translate(0px,120px)")
        
    //    bounds.append("path")
    //        .attr("width", 179)
    //        .attr("height", 25)
    //        .style("transform", `translate(0px,120px)`)
    //        .attr("class", "line")
    //    //bounds.style("transform", "translate(100px, 200px")
    //    return bounds;
    //}

    public drawRealtime(selector, monitorDimensition: MonitorDimensition) {
        const wrapper = d3.select(selector)
            .append("svg")
            .attr("width", monitorDimensition.width)
            .attr("height", monitorDimensition.height);

        const bounds = wrapper.append("g")
            .style("transform", `translate(${this.chartDimenstions.margin.left}px), ${this.chartDimenstions.margin.top}px`);
        bounds.append("circle")
            .attr("width", this.rectDimensitions.width)
            .attr("height", this.rectDimensitions.height)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .attr("r", 10)
            .attr("cx", 15)
            .attr("cy", 15)
            .style("transform", `translate(${this.rectDimensitions.left}px,${this.rectDimensitions.top}px)`)
            .attr("class", "circle")

        bounds.append("path")
            .attr("width", this.chartDimenstions.width)
            .attr("height", this.chartDimenstions.height)
            .style("transform", `translate(${this.chartDimenstions.left}px,${this.chartDimenstions.top}px)`)
            .attr("class", "line")
        bounds.append("defs")
            .append("pattern")
            .attr("id", "imageView")
            .attr("width", 1)
            .attr("height", 1)
            .attr("left", 10)
            .attr("top", 50)
            .attr("viewBox", "0 0 100 100")
            .attr("preserveAspectRatio", "none")
            .append("image")
            .attr('xlink:href', './tprbceip.png')
            .attr('width', 100)
            .attr('height', 100)
            .attr("preserveAspectRatio", "none")
        bounds.append("rect")
            .attr("id", "imageRect")
            .attr("fill", "url(#imageView)")
            .attr("width", "100")
            .attr("height", "100")
            .style("transform","translate(9px,30px)")
        
        const chart = (selection) => {
            selection.each((datas: Array<LineData>) => {

                let xMin = d3.min(datas, (lineData: LineData) => { return lineData.date });
                let xMax = d3.max(datas, (lineData: LineData) => { return lineData.date });

                const xScale = d3.scaleTime()
                    .domain([xMin!, xMax!])
                    .rangeRound([0, this.chartDimenstions.boundedWidth]);
                let yMin = d3.min(datas, (lineData: LineData) => { return lineData.monitorValue });
                let yMax = d3.max(datas, (lineData: LineData) => { return lineData.monitorValue });
                const yScale = d3.scaleLinear()
                    .domain([yMin!, yMax!])
                    .rangeRound([this.chartDimenstions.boundedHeight, 0]);

                let line = d3.line<LineData>()
                    .curve(d3.curveBasis)
                    .x((lineData: LineData) => xScale(this.xAccessor(lineData)))
                    .y((lineData: LineData) => yScale(this.yAccessor(lineData)))
                    
                //let lineSelect = bounds.select(".line")
                //    .attr("d", line(datas))
                //    .attr("fill", "none")
                //    .attr("stroke-width", 2)
                //    .attr("stroke", "#af9358");
               
                let circle = bounds.selectAll(".circle")
                    .data(datas)
                    .attr("fill", (d) => {
                        return `rgb(${d.colorValue})`
                    })
                
            })
        };

        return chart;
    }

    public drawMonitoringItem(aasId: number, wrapperElement: any, left: number, top: number) {
        console.log("wrapperElement", wrapperElement);
        //const wrapper = d3.select(wrapperElement)
        const wrapper = d3.select("body").select("svg")
            //.append("svg")
            //.attr("width", 179)
            //.attr("height", 145)
        //console.log("wrapper",wrapper);
        const bounds = wrapper.append("g")
            .attr("id", `MONITOR_GROUP_${aasId}`)
            .attr("width", 179)
            .attr("height", 145)
        const imageView = bounds.append("defs")
            .append("pattern")
            .attr("id", "imageView")
            .attr("width", 1)
            .attr("height", 1)
            .attr("left", 0)
            .attr("top", 21)
            .attr("viewBox", "0 0 95 95")
            .attr("preserveAspectRatio", "none")
            .append("image")
            .attr('xlink:href', './images/tprbceip.png')
            .attr('width', 95)
            .attr('height', 95)
            .attr("preserveAspectRatio", "none")

        const topRect = bounds.append("rect")
            .attr("id", "top")
            .attr("width", 179)
            .attr("height", 20)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
        const topText = bounds.append("text")
            .attr("x", 45)
            .attr("y", 14)
            .attr("font-size", "11")
            .attr("font-weight", "bold")
            .text("AAS : Bosch T-1000");
        const topCircle = bounds.append("circle")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", "green")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .attr("r", 6)
            .attr("cx", 3)
            .attr("cy", 3)
            .style("transform", `translate(9px,7px)`)
            .attr("class", "circle")

        const leftRect = bounds.append("rect")
            .attr("id", "left")
            .attr("width", 99)
            .attr("height", 100)
            .attr("fill", "url(#imageView)")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .style("transform", "translate(0px,20px)")
        const rightRect = bounds.append("rect")
            .attr("id", "right")
            .attr("width", 80)
            .attr("height", 100)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .style("transform", "translate(99px,20px)")
        const rightText = bounds.append("text")

        rightText.append("tspan")
            .attr("x", 105)
            .attr("y", 35)
            .attr("font-size", "9")
            .text("Bosch T-1000")
        rightText.append("tspan")
            .attr("x", 105)
            .attr("y", 50)
            .attr("font-size", "9")
            .text("Color:Black")
        rightText.append("tspan")
            .attr("x", 105)
            .attr("y", 65)
            .attr("font-size", "9")
            .text("10x10 inches")

        const bottomRect = bounds.append("rect")
            .attr("id", "bottom")
            .attr("width", 179)
            .attr("height", 25)
            .attr("fill", "transparent")
            .attr("stroke", "darkgray")
            .attr("stroke-width", 1)
            .style("transform", "translate(0px,120px)")

        bounds.append("path")
            .attr("width", 179)
            .attr("height", 23)
            .style("transform", `translate(14px,117px)`)
            .attr("class", "line")
        bounds.style("transform", `translate(${left}px, ${top}px)`);

        const chart = (selection) => {
            selection.each((datas: Array<LineData>) => {

                let xMin = d3.min(datas, (lineData: LineData) => { return lineData.date });
                let xMax = d3.max(datas, (lineData: LineData) => { return lineData.date });

                const xScale = d3.scaleTime()
                    .domain([xMin!, xMax!])
                    .rangeRound([0, this.chartDimenstions.boundedWidth]);
                let yMin = d3.min(datas, (lineData: LineData) => { return lineData.monitorValue });
                let yMax = d3.max(datas, (lineData: LineData) => { return lineData.monitorValue });
                const yScale = d3.scaleLinear()
                    .domain([yMin!, yMax!])
                    .rangeRound([this.chartDimenstions.boundedHeight, 0]);

                let line = d3.line<LineData>()
                    .curve(d3.curveBasis)
                    .x((lineData: LineData) => xScale(this.xAccessor(lineData)))
                    .y((lineData: LineData) => yScale(this.yAccessor(lineData)))

                let lineSelect = bounds.select(".line")
                    .datum(datas)
                    .attr("d", line)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke", "#af9358");

                let circle = bounds.selectAll(".circle")
                    .data(datas)
                    .attr("fill", (d) => {
                        return `rgb(${d.colorValue})`
                    })

            })
        };

        return chart;
    }
}
