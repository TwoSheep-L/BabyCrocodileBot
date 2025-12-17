export interface JSONData<T> {
    value?: T | { [key: string]: any } | null;
    error?: unknown;
    format?: string;
    success?: boolean;
}

/**
 * HTML转义字符解码函数
 */
export function decodeHtmlEntities(str: string): string {
    // 校验输入类型
    if (typeof str !== "string") {
        throw new TypeError("输入必须是字符串类型");
    }

    // 空值直接返回
    if (!str) {
        return "";
    }

    // 映射表
    const entityMap: Record<string, string> = {
        "&nbsp;": " ", // 非换行空格
        "&lt;": "<", // 小于号
        "&gt;": ">", // 大于号
        "&amp;": "&", // 和号
        "&quot;": '"', // 双引号
        "&apos;": "'", // 单引号
        "&cent;": "¢", // 分
        "&pound;": "£", // 英镑
        "&yen;": "¥", // 日元
        "&euro;": "€", // 欧元
        "&sect;": "§", // 章节符号
        "&copy;": "©", // 版权
        "&reg;": "®", // 注册商标
        "&trade;": "™", // 商标
        "&deg;": "°", // 度
        "&plusmn;": "±", // 正负号
        "&times;": "×", // 乘号
        "&divide;": "÷", // 除号
        "&frac14;": "¼", // 四分之一
        "&frac12;": "½", // 二分之一
        "&frac34;": "¾", // 四分之三
        "&middot;": "·", // 间隔号
        "&laquo;": "«", // 左双角引号
        "&raquo;": "»", // 右双角引号
        "&lsquo;": "‘", // 左单引号
        "&rsquo;": "’", // 右单引号
        "&ldquo;": "“", // 左双引号
        "&rdquo;": "”", // 右双引号
        "&ndash;": "–", // 短破折号
        "&mdash;": "—", // 长破折号
        "&hellip;": "…", // 省略号
        "&bull;": "•", // 项目符号
    };

    let decodedStr = str.replace(/&[a-zA-Z0-9]+;/g, (match) => {
        return entityMap[match] || match; // 未匹配到的实体保留原样
    });

    //处理数字实体
    decodedStr = decodedStr.replace(/&#(\d+);/g, (_, numStr) => {
        const num = parseInt(numStr, 10);
        return isNaN(num) ? _ : String.fromCharCode(num);
    });
    decodedStr = decodedStr.replace(/&#x([0-9A-Fa-f]+);/g, (_, hexStr) => {
        const num = parseInt(hexStr, 16);
        return isNaN(num) ? _ : String.fromCharCode(num);
    });

    return decodedStr;
}

/**
 * JSON解析函数
 */
export default <T>(data: string): JSONData<T | any> => {
    let res: Partial<JSONData<T>> = {};
    try {
        let json = JSON.parse(decodeHtmlEntities(data));
        res.value = json;
        res.format = JSON.stringify(json, null, "\t");
        res.success = true;
    } catch (error) {
        res.value = null;
        res.error = error;
        res.success = false;
    }
    return res;
};
