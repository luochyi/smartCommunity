import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        // 路由重定向
        redirect: '/Login',
        component: resolve => require(['@/views/Login'], resolve)
    },
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
                    },
                    {
                        path: '/company/functionAuthority',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/functionAuthority'
                            ], resolve)
                    },
                    //考勤记录attendanceRecord attendanceApplication
                    {
                        path: '/company/attendanceRecord',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/attendanceRecord'
                            ], resolve)
                    },
                    //attendanceTeam.vue
                    {
                        path: '/company/attendanceTeam',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/attendanceTeam'
                            ], resolve)
                    },
                    {
                        path: '/company/scheduling',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/scheduling'
                            ], resolve)
                    },
                    {
                        path: '/company/attendanceApplication',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/attendanceApplication'
                            ], resolve)
                    },
                    //薪资管理salaryManagement
                    {
                        path: '/company/salaryManagement',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/salaryManagement'
                            ], resolve)
                    },
                    //contractManage
                    {
                        path: '/company/contractManage',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/contractManage'
                            ], resolve)
                    },
                    {
                        path: '/company/trainManage',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/trainManage'
                            ], resolve)
                    },
                    // /company/functionAuthority  systemSettings
                    {
                        path: '/company/systemSettings',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/systemSettings'
                            ], resolve)
                    },
                    //reportForm
                    {
                        path: '/company/reportForm',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/reportForm'
                            ], resolve)
                    },
                    {
                        path: '/company/dataDictionary',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/dataDictionary'
                            ], resolve)
                    },
                    {
                        //databaseManagement
                        path: '/company/databaseManagement',
                        name:'databaseManagement',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/databaseManagement'
                            ], resolve)
                    },
                    // src/views/comprehensive/company/page/gentleSearch.vue
                    {
                        //gentleSearch
                        path: '/company/gentleSearch',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/gentleSearch'
                            ], resolve)
                    },
                    {
                        path: '/company/notice',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/notice'
                            ], resolve)
                    },
                    {
                        path: '/company/emergencyAlarm',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/emergencyAlarm'
                            ], resolve)
                    },
                    {
                        path: '/company/appEmergencyAlarm',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/appEmergencyAlarm'
                            ], resolve)
                    },
                    {
                        path: '/company/fireAlarm',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/fireAlarm'
                            ], resolve)
                    },
                    {
                        path: '/company/echarts',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/echarts'
                            ], resolve)
                    },
                    {
                        path: '/company/prohibitedKeywords',
                        name:'prohibitedKeywords',
                        component: resolve =>
                            require([
                                '@/views/comprehensive/company/page/prohibitedKeywords'
                            ], resolve)
                    }

                    
                ]
            }
        ]
    },
    //日常管理
    {
        path: '/daily',
        component: resolve => require(['@/components/comprehensiveHeader'], resolve),
        children: [
            {
                path: '/daily',
                component: resolve =>
                    require(['@/components/dailyAside'], resolve),
                children: [
                    {
                        // 收费标准管理
                        path: '/daily',
                        // 路由重定向
                        redirect: '/daily/facilitiesManagement',
                        component: resolve =>
                            require([
                                '@/views/daily/page/facilitiesManagement'
                            ], resolve)
                    },
                    {
                        //设施预约
                        //设施管理
                        path:'/daily/facilitiesManagement',
                        component:()=>import('@/views/daily/page/facilitiesManagement')
                    },
                    //sysOperations运维
                    {
                        path:'/daily/sysOperations',
                        component:()=>import('@/views/daily/page/sysOperations')
                   },
                    {
                         //预约管理
                         path:'/daily/bookingManagement',
                         name:'bookingManagement',
                         component:()=>import('@/views/daily/page/bookingManagement')
                    },
                    {
                         //设施检查
                         path:'/daily/facilityInspection',
                         component:()=>import('@/views/daily/page/facilityInspection')
                    },
                    {
                        //设施分类
                        path:'/daily/facilityItem',
                        component:()=>import('@/views/daily/page/facilityItem')
                   },
                   {
                    // 家政housekeepingServices
                    path: '/daily/housekeepingServices',
                    component: resolve =>
                        require([
                            '@/views/daily/page/housekeepingServices'
                        ], resolve)
                },
                   
                   {
                    //检查记录
                    path:'/daily/facilitiesExecute',
                    component:()=>import('@/views/daily/page/facilitiesExecute')
               },
                   //巡检
                   {
                    path:'/daily/inspectionPoint',
                    component:()=>import('@/views/daily/page/inspectionPoint')
                    },
                    {
                        path:'/daily/inspectionPlan',
                        component:()=>import('@/views/daily/page/inspectionPlan')
                    },
                    {
                        path:'/daily/inspectionRoute',
                        component:()=>import('@/views/daily/page/inspectionRoute')
                    },
                    //executeList
                    {
                        path:'/daily/inspectionPlanExecuteList',
                        component:()=>import('@/views/daily/page/inspectionPlanExecuteList')
                    },
                    //物料
                    {
                        path:'/daily/materialInOut',
                        component:()=>import('@/views/daily/page/materialInOut')
                    },
                    {
                        path:'/daily/materialManagement',
                        component:()=>import('@/views/daily/page/materialManagement')
                    },
                    //materialInventory
                    {
                        path:'/daily/materialInventory',
                        component:()=>import('@/views/daily/page/materialInventory')
                    },
                    {
                        path:'/daily/packageCollection',
                        name:'packageCollection',
                        component:()=>import('@/views/daily/page/packageCollection')
                    },
                    {
                        path:'/daily/keyManagement',
                        component:()=>import('@/views/daily/page/keyManagement')
                    },
                    {
                        path:'/daily/keyExamine',
                        component:()=>import('@/views/daily/page/keyExamine')
                    },
                    {
                        path:'/daily/decorationManagement',
                        component:()=>import('@/views/daily/page/decorationManagement')
                    },
                    {
                        path:'/daily/keyExamine',
                        component:()=>import('@/views/daily/page/keyExamine')
                    },
                    {
                        // 报事报修
                        path: '/daily/reportRepair',
                        name:'reportRepair',
                        component: resolve =>
                            require([
                                '@/views/daily/page/reportRepair'
                            ], resolve)
                    },
                    {
                        // 工程维修
                        path: '/daily/engineeringMaintenance',
                        component: resolve =>
                            require([
                                '@/views/daily/page/engineeringMaintenance'
                            ], resolve)
                    },
                    {
                        // 工程维修
                        path: '/butler/engineeringMaintenanceDetail',
                        component: resolve =>
                            require([
                                '@/views/butler/components/engineeringMaintenance/engineeringMaintenanceDetail'
                            ], resolve)
                    },
                    //CustomerInterview
                    {
                        path:'/daily/CustomerInterview',
                        component:()=>import('@/views/daily/page/CustomerInterview')
                    },
                    {
                        // 业务会管理
                        path: '/daily/businessManagement',
                        component: resolve =>
                            require([
                                '@/views/daily/page/businessManagement'
                            ], resolve)
                    },
                    //CommunityIntroduction
                    {
                        path:'/daily/CommunityIntroduction',
                        component:()=>import('@/views/daily/page/CommunityIntroduction')
                    },
                    //Regulation management
                    {
                        path:'/daily/RegulationManagement',
                        component:()=>import('@/views/daily/page/RegulationManagement')
                    },
                    //社区介绍Community introduction
                    {
                        path:'/daily/ComIntroduction',
                        component:()=>import('@/views/daily/page/ComIntroduction')
                    },
                    //地理信息geographicInformation
                    {
                        path:'/daily/geographicInformation',
                        component:()=>import('@/views/daily/page/geographicInformation')
                    },
                    //周边企业Surrounding enterprises
                    {
                        path:'/daily/SurroundingEnterprises',
                        component:()=>import('@/views/daily/page/SurroundingEnterprises')
                    },
                    //服务浏览Service browsing
                    {
                        path:'/daily/ServiceBrowsing',
                        component:()=>import('@/views/daily/page/ServiceBrowsing')
                    },
                    {
                        path:'/daily/GreeningTask',
                        component:()=>import('@/views/daily/page/GreeningTask')
                    },
                    {
                        path:'/daily/GreeningArea',
                        component:()=>import('@/views/daily/page/GreeningArea')
                    },
                    {
                        path:'/daily/HealthManagement',
                        component:()=>import('@/views/daily/page/HealthManagement')
                    },
                    {
                        path:'/daily/HealthArea',
                        component:()=>import('@/views/daily/page/HealthArea')
                    },
                    {
                        path:'/daily/safeManage',
                        component:()=>import('@/views/daily/page/safeManage')
                    },
                    {
                        // 装修管理
                        path: '/daily/decorationManagementDetail',
                        component: resolve =>
                            require([
                                '@/views/daily/page/decorationManagementDetail'
                            ], resolve)
                    },
                ]
            }
        ]
    },
    {
        // 基础档案
        path: '/basic',
        component: resolve => require(['@/components/comprehensiveHeader'], resolve),
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
                    },
                    {
                        // 审核
                        path: '/basic/auditManagement',
                        component: resolve =>
                            require([
                                '@/views/basic/page/auditManagement'
                            ], resolve)
                    },
                    //lease/insert
                    {
                        // 租赁管理
                        path: '/basic/lease',
                        component: resolve =>
                            require([
                                '@/views/basic/page/lease'
                            ], resolve)
                    },
                    {
                        // 租房合同
                        path: '/basic/contractManage',
                        component: resolve =>
                            require([
                                '@/views/basic/page/contractManage'
                            ], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/charge',
        component: resolve => require(['@/components/comprehensiveHeader'], resolve),
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
                        redirect: '/charge/chargeForm',
                        component: resolve =>
                            require([
                                '@/views/charge/page/chargeForm'
                            ], resolve)
                    },
                    {
                        // 财务报表
                        path: '/charge/chargeForm',
                        component: resolve =>
                            require([
                                '@/views/charge/page/chargeForm'
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
                        // 计划
                        path: '/charge/paymentScheme',
                        component: resolve =>
                            require([
                                '@/views/charge/page/paymentScheme'
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
                    },//expenseBillDetailList
                    {
                        // 账单管理
                        path: '/charge/expenseBillDetailList',
                        name:'expenseBillDetailList',
                        component: resolve =>
                            require(['@/views/charge/page/expenseBillDetailList'], resolve)
                    },
                    //invoiceManagement发票
                    {
                        path: '/charge/invoiceManagement',
                        name:'invoiceManagement',
                        component: resolve =>
                            require(['@/views/charge/page/invoiceManagement'], resolve)
                    },
                    // MeterReading
                    {
                        path: '/charge/MeterReading',
                        component: resolve =>
                            require(['@/views/charge/page/MeterReading'], resolve)
                    },
                    {
                        path: '/charge/MeterBil',
                        component: resolve =>
                            require(['@/views/charge/page/MeterBil'], resolve)
                    },
                    {
                        path: '/charge/MeterBillDetailList',
                        name:'MeterBillDetailList',
                        component: resolve =>
                            require(['@/views/charge/page/MeterBillDetailList'], resolve)
                    },
                    {
                        // 日常缴费
                        path: '/charge/StandingBook',
                        component: resolve =>
                            require([
                                '@/views/charge/page/StandingBook'
                            ], resolve)
                    },
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
                    // /Users/apple/Desktop/smartCommunity1/src/views/daily/page/decorationManagementDetail.vue
                    
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
                    name:'visitorManagement',
                        component: resolve =>
                            require([
                                '@/views/butler/page/visitorManagement'
                            ], resolve)
                    },
                    {
                        // 门禁二维码
                        path: '/butler/doorQrCode',
                        component: resolve =>
                            require([
                                '@/views/butler/page/doorQrCode'
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
                    
                    // /Users/apple/Desktop/smartCommunity1/src/views/butler/components/engineeringMaintenance/engineeringMaintenanceDetail.vue
                    {
                        // 问卷调查
                        path: '/butler/Questionnaire',
                        component: resolve =>
                            require([
                                '@/views/butler/page/Questionnaire'
                            ], resolve)
                    },
                    {
                        // 小区管理
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
                                '@/views/daily/page/loanManagement'
                            ], resolve)
                    },
                    // itemManagemsent
                    {
                        // 物品管理
                        path: '/butler/itemManagemsent',
                        component: resolve =>
                            require([
                                '@/views/daily/page/itemManagemsent'
                            ], resolve)
                    },
                    
                    {
                        // 语音管家
                        path: '/butler/voiceButler',
                        component: resolve =>
                            require([
                                '@/views/butler/page/voiceButler'
                            ], resolve)
                    },
                    
                    
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
                        // 小区活动
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
                    },
                    {
                        // 资讯发布
                        path: '/operation/consultationRelease',
                        component: resolve =>
                            require([
                                '@/views/operation/page/consultationRelease'
                            ], resolve)
                    },
                    {
                        // 资讯分类
                        path: '/operation/consultationItem',
                        component: resolve =>
                            require([
                                '@/views/operation/page/consultationItem'
                            ], resolve)
                    },
                    {
                        // dianshang
                        path: '/operation/shoppingInfo',
                        component: resolve =>
                            require([
                                '@/views/operation/page/shoppingInfo'
                            ], resolve)
                    },
                    {
                        // dianshang
                        path: '/operation/shoppingItem',
                        component: resolve =>
                            require([
                                '@/views/operation/page/shoppingItem'
                            ], resolve)
                    },
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
                        redirect: '/commodity/newCommodity',
                        component: resolve =>
                            require(['@/views/commodity/newPage/Commodity'], resolve)
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
                        // 订单管理
                        path: '/commodity/orderManagement',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/orderManagement'
                            ], resolve)
                    },
                    {
                        // 退换
                        path: '/commodity/unshippedRefund',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/unshippedRefund'
                            ], resolve)
                    },
                    //shopEvaluationList评价
                    {
                        // 退换
                        path: '/commodity/evaluationList',
                        component: resolve =>
                            require([
                                '@/views/commodity/page/evaluationList'
                            ], resolve)
                    },
                    // {unshippedRefund
                    //     // 居家生活
                    //     //服务管理
                    //     path:'/commodity/serviceManagement',
                    //      component:()=>import('@/views/commodity/page/serviceManagement')
                    // },
                    // {
                    //     // 服务分类
                    //     path:'/commodity/serviceItem',
                    //      component:()=>import('@/views/commodity/page/serviceItem')
                    // },
                    // {
                    //     // 商家管理
                    //     path:'/commodity/businessManagement',
                    //      component:()=>import('@/views/commodity/page/businessManagement')
                    // },

                    // 商品管理
                    {
                        path: '/commodity/newCommodity',
                        component: resolve =>
                            require([
                                '@/views/commodity/newPage/Commodity'
                            ], resolve)
                    },
                    // 类目管理
                    {
                        path: '/commodity/newCategory',
                        component: resolve =>
                            require([
                                '@/views/commodity/newPage/Category'
                            ], resolve)
                    },
                    // 订单管理
                    {
                        path: '/commodity/newOrder',
                        component: resolve =>
                            require([
                                '@/views/commodity/newPage/Order'
                            ], resolve)
                    },
                    // 商城配置
                    {
                        path: '/commodity/Configuration',
                        component: resolve =>
                            require([
                                '@/views/commodity/newPage/Configuration'
                            ], resolve)
                    },
                ]
            }
        ]
    },
    {
        path: '/system',
        component: resolve => require(['@/components/smartHeader'], resolve)
    },
  
]
const router = new VueRouter({
    routes,
    mode: 'hash'
})

export default router
