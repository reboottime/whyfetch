import { type IStringifyOptions } from 'qs';

export type HttpClientOptions = Pick<
  RequestInit,
  'credentials' | 'headers' | 'mode'  | 'redirect'
>;

export interface RequestConf {
  apiPath: string;
  data?: unknown;
  headers?: HttpClientOptions['headers'];
  method: 'DELETE' | 'GET' | 'POST' | 'PATCH' | 'PUT';
  query?: Query | Query['params'];
}

export interface UpdateRequestConf
  extends Required<Pick<RequestConf, 'apiPath' | 'data'>> {
  headers?: RequestConf['headers'];
}

export interface Query {
  params: unknown;
  options: IStringifyOptions;
}
