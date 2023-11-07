<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:12:37
 * @LastEditTime: 2023-11-07 22:47:38
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/ImgBox.vue
-->
<template>
    <img :src="src"
         :onerror="errorImg" />
</template>
<script setup lang="ts" name="ImageBox">
import { ref } from "vue"
import errImage from '@/assets/images/error-image.png'

const props = withDefaults(defineProps<{
    errSrc?: string,
    src: string,
}>(), {
    src: '',
    errSrc: ''
})

const errorImg = ref<string>('this.src="' + (props.errSrc || errImage) + '"')

</script>
<style lang="less"></style>