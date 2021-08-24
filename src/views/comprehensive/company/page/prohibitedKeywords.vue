<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>屏蔽管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增内容</el-button
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
                        </template> -->
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
                            <template slot="title">屏蔽字</template>
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
    prohibitedKeywordsInsert,
    prohibitedKeywordsUpdate,
} from '@/api/company'
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
                    keywords: null,
                    replaces: null,
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '违禁关键字',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'keywords'
                    },
                    {
                        type: 'Input',
                        label: '替换后显示的字符',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'replaces'
                    },
                ]
            },
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
            config: {url:'prohibitedKeywordsList',
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '违禁关键字',
                        prop: 'keywords',
                        width: 'auto'
                    },
                    {
                        label: '替换后显示的字符',
                        prop: 'replaces',
                        width: 'auto'
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
        add() {
            this.drawerTitle = '新增屏蔽字'
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
                this.drawerTitle = '修改屏蔽字'
                this.add_vrisible = true
                // this.getUserList()
                this.addForm.ruleForm.keywords = data[0].keywords
                this.addForm.ruleForm.replaces= data[0].replaces
                this.thatId = data[0].id
            }
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.thatId=null
        },
        // 提交
        addSubmit() {
            if (this.drawerTitle == '修改屏蔽字') {
                let resData = {
                    ...this.addForm.ruleForm,
                    id: this.thatId
                }
                prohibitedKeywordsUpdate(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            } else if (this.drawerTitle == '新增屏蔽字') {
                let resData = {
                    ...this.addForm.ruleForm
                }
                prohibitedKeywordsInsert(resData).then((res) => {
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