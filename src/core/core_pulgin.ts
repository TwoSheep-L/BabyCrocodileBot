import { pluginArgs, pluginConfig, pluginModule } from "@/types/core_pulgin";
import { logger } from "@/utils/logger";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url"; // 导入pathToFileURL

export class Plugin {
    public config: pluginConfig = {
        path: "",
        name: "",
        version: "",
        description: "",
        author: "匿名作者",
        dependencies: [],
        command: [],
        event: [],
    };
    public pluginModule: pluginModule = { default: () => {} };

    constructor(pluginPath: string, { args }: { args: pluginArgs }) {
        this.loadPlugin(pluginPath, args);
    }

    async loadPlugin(pluginPath: string, args: pluginArgs) {
        this.config.path = pluginPath;
        if (!fs.existsSync(path.resolve(this.config.path))) {
            fs.mkdirSync(path.resolve(this.config.path));
        }

        // 确定入口文件路径（index.js 或 index.ts）
        const jsEntry = path.resolve(this.config.path, "index.js");
        const tsEntry = path.resolve(this.config.path, "index.ts");
        let entryFile: string;

        if (fs.existsSync(jsEntry)) {
            entryFile = jsEntry;
        } else if (fs.existsSync(tsEntry)) {
            entryFile = tsEntry;
        } else {
            throw new Error("插件目录下未找到index.js/ts文件");
        }

        // 检查config.json
        const configPath = path.resolve(this.config.path, "config.json");
        if (!fs.existsSync(configPath)) {
            throw new Error("插件目录下未找到config.json文件");
        }

        // 读取配置
        let configString = fs.readFileSync(configPath, "utf-8");
        let configObj: Partial<pluginConfig>;
        try {
            configObj = JSON.parse(configString);
        } catch (error) {
            throw new Error("插件配置文件config.json格式错误");
        }

        // 配置赋值
        this.config = {
            ...this.config,
            ...configObj,
            path: this.config.path,
        };

        // 转换为file:// URL
        try {
            this.pluginModule = await import(entryFile); // 使用正确的URL导入
        } catch (error) {
            logger.error(`[插件]${this.config.name} 的入口文件加载失败。`);
            console.error(error);
            return;
        }

        //检查导出
        if (!this.pluginModule?.default) {
            logger.error(
                `[插件]${this.config.name} 的入口文件导出错误，未找到default导出`
            );
            return;
        }
        if (typeof this.pluginModule?.default !== "function") {
            logger.error(
                `[插件]${this.config.name} 的入口文件导出错误，default导出必须是函数`
            );
            return;
        }

        logger.info(
            `[插件]${this.config.name} 加载成功 版本:${this.config.version} 作者:${this.config.author}`
        );
        this.pluginModule.default(args);
    }
}
