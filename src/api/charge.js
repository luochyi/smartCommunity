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

// 日常缴费：查询已开启的收费标准明细信息(物业管理费和日常费用)
export function dailyPaymentFindEnableTempleDetail(data) {
    return service.request({
        method: 'GET',
        url: '/dailyPayment/findEnableTempleDetail',
        params: data
    })
}
// 日常缴费：查询已开启的收费标准明细信息(物业管理费和日常费用)
export function activityManagementFindEnableTempleDetail(data) {
    return service.request({
        method: 'GET',
        url: '/activityManagement/findEnableTempleDetail',
        params: data
    })
}
// 收费标准管理：导出EXCEL
export function chargesTemplateDetailExport(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplateDetail/export',
        params: data
    })
}
//dailyPaymentPlan/insert   dailyPaymentPlan/update
export function dailyPaymentPlanInsert(data) {
    return service.request({
        method: 'POST',
        url: '/dailyPaymentPlan/insert',
        data: data
    })
}
export function dailyPaymentPlanUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/dailyPaymentPlan/update',
        data: data
    })
}
// 日常缴费：添加缴费信息（带有付款功能）【打印未做】
export function dailyPaymentInsert(data) {
    return service.request({
        method: 'POST',
        url: '/dailyPayment/insert',
        data: data
    })
}
//  日常缴费：缴费（带有付款功能）【打印未做】
export function dailyPaymentInsertOrder(data) {
    return service.request({
        method: 'POST',
        url: '/dailyPayment/insertOrder',
        data: data
    })
}
//日常缴费：人工手动推送日常缴费提醒
export function dailyPaymentPush(data) {
    return service.request({
        method: 'POST',
        url: '/dailyPayment/push',
        data: data
    })
}
// 押金管理：退押金
export function depositManagementRefund(data) {
    return service.request({
        method: 'POST',
        url: '/depositManagement/refund',
        data: data
    })
}
// 收费标准管理：根据物业收费标准模版主键id 启用/禁用 物业收费标准模版
export function chargesTemplateIsEnable(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplate/isEnable',
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
// 收费标准管理：批量删除物业收费标准模版
export function chargesTemplateDelete(data) {
    return service.request({
        method: 'POST',
        url: '/chargesTemplate/delete',
        data: data
    })
}
// 收费标准管理：添加物业收费标准明细信息
export function chargesTemplateDetailInsert(data) {
    return service.request({
        method: 'POST',
        url: '/chargesTemplateDetail/insert',
        data: data
    })
}
//收费标准管理：根据物业收费标准明细主键id 查询物业收费标准明细信息
export function chargesTemplateDetailFindById(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplateDetail/findById',
        params: data
    })
}
// chargesTemplateDetail/isEnable
export function chargesTemplateDetailIsEnable(data) {
    return service.request({
        method: 'GET',
        url: '/chargesTemplateDetail/isEnable',
        params: data
    })
}
//收费标准管理：更新物业收费标准明细信息
export function chargesTemplateDetailUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/chargesTemplateDetail/update',
        data: data
    })
}
// 收费标准管理：批量删除物业收费标准明细信息
export function chargesTemplateDetailDelete(data) {
    return service.request({
        method: 'POST',
        url: '/chargesTemplateDetail/delete',
        data: data
    })
}
//paper/insert票据管理
export function paperInsert(data) {
    return service.request({
        method: 'POST',
        url: '/paper/insert',
        data: data
    })
}
//领用票据paper/recipients
export function paperRecipients(data) {
    return service.request({
        method: 'POST',
        url: '/paper/recipients',
        data: data
    })
}