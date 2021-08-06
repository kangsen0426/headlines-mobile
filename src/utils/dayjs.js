
import dayjs from 'dayjs'

//配置中文语言包

import 'dayjs/locale/zh-cn'

import relativeTime  from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)



dayjs.locale('zh-cn') // 全局使用简体中文

export const getTimeGone = value =>{
   return dayjs(value).from(dayjs())
}

