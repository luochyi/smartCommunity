<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>设施设备检查记录</span>
            </div>
            <div class="content">
                <!-- <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增计划</el-button
                    >
                </div> -->

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
                                    label="待完成"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已完成"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未完成"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                                <!-- <button @click="isEnable(table_row)">启用/停用</button>
                                <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    inspectionPlanInsert,
    inspectionRouteList,
    sysOrganizationFindAllDepartment,
    sysUserList,
    inspectionPlanIsEnable
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            // inspector: [],
            loading: false,
            addForm: {
                ruleForm: {
                    name: null,
                    code: '',
                    inspectionRouteId: null,
                    organizationId: null,
                    isSort:'2'
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '路线',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'inspectionRouteId',
                        slotName: 'inspectionRouteId'
                    },
                    {
                        type: 'Input',
                        label: '计划名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '部门',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'organizationId',
                        slotName: 'sysOrganization'
                    },
                    {
                        type: 'Select',
                        label: '巡检人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'inspector',
                        options: []
                    },
                    {
                        type: 'DateTime',
                        label: '开始时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'planBeginDate'
                    },
                    // {
                    //     type: 'Select',
                    //     label: '按顺序巡检',
                    //     width: '100%',
                    //     options: [
                    //         {
                    //             value: '1',
                    //             label: '是'
                    //         },
                    //         {
                    //             value: '2',
                    //             label: '否'
                    //         }
                    //     ],
                    //     prop: 'isSort'
                    // },
                    {
                        type: 'Select',
                        label: '检查频率',
                        width: '50%',
                        options: [
                            {
                                value: '1',
                                label: '每天'
                            },
                            {
                                value: '2',
                                label: '每周'
                            },
                            {
                                value: '3',
                                label: '每月'
                            }
                        ],
                        prop: 'checkRateType'
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
                        label: '检查执行记录编号',
                        prop: 'code',
                        width: 'auto'
                    },
                    {
                        label: '分类名称',
                        prop: 'categoryName',
                        width: 'auto'
                    },
                    {
                        label: '设施/设备名称',
                        prop: 'facilitiesName',
                        width: 'auto'
                    },
                    {
                        label: '检查人姓名',
                        prop: 'examinerName',
                        width: 'auto'
                    },
                    {
                        label: '检查人联系方式',
                        prop: 'examinerTel',
                        width: 'auto'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待完成'
                                    break
                                case 2:
                                    return '已完成'
                                    break
                                case 3:
                                    return '未完成'
                                    break
                            }
                        }
                    },
                    {
                        label: '设施/设备情况',
                        prop: 'situation',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '正常'
                                    break
                                case 2:
                                    return '异常'
                                    break
                            }
                        }
                    },{
                        label: '设施/设备检查报告',
                        prop: 'detail',
                        width: 'auto'
                    },
                    {
                        label: '设施/设备实际检查时间',
                        prop: 'checkDate',
                        width: 'auto'
                    },
                ],
                table_data: [],
                url: 'facilitiesPlanExecuteList',
                search_item: [
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options:[
                            {
                                value:1,
                                label:'设施'
                            },
                            {
                                value:2,
                                label:'设备'
                            },
                        ]
                    },
                    {
                        type: 'Input',
                        label: '检查执行记录编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '设施/设备名称',
                        placeholder: '请输入',
                        prop: 'facilitiesName'
                    },
                    {
                        type: 'Input',
                        label: '检查人联系方式',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '任务状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options:[
                            {
                                value:1,
                                label:'待完成'
                            },
                            {
                                value:2,
                                label:'已完成'
                            },
                            {
                                value:3,
                                label:'未完成'
                            },
                        ]
                    },

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
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            
            this.loading = true
            inspectionRouteList(reeData).then((res) => {
                console.log(res)
                this.options = res.tableList
                this.loading = false
            })
            sysOrganizationFindAllDepartment(reeData).then((res) => {
                // console.log(res)
                this.sysOptions = res.data
                // console.log(this.sysOptions);
                this.loading = false
            })
        },
        remoteMethod(val) {
            this.getUserList(val)
        },
        sefocus() {
            this.getUserList()
        },
        change(value) {
            console.log(value)//sysUserList

            
        },
        //根据部门获取人员
        sChange(value){
            this.addForm.form_item[3].options = []
             let sData = {
                pageNum: 1,
                size: 100,
                organizationId:value
             }
             sysUserList(sData).then((res) => {
                console.log(res)
                
                 res.tableList.forEach(element => {
                     let obj = {
                         value: element.id,
                         label: element.nickName
                     }
                    this.addForm.form_item[3].options.push(obj)
                });
                console.log(this.addForm.form_item[3].options)
                this.loading = false
            })
        },
        add() {
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            inspectionPlanInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.addClose()
                }
            })
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
        handleClick(tab, event) {
            let status = null
            if (this.activeName != 0) {
                status = this.activeName
            } else {
                status = null
            }
            const requestData = {
                pageNum: 1,
                size: 10,
                status: status
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
        },
        isEnable(data) {
            console.log(data[0].id);
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }else{
                inspectionPlanIsEnable({id:data[0].id}).then((res) => {
                     console.log(res)
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
        }
    },
}
</script>