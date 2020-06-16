import { ChartData } from "./chartData";

export class MonitorObject {
    public aasId: number
    public monitorDatas: Array<ChartData> = [];
    public drawChartObject: any;
    public element: any;
}
