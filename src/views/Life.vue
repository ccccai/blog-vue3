<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
 * @LastEditTime: 2023-09-18 00:25:45
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/views/Life.vue
-->
<template>
    <banner-box title="Life Notes"
                :banner-url="bannerImgUrl" />

    <a-row justify="center">
        <a-col :xs="22"
               :sm="22"
               :lg="22"
               :xl="18"
               :xxl="16"
               class="life-box">
            <div class="life-content">
                <note-list :list="articleList"
                           :total="total"
                           :page-size="pageSize"
                           :page-no="pageNo"
                           :on-page-change="handlePage" />
            </div>
        </a-col>
    </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import BannerBox from '@/components/BannerBox.vue'
import NoteList from '@/components/NoteList.vue'
import { fetchArticleList } from '@/api'
import { type IResponseData } from '@/types'
import { navList as menuList } from '@/assets/settings'

export default defineComponent({
    ame: 'Life',
    components: {
        BannerBox,
        NoteList
    },
    setup() {
        const
            pager = reactive({
                total: 0,
                pageSize: 10,
                pageNo: 1,
            }),
            bannerImgUrl = ref<string>('')

        const state = reactive({
            articleList: []
        })

        const navIndex = menuList.findIndex((item) => item.title_en === 'LIFE')
        if (navIndex > -1) {
            bannerImgUrl.value = menuList[navIndex].bannerImgUrl
        }

        onMounted(() => {
            handlePage(1, 10)
        })

        const handlePage = async (pageNo: number, pageSize: number) => {
            pager.pageSize = pageSize
            pager.pageNo = pageNo
            const fetchRes = await fetchArticleList({ pageNo, pageSize, type: 2 })
            const { resultCode, data } = fetchRes as IResponseData
            if (Number(resultCode) === 0 && data) {
                state.articleList = data?.list || []
                pager.total = data?.total || 0
            }
        }

        return {
            ...toRefs(state),
            ...toRefs(pager),
            bannerImgUrl,
            handlePage
        }
    }
})
</script>
