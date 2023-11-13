/*
 * @Author: caishiyin
 * @Date: 2023-11-13 03:42:09
 * @LastEditTime: 2023-11-13 03:55:54
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/assets/LazyLoadDirective.ts
 */
export default {
    // hookFunction 当绑定元素插入父节点时调用
    mounted(el: any) {
        function loadImage() {
            el.addEventListener('load', () => {
                // 加载完成后延迟添加class可以实现淡入动画
                setTimeout(() => {
                    el.classList.add('loaded')
                }, 100)
            })

            // 加载 data-url 的图片地址
            el.src = el.dataset.url
        }

        function handleIntersect(entries: any, observer: any) {
            entries.forEach((entry: any) => {
                if (!entry.isIntersecting) {
                    return
                } else {
                    // 绑定元素进入视口后触发加载图片
                    loadImage()
                    // 并停止观察可见性变化, 防止再次加载图像。
                    observer.unobserve(el)
                }
            })
        }

        function createObserver() {
            const options: any = {
                root: null,
                threshold: '0'
            }

            const observer = new IntersectionObserver(handleIntersect, options)

            // 订阅观察当前绑定图片元素
            observer.observe(el)
        }

        createObserver()
    }
}