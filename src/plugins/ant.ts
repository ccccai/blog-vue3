/*
 * @Author: caishiyin
 * @Date: 2023-12-01 09:59:37
 * @LastEditTime: 2023-12-01 10:45:17
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/plugins/ant.ts
 */
import runningDog from '@/assets/images/chai_running.gif'
import { h } from 'vue'
import {
    Spin,
    Layout,
    Row,
    Col,
    Drawer,
    Avatar,
    Pagination,
    Popconfirm,
    Form,
    Radio,
    DatePicker,
    Input,
    Select,
    Upload,
    Button,
    FloatButton,
    Card,
    Tag
} from 'ant-design-vue'

const components = [
    Spin,
    Layout,
    Row,
    Col,
    Drawer,
    Avatar,
    Pagination,
    Popconfirm,
    Form,
    Radio,
    DatePicker,
    Input,
    Select,
    Upload,
    Button,
    FloatButton,
    Card,
    Tag
]

Spin.setDefaultIndicator({
    indicator: h('img', { class: 'spin-img', src: runningDog, alt: '加载中...' }),
})

export default function setupAntd(app: any) {
    components.forEach((component) => {
        app.use(component)
    })
}