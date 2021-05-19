import service from '../utils/request'
import requestUrl from './requestUrl'

//设施
export function facilitiesManageInsert(data) {
    return service.request({
        method: 'POST',
        url: '/facilitiesManage/insert',
        data: data
    })
}
export function facilitiesAppointmentInsert(data) {
    return service.request({
        method: 'POST',
        url: 'facilitiesAppointment/insert',
        data: data
    })
}
export function facilitiesCategoryList(data) {
    return service.request({
        method: 'GET',
        url: '/facilitiesCategory/list',
        params: data
    })
}
//设施预约-设施分类：添加设施分类信息
export function facilitiesCategoryInsert(data) {
    return service.request({
        method: 'POST',
        url: '/facilitiesCategory/insert',
        data: data
    })
}
// 问卷调查：添加问卷调查表信息【照片未测】
export function questionnaireInsert(data) {
    return service.request({
        method: 'POST',
        url: '/questionnaire/insert',
        data: data
    })
}
//装修管理-作废userDecoration/invalid
export function userDecorationInvalid(data) {
    return service.request({
        method: 'POST',
        url: '/userDecoration/invalid',
        data: data
    })
}
// 业委会管理：添加业委会信息
export function ownersCommitteeInsert(data) {
    return service.request({
        method: 'POST',
        url: '/ownersCommittee/insert',
        data: data
    })
}
//业委会管理：更新业委会信息
export function ownersCommitteeUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/ownersCommittee/update',
        data: data
    })
}
// 业委会管理：根据业委会主键id查询业委会信息
export function ownersCommitteeFindById(data) {
    return service.request({
        method: 'GET',
        url: '/ownersCommittee/findById',
        params: data
    })
}
//巡检点
export function inspectionPointInsert(data) {
    return service.request({
        method: 'POST',
        url: '/inspectionPoint/insert',
        data: data
    })
}
export function inspectionPlanInsert(data) {
    return service.request({
        method: 'POST',
        url: '/inspectionPlan/insert',
        data: data
    })
}
export function inspectionRouteInsert(data) {
    return service.request({
        method: 'POST',
        url: '/inspectionRoute/insert',
        data: data
    })
}
// /inspectionRoute/list
export function inspectionRouteList(data) {
    return service.request({
        method: 'GET',
        url: '/inspectionRoute/list',
        params: data
    })
}
// 部门
export function sysOrganizationList(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/list',
        params: data
    })
}
export function inspectionPointList(data) {
    return service.request({
        method: 'GET',
        url: '/inspectionPoint/list',
        params: data
    })
}
//sysOrganization/findAllDepartment
export function sysOrganizationFindAllDepartment(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/findAllDepartment',
        params: data
    })
}
export function sysOrganizationFindById(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/findById',
        params: data
    })
}
//根据组织id organizationId查询所有的人员nickName
export function sysUserList(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/list',
        params: data
    })
}
//路线禁用inspectionRoute/isEnable
export function inspectionRouteIsEnable(data) {
    return service.request({
        method: 'GET',
        url: '/inspectionRoute/isEnable',
        params: data
    })
}
//inspectionPlan/isEnable
export function inspectionPlanIsEnable(data) {
    return service.request({
        method: 'GET',
        url: '/inspectionPlan/isEnable',
        params: data
    })
}
//keyManagement/insert
export function keyManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/keyManagement/insert',
        data: data
    })
}
export function packageCollectionInsert(data) {
    return service.request({
        method: 'POST',
        url: '/packageCollection/insert',
        data: data
    })
}
//packageCollection/findById
export function packageCollectionFindById(data) {
    return service.request({
        method: 'GET',
        url: '/packageCollection/findById',
        params: data
    })
}
//packageCollection/update
export function packageCollectionUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/packageCollection/update',
        data: data
    })
}
//greenArea/insert
export function greenAreaInsert(data) {
    return service.request({
        method: 'POST',
        url: '/greenArea/insert',
        data: data
    })
}
//greenArea/list
export function greenAreaList(data) {
    return service.request({
        method: 'GET',
        url: '/greenArea/list',
        params: data
    })
}
export function greenTaskInsert(data) {
    return service.request({
        method: 'POST',
        url: '/greenTask/insert',
        data: data
    })
}
//greenArea/findById
export function greenAreaFindById(data) {
    return service.request({
        method: 'GET',
        url: '/greenArea/findById',
        params: data
    })
}

export function hygieneAreaInsert(data) {
    return service.request({
        method: 'POST',
        url: '/hygieneArea/insert',
        data: data
    })
}
export function hygieneAreaList(data) {
    return service.request({
        method: 'GET',
        url: '/hygieneArea/list',
        params: data
    })
}
export function hygieneTaskInsert(data) {
    return service.request({
        method: 'POST',
        url: '/hygieneTask/insert',
        data: data
    })
}
//规程xinzeng & regulationManagement/release
export function regulationManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/regulationManagement/insert',
        data: data
    })
}
export function regulationManagementRelease(data) {
    return service.request({
        method: 'GET',
        url: '/regulationManagement/release',
        params: data
    })
}
export function serviceBrowsingInsert(data) {
    return service.request({
        method: 'POST',
        url: '/serviceBrowsing/insert',
        data: data
    })
}
//社区介绍
export function communityIntroductionInsert(data) {
    return service.request({
        method: 'POST',
        url: '/communityIntroduction/insert',
        data: data
    })
}
//介绍启用
export function communityIntroductionEnable(data){
    return service.request({
        method:'GET',
        url:'/communityIntroduction/enable',
        params:data
    })
}