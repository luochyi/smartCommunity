
<template>
    <div class="main-content">
        <div class="main-titel">
            <span>访客管理</span>
        </div>
        <!-- <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日有
        <span style="color:rgba(251, 71, 2, 1)">{{countNew}}</span>
        户家庭申报访客通行
      </p>
    </div> -->
        <div class="content">
            <div style="width: 50px">
                    <download-excel
                        class="export-excel-wrapper"
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        name="访客记录.xls"
                    >
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                        <el-button size="mini" icon="el-icon-folder-add" plain
                            >导出Excel</el-button
                        >
                    </download-excel>
                </div>
            <!-- 查询重制 -->
            <div class="">
                <!-- 头部输入框 -->
                <VueTable ref="table" :config="config" @tableCheck="tableCheck">
                    <template v-slot:visitDateStart="slotData">
                        <div>{{ slotData.data.visitDateStart|capitalize}}</div>
                    </template>
                    <template slot="footer">
                        <div class="table-footer">
                            <!-- <button @click="edit(table_row)">编辑</button> -->
                            <!-- <button @click="record(table_row)">出入记录</button>
              <button @click="toVoid(table_row)">作废</button> -->
                        </div>
                    </template>
                </VueTable>
                <Drawer
                    drawerTitle="访客编辑"
                    @drawerClose="drawerClose"
                    :drawerVrisible="edit_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm
                                    ref="childFrom"
                                    :formObj="reviseForm"
                                ></VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="onSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="drawerClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>

                <Drawer
                    drawerTitle="出入记录"
                    @drawerClose="drawerClose"
                    :drawerVrisible="recordVrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">出入记录</template>
                            <template>
                                <div style="margin: 0 auto">
                                    <tableData
                                        :config="recordConfig"
                                    ></tableData>
                                </div>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button
                            class="btn-orange"
                            @click="recordVrisible = false"
                        >
                            <span>关闭</span>
                        </button>
                    </div>
                </Drawer>
                <!-- 出入记录 -->
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    visitorsCancel,
    visitorsFindById,
    visitorsUpdate,
    visitorsListDetail,
    visitorsCountVisitorsNew
} from '@/api/butler'
export default {
    data() {
        return {
            edit_vrisible: false,
            recordVrisible: false,
            countNew: 0,
            // 选中表格数据
            table_row: [],
            json_fields: {
                拜访房屋名称: 'roomName',
                访客姓名: 'name',
                访客电话: 'tel',
                访客性别: {
                    field: 'sex',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                return '男'
                                break
                            case 2:
                                return '女'
                                break
                        }
                    }
                },
                访客车牌号: 'carNumber',
                预约到访日期: {
                    field: 'visitDateStart',
                    callback: (value) => {
                        if(value){
                          return value.substring(0, 10)
                        }
                    }
                },
                申请人: 'createName',
                申请时间: 'createDate'
            },
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '拜访房屋名称', prop: 'roomName', width: 'auto' },
                    // { label: '类型', prop: 'type', width: ' auto' },
                    { label: '访客姓名', prop: 'name', width: 'auto' },
                    { label: '访客电话', prop: 'tel', width: 'auto' },
                    {
                        label: '访客性别',
                        prop: 'sex',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.sex) {
                                case 1:
                                    return '男'
                                    break
                                case 2:
                                    return '女'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    // { label: '是否开车', prop: 'isDrive', width: 'auto ' },
                    { label: '访客车牌号', prop: 'carNumber', width: '160' },
                    {
                        label: '预约到访日期',
                        prop: 'visitDateStart',
                        width: '180',
                        type: 'slot',
                        slotName: 'visitDateStart'
                    },
                    {
                        label: '申请人',
                        prop: 'createName',
                        width: '180'
                    },
                    {
                        label: '申请时间',
                        prop: 'createDate',
                        width: '180'
                    }
                ],
                table_data: [],
                search_item: [
                    // {
                    //     type: 'Input',
                    //     label: '房屋信息',
                    //     placeholder: '楼栋-单元-房号',
                    //     prop: 'roomName'
                    // },

                    {
                        type: 'Input',
                        label: '访客姓名',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    // {
                    //     type: 'select',
                    //     label: '访客性别',
                    //     value: null,
                    //     placeholder: '请输入',
                    //     prop: 'sex',
                    //     options: [
                    //         { value: '1', label: '男' },
                    //         { value: '2', label: '女' }
                    //     ]
                    // },
                    {
                        type: 'Int',
                        label: '访客手机号',
                        placeholder: '请输入',
                        prop: 'tel'
                    }
                    // {
                    //     type: 'startDate',
                    //     label: '预计到访时间开始',
                    //     placeholder: '请输入',
                    //     prop: 'expectedVisitDateStart'
                    // },
                    // {
                    //     type: 'endDate',
                    //     label: '预计到访时间结束',
                    //     placeholder: '请输入',
                    //     prop: 'expectedVisitDateEnd'
                    // }
                    // , {
                    //   type: 'startDate',
                    //   label: '实际到访时间',
                    //   placeholder: '请输入',
                    //   prop: 'visitDateStart	'
                    // },
                    // {
                    //   type: 'endDate',
                    //   label: '实际离开时间',
                    //   placeholder: '请输入',
                    //   prop: 'visitDateEnd'
                    // },
                    // {
                    //     type: 'select',
                    //     label: '通行状态',
                    //     value: null,
                    //     placeholder: '请选择',
                    //     prop: 'visitorStatus',
                    //     options: [
                    //         { value: '1', label: '未到' },
                    //         { value: '2', label: '已到' },
                    //         { value: '3', label: '已过期' },
                    //         { value: '4', label: '作废' }
                    //     ]
                    // },
                    // {
                    //     type: 'select',
                    //     label: '类型',
                    //     value: null,
                    //     placeholder: '请选择',
                    //     prop: 'type',
                    //     options: [
                    //         { value: '1', label: '业主填写' },
                    //         { value: '2', label: '访客填写' }
                    //     ]
                    // }
                ],
                url: 'visitorsNewList',
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            // 修改抽屉数据
            reviseForm: {
                ruleForm: {
                    roomName: null,
                    name: null,
                    status: null,
                    tel: null,
                    weight: null,
                    type: null,
                    departureTime: null,
                    visitDate: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '来访房屋',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'roomName',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '访客姓名',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '访客性别',
                        placeholder: '请输入',
                        options: [
                            { value: 1, label: '正常' },
                            { value: 2, label: '有误' }
                        ],
                        width: '50%',
                        prop: 'sex'
                    },
                    {
                        type: 'Select',
                        label: '是否开车',
                        placeholder: '请输入',
                        options: [
                            { value: 1, label: '业委会' },
                            { value: 2, label: '绿化' }
                        ],
                        width: '50%',
                        prop: 'isDrive'
                    },
                    {
                        type: 'Input',
                        label: '车牌号',
                        placeholder: '请输入权重',
                        width: '50%',
                        prop: 'carNum'
                    },

                    {
                        type: 'DateTime',
                        label: '预计到访时间',
                        placeholder: '请输入预计到访时间',
                        width: '50%',
                        prop: 'expectedVisitDate'
                    },
                    {
                        type: 'DateTime',
                        label: '通行证时效',
                        placeholder: '请输入通行证时效',
                        disabled: true,
                        width: '50%',
                        prop: 'effectiveTime'
                    },
                    {
                        type: 'DateTime',
                        label: '实际到访时间',
                        placeholder: '请输入实际到访时间',
                        width: '50%',
                        prop: 'visitDate'
                    },
                    {
                        type: 'DateTime',
                        label: '实际离开时间',
                        placeholder: '请输入实际离开时间',
                        width: '50%',
                        prop: 'departureTime'
                    },
                    {
                        type: 'Select',
                        label: '访客状态',
                        placeholder: '请输入访客状态',
                        options: [
                            { value: 1, label: '未到' },
                            { value: 2, label: '已到' },
                            { value: 3, label: '已过期' },
                            { value: 4, label: '作废' }
                        ],
                        width: '50%',
                        prop: 'visitorStatus'
                    }
                ]
            },
            recordConfig: {
                thead: [
                    { label: '序号', type: 'index', width: '110' },
                    { label: '进入时间', prop: 'departureTime', width: 'auto' },
                    { label: '出去时间', prop: 'visitTime', width: ' auto' }
                ],
                checkbox: false,
                table_data: []
            }
        }
    },
    // created() {
    //     this.getTipsData()
    // },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    },
    methods: {
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'visitorsNewList',
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
        // getTipsData() {
        //     //  查询今日咨询条数
        //     visitorsCountVisitorsNew().then((result) => {
        //         console.log(result)
        //         this.countNew = result.countNew
        //     })
        // },
        tableCheck(arr) {
            this.table_row = arr
        },
        // 编辑提交
        onSubmit() {
            let resData = {
                id: this.table_row[0].id,
                name: this.reviseForm.ruleForm.name,
                sex: this.reviseForm.ruleForm.sex,
                isDrive: this.reviseForm.ruleForm.isDrive,
                carNum: this.reviseForm.ruleForm.carNum,
                expectedVisitDate: this.reviseForm.ruleForm.expectedVisitDate,
                visitDate: this.reviseForm.ruleForm.visitDate,
                departureTime: this.reviseForm.ruleForm.departureTime,
                effectiveTime: this.reviseForm.ruleForm.effectiveTime,
                visitorStatus: this.reviseForm.ruleForm.visitorStatus
            }
            visitorsUpdate(resData).then((result) => {
                if (result.status) {
                    this.$message({
                        message: result.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.getTipsData()

                    this.edit_vrisible = false
                }
            })
        },
        // 出入记录
        record(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message({
                        message: '不能批量查看',
                        type: 'error'
                    })
                    return
                }
                let resData = {
                    id: data[0].id
                }
                visitorsListDetail(resData).then((result) => {
                    if (result) {
                        this.recordVrisible = true
                        this.recordConfig.table_data =
                            result.voUserVisitorsDetailList
                    }
                    console.log(result)
                })
            } else {
                this.$message({
                    message: '请选择需要查看的数据',
                    type: 'error'
                })
            }
        },
        // 编辑
        edit(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message({
                        message: '不能批量编辑',
                        type: 'error'
                    })
                    return
                }
                let resData = {
                    id: data[0].id
                }
                visitorsFindById(resData).then((result) => {
                    if (result) {
                        this.reviseForm.ruleForm.name = result.name
                        this.reviseForm.ruleForm.sex = result.sex
                        this.reviseForm.ruleForm.isDrive = result.isDrive
                        this.reviseForm.ruleForm.carNum = result.carNum
                        this.reviseForm.ruleForm.expectedVisitDate =
                            result.expectedVisitDate
                        this.reviseForm.ruleForm.visitDate = result.visitDate
                        this.reviseForm.ruleForm.departureTime =
                            result.departureTime
                        this.reviseForm.ruleForm.effectiveTime =
                            result.effectiveTime
                        this.reviseForm.ruleForm.visitorStatus =
                            result.visitorStatus
                        this.edit_vrisible = true
                    }
                })
            } else {
                this.$message({
                    message: '请选择需要编辑的数据',
                    type: 'error'
                })
            }
        },
        drawerClose() {
            this.edit_vrisible = false
            this.recordVrisible = false
        },
        // 作废
        toVoid(data) {
            let arr = []
            for (let i = 0; i < this.table_row.length; i++) {
                arr.push(this.table_row[i].id)
            }
            this.$confirm(
                '确定要将访客信息作废吗？（若访客还未到访，作废将导致该访客无法进入）',
                '作废提示s',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'confirmButton',
                    cancelButtonClass: 'cancelButton'
                }
            )
                .then(() => {
                    let resData = {
                        ids: arr
                    }
                    visitorsCancel(resData).then((result) => {
                        if (!result.status) return
                        // 判断数据是否存在
                        this.$message({
                            message: result.message,
                            type: 'success'
                        })
                    })
                })
                .catch((action) => {})
        },
        // 监听子组件取消事件
        cancel(data) {
            this.dialog_visible = false
        },
        // 关闭抽屉
        getClose(data) {
            this.drawer_vrisible = false
            this.recordVrisible = false
        }
    }
}
</script>
<style scoped>
.tips {
    margin: 20px;
    height: 38px;
    line-height: 38px;
    background: #fafafa;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #e8e8e8;
}
</style>
