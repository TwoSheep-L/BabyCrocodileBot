import { WebSocket } from "ws";
import CatBot from "./core.catbot";
import { NapCatConfig } from "@/types/core_catbot";
import { logger } from "@/utils/logger";
import { botMessage } from "@/types/core_client";
import core_apis from "./core_apis";
import { api } from "@/types/core_apis";
import { v4 } from "uuid";
import colors from "colors";

class CoreClient {
    public state: number = 0; //状态 0:未连接 1:连接中 2:已连接
    public botServer: CatBot | undefined;
    public api: api | undefined;
    public events: string[] = [];

    //消息监听执行函数
    public msgEvents: any = {};

    constructor(public ws?: WebSocket) {
        this.ws = ws;
        this.events = [
            "meta_event.lifecycle",
            "meta_event.lifecycle.enable",
            "meta_event.lifecycle.disable",
            "meta_event.lifecycle.connect",
            "meta_event.heartbeat",
            "message.private",
            "message.private.friend",
            "message.private.group",
            "message.private.group_self",
            "message.private.other",
            "message.group",
            "message.group.normal",
            "message.group.notice",
            "message_sent.private",
            "message_sent.private.friend",
            "message_sent.private.group",
            "message_sent.private.group_self",
            "message_sent.private.other",
            "message_sent.group",
            "message_sent.group.normal",
            "message_sent.group.notice",
            "request.friend",
            "request.group.add",
            "request.group.invite",
            "notice.friend_add",
            "notice.friend_recall",
            "notice.offline_file",
            "notice.client_status",
            "notice.group_admin",
            "notice.group_admin.set",
            "notice.group_admin.unset",
            "notice.group_ban",
            "notice.group_ban.ban",
            "notice.group_ban.lift_ban",
            "notice.group_card",
            "notice.group_decrease",
            "notice.group_decrease.leave",
            "notice.group_decrease.kick",
            "notice.group_decrease.kick_me",
            "notice.group_increase",
            "notice.group_increase.approve",
            "notice.group_increase.invite",
            "notice.group_recall",
            "notice.group_upload",
            "notice.group_msg_emoji_like",
            "notice.essence",
            "notice.essence.add",
            "notice.notify.poke",
            "notice.notify.input_status",
            "notice.notify.title",
            "notice.notify.profile_like",
        ];
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
            return logger.error("服务端未连接");
        }
        // 连接建立时触发
        this.ws.on("open", this.onOpen);

        // 接收到消息时触发
        this.ws.on("message", this.onMessage);

        // 连接关闭时触发
        this.ws.on("close", this.onClose);

        // 错误处理
        this.ws.on("error", this.onError);
    };

    //收到消息时触发函数
    submitListenFn = (event: string, data: any) => {
        if (Array.isArray(this.msgEvents?.[event])) {
            let fnList = this.msgEvents?.[event];
            fnList.forEach((fnConfig) => {
                if (typeof fnConfig.fn === "function") {
                    fnConfig.fn(data);
                }
            });
        }
    };

    //添加事件监听函数
    on = (event: string, fn: Function) => {
        if (this.events.includes(event)) {
            if (!this.msgEvents?.[event]) {
                this.msgEvents[event] = [];
            }
            let fnConfig = {
                event,
                fn,
                id: v4(),
            };
            this.msgEvents[event].push(fnConfig);
            return fnConfig.id;
        } else {
            logger.error(`[错误]事件${event}不存在`);
        }
    };

    //连接时触发
    onOpen = async () => {
        logger.info("成功连接到服务器。");
    };

    //收到消息时触发
    onMessage = async (dataBaffle: Buffer) => {
        let data: any = {};
        try {
            data = JSON.parse(dataBaffle.toString());
            logger.info("[接收]服务端返回数据:" + dataBaffle.toString());
            // console.log(data);
        } catch (error) {
            logger.error("[错误]数据解析错误:" + error);
            return;
        }

        if (data?.post_type === "meta_event") {
            //事件
            if (data?.meta_event_type === "lifecycle") {
                //心跳连接成功事件
                if (data?.sub_type === "connect") {
                    this.submitListenFn("meta_event.lifecycle", data);
                }
            }
            //心跳事件
            if (data?.meta_event_type === "heartbeat") {
                logger.info(`[心跳]${"♥".red}`);
                this.submitListenFn("meta_event.heartbeat", data);
            }
        }

        if (data?.post_type === "message") {
            //收到消息
            if (data?.message_type === "group") {
                //收到群消息
                this.submitListenFn("message.group", data);
            }
            if (data?.message_type === "private") {
                //收到私聊消息
                this.submitListenFn("message.private", data);
                if (data?.sub_type === "friend") {
                    //好友消息
                    this.submitListenFn("message.private.friend", data);
                }
                if (data?.sub_type === "group") {
                    //临时消息
                    this.submitListenFn("message.private.group", data);
                }
            }
        }

        if (data?.post_type === "message_sent") {
            //收到消息
            if (data?.message_type === "group") {
                //收到群消息
                this.submitListenFn("message_sent.group", data);
            }
            if (data?.message_type === "private") {
                //收到私聊消息
                this.submitListenFn("message_sent.private", data);
                if (data?.sub_type === "friend") {
                    //好友消息
                    this.submitListenFn("message_sent.private.friend", data);
                }
                if (data?.sub_type === "group") {
                    //临时消息
                    this.submitListenFn("message_sent.private.group", data);
                }
            }
        }

        if (data?.post_type === "request") {
            //请求事件
            if (data?.request_type === "group") {
                //群添加请求
                if (data?.sub_type === "add") {
                    logger.info(
                        `[加群申请]  ${data?.user_id}->${data?.group_id} ${data?.comment}`
                    );
                    this.submitListenFn("request.group.add", data);
                }
                //群邀请
                if (data?.sub_type === "invite") {
                    logger.info(
                        `[群邀请]  ${data?.user_id}->${data?.group_id} ${data?.comment}`
                    );
                    this.submitListenFn("request.group.invite", data);
                }
            }

            if (data?.request_type === "friend") {
                //好友添加请求
                logger.info(`[加好友申请]  ${data?.user_id} ${data?.comment}`);
                this.submitListenFn("request.friend", data);
            }
        }

        if (data?.post_type === "notice") {
            //通知事件
            if (data?.notice_type === "friend_add") {
                //好友添加
                this.submitListenFn("notice.friend_add	", data);
            }
            if (data?.notice_type === "friend_recall") {
                //私聊撤回消息
                this.submitListenFn("notice.friend_recall", data);
            }
            if (data?.notice_type === "group_admin") {
                //群里管理员变动
                this.submitListenFn("notice.group_admin", data);
                if (data?.sub_type === "set") {
                    //管理员增加
                    this.submitListenFn("notice.group_admin.set", data);
                }
                if (data?.sub_type === "unset") {
                    //管理员减少
                    this.submitListenFn("notice.group_admin.unset", data);
                }
            }
            if (data?.notice_type === "group_ban") {
                //群禁言
                this.submitListenFn("notice.group_ban", data);
                if (data?.sub_type === "ban") {
                    //禁言
                    this.submitListenFn("notice.group_ban.ban", data);
                }
                if (data?.sub_type === "lift_ban") {
                    //解除禁言
                    this.submitListenFn("notice.group_ban.lift_ban", data);
                }
            }
            if (data?.notice_type === "group_card") {
                //群成员名片更新
                this.submitListenFn("notice.group_card", data);
            }
            if (data?.notice_type === "group_decrease") {
                //群成员减少
                this.submitListenFn("notice.group_decrease", data);
                if (data?.sub_type === "leave") {
                    //主动退群
                    this.submitListenFn("notice.group_decrease.leave", data);
                }
                if (data?.sub_type === "kick") {
                    //被踢出群
                    this.submitListenFn("notice.group_decrease.kick", data);
                }
                if (data?.sub_type === "kick_me") {
                    //登录号被踢出群
                    this.submitListenFn("notice.group_decrease.kick_me", data);
                }
            }
            if (data?.notice_type === "group_increase") {
                //群成员增加
                this.submitListenFn("notice.group_increase", data);
                if (data?.sub_type === "approve") {
                    //管理员已同意入群
                    this.submitListenFn("notice.group_increase.approve", data);
                }
                if (data?.sub_type === "invite") {
                    //管理员邀请入群
                    this.submitListenFn("notice.group_increase.invite", data);
                }
            }
            if (data?.notice_type === "group_recall") {
                //群消息撤回
                this.submitListenFn("notice.group_recall", data);
            }
            if (data?.notice_type === "group_upload") {
                //群聊文件上传
                this.submitListenFn("notice.group_upload", data);
            }
            if (data?.notice_type === "group_msg_emoji_like") {
                //群聊表情回应
                this.submitListenFn("notice.group_msg_emoji_like", data);
            }
            if (data?.notice_type === "essence") {
                //群聊设精
                this.submitListenFn("notice.essence", data);
            }
            if (data?.notice_type === "notify") {
                //通知事件
                if (data?.sub_type === "poke") {
                    //戳一戳
                    this.submitListenFn("notice.notify.poke", data);
                }
                if (data?.sub_type === "input_status") {
                    //输入状态更新
                    this.submitListenFn("notice.notify.input_status", data);
                }
                if (data?.sub_type === "title") {
                    //群成员头衔变更
                    this.submitListenFn("notice.notify.title", data);
                }
                if (data?.sub_type === "profile_like") {
                    //点赞
                    this.submitListenFn("notice.notify.profile_like", data);
                }
            }
        }
    };

    //关闭连接时触发
    onClose = () => {
        this.ws?.close();
    };

    //错误时触发
    onError = (err: Error) => {
        logger.error("WebSocket error:" + err);
    };
}
export const bot = new CoreClient();
export const apis = bot.api;
