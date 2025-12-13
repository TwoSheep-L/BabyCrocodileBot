import { logger } from "@/utils/logger";

export default class BotError {
    constructor(
        public type: "plugin" | "core",
        public message: string,
        public code?: number
    ) {
        //后期做报错统一处理和拓展
        logger.error(`${this.type}: ${this.message}`);
    }

    toString() {
        return `${this.type}: ${this.message}`;
    }

    toJSON() {
        return {
            type: this.type,
            message: this.message,
            code: this.code,
        };
    }
}
