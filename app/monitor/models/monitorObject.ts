import { ChartData } from "./chartData";

export class MonitorObject {
    public aasId: number
    public monitorDatas: Array<ChartData> = [];
    public monitorData : ChartData;
    public d3DrawObject: any;
    public element: any;
}
