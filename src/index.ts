import { AxiosInstance } from "axios";

import { CurlirizeUtils } from "./utils";

type LogCallback = (curl: string | null, error: unknown | null) => void;

const defaultLogCallback = (
  curlResult: string | null,
  error: unknown | null
) => {
  if (error) {
    console.error(error);
  } else {
    console.info(curlResult);
  }
};

const curlirize = (
  instance: AxiosInstance,
  callback: LogCallback = defaultLogCallback
) => {
  instance.interceptors.request.use((req) => {
    try {
      const curl = new CurlirizeUtils(req);
      callback(curl.generateCommand(), null);
    } catch (err) {
      callback(null, err);
    } finally {
      return req;
    }
  });
};

export default curlirize;
