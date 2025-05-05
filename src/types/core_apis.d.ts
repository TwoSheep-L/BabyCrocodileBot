import { Message } from "@/types/core_client";

export interface api {
    // 消息相关
    send_group_msg: (group_id: string, message: Message[]) => void;

    // 群管理
    set_group_remark: (group_id: string, remark: string) => void;
    set_group_kick: (
        group_id: string,
        user_id: string,
        reject_add_request: boolean
    ) => void;
    set_group_ban: (
        group_id: string,
        user_id: string,
        duration: number
    ) => void;
    set_group_whole_ban: (group_id: string, enable: boolean) => void;
    set_group_admin: (
        group_id: string,
        user_id: string,
        enable: boolean
    ) => void;
    set_group_card: (group_id: string, user_id: string, card?: string) => void;
    set_group_name: (group_id: string, group_name: string) => void;
    set_group_leave: (group_id: string, is_dismiss?: boolean) => void;

    // 精华消息
    set_essence_msg: (message_id: string) => void;
    delete_essence_msg: (message_id: string) => void;
    get_essence_msg_list: (group_id: string) => void;

    // 系统消息处理
    set_group_add_request: (
        flag: string,
        approve: boolean,
        reason?: string
    ) => void;

    // 信息获取
    get_group_list: (no_cache?: boolean) => void;
    get_group_member_info: (
        group_id: string,
        user_id: string,
        no_cache?: boolean
    ) => void;
    get_group_member_list: (group_id: string, no_cache?: boolean) => void;
    get_group_system_msg: () => void;
    get_group_shut_list: (group_id: string) => void;

    // 其他功能
    set_group_portrait: (group_id: string, file: string) => void;

    // 账号相关
    set_friend_add_request: (
        flag: string,
        approve: boolean,
        remark: string
    ) => void;
    get_login_info: () => void;
    get_stranger_info: (user_id: string) => get_stranger_info_result;
    get_friend_list: (no_cache?: boolean) => void;
    delete_friend: (
        user_id: string,
        temp_block: boolean,
        temp_both_del: boolean
    ) => void;
    nc_get_user_status: (user_id: string) => void;
    set_doubt_friends_add_request: (flag: string) => void;
    send_poke: (user_id: string, group_id?: string) => void;
    set_qq_profile: (
        nickname: string,
        personal_note?: string,
        sex?: string
    ) => void;

    // 消息相关
    delete_msg: (message_id: string) => void;

    // 个人操作
    ocr_image: (image: string) => void;
    translate_en2zh: (words: string[]) => void;
}

// 账号相关类型
export interface LoginInfo {
    user_id: number;
    nickname: string;
}

export interface StrangerInfo {
    user_id: number;
    uid: string;
    nickname: string;
    age: number;
    qid: string;
    qqLevel: number;
    sex: string;
    long_nick: string;
    reg_time: number;
    is_vip: boolean;
    is_years_vip: boolean;
    vip_level: number;
    remark: string;
    status: number;
    login_days: number;
}

export interface FriendInfo {
    user_id: number;
    nickname: string;
    remark: string;
    sex: string;
    age: number;
    phone_num: string;
    email: string;
    level: number;
    birthday_year: number;
    birthday_month: number;
    birthday_day: number;
}

export interface UserStatus {
    status: number;
    ext_status: number;
}

// OCR 相关类型
export interface OCRResult {
    text: string;
    pt1: Point;
    pt2: Point;
    pt3: Point;
    pt4: Point;
    charBox: CharBox[];
    score: string;
}

interface Point {
    x: string;
    y: string;
}

interface CharBox {
    charText: string;
    charBox: {
        pt1: Point;
        pt2: Point;
        pt3: Point;
        pt4: Point;
    };
}

// 账号相关类型
export interface LoginInfo {
    user_id: number;
    nickname: string;
}

export interface StrangerInfo {
    user_id: number;
    uid: string;
    nickname: string;
    age: number;
    qid: string;
    qqLevel: number;
    sex: string;
    long_nick: string;
    reg_time: number;
    is_vip: boolean;
    is_years_vip: boolean;
    vip_level: number;
    remark: string;
    status: number;
    login_days: number;
}

export interface FriendInfo {
    user_id: number;
    nickname: string;
    remark: string;
    sex: string;
    age: number;
    phone_num: string;
    email: string;
    level: number;
    birthday_year: number;
    birthday_month: number;
    birthday_day: number;
}

export interface UserStatus {
    status: number;
    ext_status: number;
}

// OCR 相关类型
export interface OCRResult {
    text: string;
    pt1: Point;
    pt2: Point;
    pt3: Point;
    pt4: Point;
    charBox: CharBox[];
    score: string;
}

interface Point {
    x: string;
    y: string;
}

interface CharBox {
    charText: string;
    charBox: {
        pt1: Point;
        pt2: Point;
        pt3: Point;
        pt4: Point;
    };
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
}
