import { Message } from "@/types/core_client";

export interface api {
    //--------账号相关---------
    /**
     * 设置QQ个人资料
     * @param nickname 昵称
     * @param personal_note 个性签名
     * @param sex 性别
     */
    set_qq_profile: (
        nickname: string,
        personal_note?: string,
        sex?: string
    ) => void;

    /**
     * 发送戳一戳 不填写群，则戳一戳私聊
     * @param user_id 戳一戳的对象ID
     * @param group_id 戳一戳的群ID
     */
    send_poke: (user_id: string | number, group_id?: string) => void;

    /**
     * 获取在线客户端
     * @returns 在线客户端列表
     */
    get_online_clients: () => Promise<string[]>;

    /**
     * 获取好友列表
     * @returns 好友列表
     */
    get_friends_with_category: () => Promise<APIS.get_friends_with_category[]>;

    /**
     * 发送赞
     * @param user_id 赞的对象ID
     * @param times 发送次数，默认1次，最多28次
     */
    send_like: (user_id: number | string, times: number) => Promise<null>;

    /**
     * 处理加好友请求
     * @param flag 请求标识
     * @param approve 是否同意添加
     * @param remark 附带的备注信息
     */
    set_friend_add_request: (
        flag: string,
        approve: boolean,
        remark: string
    ) => Promise<null>;

    /**
     * 获取登录信息
     */
    get_login_info: () => Promise<APIS.get_login_info>;

    /**
     * 获取指定账号信息
     * @param user_id ID
     */
    get_stranger_info: (
        user_id: number | string
    ) => Promise<APIS.get_stranger_info>;

    /**
     * 获取好友列表
     * @param no_cache 是否不使用缓存 - 默认使用
     */
    get_friend_list: (no_cache: boolean) => Promise<get_friend_list[]>;

    /**
     * 设置所有消息已读
     */
    mark_all_as_read: () => Promise<null>;

    /**
     * 获取点赞列表
     * @param user_id 指定用户，不填为获取所有
     * @param start 起始位置
     * @param count 获取数量
     */
    get_profile_like: (
        user_id?: number | string,
        start?: number,
        count?: number
    ) => Promise<APIS.get_profile_like_result>;

    /**
     * 获取收藏表情
     * @param count 获取数量
     */
    fetch_custom_face: (count?: number) => Promise<string[]>;

    /**
     * 删除好友
     * @param user_id 用户ID
     * @param friend_id 好友ID
     * @param temp_block 是否拉黑
     * @param temp_both_del 是否双向删除
     */
    delete_friend: (
        user_id: number | string,
        friend_id: number | string,
        temp_block: boolean,
        temp_both_del: boolean
    ) => Promise<APIS.delete_friend_result>;

    /**
     * 获取用户状态
     * @param user_id 用户ID
     */
    nc_get_user_status: (
        user_id: number | string
    ) => Promise<APIS.nc_get_user_status_result>;

    /**
     * 获取机器人状态
     */
    get_status: () => Promise<APIS.get_status_result>;

    //--------消息相关---------
    /**
     * 发送群消息
     * @param group_id 群ID
     * @param message 消息内容
     */
    send_group_msg: (
        group_id: string | number,
        message: Message[]
    ) => Promise<APIS.send_group_msg_result>;

    /**
     * 发送私聊消息
     * @param user_id 用户ID
     * @param message 消息内容
     */
    send_private_msg: (
        user_id: string | number,
        message: Message[]
    ) => Promise<APIS.send_private_msg_result>;

    /**
     * 撤回消息
     * @param message_id 消息ID
     */
    delete_msg: (
        message_id: string | number
    ) => Promise<APIS.delete_msg_result>;

    /**
     * 获取群历史消息
     * @param group_id 群ID
     * @param message_seq 消息序号，默认0为最新
     * @param count 获取数量，默认20
     * @param reverseOrder 是否倒序，默认true
     */
    get_group_msg_history: (
        group_id: string | number,
        message_seq?: string | number,
        count?: number,
        reverseOrder?: boolean
    ) => Promise<APIS.get_group_msg_history_result>;

    /**
     * 获取消息详情
     * @param message_id 消息ID
     */
    get_msg: (message_id: string | number) => Promise<APIS.get_msg_result>;

    /**
     * 获取语音消息详情
     * @param file 语音文件路径
     * @param file_id 文件ID
     * @param out_format 输出格式，可选mp3, amr, wma, m4a, spx, ogg, wav, flac
     */
    get_record: (
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
    ) => Promise<APIS.get_record_result>;

    /**
     * 获取图片消息详情
     * @param file_id 图片文件ID
     */
    get_image: (file_id: string) => Promise<APIS.get_image_result>;

    /**
     * 发送群AI语音
     * @param group_id 群ID
     * @param character 角色ID
     * @param text 发送的文本内容
     */
    send_group_ai_record: (
        group_id: string | number,
        character: string,
        text: string
    ) => Promise<APIS.send_group_ai_record_result>;

    //--------群相关---------
    /**
     * 设置群备注
     * @param group_id 群ID
     * @param remark 群备注
     */
    set_group_remark: (
        group_id: string | number,
        remark: string
    ) => Promise<null>;

    /**
     * 群踢人
     * @param group_id 群ID
     * @param user_id 用户ID
     * @param reject_add_request 是否拉黑
     */
    set_group_kick: (
        group_id: string | number,
        user_id: string | number,
        reject_add_request: boolean
    ) => Promise<null>;

    /**
     * 获取群系统消息
     */
    get_group_system_msg: () => Promise<APIS.get_group_system_msg>;

    /**
     * 群禁言
     * @param group_id 群ID
     * @param user_id 用户ID
     * @param duration 禁言时间（秒）
     */
    set_group_ban: (
        group_id: string | number,
        user_id: string | number,
        duration: number
    ) => Promise<null>;

    /**
     * 全体禁言
     * @param group_id 群ID
     * @param enable 是否开启
     */
    set_group_whole_ban: (
        group_id: string | number,
        enable: boolean
    ) => Promise<null>;

    /**
     * 设置群管理
     * @param group_id 群ID
     * @param user_id 用户ID
     * @param enable 是否设置
     */
    set_group_admin: (
        group_id: string | number,
        user_id: string | number,
        enable: boolean
    ) => Promise<null>;

    /**
     * 设置群头像
     * @param group_id 群ID
     * @param file 图片路径
     */
    set_group_portrait: (
        group_id: string | number,
        file: string
    ) => Promise<APIS.set_group_portrait_result>;

    /**
     * 设置群成员名片
     * @param group_id 群ID
     * @param user_id 用户ID
     * @param card 名片内容
     */
    set_group_card: (
        group_id: string | number,
        user_id: string | number,
        card: string
    ) => Promise<null>;

    /**
     * 设置群名
     * @param group_id 群ID
     * @param group_name 群名
     */
    set_group_name: (
        group_id: string | number,
        group_name: string
    ) => Promise<null>;

    /**
     * 退群
     * @param group_id 群ID
     * @param is_dismiss 是否解散
     */
    set_group_leave: (
        group_id: string | number,
        is_dismiss: boolean
    ) => Promise<null>;

    /**
     * 发送群公告
     * @param group_id 群ID
     * @param content 公告内容
     * @param image 图片路径
     * @param pinned
     * @param type
     * @param confirm_required
     * @param is_show_edit_card
     * @param tip_window_type
     */
    _send_group_notice: (
        group_id: string | number,
        content: string,
        image?: string,
        pinned?: string | number,
        type?: string | number,
        confirm_required?: string | number,
        is_show_edit_card?: string | number,
        tip_window_type?: string | number
    ) => Promise<null>;

    /**
     * 设置群头衔
     * @param group_id 群ID
     * @param user_id 用户ID
     * @param special_title 头衔内容
     */
    set_group_special_title: (
        group_id: string | number,
        user_id: string | number,
        special_title: string
    ) => Promise<null>;

    /**
     * 处理加群请求
     * @param flag 请求标识
     * @param approve 是否同意
     * @param reason 拒绝理由
     */
    set_group_add_request: (
        flag: string,
        approve: boolean,
        reason: string
    ) => Promise<null>;

    /**
     * 获取群信息
     * @param group_id 群ID
     */
    get_group_info: (group_id: string | number) => Promise<APIS.get_group_info>;

    /**
     * 获取群列表
     * @param no_cache 是否不使用缓存
     */
    get_group_list: (no_cache?: boolean) => Promise<APIS.get_group_info[]>;

    /**
     * 删除群公告
     * @param group_id 群ID
     * @param notice_id 公告ID
     */
    _del_group_notice: (
        group_id: string | number,
        notice_id: string
    ) => Promise<APIS._del_group_notice_result>;

    /**
     * 获取群成员信息
     * @param group_id 群ID
     * @param user_id 用户ID
     * @param no_cache 是否不使用缓存
     */
    get_group_member_info: (
        group_id: string | number,
        user_id: string | number,
        no_cache?: boolean
    ) => Promise<APIS.get_group_member_info>;

    /**
     * 获取群成员列表
     * @param group_id 群ID
     * @param no_cache 是否不使用缓存
     */
    get_group_member_list: (
        group_id: string | number,
        no_cache?: boolean
    ) => Promise<APIS.get_group_member_info[]>;

    /**
     * 获取群信息ex
     * @param group_id 群ID
     */
    get_group_info_ex: (
        group_id: string | number
    ) => Promise<APIS.get_group_info_ex>;

    /**
     * 获取群禁言列表
     * @param group_id 群ID
     */
    get_group_shut_list: (
        group_id: string | number
    ) => Promise<APIS.get_group_shut_list[]>;

    //--------密钥相关---------

    /**
     * 获取clientkey
     * @returns 包含clientkey的响应结果
     */
    get_clientkey: () => Promise<APIS.get_clientkey_result>;

    /**
     * 获取cookies
     * @param domain 域名
     * @returns 包含cookies和bkn的响应结果
     */
    get_cookies: (domain: string) => Promise<APIS.get_cookies_result>;

    /**
     * 获取CSRF Token
     * @returns 包含token的响应结果
     */
    get_csrf_token: () => Promise<APIS.get_csrf_token_result>;

    /**
     * 获取QQ相关接口凭证
     * @param domain 域名
     * @returns 包含cookies和token的响应结果
     */
    get_credentials: (domain: string) => Promise<APIS.get_credentials_result>;

    /**
     * NC获取rkey
     * @returns 包含rkey信息的响应结果
     */
    nc_get_rkey: () => Promise<APIS.nc_get_rkey_result>;

    /**
     * 获取rkey
     * @returns 包含rkey信息的响应结果
     */
    get_rkey: () => Promise<APIS.get_rkey_result>;

    /**
     * 获取rkey服务
     * @returns 包含rkey服务信息的响应结果
     */
    get_rkey_server: () => Promise<APIS.get_rkey_server_result>;

    //--------个人操作---------

    /**
     * OCR 图片识别
     * @param image 图片路径或URL
     */
    ocr_image: (image: string) => Promise<APIS.ocr_image_result>;

    /**
     * 英译中
     * @param words 英文数组
     */
    translate_en2zh: (words: string[]) => Promise<APIS.translate_en2zh_result>;

    /**
     * 设置输入状态
     * @param user_id 用户ID
     * @param event_type 状态类型 (0: 正在说话, 1: 正在输入)
     */
    set_input_status: (
        user_id: string | number,
        event_type: number
    ) => Promise<APIS.set_input_status_result>;

    /**
     * 检查是否可以发送图片
     */
    can_send_image: () => Promise<APIS.can_send_image_result>;

    /**
     * 检查是否可以发送语音
     */
    can_send_record: () => Promise<APIS.can_send_record_result>;

    /**
     * 获取AI语音人物
     * @param group_id 群组ID
     * @param chat_type 聊天类型
     */
    get_ai_characters: (
        group_id: string | number,
        chat_type?: string | number
    ) => Promise<APIS.get_ai_characters_result>;

    /**
     * 获取AI语音
     * @param group_id 群组ID
     * @param character 人物ID
     * @param text 文本内容
     */
    get_ai_record: (
        group_id: string | number,
        character: string,
        text: string
    ) => Promise<APIS.get_ai_record_result>;

    // 文件相关接口定义

    /**
     * 移动群文件
     * @param group_id 群ID
     * @param file_id 文件ID
     * @param current_parent_directory 当前父目录
     * @param target_parent_directory 目标父目录
     */
    move_group_file: (
        group_id: string | number,
        file_id: string,
        current_parent_directory: string,
        target_parent_directory: string
    ) => Promise<APIS.move_group_file_result>;

    /**
     * 转存为永久文件
     * @param group_id 群ID
     * @param file_id 文件ID
     */
    trans_group_file: (
        group_id: string | number,
        file_id: string
    ) => Promise<APIS.trans_group_file_result>;

    /**
     * 重命名群文件
     * @param group_id 群ID
     * @param file_id 文件ID
     * @param current_parent_directory 当前父目录
     * @param new_name 新名称
     */
    rename_group_file: (
        group_id: string | number,
        file_id: string,
        current_parent_directory: string,
        new_name: string
    ) => Promise<APIS.rename_group_file_result>;

    /**
     * 获取文件信息
     * @param file_id 文件ID（二选一）
     * @param file 文件路径（二选一）
     */
    get_file: (
        file_id?: string,
        file?: string
    ) => Promise<APIS.get_file_result>;

    /**
     * 上传群文件
     * @param group_id 群ID
     * @param file 文件内容
     * @param name 文件名
     * @param folder 文件夹路径（二选一）
     * @param folder_id 文件夹ID（二选一）
     */
    upload_group_file: (
        group_id: string | number,
        file: string,
        name: string,
        folder?: string,
        folder_id?: string
    ) => Promise<APIS.upload_group_file_result>;

    /**
     * 创建群文件文件夹
     * @param group_id 群ID
     * @param folder_name 文件夹名称
     */
    create_group_file_folder: (
        group_id: string | number,
        folder_name: string
    ) => Promise<APIS.create_group_file_folder_result>;

    /**
     * 删除群文件
     * @param group_id 群ID
     * @param file_id 文件ID
     */
    delete_group_file: (
        group_id: string | number,
        file_id: string
    ) => Promise<APIS.delete_group_file_result>;

    /**
     * 删除群文件夹
     * @param group_id 群ID
     * @param folder_id 文件夹ID
     */
    delete_group_folder: (
        group_id: string | number,
        folder_id: string
    ) => Promise<APIS.delete_group_folder_result>;

    /**
     * 上传私聊文件
     * @param user_id 用户ID
     * @param file 文件内容
     * @param name 文件名
     */
    upload_private_file: (
        user_id: string | number,
        file: string,
        name: string
    ) => Promise<APIS.upload_private_file_result>;

    /**
     * 获取群文件系统信息
     * @param group_id 群ID
     */
    get_group_file_system_info: (
        group_id: string | number
    ) => Promise<APIS.get_group_file_system_info_result>;

    /**
     * 下载文件到缓存目录
     * @param url 下载地址（二选一）
     * @param base64 base64编码（二选一）
     * @param name 自定义文件名称
     * @param headers 请求头
     */
    download_file: (
        url?: string,
        base64?: string,
        name?: string,
        headers?: string | string[]
    ) => Promise<APIS.download_file_result>;

    /**
     * 获取群根目录文件列表
     * @param group_id 群ID
     * @param file_count 一次性获取的文件数量，默认50
     */
    get_group_root_files: (
        group_id: string | number,
        file_count?: number
    ) => Promise<APIS.get_group_root_files_result>;

    /**
     * 获取群子目录文件列表
     * @param group_id 群ID
     * @param folder_id 文件夹ID（二选一）
     * @param folder 文件夹路径（二选一）
     * @param file_count 一次性获取的文件数量，默认50
     */
    get_group_files_by_folder: (
        group_id: string | number,
        folder_id?: string,
        folder?: string,
        file_count?: number
    ) => Promise<APIS.get_group_files_by_folder_result>;

    /**
     * 获取群文件链接
     * @param group_id 群ID
     * @param file_id 文件ID
     */
    get_group_file_url: (
        group_id: string | number,
        file_id: string
    ) => Promise<APIS.get_group_file_url_result>;

    /**
     * 获取私聊文件链接
     * @param file_id 文件ID
     */
    get_private_file_url: (
        file_id: string
    ) => Promise<APIS.get_private_file_url_result>;
}

export namespace APIS {
    export interface get_stranger_info_result {
        [key: string, value: string];
        uin: string;
        nick: string;
        address: string;
        regTime: number;
        qqLevel: number;
        qid: string;
        is_vip: Boolean;
        is_years_vip: Boolean;
        vip_level: number;
    }

    //--------账号相关---------

    //设置账号信息
    export interface set_qq_profile_result {
        result: number;
        errMsg: string;
    }

    //获取好友分组列表
    export interface get_friends_with_category {
        categoryId: number; // 分组id, 0 为默认分组
        categorySortId: number; // 分组排序id,
        categoryName: string; // 分组名称
        categoryMbCount: number; // 分组人数,
        onlineCount: number; // 在线人数,
        buddyList: get_friends_with_category_buddyList[]; // 分组内好友列表
    }
    interface get_friends_with_category_buddyList {
        birthday_year: number; // 生日年
        birthday_month: number; // 生日月
        birthday_day: number; // 生日日
        user_id: number; // 用户id
        age: number; // 年龄
        phone_num: string; // 手机号
        email: string; // 邮箱
        category_id: number; // 分组id
        nickname: string; // 昵称
        remark: string; // 备注
        sex: string; // 性别
        level: number; // 等级
    }

    //获取登陆账号信息
    interface get_login_info {
        user_id: number;
        nickname: string;
    }

    //获取账号信息
    interface get_stranger_info {
        user_id: number; // 用户id
        uid: string; // uid
        uin: string; // uin
        nickname: string; // 昵称
        age: number; // 年龄
        qid: string; // qid
        qqLevel: number; // qq等级
        sex: string; // 性别
        long_nick: string; // 长昵称
        reg_time: number; // 注册时间
        is_vip: boolean; // 是否vip
        is_years_vip: boolean; // 是否年费会员
        vip_level: number; // vip等级
        remark: string; // 备注
        status: number; // 状态
        login_days: number; // 登录天数
    }

    //获取好友列表
    interface get_friend_list {
        birthday_year: number; // 生日年
        birthday_day: number; // 生日日
        user_id: number; // 用户id
        age: number; // 年龄
        phone_num: string; // 手机号
        email: string; // 邮箱
        category_id: number; // 分组id
        nickname: string; // 昵称
        remark: string; // 备注
        sex: string; // 性别
        level: number; // 等级
    }

    export interface get_profile_like_result {
        uid: string;
        time: number;
        favoriteInfo: {
            total_count: number;
            last_time: number;
            today_count: number;
            userInfos: 点赞信息[];
        };
        voteInfo: {
            total_count: number;
            new_count: number;
            new_nearby_count: number;
            last_visit_time: number;
            userInfos: 点赞信息[];
        };
    }

    export interface delete_friend_result {
        result: number;
        errMsg: string;
    }

    export interface nc_get_user_status_result {
        status: number;
        ext_status: number;
    }

    export interface get_status_result {
        online: boolean;
        good: boolean;
        stat: Record<string, any>;
    }

    // 从OpenAPI文档提取的点赞信息结构
    interface 点赞信息 {
        uid: string;
        src: number;
        latestTime: number;
        count: number;
        giftCount: number;
        customId: number;
        lastCharged: number;
        bAvailableCnt: number;
        bTodayVotedCnt: number;
        nick: string;
        gender: number;
        age: number;
        isFriend: boolean;
        isvip: boolean;
        isSvip: boolean;
        uin: number;
    }

    //--------消息相关---------
    //发送群消息结果
    export interface send_group_msg_result {
        status: "ok";
        retcode: number;
        data: {
            message_id: number;
        };
        message: string;
        wording: string;
    }

    //发送私聊消息结果
    export interface send_private_msg_result {
        status: "ok";
        retcode: number;
        data: {
            message_id: number;
        };
        message: string;
        wording: string;
    }

    //撤回消息结果
    export interface delete_msg_result {
        status: "ok";
        retcode: number;
        data: null;
        message: string;
        wording: string;
    }

    //获取群历史消息结果
    export interface get_group_msg_history_result {
        status: "ok";
        retcode: number;
        data: {
            messages: APIS.message_detail[];
        };
        message: string;
        wording: string;
    }

    //获取消息详情结果
    export interface get_msg_result {
        status: "ok";
        retcode: number;
        data: APIS.message_detail;
        message: string;
        wording: string;
    }

    //获取语音消息详情结果
    export interface get_record_result {
        status: "ok";
        retcode: number;
        data: {
            file: string; //本地路径
            url: string; //网络路径
            file_size: string; //文件大小
            file_name: string; //文件名
            base64: string; //base64编码
        };
        message: string;
        wording: string;
    }

    //获取图片消息详情结果
    export interface get_image_result {
        status: "ok";
        retcode: number;
        data: {
            file: string; //本地路径
            url: string; //网络路径
            file_size: string; //文件大小
            file_name: string; //文件名
            base64: string; //base64编码
        };
        message: string;
        wording: string;
    }

    //发送群AI语音结果
    export interface send_group_ai_record_result {
        status: "ok";
        retcode: number;
        data: {
            message_id: string;
        };
        message: string;
        wording: string;
    }

    //消息详情
    export interface message_detail {
        self_id: number;
        user_id: number;
        time: number;
        message_id: number;
        message_seq: number;
        real_id: number;
        real_seq: string;
        message_type: string;
        sender: {
            user_id: number;
            nickname: string;
            sex: "male" | "female" | "unknown";
            age: number;
            card: string;
            role: "owner" | "admin" | "member";
        };
        raw_message: string;
        font: number;
        sub_type: string;
        message: any[];
        message_format: string;
        post_type: string;
        group_id: number;
    }

    //---------群相关---------
    //设置群备注
    export interface set_group_remark_result {}

    //群踢人
    export interface set_group_kick_result {}

    //获取群系统消息
    export interface get_group_system_msg {
        InvitedRequest: group_request[];
        join_requests: group_request[];
    }
    interface group_request {
        request_id: number;
        invitor_uin: number;
        invitor_nick: string;
        group_id: number;
        message: string;
        group_name: string;
        checked: boolean;
        actor: number;
        requester_nick: string;
    }

    //群禁言
    export interface set_group_ban_result {}

    //全体禁言
    export interface set_group_whole_ban_result {}

    //设置群管理
    export interface set_group_admin_result {}

    //设置群头像
    export interface set_group_portrait_result {
        result: string;
        errMsg: string;
    }

    //设置群成员名片
    export interface set_group_card_result {}

    //设置群名
    export interface set_group_name_result {}

    //退群
    export interface set_group_leave_result {}

    //发送群公告
    export interface _send_group_notice_result {}

    //设置群头衔
    export interface set_group_special_title_result {}

    //处理加群请求
    export interface set_group_add_request_result {}

    //获取群信息
    export interface get_group_info {
        group_all_shut: number;
        group_remark: string;
        group_id: string;
        group_name: string;
        member_count: number;
        max_member_count: number;
    }

    //删除群公告
    export interface _del_group_notice_result {
        result: number;
        errMsg: string;
    }

    //获取群成员信息
    export interface get_group_member_info {
        group_id: number;
        user_id: number;
        nickname: string;
        card: string;
        sex: string;
        age: number;
        area: string;
        level: number;
        qq_level: number;
        join_time: number;
        last_sent_time: number;
        title_expire_time: number;
        unfriendly: boolean;
        card_changeable: boolean;
        is_robot: boolean;
        shut_up_timestamp: number;
        role: string;
        title: string;
    }

    //获取群信息ex
    export interface get_group_info_ex {
        groupCode: string;
        resultCode: number;
        extInfo: {
            groupInfoExtSeq: number;
            reserve: number;
            luckyWordId: string;
            lightCharNum: number;
            luckyWord: string;
            starId: number;
            essentialMsgSwitch: number;
            todoSeq: number;
            blacklistExpireTime: number;
            isLimitGroupRtc: number;
            companyId: number;
            hasGroupCustomPortrait: number;
            bindGuildId: string;
            groupOwnerId: {
                memberUin: string;
                memberUid: string;
                memberQid: string;
            };
            essentialMsgPrivilege: number;
            msgEventSeq: string;
            inviteRobotSwitch: number;
            gangUpId: string;
            qqMusicMedalSwitch: number;
            showPlayTogetherSwitch: number;
            groupFlagPro1: string;
            groupBindGuildIds: {
                guildIds: string[];
            };
            viewedMsgDisappearTime: string;
            groupExtFlameData: {
                switchState: number;
                state: number;
                dayNums: string[];
                version: number;
                updateTime: string;
                isDisplayDayNum: boolean;
            };
            groupBindGuildSwitch: number;
            groupAioBindGuildId: string;
            groupExcludeGuildIds: {
                guildIds: string[];
            };
            fullGroupExpansionSwitch: number;
            fullGroupExpansionSeq: string;
            inviteRobotMemberSwitch: number;
            inviteRobotMemberExamine: number;
            groupSquareSwitch: number;
        };
    }

    //获取群禁言列表
    export interface get_group_shut_list {
        uid: string;
        qid: string;
        uin: string;
        nick: string;
        remark: string;
        cardType: number;
        cardName: string;
        role: number;
        avatarPath: string;
        shutUpTime: number;
        isDelete: boolean;
        isSpecialConcerned: boolean;
        isSpecialShield: boolean;
        isRobot: boolean;
        groupHonor: {};
        memberRealLevel: number;
        memberLevel: number;
        globalGroupLevel: number;
        globalGroupPoint: number;
        memberTitleId: number;
        memberSpecialTitle: string;
        specialTitleExpireTime: string;
        userShowFlag: number;
        userShowFlagNew: number;
        richFlag: number;
        mssVipType: number;
        bigClubLevel: number;
        bigClubFlag: number;
        autoRemark: string;
        creditLevel: number;
        joinTime: number;
        lastSpeakTime: number;
        memberFlag: number;
        memberFlagExt: number;
        memberMobileFlag: number;
        memberFlagExt2: number;
        isSpecialShielded: boolean;
        cardNameId: number;
    }

    //--------密钥相关---------

    /**
     * 获取clientkey的响应结果
     */
    export interface get_clientkey_result {
        data: {
            clientkey: string;
        };
    }

    /**
     * 获取cookies的响应结果
     */
    export interface get_cookies_result {
        data: {
            cookies: string;
            bkn: string;
        };
    }

    /**
     * 获取CSRF Token的响应结果
     */
    export interface get_csrf_token_result {
        data: {
            token: number;
        };
    }

    /**
     * 获取QQ相关接口凭证的响应结果
     */
    export interface get_credentials_result {
        data: {
            cookies: string;
            token: number;
        };
    }

    /**
     * NC获取rkey的响应结果
     */
    export interface nc_get_rkey_result {
        data: Array<{
            rkey: string;
            ttl: string;
            time: number;
            type: number;
        }>;
    }

    /**
     * 获取rkey的响应结果
     */
    export interface get_rkey_result {
        data: Array<{
            type: string;
            rkey: string;
            created_at: number;
            ttl: string;
        }>;
    }

    /**
     * 获取rkey服务的响应结果
     */
    export interface get_rkey_server_result {
        data: {
            private_rkey: string;
            group_rkey: string;
            expired_time: number;
            name: string;
        };
    }

    // OCR 图片识别
    export interface ocr_image_result {
        status: string;
        retcode: number;
        data: {
            text: string;
            pt1: { x: string; y: string };
            pt2: { x: string; y: string };
            pt3: { x: string; y: string };
            pt4: { x: string; y: string };
            charBox: {
                charText: string;
                charBox: {
                    pt1: { x: string; y: string };
                    pt2: { x: string; y: string };
                    pt3: { x: string; y: string };
                    pt4: { x: string; y: string };
                }[];
            }[];
            score: string;
        }[];
        message: string;
        wording: string;
        echo: string | null;
    }

    // 英译中
    export interface translate_en2zh_result {
        status: string;
        retcode: number;
        data: string[];
        message: string;
        wording: string;
        echo: string | null;
    }

    // 设置输入状态
    export interface set_input_status_result {
        status: string;
        retcode: number;
        data: {
            result: number;
            errMsg: string;
        };
        message: string;
        wording: string;
        echo: string | null;
    }

    // 检查是否可以发送图片
    export interface can_send_image_result {
        status: string;
        retcode: number;
        data: {
            yes: boolean;
        };
        message: string;
        wording: string;
        echo: string | null;
    }

    // 检查是否可以发送语音
    export interface can_send_record_result {
        status: string;
        retcode: number;
        data: {
            yes: boolean;
        };
        message: string;
        wording: string;
        echo: string | null;
    }

    // 获取AI语音人物
    export interface get_ai_characters_result {
        status: string;
        retcode: number;
        data: {
            type: string;
            characters: {
                character_id: string;
                character_name: string;
                preview_url: string;
            }[];
        }[];
        message: string;
        wording: string;
        echo: string | null;
    }

    // 获取AI语音
    export interface get_ai_record_result {
        status: string;
        retcode: number;
        data: string;
        message: string;
        wording: string;
        echo: string | null;
    }

    // 移动群文件
    export interface move_group_file_result {
        ok: boolean;
    }

    // 转存为永久文件
    export interface trans_group_file_result {
        ok: boolean;
    }

    // 重命名群文件
    export interface rename_group_file_result {
        ok: boolean;
    }

    // 获取文件信息
    export interface get_file_result {
        file: string; // 文件路径或链接
        url: string; // 文件路径或链接
        file_size: string; // 文件大小
        file_name: string; // 文件名
        base64: string; // base64编码
    }

    // 上传群文件
    export interface upload_group_file_result {
        ok: boolean;
    }

    // 创建群文件文件夹
    export interface create_group_file_folder_result {
        result: {
            retCode: number;
            retMsg: string;
            clientWording: string;
        };
        groupItem: {
            peerId: string;
            type: number;
            folderInfo: {
                folderId: string;
                parentFolderId: string;
                folderName: string;
                createTime: number;
                modifyTime: number;
                createUin: string;
                creatorName: string;
                totalFileCount: number;
                modifyUin: string;
                modifyName: string;
                usedSpace: string;
            };
            fileInfo: string;
        };
    }

    // 删除群文件
    export interface delete_group_file_result {
        result: number;
        errMsg: string;
        transGroupFileResult: {
            result: {
                retCode: number;
                retMsg: string;
                clientWording: string;
            };
            successFileIdList: string[];
            failFileIdList: string[];
        };
    }

    // 删除群文件夹
    export interface delete_group_folder_result {
        retCode: number;
        retMsg: string;
        clientWording: string;
    }

    // 上传私聊文件
    export interface upload_private_file_result {
        ok: boolean;
    }

    // 获取群文件系统信息
    export interface get_group_file_system_info_result {
        file_count: number; // 文件总数
        limit_count: number; // 文件上限
        used_space: number; // 已使用空间
        total_space: number; // 总空间
    }

    // 下载文件到缓存目录
    export interface download_file_result {
        file: string; // 下载后的路径
    }

    // 获取群根目录文件列表
    export interface get_group_root_files_result {
        files: 群文件信息[];
        folders: 群文件夹信息[];
    }

    // 获取群子目录文件列表
    export interface get_group_files_by_folder_result {
        files: 群文件信息[];
        folders: 群文件夹信息[];
    }

    // 获取群文件链接
    export interface get_group_file_url_result {
        url: string; // 文件链接
    }

    // 获取私聊文件链接
    export interface get_private_file_url_result {
        url: string; // 文件链接
    }

    // 群文件信息
    export interface 群文件信息 {
        group_id: number;
        file_id: string;
        file_name: string;
        busid: number;
        size: number;
        file_size: number;
        upload_time: number;
        dead_time: number;
        modify_time: number;
        download_times: number;
        uploader: number;
        uploader_name: string;
    }

    // 群文件夹信息
    export interface 群文件夹信息 {
        group_id: number;
        folder_id: string;
        folder: string;
        folder_name: string;
        create_time: number;
        creator: number;
        creator_name: string;
        total_file_count: number;
    }
}
