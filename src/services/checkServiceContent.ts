import WebSocket from "ws";
import checkServiceContent, {
    checkServiceContentResponse,
    serverDataSuccess,
    serverDataFailed,
} from "./checkServiceContentType";

//检测服务端连接
export default (
    config: Partial<checkServiceContent>
): Promise<checkServiceContentResponse> => {
    return new Promise((resolve, reject) => {
        let result: checkServiceContentResponse = {
            status: 0,
            message: "未连接",
        };
        // console.log("[检查]检查服务端连接...");
        const ws = new WebSocket(`ws://${config.ip}:${config.port}`, {
            headers: {
                Authorization: `Bearer ${config.token}`,
            },
        });
        ws.on("open", () => {
            // console.log("[检查]服务端连接成功");
            result.status = 0;
            result.message = "仅仅连接到服务端.";
            ws.close();
        });
        ws.on("error", () => {
            // console.log("[检查]服务端连接失败");
            result.status = -1;
            result.message = "服务端连接失败";
        });

        ws.on("message", (data) => {
            // console.log("[检查]服务端返回数据:");
            let success: Boolean = false;
            let serverData: Partial<serverDataSuccess | serverDataFailed> = {};
            try {
                let dataObj = JSON.parse(data.toString());
                if (dataObj?.sub_type === "connect") {
                    success = true;
                    serverData = dataObj as serverDataSuccess;
                } else {
                    success = false;
                    serverData = dataObj as serverDataFailed;
                }
            } catch (error) {
                // console.log("[检查]服务端返回数据解析失败");
                result.status = -2;
                result.message = "服务端返回数据解析失败";
                return;
            }
            if (success) {
                let tempdata: serverDataSuccess =
                    serverData as serverDataSuccess;
                result.status = 1;
                result.message = `服务端连接成功,当前qq:${tempdata.self_id}`;
            } else {
                let tempdata: serverDataFailed = serverData as serverDataFailed;
                result.status = -3;
                result.message = `服务端返回数据错误,错误码:${tempdata.retcode},错误信息:${tempdata.message}`;
            }
        });

        ws.on("close", () => {
            resolve(result);
        });
    });
};
