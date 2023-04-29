import { type IStringifyOptions } from 'qs';
export type HttpClientOptions = Pick<RequestInit, 'credentials' | 'headers' | 'mode' | 'redirect'> & {
    timeout?: number;
    retryTimes?: number;
    retryDelay?: number;
};
export interface RequestConf {
    apiPath: string;
    data?: unknown;
    headers?: HttpClientOptions['headers'];
    method: HttpMethods;
    query?: Query | Query['params'];
    signal?: AbortSignal;
}
export interface Query {
    params: unknown;
    options: IStringifyOptions;
}
export interface IHttpClient {
    delete: (conf: Omit<RequestConf, 'data' | 'method'>) => Promise<void>;
    get: <T>(conf: Omit<RequestConf, 'data' | 'method'>) => Promise<T>;
    patch: <T>(conf: Omit<RequestConf, 'method'>) => Promise<T>;
    post: <T>(conf: Omit<RequestConf, 'method'>) => Promise<T>;
    put: <T>(conf: Omit<RequestConf, 'method'>) => Promise<T>;
}
export type HttpMethods = 'DELETE' | 'GET' | 'POST' | 'PATCH' | 'PUT';
