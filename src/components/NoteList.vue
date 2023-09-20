<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:12:37
 * @LastEditTime: 2023-09-21 04:31:05
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/NoteList.vue
-->
<template>
    <div class="notes-content">
        <div class="notes-list"
             :style="{ backgroundImage: `url(${bannerUrl})` }">
            <div v-for="(item, index) in list"
                 :key="index">
                <template v-if="item.list.length">
                    <div class="list-year">{{ item.date }}</div>
                    <div class="list-box-info">
                        <template v-for="(article) in item.list">
                            <note-item :data="article" />
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <div class="pager-content">
            <a-pagination v-if="total"
                          :show-total="(total: number) => `Total ${total} article`"
                          :page-size="pageSize"
                          :current="pageNo"
                          :total="total"
                          :on-change="onPageChange" />
            <span v-else>这个作者很懒，什么都没有写~~</span>
        </div>
    </div>
</template>
<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import NoteItem from '@/components/NoteItem.vue'
import type { ArticleListProps } from '@/types'

export default defineComponent({
    name: 'NotesList',
    components: {
        NoteItem
    },
    props: {
        list: {
            type: Array as PropType<ArticleListProps[]>,
            default: []
        },
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageNo: {
            type: Number,
            default: 1
        },
        onPageChange: {
            type: Function,
            default: () => { }
        },
        bannerUrl: {
            type: String,
            default: ''
        }
    },
})
</script>
<style lang="less" scope>
@import '@/styles/note-list.less';
</style>