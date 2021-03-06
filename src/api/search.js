import request from "@/utils/request";

export const getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}

/**
 * 获取搜索结果
 */
export const getSearch = (params) => {
    return request({
        method: "GET",
        url: "/app/v1_0/search",
        params
    })
}
export const getSearchHistory = () => {
    return request({
        method: "GET",
        url: "/app/v1_0/search/histories",
        
    })
}