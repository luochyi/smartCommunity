import service from '../utils/request'
import requestUrl from './requestUrl'
// 查询今日预计家庭物品出户数量
export function userArticleOutCountArticleOutNow(data) {
    return service.request({
        method: 'GET',
        url: '/userArticleOut/countArticleOutNow',
        params: data
    })
}
//  查询未执行的家庭物品出户数量
export function userArticleOutCountPerformed(data) {
    return service.request({
        method: 'GET',
        url: '/userArticleOut/countPerformed',
        params: data
    })
}
// 物品出门：查询出门照片
// /userArticleOut/findGoOutImgById
export function userArticleOuFindGoOutImgById(data) {
    return service.request({
        method: 'GET',
        url: '/userArticleOut/findGoOutImgById',
        params: data
    })
}
//装修管理： 查询今日预计发起装修数量
export function userDecorationCountDecorationNow(data) {
    return service.request({
        method: 'GET',
        url: '/userDecoration/countDecorationNow',
        params: data
    })
}
// 装修管理： 查询未执行的家庭装修数量
export function userDecorationCountPerformed(data) {
    return service.request({
        method: 'GET',
        url: '/userDecoration/countPerformed',
        params: data
    })
}
// 投票管理：即将开始的投票数
export function voteCountVoteExpectedStart(data) {
    return service.request({
        method: 'GET',
        url: '/vote/countVoteExpectedStart',
        params: data
    })
}
//  根据投票主键id查询投票信息（详情页面）
export function voteFindDetailById(data) {
    return service.request({
        method: 'GET',
        url: '/vote/findDetailById',
        params: data
    })
}
// /vote/listVotePersonnel
// 根据投票管理主键id和候选人主键ID查询候选人投票详情信息
export function voteListVotePersonnel(data) {
    return service.request({
        method: 'GET',
        url: '/vote/listVotePersonnel',
        params: data
    })
}
// /vote/listDetailCandidate
// 根据投票管理主键id查询所有投票候选人信息（详情页面）
export function voteListDetailCandidate(data) {
    return service.request({
        method: 'GET',
        url: '/vote/listDetailCandidate',
        params: data
    })
}
// /vote/insert
export function voteInsert(data) {
    return service.request({
        method: 'POST',
        url: '/vote/insert',
        data: data
    })
}
// 根据咨询建议主键id查询咨询建议详情
export function adviceFindById(data) {
    return service.request({
        method: 'GET',
        url: '/advice/findById',
        params: data
    })
}
// /complaintPraise/findById
export function complaintPraiseFindById(data) {
    return service.request({
        method: 'GET',
        url: '/complaintPraise/findById',
        params: data
    })
}
// /complaintPraise/insertDetail
// 投诉表扬：回复投诉表扬（添加反馈信息）[已替换违禁关键字]
export function complaintPraiseInsertDetail(data) {
    return service.request({
        method: 'POST',
        url: '/complaintPraise/insertDetail',
        data: data
    })
}
// 咨询建议：回复咨询建议（添加反馈信息）[已替换违禁关键字]
export function adviceInsertDetail(data) {
    return service.request({
        method: 'POST',
        url: '/advice/insertDetail',
        data: data
    })
}
//  查询今日咨询条数
export function adviceCountConsultNew(data) {
    return service.request({
        method: 'GET',
        url: '/advice/countConsultNew',
        params: data
    })
}
//查询今日建议条数
export function adviceCountAdviceNew(data) {
    return service.request({
        method: 'GET',
        url: '/advice/countAdviceNew',
        params: data
    })
}
// 访客管理：批量作废访客信息
export function visitorsCancel(data) {
    return service.request({
        method: 'POST',
        url: '/visitors/cancel',
        data: data
    })
}
// 访客管理：更新访客管理信息
export function visitorsUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/visitors/update',
        data: data
    })
}
// 访客管理：根据访客管理信息主键id查询访客出入记录
export function visitorsListDetail(data) {
    return service.request({
        method: 'GET',
        url: '/visitors/listDetail',
        params: data
    })
}
// 访客管理：根据访客管理主键id查询访客管理信息
export function visitorsFindById(data) {
    return service.request({
        method: 'GET',
        url: '/visitors/findById',
        params: data
    })
}
// 查询物品照片
export function userArticleOutFindGoodsImgById(data) {
    return service.request({
        method: 'GET',
        url: '/userArticleOut/findGoodsImgById',
        params: data
    })
}
// 工单设置
export function workOrderType(data) {
    return service.request({
        method: 'GET',
        url: '/workOrderType/list',
        params: data
    })
}
export function workOrderTypeFindById(data) {
    return service.request({
        method: 'GET',
        url: '/workOrderTypeDetail/findById',
        params: data
    })
}

// 根据工单大类主键id查询工单类型明细信息
export function workOrderTypeList(data) {
    return service.request({
        method: 'GET',
        url: '/workOrderTypeDetail/list',
        params: data
    })
}
// 查询所有的工单时限管理信息
export function workOrderTimeLimitList(data) {
    return service.request({
        method: 'GET',
        url: '/workOrderTimeLimit/list',
        params: data
    })
}
