/*
 * @Author: caishiyin
 * @Date: 2023-09-06 13:01:20
 * @LastEditTime: 2023-11-23 18:39:44
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/api/index.ts
 */

import { fetchGet, fetchPost, fetchJSON, showLoading, hideLoading } from './services'
import { useArticleStore } from "@/stores/article"
import { useNoteStore } from "@/stores/note"

export const prefix = '/json/'

export const fetchHomeData = async () =>
    await fetchGet({
        url: '/blog/home',
    })

export const fetchSidebarData = async () =>
    await fetchGet({
        url: '/blog/sidebar',
    })

export const fetchTagList = async () => {
    const data = await fetchJSON(`${prefix}tags.json`)
    useArticleStore().$patch({ tagAmount: data.length })
    return data
}

export const fetchCategoryList = async () => {
    const data = await fetchJSON(`${prefix}categories.json`)
    useArticleStore().$patch({ categoryAmount: data.length })
    return data
}

export const fetchCount = async () => await fetchJSON(`${prefix}count.json`)

export const fetchBlogInfo = async () => await fetchJSON(`${prefix}blogInfo.json`)

export const fetchArticle = async (path: string) => await fetchJSON(path)

export const fetchFeaturedArticleList = () => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            const modules = import.meta.glob([
                `../../public/json/article/tech/2020/14.json`,
                `../../public/json/article/tech/2019/11.json`,
                `../../public/json/article/tech/2020/24.json`,
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
            const list: Array<any> = []
            let index = 0

            fetchTechArticleList({}, true).then((data: any) => {
                const newList = JSON.parse(JSON.stringify(data))
                newList.reverse()
                for (let i = newList.length - 1; i >= 0; i--) {
                    for (let j = 0; j < newList[i].list.length; j++) {
                        index++
                        list.push(newList[i].list[j])

                        if (index >= 3) break
                    }
                    if (index >= 3) break
                }
            })
            hideLoading()
            resolve(list)
        } catch (err: any) {
            hideLoading()
            reject(err)
        }
    })
}

export const fetchTechArticleList = (param: any, isQueryAll: boolean = false) => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            let allPageData: Array<any> = [],
                allArticles: Array<any> = [],
                allDataAmount = 0,
                currentDataTotal = 0,
                currentDataCount = 0,
                file: any,
                length = 0

            if (!isQueryAll) {
                useArticleStore().$patch({ categoryId: param.categoryId, tagId: param.tagId })
            }

            if (!useArticleStore().allArticles.length || isQueryAll) {
                const modules = [
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
                ]
                let temp,
                    fileTemp

                modules.forEach((item) => {
                    length = Object.keys(item.list).length
                    if (length) {
                        currentDataTotal += length
                        allDataAmount += length
                        file = {
                            date: item.date,
                            list: <any>[]
                        }
                        fileTemp = {
                            date: item.date,
                            list: <any>[]
                        }
                        for (let path in item.list) {
                            if (item.list[path]) {
                                temp = JSON.parse(item.list[path])
                                fileTemp.list.push(temp)
                                if (!isQueryAll) {

                                    if ((param.tagId && !temp.tagIds.split(',').includes(param.tagId + '')) || (param.categoryId && Number(temp.categoryId) !== Number(param.categoryId))) {
                                        currentDataTotal--
                                        temp = ''

                                        // 相等的时候表示一个时间年段内的循环已经完结，可以推入数组中 
                                        if (allPageData.length && currentDataCount === currentDataTotal) {
                                            allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))
                                        }
                                    } else {
                                        currentDataCount++

                                        if (!allPageData.length) {
                                            // 置空第一页
                                            allPageData = [[]]
                                        }

                                        if (currentDataCount >= param.pageSize && currentDataCount % param.pageSize === 0) {
                                            file.list.push(temp)
                                            allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))

                                            // 翻页了，置空下一页
                                            allPageData.push([])
                                            file.list = []
                                        } else {
                                            file.list.push(temp)

                                            // 相等的时候表示一个时间年段内的循环已经完结，可以推入数组中 
                                            if (currentDataCount === currentDataTotal) {
                                                allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        allArticles.push(fileTemp)
                    }
                })
                if (!isQueryAll) {
                    useArticleStore().$patch({ list: allPageData, total: currentDataTotal })
                }
                useArticleStore().$patch({ allArticles, articleAmount: allDataAmount })
            } else {
                useArticleStore().allArticles.forEach(data => {
                    length = data.list.length
                    currentDataTotal += length
                    file = {
                        date: data.date,
                        list: <any>[]
                    }

                    data.list.forEach((item: any) => {
                        if ((param.tagId && !item.tagIds.split(',').includes(param.tagId + '')) || (param.categoryId && Number(item.categoryId) !== Number(param.categoryId))) {
                            currentDataTotal--

                            // 相等的时候表示一个时间年段内的循环已经完结，可以推入数组中 
                            if (allPageData.length && currentDataCount === currentDataTotal) {
                                allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))
                            }
                        } else {
                            currentDataCount++
                            if (!allPageData.length) {
                                // 置空第一页
                                allPageData = [[]]
                            }

                            if (currentDataCount >= param.pageSize && currentDataCount % param.pageSize === 0) {
                                file.list.push(item)
                                allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))

                                // 翻页了，置空下一页
                                allPageData.push([])
                                file.list = []
                            } else {
                                file.list.push(item)

                                // 相等的时候表示一个时间年段内的循环已经完结，可以推入数组中 
                                if (currentDataCount === currentDataTotal) {
                                    allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))
                                }
                            }
                        }
                    })
                })

                useArticleStore().$patch({ list: allPageData, total: currentDataTotal })
            }
            hideLoading()
            resolve(allArticles)
        } catch (err: any) {
            hideLoading()
            reject(err)
        }
    })
}

export const fetchLifeNoteList = (param: any) => {
    return new Promise((resolve, reject) => {
        try {
            showLoading()
            let allPageData: Array<any> = [],
                allNotes: Array<any> = [],
                allDataAmount = 0,
                currentDataTotal = 0,
                currentDataCount = 0,
                file: any,
                length = 0
            if (!useNoteStore().allNotes.length) {
                const modules = [
                    {
                        date: '2023',
                        list: import.meta.glob(`../../public/json/article/life/2023/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2022',
                        list: import.meta.glob(`../../public/json/article/life/2022/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2021',
                        list: import.meta.glob(`../../public/json/article/life/2021/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2020',
                        list: import.meta.glob(`../../public/json/article/life/2020/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2019',
                        list: import.meta.glob(`../../public/json/article/life/2019/**.json`, { as: 'raw', eager: true })
                    },
                    {
                        date: '2018',
                        list: import.meta.glob(`../../public/json/article/life/2018/**.json`, { as: 'raw', eager: true })
                    },
                ]
                let temp,
                    fileTemp

                modules.forEach((item) => {
                    length = Object.keys(item.list).length
                    if (length) {
                        currentDataTotal += length
                        allDataAmount += length
                        file = {
                            date: item.date,
                            list: <any>[]
                        }
                        fileTemp = {
                            date: item.date,
                            list: <any>[]
                        }
                        for (let path in item.list) {
                            if (item.list[path]) {
                                temp = JSON.parse(item.list[path])
                                fileTemp.list.push(temp)
                                currentDataCount++

                                if (!allPageData.length) {
                                    // 置空第一页
                                    allPageData = [[]]
                                }
                                if (currentDataCount >= param.pageSize && currentDataCount % param.pageSize === 0) {
                                    file.list.push(temp)
                                    allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))

                                    // 翻页了，置空下一页
                                    allPageData.push([])
                                    file.list = []
                                } else {
                                    file.list.push(temp)

                                    // 相等的时候表示一个时间年段内的循环已经完结，可以推入数组中 
                                    if (currentDataCount === currentDataTotal) {
                                        allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))
                                    }
                                }
                            }
                        }
                        allNotes.push(fileTemp)
                    }
                })
                useNoteStore().$patch({ list: allPageData, total: currentDataTotal, allNotes, noteAmount: allDataAmount })
            } else {
                useNoteStore().allNotes.forEach((data: any) => {
                    length = data.list.length
                    currentDataTotal += length
                    file = {
                        date: data.date,
                        list: <any>[]
                    }
                    data.list.forEach((item: any) => {
                        currentDataCount++
                        if (!allPageData.length) {
                            // 置空第一页
                            allPageData = [[]]
                        }

                        if (currentDataCount >= param.pageSize && currentDataCount % param.pageSize === 0) {
                            file.list.push(item)
                            allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))

                            // 翻页了，置空下一页
                            allPageData.push([])
                            file.list = []
                        } else {
                            file.list.push(item)

                            // 相等的时候表示一个时间年段内的循环已经完结，可以推入数组中 
                            if (currentDataCount === currentDataTotal) {
                                allPageData[allPageData.length - 1].push(JSON.parse(JSON.stringify(file)))
                            }
                        }
                    })
                })
                useNoteStore().$patch({ list: allPageData, total: currentDataTotal })
            }
            hideLoading()
            resolve(allNotes)
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
