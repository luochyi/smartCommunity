<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>卫生管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增任务</el-button
                    >
                </div>
                <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="卫生任务.xls"
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
                                <!-- <button>编辑</button> -->
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增任务"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">任务信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
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
                                    <template v-slot:hygieneAreaId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm
                                                    .hygieneAreaId
                                            "
                                            :remote-method="remoteMethod"
                                            @change="change"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </template>
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
    sysOrganizationFindAllDepartment,
    sysUserList,
} from '@/api/daily'
import {
    // greenAreaFindById,
    hygieneAreaList,
    hygieneTaskInsert
}from '@/api/daily'
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
                    hygieneAreaId: null,
                    content: null,
                    director: null,
                    endDate:null
                },
                rules: {
                  // 表单必填
                  hygieneAreaId: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  content: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  organizationId: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  director: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  endDate: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ]
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '卫生区域',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'hygieneAreaId',
                        slotName: 'hygieneAreaId'
                    },
                    {
                        type: 'Input',
                        label: '工作内容',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'content'
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
                        label: '负责人员',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'director',
                        options: []
                    },
                    {
                        type: 'DateTime',
                        label: '截止时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'endDate'
                    },
                ]
            },
            table_row: [],
            activeName: '0',
            //表头
                json_fields: {
                卫生区域名称:'hygieneAreaName',
                工作内容:'content',
                负责人名称:'directorName',
                 状态: {
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                    return '待处理'
                                    break;
                                case 2:
                                    return '已处理'
                                    break;
                                case 3:
                                    return '未完成'
                                    break;
                                default:
                                    break;
                        }
                    }
                },
                截止时间:'endDate',
                发布时间:'createDate',
            },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '卫生区域名称',
                        prop: 'hygieneAreaName',
                        width: 'auto'
                    },
                    {
                        label: '工作内容',
                        prop: 'content',
                        width: 'auto'
                    },
                    {
                        label: '负责人名称',
                        prop: 'directorName',
                        width: 'auto'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',type:'function',
                        callback:(row,prop)=>{
                            switch (row.status) {
                                case 1:
                                    return '待处理'
                                    break;
                                case 2:
                                    return '已完成'
                                    break;
                                case 3:
                                    return '未完成'
                                    break;
                                default:
                                    break;
                            }
                        }
                    },
                    {
                        label: '截止时间',
                        prop: 'endDate',
                        width: 'auto'
                    },
                    {
                        label: '发布时间',
                        prop: 'createDate',
                        width: 'auto'
                    },
                ],
                table_data: [],
                url: 'hygieneTaskList',
                search_item: [
                    {
                        type: 'Input',
                        label: '卫生区域名称',
                        placeholder: '请输入',
                        prop: 'hygieneAreaName'
                    },
                    {
                        type: 'Input',
                        label: '工作内容',
                        placeholder: '请输入',
                        prop: 'content'
                    },
                    {
                        type: 'Input',
                        label: '负责人名称',
                        placeholder: '请输入',
                        prop: 'directorName'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options:[
                            {
                                label:'待处理',value:'1'
                            },
                            {
                                label:'已完成',value:'2'
                            }
                        ]
                    },
                    {
                        type: 'picker',
                        label: '截止时间',
                        prop: 'date',
                        startDate: 'endDateStart',
                        endDate: 'endDateEnd',
                        width: '250px',
                    },
                    {
                        type: 'picker',
                        label: '发布时间',
                        prop: 'actualDate',
                        startDate: 'createDateStart',
                        endDate: 'createDateEnd',
                        width: '250px'
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
                url: 'hygieneTaskList',
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
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
            }
            this.loading = true
            hygieneAreaList(reeData).then((res) => {
                console.log(res)
                this.options = res.tableList
                console.log(this.options);
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
                         label: element.actualName
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
        addRuleSuccess() {
          let resData = {
            ...this.addForm.ruleForm
          }
          hygieneTaskInsert(resData).then((res) => {
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
        addSubmit() {
          this.$refs.addForm.submitForm()
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
        // handleClick(tab, event) {
        //     let status = null
        //     if (this.activeName != 0) {
        //         status = this.activeName
        //     } else {
        //         status = null
        //     }
        //     const requestData = {
        //         pageNum: 1,
        //         size: 10,
        //         status: status
        //     }
        //     this.$refs.table.requestData(requestData)
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
        },
        // isEnable(data) {
        //     console.log(data[0].id);
        //     if (data.length > 1) {
        //         this.$message.error('只能操作一条数据')
        //         return
        //     }
        //     if (!data.length) {
        //         this.$message.error('请选择')
        //         return
        //     }else{
        //         inspectionPlanIsEnable({id:data[0].id}).then((res) => {
        //              console.log(res)
        //         if (res.status) {
        //             this.$message({
        //                 message: res.message,
        //                 type: 'success'
        //             })
        //             this.$refs.table.loadData()
        //             this.addClose()
        //         }
        //     })
        //     }
        // }
    },
}
</script>
