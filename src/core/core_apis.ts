import { Message } from "@/types/core_client";
import { WebSocket } from "ws";
import { api, APIS } from "@/types/core_apis";
const { v4: uuidv4 } = require("uuid");

export default (outWs: WebSocket): api => {
    const ws = outWs;

    const sendData = async <T>(
        action: string,
        params: object = {},
        timeout: number = 10000
    ): Promise<T> => {
        const id = uuidv4();
        const resultPromise = new Promise((resolve, reject) => {
            let timer = setTimeout(() => {
                reject({ message: "请求超时", status: 0 });
            }, timeout);

            const listener = (data: any) => {
                try {
                    const objData = JSON.parse(data.toString());
                    if (objData?.echo === id) {
                        clearTimeout(timer);
                        ws.off("message", listener);
                        resolve(objData?.data || objData);
                    }
                } catch (error) {
                    clearTimeout(timer);
                    ws.off("message", listener);
                    resolve(data);
                }
            };
            ws.on("message", listener);
        });

        ws.send(JSON.stringify({ action, params, echo: id }));
        return (await resultPromise) as T;
    };

    return {
        send_group_msg: async (group_id: string, message: Message[]) => {
            const newMessage = message.map((item) =>
                typeof item === "string"
                    ? { type: "text", data: { text: item } }
                    : item
            );
            return sendData("send_group_msg", {
                group_id,
                message: newMessage,
            });
        },

        set_group_remark: async (group_id: string, remark: string) => {
            return sendData("set_group_remark", { group_id, remark });
        },

        set_group_kick: async (
            group_id: string,
            user_id: string,
            reject_add_request: boolean
        ) => {
            return sendData("set_group_kick", {
                group_id,
                user_id,
                reject_add_request,
            });
        },

        set_group_ban: async (
            group_id: string,
            user_id: string,
            duration: number
        ) => {
            return sendData("set_group_ban", { group_id, user_id, duration });
        },

        set_group_whole_ban: async (group_id: string, enable: boolean) => {
            return sendData("set_group_whole_ban", { group_id, enable });
        },

        set_group_admin: async (
            group_id: string,
            user_id: string,
            enable: boolean
        ) => {
            return sendData("set_group_admin", { group_id, user_id, enable });
        },

        set_group_card: async (
            group_id: string,
            user_id: string,
            card: string = ""
        ) => {
            return sendData("set_group_card", { group_id, user_id, card });
        },

        set_group_name: async (group_id: string, group_name: string) => {
            return sendData("set_group_name", { group_id, group_name });
        },

        set_group_leave: async (
            group_id: string,
            is_dismiss: boolean = false
        ) => {
            return sendData("set_group_leave", { group_id, is_dismiss });
        },

        set_essence_msg: async (message_id: string) => {
            return sendData("set_essence_msg", { message_id });
        },

        delete_essence_msg: async (message_id: string) => {
            return sendData("delete_essence_msg", { message_id });
        },

        get_essence_msg_list: async (group_id: string) => {
            return sendData("get_essence_msg_list", { group_id });
        },

        set_group_add_request: async (
            flag: string,
            approve: boolean,
            reason?: string
        ) => {
            if (!approve && !reason) {
                throw new Error("拒绝加群请求时必须提供理由");
            }
            return sendData("set_group_add_request", { flag, approve, reason });
        },

        get_group_list: async (no_cache: boolean = false) => {
            return sendData("get_group_list", { no_cache });
        },

        get_group_member_info: async (
            group_id: string,
            user_id: string,
            no_cache: boolean = false
        ) => {
            return sendData("get_group_member_info", {
                group_id,
                user_id,
                no_cache,
            });
        },

        get_group_member_list: async (
            group_id: string,
            no_cache: boolean = false
        ) => {
            return sendData("get_group_member_list", { group_id, no_cache });
        },

        get_group_system_msg: async () => {
            return sendData("get_group_system_msg", {});
        },

        get_group_shut_list: async (group_id: string) => {
            return sendData("get_group_shut_list", { group_id });
        },

        set_group_portrait: async (group_id: string, file: string) => {
            return sendData("set_group_portrait", { group_id, file });
        },

        set_friend_add_request: async (
            flag: string,
            approve: boolean,
            remark: string
        ) => {
            if (approve && !remark) {
                throw new Error("同意好友请求时必须填写备注");
            }
            return sendData("set_friend_add_request", {
                flag,
                approve,
                remark,
            });
        },

        get_login_info: async () => {
            return sendData("get_login_info", {});
        },

        get_stranger_info: async (
            user_id: string
        ): Promise<APIS.get_stranger_info_result> => {
            return sendData("get_stranger_info", { user_id });
        },

        get_friend_list: async (no_cache: boolean = false) => {
            return sendData("get_friend_list", { no_cache });
        },

        delete_friend: async (
            user_id: string,
            temp_block: boolean,
            temp_both_del: boolean
        ) => {
            return sendData("delete_friend", {
                user_id,
                temp_block,
                temp_both_del,
            });
        },

        nc_get_user_status: async (user_id: string) => {
            return sendData("nc_get_user_status", { user_id });
        },

        set_doubt_friends_add_request: async (flag: string) => {
            return sendData("set_doubt_friends_add_request", {
                flag,
                approve: true,
            });
        },

        send_poke: async (user_id: string, group_id?: string) => {
            return sendData("send_poke", {
                user_id,
                ...(group_id && { group_id }),
            });
        },

        set_qq_profile: async (
            nickname: string,
            personal_note?: string,
            sex?: string
        ) => {
            return sendData("set_qq_profile", { nickname, personal_note, sex });
        },

        delete_msg: async (message_id: string) => {
            return sendData("delete_msg", { message_id });
        },

        ocr_image: async (image: string) => {
            return sendData("ocr_image", { image });
        },

        translate_en2zh: async (words: string[]) => {
            return sendData("translate_en2zh", { words });
        },
    };
};
