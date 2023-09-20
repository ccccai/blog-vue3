<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 01:48:04
 * @LastEditTime: 2023-09-17 17:00:09
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/Loading.vue
-->
<template>
    <div v-show="spinning"
         class="spin-box"
         @touchmove="(e: any) => e.preventDefault()">
        <a-spin size='large'
                class="ant-spin"
                :spinning="spinning" />
    </div>
</template>
<script setup lang="ts" name="Loading">
import { useLoadingStore } from "@/stores"
import { storeToRefs } from 'pinia'
const { spinning } = storeToRefs(useLoadingStore())
</script>
<style lang="less">
@import '../styles/loading.less';
</style>