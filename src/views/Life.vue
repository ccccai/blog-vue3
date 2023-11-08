<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
 * @LastEditTime: 2023-11-08 12:27:13
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
import { fetchLifeNoteList } from '@/api'
import { navList as menuList } from '@/assets/settings'
import { useNoteStore } from "@/stores/note"

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

            // 缓存里面没有要的数据，重新遍历目录，获取静态数据
            if (!useNoteStore().list.length || pageSize !== Number(useNoteStore().pageSize)) {
                await fetchLifeNoteList(pager)
            }

            useNoteStore().$patch({ pageNo: pager.pageNo, pageSize: pager.pageSize })
            state.articleList = useNoteStore().list[pager.pageNo - 1]
            pager.total = useNoteStore().total
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
