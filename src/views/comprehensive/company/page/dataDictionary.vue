<template>
    <div class="main-content">
        <div class="main-titel">
            <span>数据字典</span>
        </div>
        <div class="content">
            <template>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="700"
                >
                    <el-table-column fixed prop="index" label="序号" width="80">
                    </el-table-column>
                    <el-table-column
                        prop="item"
                        label="所属功能大类"
                        width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="gnm" label="功能名" width="120">
                    </el-table-column>
                    <el-table-column prop="field" label="字段名" width="700">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="
                                    deleteRow(scope.$index, tableData)
                                "
                                type="text"
                                size="small"
                            >
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    index: '1',
                    item: '日常管理',
                    gnm: '设施预约',
                    field:
                        'facilitiesCategoryName	设施分类名称;facilitiesName	设施名称; appointmentName	预约人;appointmentTel	预约人电话;appointmentStartDate	预约开始时间;appointmentEndDate	预约结束时间;status 预约状态（1.未签到，2.已签到，3.已作废，4.已取消,5.已结束）'
                },
                {
                    index:'2',
                    item:'日常管理',
                    gnm:'巡检管理',
                    field:'inspectionRouteId	巡检路线主键id;name	巡检计划名称;	organizationId	部门id（组织id）;	inspector	巡检人id;planBeginDate	计划开始时间;isSort 是否按顺序巡检（1.顺序，2.不顺序）【当前只有实现不顺序】;checkRateType 检查频率【类型】类型：1.每天，2.每周，3.每月'
                },
                {
                    index:'3',
                    item:'日常管理',
                    gnm:'钥匙管理',
                    field:'facilityName	设备名称;	num	钥匙数量;	correspondingPosition	对应位置;storageLocation	存放位置;administrator	管理人名称;tel	管理人联系方式'
                },
                {
                    index:'4',
                    item:'收费管理',
                    gnm:'押金管理',
                    field:'	chargesTemplateDetailId	费用名称id;roomName	房屋信息;	payDateStart	缴费时间开始;payDateEnd	缴费时间结束;depositName	押金人;tel	联系方式;	status	状态 1.未退，2.已退;froms	来源（1.app,2.线下）'
                },
                {
                    index:'5',
                    item:'管家服务',
                    gnm:'物品出门',
                    field:'roomName	房屋信息;	applicantName	申请人姓名;	applicantTel	申请人手机号;actualTimeStart	实际出门时间开始;	actualTimeEnd	实际出门时间结束;name	物品名称(格式为: 电器,家具,纺织 使用‘,’分割);	status	状态(1.待出门，2.已出门，3.驳回申请);expectedTimeSort	预计出门时间排序（1.降序，2.升序）;actualTimeSort	实际出门时间排序（1.降序，2.升序）'
                },
                {
                    index:'6',
                    item:'管家服务',
                    gnm:'报事报修',
                    field:'code	报修单号;	repairman	报修人;	roomName	房屋信息;	froms	报修来源;distributor	分配人;	operator	维修人;repairDateStart	报修时间开始;repairDateEnd	报修时间结束;status 状态（1.待分配，2.已分配未接单，3.已分配处理中，4.已处理，5.已确认已完成，6.已关闭，7.已作废，8.已取消）'
                },
                {
                    index:'7',
                    item:'运营管理',
                    gnm:'公告管理',
                    field:'	title	公告标题;	pushObject	推送对象;	readingVolume	阅读量;status	状态;createName	创建人姓名;	updateDate	更新时间'
                },
                
            ]
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1)
        }
    }
}
</script>
