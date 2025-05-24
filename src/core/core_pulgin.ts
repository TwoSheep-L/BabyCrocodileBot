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
    public loadState: number = 0; // 加载状态 -1加载失败 0未加载 1加载成功 2插件未开启
    public loaded: boolean = false; // 加载结束
    public pluginModule: pluginModule = { default: () => {} };
    public entry: string = "";

    constructor(pluginPath: string, { args }: { args: pluginArgs }) {
        this.loadPlugin(pluginPath, args);
    }

    //加载插件
    async loadPlugin(pluginPath: string, args: pluginArgs) {
        this.config.path = pluginPath;

        //目录名字 取最后一个
        // let dirName: string = pluginPath?.split("/").pop(); // 插件目录名
        const checkRes = this.checkPlugin(pluginPath); // 检查插件
        if (checkRes) {
        }
        //插件config目录
        let pluginConfigPath: string = path.resolve(
            pluginPath,
            "./config.json"
        );
        let pluginConfigFile = fs.readFileSync(pluginConfigPath, "utf-8");
        let pluginConfig = JSON.parse(pluginConfigFile);

        // 配置赋值
        this.config = {
            ...this.config,
            ...pluginConfig,
            path: this.config.path,
        };

        //如果插件未开启，则返回空
        if (!this.config.switch) {
            this.loadState = -2; //插件未开启
            return;
        }

        try {
            this.pluginModule = await import(this.entry); // 使用正确的URL导入
        } catch (error) {
            logger.error(`[插件]${this.config.name} 的入口文件加载失败。`);
            console.error(error);
            this.loadState = -1; //加载失败
            return;
        }

        //检查导出
        if (!this.pluginModule?.default) {
            logger.error(
                `[插件]${this.config.name} 的入口文件导出错误，未找到default导出`
            );
            this.loadState = -1; //加载失败
            return;
        }
        if (typeof this.pluginModule?.default !== "function") {
            logger.error(
                `[插件]${this.config.name} 的入口文件导出错误，default导出必须是函数`
            );
            return;
        }

        logger.info(
            `[插件]${this.config.name} 加载成功 版本:${this.config.version} 作者:${this.config.author} 描述:${this.config.description}`
        );
        //执行插件主函数 传入args  -- 未来改成context
        this.pluginModule.default(args);
    }

    //检查插件文件完整
    checkPlugin(pluginPath: string): Boolean {
        //目录名字 取最后一个
        let dirName = pluginPath?.split("/").pop();

        let pluginConfigPath = path.resolve(pluginPath, "./config.json");

        //检查config文件是否存在
        if (!fs.existsSync(pluginConfigPath)) {
            logger.error(`插件${dirName}缺少config.json文件`);
            this.loadState = -1; //加载失败
            return false;
        }
        let pluginConfigFile = fs.readFileSync(pluginConfigPath, "utf-8");
        try {
            JSON.parse(pluginConfigFile);
        } catch (error) {
            logger.error(`插件${dirName}的配置文件格式错误`);
            this.loadState = -1; //加载失败
            return false;
        }

        // 确定入口文件路径（index.js 或 index.ts）
        const jsEntry = path.resolve(pluginPath, "index.js");
        const tsEntry = path.resolve(pluginPath, "index.ts");

        if (fs.existsSync(jsEntry)) {
            this.entry = jsEntry;
            return true;
        } else if (fs.existsSync(tsEntry)) {
            //检测通过
            this.entry = tsEntry;
            this.loadState = 1;
            return true;
        } else {
            this.loadState = -1; //加载失败
            this.loaded = true;
            logger.error(`插件${dirName}缺少入口文件`);
            return false;
        }
    }
}
