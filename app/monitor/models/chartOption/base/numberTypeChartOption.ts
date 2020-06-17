import { ChartOption } from "./chartOption";

export enum NumberTypeChartExpressionValueType {
    none, originValue, ratioValue
}
export class NumberTypeChartOption extends ChartOption {
    public rangeMinValue : number = 0;
    public rangeMaxValue : number = 100;
    public expressionValueType : NumberTypeChartExpressionValueType = NumberTypeChartExpressionValueType.ratioValue;
}