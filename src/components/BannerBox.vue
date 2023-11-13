<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:12:37
 * @LastEditTime: 2023-11-13 17:57:51
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/BannerBox.vue
-->
<template>
    <div class="banner-content">
        <div class="banner-img">
            <img-box :src="bannerUrl" :is-heigher="useScreenStore().isHigher" />
        </div>
        <div class="banner-title">
            <span>{{ title }}</span>
        </div>
    </div>
</template>
<script setup lang="ts" name="BannerBox">
import { useScreenStore } from "@/stores"
import ImgBox from '@/components/ImgBox.vue'

const props = withDefaults(defineProps<{
    title?: string,
    bannerUrl: string,
}>(), {
    title: '',
    default: ''
})
</script>
<style lang="less">
@import '@/styles/banner.less';
</style>