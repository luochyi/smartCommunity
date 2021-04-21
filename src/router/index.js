import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     // 路由重定向
    //     redirect: '/overview',
    //     component: resolve =>
    //         require(['@/views/overview/page/overview'], resolve)
    // },
    {
        path: '/company',
        redirect: '/company/companyInfo'
    },
    {
        path: '/Login',
        name: 'Login',
        component: resolve => require(['@/views/Login'], resolve)
    },
    {
        path: '/company',
        component: resolve =>
            require(['@/components/comprehensiveHeader'], resolve),
        children: [
            {
                path: '/company',
                component: resolve =>
                    require(['@/components/comprehensiveAside'], resolve),
                children: [
                    {
                        path: '/company/companyInfo',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/companyInfo'
                            ], resolve)
                    },
                    {
                        path: '/company/orgManagement',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/orgManagement'
                            ], resolve)
                    },
                    {
                        path: '/company/personnelManagement',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/personnelManagement'
                            ], resolve)
                    }
                ]
            }
        ]
    },

    {
        // 概览
        path: '/overview',
        component: resolve => require(['@/components/smartHeader'], resolve),
        children: [
            {
                path: '/overview',
                component: resolve =>
                    require(['@/views/overview/page/overview'], resolve)
            }
        ]
    },
    {
        path: '/butler',
        component: resolve => require(['@/components/smartHeader'], resolve),
        children: [
            {
                path: '/butler',
                component: resolve =>
                    require(['@/components/butlerAside'], resolve),
                children: [
                    {
                        // 物品出门
                        path: '/butler',
                        // 路由重定向
                        redirect: '/butler/itemsOut',
                        component: resolve =>
                            require(['@/views/butler/page/itemsOut'], resolve)
                    },
                    {
                        // 物品出门
                        path: '/butler/itemsOut',
                        component: resolve =>
                            require(['@/views/butler/page/itemsOut'], resolve)
                    },
                    {
                        // 装修管理
                        path: '/butler/decorationManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/decorationManagement'
                            ], resolve)
                    },
                    {
                        // 投票管理
                        path: '/butler/votingManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/votingManagement'
                            ], resolve)
                    },
                    {
                        // 便民电话
                        path: '/butler/conveniencePhone',
                        component: resolve =>
                            require([
                                '@/views/butler/page/conveniencePhone'
                            ], resolve)
                    },
                    {
                        // 建议咨询
                        path: '/butler/suggestConsultation',
                        component: resolve =>
                            // require(['@/views/butler/components/input/index'], resolve)
                            require([
                                '@/views/butler/page/suggestConsultation'
                            ], resolve)
                    },
                    // /Users/apple/Desktop/smartCommunity/basic-admin/src/views/butler/page/decorationDetails.vue

                    {
                        // 访客管理
                        path: '/butler/visitorManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/visitorManagement'
                            ], resolve)
                    },
                    {
                        // 投诉表扬
                        path: '/butler/complainPraise',
                        component: resolve =>
                            require([
                                '@/views/butler/page/complainPraise'
                            ], resolve)
                    },
                    {
                        // 报事报修
                        path: '/butler/reportRepair',
                        component: resolve =>
                            require([
                                '@/views/butler/page/reportRepair'
                            ], resolve)
                    },
                    {
                        // 问卷调查
                        path: '/butler/Questionnaire',
                        component: resolve =>
                            require([
                                '@/views/butler/page/Questionnaire'
                            ], resolve)
                    },
                    {
                        // 社区管理
                        // 话题管理
                        path: '/butler/topiManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/topiManagement'
                            ], resolve)
                    },
                    {
                        // 主题明细管理
                        path: '/butler/subjectManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/subjectManagement'
                            ], resolve)
                    },
                    {
                        // 工单管理
                        path: '/butler/workManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/workManagement'
                            ], resolve)
                    },
                    {
                        // 派工单管理
                        path: '/butler/orderManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/orderManagement'
                            ], resolve)
                    },
                    {
                        // 工单设置
                        path: '/butler/managementSet',
                        component: resolve =>
                            require([
                                '@/views/butler/page/managementSet'
                            ], resolve)
                    },
                    {
                        // 借还管理
                        path: '/butler/loanManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/loanManagement'
                            ], resolve)
                    },
                    // itemManagemsent
                    {
                        // 物品管理
                        path: '/butler/itemManagemsent',
                        component: resolve =>
                            require([
                                '@/views/butler/page/itemManagemsent'
                            ], resolve)
                    },
                    {
                        // 业务会管理
                        path: '/butler/businessManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/businessManagement'
                            ], resolve)
                    },
                    {
                        // 语音管家
                        path: '/butler/voiceButler',
                        component: resolve =>
                            require([
                                '@/views/butler/page/voiceButler'
                            ], resolve)
                    }
                ]
            }
        ]
    },
    {
        // 运营管理
        path: '/operation',
        component: resolve => require(['@/components/smartHeader'], resolve),
        children: [
            {
                path: '/operation',
                component: resolve =>
                    require(['@/components/operationAside'], resolve),
                children: [
                    {
                        // 通知管理
                        path: '/operation',
                        // 路由重定向
                        redirect: '/operation/announcementManagement',
                        component: resolve =>
                            require([
                                '@/views/operation/page/announcementManagement'
                            ], resolve)
                    },
                    {
                        // 通知管理
                        path: '/operation/announcementManagement',
                        component: resolve =>
                            require([
                                '@/views/operation/page/announcementManagement'
                            ], resolve)
                    },
                    {
                        // 通知管理
                        path: '/operation/notificationManagement',
                        component: resolve =>
                            require([
                                '@/views/operation/page/notificationManagement'
                            ], resolve)
                    },
                    {
                        // 社区活动
                        // 活动管理
                        path: '/operation/eventManagement',
                        component: resolve =>
                            require([
                                '@/views/operation/page/eventManagement'
                            ], resolve)
                    },
                    {
                        // 主办方管理
                        path: '/operation/sponsorManagement',
                        component: resolve =>
                            require([
                                '@/views/operation/page/sponsorManagement'
                            ], resolve)
                    },
                    {
                        // 投票管理
                        path: '/operation/votingManagement',
                        component: resolve =>
                            require([
                                '@/views/operation/page/votingManagement'
                            ], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/charge',
        component: resolve => require(['@/components/smartHeader'], resolve),
        children: [
            {
                path: '/charge',
                component: resolve =>
                    require(['@/components/chargeAside'], resolve),
                children: [
                    {
                        // 收费标准管理
                        path: '/charge',
                        // 路由重定向
                        redirect: '/charge/chargeStandard',
                        component: resolve =>
                            require([
                                '@/views/charge/page/chargeStandard'
                            ], resolve)
                    },
                    {
                        // 收费标准管理
                        path: '/charge/chargeStandard',
                        component: resolve =>
                            require([
                                '@/views/charge/page/chargeStandard'
                            ], resolve)
                    },
                    {
                        // 日常缴费
                        path: '/charge/dailyMayment',
                        component: resolve =>
                            require([
                                '@/views/charge/page/dailyMayment'
                            ], resolve)
                    },
                    {
                        // 押金管理
                        path: '/charge/depositManagement',
                        component: resolve =>
                            require([
                                '@/views/charge/page/depositManagement'
                            ], resolve)
                    },
                    {
                        // 工单管理
                        path: '/charge/orderManagement',
                        component: resolve =>
                            require([
                                '@/views/charge/page/orderManagement'
                            ], resolve)
                    },
                    {
                        // 账单管理
                        path: '/charge/expenseBil',
                        component: resolve =>
                            require(['@/views/charge/page/expenseBil'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/commodity',
        component: resolve => require(['@/components/smartHeader'], resolve),
        children: [
            {
                // /Users/apple/Desktop/smartCommunity/basic-admin/src/views/commodity
                path: '/commodity',
                component: resolve =>
                    require(['@/components/commodityAside'], resolve),
                children: [
                    {
                        // 商品
                        path: '/commodity',
                        // 路由重定向
                        redirect: '/commodity/home',
                        component: resolve =>
                            require(['@/views/commodity/page/home'], resolve)
                    },
                    {
                        // 商品
                        path: '/commodity/home',
                        component: resolve =>
                            require(['@/views/commodity/page/home'], resolve)
                    },
                    {
                        // 商品管理
                        path: '/commodity/commodityManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/commodityManagement'
                            ], resolve)
                    },
                    {
                        // 商品创建
                        path: '/commodity/commodityCreation',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/commodityCreation'
                            ], resolve)
                    },
                    {
                        // 类目管理
                        path: '/commodity/categoryManagemen',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/categoryManagemen'
                            ], resolve)
                    },
                    {
                        // 供应商管理
                        path: '/commodity/supplierManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/supplierManagement'
                            ], resolve)
                    },
                    {
                        // 品牌资质
                        path: '/commodity/brandQualification',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/brandQualification'
                            ], resolve)
                    },
                    {
                        // 订单管理
                        path: '/commodity/orderManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/orderManagement'
                            ], resolve)
                    },
                    {
                        // 批量发货
                        path: '/commodity/bulkShipping',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/bulkShipping'
                            ], resolve)
                    },
                    {
                        // 评价管理
                        path: '/commodity/evaluationManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/evaluationManagement'
                            ], resolve)
                    },
                    {
                        // 违规处理
                        path: '/commodity/violationHandling',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/violationHandling'
                            ], resolve)
                    },
                    {
                        // 预售买预警
                        path: '/commodity/buyWarning',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/buyWarning'
                            ], resolve)
                    },
                    {
                        // 未发货退款
                        path: '/commodity/unshippedRefund',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/unshippedRefund'
                            ], resolve)
                    },
                    {
                        // 已发货售后
                        path: '/commodity/Shipped',
                        component: resolve =>
                            require(['@/views/commodity/page/Shipped'], resolve)
                    },
                    {
                        // 客户电话设置
                        path: '/commodity/phoneSet',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/phoneSet'
                            ], resolve)
                    },
                    {
                        // 服务请求
                        path: '/commodity/requestService',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/requestService'
                            ], resolve)
                    },
                    {
                        // 极速退款助手
                        path: '/commodity/refundAssistant',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/refundAssistant'
                            ], resolve)
                    },
                    {
                        // 团购商品管理
                        path: '/commodity/groupMerchandise',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/groupMerchandise'
                            ], resolve)
                    },
                    {
                        // 拼团管理
                        path: '/commodity/groupManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/groupManagement'
                            ], resolve)
                    },
                    {
                        // 运费模版
                        path: '/commodity/freightTemplate',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/freightTemplate'
                            ], resolve)
                    },
                    {
                        // 地址库管理
                        path: '/commodity/addressManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/addressManagement'
                            ], resolve)
                    },
                    {
                        // 商品分析
                        path: '/commodity/commodityAnalysis',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/commodityAnalysis'
                            ], resolve)
                    },
                    {
                        // 账户中心
                        path: '/commodity/accountCenter',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/accountCenter'
                            ], resolve)
                    },
                    {
                        // 在线支付账单
                        path: '/commodity/payBills',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/payBills'
                            ], resolve)
                    },
                    {
                        // 订单流水明细
                        path: '/commodity/orderDetails',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/orderDetails'
                            ], resolve)
                    },
                    {
                        // 供应商结算列表
                        path: '/commodity/settlementList',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/settlementList'
                            ], resolve)
                    },
                    {
                        // 供应商账单
                        path: '/commodity/supplierBills',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/supplierBills'
                            ], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/system',
        component: resolve => require(['@/components/smartHeader'], resolve)
    },
    {
        // 基础档案
        path: '/basic',
        component: resolve => require(['@/components/smartHeader'], resolve),
        children: [
            {
                path: '/basic',
                component: resolve =>
                    require(['@/components/basicAside'], resolve),
                children: [
                    {
                        // 车辆档案
                        path: '/basic',
                        // 路由重定向
                        redirect: '/basic/buildingManagement',
                        component: resolve =>
                            require([
                                '@/views/basic/page/buildingManagement'
                            ], resolve)
                    },
                    {
                        // 车辆档案
                        path: '/basic/vehicleFile',
                        component: resolve =>
                            require(['@/views/basic/page/vehicleFile'], resolve)
                    },
                    {
                        // 车位信息
                        path: '/basic/parkingInfo',
                        component: resolve =>
                            require(['@/views/basic/page/parkingInfo'], resolve)
                    },
                    {
                        // 业主档案
                        path: '/basic/ownersFile',
                        component: resolve =>
                            require(['@/views/basic/page/ownersFile'], resolve)
                    },
                    {
                        // 租户档案
                        path: '/basic/tenantFile',
                        component: resolve =>
                            require(['@/views/basic/page/tenantFile'], resolve)
                    },
                    {
                        // 租户档案
                        path: '/basic/formDate',
                        component: resolve =>
                            require(['@/components/form/formDate'], resolve)
                    },
                    {
                        // 楼栋管理
                        path: '/basic/buildingManagement',
                        component: resolve =>
                            require([
                                '@/views/basic/page/buildingManagement'
                            ], resolve)
                    },
                    {
                        // 单元管理
                        path: '/basic/unitInfo',
                        component: resolve =>
                            require(['@/views/basic/page/unitInfo'], resolve)
                    },
                    {
                        // 房屋管理
                        path: '/basic/houseManagement',
                        component: resolve =>
                            require([
                                '@/views/basic/page/houseManagement'
                            ], resolve)
                    }
                ]
            }
        ]
    }
]
const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router
