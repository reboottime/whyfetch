"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClient {
    constructor(baseUri, options) {
        this.baseUri = baseUri;
        this.options = options !== null && options !== void 0 ? options : {
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json;charset=UTF-8",
            },
        };
    }
    getRequestBody(body) {
        if (body instanceof FormData) {
            return { body };
        }
        else if (typeof body === "object" && body !== null) {
            return { body: JSON.stringify(body) };
        }
        return { body };
    }
    request(conf) {
        return __awaiter(this, void 0, void 0, function* () {
            const { apiPath, data, method, query } = conf;
            const search = query ? `?${new URLSearchParams(query).toString()}` : "";
            const url = `${this.baseUri}/${apiPath}${search}`;
            const ignoreHeader = data instanceof FormData;
            const reqestInit = Object.assign(Object.assign(Object.assign(Object.assign({}, this.options), { method }), (data !== undefined && this.getRequestBody(data))), (!ignoreHeader && {
                headers: new Headers(Object.assign(Object.assign({}, this.options.headers), conf.headers)),
            }));
            const response = yield fetch(url, reqestInit);
            const text = yield response.text();
            if (response.ok) {
                try {
                    return JSON.parse(text);
                }
                catch (_a) {
                    return text;
                }
            }
            throw new Error(`HTTP error! status: ${response.status}, info: ${text}`);
        });
    }
    delete(conf) {
        return this.request(Object.assign(Object.assign({}, conf), { method: "DELETE" }));
    }
    get(conf) {
        return this.request(Object.assign(Object.assign({}, conf), { method: "GET" }));
    }
    patch(conf) {
        return this.request(Object.assign(Object.assign({}, conf), { method: "PATCH" }));
    }
    post(conf) {
        return this.request(Object.assign(Object.assign({}, conf), { method: "POST" }));
    }
    put(conf) {
        return this.request(Object.assign(Object.assign({}, conf), { method: "PUT" }));
    }
}
exports.default = HttpClient;
