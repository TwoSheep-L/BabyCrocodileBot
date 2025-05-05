export default interface config {
    ip: string;
    token: string;
    port: number;
    reconnect?: reconnect;
    heartbeat?: heartbeat;
}
