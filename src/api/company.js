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
//新增部门
export function sysOrganizationInsert(data) {
    return service.request({
        method: 'POST',
        url: '/sysOrganization/insert',
        data: data
    })
}
//sysOrganization/delete
export function sysOrganizationDelete(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/delete',
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
//sysOrganization/stop停用部门 sysOrganization/recovery
export function sysOrganizationStop(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/stop',
        params: data
    })
}
export function sysOrganizationRecovery(data) {
    return service.request({
        method: 'GET',
        url: '/sysOrganization/recovery',
        params: data
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
//sysUser/insert新建员工
export function sysUserInsert(data) {
    return service.request({
        method: 'POST',
        url: '/sysUser/insert',
        data: data
    })
}
//允许登录sysUser/allowLogins 禁止登录sysUser/disableLogins 恢复sysUser/recovery 停用sysUser/stop
export function sysUserAllowLogins(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/allowLogins',
        params: data
    })
}
export function sysUserDisableLogins(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/disableLogins',
        params: data
    })
}
export function sysUserRecovery(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/recovery',
        params: data
    })
}
export function sysUserStop(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/stop',
        params: data
    })
}
//sysUser/resetPWD 重置密码
export function sysUserResetPWD(data) {
    return service.request({
        method: 'POST',
        url: '/sysUser/resetPWD',
        data: data
    })
}
//identity/listAll
export function identityListAll(data) {
    return service.request({
        method: 'GET',
        url: '/identity/listAll',
        params: data
    })
}
//sysUser/update   sysUser/falseDelete
export function sysUserUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/sysUser/update',
        data: data
    })
}
export function sysUserFalseDelete(data) {
    return service.request({
        method: 'GET',
        url: '/sysUser/falseDelete',
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
//attendanceRecord/cardReplacement
export function attendanceRecordCardReplacement(data) {
    return service.request({
        method: 'GET',
        url: '/attendanceRecord/cardReplacement',
        params: data
    })
}
//attendanceRecord/reviewer
export function attendanceRecordReviewer(data) {
    return service.request({
        method: 'POST',
        url: '/attendanceRecord/reviewer',
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
//提醒remind/insert
export function remindInsert(data) {
    return service.request({
        method: 'POST',
        url: '/remind/insert',
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
// 导入房屋
export function uploadFileUploadEstateFile(data) {
    return service.request({
        method: 'POST',
        url: '/dataBase/insert',
        data: data
    })
}