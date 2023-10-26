<!--
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-10-25 21:41:23
 * @LastEditors: caishiyin
 * @Description: 根组件模板
 * @FilePath: /my-blog-vue3/src/App.vue
-->
<template>
    <a-config-provider :locale="zhCN"
                       :theme="{
                           token: customTheme,
                       }">
        <a-layout class="app-layout">
            <a-layout-header class="header">
                <header-nav :active-nav="activeNav"
                            :nav-list="navList" />
            </a-layout-header>
            <a-layout-content class="content">
                <router-view :key="$route.path" />
            </a-layout-content>
            <a-layout-footer class="footer">
                <footer-box />
            </a-layout-footer>
        </a-layout>
    </a-config-provider>

    <loading />
</template>
<script lang="ts">
import { watch, onMounted, defineComponent } from "vue"
import { useRoute } from 'vue-router'
import zhCN from "ant-design-vue/es/locale/zh_CN"
import customTheme from '@/styles/theme'
import { storeToRefs } from 'pinia'
import { useNavStore } from "@/stores/nav"
import { navList } from "@/assets/settings"
import { ConfigProvider } from "ant-design-vue"
import HeaderNav from '@/components/HeaderNav.vue'
import FooterBox from '@/components/FooterBox.vue'
import Loading from '@/components/Loading.vue'


const preloadImg = (imgs: Array<any>) => {
    const images = []
    for (let i = 0; i < imgs.length; i++) {
        images[i] = new Image()
        images[i].src = imgs[i]
        console.log('load image...')
    }
}

// 图片预加载
window.addEventListener('load', async () => {
    const bannerImgs = navList.map((item: any) => item.bannerImgUrl)
    await preloadImg(bannerImgs)
})
export default defineComponent({
    components: {
        [ConfigProvider.name]: ConfigProvider,
        Loading,
        HeaderNav,
        FooterBox
    },
    setup() {
        const route = useRoute(), store = useNavStore(), { activeNav } = storeToRefs(store)

        const onSetNavIndex = (path: string = '') => {
            let currentNavIndex = 0
            const hasCurrent = navList.some((item, index) => {
                if (item.url === (path || route.path)) {
                    currentNavIndex = index
                    return true
                } else {
                    return false
                }
            })

            store.activeNav = hasCurrent ? currentNavIndex : -1
        }

        onMounted(() => {
            onSetNavIndex()
        })

        // 监听路由变化
        watch(
            () => route.path,
            (val, oldVal) => {
                if (val !== oldVal) {
                    onSetNavIndex(val)
                }
            }
        )
        return {
            zhCN,
            customTheme,
            activeNav,
            navList
        }
    }
})
</script>
<style lang="less">
@import '@/styles/app.less';
</style>
