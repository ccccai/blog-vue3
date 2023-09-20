/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-09-17 17:13:56
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/stores/index.ts
 */
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
    state: () => {
        return {
            spinning: false
        }
    },
    actions: {
        setSpinning(params: boolean) {
            this.spinning = params
        }
    },
})
