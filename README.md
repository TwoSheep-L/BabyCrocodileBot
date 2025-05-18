# 说明

一款对接 NapCat 机器人的 nodejs 快速开发框架

# babyCrocodileBot

BabyCrocodileBot 是一个模块化的 Node.js 应用程序，设计用于通过 NapCat 机器人系统与 QQ 消息平台进行交互。该项目采用插件式架构，允许在保持核心系统稳定的同时实现功能扩展。

# 项目简介

BabyCrocodileBot 是一个 Node.js 插件终端，用于连接 NapCat 机器人，实现与 QQ 消息平台的交互。项目采用模块化、基于插件的架构设计，既保证了系统核心的稳定性，又提供了良好的扩展性

# 可用脚本

-   `npm run dev`: 启动开发模式，用于调试和开发
-   `npm run build`: 构建项目，用于生产环境
-   `npm run createPlugin`: 创建插件 用于插件开发

## 开源协议 (License)

本项目采用 [MIT License](LICENSE)，**仅通过 API/服务调用方式**与 [NapCatQQ](https://github.com/NapNeko/NapCatQQ) 交互，不包含其代码或衍生作品。  
对方项目的许可约束请参考其仓库的 [License 文件](https://github.com/NapNeko/NapCatQQ/blob/main/LICENSE)。
