import { WebSocket } from "ws";
import CatBot from "./core.catbot";
import { NapCatConfig } from "@/types/core_catbot";
import { logger } from "@/utils/logger";
import { botMessage, defaultMsg } from "@/types/core_client";
import core_apis from "./core_apis";
import { api } from "@/types/core_apis";
import { cq_at, cq_music, cq_text } from "./core_CQ";
import path from "path";
import fs from "fs";
import ini from "ini";
import iconv from "iconv-lite";

class CoreClient {
    public state: number = 0; //状态 0:未连接 1:连接中 2:已连接
    public botServer: CatBot | undefined;
    public api: api | undefined;
    constructor(public ws?: WebSocket) {
        this.ws = ws;
    }

    //连接服务端
    connect = async (data: NapCatConfig) => {
        this.botServer = new CatBot(data.ip, data.token, data.port);
        this.state = 2;
        this.ws = this.botServer.ws;
        this.onListen();
        this.api = core_apis(this.ws);
    };

    //开始监听
    onListen = () => {
        if (this.state !== 2 || !this.ws) {
            return logger.info("服务端未连接");
        }
        // 连接建立时触发
        this.ws.on("open", () => {
            logger.info("成功连接到服务器。");
            // if (this.api) {
            //     this.api.send_group_msg("252326949", [
            //         cq_at(1249611204),
            //         "你好",
            //         cq_music({
            //             type: "163",
            //             id: "2072639869",
            //         }),
            //     ]);
            // }
        });

        // 接收到消息时触发
        this.ws.on("message", async (dataBaffle) => {
            let data: Partial<botMessage> = {};
            try {
                data = JSON.parse(dataBaffle.toString());
                logger.info("[接收]服务端返回数据:" + dataBaffle.toString());
                // console.log(data);
            } catch (error) {
                logger.error("[错误]数据解析错误:" + error);
                return;
            }

            if (data?.post_type === "message") {
                let message: botMessage = data as botMessage;
                //收到消息
                if (data?.message_type === "group") {
                    //收到群消息
                    // logger.info(
                    //     `[收到群消息]:${message?.group_id} ${message?.sender?.user_id} ${message?.raw_message}`
                    // );
                    if (message?.sender?.user_id == 1249611204 && this.api) {
                        const res = await this.api?.get_stranger_info(
                            "1249611204"
                        );
                        console.log("个人信息", res.nick);
                    }

                    if (
                        message?.group_id === 752544843 ||
                        message?.group_id === 252326949
                    ) {
                        if (
                            message?.message?.[0]?.data?.text === "机器人进度"
                        ) {
                            this.api?.send_group_msg(
                                (message.group_id as number) + "",
                                [
                                    cq_at(message.user_id as number),
                                    cq_text(
                                        " \n当前建设进度：10% 框架建设中.\n(可能会时而失效)"
                                    ),
                                ]
                            );
                        }
                    }
                    //历史数据
                    if (
                        message?.group_id === 752544843 ||
                        message?.group_id === 252326949
                    ) {
                        if (
                            message?.message?.[0]?.data?.text === "查询历史数据"
                        ) {
                            let dataPath = path.resolve(
                                __dirname,
                                `../datas/JiYin/${message.group_id}/群员信息/${message.user_id}.ini`
                            );
                            let groupDataPath = path.resolve(
                                __dirname,
                                `../datas/JiYin/${message.group_id}/数据/说话数据.ini`
                            );
                            //检查路径是否存在
                            if (!fs.existsSync(dataPath)) {
                                this.api?.send_group_msg(
                                    (message.group_id as number) + "",
                                    [
                                        cq_at(message.user_id as number),
                                        cq_text(" \n未找到你的历史数据"),
                                    ]
                                );
                            } else {
                                //有数据
                                let textData = fs.readFileSync(dataPath);
                                let geoupData = fs.readFileSync(groupDataPath);
                                let newtextData = iconv.decode(textData, "gbk");
                                let newGeoupData = iconv.decode(
                                    geoupData,
                                    "gbk"
                                );
                                let iniData = ini.parse(newtextData) as any;
                                let GeoupiniData = ini.parse(
                                    newGeoupData
                                ) as any;
                                let msgNum = Object.values(
                                    GeoupiniData
                                )?.reduce((pre, cur) => {
                                    let my = (cur as any)[message.user_id];
                                    console.log(my);
                                    if (my) {
                                        return (pre as number) + parseInt(my);
                                    }
                                    return pre;
                                }, 0);
                                let userInfoRes = ``;
                                userInfoRes += `持有金币:${iniData?.信息?.金币}\n银行卡:${iniData?.信息?.银行}\n服务器绑定id:${iniData?.信息?.绑定}\n说话记录:${msgNum}条`;
                                this.api?.send_group_msg(
                                    (message.group_id as number) + "",
                                    [
                                        cq_at(message.user_id as number),
                                        cq_text(
                                            " \n你在本群的历史数据为:\n" +
                                                userInfoRes +
                                                "\n数据截止到:2023/3/25"
                                        ),
                                    ]
                                );
                            }

                            console.log("路径", dataPath);

                            // this.api?.send_group_msg(
                            //     (message.group_id as number) + "",
                            //     [
                            //         cq_at(message.user_id as number),
                            //         cq_text(
                            //             " \n当前建设进度：10% 框架建设中.\n(可能会时而失效)"
                            //         ),
                            //     ]
                            // );
                        }
                    }
                }
                if (data?.message_type === "private") {
                    //收到私聊消息
                    logger.info(
                        `[收到私聊消息]:${message?.group_id} ${message?.sender?.user_id} ${message?.raw_message}`
                    );
                }
            }

            if (data?.post_type === "request") {
                if (
                    data?.request_type === "group" &&
                    data?.sub_type === "add"
                ) {
                    logger.info(
                        `[加群申请]  ${data?.user_id}->${data?.group_id} ${data?.comment}`
                    );
                    //群添加请求
                }

                if (data?.request_type === "friend") {
                    //好友添加请求
                    logger.info(
                        `[加好友申请]  ${data?.user_id} ${data?.comment}`
                    );

                    if (this.api && data?.flag) {
                        //获取对方名字
                        const userInfo = await this.api?.get_stranger_info(
                            data?.user_id + ""
                        );
                        this.api.set_friend_add_request(
                            data?.flag,
                            true,
                            userInfo?.nick
                        );
                        logger.info("已同意好友请求");
                    }
                }
            }
        });

        // 连接关闭时触发
        this.ws.on("close", function close() {
            logger.info("Disconnected from WebSocket server");
        });

        // 错误处理
        this.ws.on("error", function error(err) {
            logger.error("WebSocket error:" + err);
        });
    };
}
export const bot = new CoreClient();
export const apis = bot.api;
