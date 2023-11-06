<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:34:13
 * @LastEditTime: 2023-11-06 19:16:43
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/NoteItem.vue
-->
<template>
    <a :href="`/article/life/${year}/${id}`"
       class="note-list-box">
        <div class="list-img"
             :style="{ backgroundImage: `url(${cover})` }" />
        <div class="list-desc">
            <div class="desc-title">{{ title }}</div>
            <div class="desc-subtitle">{{ subTitle }}</div>
            <div class="desc-date">
                <a-avatar size="small"
                          :src="authorAvatar" />
                <img class="date-icon"
                     src="@/assets/images/svg/time.svg" />
                <span class="date">{{ dayjs(createDate).format('LL') }}</span>
            </div>
            <div class="desc-text">{{ description }}</div>
        </div>
    </a>
</template>
<script setup lang="ts" name='NoteItem'>
import { toRefs } from 'vue'
import dayjs from '@/assets/dayjs'
import type { ArticleProps } from '@/types'

const props = withDefaults(defineProps<{
    data?: ArticleProps,
    year?: string,
}>(), {
    data: () => ({}),
    year: '',
})
const { id, cover, title, subTitle, authorAvatar, createDate, description } = toRefs(props.data)
</script>
<style lang="less" scope>
@import '@/styles/note-item.less';
</style>