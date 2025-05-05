export default interface checkServiceContent {
    ip: string;
    port: number;
    token: string;
}

export interface checkServiceContentResponse {
    status: number;
    message: string;
}

export interface serverDataSuccess {
    time: number;
    self_id: number;
    post_type: string;
    meta_event_type: string;
    sub_type: string;
}

export interface serverDataFailed {
    status: string;
    retcode: number;
    data: null;
    message: string;
    wording: string;
    echo: null;
}
