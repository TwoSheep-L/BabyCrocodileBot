export default {
    openapi: "3.0.1",
    info: {
        title: "NapCat",
        description: "",
        version: "1.0.0",
    },
    tags: [],
    paths: {
        "/send_group_msg": {
            post: {
                summary: "send_group_msg",
                deprecated: false,
                description: "发送群消息",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    message: {
                                        type: "array",
                                        items: {
                                            anyOf: [
                                                {
                                                    $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%89%BE%E7%89%B9%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                                },
                                            ],
                                        },
                                    },
                                },
                                required: ["group_id", "message"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message_id: {
                                                    type: "number",
                                                    title: "消息ID",
                                                    description: "消息ID",
                                                },
                                            },
                                            required: ["message_id"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: {
                                        message_id: 696124706,
                                    },
                                    message: "",
                                    wording: "",
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_group_forward_msg": {
            post: {
                summary: "发送群合并转发消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    messages: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/%E4%B8%80%E7%BA%A7%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF",
                                        },
                                    },
                                    news: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                text: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["text"],
                                        },
                                    },
                                    prompt: {
                                        type: "string",
                                        description: "外显",
                                    },
                                    summary: {
                                        type: "string",
                                        description: "底下文本",
                                    },
                                    source: {
                                        type: "string",
                                        description: "内容",
                                    },
                                },
                                required: [
                                    "group_id",
                                    "messages",
                                    "source",
                                    "summary",
                                    "prompt",
                                    "news",
                                ],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message_id: {
                                                    type: "number",
                                                },
                                                res_id: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["message_id", "res_id"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/forward_group_single_msg": {
            post: {
                summary: "消息转发到群",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                },
                                required: ["group_id", "message_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/group_poke": {
            post: {
                summary: "发送群聊戳一戳",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                                required: ["group_id", "user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_private_msg": {
            post: {
                summary: "send_private_msg",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    message: {
                                        type: "array",
                                        items: {
                                            anyOf: [
                                                {
                                                    $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                                },
                                            ],
                                        },
                                    },
                                },
                                required: ["user_id", "message"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message_id: {
                                                    type: "number",
                                                    title: "消息ID",
                                                    description: "消息ID",
                                                },
                                            },
                                            required: ["message_id"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_private_forward_msg": {
            post: {
                summary: "发送私聊合并转发消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    messages: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                type: {
                                                    type: "string",
                                                    const: "node",
                                                },
                                                data: {
                                                    type: "object",
                                                    properties: {
                                                        nickname: {
                                                            type: "string",
                                                        },
                                                        user_id: {
                                                            $ref: "#/components/schemas/user_id",
                                                        },
                                                        content: {
                                                            type: "array",
                                                            items: {
                                                                anyOf: [
                                                                    {
                                                                        $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/%E8%89%BE%E7%89%B9%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                                                    },
                                                                    {
                                                                        $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    },
                                                    required: [
                                                        "nickname",
                                                        "user_id",
                                                        "content",
                                                    ],
                                                },
                                            },
                                            required: ["type", "data"],
                                        },
                                    },
                                },
                                required: ["user_id", "messages"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message_id: {
                                                    type: "number",
                                                },
                                                res_id: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["message_id", "res_id"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/forward_friend_single_msg": {
            post: {
                summary: "消息转发到私聊",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                },
                                required: ["user_id", "message_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/friend_poke": {
            post: {
                summary: "发送私聊戳一戳",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/delete_msg": {
            post: {
                summary: "撤回消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                },
                                required: ["message_id"],
                            },
                            example: {
                                message: 1768656698,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_msg_history": {
            post: {
                summary: "获取群历史消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    message_seq: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                    count: {
                                        type: "number",
                                        description: "数量",
                                        default: 20,
                                    },
                                    reverseOrder: {
                                        type: "boolean",
                                        description: "倒序",
                                        default: true,
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                messages: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E6%B6%88%E6%81%AF%E8%AF%A6%E6%83%85",
                                                        required: ["message"],
                                                    },
                                                },
                                            },
                                            required: ["messages"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_msg": {
            post: {
                summary: "获取消息详情",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                },
                                required: ["message_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            $ref: "#/components/schemas/%E6%B6%88%E6%81%AF%E8%AF%A6%E6%83%85",
                                            required: ["message"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_forward_msg": {
            post: {
                summary: "获取合并转发消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        type: "string",
                                    },
                                },
                                required: ["message_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E8%8E%B7%E5%8F%96%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF",
                                                    },
                                                },
                                            },
                                            required: ["message"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_msg_emoji_like": {
            post: {
                summary: "贴表情",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                    emoji_id: {
                                        type: "number",
                                    },
                                    set: {
                                        type: "boolean",
                                    },
                                },
                                required: ["message_id", "emoji_id", "set"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_friend_msg_history": {
            post: {
                summary: "获取好友历史消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    message_seq: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                    count: {
                                        type: "number",
                                        description: "数量",
                                        default: 20,
                                    },
                                    reverseOrder: {
                                        type: "boolean",
                                        description: "倒序",
                                        default: false,
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                messages: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E6%B6%88%E6%81%AF%E8%AF%A6%E6%83%85",
                                                        required: ["message"],
                                                    },
                                                },
                                            },
                                            required: ["messages"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/fetch_emoji_like": {
            post: {
                summary: "获取贴表情详情",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                    emojiId: {
                                        type: "string",
                                        description: "表情ID",
                                    },
                                    emojiType: {
                                        type: "string",
                                        description: "表情类型",
                                    },
                                    count: {
                                        type: "number",
                                        default: 20,
                                    },
                                },
                                required: [
                                    "message_id",
                                    "emojiType",
                                    "emojiId",
                                ],
                            },
                            example: {
                                message_id: 123456,
                                emojiId: "181",
                                emojiType: "1",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                                emojiLikesList: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            tinyId: {
                                                                type: "string",
                                                            },
                                                            nickName: {
                                                                type: "string",
                                                            },
                                                            headUrl: {
                                                                type: "string",
                                                            },
                                                        },
                                                        required: [
                                                            "tinyId",
                                                            "nickName",
                                                            "headUrl",
                                                        ],
                                                    },
                                                },
                                                cookie: {
                                                    type: "string",
                                                },
                                                isLastPage: {
                                                    type: "boolean",
                                                },
                                                isFirstPage: {
                                                    type: "boolean",
                                                },
                                            },
                                            required: [
                                                "result",
                                                "isLastPage",
                                                "cookie",
                                                "errMsg",
                                                "emojiLikesList",
                                                "isFirstPage",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_forward_msg": {
            post: {
                summary: "发送合并转发消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    messages: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/%E4%B8%80%E7%BA%A7%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF",
                                        },
                                    },
                                    news: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                text: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["text"],
                                        },
                                    },
                                    prompt: {
                                        type: "string",
                                        description: "外显",
                                    },
                                    summary: {
                                        type: "string",
                                        description: "底下文本",
                                    },
                                    source: {
                                        type: "string",
                                        description: "内容",
                                    },
                                },
                                required: [
                                    "messages",
                                    "source",
                                    "summary",
                                    "prompt",
                                    "news",
                                ],
                            },
                            example:
                                '{\r\n    "group_id": 1232456,\r\n    "messages": [\r\n        {\r\n            "type": "node",\r\n            "data": {\r\n                "user_id": 925236771,\r\n                "nickname": "达艳",\r\n                "content": [\r\n                    {\r\n                        "type": "text",\r\n                        "data": {\r\n                            "text": "适配 DeepSeek 官方 API 和 Vocu 的 tss"\r\n                        }\r\n                    }\r\n                ],\r\n            }\r\n        }\r\n    ],\r\n    "news": [\r\n        {\r\n            "text": "奇怪"\r\n        }\r\n    ],\r\n    "prompt": "123",\r\n    "summary": "123",\r\n    "source": "123"\r\n}',
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {},
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_record": {
            post: {
                summary: "获取语音消息详情",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    file: {
                                        type: "string",
                                    },
                                    file_id: {
                                        type: "string",
                                    },
                                    out_format: {
                                        type: "string",
                                        enum: [
                                            "mp3",
                                            "amr",
                                            "wma",
                                            "m4a",
                                            "spx",
                                            "ogg",
                                            "wav",
                                            "flac",
                                        ],
                                    },
                                },
                                required: ["out_format"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                file: {
                                                    type: "string",
                                                    description: "本地路径",
                                                },
                                                url: {
                                                    type: "string",
                                                    description: "网络路径",
                                                },
                                                file_size: {
                                                    type: "string",
                                                    description: "文件大小",
                                                },
                                                file_name: {
                                                    type: "string",
                                                    description: "文件名",
                                                },
                                                base64: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "file",
                                                "url",
                                                "file_size",
                                                "file_name",
                                                "base64",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_image": {
            post: {
                summary: "获取图片消息详情",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    file_id: {
                                        type: "string",
                                    },
                                },
                                required: ["file_id"],
                            },
                            example: {
                                file_id: "226723D7B1EE3BF02E9CFD8236EE468B.jpg",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                file: {
                                                    type: "string",
                                                    description: "本地路径",
                                                },
                                                url: {
                                                    type: "string",
                                                    description: "网络路径",
                                                },
                                                file_size: {
                                                    type: "string",
                                                    description: "文件大小",
                                                },
                                                file_name: {
                                                    type: "string",
                                                    description: "文件名",
                                                },
                                                base64: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "file",
                                                "url",
                                                "file_size",
                                                "file_name",
                                                "base64",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_group_ai_record": {
            post: {
                summary: "发送群AI语音",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    character: {
                                        type: "string",
                                        description: "character_id",
                                    },
                                    text: {
                                        type: "string",
                                        description: "文本",
                                    },
                                },
                                required: ["group_id", "text", "character"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message_id: {
                                                    type: "string",
                                                    title: "",
                                                    description: "",
                                                },
                                            },
                                            required: ["message_id"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_remark": {
            post: {
                summary: "设置群备注",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        type: "string",
                                    },
                                    remark: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "remark"],
                            },
                            example: {
                                group_id: 819085771,
                                remark: "呀呼！！！",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_kick": {
            post: {
                summary: "群踢人",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    reject_add_request: {
                                        type: "boolean",
                                        description: "是否群拉黑",
                                    },
                                },
                                required: [
                                    "group_id",
                                    "user_id",
                                    "reject_add_request",
                                ],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_system_msg": {
            post: {
                summary: "获取群系统消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                InvitedRequest: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF",
                                                    },
                                                },
                                                join_requests: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF",
                                                    },
                                                },
                                            },
                                            required: [
                                                "InvitedRequest",
                                                "join_requests",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_ban": {
            post: {
                summary: "群禁言",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    duration: {
                                        type: "number",
                                    },
                                },
                                required: ["group_id", "user_id", "duration"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_essence_msg_list": {
            post: {
                summary: "获取群精华消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: {
                                group_id: 1012451981,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    msg_seq: {
                                                        type: "number",
                                                    },
                                                    msg_random: {
                                                        type: "number",
                                                    },
                                                    sender_id: {
                                                        type: "number",
                                                        description:
                                                            "发送人账号",
                                                    },
                                                    sender_nick: {
                                                        type: "string",
                                                        description:
                                                            "发送人昵称",
                                                    },
                                                    operator_id: {
                                                        type: "number",
                                                        description:
                                                            "设精人账号",
                                                    },
                                                    operator_nick: {
                                                        type: "string",
                                                        description:
                                                            "设精人昵称",
                                                    },
                                                    message_id: {
                                                        type: "number",
                                                    },
                                                    operator_time: {
                                                        type: "number",
                                                        description: "设精时间",
                                                    },
                                                    content: {
                                                        type: "array",
                                                        items: {
                                                            anyOf: [
                                                                {
                                                                    $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                                                },
                                                                {
                                                                    type: "object",
                                                                    properties:
                                                                        {
                                                                            type: {
                                                                                type: "string",
                                                                                const: "image",
                                                                            },
                                                                            data: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        url: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                required:
                                                                                    [
                                                                                        "url",
                                                                                    ],
                                                                            },
                                                                        },
                                                                    required: [
                                                                        "type",
                                                                        "data",
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                        description: "消息内容",
                                                    },
                                                },
                                                required: [
                                                    "msg_seq",
                                                    "message_id",
                                                    "operator_nick",
                                                    "operator_id",
                                                    "sender_nick",
                                                    "sender_id",
                                                    "msg_random",
                                                    "content",
                                                    "operator_time",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_whole_ban": {
            post: {
                summary: "全体禁言",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    enable: {
                                        type: "boolean",
                                    },
                                },
                                required: ["group_id", "enable"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_portrait": {
            post: {
                summary: "设置群头像",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "file"],
                            },
                            example:
                                '{\r\n    "group_id": 123456,\r\n    //网络路径\r\n    "file": "http://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png"\r\n    // 本地路径\r\n    //"file": "file://D:/a.jpg"\r\n                \r\n}',
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "string",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: {
                                        result: 0,
                                        errMsg: "success",
                                    },
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_admin": {
            post: {
                summary: "设置群管理",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    enable: {
                                        type: "boolean",
                                    },
                                },
                                required: ["group_id", "user_id", "enable"],
                            },
                            example: {
                                group_id: 123456,
                                user_id: 123456,
                                enable: false,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_card": {
            post: {
                summary: "设置群成员名片",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    card: {
                                        type: "string",
                                        description: "为空则为取消群名片",
                                    },
                                },
                                required: ["group_id", "user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_essence_msg": {
            post: {
                summary: "设置群精华消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                },
                                required: ["message_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                errCode: {
                                                    type: "string",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                                result: {
                                                    type: "object",
                                                    properties: {
                                                        wording: {
                                                            type: "string",
                                                            description:
                                                                "正常为空，异常有文本提示",
                                                        },
                                                        digestUin: {
                                                            type: "string",
                                                        },
                                                        digestTime: {
                                                            type: "number",
                                                        },
                                                        msg: {
                                                            type: "object",
                                                            properties: {},
                                                        },
                                                        errorCode: {
                                                            type: "number",
                                                        },
                                                    },
                                                    required: [
                                                        "wording",
                                                        "errorCode",
                                                        "msg",
                                                        "digestTime",
                                                        "digestUin",
                                                    ],
                                                },
                                            },
                                            required: [
                                                "errCode",
                                                "result",
                                                "errMsg",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: {
                                        errCode: 0,
                                        errMsg: "success",
                                        result: {
                                            wording: "",
                                            digestUin: "0",
                                            digestTime: 0,
                                            msg: {
                                                groupCode: "0",
                                                msgSeq: 0,
                                                msgRandom: 0,
                                                msgContent: [],
                                                textSize: "0",
                                                picSize: "0",
                                                videoSize: "0",
                                                senderUin: "0",
                                                senderTime: 0,
                                                addDigestUin: "0",
                                                addDigestTime: 0,
                                                startTime: 0,
                                                latestMsgSeq: 0,
                                                opType: 0,
                                            },
                                            errorCode: 0,
                                        },
                                    },
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_name": {
            post: {
                summary: "设置群名",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    group_name: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "group_name"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/delete_essence_msg": {
            post: {
                summary: "删除群精华消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_id: {
                                        $ref: "#/components/schemas/message_id",
                                    },
                                },
                                required: ["message_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                errCode: {
                                                    type: "string",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                                result: {
                                                    type: "object",
                                                    properties: {
                                                        wording: {
                                                            type: "string",
                                                            description:
                                                                "正常为空，异常有文本提示",
                                                        },
                                                        digestUin: {
                                                            type: "string",
                                                        },
                                                        digestTime: {
                                                            type: "string",
                                                        },
                                                        msg: {
                                                            type: "object",
                                                            properties: {},
                                                        },
                                                    },
                                                    required: [
                                                        "wording",
                                                        "digestTime",
                                                        "digestUin",
                                                        "msg",
                                                    ],
                                                },
                                            },
                                            required: [
                                                "errCode",
                                                "result",
                                                "errMsg",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: {
                                        errCode: 0,
                                        errMsg: "success",
                                        result: {
                                            wording: "",
                                            digestUin: "0",
                                            digestTime: 0,
                                            msg: {
                                                groupCode: "0",
                                                msgSeq: 0,
                                                msgRandom: 0,
                                                msgContent: [],
                                                textSize: "0",
                                                picSize: "0",
                                                videoSize: "0",
                                                senderUin: "0",
                                                senderTime: 0,
                                                addDigestUin: "0",
                                                addDigestTime: 0,
                                                startTime: 0,
                                                latestMsgSeq: 0,
                                                opType: 0,
                                            },
                                            errorCode: 0,
                                        },
                                    },
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_leave": {
            post: {
                summary: "退群",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    is_dismiss: {
                                        type: "boolean",
                                    },
                                },
                                required: ["group_id"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/_send_group_notice": {
            post: {
                summary: "_发送群公告",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    content: {
                                        type: "string",
                                        description: "内容",
                                    },
                                    image: {
                                        type: "string",
                                        description: "图片路径",
                                    },
                                    pinned: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                    type: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                    confirm_required: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                    is_show_edit_card: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                    tip_window_type: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                },
                                required: ["group_id", "content"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_special_title": {
            post: {
                summary: "设置群头衔",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    special_title: {
                                        type: "string",
                                        description: "为空则取消头衔",
                                    },
                                },
                                required: ["group_id", "user_id"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/_get_group_notice": {
            post: {
                summary: "_获取群公告",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    notice_id: {
                                                        type: "string",
                                                    },
                                                    sender_id: {
                                                        type: "number",
                                                        description:
                                                            "发送人账号",
                                                    },
                                                    publish_time: {
                                                        type: "number",
                                                        description: "发送时间",
                                                    },
                                                    message: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                id: {
                                                                    type: "string",
                                                                },
                                                                height: {
                                                                    type: "string",
                                                                },
                                                                width: {
                                                                    type: "string",
                                                                },
                                                            },
                                                            required: [
                                                                "id",
                                                                "height",
                                                                "width",
                                                            ],
                                                        },
                                                    },
                                                },
                                                required: [
                                                    "notice_id",
                                                    "sender_id",
                                                    "publish_time",
                                                    "message",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: [
                                        {
                                            notice_id:
                                                "63491e2f000000004f4d1e677d2b0200",
                                            sender_id: 123,
                                            publish_time: 1730039119,
                                            message: {
                                                text: "这是一条神奇的群公告",
                                                image: [
                                                    {
                                                        id: "aJJBbZ6BqyLiaC1kmpvIWGBBkJerEfpRBHX5Brxbaurs",
                                                        height: "400",
                                                        width: "400",
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_add_request": {
            post: {
                summary: "处理加群请求",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    flag: {
                                        type: "string",
                                        description: "请求id",
                                    },
                                    approve: {
                                        type: "boolean",
                                        description: "是否同意",
                                    },
                                    reason: {
                                        type: "string",
                                        description: "拒绝理由",
                                    },
                                },
                                required: ["flag", "approve"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_info": {
            post: {
                summary: "获取群信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            $ref: "#/components/schemas/%E7%BE%A4%E4%BF%A1%E6%81%AF",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_list": {
            post: {
                summary: "获取群列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    no_cache: {
                                        type: "boolean",
                                        default: false,
                                        description: "不缓存",
                                    },
                                },
                                required: ["no_cache"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/%E7%BE%A4%E4%BF%A1%E6%81%AF",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/_del_group_notice": {
            post: {
                summary: "_删除群公告",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    notice_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "notice_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_member_info": {
            post: {
                summary: "获取群成员信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    no_cache: {
                                        type: "boolean",
                                    },
                                },
                                required: ["group_id", "user_id", "no_cache"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            $ref: "#/components/schemas/%E7%BE%A4%E6%88%90%E5%91%98%E4%BF%A1%E6%81%AF",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_member_list": {
            post: {
                summary: "获取群成员列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    no_cache: {
                                        type: "boolean",
                                        default: false,
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/%E7%BE%A4%E6%88%90%E5%91%98%E4%BF%A1%E6%81%AF",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_honor_info": {
            post: {
                summary: "获取群荣誉",
                deprecated: false,
                description:
                    "|  type                   |         类型                    |\n|  ----------------- | ------------------------ |\n| all                       |  所有（默认）             |\n| talkative              | 群聊之火                     |\n| performer           | 群聊炽焰                     |\n| legend                | 龙王                             |\n| strong_newbie   | 冒尖小春笋（R.I.P）     |\n| emotion              | 快乐源泉                      |",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    type: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                group_id: {
                                                    type: "string",
                                                },
                                                current_talkative: {
                                                    description: "当前龙王",
                                                    $ref: "#/components/schemas/%E7%BE%A4%E8%8D%A3%E8%AA%89%E4%BF%A1%E6%81%AF",
                                                },
                                                talkative_list: {
                                                    type: "array",
                                                    items: {
                                                        description: "当前龙王",
                                                        $ref: "#/components/schemas/%E7%BE%A4%E8%8D%A3%E8%AA%89%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "群聊之火",
                                                },
                                                performer_list: {
                                                    type: "array",
                                                    items: {
                                                        description: "当前龙王",
                                                        $ref: "#/components/schemas/%E7%BE%A4%E8%8D%A3%E8%AA%89%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "群聊炽焰",
                                                },
                                                legend_list: {
                                                    type: "array",
                                                    items: {
                                                        description: "当前龙王",
                                                        $ref: "#/components/schemas/%E7%BE%A4%E8%8D%A3%E8%AA%89%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "龙王",
                                                },
                                                emotion_list: {
                                                    type: "array",
                                                    items: {
                                                        description: "当前龙王",
                                                        $ref: "#/components/schemas/%E7%BE%A4%E8%8D%A3%E8%AA%89%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "快乐源泉",
                                                },
                                                strong_newbie_list: {
                                                    type: "array",
                                                    items: {
                                                        description: "当前龙王",
                                                        $ref: "#/components/schemas/%E7%BE%A4%E8%8D%A3%E8%AA%89%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "冒尖小春笋",
                                                },
                                            },
                                            required: [
                                                "group_id",
                                                "current_talkative",
                                                "talkative_list",
                                                "performer_list",
                                                "legend_list",
                                                "emotion_list",
                                                "strong_newbie_list",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_info_ex": {
            post: {
                summary: "获取群信息ex",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                groupCode: {
                                                    type: "string",
                                                },
                                                resultCode: {
                                                    type: "number",
                                                },
                                                extInfo: {
                                                    type: "object",
                                                    properties: {
                                                        groupInfoExtSeq: {
                                                            type: "number",
                                                        },
                                                        reserve: {
                                                            type: "number",
                                                        },
                                                        luckyWordId: {
                                                            type: "string",
                                                        },
                                                        lightCharNum: {
                                                            type: "number",
                                                        },
                                                        luckyWord: {
                                                            type: "string",
                                                        },
                                                        starId: {
                                                            type: "number",
                                                        },
                                                        essentialMsgSwitch: {
                                                            type: "number",
                                                        },
                                                        todoSeq: {
                                                            type: "number",
                                                        },
                                                        blacklistExpireTime: {
                                                            type: "number",
                                                        },
                                                        isLimitGroupRtc: {
                                                            type: "number",
                                                        },
                                                        companyId: {
                                                            type: "number",
                                                        },
                                                        hasGroupCustomPortrait:
                                                            {
                                                                type: "number",
                                                            },
                                                        bindGuildId: {
                                                            type: "string",
                                                        },
                                                        groupOwnerId: {
                                                            type: "object",
                                                            properties: {
                                                                memberUin: {
                                                                    type: "string",
                                                                },
                                                                memberUid: {
                                                                    type: "string",
                                                                },
                                                                memberQid: {
                                                                    type: "string",
                                                                },
                                                            },
                                                            required: [
                                                                "memberUin",
                                                                "memberUid",
                                                                "memberQid",
                                                            ],
                                                        },
                                                        essentialMsgPrivilege: {
                                                            type: "number",
                                                        },
                                                        msgEventSeq: {
                                                            type: "string",
                                                        },
                                                        inviteRobotSwitch: {
                                                            type: "number",
                                                        },
                                                        gangUpId: {
                                                            type: "string",
                                                        },
                                                        qqMusicMedalSwitch: {
                                                            type: "number",
                                                        },
                                                        showPlayTogetherSwitch:
                                                            {
                                                                type: "number",
                                                            },
                                                        groupFlagPro1: {
                                                            type: "string",
                                                        },
                                                        groupBindGuildIds: {
                                                            type: "object",
                                                            properties: {
                                                                guildIds: {
                                                                    type: "array",
                                                                    items: {
                                                                        type: "string",
                                                                    },
                                                                },
                                                            },
                                                            required: [
                                                                "guildIds",
                                                            ],
                                                        },
                                                        viewedMsgDisappearTime:
                                                            {
                                                                type: "string",
                                                            },
                                                        groupExtFlameData: {
                                                            type: "object",
                                                            properties: {
                                                                switchState: {
                                                                    type: "integer",
                                                                },
                                                                state: {
                                                                    type: "integer",
                                                                },
                                                                dayNums: {
                                                                    type: "array",
                                                                    items: {
                                                                        type: "string",
                                                                    },
                                                                },
                                                                version: {
                                                                    type: "integer",
                                                                },
                                                                updateTime: {
                                                                    type: "string",
                                                                },
                                                                isDisplayDayNum:
                                                                    {
                                                                        type: "boolean",
                                                                    },
                                                            },
                                                            required: [
                                                                "switchState",
                                                                "state",
                                                                "dayNums",
                                                                "version",
                                                                "updateTime",
                                                                "isDisplayDayNum",
                                                            ],
                                                        },
                                                        groupBindGuildSwitch: {
                                                            type: "number",
                                                        },
                                                        groupAioBindGuildId: {
                                                            type: "string",
                                                        },
                                                        groupExcludeGuildIds: {
                                                            type: "object",
                                                            properties: {
                                                                guildIds: {
                                                                    type: "array",
                                                                    items: {
                                                                        type: "string",
                                                                    },
                                                                },
                                                            },
                                                            required: [
                                                                "guildIds",
                                                            ],
                                                        },
                                                        fullGroupExpansionSwitch:
                                                            {
                                                                type: "number",
                                                            },
                                                        fullGroupExpansionSeq: {
                                                            type: "string",
                                                        },
                                                        inviteRobotMemberSwitch:
                                                            {
                                                                type: "number",
                                                            },
                                                        inviteRobotMemberExamine:
                                                            {
                                                                type: "number",
                                                            },
                                                        groupSquareSwitch: {
                                                            type: "number",
                                                        },
                                                    },
                                                    required: [
                                                        "groupInfoExtSeq",
                                                        "reserve",
                                                        "luckyWordId",
                                                        "lightCharNum",
                                                        "luckyWord",
                                                        "starId",
                                                        "essentialMsgSwitch",
                                                        "todoSeq",
                                                        "blacklistExpireTime",
                                                        "isLimitGroupRtc",
                                                        "companyId",
                                                        "hasGroupCustomPortrait",
                                                        "bindGuildId",
                                                        "groupOwnerId",
                                                        "essentialMsgPrivilege",
                                                        "msgEventSeq",
                                                        "inviteRobotSwitch",
                                                        "gangUpId",
                                                        "qqMusicMedalSwitch",
                                                        "showPlayTogetherSwitch",
                                                        "groupFlagPro1",
                                                        "groupBindGuildIds",
                                                        "viewedMsgDisappearTime",
                                                        "groupExtFlameData",
                                                        "groupBindGuildSwitch",
                                                        "groupAioBindGuildId",
                                                        "groupExcludeGuildIds",
                                                        "fullGroupExpansionSwitch",
                                                        "fullGroupExpansionSeq",
                                                        "inviteRobotMemberSwitch",
                                                        "inviteRobotMemberExamine",
                                                        "groupSquareSwitch",
                                                    ],
                                                },
                                            },
                                            required: [
                                                "groupCode",
                                                "resultCode",
                                                "extInfo",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "null",
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: {
                                        groupCode: "790514019",
                                        resultCode: 0,
                                        extInfo: {
                                            groupInfoExtSeq: 1,
                                            reserve: 0,
                                            luckyWordId: "0",
                                            lightCharNum: 0,
                                            luckyWord: "",
                                            starId: 0,
                                            essentialMsgSwitch: 0,
                                            todoSeq: 0,
                                            blacklistExpireTime: 0,
                                            isLimitGroupRtc: 0,
                                            companyId: 0,
                                            hasGroupCustomPortrait: 1,
                                            bindGuildId: "0",
                                            groupOwnerId: {
                                                memberUin: "1129317309",
                                                memberUid:
                                                    "u_4_QA-QaFryh-Ocgsv4_8EQ",
                                                memberQid: "",
                                            },
                                            essentialMsgPrivilege: 0,
                                            msgEventSeq: "0",
                                            inviteRobotSwitch: 0,
                                            gangUpId: "0",
                                            qqMusicMedalSwitch: 0,
                                            showPlayTogetherSwitch: 0,
                                            groupFlagPro1: "0",
                                            groupBindGuildIds: {
                                                guildIds: [],
                                            },
                                            viewedMsgDisappearTime: "0",
                                            groupExtFlameData: {
                                                switchState: 0,
                                                state: 0,
                                                dayNums: [],
                                                version: 0,
                                                updateTime: "0",
                                                isDisplayDayNum: false,
                                            },
                                            groupBindGuildSwitch: 0,
                                            groupAioBindGuildId: "0",
                                            groupExcludeGuildIds: {
                                                guildIds: [],
                                            },
                                            fullGroupExpansionSwitch: 0,
                                            fullGroupExpansionSeq: "0",
                                            inviteRobotMemberSwitch: 0,
                                            inviteRobotMemberExamine: 0,
                                            groupSquareSwitch: 0,
                                        },
                                    },
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_at_all_remain": {
            post: {
                summary: "获取群 @全体成员 剩余次数",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                can_at_all: {
                                                    type: "boolean",
                                                },
                                                remain_at_all_count_for_group: {
                                                    type: "number",
                                                },
                                                remain_at_all_count_for_uin: {
                                                    type: "number",
                                                },
                                            },
                                            required: [
                                                "can_at_all",
                                                "remain_at_all_count_for_uin",
                                                "remain_at_all_count_for_group",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_shut_list": {
            post: {
                summary: "获取群禁言列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    uid: {
                                                        type: "string",
                                                    },
                                                    qid: {
                                                        type: "string",
                                                    },
                                                    uin: {
                                                        type: "string",
                                                    },
                                                    nick: {
                                                        type: "string",
                                                    },
                                                    remark: {
                                                        type: "string",
                                                    },
                                                    cardType: {
                                                        type: "number",
                                                    },
                                                    cardName: {
                                                        type: "string",
                                                    },
                                                    role: {
                                                        type: "number",
                                                    },
                                                    avatarPath: {
                                                        type: "string",
                                                    },
                                                    shutUpTime: {
                                                        type: "number",
                                                        description: "解禁时间",
                                                    },
                                                    isDelete: {
                                                        type: "boolean",
                                                    },
                                                    isSpecialConcerned: {
                                                        type: "boolean",
                                                    },
                                                    isSpecialShield: {
                                                        type: "boolean",
                                                    },
                                                    isRobot: {
                                                        type: "boolean",
                                                    },
                                                    groupHonor: {
                                                        type: "object",
                                                        properties: {},
                                                    },
                                                    memberRealLevel: {
                                                        type: "number",
                                                        description: "群聊等级",
                                                    },
                                                    memberLevel: {
                                                        type: "number",
                                                    },
                                                    globalGroupLevel: {
                                                        type: "number",
                                                    },
                                                    globalGroupPoint: {
                                                        type: "number",
                                                    },
                                                    memberTitleId: {
                                                        type: "number",
                                                    },
                                                    memberSpecialTitle: {
                                                        type: "string",
                                                    },
                                                    specialTitleExpireTime: {
                                                        type: "string",
                                                    },
                                                    userShowFlag: {
                                                        type: "number",
                                                    },
                                                    userShowFlagNew: {
                                                        type: "number",
                                                    },
                                                    richFlag: {
                                                        type: "number",
                                                    },
                                                    mssVipType: {
                                                        type: "number",
                                                    },
                                                    bigClubLevel: {
                                                        type: "number",
                                                    },
                                                    bigClubFlag: {
                                                        type: "number",
                                                    },
                                                    autoRemark: {
                                                        type: "string",
                                                    },
                                                    creditLevel: {
                                                        type: "number",
                                                    },
                                                    joinTime: {
                                                        type: "number",
                                                        description: "入群时间",
                                                    },
                                                    lastSpeakTime: {
                                                        type: "number",
                                                        description:
                                                            "最后发言时间",
                                                    },
                                                    memberFlag: {
                                                        type: "number",
                                                    },
                                                    memberFlagExt: {
                                                        type: "number",
                                                    },
                                                    memberMobileFlag: {
                                                        type: "number",
                                                    },
                                                    memberFlagExt2: {
                                                        type: "number",
                                                    },
                                                    isSpecialShielded: {
                                                        type: "boolean",
                                                    },
                                                    cardNameId: {
                                                        type: "number",
                                                    },
                                                },
                                                required: [
                                                    "uid",
                                                    "globalGroupLevel",
                                                    "cardName",
                                                    "cardType",
                                                    "remark",
                                                    "nick",
                                                    "uin",
                                                    "qid",
                                                    "isRobot",
                                                    "isSpecialShield",
                                                    "isSpecialConcerned",
                                                    "isDelete",
                                                    "shutUpTime",
                                                    "role",
                                                    "avatarPath",
                                                    "memberLevel",
                                                    "memberRealLevel",
                                                    "groupHonor",
                                                    "memberFlagExt",
                                                    "memberFlag",
                                                    "lastSpeakTime",
                                                    "memberSpecialTitle",
                                                    "memberTitleId",
                                                    "globalGroupPoint",
                                                    "joinTime",
                                                    "userShowFlagNew",
                                                    "userShowFlag",
                                                    "specialTitleExpireTime",
                                                    "bigClubFlag",
                                                    "bigClubLevel",
                                                    "mssVipType",
                                                    "richFlag",
                                                    "autoRemark",
                                                    "creditLevel",
                                                    "cardNameId",
                                                    "isSpecialShielded",
                                                    "memberMobileFlag",
                                                    "memberFlagExt2",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_ignored_notifies": {
            post: {
                summary: "获取群过滤系统消息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                InvitedRequest: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF",
                                                    },
                                                },
                                                join_requests: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF",
                                                    },
                                                },
                                            },
                                            required: [
                                                "join_requests",
                                                "InvitedRequest",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_group_sign": {
            post: {
                summary: "群打卡",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_group_sign": {
            post: {
                summary: "群打卡",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_clientkey": {
            post: {
                summary: "获取clientkey",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                clientkey: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["clientkey"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_cookies": {
            post: {
                summary: "获取cookies",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    domain: {
                                        type: "string",
                                    },
                                },
                                required: ["domain"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                cookies: {
                                                    type: "string",
                                                },
                                                bkn: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["cookies", "bkn"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_csrf_token": {
            post: {
                summary: "获取 CSRF Token",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                token: {
                                                    type: "number",
                                                },
                                            },
                                            required: ["token"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_credentials": {
            post: {
                summary: "获取 QQ 相关接口凭证",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    domain: {
                                        type: "string",
                                    },
                                },
                                required: ["domain"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                cookies: {
                                                    type: "string",
                                                },
                                                token: {
                                                    type: "number",
                                                },
                                            },
                                            required: ["cookies", "token"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/nc_get_rkey": {
            post: {
                summary: "nc获取rkey",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    rkey: {
                                                        type: "string",
                                                    },
                                                    ttl: {
                                                        type: "string",
                                                    },
                                                    time: {
                                                        type: "number",
                                                    },
                                                    type: {
                                                        type: "number",
                                                    },
                                                },
                                                required: [
                                                    "rkey",
                                                    "type",
                                                    "time",
                                                    "ttl",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_rkey": {
            post: {
                summary: "获取rkey",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    type: {
                                                        type: "string",
                                                    },
                                                    rkey: {
                                                        type: "string",
                                                    },
                                                    created_at: {
                                                        type: "number",
                                                    },
                                                    ttl: {
                                                        type: "string",
                                                    },
                                                },
                                                required: [
                                                    "rkey",
                                                    "type",
                                                    "created_at",
                                                    "ttl",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_rkey_server": {
            post: {
                summary: "获取rkey服务",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                private_rkey: {
                                                    type: "string",
                                                },
                                                group_rkey: {
                                                    type: "string",
                                                },
                                                expired_time: {
                                                    type: "number",
                                                },
                                                name: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "private_rkey",
                                                "name",
                                                "expired_time",
                                                "group_rkey",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/ocr_image": {
            post: {
                summary: "OCR 图片识别",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    image: {
                                        type: "string",
                                    },
                                },
                                required: ["image"],
                            },
                            example:
                                '{\r\n    "image": "https://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png"\r\n    // 本地路径\r\n    //"image": "file://D:/a.jpg"\r\n}',
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    text: {
                                                        type: "string",
                                                        description:
                                                            "该行文本总和",
                                                    },
                                                    pt1: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    pt2: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    pt3: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    pt4: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    charBox: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                charText: {
                                                                    type: "string",
                                                                },
                                                                charBox: {
                                                                    type: "object",
                                                                    properties:
                                                                        {
                                                                            pt1: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                            pt2: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                            pt3: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                            pt4: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                        },
                                                                    required: [
                                                                        "pt1",
                                                                        "pt4",
                                                                        "pt3",
                                                                        "pt2",
                                                                    ],
                                                                },
                                                            },
                                                            required: [
                                                                "charText",
                                                                "charBox",
                                                            ],
                                                        },
                                                        description: "拆分",
                                                    },
                                                    score: {
                                                        type: "string",
                                                    },
                                                },
                                                required: [
                                                    "text",
                                                    "pt4",
                                                    "pt3",
                                                    "pt2",
                                                    "pt1",
                                                    "charBox",
                                                    "score",
                                                ],
                                                description: "一个代表一行",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: [
                                        {
                                            text: "nU",
                                            pt1: {
                                                x: "25.930853",
                                                y: "1.711797",
                                            },
                                            pt2: {
                                                x: "72.461205",
                                                y: "2.745806",
                                            },
                                            pt3: {
                                                x: "72.193184",
                                                y: "14.806514",
                                            },
                                            pt4: {
                                                x: "25.662836",
                                                y: "13.772506",
                                            },
                                            charBox: [
                                                {
                                                    charText: "nU",
                                                    charBox: {
                                                        pt1: {
                                                            x: "41.186707",
                                                            y: "2.050816",
                                                        },
                                                        pt2: {
                                                            x: "56.442558",
                                                            y: "2.389835",
                                                        },
                                                        pt3: {
                                                            x: "56.182915",
                                                            y: "14.073647",
                                                        },
                                                        pt4: {
                                                            x: "40.927063",
                                                            y: "13.734628",
                                                        },
                                                    },
                                                },
                                            ],
                                            score: "",
                                        },
                                        {
                                            text: "yion in",
                                            pt1: {
                                                x: "40.310081",
                                                y: "19.155090",
                                            },
                                            pt2: {
                                                x: "92.413017",
                                                y: "17.004047",
                                            },
                                            pt3: {
                                                x: "93.224297",
                                                y: "36.654957",
                                            },
                                            pt4: {
                                                x: "41.121365",
                                                y: "38.806000",
                                            },
                                            charBox: [
                                                {
                                                    charText: "yion",
                                                    charBox: {
                                                        pt1: {
                                                            x: "40.310081",
                                                            y: "19.155090",
                                                        },
                                                        pt2: {
                                                            x: "66.660988",
                                                            y: "18.067207",
                                                        },
                                                        pt3: {
                                                            x: "67.446922",
                                                            y: "37.104027",
                                                        },
                                                        pt4: {
                                                            x: "41.096012",
                                                            y: "38.191910",
                                                        },
                                                    },
                                                },
                                                {
                                                    charText: " ",
                                                    charBox: {
                                                        pt1: {
                                                            x: "66.660988",
                                                            y: "18.067207",
                                                        },
                                                        pt2: {
                                                            x: "73.847603",
                                                            y: "17.770512",
                                                        },
                                                        pt3: {
                                                            x: "74.633530",
                                                            y: "36.807331",
                                                        },
                                                        pt4: {
                                                            x: "67.446922",
                                                            y: "37.104027",
                                                        },
                                                    },
                                                },
                                                {
                                                    charText: "in",
                                                    charBox: {
                                                        pt1: {
                                                            x: "73.847603",
                                                            y: "17.770512",
                                                        },
                                                        pt2: {
                                                            x: "85.825287",
                                                            y: "17.276018",
                                                        },
                                                        pt3: {
                                                            x: "86.611214",
                                                            y: "36.312836",
                                                        },
                                                        pt4: {
                                                            x: "74.633530",
                                                            y: "36.807331",
                                                        },
                                                    },
                                                },
                                            ],
                                            score: "",
                                        },
                                        {
                                            text: "mlHttp.",
                                            pt1: {
                                                x: "6.956338",
                                                y: "61.610126",
                                            },
                                            pt2: {
                                                x: "72.331848",
                                                y: "65.844292",
                                            },
                                            pt3: {
                                                x: "71.104248",
                                                y: "84.798470",
                                            },
                                            pt4: {
                                                x: "5.728738",
                                                y: "80.564301",
                                            },
                                            charBox: [
                                                {
                                                    charText: "mlHttp",
                                                    charBox: {
                                                        pt1: {
                                                            x: "9.230268",
                                                            y: "61.757401",
                                                        },
                                                        pt2: {
                                                            x: "61.530674",
                                                            y: "65.144737",
                                                        },
                                                        pt3: {
                                                            x: "60.341438",
                                                            y: "83.506592",
                                                        },
                                                        pt4: {
                                                            x: "8.041031",
                                                            y: "80.119255",
                                                        },
                                                    },
                                                },
                                                {
                                                    charText: ".",
                                                    charBox: {
                                                        pt1: {
                                                            x: "63.804607",
                                                            y: "65.292007",
                                                        },
                                                        pt2: {
                                                            x: "70.626396",
                                                            y: "65.733833",
                                                        },
                                                        pt3: {
                                                            x: "69.437164",
                                                            y: "84.095695",
                                                        },
                                                        pt4: {
                                                            x: "62.615368",
                                                            y: "83.653870",
                                                        },
                                                    },
                                                },
                                            ],
                                            score: "",
                                        },
                                    ],
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/.ocr_image": {
            post: {
                summary: ".OCR 图片识别",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    image: {
                                        type: "string",
                                    },
                                },
                                required: ["image"],
                            },
                            example:
                                '{\r\n    "image": "https://assets.cdn.ifixit.com/static/images/home/search-hero-backgrounds/car_tire-2180.avif"\r\n    // 本地路径\r\n    //"image": "file://D:/a.jpg"\r\n}',
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    text: {
                                                        type: "string",
                                                        description:
                                                            "该行文本总和",
                                                    },
                                                    pt1: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    pt2: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    pt3: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    pt4: {
                                                        type: "object",
                                                        properties: {
                                                            x: {
                                                                type: "string",
                                                            },
                                                            y: {
                                                                type: "string",
                                                            },
                                                        },
                                                        description: "顶点坐标",
                                                        required: ["x", "y"],
                                                    },
                                                    charBox: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                charText: {
                                                                    type: "string",
                                                                },
                                                                charBox: {
                                                                    type: "object",
                                                                    properties:
                                                                        {
                                                                            pt1: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                            pt2: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                            pt3: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                            pt4: {
                                                                                type: "object",
                                                                                properties:
                                                                                    {
                                                                                        x: {
                                                                                            type: "string",
                                                                                        },
                                                                                        y: {
                                                                                            type: "string",
                                                                                        },
                                                                                    },
                                                                                description:
                                                                                    "顶点坐标",
                                                                                required:
                                                                                    [
                                                                                        "x",
                                                                                        "y",
                                                                                    ],
                                                                            },
                                                                        },
                                                                    required: [
                                                                        "pt1",
                                                                        "pt4",
                                                                        "pt3",
                                                                        "pt2",
                                                                    ],
                                                                },
                                                            },
                                                            required: [
                                                                "charText",
                                                                "charBox",
                                                            ],
                                                        },
                                                        description: "拆分",
                                                    },
                                                    score: {
                                                        type: "string",
                                                    },
                                                },
                                                required: [
                                                    "text",
                                                    "pt4",
                                                    "pt3",
                                                    "pt2",
                                                    "pt1",
                                                    "charBox",
                                                    "score",
                                                ],
                                                description: "一个代表一行",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: [
                                        {
                                            text: "nU",
                                            pt1: {
                                                x: "25.930853",
                                                y: "1.711797",
                                            },
                                            pt2: {
                                                x: "72.461205",
                                                y: "2.745806",
                                            },
                                            pt3: {
                                                x: "72.193184",
                                                y: "14.806514",
                                            },
                                            pt4: {
                                                x: "25.662836",
                                                y: "13.772506",
                                            },
                                            charBox: [
                                                {
                                                    charText: "nU",
                                                    charBox: {
                                                        pt1: {
                                                            x: "41.186707",
                                                            y: "2.050816",
                                                        },
                                                        pt2: {
                                                            x: "56.442558",
                                                            y: "2.389835",
                                                        },
                                                        pt3: {
                                                            x: "56.182915",
                                                            y: "14.073647",
                                                        },
                                                        pt4: {
                                                            x: "40.927063",
                                                            y: "13.734628",
                                                        },
                                                    },
                                                },
                                            ],
                                            score: "",
                                        },
                                        {
                                            text: "yion in",
                                            pt1: {
                                                x: "40.310081",
                                                y: "19.155090",
                                            },
                                            pt2: {
                                                x: "92.413017",
                                                y: "17.004047",
                                            },
                                            pt3: {
                                                x: "93.224297",
                                                y: "36.654957",
                                            },
                                            pt4: {
                                                x: "41.121365",
                                                y: "38.806000",
                                            },
                                            charBox: [
                                                {
                                                    charText: "yion",
                                                    charBox: {
                                                        pt1: {
                                                            x: "40.310081",
                                                            y: "19.155090",
                                                        },
                                                        pt2: {
                                                            x: "66.660988",
                                                            y: "18.067207",
                                                        },
                                                        pt3: {
                                                            x: "67.446922",
                                                            y: "37.104027",
                                                        },
                                                        pt4: {
                                                            x: "41.096012",
                                                            y: "38.191910",
                                                        },
                                                    },
                                                },
                                                {
                                                    charText: " ",
                                                    charBox: {
                                                        pt1: {
                                                            x: "66.660988",
                                                            y: "18.067207",
                                                        },
                                                        pt2: {
                                                            x: "73.847603",
                                                            y: "17.770512",
                                                        },
                                                        pt3: {
                                                            x: "74.633530",
                                                            y: "36.807331",
                                                        },
                                                        pt4: {
                                                            x: "67.446922",
                                                            y: "37.104027",
                                                        },
                                                    },
                                                },
                                                {
                                                    charText: "in",
                                                    charBox: {
                                                        pt1: {
                                                            x: "73.847603",
                                                            y: "17.770512",
                                                        },
                                                        pt2: {
                                                            x: "85.825287",
                                                            y: "17.276018",
                                                        },
                                                        pt3: {
                                                            x: "86.611214",
                                                            y: "36.312836",
                                                        },
                                                        pt4: {
                                                            x: "74.633530",
                                                            y: "36.807331",
                                                        },
                                                    },
                                                },
                                            ],
                                            score: "",
                                        },
                                        {
                                            text: "mlHttp.",
                                            pt1: {
                                                x: "6.956338",
                                                y: "61.610126",
                                            },
                                            pt2: {
                                                x: "72.331848",
                                                y: "65.844292",
                                            },
                                            pt3: {
                                                x: "71.104248",
                                                y: "84.798470",
                                            },
                                            pt4: {
                                                x: "5.728738",
                                                y: "80.564301",
                                            },
                                            charBox: [
                                                {
                                                    charText: "mlHttp",
                                                    charBox: {
                                                        pt1: {
                                                            x: "9.230268",
                                                            y: "61.757401",
                                                        },
                                                        pt2: {
                                                            x: "61.530674",
                                                            y: "65.144737",
                                                        },
                                                        pt3: {
                                                            x: "60.341438",
                                                            y: "83.506592",
                                                        },
                                                        pt4: {
                                                            x: "8.041031",
                                                            y: "80.119255",
                                                        },
                                                    },
                                                },
                                                {
                                                    charText: ".",
                                                    charBox: {
                                                        pt1: {
                                                            x: "63.804607",
                                                            y: "65.292007",
                                                        },
                                                        pt2: {
                                                            x: "70.626396",
                                                            y: "65.733833",
                                                        },
                                                        pt3: {
                                                            x: "69.437164",
                                                            y: "84.095695",
                                                        },
                                                        pt4: {
                                                            x: "62.615368",
                                                            y: "83.653870",
                                                        },
                                                    },
                                                },
                                            ],
                                            score: "",
                                        },
                                    ],
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/translate_en2zh": {
            post: {
                summary: "英译中",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    words: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                        },
                                        description: "英文数组",
                                    },
                                },
                                required: ["words"],
                            },
                            example: {
                                words: ["word", "message", "group"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: ["单词", "讯息", "群组"],
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_input_status": {
            post: {
                summary: "设置输入状态",
                deprecated: false,
                description:
                    '## 状态列表\n\n### 对方正在说话...\n```json5\n{ "event_type": 0 } \n```\n\n### 对方正在输入...\n```json5\n{ "event_type": 1 } \n```\n\n',
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    event_type: {
                                        type: "number",
                                    },
                                },
                                required: ["event_type", "user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/.handle_quick_operation": {
            post: {
                summary: ".对事件执行快速操作",
                deprecated: false,
                description: "相当于http的快速操作",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    context: {
                                        type: "object",
                                        properties: {},
                                        description: "事件数据对象",
                                    },
                                    operation: {
                                        type: "object",
                                        properties: {},
                                        description: "快速操作对象",
                                    },
                                },
                                required: ["context", "operation"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/can_send_image": {
            post: {
                summary: "检查是否可以发送图片",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                yes: {
                                                    type: "boolean",
                                                },
                                            },
                                            required: ["yes"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/can_send_record": {
            post: {
                summary: "检查是否可以发送语音",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                yes: {
                                                    type: "boolean",
                                                },
                                            },
                                            required: ["yes"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_ai_characters": {
            post: {
                summary: "获取AI语音人物",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    chat_type: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    type: {
                                                        type: "string",
                                                        description: "类型",
                                                    },
                                                    characters: {
                                                        type: "array",
                                                        items: {
                                                            type: "object",
                                                            properties: {
                                                                character_id: {
                                                                    type: "string",
                                                                    description:
                                                                        "人物ID",
                                                                },
                                                                character_name:
                                                                    {
                                                                        type: "string",
                                                                        description:
                                                                            "人物名字",
                                                                    },
                                                                preview_url: {
                                                                    type: "string",
                                                                    description:
                                                                        "试听网址",
                                                                },
                                                            },
                                                            required: [
                                                                "character_id",
                                                                "preview_url",
                                                                "character_name",
                                                            ],
                                                        },
                                                        description: "人物列表",
                                                    },
                                                },
                                                required: [
                                                    "type",
                                                    "characters",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_ai_record": {
            post: {
                summary: "获取AI语音",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    character: {
                                        type: "string",
                                        description: "character_id",
                                    },
                                    text: {
                                        type: "string",
                                        description: "文本",
                                    },
                                },
                                required: ["group_id", "text", "character"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "string",
                                            description: "链接",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_robot_uin_range": {
            post: {
                summary: "获取机器人账号范围",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    minUin: {
                                                        type: "string",
                                                    },
                                                    maxUin: {
                                                        type: "string",
                                                    },
                                                },
                                                required: ["minUin", "maxUin"],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                                example: {
                                    status: "ok",
                                    retcode: 0,
                                    data: [
                                        {
                                            minUin: "3328144510",
                                            maxUin: "3328144510",
                                        },
                                        {
                                            minUin: "2854196301",
                                            maxUin: "2854216399",
                                        },
                                        {
                                            minUin: "66600000",
                                            maxUin: "66600000",
                                        },
                                        {
                                            minUin: "3889000000",
                                            maxUin: "3889999999",
                                        },
                                        {
                                            minUin: "4010000000",
                                            maxUin: "4019999999",
                                        },
                                    ],
                                    message: "",
                                    wording: "",
                                    echo: null,
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/bot_exit": {
            post: {
                summary: "账号退出",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_packet": {
            post: {
                summary: "发送自定义组包",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/nc_get_packet_status": {
            post: {
                summary: "获取packet状态",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_version_info": {
            post: {
                summary: "获取版本信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                app_name: {
                                                    type: "string",
                                                },
                                                protocol_version: {
                                                    type: "string",
                                                },
                                                app_version: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "app_name",
                                                "protocol_version",
                                                "app_version",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_qq_profile": {
            post: {
                summary: "设置账号信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    nickname: {
                                        type: "string",
                                        description: "昵称",
                                    },
                                    personal_note: {
                                        type: "string",
                                        description: "个性签名",
                                    },
                                    sex: {
                                        type: "string",
                                        description: "性别",
                                    },
                                },
                                required: ["nickname"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_doubt_friends_add_request": {
            post: {
                summary: "获取被过滤好友请求",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    count: {
                                        type: "number",
                                        default: 50,
                                    },
                                },
                                required: ["count"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                flag: {
                                                    type: "string",
                                                },
                                                uin: {
                                                    type: "string",
                                                },
                                                nick: {
                                                    type: "string",
                                                },
                                                source: {
                                                    type: "string",
                                                },
                                                reason: {
                                                    type: "string",
                                                },
                                                msg: {
                                                    type: "string",
                                                },
                                                group_code: {
                                                    type: "string",
                                                },
                                                time: {
                                                    type: "string",
                                                },
                                                type: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "flag",
                                                "type",
                                                "time",
                                                "group_code",
                                                "uin",
                                                "msg",
                                                "reason",
                                                "source",
                                                "nick",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/ArkSharePeer": {
            post: {
                summary: "获取推荐好友/群聊卡片",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    phoneNumber: {
                                        type: "string",
                                        description: "对方手机号",
                                    },
                                },
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                errCode: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                                arkJson: {
                                                    type: "string",
                                                    description: "卡片json",
                                                },
                                            },
                                            required: [
                                                "errCode",
                                                "errMsg",
                                                "arkJson",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_doubt_friends_add_request": {
            post: {
                summary: "处理被过滤好友请求",
                deprecated: false,
                description:
                    " 在 4.7.43 版本中 \napprove 的值无效\n调用该接口既是同意好友请求！！！\n调用该接口既是同意好友请求！！！\n调用该接口既是同意好友请求！！！",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    flag: {
                                        type: "string",
                                    },
                                    approve: {
                                        type: "boolean",
                                        description: "4.7.43 版本中该值无效",
                                        default: true,
                                    },
                                },
                                required: ["flag", "approve"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {},
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_poke": {
            post: {
                summary: "发送戳一戳",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: {
                                user_id: 1129317309,
                                group_id: 790514019,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_online_clients": {
            post: {
                summary: "获取当前账号在线客户端列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/mark_msg_as_read": {
            post: {
                summary: "设置消息已读",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/ArkShareGroup": {
            post: {
                summary: "获取推荐群聊卡片",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        type: "string",
                                        title: "",
                                        description: "",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "string",
                                            description: "卡片json",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_online_status": {
            post: {
                summary: "设置在线状态",
                deprecated: false,
                description:
                    '## 状态列表\n\n### 在线\n\n```json5\n{ "status": 10, "ext_status": 0, "battery_status": 0 } \n```\n\n### Q我吧\n\n```json5\n{ "status": 60, "ext_status": 0, "battery_status": 0 } \n```\n\n### 离开\n\n```json5\n{ "status": 30, "ext_status": 0, "battery_status": 0 } \n```\n\n### 忙碌\n\n```json5\n{ "status": 50, "ext_status": 0, "battery_status": 0 } \n```\n\n### 请勿打扰\n\n```json5\n{ "status": 70, "ext_status": 0, "battery_status": 0 } \n```\n\n### 隐身\n\n```json5\n{ "status": 40, "ext_status": 0, "battery_status": 0 } \n```\n\n### 听歌中\n\n```json5\n{ "status": 10, "ext_status": 1028, "battery_status": 0 } \n```\n\n### 春日限定\n\n```json5\n{ "status": 10, "ext_status": 2037, "battery_status": 0 } \n```\n\n### 一起元梦\n\n```json5\n{ "status": 10, "ext_status": 2025, "battery_status": 0 } \n```\n\n### 求星搭子\n\n```json5\n{ "status": 10, "ext_status": 2026, "battery_status": 0 } \n```\n\n### 被掏空\n\n```json5\n{ "status": 10, "ext_status": 2014, "battery_status": 0 } \n```\n\n### 今日天气\n\n```json5\n{ "status": 10, "ext_status": 1030, "battery_status": 0 } \n```\n\n### 我crash了\n\n```json5\n{ "status": 10, "ext_status": 2019, "battery_status": 0 } \n```\n\n### 爱你\n\n```json5\n{ "status": 10, "ext_status": 2006, "battery_status": 0 } \n```\n\n### 恋爱中\n\n```json5\n{ "status": 10, "ext_status": 1051, "battery_status": 0 } \n```\n\n### 好运锦鲤\n\n```json5\n{ "status": 10, "ext_status": 1071, "battery_status": 0 } \n```\n\n### 水逆退散\n\n```json5\n{ "status": 10, "ext_status": 1201, "battery_status": 0 } \n```\n\n### 嗨到飞起\n\n```json5\n{ "status": 10, "ext_status": 1056, "battery_status": 0 } \n```\n\n### 元气满满\n\n```json5\n{ "status": 10, "ext_status": 1058, "battery_status": 0 } \n```\n\n### 宝宝认证\n\n```json5\n{ "status": 10, "ext_status": 1070, "battery_status": 0 } \n```\n\n### 一言难尽\n\n```json5\n{ "status": 10, "ext_status": 1063, "battery_status": 0 } \n```\n\n### 难得糊涂\n\n```json5\n{ "status": 10, "ext_status": 2001, "battery_status": 0 } \n```\n\n### emo中\n\n```json5\n{ "status": 10, "ext_status": 1401, "battery_status": 0 } \n```\n\n### 我太难了\n\n```json5\n{ "status": 10, "ext_status": 1062, "battery_status": 0 } \n```\n\n### 我想开了\n\n```json5\n{ "status": 10, "ext_status": 2013, "battery_status": 0 } \n```\n\n### 我没事\n\n```json5\n{ "status": 10, "ext_status": 1052, "battery_status": 0 } \n```\n\n### 想静静\n\n```json5\n{ "status": 10, "ext_status": 1061, "battery_status": 0 } \n```\n\n### 悠哉哉\n\n```json5\n{ "status": 10, "ext_status": 1059, "battery_status": 0 } \n```\n\n### 去旅行\n\n```json5\n{ "status": 10, "ext_status": 2015, "battery_status": 0 } \n```\n\n### 信号弱\n\n```json5\n{ "status": 10, "ext_status": 1011, "battery_status": 0 } \n```\n\n### 出去浪\n\n```json5\n{ "status": 10, "ext_status": 2003, "battery_status": 0 } \n```\n\n### 肝作业\n\n```json5\n{ "status": 10, "ext_status": 2012, "battery_status": 0 } \n```\n\n### 学习中\n\n```json5\n{ "status": 10, "ext_status": 1018, "battery_status": 0 } \n```\n\n### 搬砖中\n\n```json5\n{ "status": 10, "ext_status": 2023, "battery_status": 0 } \n```\n\n### 摸鱼中\n\n```json5\n{ "status": 10, "ext_status": 1300, "battery_status": 0 } \n```\n\n### 无聊中\n\n```json5\n{ "status": 10, "ext_status": 1060, "battery_status": 0 } \n```\n\n### timi中\n\n```json5\n{ "status": 10, "ext_status": 1027, "battery_status": 0 } \n```\n\n### 睡觉中\n\n```json5\n{ "status": 10, "ext_status": 1016, "battery_status": 0 } \n```\n\n### 熬夜中\n\n```json5\n{ "status": 10, "ext_status": 1032, "battery_status": 0 } \n```\n\n### 追剧中\n\n```json5\n{ "status": 10, "ext_status": 1021, "battery_status": 0 } \n```\n\n### 我的电量\n\n```json5\n{ \n    "status": 10, \n    "ext_status": 1000,\n    "battery_status": 0\n}\n```',
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "number",
                                        description: "详情看顶部",
                                    },
                                    extStatus: {
                                        type: "number",
                                        description: "详情看顶部",
                                    },
                                    batteryStatus: {
                                        type: "number",
                                        description: "电量",
                                    },
                                },
                                required: [
                                    "status",
                                    "batteryStatus",
                                    "extStatus",
                                ],
                            },
                            example: {
                                status: 10,
                                ext_status: 0,
                                battery_status: 0,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_friends_with_category": {
            post: {
                summary: "获取好友分组列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    categoryId: {
                                                        type: "number",
                                                        description: "分组ID",
                                                    },
                                                    categorySortId: {
                                                        type: "number",
                                                        description:
                                                            "分组排序ID",
                                                    },
                                                    categoryName: {
                                                        type: "string",
                                                        description: "分组名",
                                                    },
                                                    categoryMbCount: {
                                                        type: "number",
                                                        description: "好友数量",
                                                    },
                                                    onlineCount: {
                                                        type: "number",
                                                        description:
                                                            "在线好友数量",
                                                    },
                                                    buddyList: {
                                                        type: "array",
                                                        items: {
                                                            $ref: "#/components/schemas/%E5%A5%BD%E5%8F%8B%E4%BF%A1%E6%81%AF",
                                                        },
                                                        description: "好友列表",
                                                    },
                                                },
                                                required: [
                                                    "categoryId",
                                                    "buddyList",
                                                    "onlineCount",
                                                    "categoryMbCount",
                                                    "categoryName",
                                                    "categorySortId",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_qq_avatar": {
            post: {
                summary: "设置头像",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    file: {
                                        type: "string",
                                        description: "路径或链接",
                                    },
                                },
                                required: ["file"],
                            },
                            example:
                                '{\r\n    // 本地路径\r\n    "file": "D:/a.jpg"\r\n    // 网络路径\r\n    // "file": "http://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png"\r\n    // "file": "base64 或 DataURL"\r\n}',
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_like": {
            post: {
                summary: "点赞",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    times: {
                                        type: "number",
                                        description: "点赞次数",
                                        default: 1,
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/mark_private_msg_as_read": {
            post: {
                summary: "设置私聊已读",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/mark_group_msg_as_read": {
            post: {
                summary: "设置群聊已读",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/create_collection": {
            post: {
                summary: "创建收藏",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    rawData: {
                                        type: "string",
                                        description: "内容",
                                    },
                                    brief: {
                                        type: "string",
                                        description: "标题",
                                    },
                                },
                                required: ["rawData", "brief"],
                            },
                            example: {
                                rawData: "http://localhost:2017/",
                                brief: "123",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["errMsg", "result"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_friend_add_request": {
            post: {
                summary: "处理好友请求",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    flag: {
                                        type: "string",
                                        description: "请求id",
                                    },
                                    approve: {
                                        type: "boolean",
                                        description: "是否同意",
                                    },
                                    remark: {
                                        type: "string",
                                        description: "好友备注",
                                    },
                                },
                                required: ["flag", "remark", "approve"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_self_longnick": {
            post: {
                summary: "设置个性签名",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    longNick: {
                                        type: "string",
                                        description: "内容",
                                    },
                                },
                                required: ["longNick"],
                            },
                            example: {
                                longNick: "唔，瓦拉瓦拉",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_login_info": {
            post: {
                summary: "获取登录号信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                user_id: {
                                                    type: "number",
                                                },
                                                nickname: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["user_id", "nickname"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_recent_contact": {
            post: {
                summary: "最近消息列表",
                deprecated: false,
                description: "获取的最新消息是每个会话最新的消息",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    count: {
                                        type: "number",
                                        description: "会话数量",
                                    },
                                },
                            },
                            example: {
                                count: 10,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    lastestMsg: {
                                                        description:
                                                            "最新消息内容",
                                                        type: "object",
                                                        properties: {
                                                            self_id: {
                                                                type: "number",
                                                            },
                                                            user_id: {
                                                                type: "number",
                                                            },
                                                            time: {
                                                                type: "number",
                                                            },
                                                            real_seq: {
                                                                type: "string",
                                                            },
                                                            message_type: {
                                                                type: "string",
                                                            },
                                                            sender: {
                                                                $ref: "#/components/schemas/sender",
                                                            },
                                                            raw_message: {
                                                                type: "string",
                                                            },
                                                            font: {
                                                                type: "number",
                                                            },
                                                            sub_type: {
                                                                type: "string",
                                                            },
                                                            message: {
                                                                type: "array",
                                                                items: {
                                                                    anyOf: [
                                                                        {
                                                                            $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E8%89%BE%E7%89%B9%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E6%96%87%E4%BB%B6%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                                                        },
                                                                        {
                                                                            $ref: "#/components/schemas/%E6%B6%88%E6%81%AFforward",
                                                                        },
                                                                    ],
                                                                },
                                                            },
                                                            message_format: {
                                                                type: "string",
                                                            },
                                                            post_type: {
                                                                type: "string",
                                                            },
                                                            group_id: {
                                                                type: "number",
                                                            },
                                                        },
                                                        required: [
                                                            "self_id",
                                                            "user_id",
                                                            "time",
                                                            "real_seq",
                                                            "message_type",
                                                            "sender",
                                                            "raw_message",
                                                            "font",
                                                            "sub_type",
                                                            "message",
                                                            "message_format",
                                                            "post_type",
                                                        ],
                                                    },
                                                    peerUin: {
                                                        type: "string",
                                                        description: "对方账号",
                                                    },
                                                    remark: {
                                                        type: "string",
                                                    },
                                                    msgTime: {
                                                        type: "string",
                                                        description: "消息时间",
                                                    },
                                                    chatType: {
                                                        type: "number",
                                                    },
                                                    msgId: {
                                                        type: "string",
                                                    },
                                                    sendNickName: {
                                                        type: "string",
                                                        description:
                                                            "发送人昵称",
                                                    },
                                                    sendMemberName: {
                                                        type: "string",
                                                    },
                                                    peerName: {
                                                        type: "string",
                                                        description: "对方昵称",
                                                    },
                                                },
                                                required: [
                                                    "peerUin",
                                                    "sendMemberName",
                                                    "msgId",
                                                    "chatType",
                                                    "msgTime",
                                                    "remark",
                                                    "sendNickName",
                                                    "peerName",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_stranger_info": {
            post: {
                summary: "获取账号信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: {
                                user_id: 1627126029,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "数据列举不全，还有很多数据没写入",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                user_id: {
                                                    type: "number",
                                                },
                                                uid: {
                                                    type: "string",
                                                },
                                                uin: {
                                                    type: "string",
                                                },
                                                nickname: {
                                                    type: "string",
                                                    description: "昵称",
                                                },
                                                age: {
                                                    type: "number",
                                                    description: "年龄",
                                                },
                                                qid: {
                                                    type: "string",
                                                },
                                                qqLevel: {
                                                    type: "number",
                                                    description: "账号等级",
                                                },
                                                sex: {
                                                    type: "string",
                                                    description: "性别",
                                                },
                                                long_nick: {
                                                    type: "string",
                                                    description: "个性签名",
                                                },
                                                reg_time: {
                                                    type: "number",
                                                    description: "注册时间",
                                                },
                                                is_vip: {
                                                    type: "boolean",
                                                    description: "是否会员",
                                                },
                                                is_years_vip: {
                                                    type: "boolean",
                                                    description: "是否年费会员",
                                                },
                                                vip_level: {
                                                    type: "number",
                                                    description: "会员等级",
                                                },
                                                remark: {
                                                    type: "string",
                                                    description: "备注",
                                                },
                                                status: {
                                                    type: "number",
                                                },
                                                login_days: {
                                                    type: "number",
                                                    description: "连续登录天数",
                                                },
                                            },
                                            required: [
                                                "user_id",
                                                "uid",
                                                "long_nick",
                                                "sex",
                                                "qqLevel",
                                                "qid",
                                                "age",
                                                "nickname",
                                                "login_days",
                                                "remark",
                                                "vip_level",
                                                "is_years_vip",
                                                "reg_time",
                                                "is_vip",
                                                "status",
                                                "uin",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_friend_list": {
            post: {
                summary: "获取好友列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    no_cache: {
                                        type: "boolean",
                                        description: "不缓存",
                                        default: false,
                                    },
                                },
                                required: ["no_cache"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/%E5%A5%BD%E5%8F%8B%E4%BF%A1%E6%81%AF",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/_mark_all_as_read": {
            post: {
                summary: "_设置所有消息已读",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_profile_like": {
            post: {
                summary: "获取点赞列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    start: {
                                        type: "number",
                                        default: 0,
                                    },
                                    count: {
                                        type: "number",
                                        default: 10,
                                    },
                                },
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                uid: {
                                                    type: "string",
                                                },
                                                time: {
                                                    type: "number",
                                                },
                                                favoriteInfo: {
                                                    type: "object",
                                                    properties: {
                                                        total_count: {
                                                            type: "number",
                                                            description:
                                                                "总次数",
                                                        },
                                                        last_time: {
                                                            type: "number",
                                                            description:
                                                                "最后点赞时间（不是时间戳）",
                                                        },
                                                        today_count: {
                                                            type: "number",
                                                            description:
                                                                "上次次数",
                                                        },
                                                        userInfos: {
                                                            type: "array",
                                                            items: {
                                                                $ref: "#/components/schemas/%E7%82%B9%E8%B5%9E%E4%BF%A1%E6%81%AF",
                                                            },
                                                        },
                                                    },
                                                    required: [
                                                        "total_count",
                                                        "userInfos",
                                                        "today_count",
                                                        "last_time",
                                                    ],
                                                    description: "互赞信息",
                                                },
                                                voteInfo: {
                                                    type: "object",
                                                    properties: {
                                                        total_count: {
                                                            type: "number",
                                                            description:
                                                                "总次数",
                                                        },
                                                        new_count: {
                                                            type: "number",
                                                            description:
                                                                "点赞次数",
                                                        },
                                                        new_nearby_count: {
                                                            type: "number",
                                                        },
                                                        last_visit_time: {
                                                            type: "number",
                                                        },
                                                        userInfos: {
                                                            type: "array",
                                                            items: {
                                                                $ref: "#/components/schemas/%E7%82%B9%E8%B5%9E%E4%BF%A1%E6%81%AF",
                                                            },
                                                        },
                                                    },
                                                    required: [
                                                        "total_count",
                                                        "userInfos",
                                                        "last_visit_time",
                                                        "new_count",
                                                        "new_nearby_count",
                                                    ],
                                                    description: "点赞信息",
                                                },
                                            },
                                            required: [
                                                "uid",
                                                "voteInfo",
                                                "favoriteInfo",
                                                "time",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/fetch_custom_face": {
            post: {
                summary: "获取收藏表情",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    count: {
                                        type: "number",
                                        default: 48,
                                    },
                                },
                            },
                            example: {
                                count: 40,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/delete_friend": {
            post: {
                summary: "删除好友",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    friend_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    temp_block: {
                                        type: "boolean",
                                        description: "拉黑",
                                    },
                                    temp_both_del: {
                                        type: "boolean",
                                        description: "双向删除",
                                    },
                                },
                                required: ["temp_both_del", "temp_block"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["result", "errMsg"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/_get_model_show": {
            post: {
                summary: "_获取在线机型",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    model: {
                                        type: "string",
                                        default: "napcat",
                                    },
                                },
                                required: ["model"],
                            },
                            example: {
                                model: "napcat",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    variants: {
                                                        type: "object",
                                                        properties: {
                                                            model_show: {
                                                                type: "string",
                                                            },
                                                            need_pay: {
                                                                type: "boolean",
                                                            },
                                                        },
                                                        required: [
                                                            "model_show",
                                                            "need_pay",
                                                        ],
                                                    },
                                                },
                                                required: ["variants"],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/_set_model_show": {
            post: {
                summary: "_设置在线机型",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/nc_get_user_status": {
            post: {
                summary: "获取用户状态",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "number",
                                                },
                                                ext_status: {
                                                    type: "number",
                                                },
                                            },
                                            required: ["status", "ext_status"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_status": {
            post: {
                summary: "获取状态",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                online: {
                                                    type: "boolean",
                                                },
                                                good: {
                                                    type: "boolean",
                                                },
                                                stat: {
                                                    type: "object",
                                                    properties: {},
                                                },
                                            },
                                            required: [
                                                "online",
                                                "stat",
                                                "good",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_mini_app_ark": {
            post: {
                summary: "获取小程序卡片",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                        enum: ["bili", "weibo"],
                                        description:
                                            "只填入必须参数的话该值必须填",
                                    },
                                    title: {
                                        type: "string",
                                        description: "标题",
                                    },
                                    desc: {
                                        type: "string",
                                        description: "内容",
                                    },
                                    picUrl: {
                                        type: "string",
                                        description: "图片链接",
                                    },
                                    jumpUrl: {
                                        type: "string",
                                        description: "跳转链接",
                                    },
                                    iconUrl: {
                                        type: "string",
                                    },
                                    sdkId: {
                                        type: "string",
                                    },
                                    appId: {
                                        type: "string",
                                    },
                                    scene: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                    templateType: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                    businessType: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                    verType: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                    shareType: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                    versionId: {
                                        type: "string",
                                    },
                                    withShareTicket: {
                                        oneOf: [
                                            {
                                                type: "number",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                    rawArkData: {
                                        oneOf: [
                                            {
                                                type: "boolean",
                                            },
                                            {
                                                type: "string",
                                            },
                                        ],
                                    },
                                },
                                required: [
                                    "jumpUrl",
                                    "picUrl",
                                    "desc",
                                    "title",
                                ],
                            },
                            example: {
                                type: "bili",
                                title: "拾雪的一天",
                                desc: "vlog记录一天的生活",
                                picUrl: "https://thirdqq.qlogo.cn/g?b=oidb&k=09ElpZZZUTHFhoIlvs0lFg&kti=ZyBvjxHhVOI&s=640",
                                jumpUrl: "pages/video/video?bvid=BV1GJ411x7h7/",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_unidirectional_friend_list": {
            post: {
                summary: "获取单向好友列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    uin: {
                                                        type: "number",
                                                    },
                                                    uid: {
                                                        type: "string",
                                                    },
                                                    nick_name: {
                                                        type: "string",
                                                    },
                                                    age: {
                                                        type: "number",
                                                    },
                                                    source: {
                                                        type: "string",
                                                    },
                                                },
                                                required: [
                                                    "uin",
                                                    "source",
                                                    "age",
                                                    "nick_name",
                                                    "uid",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/set_diy_online_status": {
            post: {
                summary: "设置自定义在线状态",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    face_id: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                    face_type: {
                                        $ref: "#/components/schemas/number%20%7C%20string",
                                    },
                                    wording: {
                                        type: "string",
                                        description: "描述文本",
                                    },
                                },
                                required: ["face_id"],
                            },
                            example: {
                                face_id: 10,
                                face_type: 1,
                                wording: "欸嘿",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "string",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/move_group_file": {
            post: {
                summary: "移动群文件",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file_id: {
                                        type: "string",
                                    },
                                    current_parent_directory: {
                                        type: "string",
                                        title: "当前父目录",
                                        description: "根目录填  /",
                                    },
                                    target_parent_directory: {
                                        type: "string",
                                        title: "目标父目录",
                                    },
                                },
                                required: [
                                    "group_id",
                                    "target_parent_directory",
                                    "current_parent_directory",
                                    "file_id",
                                ],
                            },
                            example: {
                                group_id: 123456,
                                file_id: "ee87348ece794e778a4ac9e81f2edb17",
                                current_parent_directory: "/",
                                target_parent_directory:
                                    "/ca0f1860-6362-4777-bc50-9f31993c6877",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                ok: {
                                                    type: "boolean",
                                                },
                                            },
                                            required: ["ok"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/trans_group_file": {
            post: {
                summary: "转存为永久文件",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "file_id"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                ok: {
                                                    type: "boolean",
                                                },
                                            },
                                            required: ["ok"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/rename_group_file": {
            post: {
                summary: "重命名群文件",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file_id: {
                                        type: "string",
                                    },
                                    current_parent_directory: {
                                        type: "string",
                                    },
                                    new_name: {
                                        type: "string",
                                    },
                                },
                                required: [
                                    "group_id",
                                    "new_name",
                                    "current_parent_directory",
                                    "file_id",
                                ],
                            },
                            example: {
                                group_id: 123456,
                                file_id: "27c94e1fff104282b8b07368c984e221",
                                current_parent_directory:
                                    "/ca0f1860-6362-4777-bc50-9f31993c6877",
                                new_name: "吃糖葫芦.mp4",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                ok: {
                                                    type: "boolean",
                                                },
                                            },
                                            required: ["ok"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_file": {
            post: {
                summary: "获取文件信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    file_id: {
                                        type: "string",
                                        description: "二选一",
                                    },
                                    file: {
                                        type: "string",
                                        description: "二选一",
                                    },
                                },
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                file: {
                                                    type: "string",
                                                    description: "路径或链接",
                                                },
                                                url: {
                                                    type: "string",
                                                    description: "路径或链接",
                                                },
                                                file_size: {
                                                    type: "string",
                                                    description: "文件大小",
                                                },
                                                file_name: {
                                                    type: "string",
                                                    description: "文件名",
                                                },
                                                base64: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "file",
                                                "url",
                                                "file_size",
                                                "file_name",
                                                "base64",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/upload_group_file": {
            post: {
                summary: "上传群文件",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file: {
                                        type: "string",
                                    },
                                    name: {
                                        type: "string",
                                    },
                                    folder: {
                                        type: "string",
                                        description: "文件夹ID（二选一）",
                                    },
                                    folder_id: {
                                        type: "string",
                                        description: "文件夹ID（二选一）",
                                    },
                                },
                                required: ["group_id", "file", "name"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/create_group_file_folder": {
            post: {
                summary: "创建群文件文件夹",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    folder_name: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "folder_name"],
                            },
                            example: {
                                group_id: 790514019,
                                folder_name: "ABC",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "object",
                                                    properties: {
                                                        retCode: {
                                                            type: "number",
                                                        },
                                                        retMsg: {
                                                            type: "string",
                                                        },
                                                        clientWording: {
                                                            type: "string",
                                                        },
                                                    },
                                                    required: [
                                                        "retCode",
                                                        "retMsg",
                                                        "clientWording",
                                                    ],
                                                },
                                                groupItem: {
                                                    type: "object",
                                                    properties: {
                                                        peerId: {
                                                            type: "string",
                                                        },
                                                        type: {
                                                            type: "number",
                                                        },
                                                        folderInfo: {
                                                            type: "object",
                                                            properties: {
                                                                folderId: {
                                                                    type: "string",
                                                                },
                                                                parentFolderId:
                                                                    {
                                                                        type: "string",
                                                                    },
                                                                folderName: {
                                                                    type: "string",
                                                                },
                                                                createTime: {
                                                                    type: "number",
                                                                },
                                                                modifyTime: {
                                                                    type: "number",
                                                                },
                                                                createUin: {
                                                                    type: "string",
                                                                },
                                                                creatorName: {
                                                                    type: "string",
                                                                },
                                                                totalFileCount:
                                                                    {
                                                                        type: "number",
                                                                    },
                                                                modifyUin: {
                                                                    type: "string",
                                                                },
                                                                modifyName: {
                                                                    type: "string",
                                                                },
                                                                usedSpace: {
                                                                    type: "string",
                                                                },
                                                            },
                                                            description:
                                                                "文件夹信息",
                                                            required: [
                                                                "folderId",
                                                                "folderName",
                                                                "parentFolderId",
                                                                "creatorName",
                                                                "createUin",
                                                                "modifyTime",
                                                                "createTime",
                                                                "modifyName",
                                                                "modifyUin",
                                                                "totalFileCount",
                                                                "usedSpace",
                                                            ],
                                                        },
                                                        fileInfo: {
                                                            type: "string",
                                                            nullable: true,
                                                        },
                                                    },
                                                    required: [
                                                        "peerId",
                                                        "type",
                                                        "folderInfo",
                                                        "fileInfo",
                                                    ],
                                                },
                                            },
                                            required: ["result", "groupItem"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/delete_group_file": {
            post: {
                summary: "删除群文件",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "file_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                result: {
                                                    type: "number",
                                                },
                                                errMsg: {
                                                    type: "string",
                                                },
                                                transGroupFileResult: {
                                                    type: "object",
                                                    properties: {
                                                        result: {
                                                            type: "object",
                                                            properties: {
                                                                retCode: {
                                                                    type: "number",
                                                                },
                                                                retMsg: {
                                                                    type: "string",
                                                                },
                                                                clientWording: {
                                                                    type: "string",
                                                                },
                                                            },
                                                            required: [
                                                                "retCode",
                                                                "retMsg",
                                                                "clientWording",
                                                            ],
                                                        },
                                                        successFileIdList: {
                                                            type: "array",
                                                            items: {
                                                                type: "string",
                                                            },
                                                        },
                                                        failFileIdList: {
                                                            type: "array",
                                                            items: {
                                                                type: "string",
                                                            },
                                                        },
                                                    },
                                                    required: [
                                                        "result",
                                                        "successFileIdList",
                                                        "failFileIdList",
                                                    ],
                                                },
                                            },
                                            required: [
                                                "result",
                                                "errMsg",
                                                "transGroupFileResult",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/delete_group_folder": {
            post: {
                summary: "删除群文件夹",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    folder_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "folder_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                retCode: {
                                                    type: "number",
                                                },
                                                retMsg: {
                                                    type: "string",
                                                },
                                                clientWording: {
                                                    type: "string",
                                                },
                                            },
                                            required: [
                                                "retCode",
                                                "retMsg",
                                                "clientWording",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/upload_private_file": {
            post: {
                summary: "上传私聊文件",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    file: {
                                        type: "string",
                                    },
                                    name: {
                                        type: "string",
                                    },
                                },
                                required: ["user_id", "file", "name"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "null",
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_file_system_info": {
            post: {
                summary: "获取群文件系统信息",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                file_count: {
                                                    type: "number",
                                                    description: "文件总数",
                                                },
                                                limit_count: {
                                                    type: "number",
                                                    description: "文件上限",
                                                },
                                                used_space: {
                                                    type: "number",
                                                    description: "已使用空间",
                                                },
                                                total_space: {
                                                    type: "number",
                                                    description: "空间上限",
                                                },
                                            },
                                            required: [
                                                "file_count",
                                                "limit_count",
                                                "used_space",
                                                "total_space",
                                            ],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/download_file": {
            post: {
                summary: "下载文件到缓存目录",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    url: {
                                        type: "string",
                                        description: "下载地址",
                                    },
                                    base64: {
                                        type: "string",
                                        description: "和url二选一",
                                    },
                                    name: {
                                        type: "string",
                                        description: "自定义文件名称",
                                    },
                                    headers: {
                                        oneOf: [
                                            {
                                                type: "string",
                                            },
                                            {
                                                type: "array",
                                                items: {
                                                    type: "string",
                                                },
                                            },
                                        ],
                                        description: "请求头",
                                    },
                                },
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                file: {
                                                    type: "string",
                                                    description: "下载后的路径",
                                                },
                                            },
                                            required: ["file"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_root_files": {
            post: {
                summary: "获取群根目录文件列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file_count: {
                                        type: "number",
                                        default: 50,
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                files: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%BE%A4%E6%96%87%E4%BB%B6%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "文件列表",
                                                },
                                                folders: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%BE%A4%E6%96%87%E4%BB%B6%E5%A4%B9%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "文件夹列表",
                                                },
                                            },
                                            required: ["files", "folders"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_files_by_folder": {
            post: {
                summary: "获取群子目录文件列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    folder_id: {
                                        type: "string",
                                        description: "和 folder 二选一",
                                    },
                                    folder: {
                                        type: "string",
                                        description: "和 folder_id 二选一",
                                    },
                                    file_count: {
                                        type: "number",
                                        description: "一次性获取的文件数量",
                                        default: 50,
                                    },
                                },
                                required: ["group_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                files: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%BE%A4%E6%96%87%E4%BB%B6%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "文件列表",
                                                },
                                                folders: {
                                                    type: "array",
                                                    items: {
                                                        $ref: "#/components/schemas/%E7%BE%A4%E6%96%87%E4%BB%B6%E5%A4%B9%E4%BF%A1%E6%81%AF",
                                                    },
                                                    description: "文件夹列表",
                                                },
                                            },
                                            required: ["files"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_file_url": {
            post: {
                summary: "获取群文件链接",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    file_id: {
                                        type: "string",
                                    },
                                },
                                required: ["group_id", "file_id"],
                            },
                            example: "",
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                url: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["url"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_private_file_url": {
            post: {
                summary: "获取私聊文件链接",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    file_id: {
                                        type: "string",
                                    },
                                },
                                required: ["file_id"],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                url: {
                                                    type: "string",
                                                },
                                            },
                                            required: ["url"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/send_msg": {
            post: {
                summary: "send_msg",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message_type: {
                                        oneOf: [
                                            {
                                                type: "string",
                                                const: "group",
                                            },
                                            {
                                                type: "string",
                                                const: "private",
                                            },
                                        ],
                                    },
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                    message: {
                                        type: "array",
                                        items: {
                                            anyOf: [
                                                {
                                                    $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%89%BE%E7%89%B9%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                                },
                                                {
                                                    $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                                },
                                            ],
                                        },
                                    },
                                },
                                required: [
                                    "group_id",
                                    "message",
                                    "message_type",
                                    "user_id",
                                ],
                            },
                            example:
                                '{\r\n    "message_type": "private", //group | private\r\n    "group_id": "480972475",\r\n    "user_id": "480972475", // type为group时不填写\r\n    "message": [\r\n        {\r\n            "type": "text",\r\n            "data": {\r\n                "text": "用面才务。定比眼表县。写单写加很研科。打王运土照。化知金步家你龙。全展标新。"\r\n            }\r\n        }\r\n    ]\r\n}',
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "object",
                                            properties: {
                                                message_id: {
                                                    type: "number",
                                                    title: "消息ID",
                                                    description: "消息ID",
                                                },
                                            },
                                            required: ["message_id"],
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/unknown": {
            post: {
                summary: "unknown",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_guild_list": {
            post: {
                summary: "get_guild_list",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_guild_service_profile": {
            post: {
                summary: "get_guild_service_profile",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/check_url_safely": {
            post: {
                summary: "检查链接安全性",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/click_inline_keyboard_button": {
            post: {
                summary: "点击按钮",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    group_id: {
                                        $ref: "#/components/schemas/group_id",
                                    },
                                    bot_appid: {
                                        type: "string",
                                    },
                                    button_id: {
                                        type: "string",
                                    },
                                    callback_data: {
                                        type: "string",
                                    },
                                    msg_seq: {
                                        type: "string",
                                    },
                                },
                                required: [
                                    "group_id",
                                    "msg_seq",
                                    "callback_data",
                                    "button_id",
                                    "bot_appid",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/result",
                                    required: ["data"],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_collection_list": {
            post: {
                summary: "获取收藏列表",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    category: {
                                        type: "string",
                                    },
                                    count: {
                                        type: "string",
                                    },
                                },
                                required: ["category", "count"],
                            },
                            example: {
                                category: 10,
                                count: 1,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "string",
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/get_group_ignore_add_request": {
            post: {
                summary: "获取被过滤的加群请求",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {},
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "string",
                                            const: "ok",
                                        },
                                        retcode: {
                                            type: "number",
                                        },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    request_id: {
                                                        type: "number",
                                                    },
                                                    invitor_uin: {
                                                        type: "number",
                                                    },
                                                    invitor_nick: {
                                                        type: "string",
                                                        nullable: true,
                                                    },
                                                    group_id: {
                                                        type: "number",
                                                        nullable: true,
                                                    },
                                                    message: {
                                                        type: "string",
                                                        nullable: true,
                                                    },
                                                    group_name: {
                                                        type: "string",
                                                        nullable: true,
                                                    },
                                                    checked: {
                                                        type: "boolean",
                                                    },
                                                    actor: {
                                                        type: "number",
                                                    },
                                                    requester_nick: {
                                                        type: "string",
                                                        nullable: true,
                                                    },
                                                },
                                                required: [
                                                    "request_id",
                                                    "requester_nick",
                                                    "actor",
                                                    "invitor_uin",
                                                    "invitor_nick",
                                                    "message",
                                                    "group_id",
                                                    "checked",
                                                    "group_name",
                                                ],
                                            },
                                        },
                                        message: {
                                            type: "string",
                                        },
                                        wording: {
                                            type: "string",
                                        },
                                        echo: {
                                            type: "string",
                                            nullable: true,
                                        },
                                    },
                                    required: [
                                        "status",
                                        "retcode",
                                        "data",
                                        "message",
                                        "wording",
                                        "echo",
                                    ],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/fetch_user_profile_like": {
            post: {
                summary: "fetch_user_profile_like",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    user_id: {
                                        $ref: "#/components/schemas/user_id",
                                    },
                                },
                                required: ["user_id"],
                            },
                            example: {
                                qq: 1129317309,
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/result",
                                    required: ["data"],
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
        "/.get_word_slices": {
            post: {
                summary: "获取中文分词",
                deprecated: false,
                description: "",
                tags: [],
                parameters: [],
                responses: {
                    200: {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {},
                                },
                            },
                        },
                        headers: {},
                    },
                },
                security: [],
            },
        },
    },
    components: {
        schemas: {
            group_id: {
                oneOf: [
                    {
                        type: "number",
                    },
                    {
                        type: "string",
                    },
                ],
            },
            user_id: {
                oneOf: [
                    {
                        type: "number",
                    },
                    {
                        type: "string",
                    },
                ],
            },
            message_id: {
                oneOf: [
                    {
                        type: "number",
                    },
                    {
                        type: "string",
                    },
                ],
            },
            好友信息: {
                type: "object",
                properties: {
                    birthday_year: {
                        type: "number",
                        description: "生日年",
                    },
                    birthday_month: {
                        type: "number",
                        description: "生日月",
                    },
                    birthday_day: {
                        type: "number",
                        description: "生日日",
                    },
                    user_id: {
                        type: "number",
                        description: "账号",
                    },
                    age: {
                        type: "number",
                        description: "年龄",
                    },
                    phone_num: {
                        type: "string",
                        description: "电话号码",
                    },
                    email: {
                        type: "string",
                        description: "邮箱",
                    },
                    category_id: {
                        type: "number",
                        description: "分组ID",
                    },
                    nickname: {
                        type: "string",
                        description: "昵称",
                    },
                    remark: {
                        type: "string",
                        description: "备注",
                    },
                    sex: {
                        type: "string",
                        description: "性别",
                    },
                    level: {
                        type: "number",
                        description: "等级",
                    },
                },
                required: [
                    "birthday_year",
                    "level",
                    "sex",
                    "remark",
                    "nickname",
                    "category_id",
                    "email",
                    "phone_num",
                    "age",
                    "user_id",
                    "birthday_day",
                    "birthday_month",
                ],
            },
            群信息: {
                type: "object",
                properties: {
                    group_all_shut: {
                        type: "number",
                    },
                    group_remark: {
                        type: "string",
                        description: "群备注",
                    },
                    group_id: {
                        type: "string",
                        description: "群号",
                    },
                    group_name: {
                        type: "string",
                        description: "群名",
                    },
                    member_count: {
                        type: "number",
                        description: "成员数量",
                    },
                    max_member_count: {
                        type: "number",
                        description: "最大成员数量",
                    },
                },
                required: [
                    "group_all_shut",
                    "max_member_count",
                    "member_count",
                    "group_name",
                    "group_id",
                    "group_remark",
                ],
            },
            群成员信息: {
                type: "object",
                properties: {
                    group_id: {
                        type: "number",
                    },
                    user_id: {
                        type: "number",
                    },
                    nickname: {
                        type: "string",
                    },
                    card: {
                        type: "string",
                        description: "群昵称",
                    },
                    sex: {
                        type: "string",
                        description: "性别",
                    },
                    age: {
                        type: "number",
                        description: "年龄",
                    },
                    area: {
                        type: "string",
                    },
                    level: {
                        type: "number",
                        description: "群等级",
                    },
                    qq_level: {
                        type: "number",
                        description: "账号等级",
                    },
                    join_time: {
                        type: "number",
                        description: "加群时间",
                    },
                    last_sent_time: {
                        type: "number",
                        description: "最后发言时间",
                    },
                    title_expire_time: {
                        type: "number",
                    },
                    unfriendly: {
                        type: "boolean",
                    },
                    card_changeable: {
                        type: "boolean",
                    },
                    is_robot: {
                        type: "boolean",
                        description: "是否机器人",
                    },
                    shut_up_timestamp: {
                        type: "number",
                        description: "禁言时长",
                    },
                    role: {
                        type: "string",
                        description: "权限",
                    },
                    title: {
                        type: "string",
                        description: "头衔",
                    },
                },
                required: [
                    "group_id",
                    "user_id",
                    "level",
                    "area",
                    "age",
                    "sex",
                    "card",
                    "nickname",
                    "is_robot",
                    "card_changeable",
                    "unfriendly",
                    "title_expire_time",
                    "last_sent_time",
                    "qq_level",
                    "join_time",
                    "shut_up_timestamp",
                    "role",
                    "title",
                ],
            },
            群荣誉信息: {
                type: "object",
                properties: {
                    user_id: {
                        type: "number",
                    },
                    nickname: {
                        type: "string",
                    },
                    avatar: {
                        type: "number",
                    },
                    description: {
                        type: "string",
                        description: "说明",
                    },
                },
            },
            消息详情: {
                type: "object",
                properties: {
                    self_id: {
                        type: "number",
                    },
                    user_id: {
                        type: "number",
                    },
                    time: {
                        type: "number",
                    },
                    message_id: {
                        type: "number",
                    },
                    message_seq: {
                        type: "number",
                    },
                    real_id: {
                        type: "number",
                    },
                    real_seq: {
                        type: "string",
                    },
                    message_type: {
                        type: "string",
                    },
                    sender: {
                        $ref: "#/components/schemas/sender",
                    },
                    raw_message: {
                        type: "string",
                    },
                    font: {
                        type: "number",
                    },
                    sub_type: {
                        type: "string",
                    },
                    message: {
                        type: "array",
                        items: {
                            anyOf: [
                                {
                                    $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%89%BE%E7%89%B9%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E6%96%87%E4%BB%B6%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E6%B6%88%E6%81%AFforward",
                                },
                            ],
                        },
                    },
                    message_format: {
                        type: "string",
                    },
                    post_type: {
                        type: "string",
                    },
                    group_id: {
                        type: "number",
                    },
                },
                required: [
                    "self_id",
                    "sub_type",
                    "font",
                    "raw_message",
                    "sender",
                    "message_type",
                    "real_id",
                    "message_seq",
                    "message_id",
                    "time",
                    "user_id",
                    "post_type",
                    "message_format",
                    "message",
                    "real_seq",
                ],
            },
            "number | string": {
                anyOf: [
                    {
                        type: "number",
                    },
                    {
                        type: "string",
                    },
                ],
            },
            群文件信息: {
                type: "object",
                properties: {
                    group_id: {
                        type: "number",
                    },
                    file_id: {
                        type: "string",
                    },
                    file_name: {
                        type: "string",
                    },
                    busid: {
                        type: "number",
                    },
                    size: {
                        type: "number",
                    },
                    file_size: {
                        type: "number",
                    },
                    upload_time: {
                        type: "number",
                    },
                    dead_time: {
                        type: "number",
                    },
                    modify_time: {
                        type: "number",
                    },
                    download_times: {
                        type: "number",
                    },
                    uploader: {
                        type: "number",
                    },
                    uploader_name: {
                        type: "string",
                    },
                },
                required: [
                    "group_id",
                    "upload_time",
                    "dead_time",
                    "size",
                    "busid",
                    "file_name",
                    "file_id",
                    "uploader_name",
                    "uploader",
                    "download_times",
                    "modify_time",
                    "file_size",
                ],
            },
            群文件夹信息: {
                type: "object",
                properties: {
                    group_id: {
                        type: "number",
                    },
                    folder_id: {
                        type: "string",
                    },
                    folder: {
                        type: "string",
                    },
                    folder_name: {
                        type: "string",
                        description: "文件夹名称",
                    },
                    create_time: {
                        type: "number",
                        description: "创建时间",
                    },
                    creator: {
                        type: "number",
                        description: "创建人账号",
                    },
                    creator_name: {
                        type: "string",
                        description: "创建人昵称",
                    },
                    total_file_count: {
                        type: "number",
                        description: "文件数量",
                    },
                },
                required: [
                    "group_id",
                    "create_time",
                    "folder_name",
                    "folder",
                    "folder_id",
                    "total_file_count",
                    "creator_name",
                    "creator",
                ],
            },
            点赞信息: {
                type: "object",
                properties: {
                    uid: {
                        type: "string",
                    },
                    src: {
                        type: "number",
                    },
                    latestTime: {
                        type: "number",
                    },
                    count: {
                        type: "number",
                    },
                    giftCount: {
                        type: "number",
                    },
                    customId: {
                        type: "number",
                    },
                    lastCharged: {
                        type: "number",
                    },
                    bAvailableCnt: {
                        type: "number",
                    },
                    bTodayVotedCnt: {
                        type: "number",
                    },
                    nick: {
                        type: "string",
                    },
                    gender: {
                        type: "number",
                    },
                    age: {
                        type: "number",
                    },
                    isFriend: {
                        type: "boolean",
                    },
                    isvip: {
                        type: "boolean",
                    },
                    isSvip: {
                        type: "boolean",
                    },
                    uin: {
                        type: "number",
                    },
                },
                required: [
                    "uid",
                    "uin",
                    "isSvip",
                    "isvip",
                    "isFriend",
                    "age",
                    "gender",
                    "nick",
                    "bTodayVotedCnt",
                    "bAvailableCnt",
                    "lastCharged",
                    "customId",
                    "giftCount",
                    "count",
                    "src",
                    "latestTime",
                ],
            },
            系统信息: {
                type: "object",
                properties: {
                    request_id: {
                        type: "number",
                    },
                    invitor_uin: {
                        type: "number",
                    },
                    invitor_nick: {
                        type: "string",
                    },
                    group_id: {
                        type: "number",
                    },
                    message: {
                        type: "string",
                    },
                    group_name: {
                        type: "string",
                    },
                    checked: {
                        type: "boolean",
                    },
                    actor: {
                        type: "number",
                    },
                    requester_nick: {
                        type: "string",
                    },
                },
                required: [
                    "request_id",
                    "invitor_uin",
                    "actor",
                    "group_name",
                    "group_id",
                    "invitor_nick",
                    "checked",
                    "message",
                    "requester_nick",
                ],
            },
            文本消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "text",
                    },
                    data: {
                        type: "object",
                        properties: {
                            text: {
                                type: "string",
                            },
                        },
                        required: ["text"],
                    },
                },
                required: ["type", "data"],
            },
            艾特消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "at",
                    },
                    data: {
                        type: "object",
                        properties: {
                            qq: {
                                oneOf: [
                                    {
                                        type: "string",
                                    },
                                    {
                                        type: "number",
                                    },
                                    {
                                        type: "string",
                                        const: "all",
                                    },
                                ],
                            },
                            name: {
                                type: "string",
                            },
                        },
                        required: ["qq"],
                    },
                },
                required: ["type", "data"],
            },
            表情消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "face",
                    },
                    data: {
                        type: "object",
                        properties: {
                            id: {
                                type: "number",
                            },
                        },
                        required: ["id"],
                    },
                },
                required: ["type", "data"],
            },
            图片消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "image",
                    },
                    data: {
                        type: "object",
                        properties: {
                            file: {
                                type: "string",
                            },
                            summary: {
                                type: "string",
                                default: "[图片]",
                                description: "外显",
                            },
                        },
                        required: ["file"],
                    },
                },
                required: ["type", "data"],
            },
            回复消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "reply",
                    },
                    data: {
                        type: "object",
                        properties: {
                            id: {
                                oneOf: [
                                    {
                                        type: "string",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                        },
                        required: ["id"],
                    },
                },
                required: ["type", "data"],
            },
            JSON消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "json",
                    },
                    data: {
                        type: "object",
                        properties: {
                            data: {
                                type: "string",
                            },
                        },
                        required: ["data"],
                    },
                },
                required: ["type", "data"],
            },
            语音消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "record",
                    },
                    data: {
                        type: "object",
                        properties: {
                            file: {
                                type: "string",
                            },
                        },
                        required: ["file"],
                    },
                },
                required: ["type", "data"],
            },
            视频消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "video",
                    },
                    data: {
                        type: "object",
                        properties: {
                            file: {
                                type: "string",
                            },
                        },
                        required: ["file"],
                    },
                },
                required: ["type", "data"],
            },
            markdown消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "record",
                    },
                    data: {
                        type: "object",
                        properties: {
                            content: {
                                type: "string",
                            },
                        },
                        required: ["content"],
                    },
                },
                required: ["type", "data"],
            },
            音乐卡片消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "music",
                    },
                    data: {
                        type: "object",
                        properties: {
                            type: {
                                type: "string",
                                enum: ["163", "qq"],
                            },
                            id: {
                                type: "string",
                                description: "音乐id",
                            },
                        },
                        required: ["type", "id"],
                    },
                },
                required: ["type", "data"],
            },
            自定义音乐卡片消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "music",
                    },
                    data: {
                        type: "object",
                        properties: {
                            type: {
                                type: "string",
                                const: "custom",
                                description: "custom",
                            },
                            url: {
                                type: "string",
                                description: "链接",
                            },
                            audio: {
                                type: "string",
                                description: "音频",
                            },
                            title: {
                                type: "string",
                                description: "标题",
                            },
                            image: {
                                type: "string",
                                description: "图片",
                            },
                        },
                        required: ["type", "url", "image", "title", "audio"],
                    },
                },
                required: ["type", "data"],
            },
            二级合并转发消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "node",
                    },
                    data: {
                        type: "object",
                        properties: {
                            user_id: {
                                oneOf: [
                                    {
                                        type: "string",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            nickname: {
                                type: "string",
                            },
                            content: {
                                type: "array",
                                items: {
                                    anyOf: [
                                        {
                                            $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E6%96%87%E4%BB%B6%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E5%8F%91%E9%80%81forward",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E4%BA%8C%E7%BA%A7%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF",
                                        },
                                    ],
                                },
                                description: "构建",
                            },
                            news: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        text: {
                                            type: "string",
                                            description: "内容",
                                        },
                                    },
                                    required: ["text"],
                                },
                                description: "外显",
                            },
                            prompt: {
                                type: "string",
                                description: "外显",
                            },
                            summary: {
                                type: "string",
                                description: "底下文本",
                            },
                            source: {
                                type: "string",
                                description: "标题",
                            },
                        },
                        required: ["user_id", "nickname", "content"],
                    },
                },
                required: ["type", "data"],
            },
            发送forward: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "node",
                    },
                    data: {
                        type: "object",
                        properties: {
                            user_id: {
                                $ref: "#/components/schemas/user_id",
                            },
                            nickname: {
                                type: "string",
                            },
                            content: {
                                type: "object",
                                properties: {
                                    type: {
                                        type: "string",
                                        const: "forward",
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "string",
                                                description: "res_id",
                                            },
                                        },
                                        required: ["id"],
                                    },
                                },
                                required: ["type", "data"],
                            },
                        },
                        required: ["content", "user_id", "nickname"],
                    },
                },
                required: ["type", "data"],
            },
            一级合并转发消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "node",
                    },
                    data: {
                        type: "object",
                        properties: {
                            user_id: {
                                oneOf: [
                                    {
                                        type: "string",
                                    },
                                    {
                                        type: "number",
                                    },
                                ],
                            },
                            nickname: {
                                type: "string",
                            },
                            content: {
                                type: "array",
                                items: {
                                    anyOf: [
                                        {
                                            $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E6%96%87%E4%BB%B6%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E5%8F%91%E9%80%81forward",
                                        },
                                        {
                                            $ref: "#/components/schemas/%E4%BA%8C%E7%BA%A7%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF",
                                        },
                                    ],
                                },
                                description: "构建",
                            },
                        },
                        required: ["user_id", "nickname", "content"],
                    },
                },
                required: ["type", "data"],
            },
            获取合并转发消息: {
                type: "object",
                properties: {
                    self_id: {
                        type: "number",
                    },
                    user_id: {
                        type: "number",
                    },
                    time: {
                        type: "number",
                    },
                    message_id: {
                        type: "number",
                    },
                    message_seq: {
                        type: "number",
                    },
                    real_id: {
                        type: "number",
                    },
                    real_seq: {
                        type: "string",
                    },
                    message_type: {
                        type: "string",
                    },
                    sender: {
                        $ref: "#/components/schemas/sender",
                    },
                    raw_message: {
                        type: "string",
                    },
                    font: {
                        type: "number",
                    },
                    sub_type: {
                        type: "string",
                    },
                    message: {
                        type: "array",
                        items: {
                            anyOf: [
                                {
                                    $ref: "#/components/schemas/%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%89%BE%E7%89%B9%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%A1%A8%E6%83%85%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E5%9B%BE%E7%89%87%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E5%9B%9E%E5%A4%8D%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/JSON%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%AF%AD%E9%9F%B3%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%A7%86%E9%A2%91%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/markdown%E6%B6%88%E6%81%AF",
                                },
                                {
                                    $ref: "#/components/schemas/%E8%8E%B7%E5%8F%96%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF",
                                },
                            ],
                        },
                    },
                    message_format: {
                        type: "string",
                    },
                    post_type: {
                        type: "string",
                    },
                    group_id: {
                        type: "number",
                    },
                },
                required: [
                    "self_id",
                    "user_id",
                    "time",
                    "message_id",
                    "message_seq",
                    "real_id",
                    "real_seq",
                    "message_type",
                    "sender",
                    "raw_message",
                    "font",
                    "sub_type",
                    "message",
                    "message_format",
                    "post_type",
                ],
            },
            文件消息: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "file",
                    },
                    data: {
                        type: "object",
                        properties: {
                            file: {
                                type: "string",
                            },
                            name: {
                                type: "string",
                            },
                        },
                        required: ["file"],
                    },
                },
                required: ["type", "data"],
            },
            消息forward: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                        const: "forward",
                    },
                    data: {
                        type: "object",
                        properties: {
                            id: {
                                type: "string",
                            },
                            content: {
                                type: "array",
                                items: {
                                    $ref: "#/components/schemas/%E6%B6%88%E6%81%AF%E8%AF%A6%E6%83%85",
                                    required: ["message"],
                                },
                            },
                        },
                        required: ["id", "content"],
                    },
                },
                required: ["type", "data"],
            },
            sender: {
                type: "object",
                properties: {
                    user_id: {
                        type: "number",
                    },
                    nickname: {
                        type: "string",
                    },
                    sex: {
                        type: "string",
                        enum: ["male", "female", "unknown"],
                    },
                    age: {
                        type: "number",
                    },
                    card: {
                        type: "string",
                    },
                    role: {
                        type: "string",
                        enum: ["owner", "admin", "member"],
                    },
                },
                required: ["user_id", "nickname", "card"],
            },
            result: {
                type: "object",
                properties: {
                    status: {
                        type: "string",
                        const: "ok",
                    },
                    retcode: {
                        type: "number",
                    },
                    data: {
                        type: "object",
                        properties: {},
                    },
                    message: {
                        type: "string",
                    },
                    wording: {
                        type: "string",
                    },
                    echo: {
                        type: "string",
                        nullable: true,
                    },
                },
                required: [
                    "status",
                    "retcode",
                    "data",
                    "message",
                    "wording",
                    "echo",
                ],
            },
        },
        securitySchemes: {},
    },
    servers: [],
    security: [],
};
