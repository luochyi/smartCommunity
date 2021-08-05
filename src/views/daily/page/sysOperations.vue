<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>运维管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增计划</el-button
                    >
                </div>
                <!-- <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="设施设备检查记录.xls"
                            >
                                上面可以自定义自己的样式，还可以引用其他组件button
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel></div> -->
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="tabs">
                            <el-tabs
                                v-model="activeName"
                                @tab-click="handleClick"
                            >
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已修复"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="部分损坏"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未修复"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="edit(table_row)">编辑</button>
                                <!-- <button @click="open(table_row)">
                                    启用
                                </button>
                                <button @click="stop(table_row)">
                                    停用
                                </button> -->
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
                            <template slot="title">信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- Slot -->
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
                                    <!-- 选择部门 -->
                                    <template v-slot:sysOrganization>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.organizationId
                                            "
                                            :remote-method="remoteMethod"
                                            @change="sChange"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in sysOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
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
    sysOperationsInsert,
    sysOperationsUpdate,
    sysOrganizationFindAllDepartment,
    sysUserList,
    facilitiesManageList,
    facilitiesPlanInsert,
    inspectionRouteList,
    facilitiesPlanOpen,
    facilitiesPlanStop
} from '@/api/daily'
export default {
    data() {
        return {
            thatId: null,
            drawerTitle: '',
            add_vrisible: false,
            addDate: null,
            options: [],
            ids: [],
            sysOptions: [],
            // inspector: [],
            loading: false,
            addForm: {
                ruleForm: {
                    equipment: null,
                    type: null,
                    people: null,
                    materials: null,
                    costs: null,
                    department: null,
                    results: null,
                    times: null,
                    remakes: null,
                    maintenanceDate: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '维修设备',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'equipment'
                    },
                    {
                        type: 'Select',
                        label: '维修类别',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '大修'
                            },
                            {
                                value: 2,
                                label: '小修'
                            },
                            {
                                value: 3,
                                label: '项修'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '维修人姓名',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'people'
                    },
                    {
                        type: 'Input',
                        label: '维修用料',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'materials'
                    },

                    {
                        type: 'Input',
                        label: '维修费用（元）',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'costs'
                    },
                    {
                        type: 'Input',
                        label: '维修单位（公司）',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'department'
                    },
                    {
                        type: 'Select',
                        label: '维修类别',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'results',
                        options: [
                            {
                                value: 1,
                                label: '已修复'
                            },
                            {
                                value: 2,
                                label: '部分损坏'
                            },
                            {
                                value: 3,
                                label: '未修复'
                            }
                        ]
                    },
                    {
                        type: 'Int',
                        label: '维修用时（时）',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'times'
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'remakes'
                    },
                    {
                        type: 'DateTime',
                        label: '维修时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'maintenanceDate'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            json_fields: {
                设施设备检查计划编号: 'code',
                '设施/设备名称': 'facilitiesName',
                检查人姓名: 'examinerName',
                检查人联系方式: 'examinerTel',
                任务状态: {
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '开启'
                                break
                            case 2:
                                return '停用'
                                break
                        }
                    }
                },
                计划开始时间: 'planBeginDate',
                '单次持续时间（单位分钟）': 'spaceTime',
                检查频率: {
                    field: 'checkRateType',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '每天'
                                break
                            case 2:
                                return '每周'
                                break
                            case 3:
                                return '每月'
                                break
                            default:
                                break
                        }
                    }
                },
                创建人: 'createName'
            },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '记录编号',
                        prop: 'code',
                        width: 'auto'
                    },
                    {
                        label: '维修设备',
                        prop: 'equipment',
                        width: 'auto'
                    },
                    {
                        label: '维修类别',
                        prop: 'type',
                        width: 'auto'
                    },
                    {
                        label: '维修人姓名',
                        prop: 'people',
                        width: 'auto'
                    },
                    {
                        label: '维修用料',
                        prop: 'materials',
                        width: 'auto'
                    },
                    {
                        label: '维修费用（元）',
                        prop: 'costs',
                        width: 'auto'
                    },
                    {
                        label: '维修单位',
                        prop: 'department',
                        width: 'auto'
                    },
                    {
                        label: '维修结果',
                        prop: 'results',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.results) {
                                case 1:
                                    return '已修复'
                                    break
                                case 2:
                                    return '部分损坏'
                                    break
                                case 3:
                                    return '未修复'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '维修用时（时）',
                        prop: 'times',
                        width: 'auto'
                    },
                    {
                        label: '备注',
                        prop: 'remakes',
                        width: 'auto'
                    },
                    {
                        label: '维修时间',
                        prop: 'maintenanceDate',
                        width: 'auto'
                    },
                    {
                        label: '登记人',
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
                url: 'sysOperationsList',
                search_item: [
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '大修'
                            },
                            {
                                value: 2,
                                label: '小修'
                            },
                            {
                                value: 3,
                                label: '项修'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '维修结果',
                        placeholder: '请输入',
                        prop: 'results',
                        options: [
                            {
                                value: 1,
                                label: '已修复'
                            },
                            {
                                value: 2,
                                label: '部分损坏'
                            },
                            {
                                value: 3,
                                label: '未修复'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '维修设备',
                        placeholder: '请输入',
                        prop: 'equipment'
                    },
                    {
                        type: 'Input',
                        label: '记录编号',
                        placeholder: '请输入',
                        prop: 'code'
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
    methods: {
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'sysOperationsList',
                data: {
                    pageNum: 1,
                    size: 100
                }
            }
            const data = await DownloadExcel(params, this)
            return data
        },
        // Excel进度
        // ExcelLoading(page, pageCount) {
        //     const Loading = this.$loading({
        //         lock: true,
        //         text: `正在导出Excel${page}`,
        //         spinner: 'el-icon-loading',
        //         background: 'rgba(0, 0, 0, 0.7)'
        //     })
        //     Loading.text = `正在导出Excel  ${page}/${pageCount}`
        //     console.log(Loading.text)
        // },
        // // Excel导出结束
        // finishDownload() {
        //     const Loading = this.$loading()
        //     Loading.close()
        // },
        // // 获取用户列表
        // getUserList(val) {
        //     let reeData = {
        //         pageNum: 1,
        //         size: 20
        //     }

        //     this.loading = true
        //     // 获取部门列表
        //     sysOrganizationFindAllDepartment(reeData).then((res) => {
        //         // console.log(res)
        //         this.sysOptions = res.data
        //         // console.log(this.sysOptions);
        //         this.loading = false
        //     })
        // },
        // remoteMethod(val) {
        //     this.getUserList(val)
        // },
        // sefocus() {
        //     this.getUserList()
        // },
        // change(value) {
        //     console.log(value) //sysUserList
        // },
        // //根据部门获取人员
        // sChange(value) {
        //     this.addForm.form_item[4].options = []
        //     let sData = {
        //         pageNum: 1,
        //         size: 100,
        //         organizationId: value
        //     }
        //     sysUserList(sData).then((res) => {
        //         console.log(res)

        //         res.tableList.forEach((element) => {
        //             let obj = {
        //                 value: element.id,
        //                 label: element.nickName
        //             }
        //             //给获取下拉框
        //             this.addForm.form_item[4].options.push(obj)
        //         })
        //         console.log(this.addForm.form_item[4].options)
        //         this.loading = false
        //     })
        // },
        add() {
            this.drawerTitle = '新增计划'
            this.add_vrisible = true
            // this.getUserList()
        },
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message:'请编辑一条数据',
                    type:'error'
                })
            } else {
                this.drawerTitle = '修改计划'
                this.add_vrisible = true
                // this.getUserList()
                this.addForm.ruleForm.equipment = data[0].equipment
                this.addForm.ruleForm.type= data[0].type
                this.addForm.ruleForm.people= data[0].people
                this.addForm.ruleForm.materials= data[0].materials
                this.addForm.ruleForm.costs= data[0].costs
                this.addForm.ruleForm.department= data[0].department
                this.addForm.ruleForm.results= data[0].results
                this.addForm.ruleForm.times= data[0].times
                this.addForm.ruleForm.remakes= data[0].remakes
                this.addForm.ruleForm.maintenanceDate= data[0].maintenanceDate
                this.thatId = data[0].id
            }
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        // 提交
        addSubmit() {
            if ((this.drawerTitle = '修改计划')) {
                let resData = {
                    ...this.addForm.ruleForm,
                    id: this.thatId
                }
                sysOperationsUpdate(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            } else if ((this.drawerTitle = '新增计划')) {
                let resData = {
                    ...this.addForm.ruleForm
                }
                sysOperationsInsert(resData).then((res) => {
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
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
        handleClick(tab, event) {
            let results = null
            if (this.activeName != 0) {
                results = this.activeName
            } else {
                results = null
            }
            const requestData = {
                pageNum: 1,
                size: 10,
                results: results
            }
            this.$refs.table.requestData(requestData)
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
        // open(data){
        //   console.log(data);
        //   data.forEach(ele=>{
        //     // console.log(obj);
        //     this.ids.push(ele.id)
        //     console.log(this.ids);
        //   })
        //   facilitiesPlanOpen({ids:this.ids}).then(res=>{
        //     this.$message({
        //           message: res.message,
        //           type: 'success'
        //         })
        //   })
        //   this.$refs.table.requestData()
        // },
        // stop(data){
        //   console.log(data);
        //   data.forEach(ele=>{
        //     // console.log(obj);
        //     this.ids.push(ele.id)
        //     console.log(this.ids);
        //   })
        //   facilitiesPlanStop({ids:this.ids}).then(res=>{
        //     this.$message({
        //           message: res.message,
        //           type: 'success'
        //         })
        //   })
        //   this.$refs.table.requestData()
        // }
    }
    //监听设施设备分类从而获取设施设备名称
    // watch: {
    //     'addForm.ruleForm.type': {
    //         handler(newVal) {
    //             this.addForm.form_item[1].options = []
    //             console.log(newVal)
    //             facilitiesManageList({ type: newVal }).then((res) => {
    //                 console.log(res)
    //                 res.tableList.forEach((ele) => {
    //                     let obj = {
    //                         value: ele.id,
    //                         label: ele.name
    //                     }
    //                     this.addForm.form_item[1].options.push(obj)
    //                 })
    //             })
    //         }
    //     }
    // }
}
</script>