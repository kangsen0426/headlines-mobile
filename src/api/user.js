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

/**
 * 添加关注
 */
 export const addFollow = userId => {
    return request({
      method: 'POST',
      url: '/app/v1_0/user/followings',
      data: {
        target: userId
      }
    })
  }
  
  /**
   * 取消关注
   */
  export const deleteFollow = userId => {
    return request({
      method: 'DELETE',
      url: `/app/v1_0/user/followings/${userId}`
    })
  }

  export const getProfile = () => {
    return request({
      method: 'GET',
      url: `/app/v1_0/user/profile`
    })
  }

  export const editProfile = () => {
    return request({
      method: 'PATCH',
      url: `/app/v1_0/user/profile`
    })
  }

  export const editUserPhoto = (data) => {
    return request({
      method: 'PATCH',
      url: `/app/v1_0/user/photo`,
      data
    })
  }