import { NumberTypeChartOption } from "./base/numberTypeChartOption";
import { GaugeRatioColor } from "./gaugeRatioColor";

export class GaugeChartOption extends NumberTypeChartOption {
    public gaugeRatioColors : Array<GaugeRatioColor> = [];
}