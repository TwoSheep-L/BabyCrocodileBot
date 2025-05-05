import colors from "colors";
import fs from "fs";
import moment = require("moment");

type formatFn = (variables: string[]) => string;

interface Logers {
    [key: string]: {
        title: string;
        showTime?: boolean;
        format?: string | formatFn;
    };
}

interface LogOptions {
    title?: string;
    showTime?: boolean;
}

class LLog {
    private static instance: LLog;
    private localStream: fs.WriteStream | undefined;
    private pathDir: string = "";
    public types: Logers;
    public info: Function = () => {};
    public error: Function = () => {};
    public warn: Function = () => {};
    public debug: Function = () => {};

    private constructor(userTypes: Logers = {}) {
        // 合并默认配置和用户配置
        this.types = {
            info: {
                title: "INFO",
                showTime: true,
            },
            error: {
                title: "ERROR",
                showTime: true,
                format: colors.red("[{time}] [{type}] {value}"),
            },
            warn: {
                title: "WARN",
                showTime: true,
                format: colors.yellow("[{time}] [{type}] {value}"),
            },
            debug: {
                title: "DEBUG",
                showTime: true,
                format: colors.blue("[{time}] [{type}] {value}"),
            },
            ...userTypes,
        };

        this.initLoggerTypes(this.types);
    }

    public static getInstance(): LLog {
        if (!LLog.instance) {
            LLog.instance = new LLog();
        }
        return LLog.instance;
    }

    public setLocation(pathDir: string) {
        if (!fs.existsSync(pathDir)) {
            fs.mkdirSync(pathDir, { recursive: true });
        }
        this.pathDir = pathDir;
        this.createLogStream(moment().format("YYYY-MM-DD"));
    }

    private createLogStream(logName: string): fs.WriteStream {
        const filePath = `${this.pathDir}/${logName}.log`;
        const stream = fs.createWriteStream(filePath, { flags: "a" });
        this.localStream = stream;
        stream.on("error", (err) => {
            console.log("本地日志写入错误", err);
        });
        return stream;
    }

    private initLoggerTypes(types: Logers) {
        Object.keys(types).forEach((key) => {
            const typeConfig = types[key];
            (this as any)[key] = (value: any, options: LogOptions = {}) => {
                const title = options.title || typeConfig.title;
                const showTime = options.showTime ?? typeConfig.showTime;
                let format = typeConfig.format;

                if (typeof format === "function") {
                    const variables = [
                        moment().format("YYYY-MM-DD HH:mm:ss"),
                        title,
                        value,
                    ];
                    format = format(variables);
                }

                this.log(
                    title,
                    showTime || false,
                    value,
                    typeof format === "string" ? format : undefined
                );
            };
        });
    }

    private handleFormat(format: string, formatMap: { [key: string]: any }) {
        return format.replace(/{(\w+)}/g, (_, key) => formatMap[key] || "");
    }

    private log = (
        title: string,
        showTime: boolean,
        value: any,
        format?: string
    ) => {
        const time = moment().format("YYYY-MM-DD HH:mm:ss");
        let resValue: string;

        if (format) {
            resValue = this.handleFormat(format, { time, type: title, value });
        } else {
            const timePart = showTime ? colors.green(`[${time}]`) : "";
            const titlePart = colors.yellow(`[${title}]`);
            resValue = [timePart, titlePart, value].filter(Boolean).join(" ");
        }

        console.log(resValue);

        if (this.localStream) {
            const logMessage = format
                ? resValue.replace(/\u001b\[\d+m/g, "") // 去除控制台颜色代码
                : `[${time}] [${title}] ${value}`;
            this.localStream.write(`${logMessage}\n`);
        }
    };
}

// 创建并导出单例实例
export const logger = LLog.getInstance();
