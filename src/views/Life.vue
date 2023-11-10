<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
 * @LastEditTime: 2023-11-11 05:34:41
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
               :md="22"
               :lg="22"
               :xl="18"
               :xxl="18"
               class="life-box">
            <div class="life-content">
                <note-list :list="articleList"
                           :total="total"
                           :page-size="pageSize"
                           :page-no="pageNo"
                           :on-page-change="(page: number) => $router.push({ name: 'Life', query: { page } })" />
            </div>
        </a-col>
    </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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
            pager = reactive({
                total: 0,
                pageSize: 10,
                pageNo: Number(route.query?.page) || 1
            })

        const state = reactive({
            articleList: []
        })

        const navIndex = menuList.findIndex((item) => item.title_en === 'LIFE')
        if (navIndex > -1) {
            bannerImgUrl.value = menuList[navIndex].bannerImgUrl
        }

        onMounted(() => {
            initData()
        })

        const initData = () => {
            pager.pageNo = Number(route.query?.page) || 1
            handlePage(pager.pageNo, pager.pageSize)
        }

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
            initData,
            handlePage
        }
    }
})
</script>
