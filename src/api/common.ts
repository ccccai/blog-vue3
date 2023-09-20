/*
 * @Author: caishiyin
 * @Date: 2023-09-06 07:02:38
 * @LastEditTime: 2023-09-11 13:22:01
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /blog-tsx/src/api/common.tsx
 */

/**
 * get 请求的情况下
 * 将 json 请求参数 添加到 url 上
 * @param url
 * @param ob
 * @returns {*}
 */
export const getRequestBody = (url: string = '', params: any = null) => {
    let param = ''
    if (params) {
        for (let key in params) {
            param += `${param ? '&' : '?'}${key}=${params[key]}`
        }
    }
    return `${url}${param}`
}

/**
 * post请求时
 * 将 json 请求参数 转化为 formData body
 * @param ob
 * @returns {*}
 */
export const postRequestBody = (params: any = null) => {
    let form = null
    if (params) {
        form = new FormData()

        for (let key in params) {
            form.append(key, params[key])
        }
    }

    return form
}
