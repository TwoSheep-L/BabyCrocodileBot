export default <T>(name: string, data: any) => {
    let result = {} as T;
    switch (name) {
        case "message.group":
            //群聊消息
            result = {
                self_id: data?.self_id,
                time: data?.time,
                message_id: data?.message_id,
                user_id: data?.user_id,
                nickname: data?.sender?.nickname,
                card: data?.sender?.card,
                role: data?.sender?.role,
                raw_message: data?.raw_message,
                group_id: data?.group_id,
                message: data?.message,
            } as T;
            break;

        case "message.private":
            //私聊消息
            result = {
                self_id: data?.self_id,
                time: data?.time,
                message_id: data?.message_id,
                user_id: data?.user_id,
                nickname: data?.sender?.nickname,
                card: data?.sender?.card,
                role: data?.sender?.role,
                raw_message: data?.raw_message,
                message: data?.message,
            } as T;
            break;

        default:
            break;
    }
    return {};
};
