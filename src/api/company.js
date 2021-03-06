import service from '../utils/request'
import requestUrl from './requestUrl'



// 首页数据大屏 
//dataStatistics/findLastMonthPayCostDetail  后台配置大屏：查询上月物业缴费情况
export function findLastMonthPayCostDetail(data){
    return service.request({
        method:'GET',
        url:'/dataStatistics/findLastMonthPayCostDetail',
        params:data
    })
}
//dataStatistics/findPaymentStatistics  后台配置大屏：物业缴费统计（6个月内数据，不包含本月）
export function findPaymentStatistics(data){
    return service.request({
        method:'GET',
        url:'/dataStatistics/findPaymentStatistics',
        params:data
    })
}
//dataStatistics/findTodayEnvironmentalHealth 后台配置大屏：查询今日环境卫生任务情况
export function findTodayEnvironmentalHealth(data){
    return service.request({
        method:'GET',
        url:'/dataStatistics/findTodayEnvironmentalHealth',
        params:data
    })
}
//dataStatistics/findInspectionRecord 后台配置大屏：查询今日巡更记录
export function findInspectionRecord(data){
    return service.request({
        method:'GET',
        url:'/dataStatistics/findInspectionRecord',
        params:data
    })
}
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
// identity/insert
export function identityInsert(data) {
    return service.request({
        method: 'POST',
        url: '/identity/insert',
        data: data
    })
}
// RPRecordsList
export function RPRecordsList(data) {
    return service.request({
        method: 'GET',
        url: '/RPRecords/list',
        params: data
    })
}
// RPRecords/insert
export function RPRecordsInsert(data) {
    return service.request({
        method: 'POST',
        url: '/RPRecords/insert',
        data: data
    })
}
// RPRecordsdelete
export function RPRecordsdelete(data) {
    return service.request({
        method: 'POST',
        url: '/RPRecords/delete',
        data: data
    })
}
// RPRecordsList
export function stationChangeList(data) {
    return service.request({
        method: 'GET',
        url: '/stationChange/list',
        params: data
    })
}
// RPRecords/insert
export function stationChangeInsert(data) {
    return service.request({
        method: 'POST',
        url: '/stationChange/insert',
        data: data
    })
}
// RPRecordsdelete
export function stationChangedelete(data) {
    return service.request({
        method: 'POST',
        url: '/stationChange/delete',
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
// salary/update
export function salaryUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/salary/update',
        data: data
    })
}
export function functionAuthorityRoleList(data) {
    return service.request({
        method: 'GET',
        url: '/sysRole/roleList',
        params: data
    })
}
//sysRole/insertRole添加角色信息
export function sysRoleInsertRole(data) {
    return service.request({
        method: 'POST',
        url: '/sysRole/insertRole',
        data: data
    })
}
//sysRole/findByRoleId
export function sysRoleFindByRoleId(data){
    return service.request({
        method: 'GET',
        url: '/sysRole/findByRoleId',
        params: data
    })
}
//sysRole/updateRole修改角色
export function sysRoleUpdateRole(data) {
    return service.request({
        method: 'POST',
        url: '/sysRole/updateRole',
        data: data
    })
}
//sysRole/deleteRole
export function sysRoleDeleteRole(data) {
    return service.request({
        method: 'POST',
        url: '/sysRole/deleteRole',
        data: data
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
// attendanceTeam/insert
export function attendanceTeamInsert(data) {
    return service.request({
        method: 'POST',
        url: '/attendanceTeam/insert',
        data: data
    })
}
// attendanceTeam/findPeopleById
export function attendanceTeamFindPeopleById(data) {
    return service.request({
        method: 'GET',
        url: '/attendanceTeam/findPeopleById',
        params: data
    })
}
// attendanceTeam/list
export function attendanceTeamList(data) {
    return service.request({
        method: 'GET',
        url: '/attendanceTeam/list',
        params: data
    })
}
// attendanceSchedulingPlan/enable
export function attendanceSchedulingPlanEnable(data) {
    return service.request({
        method: 'GET',
        url: '/attendanceSchedulingPlan/enable',
        params: data
    })
}
// attendanceSchedulingPlan/insert
export function attendanceSchedulingPlanInsert(data) {
    return service.request({
        method: 'POST',
        url: '/attendanceSchedulingPlan/insert',
        data: data
    })
}
export function attendanceSchedulingPlanFindById(data) {
    return service.request({
        method: 'GET',
        url: '/attendanceSchedulingPlan/findById',
        params: data
    })
}

//functionAuthority/updateRole给人员分配角色
export function functionAuthorityUpdateRole(data) {
    return service.request({
        method: 'POST',
        url: '/functionAuthority/updateRole',
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
//违禁
export function prohibitedKeywordsInsert(data) {
    return service.request({
        method: 'POST',
        url: '/prohibitedKeywords/insert',
        data: data
    })
}
export function prohibitedKeywordsUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/prohibitedKeywords/update',
        data: data
    })
}

// greenTask/list   hygieneTask/list chargesTemplateId   chargesTemplateDetail/list
export function greenTaskList(data) {
    return service.request({
        method: 'GET',
        url: '/greenTask/list',
        params: data
    })
}
export function hygieneTaskList(data) {
    return service.request({
        method: 'GET',
        url: '/hygieneTask/list',
        params: data
    })
}
export function chargesTemplateDetailList(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplateDetail/list',
        params: data
    })
}
// dailyPayment/list
export function dailyPaymentList(data) {
    return service.request({
        method: 'GET',
        url: '/dailyPayment/list',
        params: data
    })
}