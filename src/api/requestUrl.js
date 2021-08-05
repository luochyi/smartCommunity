const requestUrl = {
    // 综合服务
    alarmOneButtonAlarmList: 'alarm/oneButtonAlarmList',
    alarmFireAlarmList: 'alarm/fireAlarmList',
    alarmButlerOneButtonAlarmList:'alarm/butlerOneButtonAlarmList',
    trainList: 'train/list',
    trainListDelete: 'train/delete',
    contractList: 'contract/list',
    contractListDelete: 'contract/delete',
    salaryList: 'salary/list',
    salaryListDelete: 'salary/delete',
    dataDictionaryList: 'dataDictionary/list',
    attendanceRecordList:'attendanceRecord/list',
    attendanceRecordLeaveList:'attendanceRecord/leaveList',
    //提醒
    remindList:'remind/list',
    //数据库
    dataBaseList: 'dataBase/list',
    dataBaseListDelete: 'dataBase/delete',
    // dataDictionaryListDelete:'dataDictionary/delete',
    //基础档案
    buildList: '/cpmBuilding/list',
    buildListDelete: '/cpmBuilding/delete',
    UnitList: '/cpmBuildingUnit/list',
    UnitListDelete: '/cpmBuildingUnit/delete',
    houseList: '/cpmBuildingUnitEstate/list',
    houseListDelete: '/cpmBuildingUnitEstate/delete',
    parkList: '/cpmParkingSpace/list',
    parkListDelete: '/cpmParkingSpace/delete',
    vehicleList: '/userCar/list',
    vehicleListDelete: '/userCar/delete',
    ownerList: '/userResident/list',
    ownerListDelete: '/userResident/delete',
    tenantList: '/tenant/list',
    auditManagementList: '/auditManagement/list',
    leaseList:'lease/list',
    leaseListDelete:'lease/delete',
    leaseContractList:'leaseContract/list',
    leaseContractListDelete:'leaseContract/delete',
    // 管家服务
    itemsOutList: '/userArticleOut/list',
    itemsOutListDelete: '/userArticleOut/delete',
    userDecorationList: '/userDecoration/list',
    userDecorationNewList:'userDecorationNew/list',
    userDecorationListDelete: '',
    //设施设备
    sysOperationsList:'sysOperations/list',
    sysOperationsListDelete:'sysOperations/delete',
    facilitiesManageList: 'facilitiesManage/list',
    facilitiesCategoryList: '/facilitiesCategory/list',
    facilitiesCategoryListDelete: '/facilitiesCategory/delete',
    facilitiesManageListDelete: '/facilitiesManage/delete',
    facilitiesAppointmentList: 'facilitiesAppointment/list',
    facilitiesPlanExecuteList:'facilitiesPlan/executeList',
    facilitiesPlanList:'facilitiesPlan/list',
    facilitiesPlanListDelete:'facilitiesPlan/delete',
    //巡检
    inspectionPointList: 'inspectionPoint/list',
    inspectionPlanList: 'inspectionPlan/list',
    inspectionRouteList: 'inspectionRoute/list',
    inspectionPointListDelete: 'inspectionPoint/falseDelete',
    inspectionRouteListDelete: 'inspectionRoute/falseDelete',
    inspectionPlanListDelete: 'inspectionPlan/falseDelete',
    inspectionPlanExecuteList:'inspectionPlan/executeList',
    //物资物料
    materialList: 'material/list',
    materialListDelete: 'material/delete',
    materialRecordList: 'materialRecord/list',
    materialInventoryList:'materialInventory/list',
    //钥匙
    keyManagementList: '/keyManagement/list',
    keyManagementListDelete: '/keyManagement/delete',
    keyBorrowList: 'keyBorrow/list',
    //包裹
    packageCollectionList: 'packageCollection/list',
    packageCollectionListDelete: '/packageCollection/delete',

    userDecorationList: 'userDecoration/list',
    voteList: '/vote/list',
    voteListDelete: '/vote/falseDelete',
    voteListDetailList: '/vote/listDetailCandidate',
    voteListVotePersonnel: '/vote/listVotePersonnel',
    //doorQRCode/list
    doorQRCodeList:'doorQRCode/list',
    doorQRCodeListDelete:'doorQRCode/removeQrCode',
    // /vote/listVotePersonnel
    conveniencePhoneList: '/conveniencePhone/list',
    conveniencePhoneListDelete: 'conveniencePhone/delete',
    adviceList: '/advice/list',
    adviceListDelete: '/advice/falseDelete',
    visitorsList: '/visitors/list',
    visitorsListDelete: '/visitors/cancel',
    //新访客
    visitorsNewList:"visitorsNew/list",
    complaintPraiseList: '/complaintPraise/list',
    complaintPraiseListDelete: '/complaintPraise/falseDelete',
    reportRepairList: '/reportRepair/list',
    reportRepairListDelete: '/dispatch/falseDelete',
    questionnaireList: '/questionnaire/list',
    questionnaireListDelete: '/questionnaire/falseDelete',
    gambitList: '/gambit/list',
    gambitListDelete: '/gambit/delete',
    gambitThemeList: '/gambitTheme/list',
    gambitThemeListDelete: '/gambitTheme/falseDelete',
    dispatchList: '/dispatch/list',
    dispatchListDelete: '/dispatch/falseDelete',
    workOrderTimeLimitList: '/workOrderTimeLimit/list',
    workOrderTimeLimitListDelete: '/workOrderTimeLimit/delete',
    borrowList: '/borrow/list',
    articleList: '/article/list',
    articleListDelete:'article/delete',
    ownersCommitteeList: '/ownersCommittee/list',
    ownersCommitteeListDelete: '/ownersCommittee/delete',
    voiceHousekeeperList: '/voiceHousekeeper/list',
    housekeepingServiceList:'housekeepingService/list',
    // /vote/listDetailCandidate
    // /chargesTemplateDetail/list
    //票据
    paperList:'paper/list',
    //票据删除
    paperListDelete:'paper/delete',
    chargesTemplateDetailList: '/chargesTemplateDetail/list',
    chargesTemplateDetailListDelete: '/chargesTemplateDetail/list',
    dailyPaymentList: '/dailyPayment/list',
    dailyPaymentPlanList:"dailyPaymentPlan/list",
    dailyPaymentPlanListDelete:"dailyPaymentPlan/delete",
    depositManagementList: '/depositManagement/list',
    workOrderCostList: '/workOrderCost/list',
    expenseBillList: '/expenseBill/list',
    announcementManagementList: '/announcementManagement/list',
    announcementManagementListDelete: '/announcementManagement/delete',
    notificationManagementList: '/notificationManagement/list',
    notificationManagementListDelete: '/notificationManagement/delete',
    activityManagementList: '/activityManagement/list',
    activityManagementListDelete: '/activityManagement/falseDelete',
    sponsorManagementList: '/sponsorManagement/list',
    sponsorManagementListDelete: '/sponsorManagement/falseDelete',
    // List Delete
    //资讯
    newsCategoryManagementList: 'newsCategoryManagement/list',
    newsCategoryManagementListDelete: 'newsCategoryManagement/delete',
    newsManagementList: 'newsManagement/list',
    newsManagementListDelete: 'newsManagement/delete',
    //电子商务
    electronicCommerceCategoryList: 'electronicCommerceCategory/list',
    electronicCommerceCategoryListDelete: 'electronicCommerceCategory/delete',
    electronicCommerceList: 'electronicCommerce/list',
    electronicCommerceListDelete: 'electronicCommerce/delete',

    //客户访谈
    interviewList:'interview/list',
    interviewListDelete:'interview/delete',
    //规程
    regulationManagementList: 'regulationManagement/list',
    regulationManagementListDelete: 'regulationManagement/delete',
    //服务浏览
    serviceBrowsingList: 'serviceBrowsing/list',
    serviceBrowsingListDelete: 'serviceBrowsing/delete',
    //绿化
    greenAreaList: 'greenArea/list',
    greenAreaListDelete: 'greenArea/delete',
    greenTaskList: 'greenTask/list',
    greenTaskListDelete: 'greenTask/delete',
    communityIntroductionList: 'communityIntroduction/list',
    communityIntroductionListDelete: 'communityIntroduction/delete',
    //卫生
    hygieneAreaList: 'hygieneArea/list',
    hygieneAreaListDelete: 'hygieneArea/delete',
    hygieneTaskList: 'hygieneTask/list',
    hygieneTaskListDelete: 'hygieneTask/delete',
    //商城shop/supplier/list
    shopSupplierList: 'shop/supplier/list',
    shopSupplierListDelete: 'shop/supplier/delete',
    shopGoodsList: 'shop/goods/list',
    shopGoodsListDelete: 'shop/goods/delete',
    shopOrderList: 'shop/order/list',
    shopRefundList: 'shop/refund/list',
    //评价
    shopEvaluationList:'shop/evaluation/list'
}
export default requestUrl
