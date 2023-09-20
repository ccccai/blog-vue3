/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-09-17 20:49:37
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/main.ts
 */
import 'ant-design-vue/dist/reset.css'
import './styles/index.less'
import runningDog from '@/assets/images/chai_running.gif'
import { createApp, h } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd, { Spin } from 'ant-design-vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')

Spin.setDefaultIndicator({
    indicator: h('img', { class: 'spin-img', src: runningDog, alt: '加载中...' }),
});