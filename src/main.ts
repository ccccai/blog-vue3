/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-12-01 10:50:56
 * @LastEditors: caishiyin
 * @Description: 入口文件
 * @FilePath: /my-blog-vue3/src/main.ts
 */
import 'ant-design-vue/dist/reset.css'
import './styles/index.less'
import { initPx2rem } from './styles/remConfig'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入根组件
import App from './App.vue'
import router from './router'
import setupAntd from './plugins/ant'

import AsImage from '@awesome-image/image'
import '@awesome-image/image/dist/style.css'
import { imageUrlGeneratorFastly } from '@awesome-image/services'

//设置 rem
initPx2rem()

// 创建应用实例
const app = createApp(App)

app.use(router)

// 错误处理器，用来捕获所有子组件上的错误
app.config.errorHandler = (err) => {
    console.log('处理错误：', err)
}
app.use(createPinia())

// 按需引入组件
setupAntd(app)

app.use(AsImage, {
    lazy: true, // 是否启用懒加载
    progressive: true, // 是否启用渐进加载
    imageUrlGenerator: imageUrlGeneratorFastly,
    placeholderLazyOffset: '20px',
    imageLazyOffset: '20px',
    duration: 2
})

// 调用mount函数，将应用根组件的内容渲染在容器元素#app里面（容器元素自己将不会被视为应用的一部分）
app.mount('#app') // 必须始终在整个应用配置和资源注册完成后背调用