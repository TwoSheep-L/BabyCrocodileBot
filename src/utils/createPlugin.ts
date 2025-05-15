let path = require("path");
let fs = require("fs");
let ReadLiner = require("readline");

let defaultIndex = `import CoreClient from "@/core/core_client";
import { api, apiResult, botMessage, outputData } from "@/types";
import { logger } from "@/utils/logger";
import {
  cq_at,
  cq_dice,
  cq_music,
  cq_reply,
  cq_rps,
  cq_text,
} from "@/core/core_CQ";

export default async ({ bot, api }: { bot: CoreClient; api: api }) => {
  bot.on("meta_event.heartbeat", async (data: any) => {
    //生命周期 - 心跳事件
    // console.log("心跳");
  });

  bot.on("message.private", async (msg: outputData.groupData, data: any) => {
    //私聊消息
    console.log("收到私聊消息", msg);
  });

  bot.on("message.group", async (msg: outputData.groupData, data: any) => {
    //群消息
    console.log("收到群消息", msg);
  });

  bot.on("request.friend", async (data: any) => {
    //好友添加请求
    // api.set_friend_add_request({ flag: data.flag, approve: true }); //同意
    // api.set_friend_add_request({ flag: data.flag, approve: false,remark: "拒绝理由" }); //拒绝
  });

  bot.on("request.group.add", async (data: any) => {
    //加群请求
    // api.set_group_add_request({ flag: data.flag, sub_type: "invite", approve: true }); //同意邀请
    // api.set_group_add_request({ flag: data.flag, sub_type: "request", approve: false,reason: "拒绝理由" }); //拒绝入群
  });

  //更多事件查看 https://napcat.napneko.icu/develop/event
  //所有api请求 https://napcat.apifox.cn/226656932e0
};
`;

let pluginPath = path.join(__dirname, "../plugins");
if (!fs.existsSync(pluginPath)) {
    fs.mkdirSync(pluginPath);
    console.log("create dir /plugins");
}

const rl = ReadLiner.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("请输入插件名称：", (name: string) => {
    let pluginName = name;
    let filePath = path.join(pluginPath, pluginName);
    //检查是否存在
    if (fs.existsSync(filePath)) {
        console.log(`插件 ${pluginName} 已存在`);
        rl.close();
        return;
    }
    fs.mkdirSync(filePath);

    let defaultConfig = {
        switch: true, //插件开关
        path: "", //插件路径
        name: "", //插件名称
        version: "1.0.0", //插件版本
        description: "这是一个插件描述", //插件描述
        author: "作者名字", //插件作者
        dependencies: [], //插件依赖
        command: [], //插件指令
        event: [], //插件事件
        weight: 0, //插件权重
    };

    defaultConfig.path = pluginName;
    defaultConfig.name = name;
    fs.writeFileSync(
        path.join(filePath, "config.json"),
        JSON.stringify(defaultConfig, null, 2)
    );
    console.log(`create file ${path.join(filePath, "config.json")}`);
    fs.writeFileSync(path.join(filePath, "index.ts"), defaultIndex);
    console.log(`create file ${path.join(filePath, "index.ts")}`);

    console.log(`插件 ${pluginName} 插件创建完成`);

    rl.close();
});
