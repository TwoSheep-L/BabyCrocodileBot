import { WebSocket } from "ws";
import CatBot from "./core_catbot";
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
import { pluginArgs, pluginConfig } from "@/types/core_pulgin";
import HistoryMsg from "./core_historyMsg";
import handlerData from "./core_handler";
import BotError from "./core.error";

class CoreClient {
    public state: number = 0; //状态 0:未连接 1:连接中 2:已连接
    public botServer: CatBot | undefined;
    public api: api | undefined;
    public events: string[] = [];
    public config: changeConfigParams = { serverOriginData: true };
    public plugins: Plugin[] = [];
    public HistoryMsg!: HistoryMsg;
    public context: any = {};

    //消息监听执行函数
    public msgEvents: any = {};

    // 对外暴露的on方法
    public on!: (
        event: string,
        fn: Function,
        pluginConfig?: pluginConfig
    ) => string | undefined;

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
        this.HistoryMsg = HistoryMsg.create(
            path.resolve(__dirname, "../datas")
        );

        // 核心：实现on方法，支持显式传入插件配置
        this.on = (
            event: string,
            fn: Function,
            pluginConfig?: pluginConfig
        ) => {
            if (this.events.includes(event)) {
                if (!this.msgEvents?.[event]) {
                    this.msgEvents[event] = [];
                }
                let fnConfig = {
                    event,
                    fn,
                    id: v4(),
                    pluginConfig: pluginConfig || { name: "未知插件" }, // 存储插件配置
                };
                this.msgEvents[event].push(fnConfig);
                return fnConfig.id;
            } else {
                logger.error(`[错误]事件${event}不存在`);
                return undefined;
            }
        };
    }

    //修改配置项
    changeConfig(config: changeConfigParams) {
        if (config.serverOriginData !== undefined) {
            this.config.serverOriginData = config.serverOriginData;
        }
    }

    //连接服务端
    connect = async (data: NapCatConfig) => {
        this.botServer = new CatBot({
            ip: data.ip,
            port: data.port,
            token: data.token,
            client: this,
        });
        this.bind();
    };

    //绑定
    bind = async () => {
        if (this.botServer) {
            this.state = 1; // 绑定中状态
            this.ws = this.botServer.ws;
            this.onListen();
            this.api = core_apis(this.ws);
        }
    };

    //开始监听
    onListen = () => {
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
        let pluginData = <T>handlerData(event, data);
        if (Array.isArray(this.msgEvents?.[event])) {
            let fnList = this.msgEvents?.[event];
            fnList.forEach((fnConfig) => {
                if (typeof fnConfig.fn === "function") {
                    try {
                        fnConfig.fn(pluginData || data, data);
                        // 日志打印插件信息
                        logger.info(
                            colors.green(
                                `[事件执行] 插件：${
                                    fnConfig.pluginConfig?.name || "未知"
                                } | 事件：${event}`
                            )
                        );
                    } catch (error) {
                        // 错误时能定位到具体插件
                        new BotError(
                            "plugin",
                            `插件【${
                                fnConfig.pluginConfig?.name || fnConfig.id
                            }】执行事件${event}出错：${error}`
                        );
                    }
                }
            });
        }
    };

    //加载插件
    loadPlugin = async () => {
        this.plugins = [];
        this.msgEvents = {};
        let dirPath = path.resolve(__dirname, "../plugins");

        //检测文件是否存在
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            logger.info(`[插件]创建插件目录成功: ${dirPath}`);
            return;
        }

        let dirs = fs.readdirSync(dirPath);
        logger.info(`[插件]开始加载插件... 共发现 ${dirs.length} 个插件目录`);

        for (const dir of dirs) {
            try {
                // 跳过隐藏文件/非目录
                const pluginFullPath = path.resolve(dirPath, dir);
                const stat = fs.statSync(pluginFullPath);
                if (!stat.isDirectory()) {
                    logger.warn(`[插件] ${dir} 不是目录，跳过加载`);
                    continue;
                }

                //获取插件配置
                let pluginConfig = Plugin.getPluginConfig(
                    path.resolve(process.cwd(), "./src/plugins/", dir)
                );

                if (!pluginConfig) {
                    logger.warn(`[插件] ${dir} 配置文件不存在，跳过加载`);
                    continue;
                }

                if (!pluginConfig?.switch) {
                    logger.warn(`[插件] ${dir} 插件未开启，跳过加载`);
                    continue;
                }

                const pluginOn = (event: string, fn: Function) => {
                    return this.on(event, fn, { ...pluginConfig });
                };

                const pluginBot = {
                    ...this, // 继承原bot的所有属性和方法
                    on: pluginOn, // 重写on方法，绑定当前插件配置
                };

                const args: pluginArgs = {
                    api: this.api as api,
                    bot: pluginBot, // 传递重写on方法后的bot实例
                };

                let plugin = new Plugin(pluginFullPath, {
                    args: args,
                });

                // 等待插件加载完成
                await new Promise((resolve, reject) => {
                    const timer = setInterval(() => {
                        if (plugin.loadState === 1) {
                            clearInterval(timer);
                            resolve(plugin);
                        } else if (
                            plugin.loadState === -1 ||
                            plugin.loadState === 2
                        ) {
                            clearInterval(timer);
                            reject(
                                new Error(`加载失败，状态码${plugin.loadState}`)
                            );
                        }
                    }, 500);

                    // 超时处理（5秒）
                    setTimeout(() => {
                        clearInterval(timer);
                        reject(new Error("加载超时（5秒）"));
                    }, 5000);
                });

                // logger.info(`[插件] ${pluginConfig.name || dir} 加载成功`);
                this.plugins.push(plugin);
            } catch (error) {
                logger.error(`[插件] ${dir} 加载失败:`, error);
                continue;
            }
        }

        logger.info(
            `[插件]加载插件完成,成功加载${this.plugins.length}个插件（总${dirs.length}个）`
        );
    };

    //连接时触发
    onOpen = async () => {
        logger.info("成功连接到服务器。");
        this.state = 2;

        //加载插件
        await this.loadPlugin();
    };

    //收到消息时触发
    onMessage = async (dataBaffle: Buffer) => {
        let data: any = {};
        try {
            data = JSON.parse(dataBaffle.toString());
            if (this.config.serverOriginData) {
                logger.info("[接收]服务端返回数据:" + dataBaffle.toString());
            }
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
                this.submitListenFn("meta_event.heartbeat", data);
            }
        }

        if (data?.post_type === "message") {
            //收到消息
            if (data?.message_type === "group") {
                //收到群消息
                this.submitListenFn("message.group", data);
                this.HistoryMsg.putMessage(data);
            }
            if (data?.message_type === "private") {
                //收到私聊消息
                this.submitListenFn("message.private", data);
                this.HistoryMsg.putMessage(data);
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
                this.submitListenFn("notice.friend_add", data);
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
        logger.info("WebSocket连接已关闭");
        this.state = 0;
        this.ws?.close();
    };

    //错误时触发
    onError = (err: Error) => {
        logger.error("WebSocket error:" + err.message);
        this.state = 0;
    };
}

export const bot = new CoreClient();
export const apis = bot.api;
export const getApis = () => bot.api;
export default CoreClient;
