import service from '../utils/request'
import requestUrl from './requestUrl'
// /IntelligentCommunity/app/share/visitorApplication/findAll

// 获取table表格
export function GetTableData(params) {
    return service.request({
        method: 'GET',
        url: requestUrl[params.url],
        params: params.data
    })
}
//manageSysMessage/list
export function manageSysMessageList(data) {
    return service.request({
        method: 'GET',
        url: '/manageSysMessage/list',
        params: data
    })
}
//manageSysMessage/read   manageSysMessageId
export function manageSysMessageRead(data) {
    return service.request({
        method: 'GET',
        url: '/manageSysMessage/read',
        params: data
    })
}
//manageSysMessage/allRead
export function manageSysMessageAllRead(data) {
    return service.request({
        method: 'GET',
        url: '/manageSysMessage/allRead',
        params: data
    })
}
// 获取table表格删除
export function Delete(params) {
    return service.request({
        method: 'post',
        url: requestUrl[params.url],
        data: params.data
    })
}

// 登陆
export const Login = data => {
    return service.request({
        method: 'post',
        url: '/sysLogin/loginSysUser',
        data: data
    })
}
// 获取楼栋信息
export const buildingInfo = data => {
    return service.request({
        method: 'get',
        url: '/cpmBuilding/list',
        params: data
    })
}
// 添加楼栋信息
export const buildingInsert = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuilding/insert',
        data: data
    })
}
// 修改楼栋信息
export const buildingUpdate = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuilding/update',
        data: data
    })
}
// 删除楼栋信息
export const buildingDelete = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuilding/delete',
        data: data
    })
}
// 获取单元信息
export const cpmBuildingUnit = data => {
    return service.request({
        method: 'get',
        url: '/cpmBuildingUnit/list',
        params: data
    })
}
// 修改单元
export const cpmBuildingUnitUpdate = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuildingUnit/update',
        data: data
    })
}
// 添加单元
export const cpmBuildingUnitInsert = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuildingUnit/insert',
        data: data
    })
}
// 删除单元信息
export const cpmBuildingUnitDelete = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuildingUnit/delete',
        data: data
    })
}
// 查询楼栋和楼栋名称
export const cpmBuildingUnitFindAll = data => {
    return service.request({
        method: 'GET',
        url: '/cpmBuilding/findAll',
        params: data
    })
}
//查询楼栋单元房产信息
export const cpmBuildingUnitEstateList = data => {
    return service.request({
        method: 'GET',
        url: '/cpmBuildingUnitEstate/list',
        params: data
    })
}
//查询楼栋单元房产信息
export const UnitEstateFindById = data => {
    return service.request({
        method: 'GET',
        url: '/cpmBuildingUnitEstate/findById',
        params: data
    })
}
//查询楼栋单元房产信息
export const houseManagementInsert = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuildingUnitEstate/insert',
        data: data
    })
}
//cpmBuildingUnitEstate/update
export const houseManagementUpdate = data => {
    return service.request({
        method: 'post',
        url: '/cpmBuildingUnitEstate/update',
        data: data
    })
}
//查询房屋类型 状态 dataDictionary/findEstateStatus
export const dataDictionaryFindEstateType = data => {
    return service.request({
        method: 'GET',
        url: '/dataDictionary/findEstateType',
        params: data
    })
}
export const dataDictionaryFindEstateStatus = data => {
    return service.request({
        method: 'GET',
        url: '/dataDictionary/findEstateStatus',
        params: data
    })
}
// 添加车辆信息
export const userCarInsert = data => {
    return service.request({
        method: 'post',
        url: '/userCar/insert',
        data: data
    })
}
export const userCarUpdate = data => {
    return service.request({
        method: 'post',
        url: '/userCar/update',
        data: data
    })
}
// 根据id查询车辆信息
export const userCarFindById = data => {
    return service.request({
        method: 'GET',
        url: '/userCar/findById',
        params: data
    })
}
// 根据楼栋id查询对应的单元id和name
export const findByBuildingId = data => {
    return service.request({
        method: 'GET',
        url: '/cpmBuildingUnit/findByBuildingId',
        params: data
    })
}
// 查询车辆状态
export const findUserCarStatus = data => {
    return service.request({
        method: 'GET',
        url: '/dataDictionary/findUserCarStatus',
        params: data
    })
}
// 根据业主主键id 查询业主及其房产信息
export const cpmBuildingUnitEstateFindById = data => {
    return service.request({
        method: 'GET',
        url: '/cpmBuildingUnitEstate/findById',
        params: data
    })
}
export const userResidentFindAllBySearch = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/findAllBySearch',
        params: data
    })
}
//  根据名字模糊查询查询业主的id和name及房产相关信息
export const userResidentFindResidentNameBySearch = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/findResidentNameBySearch',
        params: data
    })
}
// 查询车位类型
export const findParkingSpaceType = data => {
    return service.request({
        method: 'GET',
        url: '/dataDictionary/findParkingSpaceType',
        params: data
    })
}
// export function cpmParkingSpaceist(data) {
//     return service.request({
//         method: 'GET',
//         url: '/myParkingSpace/list',
//         params: data
//     })
// }
// 查询车位类型
export const findParkingSpaceStatus = data => {
    return service.request({
        method: 'GET',
        url: '/dataDictionary/findParkingSpaceStatus',
        params: data
    })
}
// 查询车位类型
export const userResident = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/list',
        params: data
    })
}
export const userResidentListAll = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/listAll',
        params: data
    })
}
//添加业主信息
export const userResidentInsert = data => {
    return service.request({
        method: 'POST',
        url: '/userResident/insert',
        data: data
    })
}
export const tenantInsert = data => {
    return service.request({
        method: 'POST',
        url: '/tenant/insert',
        data: data
    })
}
// 查询车位信息（包含条件搜索）
export const cpmParkingSpaceList = data => {
    return service.request({
        method: 'GET',
        url: '/cpmParkingSpace/list',
        params: data
    })
}
// 修改车位信息
export const cpmParkingSpaceUpdate = data => {
    return service.request({
        method: 'POST',
        url: '/cpmParkingSpace/update',
        data: data
    })
}
// 根据业主主键id查询业主信息（及其关联的房屋信息和车位信息）
export const userResidentFindById = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/findById',
        params: data
    })
}
// 根据业主主键id查询业主信息
export const userResidentFindByIdOne = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/findByIdOne',
        params: data
    })
}
// 根据业主主键id 查询业主及其房产信息
export const userResidentFindEstateById = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/findEstateById',
        params: data
    })
}
//根据业主主键id 查询业主及其车位信息
export const userResidentFindParkingSpaceById = data => {
    return service.request({
        method: 'GET',
        url: '/userResident/findParkingSpaceById',
        params: data
    })
}
// 修改业主亲属信息
export const userResidentUpdateRelatives = data => {
    return service.request({
        method: 'POST',
        url: '/userResident/updateRelatives',
        data: data
    })
}
//修改业主房产信息 userResident/updateEstate
export const userResidentUpdateEstate = data => {
    return service.request({
        method: 'POST',
        url: '/userResident/updateEstate',
        data: data
    })
}
//userResident/updateParkingSpace
export const userResidentUpdateParkingSpace = data => {
    return service.request({
        method: 'POST',
        url: '/userResident/updateParkingSpace',
        data: data
    })
}
//tenant/updateRelatives
export const tenantUpdateRelatives = data => {
    return service.request({
        method: 'POST',
        url: '/tenant/updateRelatives',
        data: data
    })
}
//租客车位tenant/updateParkingSpace tenant/updateEstate
export const tenantUpdateParkingSpace = data => {
    return service.request({
        method: 'POST',
        url: '/tenant/updateParkingSpace',
        data: data
    })
}
export const tenantUpdateEstate = data => {
    return service.request({
        method: 'POST',
        url: '/tenant/updateEstate',
        data: data
    })
}
export const cpmParkingSpaceInsert = data => {
    return service.request({
        method: 'POST',
        url: '/cpmParkingSpace/insert',
        data: data
    })
}

// 根据车位主键ID查询车位信息

export const cpmParkingSpaceFindById = data => {
    return service.request({
        method: 'GET',
        url: '/cpmParkingSpace/findById',
        params: data
    })
}
// 根据单元id查询对应的房产id和name
export const findByBuildingUnitId = data => {
    return service.request({
        method: 'GET',
        url: '/cpmBuildingUnitEstate/findByBuildingUnitId',
        params: data
    })
}

/**
 * 管家服务
 */
// 添加便民电话信息
export const conveniencePhoneInsert = data => {
    return service.request({
        method: 'POST',
        url: '/conveniencePhone/insert',
        data: data
    })
}
//更新便民电话信息
export const conveniencePhoneUpdate = data => {
    return service.request({
        method: 'POST',
        url: '/conveniencePhone/update',
        data: data
    })
}
// 便民电话：更新定时检查信息
export const conveniencePhoneUpdateReminder = data => {
    return service.request({
        method: 'POST',
        url: '/conveniencePhone/updateReminder',
        data: data
    })
}
//便民电话：根据便民电话主键id查询便民电话信息
export const conveniencePhoneFindById = data => {
    return service.request({
        method: 'GET',
        url: '/conveniencePhone/findById',
        params: data
    })
}
//auditManagement/reviewResult
export const auditManagementReviewResult = data => {
    return service.request({
        method: 'POST',
        url: '/auditManagement/reviewResult',
        data: data
    })
}
//租赁管理
export const leaseInsert = data => {
    return service.request({
        method: 'POST',
        url: '/lease/insert',
        data: data
    })
}
//lease/update
export const leaseUpdate = data => {
    return service.request({
        method: 'POST',
        url: '/lease/update',
        data: data
    })
}
//lease/findById
export const leaseFindById = data => {
    return service.request({
        method: 'GET',
        url: '/lease/findById',
        params: data
    })
}
//lease/reviewer租赁审核
export const leaseReviewer = data => {
    return service.request({
        method: 'POST',
        url: '/lease/reviewer',
        data: data
    })
}
//lease/reviewTerminationApplication
export const reviewTerminationApplication = data => {
    return service.request({
        method: 'POST',
        url: '/lease/reviewTerminationApplication',
        data: data
    })
}
//lease/reviewDepositRefundApplication
export const reviewDepositRefundApplication = data => {
    return service.request({
        method: 'POST',
        url: '/lease/reviewDepositRefundApplication',
        data: data
    })
}
//leaseContract/insert租赁合同
export const leaseContractInsert = data => {
    return service.request({
        method: 'POST',
        url: '/leaseContract/insert',
        data: data
    })
}
//leaseContract/enable合同模板启用/停用
export const leaseContractEnable = data => {
    return service.request({
        method: 'GET',
        url: '/leaseContract/enable',
        params: data
    })
}
// lease/renew
export const leaseRenew = data => {
    return service.request({
        method: 'POST',
        url: '/lease/renew',
        data: data
    })
}
// http://192.168.31.129:9001/cpmBuildingUnitEstate/findByBuildingUnitId
// GET

// /cpmBuildingUnitEstate/insert
// cpmBuilding/findAll
// Login().then((res) => {
//   console.log(res.data.token)
//   sessionStorage.setItem('X-Admin-Token', res.data.token)
// })
