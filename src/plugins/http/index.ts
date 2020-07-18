import Request, { RequestConfig } from "./request";
import TokenUtil from '@/utils/TokenUtil';
import CookieUtil from '@/utils/CookieUitl';
import UniUtil from '@/utils/UniUtil';

const http:Request = new Request()
http.setConfig((config: { baseUrl: any; }) => {
    config.baseUrl = process.env.VUE_APP_BASE
    return config
})

// 请求之前的拦截
http.interceptor.request((config: RequestConfig) => {
    config.header['Access-Control-Allow-Origin'] = '*'
    // #ifdef APP-PLUS || MP-WEIXIN
    const cookie = CookieUtil.get()
    if(cookie) {
        config.header.Cookie = cookie
    }
    // #endif
    return config
})

http.interceptor.response(
    (response:any) => {
        console.log('http response response: ', response)
        return response.data

    },
    (error:any) => {
        console.log('http response error: ', error)
        if(error.statusCode) {
            const result = error.data
            switch(error.statusCode) {
                case ErrorCode.not_logged:
                    TokenUtil.remove()
                    if(result && result.code) {
                        UniUtil.error(result.code)
                    } else {
                        // const msg:string = configModule.systemError605
                        // UniUtil.error(msg)
                    }
                    break
                default:
                    if(result && result.errorMsg) {
                        UniUtil.error(result.errorMsg)
                    }
                    break
                       
            }
            return result // 返回接口的错误信息
        }
        return error
    }
)

export default http