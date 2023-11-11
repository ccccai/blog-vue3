/*
 * @Author: caishiyin
 * @Date: 2023-09-15 23:30:18
 * @LastEditTime: 2023-11-11 14:21:07
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const { baseFontSize } = require('./src/styles/remConfig')
const px2rem = require('postcss-px2rem')

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@@': fileURLToPath(new URL('./public', import.meta.url)),
        }
    },
    css: {
        postcss: {
            plugins: [
                px2rem({
                    // 基准大小 baseSize，需要和rem.js中相同
                    remUnit: baseFontSize
                })
            ]
        }
    }
})
