/*
 * @Author: caishiyin
 * @Date: 2023-09-20 23:28:41
 * @LastEditTime: 2023-09-20 23:32:34
 * @LastEditors: caishiyin
 * @Description: 
 * @FilePath: /my-blog-vue3/src/assets/dayjs.ts
 */

import dayjs, { Dayjs } from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'


dayjs.extend(localizedFormat)

export { Dayjs }
export default dayjs
