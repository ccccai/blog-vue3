<!--
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-15 18:18:42
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
import { useNavStore, useScreenStore } from "@/stores"
import { navList } from "@/assets/settings"
import { debounce } from "@/assets/utils"
import { ConfigProvider } from "ant-design-vue"
import HeaderNav from '@/components/HeaderNav.vue'
import FooterBox from '@/components/FooterBox.vue'
import Loading from '@/components/Loading.vue'


// const preloadImg: Function = (imgs: Array<any>) => {
//     const images = []
//     for (let i = 0; i < imgs.length; i++) {
//         images[i] = new Image()
//         images[i].src = imgs[i]
//         console.log('load image...')
//     }
// }

const handleScreen: Function = () => {
    const clientHeight = document.documentElement.clientHeight,
        clientWidth = document.documentElement.clientWidth

    useScreenStore().$patch({
        clientHeight,
        clientWidth,
        isHigher: clientHeight >= clientWidth,
    })
}

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

            activeNav.value = hasCurrent ? currentNavIndex : -1
        }

        window.addEventListener('load', async () => {
            handleScreen()
            // const bannerImgs = navList.map((item: any) => item.bannerImgUrl)
            // await preloadImg(bannerImgs)
        })

        window.addEventListener('resize', async () => {
            debounce(handleScreen())
        })

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
