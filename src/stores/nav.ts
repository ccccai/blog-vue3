/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-07 10:25:10
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/stores/nav.ts
 */
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
    state: () => {
        return {
            activeNav: -1
        }
    }
})
