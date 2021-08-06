import axios from 'axios'
import store from '@/store/'


const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

//请求拦截器
request.interceptors.request.use(config => {
    const {user} = store.state
    //如果用户已经登入，统一给接口设置token信息
    if(user){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, error => {

    return Promise.reject(error)
})


//响应拦截器


export default request