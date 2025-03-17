import { InternalAxiosRequestConfig } from "axios";

const AxiosMethods = [
  "get",
  "delete",
  "head",
  "options",
  "post",
  "put",
  "patch",
  "purge",
  "link",
  "unlink",
];

export class CurlirizeUtils {
  request: InternalAxiosRequestConfig<any>;

  constructor(config: InternalAxiosRequestConfig<any>) {
    this.request = config;
  }

  getHeaders = (): string => {
    let headers = this.request.headers,
      curlHeaders = "";

    if (headers.hasOwnProperty("common") && this.request.method) {
      headers = this.request.headers[this.request.method];
    }

    for (let property in this.request.headers) {
      if (!AxiosMethods.includes(property)) {
        headers[property] = this.request.headers[property];
      }
    }

    for (let property in headers) {
      if ({}.hasOwnProperty.call(headers, property) && headers[property]) {
        let header = `${property}:${headers[property]}`;
        curlHeaders = `${curlHeaders} -H '${header}'`;
      }
    }

    return curlHeaders.trim();
  };

  getMethod = (): string => {
    return `-X ${this.request.method?.toUpperCase()}`;
  };

  getBody = (): string => {
    if (
      typeof this.request.data !== "undefined" &&
      this.request.data !== "" &&
      this.request.data !== null &&
      this.request.method?.toUpperCase() !== "GET"
    ) {
      let data =
        typeof this.request.data === "object" ||
        Object.prototype.toString.call(this.request.data) === "[object Array]"
          ? JSON.stringify(this.request.data)
          : this.request.data;
      return `--data '${data}'`.trim();
    } else {
      return "";
    }
  };

  getUrl = (): string | undefined => {
    if (this.request.baseURL) {
      let baseUrl = this.request.baseURL;
      let url = this.request.url;
      let finalUrl = baseUrl + "/" + url;
      return finalUrl
        .replace(/\/{2,}/g, "/")
        .replace("http:/", "http://")
        .replace("https:/", "https://");
    }
    return this.request.url;
  };

  getQueryString = (): string => {
    if (this.request.paramsSerializer) {
      if (typeof this.request.paramsSerializer === "function") {
        const params = this.request.paramsSerializer(this.request.params);
        if (!params || params.length === 0) return "";
        if (params.startsWith("?")) return params;
        return `?${params}`;
      }
    }
    let params = "";
    let i = 0;

    for (let param in this.request.params) {
      if ({}.hasOwnProperty.call(this.request.params, param)) {
        params +=
          i !== 0
            ? `&${param}=${this.request.params[param]}`
            : `?${param}=${this.request.params[param]}`;
        i++;
      }
    }

    return params;
  };

  getBuiltURL = (): string => {
    let url = this.getUrl() ?? "";

    if (this.getQueryString() !== "") {
      url += this.getQueryString();
    }

    return url.trim();
  };

  generateCommand = (): string => {
    return `curl ${this.getMethod()} "${this.getBuiltURL()}" ${this.getHeaders()} ${this.getBody()}`
      .trim()
      .replace(/\s{2,}/g, " ");
  };
}
