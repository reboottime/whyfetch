import qs, { type IStringifyOptions } from 'qs';

import type {
  HttpClientOptions,
  HttpMethods,
  IHttpClient,
  Query,
  RequestConf,
} from './typings';

class _HttpClient implements IHttpClient {
  readonly baseUri: string;
  readonly options: HttpClientOptions;

  constructor(baseUri: string, options?: HttpClientOptions) {
    this.baseUri = baseUri;
    this.options = {
      ...options,
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        ...options?.headers,
      },
    };
  }

  delete<T>(conf: Omit<RequestConf, 'method' | 'data'>): Promise<T> {
    return this.request({
      ...conf,
      method: 'DELETE',
    });
  }

  get<T>(conf: Omit<RequestConf, 'method' | 'data'>): Promise<T> {
    return this.request({
      ...conf,
      method: 'GET',
    });
  }

  patch<T>(conf: Omit<RequestConf, 'method'>): Promise<T> {
    return this.request({
      ...conf,
      method: 'PATCH',
    });
  }

  post<T>(conf: Omit<RequestConf, 'method'>): Promise<T> {
    return this.request({
      ...conf,
      method: 'POST',
    });
  }

  put<T>(conf: Omit<RequestConf, 'method'>): Promise<T> {
    return this.request({
      ...conf,
      method: 'PUT',
    });
  }

  private getRequestBody(body: unknown): { body: RequestInit['body'] } {
    if (
      body instanceof FormData ||
      typeof body !== 'object' ||
      body === null
    ) {
      return { body: body as RequestInit['body'] };
    }
  
    return { body: JSON.stringify(body) };
  }

  private async request<T>(conf: RequestConf): Promise<T> {
    const { apiPath, data, method, query } = conf;
    let queryOptions, queryParams;

    if (query && 'options' in (query as Query)) {
      queryOptions = (query as Query).options;
      queryParams = (query as Query).params;
    } else {
      queryParams = query;
    }

    const search = query
      ? `?${qs.stringify(queryParams, queryOptions as IStringifyOptions)}`
      : '';
    const url = `${this.baseUri}/${apiPath}${search}`;

    const ignoreHeader = data instanceof FormData;

    const reqestInit = {
      ...this.options,
      method,
      ...(data !== undefined && this.getRequestBody(data)),
      ...(!ignoreHeader && {
        headers: new Headers({
          ...this.options.headers,
          ...conf.headers,
        }),
      }),
    };

    const response = await fetch(url, reqestInit);
    const text = await response.text();

    if (!response.ok) {
      return Promise.reject(
        new Error(`HTTP error! status: ${response.status}, info: ${text}`)
      );
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      return text as T;
    }
  }
}

export default class HttpClient implements IHttpClient {
  private instance: IHttpClient;
  private controllers = new Map<string, AbortController>();

  constructor(baseUri: string, options?: HttpClientOptions) {
    this.instance = new _HttpClient(baseUri, options);
  }

  abort = (options: RequestConf) => {
    const key = this.getControllerKey(options);

    const controller = this.controllers.get(key);

    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  };

  delete = <T>(options: Omit<RequestConf, 'method' | 'data'>) => {
    return this.request<T>('DELETE', options);
  };

  get = <T>(options: Omit<RequestConf, 'method' | 'data'>) => {
    return this.request<T>('GET', options);
  };

  patch = <T>(options: Omit<RequestConf, 'method'>) => {
    return this.request<T>('PATCH', options);
  };

  put = <T>(conf: Omit<RequestConf, 'method'>) => {
    return this.request<T>('PUT', conf);
  };

  post = <T>(conf: Omit<RequestConf, 'method'>) => {
    return this.request<T>('POST', conf);
  };

  private request = async <T>(
    method: HttpMethods,
    options: typeof method extends 'GET' | 'DELETE'
      ? Omit<RequestConf, 'method' | 'data'>
      : Omit<RequestConf, 'method'>
  ) => {
    let controller: AbortController;
    let controllerKey = '';

    if (!options.signal) {
      controller = new AbortController();
      controllerKey = this.getControllerKey({ ...options, method });

      options.signal = controller.signal;
      this.controllers.set(controllerKey, controller);
    }

    const methodName = method.toLowerCase() as Lowercase<HttpMethods>;

    try {
      const result = await this.instance[methodName](options);

      return result as T;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      this.controllers.delete(controllerKey);
    }
  };

  private getControllerKey(options: RequestConf) {
    const url = options.apiPath;
    const method = options.method;
    const params = ['GET' , 'DELETE'].includes(method)
      ? (JSON.stringify(options.query) || '')
      : (JSON.stringify(options.data) || '');

    const key = `${url}:${method}:${params}`;

    return key;
  }
}
