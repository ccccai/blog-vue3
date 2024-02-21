/*
 * @Author: caishiyin
 * @Date: 2023-11-11 12:52:07
 * @LastEditTime: 2024-02-21 15:06:36
 * @LastEditors: caishiyin
 * @Description: px2rem配置文件
 * @FilePath: \blog-vue3\src\styles\remConfig.ts
 */

// 基准大小
export const baseFontSize = 12

// 设置 rem 函数
export const setRem = () => {
    // 当前页面宽度相对于1920宽的缩放比例，基准宽度可根据自己ui设计图修改。
    const scale = document.documentElement.clientWidth / 375
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseFontSize * Math.min(scale, 1.1) + 'px'
}

export const initPx2rem = () => {
    // 初始化
    setRem()
    //监听窗口变化 改变窗口大小时重新设置 rem
    window.onresize = function () {
        setRem()
    }
}