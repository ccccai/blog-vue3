import 'whatwg-fetch'
import { getRequestBody } from './common'
import { type IFetchParams, type IRequestOptions, type IResponseData, EHttpMethods } from '../types/index'
import { message } from 'ant-design-vue'
import { useLoadingStore } from "@/stores"
// 这里是我项目使用到的js-cookie库，主要是为了拿到token，你们这里改成你们获取token的方式即可
// import Cookies from 'js-cookie'

// 域名
export const requestPath = 'http://127.0.0.1:3232'
// export const requestPath = ''
// 请求允许方法
const CAN_SEND_METHOD = ['POST', 'PUT', 'PATCH', 'DELETE']
// 当前正在请求的数量
let requestCount = 0

interface IHttpInterface {
    fetchHandler<T = IResponseData>(url: string, options?: IRequestOptions): Promise<T>
}

type ICustomRequestError = {
    status: number
    statusText: string
    url: string
}

// 显示全局loading
export function showLoading() {
    if (requestCount === 0 && !useLoadingStore().spinning) {
        useLoadingStore().setSpinning(true)
    }
    requestCount++
}

// 隐藏全局loading
export function hideLoading() {
    requestCount--
    if (requestCount === 0 && useLoadingStore().spinning) {
        useLoadingStore().setSpinning(false)
    }
}

// 深拷贝对象
function filterObject(o: Record<string, string>, filter: Function) {
    const res: Record<string, string> = {}
    Object.keys(o).forEach(k => {
        // if (filter(o[k], k)) {
            res[k] = o[k]
        // }
    })
    return res
}

// 捕获异常内部处理
function dealErrToast(err: Error & ICustomRequestError, abortController?: AbortController) {
    console.log('err', err)
    const errorInfoMap: any = {
        500: {
            type: 'exception',
            msg: '接口异常',
        },
        501: {
            type: 'exception',
            msg: '接口异常',
        },
        502: {
            type: 'exception',
            msg: '接口异常',
        },
        503: {
            type: 'exception',
            msg: '接口异常',
        },
        401: {
            type: 'noPrmission',
            msg: '没有访问权限',
        },
        403: {
            type: 'refuse',
            msg: '接口拒绝访问',
        },
        404: {
            type: 'notFound',
            msg: '接口链接不存在',
        },
        405: {
            type: 'Method Not Allowed',
            msg: 'server: 方法不允许',
        },
    }

    let errorInfo: any = {}

    if (err && err.status) {
        errorInfo = errorInfoMap[Number(err.status)]

        if (err.status === 408) {
            abortController && abortController.abort()
        }
    }

    message.error(errorInfo?.msg || '未知的异常')
}

// 封装fetch请求
class Http implements IHttpInterface {
    public async fetchHandler<T>(url: string, options?: IRequestOptions, abortController?: AbortController): Promise<T> {
        showLoading()
        if (import.meta.env.DEV) {
            console.log('请求地址====================》', url)
            console.log('请求参数====================》', options?.params)
        }
        // requestPath是公共的请求地址
        let apiUrl = requestPath + url
        const opts: IRequestOptions = Object.assign(
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                },
                method: 'GET',
                // credentials: 'include',
                timeout: 10000,
                mode: 'cors',
                cache: 'no-cache',

                // IE浏览器第一次发请求没有问题,再发送请求时，当参数一样时，浏览器会直接使用缓存数据. 导致页面 还是原来的页面，所以在请求时加上时间戳
                params: { timeStamp: new Date().getTime() },
            },
            options
        )

        abortController && (opts.signal = abortController.signal)

        const canSend = opts && opts.method && CAN_SEND_METHOD.includes(opts.method)
        if (opts.params && opts.method) {
            if (canSend) {
                opts.body = JSON.stringify(filterObject(opts.params, Boolean))
                opts.headers && Reflect.set(opts.headers, 'Content-Type', 'application/json')
            } else if (opts.method === 'GET') {
                apiUrl = getRequestBody(apiUrl, filterObject(opts.params, Boolean))
            }
        }

        console.log('opts', opts)

        try {
            const res = await Promise.race([
                fetch(apiUrl, opts),
                new Promise<any>((_, reject) => {
                    setTimeout(() => {
                        return reject({ status: 408, statusText: '请求超时，请稍后重试', url })
                    }, opts.timeout)
                }),
            ])
            const result = await res.json()
            if (result?.resultCode !== 0) {
                message.error(result?.resultMessage || '接口请求出错')
            }
            await hideLoading()
            return result
        } catch (e: any) {
            hideLoading()
            dealErrToast(e, abortController)
            return e
        }
    }
}

const { fetchHandler } = new Http()
export { fetchHandler as default }

export const fetchJSON = async (url: string) => {
    showLoading()
    const res = await fetch(url)
    await hideLoading()
    return res.json()
}

// 封装fetch的get请求
export const fetchGet = ({ url, param = {}, options = {} }: IFetchParams) => {
    if (param && typeof param === 'object') {
        options.params = param
    }
    options.method = EHttpMethods.GET
    return fetchHandler(url, options)
}

// 封装fetch的post请求
export const fetchPost = ({ url, param = {}, options = {} }: IFetchParams) => {
    if (param && typeof param === 'object') {
        options.params = param
    }
    options.method = EHttpMethods.POST
    return fetchHandler(url, options)
}
