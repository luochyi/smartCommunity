import service from '../utils/request'
import requestUrl from './requestUrl'
// 组织架构管理：查询所有的组织架构信息
export function sysOrganizationList(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/list',
        params: data
    })
}
//组织架构管理：根据组织ID查找组织信息
export function sysOrganizationFindById(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/findById',
        params: data
    })
}
// 组织架构管理：修改部门
export function sysOrganizationUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/sysOrganization/update',
        data: data
    })
}
//人员管理：查询所有的人员管理 包含条件搜索
export function sysUserList(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/list',
        params: data
    })
}
// 人员管理：根据主键id查询人员信息
export function sysUserFindById(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/findById',
        params: data
    })
}
//培训train/insert
export function trainInsert(data) {
    return service.request({
        method: 'POST',
        url: '/train/insert',
        data: data
    })
}
//薪资salary/insert
export function salaryInsert(data) {
    return service.request({
        method: 'POST',
        url: '/salary/insert',
        data: data
    })
}
export function functionAuthorityRoleList(data) {
    return service.request({
        method: 'GET',
        url: '/functionAuthority/roleList',
        params: data
    })
}
//contract/insert合同
export function contractInsert(data) {
    return service.request({
        method: 'POST',
        url: '/contract/insert',
        data: data
    })
}
// 功能权限管理：查询所属角色下所有的员工信息 （包含条件搜索）
export function functionAuthorityList(data) {
    return service.request({
        method: 'GET',
        url: '/functionAuthority/list',
        params: data
    })
}
//功能权限管理：修改该角色的权限信息
export function functionAuthorityUpdateJurisdiction(data) {
    return service.request({
        method: 'POST',
        url: '/functionAuthority/updateJurisdiction',
        data: data
    })
}
// 功能权限管理：查询所有当前角色的权限信息
export function functionAuthorityListJurisdiction(data) {
    return service.request({
        method: 'GET',
        url: '/functionAuthority/listJurisdiction',
        params: data
    })
}
//功能权限管理：修改该角色的权限信息

export function functionAuthorityUpdateOneJurisdiction(data) {
    return service.request({
        method: 'POST',
        url: '/functionAuthority/updateOneJurisdiction',
        data: data
    })
}
//dataDictionaryList:'dataDictionary/list',数据字典 dataDictionary/update
export function dataDictionaryList(data) {
    return service.request({
        method: 'GET',
        url: '/dataDictionary/list',
        params: data
    })
}
export function dataDictionaryUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/dataDictionary/update',
        data: data
    })
}
//数据库dataBase/insert
export function dataBaseInsert(data) {
    return service.request({
        method: 'POST',
        url: '/dataBase/insert',
        data: data
    })
}
// // 日常缴费：添加缴费信息（带有付款功能）【打印未做】
// export function dailyPaymentInsert(data) {
//     return service.request({
//         method: 'POST',
//         url: '/dailyPayment/insert',
//         data: data
//     })
// }
