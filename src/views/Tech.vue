<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
 * @LastEditTime: 2023-11-05 15:15:15
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/views/Tech.vue
-->
<template>
    <banner-box title="Technology"
                :banner-url="bannerImgUrl" />

    <a-row justify="center"
           class="tech-content">
        <a-col :xs="22"
               :sm="20"
               :lg="10"
               :xl="8"
               :xxl="6"
               class="tech-left">
            <blog-info :nick-name="nickName"
                       :description="description"
                       :categories="categories"
                       :tags="tags"
                       :count="count"
                       @update-data="initData" />
        </a-col>
        <a-col :xs="22"
               :sm="20"
               :lg="14"
               :xl="12"
               :xxl="12"
               class="tech-right">
            <timeline-list :list="articleList"
                           :total="total"
                           :page-size="pageSize"
                           :page-no="pageNo"
                           :on-page-change="handlePage" />
        </a-col>
    </a-row>
</template> 
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BannerBox from '@/components/BannerBox.vue'
import BlogInfo from '@/components/InfoBox.vue'
import TimelineList from '@/components/TimelineList.vue'
import { fetchTechArticleList, fetchTagList, fetchCategoryList, fetchBlogInfo } from '@/api'
import { navList as menuList } from '@/assets/settings'
import type { CountProps, ItemProps, ArticleListProps, IResponseData } from '@/types'

interface stateProps {
    count: CountProps
    categories: ItemProps[]
    tags: ItemProps[],
    articleList: ArticleListProps[]
}
export default defineComponent({
    ame: "Tech",
    components: {
        BannerBox,
        BlogInfo,
        TimelineList
    },
    setup() {
        const route = useRoute(),
            bannerImgUrl = ref<string>(''),
            state = reactive<stateProps>({
                count: {
                    articles: 0,
                    tags: 0,
                    categories: 0
                },
                categories: [],
                tags: [],
                articleList: []
            }),
            pager = reactive({
                total: 0,
                pageSize: 10,
                pageNo: 1,
            }),
            userInfo = reactive({
                nickName: '',
                description: '',
            })

        const navIndex = menuList.findIndex(item => item.title_en === 'TECH')
        if (navIndex > -1) {
            bannerImgUrl.value = menuList[navIndex].bannerImgUrl
        }

        const handlePage = async (pageNo: number, pageSize: number, categoryId: number, tagId: number) => {
            pager.pageSize = pageSize
            pager.pageNo = pageNo
            const param: any = { pageNo, pageSize, type: 1 }
            if (categoryId > 0) {
                param.categoryId = categoryId
            }
            if (tagId > 0) {
                param.tagId = tagId
            }
            const fetchRes = await fetchTechArticleList(param)
            if (fetchRes) {
                state.articleList = fetchRes?.list || []
                pager.total = fetchRes?.total || 0
            }
        }

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

        const initData = () => {
            handlePage(1, pager.pageSize, Number(route.query?.category), Number(route.query?.tag))
        }

        onMounted(() => {
            initData()
            getTags()
            getCategories()
            getInfo()
        })

        return {
            ...toRefs(userInfo),
            ...toRefs(state),
            ...toRefs(pager),
            bannerImgUrl,
            handlePage,
            initData
        }
    }
})
</script>
<style lang="less">
@import '@/styles/tech.less';
</style>