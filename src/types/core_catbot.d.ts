export interface NapCatConfig {
    /** WebSocket 服务器地址 (必填) */
    ip: string;
    /** WebSocket 端口 (必填) */
    port: number;
    /** 鉴权令牌 */
    token: string;
    /** 自动重连配置 */
    reconnect?: reconnect;
    /** 心跳配置 */
    heartbeat?: heartbeat;
}
export interface reconnect {
    enabled: boolean;
    maxRetries: number; // 最大重试次数
    retryInterval: number; // 重试间隔(ms)
}
export interface heartbeat {
    enabled: boolean;
    interval: number; // 心跳间隔(ms)
}
