/*
 * @Author: caishiyin
 * @Date: 2020-12-09 15:15:06
 * @LastEditTime: 2023-09-16 21:42:09
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: /my-blog-vue3/src/assets/setting.ts
 */
import homeBanneImgUrl from '../assets/images/home-banner.jpg'
import lifeBanneImgUrl from '../assets/images/banner-life.jpg'
import techBanneImgUrl from '../assets/images/banner-tech.jpg'
import aboutBanneImgUrl from '../assets/images/banner-about.jpg'

export const navList = [
    { title_zh: '首页', title_en: 'HOME', url: '/', bannerImgUrl: homeBanneImgUrl },
    { title_zh: '技术', title_en: 'TECH', url: '/tech', bannerImgUrl: techBanneImgUrl },
    { title_zh: '生活', title_en: 'LIFE', url: '/life', bannerImgUrl: lifeBanneImgUrl },
    { title_zh: '关于', title_en: 'ABOUT', url: '/about', bannerImgUrl: aboutBanneImgUrl },
]

export const categoryList = [
    { name: '前端开发', id: 1 },
    { name: '后端开发', id: 2 },
    { name: '工具', id: 3 }
]

export const tagsList = [
    'Android',
    'Babel',
    'Webpack',
    'CSS',
    'ECMAScript',
    'Git',
    'LESS',
    'SESS',
    'GitHub',
    'HTML',
    'JavaScript',
    'ES6',
    'NodeJs',
    'React',
    'ReactNative',
    'TypeScript',
    'Koa',
    'Ant Design',
    'Mysql',
    'PHP',
    'Npm',
    'px2rem',
    'component',
    'postman',
    'umi',
    'Nginx',
    'Linux',
    'Apache',
    'PhpStudy',
]