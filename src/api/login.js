import service from '../utils/request'

// 登录
export const login = params => {
    return service({
        url: '/manage/user/login',
        method: 'post',
        data: params
    })
}
