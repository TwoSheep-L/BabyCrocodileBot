import { WebSocket } from "ws";
import { Message } from "@/types/core_client";
import { api, APIS } from "@/types/core_apis";
const { v4: uuidv4 } = require("uuid");

export default (outWs: WebSocket): api => {
    const ws = outWs;

    const require = async <T>(
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
        return (await resultPromise) as Promise<T>;
    };

    return {
        //--------账号相关---------

        /**
         * 设置qq个人资料
         * @param {string} nickname 昵称
         * @param {string} personal_note 个性签名
         * @param {string} sex 性别
         */
        set_qq_profile(nickname, personal_note, sex) {
            return require<APIS.set_qq_profile_result>("set_qq_profile", {
                nickname,
                personal_note,
                sex,
            });
        },

        /**
         * 发送戳一戳 不填写群，则戳一戳私聊
         * @param {number} qq 戳一戳的对象ID
         * @param {number} group_id 戳一戳的群ID
         */
        send_poke(user_id, group_id) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<null>("send_poke", {
                user_id,
                group_id,
            });
        },

        /**
         * 获取在线客户端
         * @returns {string[]} 在线客户端列表
         */
        get_online_clients() {
            return require<string[]>("get_online_clients");
        },

        /**
         * 获取好友列表
         * @returns {APIS.get_friends_with_category} 好友列表
         */
        get_friends_with_category() {
            return require<
                APIS.get_friends_with_category[]
            >("get_friends_with_category");
        },

        /**
         * 发送赞
         * @param {number} user_id 赞的对象ID
         * @param {number} times 发送次数，默认1次，最多28次
         */
        send_like(user_id, times) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<null>("send_like", {
                user_id,
                times,
            });
        },

        /**
         * 处理加好友请求
         * @param {number} flag 请求标识
         * @param {boolean} approve 是否同意添加
         * @param {string} remark 附带的备注信息
         */
        set_friend_add_request(flag, approve, remark) {
            return require<null>("set_friend_add_request", {
                flag: 1,
                approve: 1,
                remark: "",
            });
        },

        /**
         * 获取登录信息
         */
        get_login_info() {
            return require<APIS.get_login_info>("get_login_info");
        },

        /**
         * 获取指定账号信息
         * @param {number} user_id ID
         */
        get_stranger_info(user_id) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<APIS.get_stranger_info>("get_stranger_info", {
                user_id,
            });
        },

        /**
         * 获取好友列表
         * @param {boolean} no_cache 是否不使用缓存 - 默认使用
         */
        get_friend_list(no_cache) {
            return require<APIS.get_friend_list[]>("get_friend_list", {
                no_cache: no_cache ?? true,
            });
        },

        /**
         * 设置所有消息已读
         */
        mark_all_as_read() {
            return require<null>("_mark_all_as_read");
        },

        /**
         * 获取点赞列表
         * @param {number|string} [user_id] 指定用户，不填为获取所有
         * @param {number} [start=0] 起始位置
         * @param {number} [count=10] 获取数量
         */
        get_profile_like(
            user_id?: number | string,
            start: number = 0,
            count: number = 10
        ) {
            const params: any = { start, count };
            if (user_id !== undefined) {
                params.user_id =
                    typeof user_id === "string" ? parseInt(user_id) : user_id;
            }
            return require<APIS.get_profile_like_result>("get_profile_like", params);
        },

        /**
         * 获取收藏表情
         * @param {number} [count=48] 获取数量
         */
        fetch_custom_face(count: number = 48) {
            return require<string[]>("fetch_custom_face", { count });
        },

        /**
         * 删除好友
         * @param {number|string} user_id 用户ID
         * @param {number|string} friend_id 好友ID
         * @param {boolean} temp_block 是否拉黑
         * @param {boolean} temp_both_del 是否双向删除
         */
        delete_friend(
            user_id: number | string,
            friend_id: number | string,
            temp_block: boolean,
            temp_both_del: boolean
        ) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            if (typeof friend_id === "string") friend_id = parseInt(friend_id);
            return require<APIS.delete_friend_result>("delete_friend", {
                user_id,
                friend_id,
                temp_block,
                temp_both_del,
            });
        },

        /**
         * 获取用户状态
         * @param {number|string} user_id 用户ID
         */
        nc_get_user_status(user_id: number | string) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<APIS.nc_get_user_status_result>("nc_get_user_status", {
                user_id,
            });
        },

        /**
         * 获取机器人状态
         */
        get_status() {
            return require<APIS.get_status_result>("get_status");
        },

        /**
         * 发送群消息
         * @param {string | number} group_id 群ID
         * @param {Message[]} message 消息内容
         */
        send_group_msg(group_id: string | number, message: Message[]) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.send_group_msg_result>("send_group_msg", {
                group_id,
                message,
            });
        },

        /**
         * 发送私聊消息
         * @param {string | number} user_id 用户ID
         * @param {Message[]} message 消息内容
         */
        send_private_msg(user_id: string | number, message: Message[]) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<APIS.send_private_msg_result>("send_private_msg", {
                user_id,
                message,
            });
        },

        /**
         * 撤回消息
         * @param {string | number} message_id 消息ID
         */
        delete_msg(message_id: string | number) {
            return require<APIS.delete_msg_result>("delete_msg", {
                message_id,
            });
        },

        /**
         * 获取群历史消息
         * @param {string | number} group_id 群ID
         * @param {string | number} message_seq 消息序号，默认0为最新
         * @param {number} count 获取数量，默认20
         * @param {boolean} reverseOrder 是否倒序，默认true
         */
        get_group_msg_history(
            group_id: string | number,
            message_seq: string | number = 0,
            count: number = 20,
            reverseOrder: boolean = true
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_group_msg_history_result>("get_group_msg_history", {
                group_id,
                message_seq,
                count,
                reverseOrder,
            });
        },

        /**
         * 获取消息详情
         * @param {string | number} message_id 消息ID
         */
        get_msg(message_id: string | number) {
            return require<APIS.get_msg_result>("get_msg", {
                message_id,
            });
        },

        /**
         * 获取语音消息详情
         * @param {string} file 语音文件路径
         * @param {string} file_id 文件ID
         * @param {string} out_format 输出格式，可选mp3, amr, wma, m4a, spx, ogg, wav, flac
         */
        get_record(
            file: string,
            file_id: string,
            out_format:
                | "mp3"
                | "amr"
                | "wma"
                | "m4a"
                | "spx"
                | "ogg"
                | "wav"
                | "flac"
        ) {
            return require<APIS.get_record_result>("get_record", {
                file,
                file_id,
                out_format,
            });
        },

        /**
         * 获取图片消息详情
         * @param {string} file_id 图片文件ID
         */
        get_image(file_id: string) {
            return require<APIS.get_image_result>("get_image", {
                file_id,
            });
        },

        /**
         * 发送群AI语音
         * @param {string | number} group_id 群ID
         * @param {string} character 角色ID
         * @param {string} text 发送的文本内容
         */
        send_group_ai_record(
            group_id: string | number,
            character: string,
            text: string
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.send_group_ai_record_result>("send_group_ai_record", {
                group_id,
                character,
                text,
            });
        },

        //--------群相关---------

        /**
         * 设置群备注
         * @param {string} group_id 群ID
         * @param {string} remark 群备注
         */
        set_group_remark(group_id: string | number, remark: string) {
            return require<null>("set_group_remark", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                remark,
            });
        },

        /**
         * 群踢人
         * @param {string | number} group_id 群ID
         * @param {string | number} user_id 用户ID
         * @param {boolean} reject_add_request 是否拉黑
         */
        set_group_kick(
            group_id: string | number,
            user_id: string | number,
            reject_add_request: boolean
        ) {
            return require<null>("set_group_kick", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                user_id:
                    typeof user_id === "string" ? user_id : user_id.toString(),
                reject_add_request,
            });
        },

        /**
         * 获取群系统消息
         */
        get_group_system_msg() {
            return require<APIS.get_group_system_msg>("get_group_system_msg");
        },

        /**
         * 群禁言
         * @param {string | number} group_id 群ID
         * @param {string | number} user_id 用户ID
         * @param {number} duration 禁言时间（秒）
         */
        set_group_ban(
            group_id: string | number,
            user_id: string | number,
            duration: number
        ) {
            return require<null>("set_group_ban", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                user_id:
                    typeof user_id === "string" ? user_id : user_id.toString(),
                duration,
            });
        },

        /**
         * 全体禁言
         * @param {string | number} group_id 群ID
         * @param {boolean} enable 是否开启
         */
        set_group_whole_ban(group_id: string | number, enable: boolean) {
            return require<null>("set_group_whole_ban", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                enable,
            });
        },

        /**
         * 设置群管理
         * @param {string | number} group_id 群ID
         * @param {string | number} user_id 用户ID
         * @param {boolean} enable 是否设置
         */
        set_group_admin(
            group_id: string | number,
            user_id: string | number,
            enable: boolean
        ) {
            return require<null>("set_group_admin", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                user_id:
                    typeof user_id === "string" ? user_id : user_id.toString(),
                enable,
            });
        },

        /**
         * 设置群头像
         * @param {string | number} group_id 群ID
         * @param {string} file 图片路径
         */
        set_group_portrait(group_id: string | number, file: string) {
            return require<APIS.set_group_portrait_result>("set_group_portrait", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                file,
            });
        },

        /**
         * 设置群成员名片
         * @param {string | number} group_id 群ID
         * @param {string | number} user_id 用户ID
         * @param {string} card 名片内容
         */
        set_group_card(
            group_id: string | number,
            user_id: string | number,
            card: string
        ) {
            return require<null>("set_group_card", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                user_id:
                    typeof user_id === "string" ? user_id : user_id.toString(),
                card,
            });
        },

        /**
         * 设置群名
         * @param {string | number} group_id 群ID
         * @param {string} group_name 群名
         */
        set_group_name(group_id: string | number, group_name: string) {
            return require<null>("set_group_name", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                group_name,
            });
        },

        /**
         * 退群
         * @param {string | number} group_id 群ID
         * @param {boolean} is_dismiss 是否解散
         */
        set_group_leave(group_id: string | number, is_dismiss: boolean) {
            return require<null>("set_group_leave", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                is_dismiss,
            });
        },

        /**
         * 发送群公告
         * @param {string | number} group_id 群ID
         * @param {string} content 公告内容
         * @param {string} [image] 图片路径
         * @param {string | number} [pinned]
         * @param {string | number} [type]
         * @param {string | number} [confirm_required]
         * @param {string | number} [is_show_edit_card]
         * @param {string | number} [tip_window_type]
         */
        _send_group_notice(
            group_id: string | number,
            content: string,
            image?: string,
            pinned?: string | number,
            type?: string | number,
            confirm_required?: string | number,
            is_show_edit_card?: string | number,
            tip_window_type?: string | number
        ) {
            return require<null>("_send_group_notice", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                content,
                image,
                pinned,
                type,
                confirm_required,
                is_show_edit_card,
                tip_window_type,
            });
        },

        /**
         * 设置群头衔
         * @param {string | number} group_id 群ID
         * @param {string | number} user_id 用户ID
         * @param {string} special_title 头衔内容
         */
        set_group_special_title(
            group_id: string | number,
            user_id: string | number,
            special_title: string
        ) {
            return require<null>("set_group_special_title", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                user_id:
                    typeof user_id === "string" ? user_id : user_id.toString(),
                special_title,
            });
        },

        /**
         * 处理加群请求
         * @param {string} flag 请求标识
         * @param {boolean} approve 是否同意
         * @param {string} reason 拒绝理由
         */
        set_group_add_request(flag: string, approve: boolean, reason: string) {
            return require<null>("set_group_add_request", {
                flag,
                approve,
                reason,
            });
        },

        /**
         * 获取群信息
         * @param {string | number} group_id 群ID
         */
        get_group_info(group_id: string | number) {
            return require<APIS.get_group_info>("get_group_info", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
            });
        },

        /**
         * 获取群列表
         * @param {boolean} [no_cache] 是否不使用缓存
         */
        get_group_list(no_cache?: boolean) {
            return require<APIS.get_group_info[]>(`get_group_list`, {
                no_cache: no_cache ?? false,
            });
        },

        /**
         * _删除群公告
         * @param {string | number} group_id 群ID
         * @param {string} notice_id 公告ID
         */
        _del_group_notice(group_id: string | number, notice_id: string) {
            return require<APIS._del_group_notice_result>("_del_group_notice", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                notice_id,
            });
        },

        /**
         * 获取群成员信息
         * @param {string | number} group_id 群ID
         * @param {string | number} user_id 用户ID
         * @param {boolean} [no_cache] 是否不使用缓存
         */
        get_group_member_info(
            group_id: string | number,
            user_id: string | number,
            no_cache?: boolean
        ) {
            return require<APIS.get_group_member_info>("get_group_member_info", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                user_id:
                    typeof user_id === "string" ? user_id : user_id.toString(),
                no_cache: no_cache ?? false,
            });
        },

        /**
         * 获取群成员列表
         * @param {string | number} group_id 群ID
         * @param {boolean} [no_cache] 是否不使用缓存
         */
        get_group_member_list(group_id: string | number, no_cache?: boolean) {
            return require<
                APIS.get_group_member_info[]
            >(`get_group_member_list`, {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
                no_cache: no_cache ?? false,
            });
        },

        /**
         * 获取群信息ex
         * @param {string | number} group_id 群ID
         */
        get_group_info_ex(group_id: string | number) {
            return require<APIS.get_group_info_ex>("get_group_info_ex", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
            });
        },

        /**
         * 获取群禁言列表
         * @param {string | number} group_id 群ID
         */
        get_group_shut_list(group_id: string | number) {
            return require<APIS.get_group_shut_list[]>("get_group_shut_list", {
                group_id:
                    typeof group_id === "string"
                        ? group_id
                        : group_id.toString(),
            });
        },

        //--------密钥相关---------

        /**
         * 获取clientkey
         * @returns 包含clientkey的响应结果
         */
        get_clientkey: () => {
            return require<APIS.get_clientkey_result>("get_clientkey");
        },

        /**
         * 获取cookies
         * @param domain 域名
         * @returns 包含cookies和bkn的响应结果
         */
        get_cookies: (domain: string) => {
            return require<APIS.get_cookies_result>("get_cookies", {
                domain,
            });
        },

        /**
         * 获取CSRF Token
         * @returns 包含token的响应结果
         */
        get_csrf_token: () => {
            return require<APIS.get_csrf_token_result>("get_csrf_token");
        },

        /**
         * 获取QQ相关接口凭证
         * @param domain 域名
         * @returns 包含cookies和token的响应结果
         */
        get_credentials: (domain: string) => {
            return require<APIS.get_credentials_result>("get_credentials", {
                domain,
            });
        },

        /**
         * NC获取rkey
         * @returns 包含rkey信息的响应结果
         */
        nc_get_rkey: () => {
            return require<APIS.nc_get_rkey_result>("nc_get_rkey");
        },

        /**
         * 获取rkey
         * @returns 包含rkey信息的响应结果
         */
        get_rkey: () => {
            return require<APIS.get_rkey_result>("get_rkey");
        },

        /**
         * 获取rkey服务
         * @returns 包含rkey服务信息的响应结果
         */
        get_rkey_server: () => {
            return require<APIS.get_rkey_server_result>("get_rkey_server");
        },

        //--------个人操作---------

        /**
         * OCR 图片识别
         * @param image 图片路径或URL
         */
        ocr_image(image: string) {
            return require<APIS.ocr_image_result>("ocr_image", {
                image,
            });
        },

        /**
         * 英译中
         * @param words 英文数组
         */
        translate_en2zh(words: string[]) {
            return require<APIS.translate_en2zh_result>("translate_en2zh", {
                words,
            });
        },

        /**
         * 设置输入状态
         * @param user_id 用户ID
         * @param event_type 状态类型 (0: 正在说话, 1: 正在输入)
         */
        set_input_status(user_id: string | number, event_type: number) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<APIS.set_input_status_result>("set_input_status", {
                user_id,
                event_type,
            });
        },

        /**
         * 检查是否可以发送图片
         */
        can_send_image() {
            return require<APIS.can_send_image_result>("can_send_image");
        },

        /**
         * 检查是否可以发送语音
         */
        can_send_record() {
            return require<APIS.can_send_record_result>("can_send_record");
        },

        /**
         * 获取AI语音人物
         * @param group_id 群组ID
         * @param chat_type 聊天类型
         */
        get_ai_characters(
            group_id: string | number,
            chat_type?: string | number
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_ai_characters_result>("get_ai_characters", {
                group_id,
                chat_type,
            });
        },

        /**
         * 获取AI语音
         * @param group_id 群组ID
         * @param character 人物ID
         * @param text 文本内容
         */
        get_ai_record(
            group_id: string | number,
            character: string,
            text: string
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_ai_record_result>("get_ai_record", {
                group_id,
                character,
                text,
            });
        },

        // 文件相关接口实现
        /**
         * 移动群文件
         * @param group_id 群ID
         * @param file_id 文件ID
         * @param current_parent_directory 当前父目录
         * @param target_parent_directory 目标父目录
         */
        move_group_file(
            group_id: string | number,
            file_id: string,
            current_parent_directory: string,
            target_parent_directory: string
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.move_group_file_result>("move_group_file", {
                group_id,
                file_id,
                current_parent_directory,
                target_parent_directory,
            });
        },

        /**
         * 转存为永久文件
         * @param group_id 群ID
         * @param file_id 文件ID
         */
        trans_group_file(group_id: string | number, file_id: string) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.trans_group_file_result>("trans_group_file", {
                group_id,
                file_id,
            });
        },

        /**
         * 重命名群文件
         * @param group_id 群ID
         * @param file_id 文件ID
         * @param current_parent_directory 当前父目录
         * @param new_name 新名称
         */
        rename_group_file(
            group_id: string | number,
            file_id: string,
            current_parent_directory: string,
            new_name: string
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.rename_group_file_result>("rename_group_file", {
                group_id,
                file_id,
                current_parent_directory,
                new_name,
            });
        },

        /**
         * 获取文件信息
         * @param file_id 文件ID（二选一）
         * @param file 文件路径（二选一）
         */
        get_file(file_id?: string, file?: string) {
            return require<APIS.get_file_result>("get_file", {
                file_id,
                file,
            });
        },

        /**
         * 上传群文件
         * @param group_id 群ID
         * @param file 文件内容
         * @param name 文件名
         * @param folder 文件夹路径（二选一）
         * @param folder_id 文件夹ID（二选一）
         */
        upload_group_file(
            group_id: string | number,
            file: string,
            name: string,
            folder?: string,
            folder_id?: string
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.upload_group_file_result>("upload_group_file", {
                group_id,
                file,
                name,
                folder,
                folder_id,
            });
        },

        /**
         * 创建群文件文件夹
         * @param group_id 群ID
         * @param folder_name 文件夹名称
         */
        create_group_file_folder(
            group_id: string | number,
            folder_name: string
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.create_group_file_folder_result>("create_group_file_folder", {
                group_id,
                folder_name,
            });
        },

        /**
         * 删除群文件
         * @param group_id 群ID
         * @param file_id 文件ID
         */
        delete_group_file(group_id: string | number, file_id: string) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.delete_group_file_result>("delete_group_file", {
                group_id,
                file_id,
            });
        },

        /**
         * 删除群文件夹
         * @param group_id 群ID
         * @param folder_id 文件夹ID
         */
        delete_group_folder(group_id: string | number, folder_id: string) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.delete_group_folder_result>("delete_group_folder", {
                group_id,
                folder_id,
            });
        },

        /**
         * 上传私聊文件
         * @param user_id 用户ID
         * @param file 文件内容
         * @param name 文件名
         */
        upload_private_file(
            user_id: string | number,
            file: string,
            name: string
        ) {
            if (typeof user_id === "string") user_id = parseInt(user_id);
            return require<APIS.upload_private_file_result>("upload_private_file", {
                user_id,
                file,
                name,
            });
        },

        /**
         * 获取群文件系统信息
         * @param group_id 群ID
         */
        get_group_file_system_info(group_id: string | number) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_group_file_system_info_result>("get_group_file_system_info", {
                group_id,
            });
        },

        /**
         * 下载文件到缓存目录
         * @param url 下载地址（二选一）
         * @param base64 base64编码（二选一）
         * @param name 自定义文件名称
         * @param headers 请求头
         */
        download_file(
            url?: string,
            base64?: string,
            name?: string,
            headers?: string | string[]
        ) {
            return require<APIS.download_file_result>("download_file", {
                url,
                base64,
                name,
                headers,
            });
        },

        /**
         * 获取群根目录文件列表
         * @param group_id 群ID
         * @param file_count 一次性获取的文件数量，默认50
         */
        get_group_root_files(
            group_id: string | number,
            file_count: number = 50
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_group_root_files_result>("get_group_root_files", {
                group_id,
                file_count,
            });
        },

        /**
         * 获取群子目录文件列表
         * @param group_id 群ID
         * @param folder_id 文件夹ID（二选一）
         * @param folder 文件夹路径（二选一）
         * @param file_count 一次性获取的文件数量，默认50
         */
        get_group_files_by_folder(
            group_id: string | number,
            folder_id?: string,
            folder?: string,
            file_count: number = 50
        ) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_group_files_by_folder_result>("get_group_files_by_folder", {
                group_id,
                folder_id,
                folder,
                file_count,
            });
        },

        /**
         * 获取群文件链接
         * @param group_id 群ID
         * @param file_id 文件ID
         */
        get_group_file_url(group_id: string | number, file_id: string) {
            if (typeof group_id === "string") group_id = parseInt(group_id);
            return require<APIS.get_group_file_url_result>("get_group_file_url", {
                group_id,
                file_id,
            });
        },

        /**
         * 获取私聊文件链接
         * @param file_id 文件ID
         */
        get_private_file_url(file_id: string) {
            return require<APIS.get_private_file_url_result>("get_private_file_url", {
                file_id,
            });
        },
    };
};
