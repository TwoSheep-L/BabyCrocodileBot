import { WebSocket } from "ws";
import CatBot from "./core.catbot";
import { NapCatConfig } from "@/types/core_catbot";
import { logger } from "@/utils/logger";
import {
    botMessage,
    changeConfigParams,
    outputData,
} from "@/types/core_client";
import core_apis from "./core_apis";
import { api } from "@/types/core_apis";
import { v4 } from "uuid";
import colors from "colors";
import fs from "fs";
import path from "path";
import { Plugin } from "@/core/core_pulgin";
import { pluginArgs } from "@/types/core_pulgin";

class CoreClient {
    public state: number = 0; //状态 0:未连接 1:连接中 2:已连接
    public botServer: CatBot | undefined;
    public api: api | undefined;
    public events: string[] = [];
    public config: changeConfigParams = { serverOriginData: true };
    public plugins: Plugin[] = [];

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

    //修改配置项
    changeConfig(config: changeConfigParams) {
        if (config.serverOriginData) {
            this.config.serverOriginData = config.serverOriginData;
        }
    }

    //连接服务端
    connect = async (data: NapCatConfig) => {
        this.botServer = new CatBot(data.ip, data.token, data.port);
        this.state = 0;
        this.ws = this.botServer.ws;
        this.onListen();
        this.api = core_apis(this.ws);
    };

    //开始监听
    onListen = () => {
        // if (this.state !== 2 || !this.ws) {
        //   return logger.error("服务端未连接");
        // }
        if (!this.ws) return;
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
    submitListenFn = <T>(event: string, data: any) => {
        let pluginData = <T>this.handlerData(event, data);
        if (Array.isArray(this.msgEvents?.[event])) {
            let fnList = this.msgEvents?.[event];
            fnList.forEach((fnConfig) => {
                if (typeof fnConfig.fn === "function") {
                    fnConfig.fn(pluginData || data, data);
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

    //加载插件
    loadPlugin = async () => {
        this.plugins = []; //清空插件加载列表
        this.msgEvents = []; //清空插件事件监听列表
        let dirPath = path.resolve(__dirname, "../plugins");
        //检测文件是否存在
        if (!fs.existsSync(dirPath)) {
            //创建
            fs.mkdirSync(dirPath);
            logger.info(`[插件]创建插件目录成功`);
            return;
        }
        let dirs = fs.readdirSync(dirPath);
        logger.info(`[插件]开始加载插件...`);
        let allPuglinData = dirs.map((dir) => {
            let pluginConfigPath = path.resolve(dirPath, dir, "./config.json");
            // logger.info(`[插件]正在加载插件-->${dir}`);
            //检查文件是否存在
            if (!fs.existsSync(pluginConfigPath)) {
                logger.error(`插件${dir}缺少config.json文件`);
                return;
            }
            let pluginConfigFile = fs.readFileSync(pluginConfigPath, "utf-8");
            let pluginConfig = {};
            try {
                pluginConfig = JSON.parse(pluginConfigFile);
            } catch (error) {
                logger.error(`插件${dir}的配置文件格式错误`);
                return;
            }
            //检查入口文件是否存在
            let entryFile = path.resolve(dirPath, dir, "./index");
            if (
                !fs.existsSync(entryFile + ".js") &&
                !fs.existsSync(entryFile + ".ts")
            ) {
                logger.error(`插件${dir}的入口文件不存在`);
                return;
            } else {
                //开始加载插件
                let args: pluginArgs = {
                    api: this.api as api,
                    on: this.on,
                    bot: this,
                };
                let thisPlugin = new Plugin(path.resolve(dirPath, dir), {
                    args: args,
                });
                if (thisPlugin.config?.switch) {
                    return thisPlugin;
                }
                return null;
            }
        });
        allPuglinData = allPuglinData?.filter((item) => {
            return item && item?.pluginModule?.default;
        });
        logger.info(`[插件]加载插件完成,成功加载${allPuglinData.length}个插件`);
        this.plugins = allPuglinData as Plugin[];
    };

    //连接时触发
    onOpen = async () => {
        logger.info("成功连接到服务器。");
        this.state = 2;

        //加载插件
        this.loadPlugin();
    };

    //收到消息时触发
    onMessage = async (dataBaffle: Buffer) => {
        let data: any = {};
        try {
            data = JSON.parse(dataBaffle.toString());
            if (this.config.serverOriginData) {
                logger.info("[接收]服务端返回数据:" + dataBaffle.toString());
            }
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
                // logger.info(`[心跳]${"♥".red}`);
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
                this.submitListenFn<outputData.groupData>(
                    "message_sent.group",
                    data
                );
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

    //处理消息数据
    private handlerData = <T>(name: string, data: any) => {
        let handleMap = {};
        switch (name) {
            case "message.group":
                //群聊消息
                return {
                    self_id: data?.self_id,
                    time: data?.time,
                    message_id: data?.message_id,
                    user_id: data?.user_id,
                    nickname: data?.nickname,
                    card: data?.card,
                    role: data?.role,
                    raw_message: data?.raw_message,
                    group_id: data?.group_id,
                    message: data?.message,
                } as T;

            case "message.private":
                //群聊消息
                return {
                    self_id: data?.self_id,
                    time: data?.time,
                    message_id: data?.message_id,
                    user_id: data?.user_id,
                    nickname: data?.nickname,
                    card: data?.card,
                    role: data?.role,
                    raw_message: data?.raw_message,
                    group_id: data?.group_id,
                    message: data?.message,
                } as T;

                break;

            default:
                break;
        }
        return {};
    };
}
export const bot = new CoreClient();
export const apis = bot.api;
export default CoreClient;
