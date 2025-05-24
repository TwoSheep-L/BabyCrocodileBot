import { Level } from "level";
import path from "path";
import fs from "fs";
import { botMessage } from "@/types";
import { logger } from "@/utils/logger";

export default class HistoryMsg {
    private static instance: HistoryMsg;

    public readonly dbPath: string;
    public readonly dbFileName: string;
    public readonly historyDb: Level;

    private constructor(
        dbPath: string,
        dbFileName: string = "/historyMsg_db.db"
    ) {
        this.dbPath = dbPath;
        this.dbFileName = dbFileName;

        // 检测目录是否存在
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath, { recursive: true });
        }

        // 初始化Level数据库实例
        this.historyDb = new Level(
            path.join(dbPath, dbFileName), // 修正了原代码中的字符串错误
            { valueEncoding: "json" }
        );

        this.historyDb.open();
    }

    async open() {
        await this.historyDb.open();
    }

    //存入数据
    async putMessage(message: botMessage) {
        try {
            //批量
            const batch = this.historyDb.batch();
            const msgId: string = message.message_id + "";
            const suffix = message.group_id ? "group" : "private";
            const isGroup = message.group_id ? true : false;
            //存入数据  id=>message
            batch.put(`msg:${msgId}:${suffix}`, JSON.stringify(message));
            //索引 user_id=>id
            batch.put(`msgid_user:${message.user_id}`, msgId);
            //索引 time=>id
            batch.put(`msgid_time:${message.time}`, msgId);
            //索引 botId=>id
            batch.put(`msgid_bot:${message.self_id}`, msgId);
            if (isGroup) {
                //群聊数据索引
                const ids = await this.historyDb.get(
                    `msgid_group:${message.group_id}`
                );
                const idsArr = JSON.parse(ids || "[]");
                idsArr.push(`${msgId}_${message.time}_${message.user_id}`);
                batch.put(
                    `msgid_group:${message.group_id}`,
                    JSON.stringify(idsArr)
                );
            }

            batch.write(); //写入
        } catch {
            logger.error("数据库写入错误");
        }
    }

    // 获取实例
    public static create(
        dbPath: string,
        dbFileName: string = "/historyMsg_db.db"
    ): HistoryMsg {
        if (!HistoryMsg.instance) {
            if (!dbPath) {
                throw new Error("初始化需要dbPath参数");
            }
            HistoryMsg.instance = new HistoryMsg(dbPath, dbFileName);
        } else if (
            dbPath &&
            (dbPath !== HistoryMsg.instance.dbPath ||
                dbFileName !== HistoryMsg.instance.dbFileName)
        ) {
            throw new Error("Singleton实例已用不同的参数初始化");
        }

        return HistoryMsg.instance;
    }
}
