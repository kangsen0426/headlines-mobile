
import dayjs from 'dayjs'

//配置中文语言包

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)



dayjs.locale('zh-cn') // 全局使用简体中文

export const getTimeGone = value => {
   return dayjs(value).from(dayjs())
}

Vue.filter('datetime', value => {
   return dayjs(value).format('MM-DD HH:mm')
})

