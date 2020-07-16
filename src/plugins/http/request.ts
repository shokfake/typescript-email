import ResultV0 from '@/model/ResultVO'

interface Header {
    'Content-Type'?:string;
    'Accept'?: string;
    [propName:string]:any;
}

// 全局config 接口
interface Config {
    baseUrl: string;
    header: Header;
    method: string;
    dataType: string;
    responseType: string;
}

interface Interceptor {
    request: Function;
    response: Function;
}

// request 方法配置参数
interface Options {
    url: string;
    dataType?: string;
    data?:object;
    header?:Header;
    method?:string;
    responseType?:string;
}

// get /post 方法配置参数
interface HandleOptions {
    header?: Header;
    dataType?: string;
    responseType?: string;
}
// 定义新的配置接口
interface NewOptions { 
    baseUrl: string;
    url: string;
    dataType: string;
    data: object;
    header: Header;
    method: string;
    complete?: Function;
    responseType: string;
}

// 请求拦截器回调
interface RequestCb { 
    (x: object, y: Function): object;
}
  // 相应拦截器回调
  interface ResponseCb { 
    (x: object): object;
}

// 响应体
interface Response{
    statusCode?:number;
    config: Record<string, any>;
    errMsg: string;
    [propName:string]:any;
}
// 请求之前参数配置项
interface RequestConfig { 
    readonly baseUrl: string;
    url: string;
    dataType: string;
    data: object;
    header: Header;
    method: string;
    readonly complete: Function;
    responseType: string;
  }

  export default class Request {
      config: Config = {
        baseUrl: '',
        header: {
            'Content-Type': 'text/x-json; charset=UTF-8',
            'Accept': 'text/x-json'
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text'
      }

      // 判断url是否为绝对路径
      static isAbsoluteUrl(url= ''):boolean {
        return /(WebAPI|https):\/\/([\w.]+\/?)\S*/.test(url)
      }

      interceptor: Interceptor = {
          request: (f: RequestCb) => {
            if(f) {
                this.requestBeforeFunc = f
            }
          },
          response: (cb: ResponseCb, errorcb: ResponseCb) => {
            if(cb && errorcb) {
                this.requestComFunc = cb
                this.requestComFail = errorcb
            }
          }
      }

      private requestBeforeFunc (config:object, cancel?:Function): object {
          return config
      }

      private requestComFunc(response: object):object {
          return response
      }

      private requestComFail(response: object):object {
          return response
      }

      setConfig(f: Function) {
          this.config = f(this.config)
      }

      request<T>(options: Options) {
          const _options: NewOptions = {
              baseUrl: this.config.baseUrl,
              dataType: options.dataType || this.config.dataType,
              responseType: options.responseType || this.config.responseType,
              url: Request.isAbsoluteUrl(options.url) 
                ? options.url
                : (this.config.baseUrl + options.url),
              data: options.data || {},
              header: options.header || this.config.header,
              method: options.method || this.config.method
          }
          return new Promise<ResultV0<T>>((resolve: Function, reject: Function) => {
              let next = true
              let _config: object = {}
              _options.complete = (response: Response) => {
                  response.config = _config
                  if(response.statusCode === 200) {
                      resolve(null, this.requestComFunc(response))
                  } else {
                      reject(this.requestComFail(response), null)
                  }
              }

              const cancel = (t = 'handle cancel', config=_options):void => {
                  const err = {
                      errMsg: t,
                      config: config
                  }
                  reject(err)
                  next = false
              }
              _config = { ...this.requestBeforeFunc(_options, cancel)}
              if(!next) return
              uni.request(_config)
          })
      }

      get(url:string, data: object = {}, options:HandleOptions = {}) {
          return this.request({
              url,
              data,
              method: 'GET',
              ...options
          })
      }

      post<T>(url:string, data: object = {}, options:HandleOptions = {}) {
          return this.request({
              url,
              data,
              method: 'POST', 
              ...options
          })
      }

    // #ifndef MP-ALIPAY
    put (url: string, data: object = {}, options: HandleOptions = {}) {
        return this.request({
        url,
        data,
        method: 'PUT',
        ...options
        })
    }
    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
    delete (url: string, data: object = {}, options: HandleOptions = {}) {
        return this.request({
        url,
        data,
        method: 'DELETE',
        ...options
        })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN
    connect (url: string, data: object = {}, options: HandleOptions = {}) {
        return this.request({
        url,
        data,
        method: 'CONNECT',
        ...options
        })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
    head (url: string, data: object = {}, options: HandleOptions = {}) {
        return this.request({
        url,
        data,
        method: 'HEAD',
        ...options
        })
    }
    // #endif

     // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
    options (url: string, data: object = {}, options: HandleOptions = {}) {
        return this.request({
        url,
        data,
        method: 'OPTIONS',
        ...options
        })
    }

    // #endif

     // #ifdef APP-PLUS || H5 || MP-WEIXIN
    trace (url: string, data: object = {}, options: HandleOptions = {}) {
        return this.request({
        url,
        data,
        method: 'TRACE',
        ...options
        })
    }

    // #endif

  }

  export {
      Options,
      HandleOptions,
      Config,
      RequestConfig,
      Response
  }