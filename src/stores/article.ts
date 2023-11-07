/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-08 01:35:23
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/stores/article.ts
 */
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            list: [] as Array<any>,
            allArticles: [] as Array<any>,
            articleAmount: 0 as number,
            tagAmount: 0 as number,
            categoryAmount: 0 as number,
            total: 0 as number,
            pageNo: 1 as number,
            pageSize: 10 as number,
            categoryId: null as any,
            tagId: null as any,
        }
    }
})
