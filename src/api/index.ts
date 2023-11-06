/*
 * @Author: caishiyin
 * @Date: 2023-09-06 13:01:20
 * @LastEditTime: 2023-11-06 23:55:24
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/api/index.ts
 */

import { fetchGet, fetchPost, fetchJSON, showLoading, hideLoading } from './services'

export const prefix = '/json/'

export const fetchHomeData = async () =>
    await fetchGet({
        url: '/blog/home',
    })

export const fetchSidebarData = async () =>
    await fetchGet({
        url: '/blog/sidebar',
    })

export const fetchTagList = async () => await fetchJSON(`${prefix}tags.json`)

export const fetchCategoryList = async () => await fetchJSON(`${prefix}categories.json`)

export const fetchCount = async () => await fetchJSON(`${prefix}count.json`)

export const fetchBlogInfo = async () => await fetchJSON(`${prefix}blogInfo.json`)

export const fetchArticle = async (path: string) => await fetchJSON(path)

export const fetchFeaturedArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            const modules = import.meta.glob([
                    `../../public/json/article/tech/2019/2.json`,
                    `../../public/json/article/tech/2019/1.json`,
                    `../../public/json/article/tech/2018/1.json`,
                ], { as: 'raw', eager: true }),
                list: Array<any> = []

            for (let path in modules) {
                if (modules[path]) {
                    list.push(JSON.parse(modules[path]))
                }
            }

            hideLoading()
            resolve(list)
        } catch (err: any) {
            hideLoading()
            reject(err)
        }
    })
}

export const fetchRecentArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            const modules = import.meta.glob('../../public/json/article/tech/**/**.json', { as: 'raw', eager: true }),
                list: Array<any> = []
            let index = 0

            for (let path in modules) {
                index++
                if (modules[path]) {
                    list.push(JSON.parse(modules[path]))
                }
                
                if (index >= 3) {
                    break
                }
            }
            hideLoading()
            resolve(list)
        } catch (err: any) {
            hideLoading()
            reject(err)
        }
    })
}

export const fetchTechArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            const list: Array<any> = []
            let file,
                modules = [
                    {
                        date: '2023',
                        list: import.meta.glob(`../../public/json/article/tech/2023/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2022',
                        list: import.meta.glob(`../../public/json/article/tech/2022/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2021',
                        list: import.meta.glob(`../../public/json/article/tech/2021/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2020',
                        list: import.meta.glob(`../../public/json/article/tech/2020/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2019',
                        list: import.meta.glob(`../../public/json/article/tech/2019/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2018',
                        list: import.meta.glob(`../../public/json/article/tech/2018/**.json`, { as: 'raw', eager: true })
                    },
                ],
                total = 0
            modules.forEach((item) => {
                total += Object.keys(item.list).length
                if (Object.keys(item.list).length) {
                    file = {
                        date: item.date,
                        list: <any>[]
                    }
                    for (let path in item.list) {
                        if (item.list[path]) {
                            file.list.push(JSON.parse(item.list[path]))
                        }
                    }
                    list.push(file)
                }
            })
            hideLoading()
            resolve({
                total,
                list
            })
        } catch (err: any) {
            hideLoading()
            reject(err)
        }
    })
}

export const fetchLifeArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            const list: Array<any> = []
            let file,
                modules = [
                    {
                        date: '2023',
                        list:import.meta.glob(`../../public/json/article/life/2023/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2022',
                        list:import.meta.glob(`../../public/json/article/life/2022/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2021',
                        list:import.meta.glob(`../../public/json/article/life/2021/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2020',
                        list:import.meta.glob(`../../public/json/article/life/2020/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2019',
                        list:import.meta.glob(`../../public/json/article/life/2019/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2018',
                        list:import.meta.glob(`../../public/json/article/life/2018/**.json`, { as: 'raw', eager: true })
                    },
                ],
                total = 0
            modules.forEach((item) => {
                total += Object.keys(item.list).length
                if (Object.keys(item.list).length) {
                    file = {
                        date: item.date,
                        list: <any>[]
                    }
                    for (let path in item.list) {
                        if (item.list[path]) {
                            file.list.push(JSON.parse(item.list[path]))
                        }
                    }
                    list.push(file)
                }
            })
            hideLoading()
            resolve({
                total,
                list
            })
        } catch (err: any) {
            hideLoading()
            reject(err)
        }
    })
}

export const createArticle = async (param: any) =>
    await fetchPost({
        url: '/admin/createArticle',
        param,
    })

export const updateArticle = async (param: any) =>
    await fetchPost({
        url: '/admin/updateArticle',
        param,
    })
