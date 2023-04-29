import qs, { type IStringifyOptions } from 'qs';

import {
  HttpClientOptions,
  Query,
  RequestConf,
  UpdateRequestConf,
} from './typings';

export default class HttpClient {
  readonly baseUri: string;
  readonly options: HttpClientOptions;

  constructor(baseUri: string, options?: HttpClientOptions) {
    this.baseUri = baseUri;
    this.options = {
      ...options,
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        ...options?.headers
      },
    };
  }

  private getRequestBody(body: unknown): { body: RequestInit['body'] } {
    if ((body instanceof FormData) ||
        (typeof body !== 'object') ||
        (body === null)
    ) {
      return { body: body as RequestInit['body'] };
    }

    return { body: JSON.stringify(body) };
  }

  async request<T>(conf: RequestConf): Promise<T> {
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

    if (response.ok) {
      try {
        return JSON.parse(text) as T;
      } catch {
        return text as T;
      }
    }

    return Promise.reject(
      new Error(`HTTP error! status: ${response.status}, info: ${text}`)
    );
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

  patch<T>(conf: UpdateRequestConf): Promise<T> {
    return this.request({
      ...conf,
      method: 'PATCH',
    });
  }

  post<T>(conf: UpdateRequestConf): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'POST',
    });
  }

  put<T>(conf: UpdateRequestConf): Promise<T | undefined> {
    return this.request({
      ...conf,
      method: 'PUT',
    });
  }
}
