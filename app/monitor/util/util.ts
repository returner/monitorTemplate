export class Util {
    public randomNumber(min : number, max : number) : number {
        return Math.floor(Math.random() * max) + min;
    }
}

window["Util"] = new Util();

