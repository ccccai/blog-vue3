/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-08 12:04:33
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/stores/note.ts
 */
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', {
    state: () => {
        return {
            list: [] as Array<any>,
            allNotes: [] as Array<any>,
            noteAmount: 0 as number,
            total: 0 as number,
            pageNo: 1 as number,
            pageSize: 10 as number
        }
    }
})
