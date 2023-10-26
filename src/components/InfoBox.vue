<template>
    <a-row :gutter="[0, 20]"
           class="blog-info-content"
           justify="space-around">
        <a-col :span="24"
               class="blog-info-box persion-info">
            <div class="avatar">
                <img alt="头像"
                     title="头像"
                     src="@/assets/images/avatar.jpg" />
            </div>
            <div class="name">{{ nickName }}</div>
            <div class="sub-title">
                <template v-if="description.split('/').length > 1">
                    <span v-for="(desc, descIndex) in (description.split('/') || [])"
                          :key="'desc' + descIndex">
                        {{ descIndex === 0 ? '' : '/' }}{{ desc }}
                    </span>
                </template>
                <span v-else>{{ description }}</span>
            </div>
            <ul class="detail-list">
                <li class="detail-item">
                    <a href="/tech">
                        <div class="detail-item-top">ARTICLES</div>
                        <div class="detail-item-bottom">{{ count.articles || 0 }}</div>
                    </a>
                </li>
                <li class="detail-item">
                    <a href="/tech">
                        <div class="detail-item-top">TAGS</div>
                        <div class="detail-item-bottom">{{ count.tags || 0 }}</div>
                    </a>
                </li>
                <li class="detail-item">
                    <a href="/tech">
                        <div class="detail-item-top">CATEGORIES</div>
                        <div class="detail-item-bottom">{{ count.categories || 0 }}</div>
                    </a>
                </li>
            </ul>
            <ul class="third-party">
                <li class="third-party-item">
                    <img src="@/assets/images/svg/github.svg"
                         title="Git" />
                </li>
                <li class="third-party-item">
                    <img src="@/assets/images/svg/mail.svg"
                         title="Mail" />
                </li>
            </ul>
        </a-col>
        <a-col :span="24"
               class="blog-info-box category-info">
            <div class="info-box-title">
                <img src="@/assets/images/svg/category.svg"
                     title="Category" />
                <span>Categories</span>
            </div>
            <ul v-if="categories.length > 0"
                class="category-list">
                <li v-for="(category, index) in  categories"
                    @click="$router.push(`/tech?category=${category?.id}`)"
                    :key="`category${index}`"
                    :class="['category-list-item', {'active-category-item': Number(categoryId) === Number(category?.id)}]">
                    <span>{{ category?.name }}</span>
                    <span class="count">{{ category?.count }}</span>
                </li>
            </ul>
        </a-col>
        <a-col :span="24"
               class="blog-info-box tag-info">
            <div class="info-box-title">
                <img src="@/assets/images/svg/tag.svg"
                     title="Category" />
                <span>Tags</span>
            </div>
            <ul v-if="tags.length > 0"
                class="tags-list">
                <li v-for="(tag, index) in tags"
                    @click="$router.push(`/tech?tag=${tag?.id}`)"
                    :key="`tags${index}`"
                    class="tags-list-item"
                    :class="{'active-tags-item': Number(tagId) === Number(tag?.id)}"
                    :style="{ fontSize: getRendomFontSize(12, 20) }">
                    <span>{{ tag?.name }}</span>
                </li>
            </ul>
        </a-col>
    </a-row>
</template>
<script setup lang="ts" name="InfoBox">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { CountProps, ItemProps } from '@/types'

const props = withDefaults(defineProps<{
    nickName?: string,
    description?: string,
    tags?: ItemProps[],
    categories?: ItemProps[],
    count?: CountProps,
}>(), {
    nickName: '',
    description: '',
    tags: () => [],
    categories: () => [],
    count: () => ({
        articles: 0,
        tags: 0,
        categories: 0
    }),
})

const route = useRoute(),
    categoryId = ref<number>(Number(route.query?.category)),
    tagId = ref<number>(Number(route.query?.tag)),
    emit = defineEmits(['updateData'])

const getRendomFontSize = (min: number, max: number) => {
    const length = max - min
    const num = Math.ceil(Math.random() * length + min)
    return num
}

// 监听路由变化
watch(
    () => route.query,
    (val, oldVal) => {
        if (val?.tag !== oldVal?.tag || val?.category !== oldVal?.category) {
            tagId.value = Number(val.tag)
            categoryId.value = Number(val.category)
            emit('updateData')
        }
    }
)
</script>
<style lang="less">
@import '@/styles/blog-info-box.less';
</style>