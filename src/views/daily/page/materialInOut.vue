<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>物料出入库记录</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >出入库</el-button
                    >
                </div>
                <div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column
                            fixed
                            prop="date"
                            label="日期"
                            width="150"
                        >
                        </el-table-column>
                        <el-table-column prop="name" label="物料名称" width="120">
                        </el-table-column>
                        <el-table-column
                            prop="people"
                            label="操作人"
                            width="100"
                        >
                        </el-table-column>
                        <el-table-column prop="type" label="类型" width="120">
                        </el-table-column>
                        <el-table-column prop="num" label="数量" width="120">
                        </el-table-column>
                        <el-table-column prop="sum" label="库存数量" width="100">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="" style="display: none">
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
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="出入库"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">出入库信息</template>
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
                                    <template v-slot:greenAreaId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.greenAreaId
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
export default {
    data() {
        return {
            tableData: [
                {
                    date: '2021-05-02',
                    name: '餐巾纸',
                    people:'王强',
                    type:'入库',
                    num:'2',
                    sum:'10'
                },
                {
                    date: '2021-05-03',
                    name: '餐巾纸',
                    people:'王强',
                    type:'入库',
                    num:'2',
                    sum:'12'
                },
                {
                    date: '2021-05-04',
                    name: '餐巾纸',
                    people:'王强',
                    type:'入库',
                    num:'2',
                    sum:'14'
                },
                {
                    date: '2021-05-05',
                    name: '餐巾纸',
                    people:'王强',
                    type:'入库',
                    num:'2',
                    sum:'16'
                },
                {
                    date: '2021-05-06',
                    name: '餐巾纸',
                    people:'王强',
                    type:'出库',
                    num:'5',
                    sum:'11'
                },
                {
                    date: '2021-05-07',
                    name: '餐巾纸',
                    people:'王强',
                    type:'入库',
                    num:'2',
                    sum:'13'
                },{
                    date: '2021-05-08',
                    name: '餐巾纸',
                    people:'王强',
                    type:'入库',
                    num:'6',
                    sum:'19'
                },
                {
                    date: '2021-05-09',
                    name: '餐巾纸',
                    people:'王强',
                    type:'出库',
                    num:'2',
                    sum:'17'
                },
            ],
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    greenAreaId: null,
                    content: null,
                    director: null,
                    endDate: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '物料名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'greenAreaId',
                        slotName: '1'
                    },
                    {
                        type: 'Select',
                        label: '类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'type',
                        options:[
                            {
                                label:'入库',
                                value:'1'
                            },
                            {
                                label:'出库',
                                value:'2'
                            }
                        ]
                    },
                    {
                        type: 'Int',
                        label: '数量',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'num'
                    }
                ]
            },
            table_row: [],
            activeName: '0'
            // config: {
            //     thead: [
            //         {
            //             label: '序号',
            //             type: 'index',
            //             width: '80'
            //         },
            //         {
            //             label: '物料名称',
            //             prop: 'greenAreaName',
            //             width: 'auto'
            //         },
            //         {
            //             label: '工作内容',
            //             prop: 'content',
            //             width: 'auto'
            //         },
            //         {
            //             label: '负责人名称',
            //             prop: 'directorName',
            //             width: 'auto'
            //         },
            //         {
            //             label: '状态',
            //             prop: 'status',
            //             width: 'auto',type:'function',
            //             callback:(row,prop)=>{
            //                 switch (row.status) {
            //                     case 1:
            //                         return '待处理'
            //                         break;
            //                     case 2:
            //                         return '已处理'
            //                         break;
            //                     default:
            //                         break;
            //                 }
            //             }
            //         },
            //         {
            //             label: '截止时间',
            //             prop: 'endDate',
            //             width: 'auto'
            //         },
            //         {
            //             label: '发布时间',
            //             prop: 'createDate',
            //             width: 'auto'
            //         },
            //     ],
            //     table_data: [],
            //     url: 'greenTaskList',
            //     search_item: [
            //         {
            //             type: 'Input',
            //             label: '物料名称',
            //             placeholder: '请输入',
            //             prop: 'greenAreaName'
            //         },
            //     ],
            //     data: {
            //         pageNum: 1,
            //         size: 10
            //     }
            // }
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
            greenAreaList(reeData).then((res) => {
                console.log(res)
                this.options = res.tableList
                console.log(this.options)
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
            console.log(value) //sysUserList
        },
        //根据部门获取人员
        sChange(value) {
            this.addForm.form_item[3].options = []
            let sData = {
                pageNum: 1,
                size: 100,
                organizationId: value
            }
            sysUserList(sData).then((res) => {
                console.log(res)

                res.tableList.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.actualName
                    }
                    this.addForm.form_item[3].options.push(obj)
                })
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
            greenTaskInsert(resData).then((res) => {
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
        }
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
    }
}
</script>