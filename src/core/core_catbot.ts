import WebSocket from "ws";
import { NapCatConfig, reconnect, heartbeat } from "@/types/core_catbot";
import { logger } from "@/utils/logger";

export default class CatBot implements NapCatConfig {
    public ws!: WebSocket;
    public state: number = 2; // 0: 连接中, 1: 已连接 2: 断开连接
    public heart: boolean = false; //当前心跳
    private retryCount: number = 0; //当前重试次数
    private interval?: number; //心跳检测间隔
    private heartTimer?: NodeJS.Timeout; //当前心跳检测的timer

    constructor(
        public ip: string,
        public token: string,
        public port: number,
        public reconnect?: reconnect,
        public heartbeat?: heartbeat
    ) {
        this.token = token;
        this.reconnect = reconnect || {
            enabled: true,
            maxRetries: 3,
            retryInterval: 1000,
        };
        this.content(ip, port, token); //连接服务器
    }

    //监听服务器
    public listen() {
        this.ws?.on("open", () => {
            logger.info(`${this.ip}:${this.port} 连接成功`);
            this.state = 1;
        });
        this.ws?.on("message", (dataBuffer: Buffer) => {
            //用于心跳检测
            let dataString = dataBuffer.toString();
            let data: any = {};
            try {
                data = JSON.parse(dataString);
            } catch (error) {}
            //心跳包
            if (
                data.post_type === "meta_event" &&
                data.meta_event_type === "heartbeat"
            ) {
                let status: any = data?.status;
                this.interval = data?.interval + 2000 || 32000;
                if (status.online && status.good) {
                    //在线
                    this.heart = true;
                    clearTimeout(this.heartTimer);
                    this.heartTimer = setTimeout(() => {
                        //心跳检测超时 无心跳状态
                        logger.error(`${this.ip}:${this.port} 心跳断开`);
                        this.disconnect(true); //断开后重试
                    }, this.interval);
                    //
                } else {
                    logger.error(
                        `${this.ip}:${this.port} 状态断开 online: ${status.online} good: ${status.good}`
                    );
                    this.disconnect();
                }
            }
        });
        this.ws?.on("error", (err) => {
            logger.error(err);
        });
        this.ws?.on("close", () => {
            logger.error(`${this.ip}:${this.port} 断开连接`);
            this.state = 2;
            if (this.reconnect?.enabled) {
                this.retry(); //重试逻辑
            }
        });
    }

    //断开连接
    public disconnect(retry = false) {
        this.heart = false;
        this.state = 2;
        clearTimeout(this.heartTimer);
        this.ws?.close();
        if (!retry && this.reconnect) {
            //如果 retry 为 false，说明是主动断开连接，重试机制关闭
            this.reconnect.enabled = false;
        }
    }

    //连接到服务器
    public content(ip: string, port: number | string, token: string) {
        let ipUrl = ip;
        if (ipUrl.startsWith("http")) {
            ipUrl = ipUrl.replace("http", "ws");
        }
        if (!ipUrl.startsWith("ws")) {
            ipUrl = "ws://" + ipUrl;
        }
        try {
            this.state = 0; //连接中
            logger.info(`正在连接 ${ipUrl}:${port}`);
            const ws = new WebSocket(ipUrl + ":" + port, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            this.ws = ws;
            this.listen();
            return true; //连接成功
        } catch (error) {
            console.error(`${this.ip} 连接失败`, error);
            if (this.reconnect?.enabled) {
                this.retry(); //重试逻辑
            }
            return false; //连接失败
        }
    }

    //重试机制
    public async retry() {
        if (!this.reconnect?.enabled) {
            logger.error(`ip:${this.ip}:${this.port} 重试机制已关闭`);
            return;
        }
        if (this.state === 2 && this.reconnect?.enabled) {
            let timer = setInterval(() => {
                this.retryCount += 1;
                if (
                    this.reconnect?.maxRetries &&
                    this.retryCount > this.reconnect?.maxRetries
                ) {
                    clearInterval(timer);
                    logger.error(
                        `ip:${this.ip}:${this.port} 重试 ${this.reconnect?.maxRetries} 次后连接失败`
                    );
                    this.retryCount = 0;
                    return;
                }
                logger.info(
                    `第${this.retryCount}次重试连接 ${this.ip}:${this.port}`
                );
                let success = this.content(this.ip, this.port, this.token);
                if (success) {
                    clearInterval(timer);
                }
            }, this.reconnect?.retryInterval || 1000);
        }
    }
}
