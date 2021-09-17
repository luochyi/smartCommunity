import axios from 'axios'
// ElementUI 单独引入
import ElementUI from 'element-ui'
import router from '../router'
import qs from 'qs'
// 创建实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API, // 请求地址
    withCredentials: false,
    timeout: 5000 // 超时
})
// axios

// 添加请求拦截器
service.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        config.headers['X-Admin-Token'] = sessionStorage.getItem(
            'X-Admin-Token'
        )
        // Access-Control-Allow-Origin: *
        return config
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
// 添加响应拦截器
service.interceptors.response.use(
    function(response) {
        const data = response.data
        // 未登录或登录失效
        if (data.code == '-1000') {
            ElementUI.Message.error(data.message)
            setTimeout(() => {
                router.replace({
                    path: '/Login'
                })
            }, 500)

            return response
        }else if(data.code =='-1001'){
            ElementUI.Message.error(data.message)

            return response
        }else if(data.code =='400'){
            ElementUI.Message.error(data.message)

            return response
        }else if(data.code =='401'){
            ElementUI.Message.error(data.message)

            return response
        }else if(data.code =='404'){
            ElementUI.Message.error(data.message)

            return response
        }else if(data.code =='500'){
            ElementUI.Message.error(data.message)

            return response
        }else if(data.code =='503'){
            ElementUI.Message.error(data.message)

            return response
        }
        if (data.status != true && data.status != null) {
            ElementUI.Message({message:data.message,type:'error'})
            return data
        } else {
            return data // return Promise.resolve(data);
        }
        return data
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)
// 暴露service
export default service
