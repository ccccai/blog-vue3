<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 01:48:04
 * @LastEditTime: 2024-02-20 14:11:55
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: \blog-vue3\src\components\Loading.vue
-->
<template>
  <div v-show="showLoading && spinning"
       class="spin-box"
       @touchmove="(e: any) => e.preventDefault()">
    <a-spin size='large'
            class="ant-spin"
            :spinning="spinning" />
  </div>
</template>
<script setup lang="ts" name="Loading">
import { ref } from 'vue'
import runningDog from '@/assets/images/chai_running.gif'
import { useLoadingStore } from "@/stores"
import { storeToRefs } from 'pinia'

const { spinning } = storeToRefs(useLoadingStore())
const showLoading = ref<boolean>(false)
const loadImg = () => {
  const dog = new window.Image()
  dog.src = runningDog
  dog.onload = () => {
    showLoading.value = true
  }

}

loadImg()

</script>
<style lang="less">
@import '../styles/loading.less';
</style>