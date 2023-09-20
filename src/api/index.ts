/*
 * @Author: caishiyin
 * @Date: 2023-09-06 13:01:20
 * @LastEditTime: 2023-09-17 02:15:27
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/api/index.ts
 */

import { fetchGet, fetchPost } from './services'

export const fetchHomeData = async () =>
    await fetchGet({
        url: '/blog/home',
    })

export const fetchSidebarData = async () =>
    await fetchGet({
        url: '/blog/sidebar',
    })

export const fetchTagList = async () =>
    await fetchGet({
        url: '/blog/tagList',
    })

export const fetchCategoryList = async () =>
    await fetchGet({
        url: '/blog/categoryList',
    })

export const fetchArticleList = async (param: any) =>
    await fetchPost({
        url: '/blog/articleList',
        param,
    })

export const fetchArticle = async (id: any) =>
    await fetchGet({
        url: '/blog/article',
        param: {id},
    })

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
