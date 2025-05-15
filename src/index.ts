import ReadLine from "readline";
import fs from "fs";
import path from "path";
import { bot } from "@/core/core_client";
import type config from "@/types/config";
import checkServiceContent from "./services/checkServiceContent";
import { checkServiceContentResponse } from "./services/checkServiceContentType";
import { logger } from "./utils/logger";

const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = async () => {
    logger?.info("欢迎使用小鳄鱼QQ机器人");
    checkDatas();
    let config: Partial<config> = {};
    //检查config目录
    if (!fs.existsSync(path.resolve(__dirname, "./config"))) {
        fs.mkdirSync(path.resolve(__dirname, "./config"));
    }
    //检查config文件是否存在
    if (!fs.existsSync(path.resolve(__dirname, "./config/config.json"))) {
        config = await prompt();
        let checkRes: Partial<checkServiceContentResponse> = {};
        //检查服务端是否能够连接
        checkRes = await checkServiceContent(config);
        while (checkRes?.status !== 1) {
            logger.error(checkRes?.message ?? "请检查服务端配置是否正确");
            config = await prompt();
            checkRes = await checkServiceContent(config);
        }
        logger.info(checkRes?.message ?? "服务器检测通过");
        //写入到配置文件
        fs.writeFileSync(
            path.resolve(__dirname, "./config/config.json"),
            JSON.stringify(config, null, 4)
        );
    } else {
        //查询config文件
        let json = fs.readFileSync(
            path.resolve(__dirname, "./config/config.json"),
            "utf-8"
        );
        config = JSON.parse(json);
    }
    logger.info("读取IP为:" + config?.ip);

    bot.connect(config as config);

    //用户输入
    userCommand();
};

//检查并创建datas目录
const checkDatas = () => {
    if (!fs.existsSync(path.resolve(__dirname, "./datas"))) {
        logger.info("未找到datas目录，创建datas目录");
        fs.mkdirSync(path.resolve(__dirname, "./datas"));
    }
};

//提示用户输入配置信息
const prompt = async (): Promise<Partial<config>> => {
    let config: Partial<config> = {};
    await new Promise((resolve) => {
        rl.question(`[服务器]请输入ip：`, (ip) => {
            config.ip = ip;
            resolve(config);
        });
    });
    await new Promise((resolve) => {
        rl.question(`[服务器]请输入端口：`, (port) => {
            config.port = parseInt(port);
            resolve(config);
        });
    });
    await new Promise((resolve) => {
        rl.question(`[服务器]请输入token：`, (token) => {
            config.token = token;
            resolve(config);
        });
    });

    return config;
};

//用户输入命令
const userCommand = async () => {
    rl.question(``, async (cmd) => {
        await handleCommand(cmd);
        userCommand();
    });
};

//处理用户输入的命令
const handleCommand = async (command: string) => {
    if (!command.startsWith("/")) return "";
    command = command.slice(1);
    let cmdArr: string[] = command.split(" ");
    let arg: string[] = cmdArr.slice(1);
    switch (cmdArr?.[0]) {
        case "help":
            logger.info("帮助");
            break;
        case "exit":
            logger.info("退出");
            process.exit(0);
        case "reload":
            bot.loadPlugin();
            break;
        case "serverOriginData":
            if (arg?.[0] === "true") {
                bot.changeConfig({ serverOriginData: true });
                logger.info("开启服务端数据源");
                return;
            }
            if (arg?.[0] === "false") {
                bot.changeConfig({ serverOriginData: false });
                logger.info("关闭服务端数据源");
                return;
            }

        default:
            logger.info("未知命令");
            break;
    }
};

main();
