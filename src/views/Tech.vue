<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
 * @LastEditTime: 2023-11-11 13:50:40
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/views/Tech.vue
-->
<template>
    <banner-box title="Technology"
                :banner-url="bannerImgUrl" />

    <a-row justify="center"
    :gutter="0"
           class="tech-content">
        <a-col :xs="22"
               :lg="9"
               :xl="8"
               :xxl="8"
               class="tech-left">
            <blog-info :nick-name="nickName"
                       :description="description"
                       :categories="categories"
                       :tags="tags"
                       :count="count"
                       @update-data="initData" />
        </a-col>
        <a-col :xs="22"
               :lg="12"
               :xl="12"
               :xxl="12"
               class="tech-right">
            <timeline-list :list="articleList"
                           :total="total"
                           :page-size="pageSize"
                           :page-no="pageNo"
                           :on-page-change="(page: number) => $router.push({name: 'Tech', query: { page }})" />
        </a-col>
    </a-row>
</template> 
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BannerBox from '@/components/BannerBox.vue'
import BlogInfo from '@/components/InfoBox.vue'
import TimelineList from '@/components/TimelineList.vue'
import { fetchArticleList, fetchSidebarData } from '@/api'
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
    // 监听路由变化
    watch: {
        $route: {
            handler(val, oldVal) {
                if (val.query?.page !== oldVal.query?.page) {
                    this.initData()
                }
            }
            ,
            deep: true
        }
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
                pageNo: Number(route.query?.page) || 1,
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
            const fetchRes = await fetchArticleList(param)
            const { resultCode, data } = fetchRes as IResponseData
            if (Number(resultCode) === 0 && data) {
                state.articleList = data?.list || []
                pager.total = data?.total || 0
            }
        }

        const getSidebarData = async () => {
            const fetchRes = await fetchSidebarData()
            const { resultCode, data } = fetchRes as IResponseData
            if (resultCode === 0) {
                const info = data?.blogInfo?.length ? data.blogInfo[0] : {}
                userInfo.nickName = info?.nickName
                userInfo.description = info?.description
                state.categories = data?.categories
                state.tags = data?.tags
                state.count = data?.count
            }
        }

        const initData = () => {
            pager.pageNo = Number(route.query?.page) || 1
            handlePage(pager.pageNo, pager.pageSize, Number(route.query?.category), Number(route.query?.tag))
        }

        onMounted(() => {
            initData()
            getSidebarData()
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