<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>薪资管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增薪资信息</el-button
                    >
                </div>

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
                            <template slot="title">薪资信息</template>
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
import { sysOrganizationFindAllDepartment, sysUserList } from '@/api/daily'
import { salaryInsert,salaryUpdate } from '@/api/company'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            drawerTitle: null,
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    id: null,
                    greenAreaId: null,
                    content: null,
                    director: null,
                    endDate: null,
                    wageCardNumber: null,
                    salary: null,
                    organizationId: null,
                    salaryPerson: null
                },
                form_item: [
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
                        label: '人员',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'salaryPerson',
                        options: []
                    },
                    {
                        type: 'Int',
                        label: '工资卡号',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'wageCardNumber'
                    },
                    {
                        type: 'Int',
                        label: '薪资',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'salary'
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
                        label: '部门名称',
                        prop: 'organizationName',
                        width: 'auto'
                    },
                    {
                        label: '姓名',
                        prop: 'name',
                        width: 'auto'
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        width: 'auto',
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
                        label: '手机号',
                        prop: 'tel',
                        width: 'auto'
                    },
                    {
                        label: '工资卡号',
                        prop: 'wageCardNumber',
                        width: 'auto'
                    },
                    {
                        label: '薪资',
                        prop: 'salary',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'salaryList',
                search_item: [
                    {
                        type: 'select',
                        label: '部门',
                        placeholder: '请输入',
                        prop: 'organizationId',
                        options: []
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'Int',
                        label: '工资卡号',
                        placeholder: '请输入',
                        prop: 'wageCardNumber'
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
        let reeData = {
            pageNum: 1,
            size: 20
        }
        sysOrganizationFindAllDepartment(reeData).then((res) => {
            console.log(res)
            res.data.forEach((element) => {
                let obj = {
                    value: element.id,
                    label: element.name
                }
                this.config.search_item[0].options.push(obj)
            })

            // console.log(this.sysOptions);
        })
    },
    methods: {
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            this.loading = true
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
            this.addForm.form_item[1].options = []
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
                    this.addForm.form_item[1].options.push(obj)
                })
                // console.log(this.addForm.form_item[3].options)
                this.loading = false
            })
        },
        add() {
            this.drawerTitle = '新增薪资信息'
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            if(this.drawerTitle =='新增薪资信息'){
                let resData = {
                ...this.addForm.ruleForm
            }
            salaryInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.addClose()
                }
            })
            }else if(this.drawerTitle=='修改薪资信息'){
                let resData = {
                id:this.addForm.ruleForm.id,
                wageCardNumber:this.addForm.ruleForm.wageCardNumber,
                salary:this.addForm.ruleForm.salary
            }
            salaryUpdate(resData).then(res=>{
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
                    message: '请选择一条薪资进行修改',
                    type: 'error'
                })
            } else {
                this.drawerTitle = '修改薪资信息'
                this.add_vrisible = true
                this.addForm.ruleForm.organizationId = data[0].organizationName
                this.addForm.ruleForm.salaryPerson = data[0].name
                this.addForm.ruleForm.id = data[0].id
                this.addForm.ruleForm.wageCardNumber = data[0].wageCardNumber
                this.addForm.ruleForm.salary = data[0].salary
            }
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
    }
}
</script>