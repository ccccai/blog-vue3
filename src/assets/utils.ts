/*
 * @Author: caishiyin
 * @Date: 2023-11-13 08:43:15
 * @LastEditTime: 2023-11-13 08:45:23
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/assets/utils.ts
 */

/**
 * ***节流****
 *
 * 一定时间内一定执行而且只执行一次。我们通常规定300ms执行一下的话，
 * 那不管你持续不断的点击，一到300ms就执行一次了。
 * 所以你持续不断的点击足够久的话，那就执行很多次了。
 * 
 */
export let throttle = (func: any, delay: number = 200) => {
    // 第一次触发时间戳
    let startTime = Date.now();
    return (...args: any[]) => {
        // 如果不是剪头函数可以使用arguments获取参数，这样就不用写形参了考虑形参个数了
        // let args = arguments;
        // 再次触发时间
        let curTime = Date.now();
        // 间隔时间 = 延迟的时间 - （再次触发时间戳 - 第一次触发时间戳）
        let interval = delay - (curTime - startTime);
        if (interval <= 0) {
            // 重新计算开始时间
            startTime = Date.now();
            return func(...args);
        }
    };
};

/**
 * *****防抖****
 *
 * 在连续的操作中，无论进行了多长时间，
 * 只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效
 * 
 */
export let debounce = (fn: Function, delay: number = 200) => {
    let timer: any;
    // 闭包
    return (...args: any[]) => {
        // 如果不是剪头函数可以使用arguments获取参数，这样就不用写形参了考虑形参个数了
        // let args = arguments;
        // 判断还在定时，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            return fn(...args);
        }, delay);
    };
};