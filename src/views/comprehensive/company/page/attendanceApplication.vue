<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>请假/加班申请记录</span>
            </div>
            <div class="content">
                <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="考勤申请记录.xls"
                            >
                                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel></div>
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
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
                                <button @click="reviewer(table_row)">
                                    审核
                                </button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                 <Drawer
                    drawerTitle="审核请假/加班记录"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">审核记录</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                  
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
import { sysOrganizationFindAllDepartment, sysUserList } from '@/api/daily'
import {
    attendanceRecordReviewer
} from '@/api/company'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    status:null,
                    id:null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options:[
                            {
                                value:2,
                                label:'审核通过'
                            },
                            {
                                value:3,
                                label:'审核驳回'
                            },
                        ]
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            json_fields: {
                申请人名称: 'createName',
                申请人手机号: 'createTel',
                '请假/加班原因':'reason',
                类型:{
                    field: 'type',
                    callback: (value) => {
                        switch (value) {
                             case 1:
                                    return '请假'
                                    break
                                case 2:
                                    return '加班'
                                    break
                                default:
                                    break
                        }
                    }
                },
                状态:{
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                    return '待审核'
                                    break
                                case 2:
                                    return '审核通过'
                                    break
                                case 3:
                                    return '审核驳回'
                                    break
                                default:
                                    break
                        }
                    }
                },
                '请假/加班开始时间':'startDate',
                '请假/加班结束时间':'endDate',
                审核人名称:'reviewerName',
                 审核时间:'reviewerDate'
                
            },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '申请人名称',
                        prop: 'createName',
                        width: 'auto'
                    },
                    {
                        label: '申请人手机号',
                        prop: 'createTel',
                        width: 'auto'
                    },
                    {
                        label: '请假/加班原因',
                        prop: 'reason',
                        width: 'auto'
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.type) {
                                case 1:
                                    return '请假'
                                    break
                                case 2:
                                    return '加班'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待审核'
                                    break
                                case 2:
                                    return '审核通过'
                                    break
                                case 3:
                                    return '审核驳回'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '请假/加班开始时间',
                        prop: 'startDate',
                        width: 'auto'
                    },
                    {
                        label: '请假/加班结束时间',
                        prop: 'endDate',
                        width: 'auto'
                    },
                    {
                        label: '审核人名称',
                        prop: 'reviewerName',
                        width: 'auto'
                    },
                    {
                        label: '审核时间',
                        prop: 'reviewerDate',
                        width: 'auto'
                    },
                ],
                table_data: [],
                url: 'attendanceRecordLeaveList',
                search_item: [
                    // {
                    //     type: 'Date',
                    //     label: '考勤日期',
                    //     placeholder: '请选择日期',
                    //     prop: 'createDate'
                    // },
                    {
                        type: 'Int',
                        label: '申请人手机号',
                        placeholder: '请输入',
                        prop: 'createTel'
                    },
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '请假'
                            },
                            {
                                value: 2,
                                label: '加班'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            {
                                value: 1,
                                label: '待审核'
                            },
                            {
                                value: 2,
                                label: '审核通过'
                            },{
                                value: 3,
                                label: '审核驳回'
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
    methods: {
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'attendanceRecordLeaveList',
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
        reviewer(data){
            if(data.length!=1){
                this.$message({
                    message:'请选择一条记录审核',
                    type:'error'
                })
            }else if(data[0].status==1){
                this.add_vrisible = true
                this.addForm.ruleForm.id = data[0].id
            }else{
               this.$message({
                    message:'该记录不可审核',
                    type:'error'
                }) 
            }
        },
         addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            attendanceRecordReviewer(resData).then((res) => {
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
    }
}
</script>