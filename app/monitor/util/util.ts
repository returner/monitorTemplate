export class Util {
    static randomNumber(min : number, max : number) : number {
        return Math.floor(Math.random() * max) + min;
    }
}

window["Util"] = Util;

