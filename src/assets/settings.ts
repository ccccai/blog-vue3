/*
 * @Author: caishiyin
 * @Date: 2020-12-09 15:15:06
 * @LastEditTime: 2024-02-21 10:26:06
 * @LastEditors: caishiyin
 * @Description:
 * @FilePath: \blog-vue3\src\assets\settings.ts
 */
import homeBanneImgUrl from '../assets/images/home-banner.jpg'
import lifeBanneImgUrl from '../assets/images/banner-life.jpg'
import techBanneImgUrl from '../assets/images/banner-tech.jpg'
import aboutBanneImgUrl from '../assets/images/banner-about.jpg'

export const navList = [
  {
    titleCH: '首页',
    titleEN: 'HOME',
    url: '/',
    bannerImgUrl: homeBanneImgUrl,
    bgColor: '#98b0d2'
  },
  {
    titleCH: '技术',
    titleEN: 'TECH',
    url: '/tech',
    bannerImgUrl: techBanneImgUrl,
    bgColor: '#e5ad06'
  },
  {
    titleCH: '生活',
    titleEN: 'LIFE',
    url: '/life',
    bannerImgUrl: lifeBanneImgUrl,
    bgColor: '#962d27'
  },
  {
    titleCH: '关于',
    titleEN: 'ABOUT',
    url: '/about',
    bannerImgUrl: aboutBanneImgUrl,
    bgColor: '#576774'
  }
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
  'PhpStudy'
]
