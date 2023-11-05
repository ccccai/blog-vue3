/*
 * @Author: caishiyin
 * @Date: 2023-09-06 13:01:20
 * @LastEditTime: 2023-11-05 22:12:44
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/api/index.ts
 */

import { fetchGet, fetchPost, fetchJSON } from './services'

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
            const modules = import.meta.env.DEV ?
                import.meta.glob([
                    `../../public/json/article/tech/2023/1.json`,
                    `../../public/json/article/tech/2023/6.json`,
                    `../../public/json/article/tech/2023/7.json`,
                ], { as: 'raw', eager: true }) :
                import.meta.glob([
                    `/json/article/tech/2023/1.json`,
                    `/json/article/tech/2023/2.json`,
                    `/json/article/tech/2023/7.json`,
                ], { as: 'raw', eager: true }),
                list: Array<any> = []

            for (let path in modules) {
                if (modules[path]) {
                    list.push(JSON.parse(modules[path]))
                }
            }

            resolve(list)
        } catch (err: any) {
            reject(err)
        }
    })
}

export const fetchRecentArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            const modules = import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/**/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2023/**.json`, { as: 'raw', eager: true }),
                list: Array<any> = []
            let index = 0

            for (let path in modules) {
                index++
                if (modules[path] && index < 4) {
                    list.push(JSON.parse(modules[path]))
                }
            }

            resolve(list)
        } catch (err: any) {
            reject(err)
        }
    })
}

export const fetchTechArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            const list: Array<any> = []
            let file,
                modules = [
                    {
                        date: '2023',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/2023/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2023/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2022',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/2022/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2022/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2021',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/2021/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2021/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2020',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/2020/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2020/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2019',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/2019/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2019/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2018',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/tech/2018/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/tech/2018/**.json`, { as: 'raw', eager: true })
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
            resolve({
                total,
                list
            })
        } catch (err: any) {
            reject(err)
        }
    })
}

export const fetchLifeArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            const list: Array<any> = []
            let file,
                modules = [
                    {
                        date: '2023',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/life/2023/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/life/2023/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2022',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/life/2022/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/life/2022/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2021',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/life/2021/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/life/2021/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2020',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/life/2020/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/life/2020/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2019',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/life/2019/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/life/2019/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2018',
                        list: import.meta.env.DEV ? import.meta.glob(`../../public/json/article/life/2018/**.json`, { as: 'raw', eager: true }) : import.meta.glob(`/json/article/life/2018/**.json`, { as: 'raw', eager: true })
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
            resolve({
                total,
                list
            })
        } catch (err: any) {
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
