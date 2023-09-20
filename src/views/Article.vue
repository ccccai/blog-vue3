<template>
    <div v-if="!isCreate && !data?.id"
         class="empty-content">
        <span class="empty-tips">{{ tips || '啊哦。找不到内容~' }}</span>
    </div>
    <div v-else
         class="article-content">
        <a-row justify="center">
            <a-col :xs="24"
                   :sm="22"
                   :xxl="20"
                   v-if="isCreate || editArticleId > 0">
                <div class="md-editor-btn">
                    <pop-form :data="data"
                              :open-popcon.sync="openPopcon"
                              :tag-list="tagList"
                              :category-list="categoryList"
                              :on-confirm="handleEditSubmit"
                              :handle-open="handleOpenPopcon" />
                </div>
                <div class="title-input-content">
                    <a-input v-model:value="title"
                             :max-length="20"
                             show-count
                             size="large"
                             placeholder="请输入标题" />
                </div>
                <div class="title-input-content">
                    <a-input v-model:value="subTitle"
                             :max-length="50"
                             show-count
                             size="large"
                             placeholder="请输入副标题" />
                </div>
                <div class="description-input-content">
                    <a-textarea v-model:value="desc"
                                :max-length="250"
                                :auto-size="{ minRows: 3, maxRows: 5 }"
                                show-count
                                size="large"
                                placeholder="请输入简介" />
                </div>
                <div class="md-editor-content">
                    <md-editor ref="mdEditor"
                               :initialValue="content"
                               :height="`${contentHeight}px` || '510px'"
                               @input="handleContent" />
                </div>
            </a-col>
            <template v-else>
                <a-col :xs="24"
                       :sm="20"
                       :xxl="16">
                    <div class="article-box">
                        <div class="article-desc">
                            <div class="desc-title">{{ title }}</div>
                            <div class="desc-subtitle">{{ subTitle }}</div>
                            <div class="desc-date">
                                <a-avatar size="small"
                                          :src="data.avatarUrl" />
                                <img class="date-icon"
                                     src="@/assets/images/svg/time.svg" />
                                <span class="date">{{ dateStr }}</span>
                            </div>
                        </div>
                        <div v-show="data.coverUrl" class="article-img"
                             :style="{ backgroundImage: `url(${data.coverUrl})` }" />
                        <div class="desc-text">{{ desc }}</div>
                    </div>
                </a-col>
                <a-col :xs="24"
                       :sm="20"
                       :xxl="16"
                       class="md-viewer-content">
                    <md-viewer :initial-value="content" />
                </a-col>
            </template>
        </a-row>
        <a-back-top :visibility-height="pageHeight / 2" />
    </div>
</template>
<script lang="ts">
import { ref, toRefs, reactive, defineComponent, watch, onMounted } from 'vue'
import { fetchArticle, fetchTagList, fetchCategoryList, updateArticle, createArticle } from '@/api'
import { useRoute } from 'vue-router'
import PopForm from '@/components/PopForm.vue'
import MdViewer from '@/components/MdViewer.vue'
import MdEditor from '@/components/MdEditor.vue'
import dayjs from '@/assets/dayjs'
import { message } from 'ant-design-vue'
import type { PopFormState, ItemProps, IResponseData } from '@/types'

interface stateProps {
    categoryList: ItemProps[]
    tagList: ItemProps[],
    data: PopFormState
}
export default defineComponent({
    name: 'Article',
    components: {
        PopForm,
        MdViewer,
        MdEditor
    },
    setup(props) {
        const route = useRoute()
        const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            contentHeight = innerHeight - 80 - 20,
            title = ref<string>(''),
            subTitle = ref<string>(''),
            desc = ref<string>(''),
            tips = ref<string>(''),
            content = ref<string>(''),
            dateStr = ref<string>(''),
            isCreate = ref<boolean>(route.path === '/article/create'),
            openPopcon = ref<boolean>(false),
            editArticleId = ref<number>(Number(route.query?.editid || 0)),
            articleId = ref<number>(Number(route.query?.id) || 0),
            state = reactive<stateProps>({
                data: {},
                categoryList: [],
                tagList: []
            })

        const getArticle = async (id: number) => {
            const fetchRes = await fetchArticle(id)
            const { resultCode, data } = fetchRes as IResponseData
            if (resultCode === 0) {
                state.data = {
                    id: Number(data?.id),
                    type: data?.type,
                    author: data?.author,
                    date: Number(data?.groupTimestamp),
                    tag: data?.tagIds ? data?.tagIds.split(',').map((item: any) => Number(item)) : [],
                    category: data?.categoryId,
                    weight: data?.weight,
                    coverUrl: data?.cover,
                    avatarUrl: data?.authorAvatar,
                }
                dateStr.value = dayjs(Number(data?.groupTimestamp)).format('LL')
                title.value = data?.title
                subTitle.value = data?.subTitle
                desc.value = data?.description
                content.value = data?.content
            }
        }

        const getTagList = async () => {
            const fetchRes = await fetchTagList()
            const { resultCode, data } = fetchRes as IResponseData
            if (resultCode === 0) {
                state.tagList = data.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                }))
            }
        }

        const getCategoryList = async () => {
            const fetchRes = await fetchCategoryList()
            const { resultCode, data } = fetchRes as IResponseData
            if (resultCode === 0) {
                state.categoryList = data.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                }))
            }
        }

        const handleOpenPopcon = (isOpen: boolean) => {
            console.log('---------isOpen:', isOpen)
            openPopcon.value = isOpen
        }

        const handleEditSubmit = async (data: any) => {
            console.log('---------params:', data)
            const params = {
                ...data,
            }
            params.groupTimestamp = dayjs(params.date).valueOf()
            params.title = title.value
            params.subTitle = subTitle.value
            params.description = desc.value
            params.content = content.value

            if (!!editArticleId.value) {
                params.id = editArticleId.value
                const fetchRes: any = await updateArticle(params)
                if (fetchRes && fetchRes?.resultCode === 0) {
                    message.success('修改成功~~~')
                    handleOpenPopcon(false)
                }
            } else if (isCreate.value) {
                delete params.id
                const fetchRes: any = await createArticle(params)
                if (fetchRes && fetchRes?.resultCode === 0) {
                    message.success('新建成功~~~')
                    handleOpenPopcon(false)
                }
            }
        }

        const initData = (articleId: number = 0, editArticleId: number = 0) => {
            console.log('---------articleId:', articleId)
            console.log('---------editArticleId:', editArticleId)
            console.log('---------isCreate:', isCreate.value)
            if (articleId || editArticleId) {
                getArticle(articleId || editArticleId)
            }

            if (isCreate.value || editArticleId) {
                getTagList()
                getCategoryList()
            }
        }

        const handleContent = (val: string) => {
            console.log(4444, val)
            if (typeof val === 'string') {
                console.log(5555, val)
                content.value = val
            }
        }

        // 监听路由变化
        watch(
            () => route.query,
            (val, oldVal) => {
                if (val?.id !== oldVal?.id || val?.editid !== oldVal?.editid) {
                    articleId.value = Number(val?.id || 0)
                    editArticleId.value = Number(val?.editid || 0)
                    initData(articleId.value, editArticleId.value)
                }
            }
        )

        onMounted(() => {
            initData(articleId.value, editArticleId.value)
        })

        return {
            ...toRefs(state),
            pageHeight,
            contentHeight,
            title,
            subTitle,
            desc,
            tips,
            isCreate,
            openPopcon,
            content,
            dateStr,
            editArticleId,
            handleEditSubmit,
            handleOpenPopcon,
            handleContent
        }
    }
})
</script>
<style lang="less" scope>
@import '@/styles/article.less';
</style>