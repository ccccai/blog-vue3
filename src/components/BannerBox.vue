<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:12:37
 * @LastEditTime: 2024-02-21 10:19:22
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: \blog-vue3\src\components\BannerBox.vue
-->
<template>
    <div class="banner-content">
        <div class="banner-img" :style="bgColor ? `background-color:${bgColor}` : ''">
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
    bgColor?: string,
}>(), {
    title: '',
    bgColor: '',
    default: ''
})
</script>
<style lang="less">
@import '@/styles/banner.less';
</style>