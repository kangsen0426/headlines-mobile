import request from "../utils/request";
//单独加载一下store
// import store from '@/store/'



export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

export const senCode = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

//获取登入用户信息

export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}

export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels `
    })
}