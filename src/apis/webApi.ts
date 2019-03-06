import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import storeCache from 'store';

export class WebApi {
  private token: string;
  private axios: AxiosInstance;

  constructor () {
    this.token = '';
    this.axios = Axios.create({
      baseURL: 'https://backendapi.turing.com',
      timeout: 10000
    });
  }

  public auth (token: string) {
    this.token = token;
    this.axios.defaults.headers.common['user-key'] = token;
  }

  public isAuthorized () {
    return !!this.token;
  }

  public get (path: string, payload = null as any, usecache = true, cacheTimeout = 3600000): Promise<any> {
    const url  = `${path}?${qs.stringify(payload)}`;
    if (usecache) {
      const cache = storeCache.get(url);
      if (cache && (cache.expire > Date.now())) {
        return Promise.resolve(cache.data);
      }
    }
    return this.axios.get(url).then((res) => res.data).then((data) => {
      if (usecache) {
        storeCache.set(url, {
          data,
          expire: Date.now() + cacheTimeout
        });
      }
      return data;
    });
  }

  public inValidateCache (path= ''): void {
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
    return this.axios.post(path, payload).then((res: AxiosResponse): any => (res.data || res));
  }

  public put (path: string, payload: any): Promise<any> {
    this.inValidateCache(path);
    return this.axios.put(path, payload).then((res: AxiosResponse): any => (res.data || res));
  }

  // authGet method  would check if user already logged in before exec the api call.
  public authGet (path: string, payload = null as any, usecache = true, cacheTimeout = 3600000): Promise<any> {
    if (!this.isAuthorized())  {
      return Promise.reject('UnAuthrorized!');
    }
    return this.get(path, payload, usecache, cacheTimeout);
  }

  public authPost (path: string, payload: any): Promise<any> {
    if (!this.isAuthorized())  {
      return Promise.reject('UnAuthrorized!');
    }
    return this.post(path, payload);
  }

  public authPut (path: string, payload: any): Promise<any> {
    if (!this.isAuthorized())  {
      return Promise.reject('UnAuthrorized!');
    }
    return this.put(path, payload);
  }
}

const api = new WebApi();
if (process.env.NODE_ENV === 'development') {
  (window as any).api = api;
}

export default api;
