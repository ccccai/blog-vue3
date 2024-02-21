<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:00:28
 * @LastEditTime: 2024-02-21 10:16:47
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: \blog-vue3\src\views\Config.vue
-->
<template>
    <banner-box title="Config"
                :bg-color="bannerBgColor"
                :banner-url="bannerImgUrl" />
    <a-row justify="center">
        <a-col :xs="22"
               :sm="22"
               :xl="20"
               :xxl="18"
               class="about">
            <!-- <p>CV工程师，目前无业游民状态；</p>
            <p>之前的工作重心主要是VueJs，小程序，公众号H5页面等；</p>
            <p>空闲之余自学React和Ts，对NodeJs兴趣浓厚处于入门摸索阶段；</p>
            <p>喜欢码并致力于成为全栈工程师的普通打工人，喜欢阅读和学习带给自己的充实感。</p> -->
        </a-col>
    </a-row>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import BannerBox from '@/components/BannerBox.vue'
import bannerImgUrl from '../assets/images/banner-config.jpg'

const bannerBgColor = ref<string>('')

</script>
<style lang="less">
@import '@/styles/config.less';
</style>