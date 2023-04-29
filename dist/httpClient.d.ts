import type { HttpClientOptions, IHttpClient, RequestConf } from './typings';
export default class HttpClient implements IHttpClient {
    private instance;
    private controllers;
    constructor(baseUri: string, options?: HttpClientOptions);
    abort: (options: RequestConf) => void;
    delete: <T>(options: Omit<RequestConf, 'method' | 'data'>) => Promise<T>;
    get: <T>(options: Omit<RequestConf, 'method' | 'data'>) => Promise<T>;
    patch: <T>(options: Omit<RequestConf, 'method'>) => Promise<T>;
    put: <T>(conf: Omit<RequestConf, 'method'>) => Promise<T>;
    post: <T>(conf: Omit<RequestConf, 'method'>) => Promise<T>;
    private request;
    private getControllerKey;
}
