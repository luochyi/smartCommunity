<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>租赁管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增租赁信息</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                    <template v-slot:leaseDateStart="slotData">
                        <div>{{ slotData.data.leaseDateStart|capitalize}}</div>
                    </template>
                     <template v-slot:leaseDateEnd="slotData">
                        <div>{{ slotData.data.leaseDateEnd|capitalize}}</div>
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
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
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
                            <template slot="title">租赁信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
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
import {
    leaseInsert,
    leaseUpdate,
    leaseFindById,
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId,
    UnitEstateFindById
} from '@/api/basic'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
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
                    id: null,
                    code: null,
                    name: null,
                    sex: null,
                    idCard: null,
                    tel: null,
                    estateId: null,
                    type: null,
                    estateType: null,
                    estateStructure: null,
                    constructionArea: null,
                    indoorArea: null,
                    rentStandard: null,
                    margin: null,
                    leaseDateStart: null,
                    leaseDateEnd: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '合同编号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '租户名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '性别',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'sex',
                        options: [
                            {
                                value: 1,
                                label: '男'
                            },
                            {
                                value: 2,
                                label: '女'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '身份证号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'idCard'
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tel'
                    },
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'estateId'
                    },
                    {
                        type: 'Select',
                        label: '人才类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '一类人才'
                            },
                            {
                                value: 2,
                                label: '二类人才'
                            },
                            {
                                value: 3,
                                label: '三类人才'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '房屋户型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'estateType'
                    },
                    {
                        type: 'Input',
                        label: '房屋结构',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'estateStructure'
                    },
                    {
                        type: 'Input',
                        label: '建筑面积',
                        placeholder: '请选择房屋信息',
                        width: '50%',
                        prop: 'constructionArea',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '使用面积（室内面积）',
                        placeholder: '请选择房屋信息',
                        width: '50%',
                        prop: 'indoorArea',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '租金标准/月',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'rentStandard'
                    },
                    {
                        type: 'Input',
                        label: '保证金',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'margin'
                    },
                    {
                        type: 'DateTime',
                        label: '租赁开始时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'leaseDateStart'
                        
                    },
                    {
                        type: 'DateTime',
                        label: '租赁结束时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'leaseDateEnd'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '合同编号',
                        prop: 'code',
                        width: '170'
                    },
                    {
                        label: '租户姓名',
                        prop: 'name',
                        width: '80'
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        width: '80',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.sex == 1) {
                                return '男'
                            } else {
                                return '女'
                            }
                        }
                    },
                    {
                        label: '身份证号',
                        prop: 'idCard',
                        width: '180'
                    },
                    {
                        label: '房产名称',
                        prop: 'roomName',
                        width: '150'
                    },
                    {
                        label: '人才类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.type == 1) {
                                return '一类人才'
                            } else if (row.type == 2) {
                                return '二类人才'
                            } else {
                                return '三类人才'
                            }
                        }
                    },
                    {
                        label: '房屋户型',
                        prop: 'estateType',
                        width: 'auto'
                    },
                    {
                        label: '租金标准/月',
                        prop: 'rentStandard',
                        width: 'auto'
                    },
                    {
                        label: '保证金',
                        prop: 'margin',
                        width: 'auto'
                    },
                    {
                        label: '租赁开始时间',
                        prop: 'leaseDateStart',
                        width: '150',
                        type: 'slot',
                        slotName: 'leaseDateStart'
                    },
                    {
                        label: '租赁结束时间',
                        prop: 'leaseDateEnd',
                        width: '150',
                        type: 'slot',
                        slotName: 'leaseDateEnd'
                    },
                    {
                        label: '办理状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待签署'
                                    break
                                case 2:
                                    return '待提交'
                                    break
                                case 3:
                                    return '审核中'
                                    break
                                case 4:
                                    return '已驳回'
                                    break
                                case 5:
                                    return '待支付'
                                    break
                                case 6:
                                    return '已完成'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '审核人姓名',
                        prop: 'reviewerName',
                        width: 'auto'
                    },
                    {
                        label: '审核时间',
                        prop: 'auditDate',
                        width: 'auto'
                    },
                    {
                        label: '创建人姓名',
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
                url: 'leaseList',
                search_item: [
                    {
                        type: 'Input',
                        label: '租户姓名',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '身份证号',
                        placeholder: '请输入',
                        prop: 'idCard'
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '人才类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '一类人才'
                            },
                            {
                                value: 2,
                                label: '二类人才'
                            },
                            {
                                value: 3,
                                label: '三类人才'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '办理状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            {
                                value: 1,
                                label: '待签署'
                            },
                            {
                                value: 2,
                                label: '待提交'
                            },
                            {
                                value: 3,
                                label: '审核中'
                            },
                            {
                                value: 4,
                                label: '已驳回'
                            },
                            {
                                value: 5,
                                label: '待支付'
                            },
                            {
                                value: 6,
                                label: '已完成'
                            }
                        ]
                    }
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
    },
    methods: {
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
        add() {
            this.drawerTitle = '新增租赁信息'
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.buildValue = null
        },
        addSubmit() {
            if (this.drawerTitle == '新增租赁信息') {
                let resData = {
                    ...this.addForm.ruleForm
                }
                leaseInsert(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            } else if (this.drawerTitle == '修改租赁信息') {
                let resData = {
                    id: this.addForm.ruleForm.id,
                    ...this.addForm.ruleForm
                }
                leaseUpdate(resData).then((res) => {
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
                leaseFindById({ id: data[0].id }).then((res) => {
                    console.log(res)
                    this.addForm.ruleForm.id = res.data.id
                    this.addForm.ruleForm.code = res.data.code
                    this.addForm.ruleForm.name = res.data.name
                    this.addForm.ruleForm.sex = res.data.sex
                    this.addForm.ruleForm.idCard = res.data.idCard
                    this.addForm.ruleForm.tel = res.data.tel
                    this.addForm.ruleForm.type = res.data.type
                    this.addForm.ruleForm.estateType = res.data.estateType
                    this.addForm.ruleForm.estateStructure =
                        res.data.estateStructure
                    this.addForm.ruleForm.constructionArea =
                        res.data.constructionArea
                    this.addForm.ruleForm.indoorArea = res.data.indoorArea
                    this.addForm.ruleForm.rentStandard = res.data.rentStandard
                    this.addForm.ruleForm.margin = res.data.margin
                    this.addForm.ruleForm.leaseDateStart =
                        res.data.leaseDateStart
                    this.addForm.ruleForm.leaseDateEnd = res.data.leaseDateEnd
                    //编辑 房产信息
                    this.buildValue = res.data.buildingId
                    // this.unitValue = res.data.unitId
                    // this.hoursValue = res.data.roomNumber
                    this.add_vrisible = true
                    this.drawerTitle = '修改租赁信息'
                })
            }
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
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
    watch: {
        buildValue: {
            handler(newValue) {
                this.unitData(newValue)
                this.unitValue = null
            },
            deep: true
        },
        unitValue: {
            handler(newValue) {
                this.hoursData(newValue)
                this.hoursValue = null
            },
            deep: true
        },
        hoursValue: {
            handler(newValue) {
                this.addForm.ruleForm.estateId = newValue
                console.log(this.addForm.ruleForm.estateId)
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
    },filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    },
}
</script>