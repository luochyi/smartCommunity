<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>缴费计划</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增缴费计划</el-button
                    >
                </div>
                <!-- <div style="width: 50px">
                    <download-excel
                        class="export-excel-wrapper"
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        name="租赁管理.xls"
                    >
                        <el-button size="mini" icon="el-icon-folder-add" plain
                            >导出Excel</el-button
                        >
                    </download-excel>
                </div> -->
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <!-- 过滤租赁时间 只显示年月日 -->
                        <template v-slot:leaseDateStart="slotData">
                            <div>
                                {{ slotData.data.leaseDateStart | capitalize }}
                            </div>
                        </template>
                        <template v-slot:leaseDateEnd="slotData">
                            <div>
                                {{ slotData.data.leaseDateEnd | capitalize }}
                            </div>
                        </template>
                        <!-- <template slot="tabs">
                            <el-tabs
                                v-model="activeName"
                                @tab-click="handleClick"
                            >
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="待巡检"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已巡检"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已完成"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="edit(table_row)">编辑</button>
                                <!-- <button @click="audit(table_row)">审核</button> -->
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    :drawerTitle="drawerTitle"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">缴费计划</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <template v-slot:rate>
                                        <el-input
                                            v-model="addForm.ruleForm.rate"
                                            size="small"
                                            style="width: 240px"
                                            placeholder="请输入"
                                        >
                                            <i
                                                slot="suffix"
                                                style="font-style: normal"
                                                class="metre"
                                                >%</i
                                            >
                                        </el-input>
                                    </template>
                                    <template v-slot:chargesTemplateDetailId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm
                                                    .chargesTemplateDetailId
                                            "
                                            @change="
                                                (value) =>
                                                    feeNameChange(
                                                        value,
                                                        feeNameList
                                                    )
                                            "
                                            style="width: 240px"
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="(
                                                    item, index
                                                ) in feeNameList"
                                                :key="index"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <!-- Slot -->
                                    <template v-slot:hours>
                                        <el-select
                                            v-model="buildValue"
                                            filterable
                                            style="
                                                width: 30%;
                                                margin-right: 16px;
                                            "
                                            placeholder="幢"
                                            @change="buildchange(buildValue)"
                                        >
                                            <el-option
                                                v-for="item in buildOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select
                                            v-model="unitValue"
                                            filterable
                                            style="
                                                width: 30%;
                                                margin-right: 16px;
                                            "
                                            placeholder="单元"
                                            @change="unitchange(unitValue)"
                                        >
                                            <el-option
                                                v-for="item in unitOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-select
                                            v-model="hoursValue"
                                            filterable
                                            style="width: 30%"
                                            placeholder="房间号"
                                        >
                                            <el-option
                                                v-for="item in hoursOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-slot:date>
                                        <el-time-picker
                                            is-range
                                            v-model="addDate"
                                            range-separator="至"
                                            @change="dateTimeChange"
                                            value-format="HH:MM:SS"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围"
                                        >
                                        </el-time-picker>
                                    </template>
                                </VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="addSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="addClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    dailyPaymentFindEnableTempleDetail,
    dailyPaymentPlanInsert,
    dailyPaymentPlanUpdate
} from '@/api/charge'
import {
    leaseFindById,
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId,
    UnitEstateFindById,
    leaseReviewer
} from '@/api/basic'
// import func from 'vue-editor-bridge'
export default {
    data() {
        let feeNameList = []
        dailyPaymentFindEnableTempleDetail().then((result) => {
            result.data.map((item) => {
                feeNameList.push({
                    value: item.id,
                    label: item.name,
                    unitPrice: item.unitPrice,
                    type: item.type
                })
            })
        })
        return {
            thatId: null,
            feeNameList: feeNameList,
            drawerTitle: null,
            add_vrisible: false,
            // 楼栋
            buildValue: null,
            buildOptions: [],
            // 单元
            unitValue: null,
            unitOptions: [],
            // 房屋
            hoursValue: null,
            hoursOptions: [],
            addDate: null,
            loading: false,
            addForm: {
                ruleForm: {
                   buildingUnitEstateId: null,
                    chargesTemplateDetailId: null,
                    beginPlanDate: null,
                    endPlanDate: null,
                    unitPrice: null,
                    num: null,
                    costPrice: null,
                    cycle:null,
                    rate:null,
                    paymentTime:null,
                    remake:null
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'buildingUnitEstateId'
                    },
                    {
                        type: 'Slot',
                        label: '费用名称',
                        prop: 'chargesTemplateDetailId',
                        slotName: 'chargesTemplateDetailId',
                        width: '50%'
                    },
                    {
                        type: 'DateTime',
                        label: '计费计划开始时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'beginPlanDate'
                    },
                    {
                        type: 'DateTime',
                        label: '计费计划结束时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'endPlanDate'
                    },
                    {
                        type: 'Input',
                        label: '计费单位/单价',
                        placeholder: '请选择',
                        prop: 'unitPrice',
                        width: '50%',
                        disabled: true
                    },
                    {
                        type: 'Int',
                        label: '面积/用量',
                        placeholder: '请输入',
                        prop: 'num',
                        // width: "100%"
                        width: '50%'
                    },
                    {
                        type: 'Input',
                        label: '费用金额',
                        placeholder: '请输入',
                        prop: 'costPrice',
                        // width: "100%"
                        width: '50%',
                        disabled: true
                    },
                    {
                        type: 'Select',
                        label: '生成周期',
                        placeholder: '请输入',
                        prop: 'cycle',
                        // width: "100%"
                        width: '50%',
                        options:[
                            {
                                label:'每月',
                                value:1
                            },
                            // {
                            //     label:'每季度',
                            //     value:2
                            // },
                            // {
                            //     label:'每半年',
                            //     value:3
                            // },
                            // {
                            //     label:'每年',
                            //     value:4
                            // },
                        ]
                    },
                    {
                        type: 'Slot',
                        label: '费率',
                        width: '50%',
                        prop: 'rate',
                        slotName: 'rate'
                    },
                    {
                        type: 'Select',
                        label: '缴费期限日期',
                        width: '50%',
                        prop: 'paymentTime',
                        options:[]
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        width: '100%',
                        prop: 'remake',
                    }
                ]
            },
            table_row: [],
            // json_fields: {
            //     合同编号: 'code',
            //     租户姓名: 'name',
            //     性别: {
            //         field: 'sex',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '男'
            //                     break
            //                 default:
            //                     return '女'
            //             }
            //         }
            //     },
            //     身份证号: 'idCard',
            //     房产名称: 'roomName',
            //     人才类型: {
            //         field: 'type',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '一类人才'
            //                     break
            //                 case 2:
            //                     return '二类人才'
            //                     break
            //                 default:
            //                     return '三类人才'
            //             }
            //         }
            //     },
            //     房屋户型: 'estateType',
            //     '租金标准/月': 'rentStandard',
            //     保证金: 'margin',
            //     租赁开始时间: 'leaseDateStart',
            //     租赁结束时间: 'leaseDateEnd',
            //     办理状态: {
            //         field: 'status',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '待签署'
            //                     break
            //                 case 2:
            //                     return '待提交'
            //                     break
            //                 case 3:
            //                     return '审核中'
            //                     break
            //                 case 4:
            //                     return '已驳回'
            //                     break
            //                 case 5:
            //                     return '待支付'
            //                     break
            //                 case 6:
            //                     return '已完成'
            //                     break
            //                 case 11:
            //                     return '申请终止合同'
            //                     break
            //                 case 12:
            //                     return '申请终止失败'
            //                     break
            //                 case 13:
            //                     return '申请终止成功'
            //                     break
            //                 case 14:
            //                     return '已支付剩余租金'
            //                     break
            //                 case 15:
            //                     return '申请退还保证金'
            //                     break
            //                 case 16:
            //                     return '申请退还保证金驳回'
            //                     break
            //                 case 17:
            //                     return '申请退还保证金成功'
            //                     break
            //                 default:
            //                     break
            //             }
            //         }
            //     },
            //     审核人姓名: 'reviewerName',
            //     审核时间: 'auditDate',
            //     创建人姓名: 'createName',
            //     创建时间: 'createDate'
            // },
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '房产名称',
                        prop: 'roomName',
                        width: 'auto'
                    },
                    {
                        label: '物业收费标准明细收费名称',
                        prop: 'chargesTemplateDetailName',
                        width: 'auto'
                    },
                    {
                        label: '计费计划开始时间',
                        prop: 'beginPlanDate',
                        width: 'auto'
                    },
                    {
                        label: '计费计划结束时间',
                        prop: 'endPlanDate',
                        width: 'auto'
                    },
                    {
                        label: '计费单价/单位',
                        prop: 'unitPrice',
                        width: '180',
                        type: 'function',
                        callback: (row, prop) => {
                            // 收费类型（1.元/月 平方米，2.元/ 立方米，3.元/ 次）
                            switch (row.type) {
                                case 1:
                                    return row.unitPrice + '元/月'
                                    break
                                case 2:
                                    return row.unitPrice + '元/ 立方米'
                                    break
                                case 3:
                                    return row.unitPrice + '元/ 次'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '面积/用量/数量',
                        prop: 'num',
                        width: 'auto'
                    },
                    {
                        label: '费用金额',
                        prop: 'costPrice',
                        width: 'auto'
                    },
                    {
                        label: '生成周期',
                        prop: 'cycle',
                        width: 'auto',
                        type:'function',
                        callback:(row,prop)=>{
                            switch(row.cycle){
                                case 1:
                                return '每月'
                                break
                            }
                        }
                    },
                    {
                        label: '费率',
                        prop: 'rate',
                        width: 'auto'
                    },
                    {
                        label: '缴费期限日期',
                        prop: 'paymentTime',
                        width: 'auto'
                    },
                    {
                        label: '备注',
                        prop: 'remake',
                        width: 'auto'
                    },
                    {
                        label: '创建人名称',
                        prop: 'createName',
                        width: 'auto'
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'dailyPaymentPlanList',
                search_item: [
                    // {
                    //     type: 'Input',
                    //     label: '租户姓名',
                    //     placeholder: '请输入',
                    //     prop: 'name'
                    // }
                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    mounted() {
        // 弹窗内下拉框
        cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
        })
        for(let i=1;i<=28;i++){
            console.log(i);
            let obj ={
                value:i,
                label:i+'号'
            }
            this.addForm.form_item[9].options.push(obj)
        }
    },
    methods: {
        // 楼栋变化
        buildchange(data) {
            console.log(data)
            this.unitData(data)
            this.unitValue = null
            this.hoursValue = null
        },
        // 单元变化
        unitchange(data) {
            this.hoursData(data)
            this.hoursValue = null
        },
        // 单元楼栋
        unitData(value) {
            let resData = {
                id: value
            }
            findByBuildingId(resData).then((res) => {
                // 给单元号赋值
                this.unitOptions = res
            })
        },
        hoursData(value) {
            let resData = {
                id: value
            }
            findByBuildingUnitId(resData).then((res) => {
                console.log(res)
                this.hoursOptions = res
            })
        },
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'dailyPaymentPlanList',
                data: {
                    pageNum: 1,
                    size: 100
                }
            }
            const data = await DownloadExcel(params, this)
            return data
        },
        // Excel进度
        ExcelLoading(page, pageCount) {
            const Loading = this.$loading({
                lock: true,
                text: `正在导出Excel${page}`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            Loading.text = `正在导出Excel  ${page}/${pageCount}`
            console.log(Loading.text)
        },
        // Excel导出结束
        finishDownload() {
            const Loading = this.$loading()
            Loading.close()
        },
        // 新增
        add() {
            this.drawerTitle = '新增缴费计划'
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.buildValue = null
            this.unitValue = null
            this.hoursValue = null
        },
        addSubmit() {
            if (this.drawerTitle == '新增缴费计划') {
                let resData = {
                    ...this.addForm.ruleForm,
                    unitPrice: this.feeData.unitPrice,
                    type: this.feeData.type,
                    
                }
                dailyPaymentPlanInsert(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            } else if (this.drawerTitle == '修改缴费计划') {
                let resData = {
                    id: this.addForm.ruleForm.id,
                    ...this.addForm.ruleForm
                }
                dailyPaymentPlanUpdate(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            }
        },
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message: '请选择一条信息进行修改',
                    type: 'error'
                })
            } else {
                let res = data[0]
                console.log(res);
                return
                    //房产信息
                    this.buildValue = res.data.buildingId
                    this.unitValue = res.data.unitId
                    this.hoursValue = res.data.buildingUnitEstateId
                    // 修改drawer
                    this.add_vrisible = true
                    this.drawerTitle = '修改缴费计划'
            }
        },
        // 费用名称变化
        feeNameChange(value, options) {
            let data = options.find(function (item) {
                if (item.value === value) {
                    return item
                }
            })
            let str = ''
            switch (data.type) {
                case 1:
                    str = '元/月 平方米'
                    break
                case 2:
                    str = '元/月 立方米'
                    break
                case 3:
                    str = '元/次'
                    break
                default:
                    break
            }
            // data
            this.feeData = data
            this.addForm.ruleForm.unitPrice = data.unitPrice + str
        },
        // 表格选中
        tableCheck(data) {
            this.table_row = data
        },
        // 删除
        del(data) {
            if (data.length) {
                let arr = []
                for (let i = 0; i < this.table_row.length; i++) {
                    arr.push(this.table_row[i].id)
                }
                this.$confirm('是否确认删除？删除不可恢复', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'confirmButton',
                    cancelButtonClass: 'cancelButton'
                })
                    .then(() => {
                        this.$refs.table.tableDelete(arr)
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        }
    },
    // 监听
    watch: {
        'addForm.ruleForm.num': {
            handler(newValue) {
                if (newValue && this.feeData.unitPrice) {
                    this.addForm.ruleForm.costPrice = (
                        newValue * this.feeData.unitPrice
                    ).toFixed(2)
                }
            },
            immediate: true
        },
        buildValue: {
            handler(newValue) {
                this.unitData(newValue)
            },
            deep: true
        },
        unitValue: {
            handler(newValue) {
                this.hoursData(newValue)
            },
            deep: true
        },
        hoursValue: {
            handler(newValue) {
                this.addForm.ruleForm.buildingUnitEstateId = newValue
                console.log(this.addForm.ruleForm.buildingUnitEstateId)
                UnitEstateFindById({ id: newValue }).then((res) => {
                    console.log(res.cpmBuildingUnitEstate)
                    if (res.cpmBuildingUnitEstate) {
                        this.addForm.ruleForm.constructionArea =
                            res.cpmBuildingUnitEstate.constructionArea
                        this.addForm.ruleForm.indoorArea =
                            res.cpmBuildingUnitEstate.indoorArea
                    }
                })
            },
            deep: true
        }
    },
    //过滤租赁时间 只显示年月日
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    }
}
</script>