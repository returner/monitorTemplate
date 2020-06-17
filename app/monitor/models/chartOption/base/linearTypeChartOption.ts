import { ChartOption } from "./chartOption";
import { LinearValueExpressionType } from "../linearValueExpressionType";
import { GaugeRatioColor } from "../gaugeRatioColor";



export class LinearTypeChartOption extends ChartOption {
    public rangeMinValue : number = 0;
    public rangeMaxValue : number = 100;
    public expressionValueType : LinearValueExpressionType = LinearValueExpressionType.RatioValue;
    public gaugeRatioColors : Array<GaugeRatioColor> = [
        {ratio : 0.4, color : "rgb(91,171,133)"},
        {ratio : 0.3, color : "rgb(244,189,31)"},
        {ratio : 0.2, color : "rgb(189,37,38)"}
    ];
    public expressionFixedDigits : number = 2;

}