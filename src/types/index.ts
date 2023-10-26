/*
 * @Author: caishiyin
 * @Date: 2020-12-10 14:53:10
 * @LastEditTime: 2023-10-27 02:50:49
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/types/index.ts
 */
import { Dayjs } from '@/assets/dayjs'

export interface IStoreState {
    activeNav: number
}

/**
 * @description: 声明请求头header的类型
 */
interface IHeaderConfig {
    Accept?: string
    'Content-Type': string
    [propName: string]: any
}

export enum EHttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

interface IAnyMap {
    [propName: string]: any
}

export interface IRequestOptions {
    headers?: IHeaderConfig
    signal?: AbortSignal
    method?: EHttpMethods
    params?: IAnyMap
    body?: any
    timeout?: number
    credentials?: 'include' | 'same-origin'
    mode?: 'cors' | 'same-origin'
    cache?: 'no-cache' | 'default' | 'force-cache'
}

export interface IFetchParams {
    url: string
    method?: 'get' | 'post' | 'GET' | 'POST'
    param?: any
    options?: IRequestOptions
}

export interface IPayload {
    pageNo?: number
    pageSize?: number
}

export interface IResponseData {
    resultCode: number
    data: any | undefined
    resultMessage: string
}

export interface CountProps {
    articles: number,
    tags: number,
    categories: number
}

export interface ItemProps {
    id: number,
    name: string,
    count?: number
}

export interface ArticleListProps {
    list: Array<any>,
    date: string,
}

export interface NavProps {
    title_en: string,
    url: string
}

export interface ArticleProps {
    id?: number,
    type?: number
    cover?: string,
    title?: string,
    subTitle?: string,
    author?: string
    weight?: number
    authorAvatar?: string,
    createDate?: Dayjs,
    description?: string
    tagList?: Array<ItemProps>
}

export interface PopFormState {
    id?: number
    type?: number
    author?: string
    date?: number
    tag?: Array<any>
    category?: number
    weight?: number
    coverUrl?: string
    avatarUrl?: string
}