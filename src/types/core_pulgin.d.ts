import CoreClient from "@/core/core_client";
import { api } from "./core_apis";

export interface pluginConfig {
    path?: string; //插件路径
    name?: string; //插件名称
    version?: string; //插件版本
    description?: string; //插件描述
    author?: string; //插件作者
    dependencies?: string[]; //插件依赖
    command?: string[]; //插件指令
    event?: string[]; //插件事件
    weight?: number; //插件权重
    switch?: boolean; //插件开关
}

export interface plugin {
    onGroupMessage(message: any): void;
}

export interface pluginModule {
    [key: string, value: any];
    default: Function;
}

export interface pluginArgs {
    [key: string, value: any];
    api: api;
    on: Function;
    bot: CoreClient;
}
