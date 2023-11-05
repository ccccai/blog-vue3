<template>
    <div class="timeline-content">
        <div class="timeline-list">
            <div v-for="(item, index) in list"
                 :key="index">
                <template v-if="item.list.length">
                    <div class="list-year">{{ item.date }}</div>
                    <div class="list-box-info">
                        <template v-for="(article) in item.list">
                            <a :href="`/article?t=tech&y=${item.date}&id=${article.id}`"
                               class="list-box">
                                <div class="list-img"
                                     :style="{ backgroundImage: `url(${article.cover})` }" />
                                <div class="list-desc">
                                    <div class="desc-date">
                                        <a-avatar size="small"
                                                  :src="article.authorAvatar" />
                                        <img class="date-icon"
                                             src="@/assets/images/svg/time.svg" />
                                        <span class="date">{{ dayjs(article.createDate).format('LL') }}</span>
                                    </div>
                                    <div class="desc-title">{{ article.title }}</div>
                                    <div class="desc-subtitle">{{ article.subTitle }}</div>
                                </div>
                            </a>
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
<script setup lang="ts" name='TimelineList'>
import dayjs from '@/assets/dayjs'
import type { ArticleListProps } from '@/types'

const props = withDefaults(defineProps<{
    list?: ArticleListProps[],
    total?: number,
    pageSize?: number,
    pageNo?: number,
    bannerUrl?: string,
    onPageChange?: Function,
}>(), {
    list: () => [],
    total: 0,
    pageSize: 10,
    pageNo: 1,
    bannerUrl: '',
    onPageChange: () => {},
})

</script>
<style lang="less" scope>
@import '@/styles/timeline-list.less';
</style>