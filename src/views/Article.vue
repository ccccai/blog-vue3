<template>
    <div v-if="!isCreate && !data?.id"
         class="empty-content">
        <span class="empty-tips">{{ tips }}</span>
    </div>
    <div v-else
         class="article-content">
        <a-row justify="center">
            <a-col :xs="23"
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
                               :initial-value="content"
                               :height="`${contentHeight}px` || '510px'"
                               @input="handleContent" />
                </div>
            </a-col>
            <template v-else>
                <a-col :xs="22"
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
                        <div v-show="data.coverUrl"
                             class="article-cover">
                            <span class="img-border img-top-border" />
                            <img-box class="article-img"
                                       :src="data.coverUrl" />
                            <span class="img-border img-bottom-border" />
                        </div>
                        <div v-show="desc"
                             class="desc-text">
                            <p>写在前面：</p>
                            <span>{{ desc }}</span>
                        </div>
                    </div>
                </a-col>
                <a-col :xs="22"
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
import { prefix, fetchArticle, fetchTagList, fetchCategoryList, updateArticle, createArticle } from '@/api'
import { useRoute } from 'vue-router'
import PopForm from '@/components/PopForm.vue'
import MdViewer from '@/components/MdViewer.vue'
import MdEditor from '@/components/MdEditor.vue'
import ImgBox from '@/components/ImgBox.vue'
import dayjs from '@/assets/dayjs'
import { message } from 'ant-design-vue'
import type { PopFormState, ItemProps } from '@/types'

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
        MdEditor,
        ImgBox
    },
    setup(props) {
        const route = useRoute()
        const pageHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            contentHeight = innerHeight - 60,
            title = ref<string>(''),
            subTitle = ref<string>(''),
            desc = ref<string>(''),
            tips = ref<string>('...'),
            content = ref<string>(''),
            dateStr = ref<string>(''),
            isCreate = ref<boolean>(route.path === '/article/create'),
            openPopcon = ref<boolean>(false),
            editArticleId = ref<number>(Number(route.params?.editid || 0)),
            articleId = ref<number>(Number(route.params?.id) || 0),
            articleYear = ref<any>(route.params?.year || ''),
            articleType = ref<any>(route.params?.type || ''),
            state = reactive<stateProps>({
                data: {},
                categoryList: [],
                tagList: []
            })

        const getArticle = async (id: number) => {
            try {
                const fetchRes = await fetchArticle(`${prefix}article/${articleType.value}/${articleYear.value}/${id}.json`)

                state.data = {
                    id: Number(fetchRes?.id),
                    type: fetchRes?.type,
                    author: fetchRes?.author,
                    date: Number(fetchRes?.groupTimestamp),
                    tag: fetchRes?.tagIds ? fetchRes?.tagIds.split(',').map((item: any) => Number(item)) : [],
                    category: fetchRes?.categoryId,
                    weight: fetchRes?.weight,
                    coverUrl: fetchRes?.cover,
                    avatarUrl: fetchRes?.authorAvatar,
                }
                dateStr.value = dayjs(Number(fetchRes?.groupTimestamp)).format('LL')
                title.value = fetchRes?.title
                subTitle.value = fetchRes?.subTitle
                desc.value = fetchRes?.description
                content.value = fetchRes?.content
            } catch (err: any) {
                tips.value = '啊哦。找不到内容~'
            }
        }

        const getTagList = async () => {
            const fetchRes = await fetchTagList()
            if (fetchRes) {
                state.tagList = fetchRes
            }
        }

        const getCategoryList = async () => {
            const fetchRes = await fetchCategoryList()
            if (fetchRes) {
                state.categoryList = fetchRes
            }
        }

        const handleOpenPopcon = (isOpen: boolean) => {
            openPopcon.value = isOpen
        }

        const handleEditSubmit = async (data: any) => {
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
            if (articleId || editArticleId) {
                getArticle(articleId || editArticleId)
            }

            if (isCreate.value || editArticleId) {
                getTagList()
                getCategoryList()
            }
        }

        const handleContent = (val: string) => {
            if (typeof val === 'string') {
                content.value = val
            }
        }

        // 监听路由变化
        watch(
            () => route.params,
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