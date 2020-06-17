import { ChartData } from "../models/chartData";

export class GraphTypeAccessor {
    public yAccessor = (d : ChartData) => {return d.yAxis};
    public xAccessor = (d : ChartData) => {return d.xAxis};
}