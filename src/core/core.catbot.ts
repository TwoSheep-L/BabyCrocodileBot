import WebSocket from "ws";
import { NapCatConfig, reconnect, heartbeat } from "@/types/core_catbot";

export default class CatBot implements NapCatConfig {
    public ws: WebSocket;
    constructor(
        public ip: string,
        public token: string,
        public port: number,
        public reconnect?: reconnect,
        public heartbeat?: heartbeat
    ) {
        this.token = token;
        this.reconnect = reconnect;
        let ipUrl = ip;
        if (ipUrl.startsWith("http")) {
            ipUrl = ipUrl.replace("http", "ws");
        }
        if (!ipUrl.startsWith("ws")) {
            ipUrl = "ws://" + ipUrl;
        }
        const ws = new WebSocket(ipUrl + ":" + port, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        this.ws = ws;
    }
}
