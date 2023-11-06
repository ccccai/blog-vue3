<!--
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-06 19:18:02
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/views/Home.vue
-->
<template>
    <base-layout class="home">
        <div class="home-top-bg"
             :style="{
                 backgroundImage: `url(${topImgUrl})`,
             }"></div>

        <a-row justify="center"
               class="home-content">
            <a-col :xs="22"
                   :sm="20"
                   :md="17"
                   :lg="20"
                   :xl="19"
                   :xxl="16"
                   class="home-box">
                <div class="box-title">
                    <div class="title-content">
                        <div class="text">Recent Articles</div>
                    </div>
                    <div class="gap" />
                </div>
                <a-row class="box-content"
                       justify="space-between"
                       :gutter="[{ xs: 8, sm: 8, md: 24, xl: 24, xxl: 24 }, 20]">
                    <a-col v-for="(item, index) in recentArticles"
                           :key="'dd' + index"
                           :xs="24"
                           :sm="24"
                           :md="24"
                           :lg="8"
                           :xl="8"
                           class="card-box">
                        <a :href="`/article/tech/${item.year}/${item.id}`">
                            <a-card class="card-item">
                                <template #cover>
                                    <div class="cover-img"
                                         :style="{ height: '200px', backgroundImage: `url(${item.cover})` }" />
                                </template>
                                <a-card-meta class="box-bottom-title"
                                             :title="item.title">
                                    <template #description>{{ item.subTitle }}</template>
                                </a-card-meta>
                            </a-card>
                        </a>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :xs="24"
                   :sm="22"
                   :md="20"
                   :lg="20"
                   :xl="19"
                   :xxl="16">
                <a-row justify="center"
                       :gutter="40">
                    <a-col :xs="22"
                           :sm="22"
                           :md="20"
                           :lg="10"
                           :xl="10"
                           :xxl="10"
                           class="home-box">
                        <div class="box-title">
                            <div class="title-content">
                                <div class="text">Blog Info</div>
                            </div>
                            <div class="gap"></div>
                        </div>
                        <blog-info :nick-name="nickName"
                                   :description="description"
                                   :categories="categories"
                                   :tags="tags"
                                   :count="count" />
                    </a-col>
                    <a-col :xs="22"
                           :sm="22"
                           :md="20"
                           :lg="14"
                           :xl="14"
                           :xxl="14"
                           class="home-box">
                        <div class="box-title">
                            <div class="title-content">
                                <div class="text">Featured Articles</div>
                            </div>
                            <div class="gap"></div>
                        </div>


                        <a-row justify="space-around"
                               class="box-content"
                               :gutter="[0, 40]">

                            <a-col v-for="(item, index) in featuredArticles"
                                   :key="'card' + index"
                                   :span="24"
                                   class="card-box">
                                <a :href="`/article/tech/${item.year}/${item.id}`">
                                    <a-card class="card-item">
                                        <template #cover>
                                            <div class="cover-img"
                                                 :style="{ height: '250px', backgroundImage: `url(${item.cover})` }" />
                                        </template>
                                        <div class="box-description">
                                            <div class="tag-content">
                                                <a-tag v-for="(tag, tagIndex) in item.tagList"
                                                       :key="'tag' + tagIndex"
                                                       color="cyan">
                                                    {{ tag.name }}
                                                </a-tag>
                                            </div>

                                            <h1 class="title">{{ item.title || '' }}</h1>
                                            <p class="default description">{{ item.description }}</p>
                                            <div class="bottom-line">
                                                <a-avatar :src="item.authorAvatar" />
                                                <span class="memo">by </span>
                                                <span class="default">{{ item.author }}</span>
                                                <span class="gary-gap" />
                                                <span class="memo">{{ dayjs(item.createDate).format('LL') }}</span>
                                            </div>
                                        </div>
                                    </a-card>
                                </a>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </base-layout>
</template>
<script setup lang="ts" name="Home">
import { reactive, ref, onMounted, toRefs } from 'vue'
import { fetchFeaturedArticleList, fetchRecentArticleList, fetchTagList, fetchCategoryList, fetchCount, fetchBlogInfo } from '@/api'
import { navList } from "@/assets/settings"
import BlogInfo from '@/components/InfoBox.vue'
import dayjs from '@/assets/dayjs'
import type { CountProps, ItemProps, ArticleProps } from '@/types'

const topImgUrl = ref<string>('')
const navIndex = navList.findIndex(item => item.title_en === 'HOME')
if (navIndex > -1) {
    topImgUrl.value = navList[navIndex].bannerImgUrl
}

interface stateProps {
    count: CountProps
    categories: ItemProps[]
    tags: ItemProps[],
    featuredArticles?: ArticleProps[]
    recentArticles?: ArticleProps[]
}
const state = reactive<stateProps>({
        count: {
            articles: 0,
            tags: 0,
            categories: 0
        },
        categories: [],
        tags: [],
        featuredArticles: [],
        recentArticles: [],
    }),
    userInfo = reactive({
        nickName: '',
        description: '',
    })

const { count, categories, tags, featuredArticles, recentArticles } = toRefs(state)
const { nickName, description } = toRefs(userInfo)

const getInfo = async () => {
    const fetchRes = await fetchBlogInfo()
    if (fetchRes) {
        userInfo.nickName = fetchRes?.nickName
        userInfo.description = fetchRes?.description
    }
}

const getTags = async () => {
    const fetchRes = await fetchTagList()
    if (fetchRes) {
        state.tags = fetchRes
    }
}

const getCategories = async () => {
    const fetchRes = await fetchCategoryList()
    if (fetchRes) {
        state.categories = fetchRes
    }
}

const getCount = async () => {
    const fetchRes = await fetchCount()
    if (fetchRes) {
        state.count = fetchRes
    }
}

const getFeaturedArticle = async () => {
    const fetchRes = await fetchFeaturedArticleList()
    if (fetchRes) {
        state.featuredArticles = fetchRes.map((item: any) => {
            if (item.createDate) {
                item.year = item.createDate.split('-')[0]
            }
            return item
        })
    }
}

const getRecentArticle = async () => {
    const fetchRes = await fetchRecentArticleList()
    if (fetchRes) {
        state.recentArticles = fetchRes.map((item: any) => {
            if (item.createDate) {
                item.year = item.createDate.split('-')[0]
            }
            return item
        })
    }
}

onMounted(() => {
    getFeaturedArticle()
    getRecentArticle()
    getTags()
    getCategories()
    getCount()
    getInfo()
})
</script>
<style lang="less">
@import '@/styles/home.less';
</style>
