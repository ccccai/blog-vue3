<!--
 * @Author: caishiyin
 * @Date: 2023-09-17 20:29:31
 * @LastEditTime: 2023-09-17 20:39:21
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/FooterBox.vue
-->
<template>
    <a-row justify="center"
           class="bottom-nav">
        <a-col :xs="22"
               :sm="22"
               :md="20"
               :lg="20"
               :xl="19"
               :xxl="16">
            <div class="bottom-nav-top">
                <div class="logo">
                    <img src="@/assets/images/svg/bear.svg" />
                </div>
            </div>
            <div class="bottom-nav-middle">LOVE & PEACE</div>
            <div class="bottom-nav-bottom">
                <a-col :span="24"
                       class="bottom-right">@2019-2023 By Caishiyin</a-col>
                <a-col :span="24"
                       class="bottom-right"> Antd | TypeScript | Koa</a-col>
                <a-col :span="24"
                       class="bottom-right"
                       :style="{ color: '#01070b' }">
                    <a ref="noopener noreferrer"
                       target="_blank"
                       href="'https://beian.miit.gov.cn/#/Integrated/index">
                        粤ICP备20003849号-1
                    </a>
                </a-col>
            </div>
        </a-col>
    </a-row>
</template>
<script setup lang="ts" name="FooterBox">
</script>
<style lang="less">
@import '@/styles/footer.less';
</style>