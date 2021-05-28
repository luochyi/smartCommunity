<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>考勤记录</span>
            </div>
            <div class="content">
                 <download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="考勤记录.xls"
                            >
                                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel>
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                     <template v-slot:createDate="slotData">
                        <div>{{ slotData.data.createDate|capitalize}}</div>
                    </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="cardReplacement(table_row)">
                                    补卡
                                </button>
                               
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
                                <!-- <button @click="add(table_row)">编辑</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    attendanceRecordCardReplacement
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
                    showName: null,
                    id: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '显示名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'showName'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
             json_fields: {
                上班打卡时间: 'startClockDate',
                下班打卡时间: 'endClockDate',
                补卡时间:'cardReplacementDate',
                补卡操作人:'operatorName',
                打卡人姓名:'clockName',
                打卡人手机号:'clockTel',
                打卡日期:'createDate'
                
            },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '打卡人姓名',
                        prop: 'clockName',
                        width: 'auto'
                    },
                    {
                        label: '打卡人手机号',
                        prop: 'clockTel',
                        width: 'auto'
                    },
                    {
                        label: '考勤日期',
                        prop: 'createDate',
                        width: '180',
                        type: 'slot',
                        slotName: 'createDate'
                    },
                    {
                        label: '上班打卡时间',
                        prop: 'startClockDate',
                        width: 'auto',
                        type:"function",
                        callback:(row,prop)=>{
                            if(row.startClockDate==null){
                                return '未打卡'
                            }
                        }
                    },
                    {
                        label: '下班打卡时间',
                        prop: 'endClockDate',
                        width: 'auto',
                        type:"function",
                        callback:(row,prop)=>{
                            if(row.endClockDate==null){
                                return '未打卡'
                            }
                        }
                    },
                    {
                        label: '补卡时间',
                        prop: 'cardReplacementDate',
                        width: 'auto'
                    },
                    {
                        label: '补卡操作人',
                        prop: 'operatorName',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'attendanceRecordList',
                search_item: [
                    {
                        type: 'Date',
                        label: '考勤日期',
                        placeholder: '请选择日期',
                        prop: 'createDate'
                    },
                    {
                        type: 'Int',
                        label: '打卡人手机号',
                        placeholder: '请输入',
                        prop: 'clockTel'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            {
                                value: 1,
                                label: '未上班'
                            },
                            {
                                value: 2,
                                label: '未下班'
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
                url: 'attendanceRecordList',
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
        //补卡
        cardReplacement(data) {
            if (data.length != 1) {
                this.$message({
                    message: '请选择一条记录进行补卡',
                    type: 'error'
                })
            }else if(data[0].cardReplacementDate !==null){
                this.$message({
                    message: '该记录不可补卡',
                    type: 'error'
                })
            }
             else if(data[0].endClockDate !==null){
                this.$message({
                    message: '该记录不可补卡',
                    type: 'error'
                })
            }else {
                attendanceRecordCardReplacement({ id: data[0].id }).then(
                    (res) => {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                    }
                )
            }
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
    },
     filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    },
}
</script>