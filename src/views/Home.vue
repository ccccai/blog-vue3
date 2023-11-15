<!--
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-15 18:14:30
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
                   :sm="22"
                   :md="20"
                   :lg="22"
                   :xl="21"
                   :xxl="18"
                   class="home-box">
                <div class="box-title">
                    <div class="title-content">
                        <div class="text">Recent Articles</div>
                    </div>
                    <div class="gap" />
                </div>
                <a-row class="box-content"
                       justify="space-between"
                       :gutter="[{ xs: 8, sm: 8, md: 24, lg: 36, xl: 38, xxl: 50 }, 20]">
                    <a-col v-for="(item, index) in recentArticles"
                           :key="'dd' + index"
                           :xs="24"
                           :sm="24"
                           :md="24"
                           :lg="8"
                           :xl="8"
                           class="card-box">
                        <router-link :to="`/article?id=${item.id}`">
                            <a-card class="card-item">
                                <template #cover>
                                    <div class="cover-img"
                                         :style="{ height: '200px' }">
                                        <img-box class="article-img"
                                                 :src="item.cover" />
                                    </div>
                                </template>
                                <a-card-meta class="box-bottom-title"
                                             :title="item.title">
                                    <template #description>{{ item.subTitle }}</template>
                                </a-card-meta>
                            </a-card>
                        </router-link>
                    </a-col>
                </a-row>
            </a-col>

            <a-col :xs="22"
                   :sm="22"
                   :md="20"
                   :lg="22"
                   :xl="21"
                   :xxl="18">
                <a-row justify="space-between"
                       :gutter="0">
                    <a-col :xs="24"
                           :sm="24"
                           :md="24"
                           :lg="10"
                           :xl="9"
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
                    <a-col :md="24"
                           :lg="13"
                           :xl="14"
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
                                <router-link :to="`/article?id=${item.id}`">
                                    <a-card class="card-item">
                                        <template #cover>
                                            <div class="cover-img"
                                                 :style="{ height: '250px' }">
                                                <img-box class="article-img"
                                                         :src="item.cover" />
                                            </div>
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
                                </router-link>
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
import { type IResponseData } from '@/types'
import { fetchHomeData } from '@/api'
import { navList } from "@/assets/settings"
import BlogInfo from '@/components/InfoBox.vue'
import ImgBox from '@/components/ImgBox.vue'
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

const getHomePageData = async () => {
    const fetchRes = await fetchHomeData()
    const { resultCode, data } = fetchRes as IResponseData
    if (resultCode === 0) {
        const info = data?.blogInfo?.length ? data.blogInfo[0] : {}
        userInfo.nickName = info?.nickName
        userInfo.description = info?.description
        state.categories = data?.categories
        state.featuredArticles = data?.featuredArticles
        state.recentArticles = data?.recentArticles
        state.tags = data?.tags
        state.count = data?.count
    }
}

onMounted(() => {
    getHomePageData()
})
</script>
<style lang="less">
@import '@/styles/home.less';
</style>
