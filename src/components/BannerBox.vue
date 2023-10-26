<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:12:37
 * @LastEditTime: 2023-10-27 02:17:29
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/BannerBox.vue
-->
<template>
    <div class="banner-content">
        <div class="banner-img"
             :style="{ backgroundImage: `url(${bannerUrl})` }" />
        <div class="banner-title">
            <span>{{ title }}</span>
        </div>
    </div>
</template>
<script setup lang="ts" name="BannerBox">

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