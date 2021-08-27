<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>抄表收费</span>
            </div>
            <div class="content">
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
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="check(table_row)">查看明细</button> -->
                                <button @click="remakes(table_row)">
                                    添加备注
                                </button>
                            </div>
                        </template>
                    </VueTable>
                    <el-dialog title="添加备注" :visible.sync="isShow">
                        <el-form :model="form">
                            <el-form-item
                                label="备注"
                                :label-width="formLabelWidth"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="form.remakes"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="isShow = false">取 消</el-button>
                            <el-button type="primary" @click="remakesSubmit()"
                                >确 定</el-button
                            >
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {meterReadingRecordUpdateRemakes} from '@/api/charge.js';
export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                remakes:null,
            },
            formLabelWidth: '120px',
            isShow: false,
            thatId: null,
            drawerTitle: '',
            add_vrisible: false,
            addDate: null,
            options: [],
            ids: [],
            sysOptions: [],
            // inspector: [],
            loading: false,
            table_row: [],
            activeName: '0',
            // json_fields: {
            //     设施设备检查计划编号: 'code',
            //     '设施/设备名称': 'facilitiesName',
            //     检查人姓名: 'examinerName',
            //     检查人联系方式: 'examinerTel',
            //     任务状态: {
            //         field: 'status',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '开启'
            //                     break
            //                 case 2:
            //                     return '停用'
            //                     break
            //             }
            //         }
            //     },
            //     计划开始时间: 'planBeginDate',
            //     '单次持续时间（单位分钟）': 'spaceTime',
            //     检查频率: {
            //         field: 'checkRateType',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                     return '每天'
            //                     break
            //                 case 2:
            //                     return '每周'
            //                     break
            //                 case 3:
            //                     return '每月'
            //                     break
            //                 default:
            //                     break
            //             }
            //         }
            //     },
            //     创建人: 'createName'
            // },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '抄表月份',
                        prop: 'months',
                        width: 'auto'
                    },
                    {
                        label: '抄表用量',
                        prop: 'consumption',
                        width: 'auto'
                    },
                    {
                        label: '抄表类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.type) {
                                case 1:
                                    return '水量'
                                    break
                                case 2:
                                    return '电量'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '单位',
                        prop: 'unit',
                        width: 'auto'
                    },
                    {
                        label: '抄表区间开始',
                        prop: 'startDate',
                        width: 'auto'
                    },
                    {
                        label: '抄表区间结束',
                        prop: 'endDate',
                        width: 'auto'
                    },
                    {
                        label: '数据状态',
                        prop: 'dataStatus',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.dataStatus) {
                                case 1:
                                    return '正常'
                                    break
                                case 2:
                                    return '异常'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '账单状态',
                        prop: 'billStatus',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.billStatus) {
                                case 1:
                                    return '未创建'
                                    break
                                case 2:
                                    return '已创建'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    },
                    {
                        label: '备注',
                        prop: 'remakes',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'meterReadingRecordList',
                search_item: [
                    // {
                    //     type: 'Input',
                    //     label: '房屋信息',
                    //     placeholder: '格式（楼栋编号-单元号-房间号）',
                    //     prop: 'roomName'
                    // },
                    // {
                    //     type: 'Input',
                    //     label: '记录编号',
                    //     placeholder: '请输入',
                    //     prop: 'code'
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
    methods: {
        check(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条数据查看'
                })
            } else {
                console.log(data[0])
                let mes = data[0]
                this.$router.push({
                    name: 'expenseBillDetailList',
                    params: { data: mes }
                })
            }
        },
        remakes(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条数据添加备注'
                })
            } else {
                this.isShow = true
            }
        },
        remakesSubmit(){
            let resData = {
                id:this.table_row[0].id,
                remakes:this.form.remakes
            }
            meterReadingRecordUpdateRemakes(resData).then(res=>{
                if(res.status){
                    this.$message({
                        message:res.message,
                        type:'success'
                    })
                    this.$refs.table.loadData()
                    this.isShow=false
                    this.form.remakes =null
                }
            })
        },
        // Excel导出
        // async fetchData() {
        //     let Excel = []
        //     let params = {
        //         url: 'sysOperationsList',
        //         data: {
        //             pageNum: 1,
        //             size: 100
        //         }
        //     }
        //     const data = await DownloadExcel(params, this)
        //     return data
        // },
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