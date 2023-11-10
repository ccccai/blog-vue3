<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
<<<<<<< HEAD
 * @LastEditTime: 2023-11-10 23:15:23
=======
 * @LastEditTime: 2023-11-11 05:07:08
>>>>>>> 4b17abf... enhancement: 响应式优化
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/views/Tech.vue
-->
<template>
    <banner-box title="Technology"
                :banner-url="bannerImgUrl" />

    <a-row justify="center"
    :gutter="{ xs: 8, sm: 8, lg:28, xl: 40, xxl: 50 }"
           class="tech-content">
        <a-col :xs="24"
               :md="22"
               :lg="9"
               :xl="8"
               :xxl="8"
               class="tech-left">
            <blog-info :nick-name="nickName"
                       :description="description"
                       :categories="categories"
                       :tags="tags"
                       @update-data="initData" />
        </a-col>
        <a-col :xs="24"
               :md="22"
               :lg="14"
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
import { fetchTechArticleList, fetchTagList, fetchCategoryList, fetchBlogInfo } from '@/api'
import { navList as menuList } from '@/assets/settings'
import type { ItemProps, ArticleListProps, IResponseData } from '@/types'
import { useArticleStore } from "@/stores/article"

interface stateProps {
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

            // 缓存里面没有要的数据，重新遍历目录，获取静态数据
            if (!useArticleStore().list.length || categoryId !== Number(useArticleStore().categoryId) || tagId !== Number(useArticleStore().tagId) || pageSize !== Number(useArticleStore().pageSize)) {
                await fetchTechArticleList(param)
            }

            useArticleStore().$patch({ pageNo: pager.pageNo, pageSize: pager.pageSize })
            state.articleList = useArticleStore().list[pager.pageNo - 1]
            pager.total = useArticleStore().total
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
            pager.pageNo = Number(route.query?.page) || 1
            handlePage(pager.pageNo, pager.pageSize, Number(route.query?.category), Number(route.query?.tag))
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