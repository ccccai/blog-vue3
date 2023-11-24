<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 21:12:37
 * @LastEditTime: 2023-11-24 15:21:01
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/ImgBox.vue
-->
<template>
    <as-image v-show="src"
              class="as-image"
              :class="{ 'as-image-heigher': isHeigher }"
              :src="src">
        <template #loading>
            <div class="loading"></div>
        </template>
    </as-image>
</template>
<script setup lang="ts" name="ImageBox">

const props = withDefaults(defineProps<{
    errSrc?: string,
    src: string,
    isHeigher: boolean,
}>(), {
    src: '',
    errSrc: '',
    isHeigher: false
})

</script>
<style lang="less">
.as-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    height: inherit;

    .loading {
        width: 100%;
        height: 100%;
    }
}

.as-image-heigher {
    height: 100%;

    &>img {
        width: auto;
        height: 100%;
    }
}
</style>