import { LineData } from "./lineData"

export class MonitorObject {
    public aasId: number
    public monitorDatas: Array<LineData> = [];
    public d3DrawObject: any;
    public element: any;
}
