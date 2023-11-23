/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-23 16:49:20
 * @LastEditors: caishiyin
 * @Description: 入口文件
 * @FilePath: /my-blog-vue3/src/main.ts
 */
import 'ant-design-vue/dist/reset.css'
import './styles/index.less'
import runningDog from '@/assets/images/chai_running.gif'
import { initPx2rem } from './styles/remConfig'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
// 导入根组件
import App from './App.vue'
import router from './router'
import Antd, { Spin } from 'ant-design-vue'

// import LazyLoadDirective from '@/assets/lazyLoadDirective'
import AsImage from '@awesome-image/image'
import '@awesome-image/image/dist/style.css'
import { imageUrlGeneratorFastly } from '@awesome-image/services'

//设置 rem
initPx2rem()

// 创建应用实例
const app = createApp(App)

// app.directive('lazyload', LazyLoadDirective)


// 错误处理器，用来捕获所有子组件上的错误
app.config.errorHandler = (err) => {
    console.log('处理错误：', err)
}

app.use(createPinia())
app.use(router)
app.use(Antd)

app.use(AsImage, {
    lazy: true, // 是否启用懒加载
    progressive: true, // 是否启用渐进加载
    imageUrlGenerator: imageUrlGeneratorFastly
})

// 调用mount函数，将应用根组件的内容渲染在容器元素#app里面（容器元素自己将不会被视为应用的一部分）
app.mount('#app') // 必须始终在整个应用配置和资源注册完成后背调用

Spin.setDefaultIndicator({
    indicator: h('img', { class: 'spin-img', src: runningDog, alt: '加载中...' }),
});