import { NumberTypeChartOption } from "./base/numberTypeChartOption";
import { GaugeRatioColor } from "./gaugeRatioColor";


export class LinearGaugeChartOption extends NumberTypeChartOption {
    public gaugeRatioColors : Array<GaugeRatioColor> = [
        {ratio : 0.4, color : "rgb(91,171,133)"},
        {ratio : 0.3, color : "rgb(244,189,31)"},
        {ratio : 0.2, color : "rgb(189,37,38)"}
    ];
}