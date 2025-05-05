import {
    message_text,
    message_face,
    message_image,
    message_record,
    message_video,
    message_at,
    message_rps,
    message_dice,
    message_contact,
    message_music,
    message_reply,
    message_forward,
    message_node,
    message_json,
    message_mface,
    message_file,
    MessagePoke,
    MessageShare,
    MessageLocation,
    MessageMarkdown,
    MessageLightApp,
    Message,
} from "@/types/core_client";

// Text文本
export const cq_text = (text: string): message_text => ({
    type: "text",
    data: { text },
});

// QQ表情
export const cq_face = (id: number | string): message_face => ({
    type: "face",
    data: { id: String(id) },
});

// 图片（支持普通图片和商城表情）
type ImageOptions = {
    name?: string;
    summary?: string;
    file?: string;
    sub_type?: string;
};
export const cq_image = (
    file: string,
    options?: ImageOptions
): message_image => ({
    type: "image",
    data: { file, ...options },
});

// 语音消息
type RecordOptions = { name?: string };
export const cq_record = (
    file: string,
    options?: RecordOptions
): message_record => ({
    type: "record",
    data: { file, ...options },
});

// 视频消息
type VideoOptions = { name?: string; thumb?: string };
export const cq_video = (
    file: string,
    options?: VideoOptions
): message_video => ({
    type: "video",
    data: { file, ...options },
});

// @某人
export const cq_at = (qq: number | "all"): message_at => ({
    type: "at",
    data: { qq: qq === "all" ? qq : String(qq) },
});

// 猜拳（发送时不需要参数）
export const cq_rps = (): message_rps => ({
    type: "rps",
    data: {},
});

// 骰子（发送时不需要参数）
export const cq_dice = (): message_dice => ({
    type: "dice",
    data: {},
});

// 推荐联系人
export const cq_contact = (
    type: "qq" | "group",
    id: number | string
): message_contact => ({
    type: "contact",
    data: { type, id: String(id) },
});

// 音乐分享
type MusicCommon = {
    type: "qq" | "163" | "kugou" | "migu" | "kuwo";
    id: string;
};
type MusicCustom = {
    type: "custom";
    url: string;
    audio: string;
    title: string;
    image?: string;
    singer?: string;
};
export const cq_music = (
    options: MusicCommon | MusicCustom
): message_music => ({
    type: "music",
    data: options,
});

// 回复消息
export const cq_reply = (messageId: string): message_reply => ({
    type: "reply",
    data: { id: messageId },
});

// 转发消息
export const cq_forward = (id: string, content?: any[]): message_forward => ({
    type: "forward",
    data: { id, ...(content && { content }) },
});

// 转发节点（支持三种形式）
type NodeOptions =
    | { id: string }
    | { content: any[] }
    | { user_id: string; nickname: string; content?: any[]; id?: string };
export const cq_node = (options: NodeOptions): message_node => ({
    type: "node",
    data: options,
});

// JSON消息
export const cq_json = (jsonData: object): message_json => ({
    type: "json",
    data: { data: JSON.stringify(jsonData) },
});

// 表情包（商城表情）
export const cq_mface = (
    emoji_id: string,
    emoji_package_id: string,
    key: string,
    summary?: string
): message_mface => ({
    type: "mface",
    data: { emoji_id, emoji_package_id, key, summary },
});

// 文件消息
export const cq_file = (file: string, name?: string): message_file => ({
    type: "file",
    data: { file, ...(name && { name }) },
});

// 戳一戳（需要调用特殊接口）
export const cq_poke = (qq: string): MessagePoke => ({
    type: "poke",
    data: { qq },
});

// 链接分享
export const cq_share = (
    url: string,
    title: string,
    content?: string,
    image?: string
): MessageShare => ({
    type: "share",
    data: { url, title, content, image },
});

// 位置消息（仅接收）
export const cq_location = (
    lat: string,
    lon: string,
    title: string,
    content?: string
): MessageLocation => ({
    type: "location",
    data: { lat, lon, title, content },
});

// Markdown消息（需在转发中使用）
export const cq_markdown = (content: string): MessageMarkdown => ({
    type: "markdown",
    data: { content },
});

// 小程序卡片
export const cq_lightapp = (content: object): MessageLightApp => ({
    type: "lightapp",
    data: { content: JSON.stringify(content) },
});

// 工具方法：组合多个消息元素
export const composeMessage = (...elements: Message[]): Message[] => elements;

//QQ表情
export const emoji = {
    // 经典表情 (0-170)
    微笑: 0,
    撇嘴: 1,
    色: 2,
    发呆: 3,
    得意: 4,
    流泪: 5,
    害羞: 6,
    闭嘴: 7,
    睡: 8,
    大哭: 9,
    尴尬: 10,
    发怒: 11,
    调皮: 12,
    呲牙: 13,
    惊讶: 14,
    难过: 15,
    酷: 16,
    冷汗: 17,
    抓狂: 18,
    吐: 19,
    偷笑: 20,
    可爱: 21,
    白眼: 22,
    傲慢: 23,
    饥饿: 24,
    困: 25,
    惊恐: 26,
    流汗: 27,
    憨笑: 28,
    悠闲: 29,
    奋斗: 30,
    咒骂: 31,
    疑问: 32,
    嘘: 33,
    晕: 34,
    折磨: 35,
    衰: 36,
    骷髅: 37,
    敲打: 38,
    再见: 39,
    发抖: 41,
    爱情: 42,
    跳跳: 43,
    猪头: 45,
    拥抱: 46,
    蛋糕: 47,
    闪电: 48,
    炸弹: 49,
    刀: 50,
    足球: 51,
    便便: 52,
    咖啡: 53,
    饭: 54,
    玫瑰: 55,
    凋谢: 56,
    爱心: 66,
    心碎: 67,
    礼物: 69,
    太阳: 74,
    月亮: 75,
    赞: 76,
    踩: 77,
    握手: 78,
    胜利: 79,
    飞吻: 85,
    怄火: 86,
    西瓜: 89,
    冷汗2: 96,
    擦汗: 97,
    抠鼻: 98,
    鼓掌: 99,
    糗大了: 100,
    坏笑: 101,
    左哼哼: 102,
    右哼哼: 103,
    哈欠: 104,
    鄙视: 105,
    委屈: 106,
    快哭了: 107,
    阴险: 108,
    亲亲: 109,
    吓: 110,
    可怜: 111,
    菜刀: 112,
    啤酒: 113,
    篮球: 114,
    乒乓: 115,
    示爱: 116,
    瓢虫: 117,
    抱拳: 118,
    勾引: 119,
    拳头: 120,
    差劲: 121,
    爱你: 122,
    NO: 123,
    OK: 124,
    转圈: 125,
    磕头: 126,
    回头: 127,
    跳绳: 128,
    挥手: 129,
    激动: 130,
    街舞: 131,
    献吻: 132,
    左太极: 133,
    右太极: 134,
    双喜: 136,
    鞭炮: 137,
    灯笼: 138,
    K歌: 139,
    喝彩: 140,
    祈祷: 141,
    爆筋: 142,
    棒棒糖: 143,
    喝奶: 144,
    飞机: 145,
    钞票: 146,
    药: 147,
    手枪: 148,
    茶: 149,
    眨眼睛: 150,
    泪奔: 151,
    无奈: 152,
    卖萌: 153,
    小纠结: 154,
    喷血: 155,
    斜眼笑: 156,
    doge: 157,
    惊喜: 158,
    骚扰: 159,
    笑哭: 160,
    我最美: 161,
    河蟹: 162,
    羊驼: 163,
    幽灵: 164,
    蛋: 165,
    南瓜头: 166,
    挖鼻: 168,
    犀利: 169,

    // 小黄脸新增表情 (173-201)
    菜狗: 173,
    崇拜: 174,
    比心: 175,
    庆祝: 176,
    老色痞: 177,
    吃糖: 178,
    求红包: 179,
    谢红包: 180,
    新年快乐: 181,
    元宝: 182,
    美滋滋: 183,
    锦鲤: 184,
    豹富: 185,
    虎虎生威: 186,
    绿马护体: 187,
    拒绝: 188,
    打call: 189,
    真香: 190,
    溜了溜了: 191,
    摸鱼: 192,
    哆啦A梦震惊: 193,
    脑壳疼: 194,
    柴犬: 195,
    无眼笑: 196,
    敬礼: 197,
    狂笑: 198,
    面无表情: 199,
    哦: 200,
    请: 201,

    // 特殊系列
    加油: 212,
    我没事: 214,
    火大: 215,
    降龙十八掌: 216,
};
