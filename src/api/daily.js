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
// 、、sysOperations/insert  /sysOperations/update
export function sysOperationsInsert(data) {
    return service.request({
        method: 'POST',
        url: 'sysOperations/insert',
        data: data
    })
}
export function sysOperationsUpdate(data) {
    return service.request({
        method: 'POST',
        url: 'sysOperations/update',
        data: data
    })
}
export function facilitiesPlanInsert(data) {
    return service.request({
        method: 'POST',
        url: 'facilitiesPlan/insert',
        data: data
    })
}
// facilitiesPlan/open facilitiesPlan/stop
export function facilitiesPlanOpen(data) {
    return service.request({
        method: 'POST',
        url: 'facilitiesPlan/open',
        data: data
    })
}
export function facilitiesPlanStop(data) {
    return service.request({
        method: 'POST',
        url: 'facilitiesPlan/stop',
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
export function facilitiesManageList(data) {
    return service.request({
        method: 'GET',
        url: '/facilitiesManage/list',
        params: data
    })
}
//facilitiesManage/update
export function facilitiesManageUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/facilitiesManage/update',
        data: data
    })
}
//facilitiesMaintenanceRecordList    facilitiesMaintenanceRecord/insert facilitiesMaintenanceRecord/delete
export function facilitiesMaintenanceRecordList(data) {
    return service.request({
        method: 'GET',
        url: '/facilitiesMaintenanceRecord/list',
        params: data
    })
}
export function facilitiesMaintenanceRecordInsert(data) {
    return service.request({
        method: 'POST',
        url: '/facilitiesMaintenanceRecord/insert',
        data: data
    })
}
export function facilitiesMaintenanceRecordDelete(data) {
    return service.request({
        method: 'POST',
        url: '/facilitiesMaintenanceRecord/delete',
        data: data
    })
}
export function facilitiesManageFindDetailById(data) {
    return service.request({
        method: 'GET',
        url: '/facilitiesManage/findDetailById',
        params: data
    })
}
export function facilitiesCategoryFindDetailById(data) {
    return service.request({
        method: 'GET',
        url: '/facilitiesCategory/findDetailById',
        params: data
    })
}
export function facilitiesCategoryUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/facilitiesCategory/update',
        data: data
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
//新版装修 审核userDecorationNew/examine
export function userDecorationNewExamine(data) {
    return service.request({
        method: 'POST',
        url: '/userDecorationNew/examine',
        data: data
    })
}
//装修指派完工检查人userDecorationNew/assign
export function userDecorationNewAssign(data) {
    return service.request({
        method: 'POST',
        url: '/userDecorationNew/assign',
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
export function inspectionPointUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/inspectionPoint/update',
        data: data
    })
}
export function inspectionPointFindById(data) {
    return service.request({
        method: 'GET',
        url: '/inspectionPoint/findById',
        params: data
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
export function inspectionRouteUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/inspectionRoute/update',
        data: data
    })
}
//inspectionRoute/findById
export function inspectionRouteFindById(data) {
    return service.request({
        method: 'GET',
        url: '/inspectionRoute/findById',
        params: data
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
//material/insert物料 materialList
export function materialList(data) {
    return service.request({
        method: 'GET',
        url: '/material/list',
        params: data
    })
}
// materialRecord/findById
export function materialRecordFindById(data) {
    return service.request({
        method: 'GET',
        url: '/materialRecord/findById',
        params: data
    })
}
export function materialInsert(data) {
    return service.request({
        method: 'POST',
        url: '/material/insert',
        data: data
    })
}
export function materialUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/material/update',
        data: data
    })
}
//materialRecord/insert
export function materialRecordInsert(data) {
    return service.request({
        method: 'POST',
        url: '/materialRecord/insert',
        data: data
    })
}
//materialInventory/list盘点 materialInventory/insert
export function materialInventoryInsert(data) {
    return service.request({
        method: 'POST',
        url: '/materialInventory/insert',
        data: data
    })
}
export function materialInventoryUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/materialInventory/update',
        data: data
    })
}
// materialInventory/findById
export function materialInventoryFindById(data) {
    return service.request({
        method: 'GET',
        url: '/materialInventory/findById',
        params: data
    })
}
//keyManagement/insert keyBorrow/examine
export function keyManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/keyManagement/insert',
        data: data
    })
}
export function keyBorrowExamine(data) {
    return service.request({
        method: 'POST',
        url: '/keyBorrow/examine',
        data: data
    })
}
//keyManagement/findById 
export function keyManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/keyManagement/findById',
        params: data
    })
}
export function keyManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/keyManagement/update',
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
//interview/insert客户访谈
export function interviewInsert(data) {
    return service.request({
        method: 'POST',
        url: '/interview/insert',
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
//greenArea/findById greenArea/update
export function greenAreaFindById(data) {
    return service.request({
        method: 'GET',
        url: '/greenArea/findById',
        params: data
    })
}
export function greenAreaUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/greenArea/update',
        data: data
    })
}
//卫生
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

export function hygieneAreaFindById(data) {
    return service.request({
        method: 'GET',
        url: '/hygieneArea/findById',
        params: data
    })
}
export function hygieneAreaUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/hygieneArea/update',
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
export function regulationManagementFindById(data) {
    return service.request({
        method: 'GET',
        url: '/regulationManagement/findById',
        params: data
    })
}
export function regulationManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/regulationManagement/update',
        data: data
    })
}
//serviceBrowsing/findById  serviceBrowsing/update

export function serviceBrowsingInsert(data) {
    return service.request({
        method: 'POST',
        url: '/serviceBrowsing/insert',
        data: data
    })
}
export function serviceBrowsingUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/serviceBrowsing/update',
        data: data
    })
}
export function serviceBrowsingFindById(data) {
    return service.request({
        method: 'GET',
        url: '/serviceBrowsing/findById',
        params: data
    })
}
//社区介绍 communityIntroduction/findById communityIntroduction/update
export function communityIntroductionInsert(data) {
    return service.request({
        method: 'POST',
        url: '/communityIntroduction/insert',
        data: data
    })
}
export function communityIntroductionUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/communityIntroduction/update',
        data: data
    })
}
//介绍启用
export function communityIntroductionEnable(data) {
    return service.request({
        method: 'GET',
        url: '/communityIntroduction/enable',
        params: data
    })
}
export function communityIntroductionFindById(data) {
    return service.request({
        method: 'GET',
        url: '/communityIntroduction/findById',
        params: data
    })
}
// 、、securityManagement/insert
export function securityManagementInsert(data) {
    return service.request({
        method: 'POST',
        url: '/securityManagement/insert',
        data: data
    })
}
export function securityManagementUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/securityManagement/update',
        data: data
    })
}
export function securityManagementList(data) {
    return service.request({
        method: 'GET',
        url: '/securityManagement/list',
        params: data
    })
}
//securityManagement/findAllCreateName
export function securityManagementFindAllCreateName(data) {
    return service.request({
        method: 'GET',
        url: '/securityManagement/findAllCreateName',
        params: data
    })
}