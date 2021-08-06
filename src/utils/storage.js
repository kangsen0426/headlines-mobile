//本地存储模块

export const getItem = name => {
    const data = window.localStorage.getItem(name)
    /*
        为什么把 JSPON.parse 放在 try-catch中？
        因为data可能不是字符串
    */
    try {
        return JSON.parse(data)
    } catch (err) {
        //data 不是 json 格式字符串，直接原样返回
        return data
    }
}

export const setItem = (name, value) => {


    if (typeof value === 'object') {
        //如果是对象
        value = JSON.stringify(value)
    }

    window.localStorage.setItem(name, value)

}