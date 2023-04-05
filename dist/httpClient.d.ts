import { HttpClientOptions, RequestConf, UpdateRequestConf } from "./typings";
export default class HttpClient {
    readonly baseUri: string;
    readonly options: HttpClientOptions;
    constructor(baseUri: string, options?: HttpClientOptions);
    private getRequestBody;
    request<T>(conf: RequestConf): Promise<T | undefined>;
    delete<T>(conf: Omit<RequestConf, "method">): Promise<T | undefined>;
    get<T>(conf: Omit<RequestConf, "method" | "data">): Promise<T | undefined>;
    patch<T>(conf: UpdateRequestConf): Promise<T | undefined>;
    post<T>(conf: UpdateRequestConf): Promise<T | undefined>;
    put<T>(conf: UpdateRequestConf): Promise<T | undefined>;
}
