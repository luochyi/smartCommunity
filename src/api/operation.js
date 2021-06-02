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
// 通知管理：添加通知信息
export function notificationManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/notificationManagement/insert',
        data: data
    })
}
//通知管理：根据主键id查询公告信息
export function notificationManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/notificationManagement/findById',
        params: data
    })
}
// 通知管理：修改通知信息
export function notificationManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/notificationManagement/update',
        data: data
    })
}
//活动管理：根据主键id查询活动管理
export function activityManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/activityManagement/findById',
        params: data
    })
}
//活动管理：修改活动信息
export function activityManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/activityManagement/update',
        data: data
    })
}
//活动管理：添加活动信息
export function activityManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/activityManagement/insert',
        data: data
    })
}
//活动管理：根据活动主键id查询报名记录信息
export function activityManagementFindRegistrationById(data) {
    return service.request({
        method: 'GET',
        url: '/activityManagement/findRegistrationById',
        params: data
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
// 主办方管理：添加主办方信息
export function sponsorManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/sponsorManagement/insert',
        data: data
    })
}
// 主办方管理：修改主办方信息
export function sponsorManagementUpdate(data) {
  return service.request({
      method: 'POST',
      url: '/sponsorManagement/update',
      data: data
  })
}

// 主办方信息：根据主键id查询主办方信息
export function sponsorManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/sponsorManagement/findById',
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
export function announcementManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/announcementManagement/update',
        data: data
    })
}
// 主办方管理：查询所有的主办方信息（包含条件搜索）
export function sponsorManagementList(data) {
    return service.request({
        method: 'GET',
        url: '/sponsorManagement/list',
        params: data
    })
}
//资讯新增
export function newsCategoryManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/newsCategoryManagement/insert',
        data: data
    })
}
//newsCategoryManagement/update
export function newsCategoryManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/newsCategoryManagement/update',
        data: data
    })
}
//newsCategoryManagement/findById
export function newsCategoryManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/newsCategoryManagement/findById',
        params: data
    })
}
export function newsManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/newsManagement/insert',
        data: data
    })
}
export function newsManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/newsManagement/update',
        data: data
    })
}
export function newsManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/newsManagement/findById',
        params: data
    })
}
export function newsCategoryManagementList(data) {
    return service.request({
        method: 'GET',
        url: '/newsCategoryManagement/list',
        params: data
    })
}
export function electronicCommerceCategoryInsert(data) {
    return service.request({
        method: 'POST',
        url: 'electronicCommerceCategory/insert',
        data: data
    })
}
//newsManagement/updateCrawling
export function newsManagementUpdateCrawling(data) {
    return service.request({
        method: 'GET',
        url: 'newsManagement/updateCrawling',
        params: data
    })
}
export function electronicCommerceCategoryUpdate(data) {
    return service.request({
        method: 'POST',
        url: 'electronicCommerceCategory/update',
        data: data
    })
}
export function electronicCommerceInsert(data) {
    return service.request({
        method: 'POST',
        url: 'electronicCommerce/insert',
        data: data
    })
}
export function electronicCommerceUpdate(data) {
    return service.request({
        method: 'POST',
        url: 'electronicCommerce/update',
        data: data
    })
}
//electronicCommerceCategory/list
export function electronicCommerceCategoryList(data) {
    return service.request({
        method: 'GET',
        url: '/electronicCommerceCategory/list',
        params: data
    })
}
export function electronicCommerceCategoryFindById(data) {
    return service.request({
        method: 'GET',
        url: '/electronicCommerceCategory/findById',
        params: data
    })
}
export function electronicCommerceFindById(data) {
    return service.request({
        method: 'GET',
        url: '/electronicCommerce/findById',
        params: data
    })
}