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
// /vote/findById
// 投票管理：根据投票主键id查询投票信息（修改页面）
export function voteFindById(data) {
    return service.request({
        method: 'GET',
        url: '/vote/findById',
        params: data
    })
}
// /vote/insert /vote/update
// 投票管理新增
export function voteInsert(data) {
    return service.request({
        method: 'POST',
        url: '/vote/insert',
        data: data
    })
}
// 投票管理修改
export function voteUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/vote/update',
        data: data
    })
}
// 投票管理：根据投票管理主键id批量发布投票信息
export function voteRelease(data) {
    return service.request({
        method: 'POST',
        url: '/vote/release',
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
// 报事报修：添加报事报修信息
export function reportRepairInsert(data) {
    return service.request({
        method: 'POST',
        url: '/reportRepair/insert',
        data: data
    })
}
// 报事报修：根据报事报修主键id 查询报事报修信息
export function reportRepairFindById(data) {
    return service.request({
        method: 'GET',
        url: '/reportRepair/findById',
        params: data
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
//问卷调查：根据问卷调查主键ID查询问卷调查信息
export function questionnaireFindById(data) {
    return service.request({
        method: 'GET',
        url: '/questionnaire/findById',
        params: data
    })
}
// 问卷调查：修改问卷
export function questionnaireUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/questionnaire/update',
        data: data
    })
}
//问卷调查：问卷调查报表分析
export function questionnaireReportAnalysis(data) {
  return service.request({
      method: 'GET',
      url: '/questionnaire/reportAnalysis',
      params: data
  })
}

// 社区话题管理：添加话题信息(物业后台添加)
export function gambitInsert(data) {
    return service.request({
        method: 'POST',
        url: '/gambit/insert',
        data: data
    })
}
// 社区话题管理：修改话题信息(物业后台修改)
export function gambitUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/gambit/update',
        data: data
    })
}
// 社区话题管理
export function gambitFindById(data) {
    return service.request({
        method: 'GET',
        url: '/gambit/findById',
        params: data
    })
}
// 主题明细管理：批量恢复主题明细信息
export function gambitThemeRecovery(data) {
    return service.request({
        method: 'POST',
        url: '/gambitTheme/recovery',
        data: data
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
// 工单管理-工单设置：修改工单大类信息
export function workOrderTypeUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderType/update',
        data: data
    })
}
// 工单管理-工单设置：添加工单大类信息
export function workOrderTypeInsert(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderType/insert',
        data: data
    })
}
// 工单管理-工单设置：删除工单大类信息
export function workOrderTypeDelete(data) {
    return service.request({
        method: 'GET',
        url: '/workOrderType/delete',
        params: data
    })
}
// 工单管理-工单设置：添加工单类型明细信息
export function workOrderTypeDetailInsert(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderTypeDetail/insert',
        data: data
    })
}
// 工单管理-工单设置：添加工单时限信息
export function workOrderTimeLimitInsert(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderTimeLimit/insert',
        data: data
    })
}
// 工单管理-工单设置：删除工单类型明细
export function workOrderTypeDetailDelete(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderTypeDetail/delete',
        data: data
    })
}
// 工单管理-工单设置：根据工单时限主键id查询工单时限信息
export function workOrderTimeLimitFindById(data) {
    return service.request({
        method: 'GET',
        url: '/workOrderTimeLimit/findById',
        params: data
    })
}
// 工单管理-工单设置：更新工单时限信息
export function workOrderTimeLimitUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderTimeLimit/update',
        data: data
    })
}
// 工单管理-工单设置：更新工单类型明细信息
export function workOrderTypeDetailUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/workOrderTypeDetail/update',
        data: data
    })
}
// 工单管理-工单设置：根据工单类型明细主键id查询工单类型明细信息
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
// 借还管理：提醒(管理员发送)
export function borrowRemind(data) {
    return service.request({
        method: 'POST',
        url: '/borrow/remind',
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
