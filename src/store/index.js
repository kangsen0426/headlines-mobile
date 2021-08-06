import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('user') // 当前登入用户的登入状态
  },
  mutations: {
    setUser(state,data){
      state.user = data

      //为了防止页面刷新用户数据丢失，需要把数据库存储在本地中
      setItem('user',state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
