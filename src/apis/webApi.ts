import Axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';
import qs from 'qs';
import storeCache from 'store';
import { API_CACHE_TIMEOUT, API_ENDPOINT, API_REQUEST_TIMEOUT } from '../configs';

export interface IApiError {
  code: number;
  field: string;
  message: string;
  status: number;
}

export class WebApi {
  public loginChain: Promise<any>;
  private token: string;
  private axios: AxiosInstance;
  private loginResolve: () => void;

  constructor () {
    this.token = '';
    this.axios = Axios.create({
      baseURL: API_ENDPOINT,
      timeout: API_REQUEST_TIMEOUT
    });
    this.loginResolve = () => '';
    this.loginChain = new Promise((resolve) => {
      this.loginResolve = resolve;
    });
  }

  public auth (token: string) {
    this.token = token;
    this.axios.defaults.headers.common['user-key'] = token;
    if (token) {
      this.loginResolve();
      this.loginResolve = () => '';
      this.loginChain = Promise.resolve(token);
    } else {
      this.loginChain = new Promise((resolve) => {
        this.loginResolve = resolve;
      });
    }
  }

  public isAuthorized () {
    return !!this.token;
  }

  public handleApiError = (error: AxiosError): Promise<IApiError> => {
    const errorResponse =
      error.response && error.response.data
        ? error.response.data.error
        : {
            code: error.code,
            field: '',
            message: error.message,
            status: error.code
          };
    return Promise.reject(errorResponse);
  }

  public get (
    path: string,
    payload = null as any,
    usecache = true,
    cacheTimeout = API_CACHE_TIMEOUT
  ): Promise<any> {
    const url = `${path}?${qs.stringify(payload)}`;
    if (usecache) {
      const cache = storeCache.get(url);
      if (cache && cache.expire > Date.now()) {
        return Promise.resolve(cache.data);
      }
    }
    return this.axios
      .get(url)
      .then((res) => res.data)
      .then((data) => {
        if (usecache) {
          storeCache.set(url, {
            data,
            expire: Date.now() + cacheTimeout
          });
        }
        return data;
      })
      .catch(this.handleApiError);
  }

  public inValidateCache (path = ''): void {
    if (!path) {
      storeCache.clearAll();
    }
    storeCache.each((val, key) => {
      if (key.startsWith(path)) {
        storeCache.remove(key);
      }
    });
  }

  public post (path: string, payload: any): Promise<any> {
    // Clear cache under this path to ensure recieve latest data from the get api.
    this.inValidateCache(path);
    return this.axios
      .post(path, payload)
      .then((res: AxiosResponse): any => res.data || res)
      .catch(this.handleApiError);
  }

  public put (path: string, payload: any): Promise<any> {
    this.inValidateCache(path);
    return this.axios
      .put(path, payload)
      .then((res: AxiosResponse): any => res.data || res)
      .catch(this.handleApiError);
  }

  // authGet method  would check if user already logged in before exec the api call.
  public authGet (
    path: string,
    payload = null as any,
    usecache = true,
    cacheTimeout = API_CACHE_TIMEOUT
  ): Promise<any> {
    return this.loginChain
      .then(() => this.get(path, payload, usecache, cacheTimeout))
      .catch(this.handleApiError);
  }

  public authPost (path: string, payload: any): Promise<any> {
    return this.loginChain.then(() => this.post(path, payload)).catch(this.handleApiError);
  }

  public authPut (path: string, payload: any): Promise<any> {
    return this.loginChain.then(() => this.put(path, payload)).catch(this.handleApiError);
  }
}

const api = new WebApi();
if (process.env.NODE_ENV === 'development') {
  (window as any).api = api;
}

export default api;
