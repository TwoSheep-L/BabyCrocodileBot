# 说明

一款对接 NapCat 机器人的 nodejs 快速开发框架
一边学习一边制作的框架，还有很多不足之处

# babyCrocodileBot

BabyCrocodileBot 是一个模块化的 Node.js 应用程序，设计用于通过 NapCat 机器人系统与 QQ 消息平台进行交互。该项目采用插件式架构，允许在保持核心系统稳定的同时实现功能扩展。

# 项目简介

BabyCrocodileBot 是一个 Node.js 插件终端，用于连接 NapCat 机器人，实现与 QQ 消息平台的交互。项目采用模块化、基于插件的架构设计，既保证了系统核心的稳定性，又提供了良好的扩展性

# 功能完成列表

| 功能名     | 功能描述                                          | 状态 |
| ---------- | ------------------------------------------------- | ---- |
| 机器人集群 | 一次对接多个机器人，进行中央管理                  | ×    |
| 数据解析器 | 处理每一种上报数据交给插件                        | ×    |
| 插件沙箱   | 沙箱环境执行插件避免影响主进程                    | ×    |
| 历史数据   | 存入 Level 数据库存入历史数据，提供给插件用于撤回 | ×    |
| logger     | 重新搞一个日志系统，自己写的只是临时使用          | ×    |
| 插件打包   | 方便进行多文件插件迁移                            | ×    |

# 可用脚本

-   `npm run dev`: 启动开发模式，用于调试和开发(启动也用这个吧)
-   `npm run build`: 构建项目，用于生产环境 - 还没做
-   `npm run createPlugin`: 创建插件 用于插件开发

## 开源协议 (License)

本项目采用 [MIT License](LICENSE)，**仅通过 API/服务调用方式**与 [NapCatQQ](https://github.com/NapNeko/NapCatQQ) 交互，不包含其代码或衍生作品。  
对方项目的许可约束请参考其仓库的 [License 文件](https://github.com/NapNeko/NapCatQQ/blob/main/LICENSE)。

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/TwoSheep-L/BabyCrocodileBot)
