import { HttpClientOptions, RequestConf, UpdateRequestConf } from './typings';
export default class HttpClient {
    readonly baseUri: string;
    readonly options: HttpClientOptions;
    constructor(baseUri: string, options?: HttpClientOptions);
    private getRequestBody;
    request<T>(conf: RequestConf): Promise<T>;
    delete<T>(conf: Omit<RequestConf, 'method' | 'data'>): Promise<T>;
    get<T>(conf: Omit<RequestConf, 'method' | 'data'>): Promise<T>;
    patch<T>(conf: UpdateRequestConf): Promise<T>;
    post<T>(conf: UpdateRequestConf): Promise<T | undefined>;
    put<T>(conf: UpdateRequestConf): Promise<T | undefined>;
}
