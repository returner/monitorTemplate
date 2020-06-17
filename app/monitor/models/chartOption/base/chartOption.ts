import { ChartType } from "../../chartType";
import { MonitorDimensition } from "../../monitorDimensition";

export class ChartOption {
    public monitorElementInstanceId : string;
    public expressionColor : string;
    public monitorDimensition : MonitorDimensition;
}

// export class ChartOption {
//     public aasId : number;
//     public chartTypeValue : string;
//     public chartType : ChartType;
//     public valueColorCode : string;
//     public isShowXAsix : boolean;
//     public isShowYAsix : boolean;
//     public rangeMinValue : number = 0;
//     public rangeMaxValue : number = 100;
//     public accessor : Accessor = new Accessor();
// }
