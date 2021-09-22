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
//访客管理： 查询今日家庭申报访客通行数量
export function visitorsCountVisitorsNew(data) {
    return service.request({
        method: 'GET',
        url: '/visitors/countVisitorsNew',
        params: data
    })
}
//投诉表扬：查询今日投诉条数
export function adviceCountComplaintNew(data) {
    return service.request({
        method: 'GET',
        url: '/complaintPraise/countComplaintNew',
        params: data
    })
}
// 投诉表扬：查询今日表扬条数
export function adviceCountPraiseNew(data) {
    return service.request({
        method: 'GET',
        url: '/complaintPraise/countPraiseNew',
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
//门禁二维码doorQRCode/addQrCode  doorQRCode/removeQrCode
export function AddQrCode(data) {
    return service.request({
        method: 'POST',
        url: '/doorQRCode/addQrCode',
        data: data
    })
}
export function removeQrCode(data) {
    return service.request({
        method: 'POST',
        url: '/doorQRCode/removeQrCode',
        data: data
    })
}
// 报事报修：查询报修详情(报事报修派单界面的报修详情内容，主界面报修详情 请查询 【工单管理：报修工单详情】)
export function reportRepairFindRepairDetail(data) {
    return service.request({
        method: 'GET',
        url: '/reportRepair/findRepairDetail',
        params: data
    })
}
// repairEngineering/insert
export function repairEngineeringInsert(data) {
    return service.request({
        method: 'POST',
        url: '/repairEngineering/insert',
        data: data
    })
}
//repairEngineering/findById
export function repairEngineeringFindById(data) {
    return service.request({
        method: 'GET',
        url: '/repairEngineering/findById',
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
//article/insert
export function articleInsert(data) {
    return service.request({
        method: 'POST',
        url: '/article/insert',
        data: data
    })
}
export function articleUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/article/update',
        data: data
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
// 工单管理：派工
export function dispatchDispatch(data) {
    return service.request({
        method: 'POST',
        url: '/dispatch/dispatch',
        data: data
    })
}
// /dispatch/findSysUserLikeActualName

//报事报修：修改报事报修信息
export function reportRepairUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/reportRepair/update',
        data: data
    })
}
// 工单管理：报修工单详情
export function repairWorkOrderDetail(data) {
    return service.request({
        method: 'GET',
        url: '/dispatch/repairWorkOrderDetail',
        params: data
    })
}
//  工单管理：回访
export function dispatchRevisit(data) {
    return service.request({
        method: 'POST',
        url: '/dispatch/revisit',
        data: data
    })
}
//  工单管理：作废
export function dispatchCancel(data) {
    return service.request({
        method: 'POST',
        url: '/dispatch/cancel',
        data: data
    })
}
//工单管理：根据真实名字模糊查询用户信息（需要有派工权限）
export function dispatchFindSysUserLikeActualName(data) {
    return service.request({
        method: 'GET',
        url: '/dispatch/findSysUserLikeActualName',
        params: data
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
// 物品管理：根据物品主键id查询物品信息
export function articleFindById(data) {
    return service.request({
        method: 'GET',
        url: '/article/findById',
        params: data
    })
}
//
// 小区话题管理：添加话题信息(物业后台添加)
export function gambitInsert(data) {
    return service.request({
        method: 'POST',
        url: '/gambit/insert',
        data: data
    })
}
// 小区话题管理：修改话题信息(物业后台修改)
export function gambitUpdate(data) {
    return service.request({
        method: 'POST',
        url: '/gambit/update',
        data: data
    })
}
// 小区话题管理
export function gambitFindById(data) {
    return service.request({
        method: 'GET',
        url: '/gambit/findById',
        params: data
    })
}
// gambitTheme/findCommentByThemeId
export function gambitThemeFindCommentByThemeId(data) {
    return service.request({
        method: 'GET',
        url: '/gambitTheme/findCommentByThemeId',
        params: data
    })
}
// gambitTheme/deleteCommentByCommentId
export function gambitThemeDeleteCommentByCommentId(data) {
    return service.request({
        method: 'GET',
        url: '/gambitTheme/deleteCommentByCommentId',
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
// 开启评论gambitTheme/enableComment    gambitTheme/enableTheme
export function gambitThemeEnableComment(data) {
    return service.request({
        method: 'GET',
        url: '/gambitTheme/enableComment',
        params: data
    })
}
export function gambitThemeEnableTheme(data) {
    return service.request({
        method: 'GET',
        url: '/gambitTheme/enableTheme',
        params: data
    })
}
export function gambitThemeList(data) {
    return service.request({
        method: 'GET',
        url: '/gambitTheme/list',
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
//  gambit/enableGambit   disableGambit
export function gambitEnableGambit(data) {
    return service.request({
        method: 'GET',
        url: '/gambit/enableGambit',
        params: data
    })
}
export function gambitDisableGambit(data) {
    return service.request({
        method: 'GET',
        url: '/gambit/disableGambit',
        params: data
    })
}