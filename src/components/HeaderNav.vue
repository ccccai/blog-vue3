<!--
 * @Author: caishiyin
 * @Date: 2023-09-16 01:27:58
 * @LastEditTime: 2023-09-21 04:27:29
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/components/HeaderNav.vue
-->
<template>
    <div class="header-nav">
        <a-row justify="center">
            <a-col class="nav-content"
                   :xs="22"
                   :sm="22"
                   :md="22"
                   :lg="22"
                   :xl="20"
                   :xxl="16"
                   :style="{ maxWidth: 1100 }">

                <div class="header-nav-left">
                    <a class="logo"
                       href="/">
                        <img src="@/assets/images/svg/bear.svg" />
                        <span>CAISHIYIN'S BLOG</span>
                    </a>
                </div>


                <div class="top-menu-nav">
                    <ul class="menu-nav-content">
                        <li v-for="(menu, index) in navList"
                            :key="index"
                            :class="`menu-nav-item ${activeNav === index ? 'active-nav-item' : ''}`">
                            <span @click="$router.push(menu.url)">{{ menu.title_en }}</span>
                        </li>
                    </ul>
                </div>
            </a-col>
        </a-row>

        <div class="mobile-nav-content">
            <img class="more"
                 alt="点击展开导航"
                 src="@/assets/images/svg/more.svg"
                 @click="handleDrawer(true)" />

            <div class="header-nav-left">
                <a class="logo"
                   href="/">
                    <img src="@/assets/images/svg/bear.svg" />
                    <span>CAISHIYIN'S BLOG</span>
                </a>
            </div>

            <a-drawer width="100"
                      placement="left"
                      :closable="false"
                      :open="visible"
                      :drawer-style="drawerStyle"
                      :body-style="{ padding: 0 }"
                      @close="handleDrawer(false)">
                <div class="drawer-close"
                     @click="handleDrawer(false)">
                    <img class="drawer-close-svg"
                         alt="关闭"
                         src="@/assets/images/svg/close-drawer.svg" />
                </div>
                <ul class="menu-drawer-content">
                    <li v-for="(menu, index) in navList"
                        :key="index"
                        class="menu-drawer-item"
                        @click="handleDrawer(false)">
                        <a class="logo"
                           :href="menu.url">{{ menu.title_en }}</a>
                    </li>
                </ul>
            </a-drawer>
        </div>
    </div>
</template>
<script setup lang="ts" name="HeaderNav">
import { type PropType, defineProps, ref } from "vue"
import type { NavProps } from '@/types'

defineProps({
    activeNav: {
        type: Number,
        default: -1
    },
    navList: {
        type: Array as PropType<NavProps[]>
    },
})


const visible = ref<boolean>(false),
    drawerStyle = {
        color: '#eaa151',
        backgroundColor: '#004853',
    },
    handleDrawer = (openDrawer: boolean) => {
        visible.value = openDrawer
    }
</script>
<style lang="less">
@import '@/styles/nav.less';
</style>