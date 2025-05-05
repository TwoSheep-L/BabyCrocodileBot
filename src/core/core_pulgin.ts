import { pluginConfig } from "@/types/core_pulgin";
import { logger } from "@/utils/logger";
import fs from "fs";
import path from "path";

export class plugin implements pluginConfig {
    public path: string; //插件路径
    public name: string; //插件名称
    public version: string; //插件版本
    public description: string; //插件描述
    public author: string; //插件作者
    public dependencies: string[]; //插件依赖
    public command: string[]; //插件指令
    public event: string[]; //插件事件
    public weight: number; //插件权重

    constructor(pluginPath: string) {
        this.path = pluginPath;
        //检查路径是否存在
        if (!fs.existsSync(path.resolve(this.path))) {
            fs.mkdirSync(path.resolve(this.path));
        }
        //检查路径中是否存在index.js/ts 和config.json
        if (
            !fs.existsSync(path.resolve(this.path, "index.js")) &&
            !fs.existsSync(path.resolve(this.path, "index.ts"))
        ) {
            throw new Error("插件目录下未找到index.js/ts文件");
        }
        if (!fs.existsSync(path.resolve(this.path, "config.json"))) {
            throw new Error("插件目录下未找到config.json文件");
        }

        let configString = fs.readFileSync(
            path.resolve(this.path, "config.json"),
            "utf-8"
        );
        let configObj: Partial<pluginConfig> = {};
        try {
            configObj = JSON.parse(configString);
        } catch (error) {
            throw new Error("插件配置文件config.json格式错误");
        }

        this.name = configObj.name ?? "未命名插件";
        this.version = configObj.version ?? "1.0.0";
        this.description = configObj.description ?? "未描述插件";
        this.author = configObj.author ?? "未命名作者";
        this.dependencies = configObj.dependencies ?? [];
        this.command = configObj.command ?? [];
        this.event = configObj.event ?? [];
        this.weight = configObj.weight ?? 0;
        logger.info(
            `[插件]${this.name}插件加载成功 版本:${this.version} 作者:${this.author}`
        );
    }

    // public getConfig() {
    //     return this.config;
    // }

    // public getPath() {
    //     return this.path;
    // }

    // public getName() {
    //     return this.name;
    // }
}
