<template>
    <a-popconfirm :open="openPopcon"
                  :ok-button-props="{ size: 'large' }"
                  :cancel-button-props="{ size: 'large' }"
                  @cancel="handleOpen(false)"
                  @confirm="onConfirm({
                      type: formState.type,
                      author: formState.author,
                      date: formState.dateParse,
                      weight: formState.weight,
                      tagIds: formState.tag && formState.tag.length > 0 ? formState.tag.join() : '',
                      categoryId: formState.category,
                      cover: formState.coverUrl,
                      authorAvatar: formState.avatarUrl,
                  })"
                  icon=""
                  placement="bottomRight"
                  class="pop-confirm-content">
        <template v-slot:description>
            <div class="confirm-body">
                <a-form ref="formRef"
                        :model="formState"
                        layout="vertical">
                    <a-form-item label="类型"
                                 name="type">
                        <a-radio-group v-model:value="formState.type">
                            <a-radio :value="1">TECH</a-radio>
                            <a-radio :value="2">LIFE</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="名字"
                                 name="author">
                        <a-input show-count
                                 v-model:value="formState.author"
                                 :max-length="12"
                                 size="large"
                                 placeholder="请输入作者名字" />
                    </a-form-item>
                    <a-form-item label="创作时间"
                                 name="date">
                        <a-date-picker v-model:value="formState.dateParse"
                                       class="date-picker-content"
                                       size="large" />
                    </a-form-item>
                    <a-form-item label="权重"
                                 name="weight">
                        <a-input v-model:value="formState.weight"
                                 size="large"
                                 type="number"
                                 placeholder="请输入排序权重1~9999" />
                    </a-form-item>
                    <template v-if="Number(formState.type) === 1">
                        <a-form-item label="标签"
                                     name="tag">
                            <a-select show-search
                                      v-model:value="formState.tag"
                                      :options="tagList"
                                      :style="{ width: '100%' }"
                                      size="large"
                                      placeholder="请选择文章标签，不超过四个"
                                      mode="multiple" />
                        </a-form-item>
                        <a-form-item label="技术分类"
                                     name="category">
                            <a-select show-search
                                      v-model:value="formState.category"
                                      :options="categoryList"
                                      :style="{ width: '100%' }"
                                      size="large"
                                      placeholder="请选择技术文章分类" />
                        </a-form-item>
                    </template>
                    <div class="img-form-items">
                        <a-form-item label="封面"
                                     class="img-upload"
                                     name="coverUrl">
                            <a-input v-model:value="formState.coverUrl"
                                     size="middle"
                                     placeholder="如已知封面地址，可直接输入" />
                            <a-form-item-rest>
                                <a-upload :max-count="1"
                                          v-model:file-list="coverFileList"
                                          :show-upload-list="false"
                                          :before-upload="(file: UploadFile) => beforeUpload('cover', file)"
                                          name="avatar"
                                          list-type="picture-card"
                                          class="avatar-uploader"
                                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                          @change="(info: UploadChangeParam) => handleUploadChange(info, 'cover')">
                                    <img-box v-if="formState.coverUrl"
                                         :src="formState.coverUrl"
                                         :style="{ width: '100%' }"
                                         alt="avatar" />
                                    <div v-else>
                                        <a-spin v-if="coverUpLoading"
                                                size='large'
                                                class="ant-spin"
                                                :spinning="coverUpLoading" />
                                        <template v-else>
                                            <p>+</p>
                                            <div class="ant-upload-text">Upload</div>
                                        </template>
                                    </div>
                                </a-upload>
                            </a-form-item-rest>
                        </a-form-item>
                        <a-form-item label="头像"
                                     class="img-upload"
                                     name="avatarUrl">
                            <a-input v-model:value="formState.avatarUrl"
                                     size="middle"
                                     placeholder="如已知头像地址，可直接输入" />
                            <a-form-item-rest>
                                <a-upload :max-count="1"
                                          v-model:file-list="avatarFileList"
                                          :show-upload-list="false"
                                          :before-upload="(file: UploadFile) => beforeUpload('avatar', file)"
                                          name="avatar"
                                          list-type="picture-card"
                                          class="avatar-uploader"
                                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                          @change="(info: UploadChangeParam) => handleUploadChange(info, 'avatar')">
                                    <img-box v-if="formState.avatarUrl"
                                         :src="formState.avatarUrl"
                                         :style="{ width: '100%' }"
                                         alt="avatar" />
                                    <div v-else>
                                        <a-spin v-if="avatarUpLoading"
                                                size='large'
                                                class="ant-spin"
                                                :spinning="avatarUpLoading" />
                                        <template v-else>
                                            <p>+</p>
                                            <div class="ant-upload-text">Upload</div>
                                        </template>
                                    </div>
                                </a-upload>
                            </a-form-item-rest>
                        </a-form-item>
                    </div>
                </a-form>
            </div>
        </template>
        <a-button class="submit-btn"
                  type="primary"
                  size="large"
                  @click="handleOpen(true)">
            保存并更新
        </a-button>
    </a-popconfirm>
</template>
<script setup lang="ts" name="PopForm">
import { ref, reactive, type UnwrapRef, type PropType } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { type UploadChangeParam, type UploadFile, message } from 'ant-design-vue'
import type { ItemProps, PopFormState } from '@/types'
import ImgBox from '@/components/ImgBox.vue'

interface FormState extends PopFormState {
    dateParse: Dayjs
}

const props = withDefaults(defineProps<{
    handleOpen?: Function,
    onConfirm?: Function,
    openPopcon?: boolean,
    categoryList?: ItemProps[],
    tagList?: ItemProps[],
    data?: PopFormState,
}>(), {
    handleOpen: () => {},
    onConfirm: () => {},
    openPopcon: false,
    categoryList: () => [],
    tagList: () => [],
    data: () => ({}),
})

const formRef = ref(),
    formState: UnwrapRef<FormState> = reactive({ ...props.data, dateParse: dayjs(props.data.date) }),
    avatarFileList = ref<Array<any>>([]),
    coverFileList = ref<Array<any>>([]),
    coverUpLoading = ref<boolean>(false),
    avatarUpLoading = ref<boolean>(false)

const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const handleUploadChange = (info: any, type: string) => {
    const { status, originFileObj } = info.file
    if (type === 'avatar') {
        avatarUpLoading.value = true
        formState.avatarUrl = ''
    }
    if (type === 'cover') {
        formState.coverUrl = ''
        coverUpLoading.value = true
    }

    if (status === 'done') {
        getBase64(
            originFileObj,
            url => {
                if (type === 'avatar') {
                    formState.avatarUrl = url
                }
                if (type === 'cover') {
                    formState.coverUrl = url
                }
            }
        )
    }

    if (status === 'error') {
        if (type === 'avatar') {
            avatarUpLoading.value = false
            formState.avatarUrl = props.data.avatarUrl
        }
        if (type === 'cover') {
            coverUpLoading.value = false
            formState.coverUrl = props.data.coverUrl
        }
        message.error('upload error')
    }
}

const beforeUpload = (type: any, file: any) => {
    const isJpgOrPng = file?.type === 'image/jpeg' || file?.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
    }

    const isLt2M = file?.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }

    return isJpgOrPng && isLt2M
}
</script>
<style lang="less" scope>
@import '@/styles/pop-form.less';
</style>