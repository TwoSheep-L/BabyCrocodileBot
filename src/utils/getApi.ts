import apiData from "./apis";
import fs from "fs";

let paths = apiData?.paths;

let myApis = [
    "/send_group_msg",
    "/set_group_remark",
    "/set_group_kick",
    "/set_group_ban",
    "/set_group_whole_ban",
    "/set_group_admin",
    "/set_group_card",
    "/set_group_name",
    "/set_group_leave",
    "/set_essence_msg",
    "/delete_essence_msg",
    "/get_essence_msg_list",
    "/set_group_add_request",
    "/get_group_list",
    "/get_group_member_info",
    "/get_group_member_list",
    "/get_group_system_msg",
    "/get_group_shut_list",
    "/set_group_portrait",
    "/set_friend_add_request",
    "/get_login_info",
    "/get_friend_list",
    "/delete_friend",
    "/nc_get_user_status",
    "/set_doubt_friends_add_request",
    "/send_poke",
    "/set_qq_profile",
    "/delete_msg",
    "/ocr_image",
    "/translate_en2zh",
];

// let res: any = {};
let res = Object.entries(paths)?.filter(([path, config], index) => {
    return myApis.includes(path);
});

fs.writeFileSync("./apis.json", JSON.stringify(res, null, 4));
console.log("apis.json 生成完毕");
