import service from '../utils/request'
import requestUrl from './requestUrl'
// 公告管理：发布公告管理
export function announcementManagementRelease(data) {
    return service.request({
        method: 'POST',
        url: '/announcementManagement/release',
        data: data
    })
}
// 公告管理：根据主键id查询公告信息
export function announcementManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/announcementManagement/findById',
        params: data
    })
}
// 公告管理：添加公告信息
export function announcementManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/announcementManagement/insert',
        data: data
    })
}
