export interface botMessage {
    self_id: number; //机器人QQ号
    user_id: number; //发送者QQ号
    time: number; //发送时间
    message_id: number; //消息ID
    message_seq: number; //消息序号
    real_id: number; //真实消息ID
    real_seq: string; //真实消息序号
    message_type: string; //消息类型
    sender: sender; //发送者信息
    raw_message: string; //消息内容
    font: number; //字体
    sub_type: string; //子类型
    message_format: string; //消息格式
    post_type: string; //消息类型
    group_id: number; //群号
    raw: object; //原始消息
    message: message[];
    request_type: string; // 请求类型
    flag: string; // 请求标识
    comment: string; //请求附加信息
}

export interface defaultMsg {
    post_type: string; //消息类型
    message_type: string; //消息子类型
}

//发送者
export interface sender {
    user_id: number;
    nickname: string;
    card: string;
    role?: string;
}

export type Message =
    | MessageText
    | MessageFace
    | MessageImage
    | MessageRecord
    | MessageVideo
    | MessageAt
    | MessageRps
    | MessageDice
    | MessageShake
    | MessagePoke
    | MessageShare
    | MessageContact
    | MessageLocation
    | MessageMusic
    | MessageReply
    | MessageForward
    | MessageNode
    | MessageJson
    | MessageMface
    | MessageFile
    | MessageMarkdown
    | MessageLightApp
    | string;

export interface message_text {
    type: "text";
    data: {
        text: string;
    };
}

export interface message_face {
    type: "face";
    data: {
        id: string;
    };
}

export interface message_image {
    type: "image";
    data: {
        name?: string;
        summary?: string;
        file?: string;
        sub_type?: string;
        file_id?: string;
        url?: string;
        path?: string;
        file_size?: string;
        file_unique?: string;
    };
}

export interface message_record {
    type: "record";
    data: {
        file: string;
        name?: string;
        url?: string;
        path?: string;
        file_id?: string;
        file_size?: string;
        file_unique?: string;
    };
}

export interface message_video {
    type: "video";
    data: {
        file: string;
        name?: string;
        thumb?: string;
        url?: string;
        path?: string;
        file_id?: string;
        file_size?: string;
        file_unique?: string;
    };
}

export interface message_at {
    type: "at";
    data: {
        qq: string;
    };
}

export interface message_rps {
    type: "rps";
    data: {
        result?: string;
    };
}

export interface message_dice {
    type: "dice";
    data: {
        result?: string;
    };
}

export interface message_contact {
    type: "contact";
    data: {
        type: "qq" | "group";
        id: string;
    };
}

export type message_music = {
    type: "music";
    data:
        | {
              type: "qq" | "163" | "kugou" | "migu" | "kuwo";
              id: string;
          }
        | {
              type: "custom";
              url: string;
              audio: string;
              title: string;
              image?: string;
              singer?: string;
          };
};

export interface message_reply {
    type: "reply";
    data: {
        id: string;
    };
}

export interface message_forward {
    type: "forward";
    data: {
        id: string;
        content?: any[]; // 根据实际情况替换 any 为具体消息类型
    };
}

export type message_node = {
    type: "node";
    data:
        | { id: string; content?: never }
        | { content: any[]; id?: never }
        | {
              user_id: string;
              nickname: string;
              id?: string;
              content?: any[];
          };
};

export interface message_json {
    type: "json";
    data: {
        data: string;
    };
}

export interface message_mface {
    type: "mface";
    data: {
        emoji_id: string;
        emoji_package_id: string;
        key: string;
        summary?: string;
    };
}

export interface message_file {
    type: "file";
    data: {
        name?: string;
        file: string;
        path?: string;
        url?: string;
        file_id?: string;
        file_size?: string;
        file_unique?: string;
    };
}

export interface MessageShake {
    type: "shake";
    data: {}; // 根据文档，发送时不支持，接收时可能无数据
}

export interface MessagePoke {
    type: "poke";
    data: {
        qq: string; // 被戳成员QQ号
    };
}

export interface MessageShare {
    type: "share";
    data: {
        url: string;
        title: string;
        content?: string;
        image?: string;
    };
}

export interface MessageLocation {
    type: "location";
    data: {
        lat: string;
        lon: string;
        title: string;
        content?: string;
    };
}

export interface MessageMarkdown {
    type: "markdown";
    data: {
        content: string;
    };
}

export interface MessageLightApp {
    type: "lightapp";
    data: {
        content: string; // 小程序卡片内容（JSON字符串）
    };
}

//修改配置项入参
export interface changeConfigParams {
    serverOriginData?: boolean; // 是否开启服务端数据源
}
