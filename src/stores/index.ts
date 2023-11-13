/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-13 08:35:42
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
    }
})

export const useNavStore = defineStore('nav', {
    state: () => {
        return {
            activeNav: -1
        }
    }
})

export const useScreenStore = defineStore('screen', {
    state: () => {
        return {
            clientHeight: 0,
            clientWidth: 0,
            isHigher: false,
        }
    }
})