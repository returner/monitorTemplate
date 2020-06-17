import { ChartData } from "./chartData";

export class MonitorObject {
    public monitorElementInstanceId : string;
    public monitorDatas: Array<ChartData> = [];
    public drawChartObject: any;
    public element: any;
}
