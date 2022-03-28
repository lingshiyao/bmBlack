export class Log {
    public static logHistory: Map<string, Array<Array<any>>> = new Map<string,
        Array<Array<any>>>();
    private readonly type: string = "random";
    private readonly show: boolean = false;
    private readonly saveHistory: boolean = true;
    private readonly title: string;

    /**
     *
     * @param title
     */
    private constructor(title: string) {
        this.title = title;
    }

    public static create(title: string = "LOG"): Log {
        return new Log(title);
    }

    /**
     *
     * @param args
     * @returns
     */
    public i(...args: any[]): Function {
        if (this.saveHistory) {
            let lst: Array<Array<any>> | undefined = Log.logHistory.get(this.title);
            if (lst === undefined) {
                lst = [];
            }
            lst.push(args);
            Log.logHistory.set(this.title, lst);
        }
        const none = () => {
        };
        if (this.show) return this.getConsolelog(args, this.title);
        else return none;
    }

    /**
     *
     * @returns
     */
    private getTypeCss(): string {
        return `color:${this.getRandomColor()};background:${this.getRandomColor()};font-size: 18px;font-weight:bold`;
    }

    /**
     *
     * @param args
     * @param level
     * @returns
     */
    private getConsolelog(args: any[], level: string): Function {
        const format: string = this.getFormat(level);
        const css: string = this.getCss(this.type);
        const typeCss: string = this.getTypeCss();
        let msg: string = "";
        for (let i = 0; i < args.length; i++) {
            if (this.isObject(args[i])) {
                msg += JSON.stringify(args[i], null, 2);
            } else {
                msg += args[i];
            }
        }
        return console.log.bind(console, format, typeCss, css, msg);
    }

    /**
     *
     * @returns
     */
    private getRandomColor(): string {
        return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    }

    /**
     *
     * @param level
     * @returns
     */
    private getFormat(level: string): string {
        const space: string = "                                 ";
        const levelStr: string = space + level + space;
        return `%c${levelStr}\n%c%s\n`;
    }

    /**
     *
     * @param exp
     * @returns
     */
    private isObject(exp: any): boolean {
        return Object.prototype.toString.call(exp) == "[object Object]";
    }

    /**
     *
     * @param type
     * @returns
     */
    private getCss(type: string): string {
        if (type === "random") {
            return "color:" + this.getRandomColor() + ";";
        } else {
            return "";
        }
    }
}
