import { ChartData } from "../models/chartData";

export class GraphTypeAccessor {
    public xAccessor = (d : ChartData) => {return d.xAxis};
    public yAccessor = (d : ChartData) => {return d.yAxis};
}