import HTTPTransport from "../HTTPTransport";
import env from "../../utilits/env";


interface IBaseApi {
  baseUrl?: string,
  path?: `/${string}`|''
  headers?: Record<string, string>
}

const http = new HTTPTransport()

class BaseApi {
  private _http: typeof http;
  private _baseUrl: string;
  private _path: string;
  private _headers: Record<string, string>;

  constructor(config: IBaseApi = {}) {
    this._http = http;
    this._baseUrl = config.baseUrl || env.HOST_API || '';
    this._path = config.path || '';
    this._headers = config.headers || {};
  }

  private getPath() {
    return `${this._baseUrl}${this._path}`;
  }
  private handleOptions(newOptions?: { [key: string]: unknown }) {
    const options = { ...(newOptions || {}) };
    options.headers = newOptions?.headers || this._headers;
    return options;
  }

  private handleResponse(res: XMLHttpRequest) {
    if (res.response === 'OK') {
      return { ok: true };
    }

    return JSON.parse(res.response);
  }

  get(endpoint: `/${string}`, options?: { [key:string] : unknown }) {
    return this._http.get(this.getPath() + endpoint, this.handleOptions(options))
      .then((res: unknown) => this.handleResponse(res as XMLHttpRequest));

  }

  post(endpoint: `/${string}`, options?: { [key:string] : unknown }) {
    return this._http.post(this.getPath() + endpoint, this.handleOptions(options))
      .then((res: unknown) => this.handleResponse(res as XMLHttpRequest));
  }

  put(endpoint: `/${string}`, options?: { [key:string] : unknown }) {
    return this._http.put(this.getPath() + endpoint, this.handleOptions(options))
      .then((res: unknown) => this.handleResponse(res as XMLHttpRequest));
  }

  delete(endpoint: `/${string}`, options?: { [key:string] : unknown }) {
    return this._http.delete(this.getPath() + endpoint, this.handleOptions(options))
      .then((res: unknown) => this.handleResponse(res as XMLHttpRequest));
  }
}

export default BaseApi;
