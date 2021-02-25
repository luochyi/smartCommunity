import service from '../utils/request'
import requestUrl from './requestUrl'
// 查询所有的物业收费标准模版
export function chargesTemplateList(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplate/list',
        params: data
    })
}
// /chargesTemplateDetail/list
export function chargesTemplateDetailList(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplateDetail/list',
        params: data
    })
}
// 收费标准管理：更新物业收费标准模版信息
export function chargesTemplateUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/chargesTemplate/update',
        data: data
    })
}
// 收费标准管理：添加物业收费标准模版
export function chargesTemplateInsert(data) {
    return service.request({
        method: 'POST',
        url: '/chargesTemplate/insert',
        data: data
    })
}
